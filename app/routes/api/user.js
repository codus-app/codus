const { isEmail, isByteLength } = require('validator');
const {
  getUser: getAuth0User,
  updateUser: updateAuth0User,
} = require('../auth');


function validateUser({ username, name, email, password }, required = []) { // eslint-disable-line object-curly-newline, max-len
  const errors = [];
  // Username
  if (required.includes('username') && !username) {
    errors.push({ key: 'username', message: 'Username is required' });
  } if (typeof username === 'string' && !isByteLength(username, { min: 1, max: 15 })) {
    errors.push({ key: 'username', message: 'Must be between 1 and 15 characters' });
  } if (typeof username === 'string' && username.match(/[^a-z0-9_]/)) {
    errors.push({ key: 'username', message: 'Must only contain lowercase letters, numbers, and underscores' });
  // Name
  } if (required.includes('name') && !name) {
    errors.push({ key: 'name', message: 'Name is required' });
  } if (typeof name === 'string' && !isByteLength(name, { min: 1, max: 25 })) {
    errors.push({ key: 'name', message: 'Must be between 1 and 25 characters' });
  // Email
  } if (required.includes('email') && !email) {
    errors.push({ key: 'email', message: 'Email is required' });
  } if (typeof email === 'string' && !isEmail(email)) {
    errors.push({ key: 'email', message: 'Must be a valid email' });
  // Password
  } if (required.includes('password')) {
    errors.push({ key: 'password', message: 'Password is required' });
  } if (typeof password === 'string' && !isByteLength(name, { min: 8 })) {
    errors.push({ key: 'password', message: 'Must be at least 8 characters in length' });
  }
  return errors;
}


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
      if (!isByteLength(username, { min: 1, max: 15 }) || username.match(/[^a-z0-9_]/)) res.json({ data: { available: false } });

      getAuth0User.byUsername(username)
        .then(user => res.json({ data: { available: !user || user.user_id === req.user.sub } }));
    },
  },
};
