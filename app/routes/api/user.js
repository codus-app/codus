const { getUser: getAuth0User } = require('../auth');

module.exports = {
  user: {
    async get(req, res) {
      const userInfo = await getAuth0User(req.user.sub);
      res.send(userInfo);
    },
  },
};
