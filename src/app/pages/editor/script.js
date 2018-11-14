import dedent from 'dedent';
import debounce from 'debounce';
import { mapState, mapGetters, mapActions } from 'vuex';

import cmOptions from './codemirror-config/';

export default {
  data: () => ({
    cmOptions,
    fetched: false,
    code: '',
    saving: null,
    deletionConfirmOpen: false,
    outputCollapsed: true,
    outputWindowBounds: [0, 0, window.innerWidth, window.innerHeight],
  }),

  computed: {
    ...mapGetters(['getSolution', 'getProblem', 'getTestResults', 'isSolved']),
    ...mapState(['solutionCheckInProgress']),

    category() { return this.$route.params.category; },
    problemName() { return this.$route.params.name; },
    problem() { return this.getProblem(this.category, this.problemName); },

    testResults() { return this.getTestResults(this.category, this.problemName).tests; },
    numHiddenTests() { return this.problem.numHidden; },
    numHiddenTestsPassed() {
      return this.solved
        ? this.problem.numHidden
        : this.testResults.filter(tc => tc.hidden && tc.pass).length;
    },

    errorMessage() { return this.getTestResults(this.category, this.problemName).error; },

    solved() { return this.isSolved(this.category, this.problemName); },
    // Number passed divided by total number
    progress() {
      if (!this.testResults.length) return 0;
      return this.testResults.filter(t => t.pass).length / this.testResults.length;
    },

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

    // The version of the user's code that's on the server
    remoteCode() { return (this.getSolution(this.category, this.problemName) || {}).code; },

    testedCode() { return this.getTestResults(this.category, this.problemName).code; },

    tests() {
      return this.problem.testCases.map((testCase, i) => {
        const result = this.testResults[i] || {};
        return {
          parameters: testCase.parameters,
          expectedResult: testCase.result,
          result: result.value,
          passed: result.pass,
        };
      });
    },
  },


  methods: {
    ...mapActions(['fetchSolution', 'saveSolution', 'checkSolution']),

    async init() {
      this.fetched = false;
      await this.$root.fetchPromise;
      await this.fetchSolution({ category: this.category, problem: this.problemName });
      this.fetched = true;
      this.code = this.remoteCode || this.baseCode;
      // null for "unsaved" if there's no remote code, otherwise false for "saved"
      this.saving = typeof this.remoteCode === 'undefined' ? null : false;
      // If the problem is in the list of the users's "solved" problems we know all of the test
      // results have passed even if the solution hasn't been checked in this session
      if (this.solved && !this.testResults.length) {
        this.$store.commit('updateTestResults', {
          category: this.category,
          problem: this.problemName,
          tests: this.problem.testCases
            .map(({ result }) => ({ value: result, expected: result, pass: true })),
          code: this.remoteCode,
        });
      }
    },

    /* eslint-disable max-len */
    onInput(e) {
      this.code = e;

      if (this.code !== this.remoteCode // The code has changed since last save
        && !(this.code === this.baseCode && !this.remoteCode) // If no solution is saved, only create once code deviates from base
      ) {
        this.debouncedSave();
        this.saving = true;
      }
    },
    /* eslint-enable max-len */

    async save() {
      await this.saveSolution({
        problem: this.problemName,
        category: this.category,
        code: this.code,
      });
      this.saving = false;
    },

    execute() {},
    reset() {
      this.code = this.baseCode;
      this.deletionConfirmOpen = false;
    },


    debouncedSave: debounce(function save2() { this.save(); }, 750),

    solutionCheck() {
      this.checkSolution({ problem: this.problemName, category: this.category });
    },

    computeWindowBounds() {
      const { top, right, left, bottom } = this.$refs.windowBounds.getBoundingClientRect(); // eslint-disable-line object-curly-newline, max-len
      const rem = parseFloat(getComputedStyle(document.body).fontSize, 10);
      this.outputWindowBounds = [
        left + (0.75 * rem), // x1
        top + (0.7 * rem) + 4, // y1
        right - (0.75 * rem) - 4, // x2
        bottom - (0.7 * rem) - 4, // y2
      ];
    },
  },

  // Collapse automatically when error message goes away so that next time it's not open
  watch: {
    errorMessage() {
      if (!this.errorMessage) this.outputCollapsed = true;
    },
  },

  created() {
    // Fetch info, populate code, all that
    this.init();
    // Re-initialize when problem changes, even if editor isn't created/destroyed
    this.$watch(vm => `${vm.problemName}/${vm.category}`, () => this.init());
  },

  mounted() {
    setTimeout(this.computeWindowBounds, 500);
    window.addEventListener('resize', this.computeWindowBounds);
  },
  destroyed() { window.removeEventListener('resize', this.computeWindowBounds); },

  components: {
    'problem-overview-card': require('./components/problem-overview-card/problem-overview-card.vue').default,
  },
};
