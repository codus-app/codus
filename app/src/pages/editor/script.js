import debounce from 'debounce';
import dedent from 'dedent';
import { mapState, mapGetters, mapActions } from 'vuex';
import ab from '../../ab';

let startTime = null;

export default {
  data: () => ({
    fetched: false,
    code: '',
    saveStatus: 'unsaved',
    checkInProgress: false,
    solvedModalOpen: false,
  }),

  computed: {
    ...mapGetters(['getSolution', 'getCategory', 'getProblem', 'getTestResults', 'isSolved', 'getNextUnsolvedProblem']),
    ...mapState(['categories', 'user', 'contentFetched']),

    // TODO: better category variable naming
    category() { return this.$route.params.category; },
    categoryName() {
      return this.fetched
        ? this.getCategory(this.category).displayName
        : this.category;
    },
    problemName() { return this.$route.params.name; },
    problem() {
      return this.fetched
        ? this.getProblem(this.category, this.problemName)
        : null;
    },
    solved() { return this.isSolved(this.category, this.problemName); },

    testResults() { return this.getTestResults(this.category, this.problemName); },

    remoteCode() { return (this.getSolution(this.category, this.problemName) || {}).code; },

    // The "starting" code for the problem
    baseCode() {
      const parameters = this.problem.parameters.map(p => `${p.type} ${p.name}`);
      const base = dedent`
        public class ${this.problem.name} {
          public ${this.problem.resultType} main(${parameters.join(', ')}) {
            // Your code here
          }
        }
      `;
      return `${base}\n`;
    },

    nextProblem() {
      return this.getNextUnsolvedProblem(this.category, this.problemName);
    },
  },

  methods: {
    ...mapActions(['fetchContent', 'fetchSolution', 'saveSolution', 'checkSolution']),

    /* eslint-disable max-len */
    onInput(value) {
      this.code = value;
      if (this.code !== this.remoteCode // The code has changed since last save
        && !(this.code === this.baseCode && !this.remoteCode) // If no solution is saved, only create once code deviates from base
      ) {
        this.debouncedSave();
        this.saveStatus = 'saving';
      }
    },
    /* eslint-enable */

    async save() {
      try {
        await this.saveSolution({
          problem: this.problemName,
          category: this.category,
          code: this.code,
        });
        this.saveStatus = 'saved';
      } catch (e) {
        this.saveStatus = 'error';
        throw e;
      }
    },

    debouncedSave: debounce(function save2() { this.save(); }, 750),

    async solutionCheck() {
      this.checkInProgress = true;
      const wasSolved = this.solved;
      // Save current code!
      await this.save();
      // Now check once the save completes
      await this.checkSolution({ problem: this.problemName, category: this.category });
      this.checkInProgress = false;

      if (this.solved && ab.gamify) setTimeout(() => { this.solvedModalOpen = true; }, 500);
      // Record data point
      if (this.solved && !wasSolved) ab.problemSolved((new Date() - startTime) / 1000);
    },

    async init() {
      this.fetched = false;
      await this.$root.fetchPromise;
      if (!this.contentFetched) this.fetchContent();
      await this.fetchSolution({ category: this.category, problem: this.problemName });
      this.fetched = true;
      this.solvedModalOpen = false;
      startTime = new Date();
      this.code = this.remoteCode || this.baseCode;
      // "unsaved" if there's no remote code, otherwise we start out with "saved"
      this.saveStatus = this.remoteCode === null ? 'unsaved' : 'saved';
      // If the problem is in the list of the users's "solved" problems we know all of the test
      // results have passed even if the solution hasn't been checked in this session
      if (this.solved && !this.testResults.tests.length) {
        this.$store.commit('updateTestResults', {
          category: this.category,
          problem: this.problemName,
          tests: this.problem.testCases
            .map(({ result }) => ({ value: result, expected: result, pass: true }))
            .concat(new Array(this.problem.numHidden)
              .fill(null)
              .map(() => ({ hidden: true, pass: true }))),
          code: this.remoteCode,
          error: null,
        });
      }
    },
  },

  watch: {
    category(cat, oldCat) {
      // This system is somewhat sinful but makes way more sense in this case than lifting
      // "expanded" state all the way up here and duplicating that logic
      if (!this.$refs.editor.$refs['problems-tree'].$refs[cat][0].expanded) {
        this.$refs.editor.$refs['problems-tree'].expandCategory(cat);
        this.$refs.editor.$refs['problems-tree'].collapseCategory(oldCat);
      }
    },
  },

  created() {
    // Fetch info, populate code, all that
    this.init();
    // Re-initialize when problem changes, even if editor isn't created/destroyed
    this.$watch(vm => `${vm.problemName}/${vm.category}`, () => this.init());
  },

  components: {
    'solved-modal': require('./components/solved-modal/solved-modal.vue').default,
  },
};
