const { validateUser } = require('./util');
const {
  getUser: getAuth0User,
  updateUser: updateAuth0User,
} = require('../auth');

/* eslint-disable camelcase */

module.exports = {
  user: {
    // Retrieve public info about any user
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

    // Operations on the authenticated user
    authenticated: {
      // Get info
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

      // Update info
      async patch(req, res) {
        const { username, name, email } = req.body;

        const errors = validateUser({ username, name, email });
        if (errors.length) res.status(400).json({ error: errors });
        else {
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
            if (e.message.endsWith('username already exists')) {
              res.status(409).json({ error: [{ key: 'username', message: e.message }] });
            } else if (e.message.endsWith('email already exists')) {
              res.status(409).json({ error: [{ key: 'email', message: e.message }] });
            } else {
              res.status(500).json({ error: e.message });
            }
          }
        }
      },
    },

    checkUsername(req, res) {
      const { username } = req.params;
      if (validateUser({ username }).length) res.json({ data: { available: false } });

      getAuth0User.byUsername(username)
        .then(user => res.json({ data: { available: !user || user.user_id === req.user.sub } }));
    },
  },
};
