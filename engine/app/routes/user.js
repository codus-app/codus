const keystone = require('keystone');
const { isEmail } = require('validator');
const { validateUser, publicizeUser } = require('./util/user');
const upload = require('./util/profile-image-upload');
const getUserSolvedProgress = require('./util/user-solution-progress.js');
const HTTPError = require('./util/error');

const {
  getUser: getAuth0User,
  updateUser: updateAuth0User,
  createUser: createAuth0User,
} = require('../auth');

const User = keystone.list('User');

/* eslint-disable camelcase */


module.exports = {

  // Operations to retrieve public info about any user

  get(req, res) {
    getAuth0User.byUsername(req.params.username)
      .then(user => user || { error: 'not found' })
      .then(async ({ error, username, user_id, user_metadata }) => {
        if (error) return new HTTPError(404, `User '${req.params.username}' was not found`).handle(res);

        const user = await User.model
          .findOne()
          .where('userId').equals(user_id);

        const solutionProgress = await getUserSolvedProgress(user);

        return res.json({
          data: publicizeUser(user, { username, user_metadata }, solutionProgress),
        });
      });
  },

  // Operations to create new users

  // Sign up
  async post(req, res) {
    const { username, name, email, password, role = 'student' } = req.body;

    const errors = validateUser({ username, name, email, password, role }, ['username', 'name', 'email', 'password']);
    if (errors.length) return new HTTPError(400, errors).handle(res);

    try {
      // Create Auth0 user
      const user = await createAuth0User({ username, name, email, password });
      // Create Keystone user
      await new Promise((resolve, reject) => {
        // eslint-disable-next-line new-cap
        const newUser = new User.model();
        User.updateItem(newUser, {
          userId: user.user_id,
          role,
        }, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      return res.status(201).json({
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
        new HTTPError(409, [{ key: 'username', message: e.message }]).handle(res);
      } else if (e.message === 'The user already exists.') {
        new HTTPError(409, [{ key: 'email', message: e.message }]).handle(res);
      } else if (e.message === 'PasswordNoUserInfoError: Password contains user information') {
        new HTTPError(400, [{ key: 'password', message: 'Password contains user information' }]).handle(res);
      } else if (e.message === 'PasswordDictionaryError: Password is too common') {
        new HTTPError(400, [{ key: 'password', message: 'Password is too commonly used.' }]).handle(res);
      } else {
        new HTTPError(500, [{ message: e.message }]).handle(res);
      }
      return undefined;
    }
  },

  // Operations on the authenticated user

  authenticated: {
    // Get info
    async get(req, res) {
      const [auth0Info, mongoInfo] = await Promise.all([
        // Information from Auth0
        getAuth0User.byId(req.user.sub),
        // Information from Keystone
        User.model.findOne().where('userId').equals(req.user.sub) || {},
      ]);

      const { username, user_metadata, email } = auth0Info;
      const { role } = mongoInfo;

      res.json({
        data: {
          id: req.user.sub,
          username,
          name: user_metadata.name,
          email,
          picture: user_metadata.picture,
          role,
        },
      });
    },

    // Update info
    async patch(req, res) {
      const { username, name, email } = req.body;

      const errors = validateUser({ username, name, email });
      if (errors.length) return new HTTPError(400, errors).handle(res);
      try {
        const updated = await updateAuth0User(req.user.sub, { username, email, name });
        return res.json({
          data: {
            id: req.user.sub,
            username: updated.username,
            name: updated.user_metadata.name,
            email: updated.email,
          },
        });
      } catch (e) {
        if (e.message.endsWith('username already exists')) {
          new HTTPError(409, [{ key: 'username', message: e.message }]).handle(res);
        } else if (e.message.endsWith('email already exists')) {
          new HTTPError(409, [{ key: 'email', message: e.message }]).handle(res);
        } else {
          new HTTPError(e.message).handle(res);
        }
        return undefined;
      }
    },

    // Accepts multipart form data with the new image under the "picture" key
    putProfileImage(req, res) {
      if (!req.is('multipart/form-data')) return new HTTPError(400, 'Content-Type must be multipart/form-data').handle(res);
      // Upload new profile image
      new Promise((resolve, reject) => {
        upload.single('picture')(req, res, (err) => {
          // Error
          if (err) reject(new HTTPError(422, err));
          // File missing
          else if (!req.file) reject(new HTTPError(400, "'picture' field is required"));
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
        .catch(e => res.status(e.statusCode).json({ error: [{ key: 'picture', message: e.message }] }));
      return undefined;
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
