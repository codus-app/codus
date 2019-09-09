const keystone = require('keystone');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');
const Assignment = keystone.list('Assignment');
const Solution = keystone.list('Solution');

const { fetchAssignment } = require('../util/classroom');
const HTTPError = require('../util/error');

module.exports.classroom = {
  async join(req, res) {
    const { classroomCode } = req.params;
    const classroom = await Classroom.model
      .findOne()
      .where('code').equals(classroomCode)
      .select('-__v');

    if (!classroom) return new HTTPError(404, `Could not find classroom ${classroomCode}`).handle(res);

    // Fetch some info about the classroom
    const [size, instructor] = await Promise.all([
      User.model
        .count()
        .where('classroom').equals(classroom._id),

      User.model
        .findById(classroom.instructor.toString())
        .select('-_id -__v')
        .then(user => user.fetch()),
    ]);

    return User.updateItem(req.user2, { classroom: classroom._id }, async (error) => {
      if (error) return new HTTPError('Something went wrong').handle(res);

      return res.json({
        data: {
          ...classroom.toObject(),
          size,
          instructor,
          joined: true,
          _id: undefined,
        },
      });
    });
  },

  async get(req, res) {
    const { classroomCode } = req.params;

    let classroom;
    // A code was passed; find the classroom with that code
    if (classroomCode) classroom = await Classroom.model.findOne().where('code').equals(classroomCode);
    // No code was passed; find the classroom to which the authenticated user belongs
    else if (req.user2.classroom) classroom = await Classroom.model.findById(req.user2.classroom.toString()); // eslint-disable-line max-len
    // No code was passed, but the user is not a member of any classes to use as the default
    else return res.json({ data: null });

    // Fetch some info about the classroom
    const [size, instructor] = await Promise.all([
      User.model
        .count()
        .where('classroom').equals(classroom._id),

      User.model
        .findById(classroom.instructor.toString())
        .select('-_id -__v')
        .then(user => user.fetch()),
    ]);

    // Viewing an external classroom
    if (!(req.user2.classroom && req.user2.classroom.equals(classroom._id))) {
      return res.json({
        data: {
          ...classroom.toObject(),
          instructor,
          joined: false,
          _id: undefined,
        },
      });
    }
    // Viewing the classroom the user is currently in (user gets more info)
    return res.json({
      data: {
        ...classroom.toObject(),
        size,
        instructor,
        joined: true,
        _id: undefined,
      },
    });
  },

  async leave(req, res) {
    User.updateItem(req.user2, { classroom: null }, (error) => {
      if (error) return new HTTPError('Something went wrong').handle(res);
      return res.json({ data: null });
    });
  },
};


module.exports.assignments = {
  async list(req, res) {
    const assignments = await Assignment.model
      .find()
      .where('classroom').equals(req.classroom._id)
      .sort('sortOrder')
      .populate('problems')
      .select('-__v');

    const allProblemsAssigned = assignments.map(p => (p.problems.map(({ _id }) => _id))).flat();
    const solutions = await Solution.model
      .find()
      .where('user').equals(req.user2._id)
      .where('problem').in(allProblemsAssigned);

    return res.json({
      data: assignments.map(a => ({
        ...a.toObject(),
        classroom: undefined,
        _id: undefined,
        id: a.code,
        problems: undefined,
        numProblems: a.numProblems,
        createdAt: a.createdAt,

        // An assignment is “solved” if the number of problems in the assignment is equal to the
        // number of the user's successful solutions that solve problems in this assignment
        solved: a.numProblems === solutions
          .filter(s => s.passed)
          .filter(s => a.problems.map(p => p._id.toString())
            // Problem is included in this assignment
            .includes(s.problem.toString()))
          .length,
      })),
    });
  },

  async get(req, res) {
    let assignment;
    try {
      assignment = await fetchAssignment(req.params.assignmentCode, req.classroom, true);
    } catch (e) {
      if (e.statusCode) return e.handle(res);
      return new HTTPError('Something went wrong').handle(res);
    }

    const problemsAssigned = assignment.problems.map(({ _id }) => _id);
    const solutions = await Solution.model
      .find()
      .where('user').equals(req.user2._id)
      .where('problem').in(problemsAssigned);
    const solvedIds = solutions
      .filter(s => s.passed)
      .map(s => s.problem.toString());

    return res.json({
      data: {
        ...assignment.toObject(),
        classroom: undefined,
        _id: undefined,
        id: assignment.code,
        problems: assignment.problems.map(p => ({
          category: p.category.name,
          name: p.name,
          solved: solvedIds.includes(p._id.toString()),
        })),
      },
    });
  },
};
