const keystone = require('keystone');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');

module.exports.checkInstructor = async (req, res, next) => {
  req.user2 = await User.model
    .findOne()
    .where('userId').equals(req.user.sub);

  if (req.user2.role !== 'instructor') res.status(403).json({ error: 'Authenticated user must have role: instructor' });
  else next();
};


module.exports.classrooms = {
  /** List classrooms that this teacher owns */
  async list(req, res) {
    const classrooms = await Classroom.model
      .find()
      .where('instructor').equals(req.user2._id);
    res.json({ data: classrooms.map(c => c.toObject()) });
  },

  /** Create new classroom */
  async post(req, res) {
    const { name } = req.body;
    // eslint-disable-next-line new-cap
    const classroom = new Classroom.model();
    Classroom.updateItem(classroom, {
      name,
      instructor: req.user2._id,
    }, (error) => {
      if (error) res.status(500).json({ error });
      else res.json({ data: { name } });
    });
  },
};
