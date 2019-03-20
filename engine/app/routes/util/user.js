const { isEmail, isByteLength, isIn } = require('validator');

/* eslint-disable camelcase */

module.exports = {
  publicizeUser(mongoInfo, auth0Info, solutionProgress) {
    const { role } = mongoInfo;
    const { username, user_metadata } = auth0Info;

    return {
      username,
      name: user_metadata.name,
      picture: user_metadata.picture,
      solutionProgress, // Optional
      role,
    };
  },


  /**
   * Validate a potential user:
   *  • Username
   *  • Name
   *  • Email
   *  • Password
   * for length and other requirements.
   */
  validateUser({ username, name, email, password, role }, required = []) {
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
    } if (required.includes('password') && !password) {
      errors.push({ key: 'password', message: 'Password is required' });
    } if (typeof password === 'string' && !isByteLength(password, { min: 8 })) {
      errors.push({ key: 'password', message: 'Must be at least 8 characters in length' });
    }

    // Role
    if (typeof role === 'string' && !isIn(role, ['student', 'instructor'])) {
      errors.push({ key: 'role', message: "Role must be either 'student' or 'instructor'" });
    }

    return errors;
  },
};
