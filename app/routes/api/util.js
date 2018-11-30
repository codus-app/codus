const { isEmail, isByteLength } = require('validator');

module.exports = {
  // Prepare a problem from mongoose to be exposed to the public.
  // Expands useful information, and hides secret information
  publicizeProblem: (problem, category) => ({
    ...problem.toObject(),
    // Fix bug with quotes inside code blocks
    description: {
      md: problem.description.md,
      html: problem.description.html.replace(/&amp;quot;/g, '&quot;'),
    },
    // Return richer test cases from virtual attribute. Only report non-hidden test cases
    testCases: problem.testCases2
      .filter(tc => !tc.hidden)
      .map(tc => ({ ...tc, hidden: undefined })),
    // Report only the number of test cases that are hidden, not the test cases themselves
    hiddenTestCases: undefined,
    numHidden: problem.testCases2
      .filter(tc => tc.hidden).length,
    // Return richer parameters from virtual attribuet
    parameters: problem.parameters2,
    // Category if provided
    category: category ? { ...category.toObject(), _id: undefined, __v: undefined } : undefined,

    _id: undefined,
    __v: undefined,
  }),


  /**
   * Validate a potential user:
   *  • Username
   *  • Name
   *  • Email
   *  • Password
   * for length and other requirements.
   */
  validateUser({ username, name, email, password }, required = []) { // eslint-disable-line object-curly-newline, max-len
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
    } if (typeof password === 'string' && !isByteLength(name, { min: 8 })) {
      errors.push({ key: 'password', message: 'Must be at least 8 characters in length' });
    }

    return errors;
  },

};
