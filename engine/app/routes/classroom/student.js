const keystone = require('keystone');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');

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
