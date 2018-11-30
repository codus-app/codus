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

};
