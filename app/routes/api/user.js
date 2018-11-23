const { getUser: getAuth0User } = require('../auth');

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
  },
};
