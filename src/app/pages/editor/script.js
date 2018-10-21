import dedent from 'dedent';
import debounce from 'debounce';
import { mapGetters, mapActions } from 'vuex';

import cmOptions from './codemirror-config/';

export default {
  data: () => ({
    cmOptions,
    code: '',
    saving: null,
    deletionConfirmOpen: false,
  }),

  computed: {
    ...mapGetters(['getSolution', 'getProblem']),

    category() { return this.$route.params.category; },
    problemName() { return this.$route.params.name; },
    problem() { return this.getProblem(this.category, this.problemName); },

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
  },


  methods: {
    ...mapActions(['fetchSolution', 'saveSolution']),

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
  },

  async created() {
    await this.fetchSolution({ category: this.category, problem: this.problemName });
    this.code = this.remoteCode || this.baseCode;
    // null for "unsaved" if there's no remote code, otherwise false for "saved"
    this.saving = typeof this.remoteCode === 'undefined' ? null : false;
  },
};
