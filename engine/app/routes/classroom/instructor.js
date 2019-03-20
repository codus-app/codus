const keystone = require('keystone');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');

const { generateInviteCode } = require('../util/classroom');


module.exports.classrooms = {
  /** List classrooms that this teacher owns */
  async list(req, res) {
    const classrooms = await Classroom.model
      .find()
      .where('instructor').equals(req.user2._id);
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

    return res.json({
      data: {
        ...classroom.toObject(),
        _id: undefined,
        instructor: await req.user2.fetch(),
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
