const keystone = require('keystone');
const { isEmail } = require('validator');
const { validateUser } = require('./util');
const upload = require('./util/profile-image-upload');

const {
  getUser: getAuth0User,
  updateUser: updateAuth0User,
  createUser: createAuth0User,
} = require('../auth');

const User = keystone.list('User');

/* eslint-disable camelcase, object-curly-newline */


module.exports = {

  // Operations to retrieve public info about any user

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

  // Operations to create new users

  // Sign up
  async post(req, res) {
    const { username, name, email, password } = req.body;

    const errors = validateUser({ username, name, email, password }, ['username', 'name', 'email', 'password']);
    if (errors.length) res.status(400).json({ error: errors });

    else {
      try {
        // Create Auth0 user
        const user = await createAuth0User({ username, name, email, password });
        // Create Keystone user
        await new Promise((resolve) => {
          // eslint-disable-next-line new-cap
          new User.model({ userId: user.user_id }).save(resolve);
        });

        res.status(201).json({
          data: {
            id: user.user_id,
            username: user.username,
            name: user.user_metadata.name,
            email: user.email,
          },
          also: user,
        });
      } catch (e) {
        if (e.message === 'The username provided is in use already.') {
          res.status(409).json({ error: [{ key: 'username', message: e.message }] });
        } else if (e.message === 'The user already exists.') {
          res.status(409).json({ error: [{ key: 'email', message: e.message }] });
        } else if (e.message === 'PasswordNoUserInfoError: Password contains user information') {
          res.status(400).json({ error: [{ key: 'password', message: 'Password contains user information' }] });
        } else if (e.message === 'PasswordDictionaryError: Password is too common') {
          res.status(400).json({ error: [{ key: 'password', message: 'Password is too commonly used.' }] });
        } else {
          res.status(500).json({ error: [{ message: e.message }] });
        }
      }
    }
  },

  // Operations on the authenticated user

  authenticated: {
    // Get info
    async get(req, res) {
      const { username, user_metadata, email } = await getAuth0User.byId(req.user.sub); // eslint-disable-line object-curly-newline, max-len
      res.json({
        data: {
          id: req.user.sub,
          username,
          name: user_metadata.name,
          email,
          picture: user_metadata.picture,
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

    // Accepts multipart form data with the new image under the "picture" key
    putProfileImage(req, res) {
      if (!req.is('multipart/form-data')) {
        res.status(400).send({ error: 'Content-Type must be multipart/form-data' });
        return;
      }
      // Upload new profile image
      new Promise((resolve, reject) => {
        upload.single('picture')(req, res, (err) => {
          // Error
          if (err) reject(err);
          // File missing
          else if (!req.file) reject(Object.assign(new Error("'picture' field is required"), { statusCode: 400 }));
          // Success
          else resolve(req.file.location);
        });
      })
        // Save new image URL to Auth0 API
        .then(imageUrl => updateAuth0User(req.user.sub, { picture: `${imageUrl}?mtime=${Math.floor(Date.now() / 1000)}` }))
        .then(updated => res.json({
          data: {
            id: req.user.sub,
            picture: updated.user_metadata.picture,
          },
        }))
        // Handle errors
        .catch(e => res.status(e.statusCode || 422).json({ error: [{ key: 'picture', message: e.message }] }));
    },
  },

  // Operations checking the availability of certain user data with enforced uniqueness

  checkUsername(req, res) {
    const { username } = req.params;
    // Quick client-side username validation
    if (validateUser({ username }).length) {
      res.json({ data: { available: false, exists: false } });
    // Check for conflicts with other users
    } else {
      getAuth0User.byUsername(username)
        .then(user => res.json({ data: {
          available: !user,
          exists: !!user,
        } }));
    }
  },

  checkEmail(req, res) {
    const { email } = req.params;
    if (!isEmail(email)) res.json({ data: { available: false, exists: false } });
    else {
      getAuth0User.byEmail(email)
        .then(user => res.json({ data: { available: !user, exists: !!user } }));
    }
  },

};
