const keystone = require('keystone');

const { ObjectID } = keystone.mongoose.mongo;

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');
const Assignment = keystone.list('Assignment');
const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

const { publicizeProblem, fetchProblems } = require('../util/problem');
const { generateInviteCode } = require('../util/classroom');
const { publicizeUser } = require('../util/user');
const { getUser, getUsers } = require('../../auth');


// Classrooms


module.exports.classrooms = {
  /** List classrooms that this instructor owns */
  async list(req, res) {
    const classrooms = await Classroom.model
      .find()
      .where('instructor').equals(req.user2._id)
      .select('-instructor -_id -__v');
    res.json({ data: classrooms.map(c => c.toObject()) });
  },

  /** Get detailed information on a specific classroom */
  async get(req, res) {
    // Get students info (classroom comes from middleware)

    // Fetch user info from student list from mongo and auth0
    const mongoStudents = await User.model.find().where('classroom').equals(req.classroom._id);
    const auth0Students = await getUsers.byIds(mongoStudents.map(s => s.userId));
    // Add info on how many problems each student has solved
    const [numProblems, allSolutions] = await Promise.all([
      Problem.model.count(),
      Solution.model.find().where('user').in(mongoStudents.map(s => s._id)),
    ]);
    // Compile student information
    const students = mongoStudents
      .map(s => publicizeUser(
        s,
        auth0Students.find(s2 => s2.user_id === s.userId),
        [allSolutions.filter(s2 => s2.passed && s2.user.equals(s._id)).length, numProblems],
      ))
      .map((s, i, list) => ({
        ...s,
        // Class rank is 1 greater than the number of other students who have solved more problems
        // Gives tied users the same rank (eg: 1, 1, 3, 3, 3, 3, 7, 8, 8, 10)
        rank: list.filter(s2 => s2.solutionProgress[0] > s.solutionProgress[0]).length + 1,
      }));

    // Sort students by last name
    const lastName = ({ name }) => name.trim().split(' ').slice(-1)[0];
    students.sort((a, b) => lastName(a).localeCompare(lastName(b)) || a.name.localeCompare(b.name));

    return res.json({
      data: {
        ...req.classroom.toObject(),
        students,
        _id: undefined,
        instructor: undefined,
      },
    });
  },

  /** Create new classroom */
  async post(req, res) {
    const { name } = req.body;
    const code = await generateInviteCode();

    const classroom = new Classroom.model(); // eslint-disable-line new-cap
    Classroom.updateItem(classroom, {
      name,
      instructor: req.user2._id,
      code,
    }, (error) => {
      if (error) res.status(500).json({ error: 'Something went wrong' });
      else res.json({ data: { name, code } });
    });
  },

  /** Remove a classroom */
  async delete(req, res) {
    // Remove all students from classroom
    const users = await User.model
      .find()
      .where('classroom').equals(req.classroom._id);

    const errors = [];
    users.forEach((user) => {
      User.updateItem(user, { classroom: null }, (error) => {
        if (error) errors.push(error);
      });
    });
    if (errors.length) return res.status(500).json({ error: 'Could not remove students from classroom' });

    // Remove classroom
    await req.classroom.remove();

    return res.json({ data: { success: true } });
  },

  /** Remove a user from a classroom */
  async removeUser(req, res) {
    const { username } = req.params;

    const userId = (await getUser.byUsername(username)).user_id;
    const user = await User.model
      .findOne()
      .where('userId').equals(userId);

    if (!user) return res.status(404).json({ error: `User ${username} was not found` });
    if (!user.classroom.equals(req.classroom._id)) return res.status(403).json({ error: `User ${username} does not belong to classroom ${req.classroom.code}` });

    return User.updateItem(user, { classroom: null }, async (error) => {
      if (error) return res.status(500).json({ error });
      return res.json({ data: { removed: [username] } });
    });
  },
};


// Assignments


