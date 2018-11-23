const {
  getUser: getAuth0User,
  updateUser: updateAuth0User,
} = require('../auth');

/* eslint-disable camelcase */

module.exports = {
  user: {
    async get(req, res) {
      const { username, user_metadata, email, picture } = await getAuth0User.byId(req.user.sub); // eslint-disable-line object-curly-newline, max-len
      res.send({
        id: req.user.sub,
        username,
        name: user_metadata.name,
        email,
        picture,
      });
    },

    async patch(req, res) {
      const { username, email, name } = req.body;

      const updated = await updateAuth0User(req.user.sub, { username, email, name });
      res.send({
        id: req.user.sub,
        username: updated.username,
        name: updated.user_metadata.name,
        email: updated.email,
      });
    },
  },
};
