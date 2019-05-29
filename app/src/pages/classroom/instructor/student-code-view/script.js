import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    fetched: false,
    checkInProgress: false,
    testResults: { tests: [], code: null, error: null },
  }),

  computed: {
    ...mapState(['categories', 'contentFetched']),
    ...mapGetters(['getCategory', 'getProblem']),
    ...mapGetters('classroom/instructor', ['fetchedStudents', 'getStudentSolutions', 'getStudentSolution']),

    studentUsername() { return this.$route.params.username; },
    categoryId() { return this.$route.params.category; },
    category() { return this.fetched ? this.getCategory(this.categoryId) : null; },
    categoryName() { return this.category ? this.category.displayName : this.categoryId; },
    problemName() { return this.$route.params.name; },
    problem() {
      return this.fetched
        ? this.getProblem(this.categoryId, this.problemName)
        : null;
    },

    studentSolution() {
      const { username, category, name } = this.$route.params;
      return this.fetched ? this.getStudentSolution(username, category, name) : null;
    },
    code() { return (this.studentSolution || { code: '' }).code; },
    solved() { return (this.studentSolution || { passed: false }).passed; },

    // Structured object of all categories and problems that the user has begun solutions to
    solutionCategories() {
      const solutions = this.getStudentSolutions(this.studentUsername) || [];
      function categoryHasStudentSolution(categoryName) {
        return solutions
          .findIndex(s => (s.problem.category.name || s.problem.category) === categoryName)
          !== -1;
      }
      function problemHasStudentSolution(categoryName, problemName) {
        return solutions
          .findIndex(s => (s.problem.category.name || s.problem.category) === categoryName
            && s.problem.name === problemName)
          !== -1;
      }

      return this.categories.filter(c => categoryHasStudentSolution(c.name))
        .map(c => ({
          ...c,
          problems: c.problems.filter(p => problemHasStudentSolution(c.name, p.name)),
        }));
    },
    solvedProblems() {
      return (this.getStudentSolutions(this.studentUsername) || [])
        .filter(s => s.passed)
        .map(s => ({
          category: s.problem.category,
          name: s.problem.name,
        }));
    },
    solutionsBegun() {
      return (this.getStudentSolutions(this.studentUsername) || [])
        .map(s => ({
          category: s.problem.category,
          name: s.problem.name,
        }));
    },
  },

  methods: {
    ...mapActions(['fetchContent']),
    ...mapActions('classroom/instructor', ['fetchStudentSolutions', 'fetchStudentSolution', 'checkStudentSolution']),

    async solutionCheck() {
      this.checkInProgress = true;
      this.testResults = await this.checkStudentSolution({
        username: this.studentUsername,
        category: this.categoryId,
        problemName: this.problemName,
      });
      this.checkInProgress = false;
    },

    async init() {
      this.fetched = false;
      await this.$root.fetchPromise;
      if (!this.contentFetched) { await this.fetchContent(); }
      if (!this.fetchedStudents.includes(this.studentUsername)) {
        this.fetchStudentSolutions({ username: this.studentUsername });
      }
      await this.fetchStudentSolution({
        username: this.studentUsername,
        category: this.categoryId,
        problemName: this.problemName,
      });
      this.fetched = true;
      if (this.solved && !this.testResults.tests.length) {
        this.testResults = {
          tests: this.problem.testCases
            .map(({ result }) => ({ value: result, expected: result, pass: true }))
            .concat(new Array(this.numHiddenTests)
              .fill(null)
              .map(() => ({ hidden: true, pass: true }))),
          code: this.code,
          error: null,
        };
      }
    },
  },

  created() {
    this.init();
    this.$watch(vm => `${vm.problemName}/${vm.categoryId}`, () => this.init());
  },
};
