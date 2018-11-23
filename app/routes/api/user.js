const {
  getUser: getAuth0User,
  updateUser: updateAuth0User,
} = require('../auth');

/* eslint-disable camelcase */

module.exports = {
  user: {
    get(req, res) {
      getAuth0User.byUsername(req.params.username)
        .then(user => user || { error: 'not found' })
        .then(({ error, username, user_metadata, picture }) => { // eslint-disable-line object-curly-newline, max-len
          if (error) res.status(404).json({ error: `User '${req.params.username}' was not found` });
          res.json({
            data: {
              username,
              name: user_metadata.name,
              picture,
            },
          });
        });
    },

    authenticated: {
      async get(req, res) {
        const { username, user_metadata, email, picture } = await getAuth0User.byId(req.user.sub); // eslint-disable-line object-curly-newline, max-len
        res.json({
          data: {
            id: req.user.sub,
            username,
            name: user_metadata.name,
            email,
            picture,
          },
        });
      },

      async patch(req, res) {
        const { username, email, name } = req.body;

        try {
          const updated = await updateAuth0User(req.user.sub, { username, email, name });
          res.json({
            data: {
              id: req.user.sub,
              username: updated.username,
              name: updated.user_metadata.name,
              email: updated.email,
            },
          });
        } catch (e) {
          const status = e.message.endsWith('username already exists') ? 409 : 500;
          res.status(status).send({ error: e.message });
        }
      },
    },
  },
};
