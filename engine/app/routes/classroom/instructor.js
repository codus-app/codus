const util = require('util');
const keystone = require('keystone');

const { ObjectID } = keystone.mongoose.mongo;

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');
const Assignment = keystone.list('Assignment');
const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

const HTTPError = require('../util/error');
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
    // Fetch basic info from mongoDB

    const [mongoStudents, assignments] = await Promise.all([
      User.model.find().where('classroom').equals(req.classroom._id),
      Assignment.model.find().where('classroom').equals(req.classroom._id).sort('sortOrder'),
    ]);

    // Embellish students list with additional info

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

        assignments: assignments.map(a => ({
          ...a.toObject(),
          classroom: undefined,
          __v: undefined,
          _id: undefined,
          problems: undefined,
          id: a.code,
          numProblems: a.numProblems,
          createdAt: a.createdAt,
        })),

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
      if (error) new HTTPError('Something went wrong').handle(res);
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
    if (errors.length) return new HTTPError('Could not remove students from classroom').handle(res);

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

    if (!user) return new HTTPError(404, `User ${username} was not found`).handle(res);
    if (!user.classroom.equals(req.classroom._id)) return new HTTPError(403, `User ${username} does not belong to classroom ${req.classroom.code}`).handle(res);

    return User.updateItem(user, { classroom: null }, async (error) => {
      if (error) return new HTTPError('Something went wrong').handle(res);
      return res.json({ data: { removed: [username] } });
    });
  },
};


// Assignments

async function fetchAssignment(code, classroom, shouldPopulate = false) {
  if (code.length !== 8) throw new HTTPError(400, 'Assignment code must be an 8-character code');

  const assignmentPromise = Assignment.model
    .findOne()
    .where('classroom').equals(classroom._id)
    .where('_id')
      .gte(new ObjectID(`${code}0000000000000000`)) // eslint-disable-line indent
      .lte(new ObjectID(`${code}ffffffffffffffff`)) // eslint-disable-line indent
    .select('-__v');

  // Populate if shouldPopulate was passed as true
  if (shouldPopulate) assignmentPromise.populate({ path: 'problems', populate: { path: 'category' } });

  const assignment = await assignmentPromise;

  if (!assignment) throw new HTTPError(400, `Assignment '${code}' was not found in classroom ${classroom.code}`);

  return assignment;
}

module.exports.assignments = {
  /** List all assignments in a classroom */
  async list(req, res) {
    const assignments = await Assignment.model
      .find()
      .where('classroom').equals(req.classroom._id)
      .sort('sortOrder')
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
    let assignment;
    try {
      assignment = await fetchAssignment(req.params.assignmentCode, req.classroom, true);
    } catch (e) {
      if (e.statusCode) return e.handle(res);
      return new HTTPError('Something went wrong').handle(res);
    }

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
    const { name, description, dueDate = null, problems: rawProblems } = req.body;

    if (dueDate && Number.isNaN(Number(new Date(dueDate)))) return new HTTPError(400, `Date '${dueDate}' could not be parsed`).handle(res);

    // Get the IDs of all of the problems we're adding to the assignment
    let problems;
    let categories;
    try {
      ({ problems, categories } = await fetchProblems(rawProblems));
    } catch (e) {
      if (e.statusCode) return e.handle(res);
      return new HTTPError('Something went wrong').handle(res);
    }

    const numBefore = await Assignment.model
      .count()
      .where('classroom').equals(req.classroom._id);

    // Create the new assignment

    const assignment = new Assignment.model(); // eslint-disable-line new-cap
    Assignment.updateItem(assignment, {
      classroom: req.classroom._id,
      name,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      problems: problems.map(p => p._id),
      sortOrder: numBefore,
    }, (error) => {
      if (error) new HTTPError('Something went wrong').handle(res);
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
          sortOrder: assignment.sortOrder,
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
    if (name === null) return new HTTPError(400, 'Name cannot be blank').handle(res);
    if (rawProblems === null || (rawProblems && rawProblems.length === 0)) return new HTTPError(400, 'Problems cannot be blank').handle(res);
    if (dueDate && Number.isNaN(Number(new Date(dueDate)))) return new HTTPError(400, `Date '${dueDate}' could not be parsed`).handle(res);

    let assignment;
    // If we're not rewriting the problems list, we'll need the old list
    const shouldPopulate = !rawProblems;
    try {
      assignment = await fetchAssignment(assignmentCode, req.classroom, shouldPopulate);
    } catch (e) {
      if (e.statusCode) return e.handle(res);
      return new HTTPError('Something went wrong').handle(res);
    }

    // Get the IDs of all of the problems we're adding to the assignment
    let problems;
    let categories;
    if (rawProblems) {
      try {
        ({ problems, categories } = await fetchProblems(rawProblems));
      } catch (e) {
        if (e.statusCode) return e.handle(res);
        return new HTTPError('Something went wrong').handle(res);
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
      if (error) new HTTPError('Something went wrong').handle(res);
      else {
        res.json({ data: {
          ...assignment.toObject(),
          _id: undefined,
          classroom: req.classroom.code,
          id: this.code,
          // Problem info is in a different place depending on whether or not it's being replaced
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

  /** Remove an assignment */
  async delete(req, res) {
    let assignment;

    try {
      assignment = await fetchAssignment(req.params.assignmentCode, req.classroom);
    } catch (e) {
      if (e.statusCode) return e.handle(res);
      return new HTTPError('Something went wrong').handle(res);
    }

    // Remove assignment
    await assignment.remove();

    return res.json({ data: { success: true } });
  },

  async reorder(req, res) {
    const assignments = await Assignment.model
      .find()
      .where('classroom').equals(req.classroom._id)
      .sort('sortOrder')
      .select('-__v');

    const codes = assignments.map(({ code }) => code);
    const newOrder = req.body;
    // Error if new order missing
    if (!newOrder || !Array.isArray(newOrder) || !newOrder.length) return new HTTPError(400, 'New order is required in request body').handle(res);
    // Error if codes are passed that are not in assignments
    const extraCodes = newOrder.filter(c => !codes.includes(c));
    if (extraCodes.length) return new HTTPError(400, `Assignments ${util.inspect(extraCodes)} were not found in classroom ${req.classroom.code}`).handle(res);
    // Error if not all codes are passed in new order
    const missingCodes = codes.filter(c => !newOrder.includes(c));
    if (missingCodes.length) return new HTTPError(400, `Assignments ${util.inspect(missingCodes)} are missing from new order`).handle(res);

    const updates = newOrder.map((code, newIndex) => {
      const assignment = assignments.find(a => a.code === code);
      return new Promise((resolve, reject) => {
        Assignment.updateItem(assignment, {
          sortOrder: newIndex,
        }, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    });

    try {
      await Promise.all(updates);
    } catch (e) {
      return new HTTPError('Something went wrong').handle(res);
    }

    return res.json({
      data: newOrder
        .map(code => assignments.find(a => a.code === code))
        .map(a => ({
          ...a.toObject(),
          classroom: undefined,
          _id: undefined,
          problems: undefined,
          id: a.code,
          numProblems: a.numProblems,
          createdAt: a.createdAt,
        })),
    });
  },
};
