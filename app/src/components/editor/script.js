import dedent from 'dedent';

import cmConfig from './codemirror-config';
import findReplaceTransition from './components/find-replace-card/transition';

export default {
  props: {
    // Data
    fetched: { type: Boolean, default: true },
    code: String,
    remoteCode: String,
    saveStatus: String,

    problem: Object,
    categoryName: String,

    solved: Boolean,
    testResults: Object,
    checkInProgress: Boolean,

    // Configuration
    readOnly: Boolean,
  },

  data: () => ({
    cmConfig,
    mounted: false,

    findReplaceOpen: false,
    deletionConfirmOpen: false,
    outputCollapsed: true,
    problemBrowserCollapsed: false,
    // Bounds within which the output window can be dragged
    outputWindowBounds: [0, 0, window.innerWidth, window.innerHeight],
  }),

  computed: {
    problemName() { return (this.problem || {}).name; },

    numHiddenTests() { return this.problem.numHidden; },
    numHiddenTestsPassed() {
      return this.testResults.tests.filter(tc => tc.hidden && tc.pass).length;
    },

    errorMessage() { return this.testResults.error; },
    hasOutput() { return !!this.errorMessage; },

    // Number passed divided by total number
    progress() {
      if (!this.testResults.tests.length) return 0;
      return this.testResults.tests.filter(t => t.pass).length / this.testResults.tests.length;
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

    testedCode() { return this.testResults.code; },

    tests() {
      return this.problem.testCases.map((testCase, i) => {
        const result = this.testResults.tests[i] || {};
        return {
          parameters: testCase.parameters,
          expectedResult: testCase.result,
          result: result.value,
          passed: result.pass,
        };
      });
    },
  },

  /* eslint-disable quote-props */
  keyboardShortcuts: {
    'mod+\\': function toggleSidebar() { this.problemBrowserCollapsed = !this.problemBrowserCollapsed; return false; },
    'mod+enter': function run() { this.$emit('solutionCheck'); return false; },
    'mod+shift+backspace': function reset() { this.deletionConfirmOpen = true; return false; },
    'mod+f': function toggleFindReplace() { this.findReplaceOpen = !this.findReplaceOpen; return false; },
    'esc': function closeFindReplace() { this.findReplaceOpen = false; return false; },
  },
  /* eslint-enable */

  methods: {
    reset() {
      this.$emit('input', this.baseCode);
      this.deletionConfirmOpen = false;
    },

    computeWindowBounds() {
      const { top, right, left, bottom } = this.$refs.windowBounds.getBoundingClientRect();
      const rem = parseFloat(getComputedStyle(document.body).fontSize, 10);
      this.outputWindowBounds = [
        left + (0.75 * rem), // x1
        top + (0.7 * rem) + 4, // y1
        right - (0.75 * rem) - 4, // x2
        bottom - (0.7 * rem) - 4, // y2
      ];
    },

    ...findReplaceTransition,

    recalculateProblemsScroll() {
      this.$refs['problems-scroll'].$el.SimpleBar.recalculate();
    },

    recalculateCardsScroll() {
      this.$refs['cards-scroll'].$el.SimpleBar.recalculate();
    },
  },

  // Collapse automatically when output goes away so that next time it's not open
  watch: {
    hasOutput() { if (!this.hasOutput) this.outputCollapsed = true; },
  },

  mounted() {
    this.mounted = true;
    setTimeout(this.computeWindowBounds, 500);
    window.addEventListener('resize', this.computeWindowBounds);
  },
  destroyed() { window.removeEventListener('resize', this.computeWindowBounds); },

  components: {
    'problems-tree': require('./components/problems-tree/problems-tree.vue').default,
    'save-status': require('./components/save-status/save-status.vue').default,
    'problem-overview-card': require('./components/problem-overview-card/problem-overview-card.vue').default,
    'test-case-card': require('./components/test-case-card/test-case-card.vue').default,
    'find-replace-card': require('./components/find-replace-card/find-replace-card.vue').default,
  },
};
