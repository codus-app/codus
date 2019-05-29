import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    fetched: false,
    checkInProgress: false,
    testResults: { tests: [], code: null, error: null },
  }),

  computed: {
    ...mapGetters(['getCategory', 'getProblem']),
    ...mapGetters('classroom/instructor', ['getStudentSolution']),

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
  },

  methods: {
    ...mapActions('classroom/instructor', ['fetchStudentSolutions', 'fetchStudentSolution', 'checkStudentSolution']),

    async solutionCheck() {
      this.checkInProgress = true;
      this.testResults = await this.checkStudentSolution({
        username: this.$route.params.username,
        category: this.categoryId,
        problemName: this.problemName,
      });
      this.checkInProgress = false;
    },

    async init() {
      this.fetched = false;
      await this.$root.fetchPromise;
      await this.fetchStudentSolution({
        username: this.$route.params.username,
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
