const keystone = require('keystone');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');
const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

const { generateInviteCode } = require('../util/classroom');
const { publicizeUser } = require('../util/user');
const { getUsers } = require('../../auth');


module.exports.classrooms = {
  /** List classrooms that this instructor owns */
  async list(req, res) {
    const classrooms = await Classroom.model
      .find()
      .where('instructor').equals(req.user2._id)
      .select('-instructor -_id -__v');
    res.json({ data: classrooms.map(c => c.toObject()) });
  },

  async get(req, res) {
    const { code } = req.params;

    const classroom = await Classroom.model
      .findOne()
      .where('code').equals(code)
      .select('-__v');

    if (!classroom) return res.status(404).json({ error: `Classroom '${code}' was not found` });
    if (!classroom.instructor.equals(req.user2._id)) return res.status(403).json({ error: `You don't own classroom ${code}` });

    // Fetch user info from student list from mongo and auth0
    const mongoStudents = await User.model.find().where('classroom').equals(classroom._id);
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
        ...classroom.toObject(),
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
      if (error) res.status(500).json({ error });
      else res.json({ data: { name, code } });
    });
  },

  /** Remove a classroom */
  async delete(req, res) {
    const { code } = req.params;
    const classroom = await Classroom.model
      .findOne()
      .where('code').equals(code);

    if (!classroom) return res.status(404).json({ error: `Classroom '${code}' was not found` });
    if (!classroom.instructor.equals(req.user2._id)) return res.status(403).json({ error: `You don't own classroom ${code}` });

    const users = await User.model
      .find()
      .where('classroom').equals(classroom._id);

    const errors = [];
    users.forEach((user) => {
      User.updateItem(user, { classroom: null }, (error) => {
        if (error) errors.push(error);
      });
    });
    if (errors.length) return res.status(500).json({ error: errors });

    await classroom.remove();

    return res.json({});
  },
};
