const { isEmail, isByteLength } = require('validator');
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

    checkUsername(req, res) {
      const { username } = req.params;
      if (!isByteLength(username, { min: 1, max: 15 }) || username.match(/[^a-z0-9_]/)) res.json({ data: { available: false } });

      getAuth0User.byUsername(username)
        .then(user => res.json({ data: { available: !user || user.user_id === req.user.sub } }));
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

        const errors = [];
        if (typeof username === 'string' && !isByteLength(username, { min: 1, max: 15 })) {
          errors.push({ key: 'username', message: 'Must be between 1 and 15 characters' });
        } if (typeof username === 'string' && username.match(/[^a-z0-9_]/)) {
          errors.push({ key: 'username', message: 'Must only contain lowercase letters, numbers, and underscores' });
        } if (typeof email === 'string' && !isEmail(email)) {
          errors.push({ key: 'email', message: 'Must be a valid email' });
        } if (typeof name === 'string' && !isByteLength(name, { min: 1, max: 25 })) {
          errors.push({ key: 'name', message: 'Must be between 1 and 25 characters' });
        }
        if (errors.length) res.status(400).json({ error: errors });

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