module.exports.assignments = {
  /** List all assignments in a classroom */
  async list(req, res) {
    const assignments = await Assignment.model
      .find()
      .where('classroom').equals(req.classroom._id)
      .populate('problems')
      .select('-__v');

    return res.json({
      data: assignments
        .map(a => ({
          ...a.toObject(),
          classroom: req.classroom.code,
          // Replace ID with a shorter one. 8 characters are a base16 timestamp to the second, and
          // are sufficient to uniquely identify an assignment within a single classroom
          _id: undefined,
          id: a.code,
          // Replace problems list with the number of problems (assignments list endpoint doesn’t
          // need that level of detail)
          problems: undefined,
          numProblems: a.numProblems,

          createdAt: a.createdAt,
        })),
    });
  },

  /** Get information on a single assignment */
  async get(req, res) {
    const { assignmentCode } = req.params;

    if (!assignmentCode || assignmentCode.length !== 8) return res.status(400).json({ error: 'Assignment code must be an 8-character code' });

    const assignment = await Assignment.model
      .findOne()
      .where('classroom').equals(req.classroom._id)
      .where('_id')
        .gte(new ObjectID(`${assignmentCode}0000000000000000`)) // eslint-disable-line indent
        .lte(new ObjectID(`${assignmentCode}ffffffffffffffff`)) // eslint-disable-line indent
      .populate({ path: 'problems', populate: { path: 'category' } })
      .select('-__v');

    if (!assignment) return res.status(404).json({ error: `Assignment '${assignmentCode}' was not found in classroom ${req.classroom.code}` });

    return res.json({
      data: {
        ...assignment.toObject(),
        classroom: req.classroom.code,
        _id: undefined,
        id: assignment.code,
        problems: assignment.problems.map(p => publicizeProblem(p, p.category)),
        numProblems: assignment.numProblems,
        createdAt: assignment.createdAt,
      },
    });
  },

  /** Create a new assignment */
  async post(req, res) {
    const { name, description, dueDate, problems: rawProblems } = req.body;

    if (Number.isNaN(Number(new Date(dueDate)))) return res.status(400).json({ error: `Date '${dueDate}' could not be parsed` });

    // Get the IDs of all of the problems we're adding to the assignment
    let problems;
    let categories;
    try {
      ({ problems, categories } = await fetchProblems(rawProblems));
    } catch (e) {
      if (e.statusCode) return e.handle(res);
      return res.status(500).json({ error: 'Something went wrong' });
    }

    // Create the new assignment

    const assignment = new Assignment.model(); // eslint-disable-line new-cap
    Assignment.updateItem(assignment, {
      classroom: req.classroom._id,
      name,
      description,
      dueDate: new Date(dueDate).toISOString(),
      problems: problems.map(p => p._id),
    }, (error) => {
      if (error) res.status(500).json({ error });
      else {
        res.json({ data: {
          ...assignment.toObject(),
          _id: undefined,
          __v: undefined,
          classroom: req.classroom.code,
          id: assignment.code,
          problems: problems
            .map(p => publicizeProblem(p, categories.find(c => c._id.equals(p.category)))),
          numProblems: assignment.numProblems,
          createdAt: assignment.createdAt,
        } });
      }
    });
    return undefined;
  },

  /** Update an assignment with new field values */
  async put(req, res) {
    const { assignmentCode } = req.params;
    // Get new values
    const { name, description, dueDate, problems: rawProblems } = req.body;

    // Initial validation
    if (name === null) return res.status(400).json({ error: 'Name cannot be blank' });
    if (rawProblems === null || (rawProblems && rawProblems.length === 0)) return res.status(400).json({ error: 'Problems cannot be blank' });
    if (dueDate && Number.isNaN(Number(new Date(dueDate)))) return res.status(400).json({ error: `Date '${dueDate}' could not be parsed` });

    const assignmentPromise = Assignment.model
      .findOne()
      .where('classroom').equals(req.classroom._id)
      .where('_id')
        .gte(new ObjectID(`${assignmentCode}0000000000000000`)) // eslint-disable-line indent
        .lte(new ObjectID(`${assignmentCode}ffffffffffffffff`)) // eslint-disable-line indent
      .select('-__v');
    // If we're not rewriting the problems list, we'll need the old list
    if (!rawProblems) assignmentPromise.populate({ path: 'problems', populate: { path: 'category' } });
    const assignment = await assignmentPromise;

    if (!assignment) return res.status(404).json({ error: `Assignment '${assignmentCode}' was not found in classroom ${req.classroom.code}` });


    // Get the IDs of all of the problems we're adding to the assignment
    let problems;
    let categories;
    if (rawProblems) {
      try {
        ({ problems, categories } = await fetchProblems(rawProblems));
      } catch (e) {
        if (e.statusCode) return e.handle(res);
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }

    Assignment.updateItem(assignment, {
      name,
      description,
      dueDate: dueDate && new Date(dueDate).toISOString(),
      problems: rawProblems && problems.map(p => p._id),
    }, {
      fields: ['name', 'description', 'dueDate', ...rawProblems ? ['problems'] : []],
    }, (error) => {
      if (error) res.status(500).json({ error });
      else {
        res.json({ data: {
          ...assignment.toObject(),
          _id: undefined,
          classroom: req.classroom.code,
          id: this.code,
          // Problem info is in a different place depending on whether or not it was replaced
          problems: rawProblems
            ? problems.map(p => publicizeProblem(p, categories.find(c => c._id.equals(p.category))))
            : assignment.problems.map(p => publicizeProblem(p, p.category)),
          numProblems: assignment.numProblems,
          createdAt: assignment.createdAt,
        } });
      }
    });
    return undefined;
  },
};
