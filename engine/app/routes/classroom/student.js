const keystone = require('keystone');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');

module.exports = {
  async joinClassroom(req, res) {
    const { code } = req.params;
    const classroom = await Classroom.model
      .findOne()
      .where('code').equals(code);

    console.log(classroom);
    if (!classroom) return res.status(404).send({ error: `Could not find classroom ${code}` });

    User.updateItem(req.user2, { classroom: classroom._id }, (error) => {
      if (error) res.status(500).json({ error });
      else res.json({ data: classroom.toObject() });
    });

    return undefined;
  },
};
