import dedent from 'dedent';
import debounce from 'debounce';
import { mapGetters, mapActions } from 'vuex';

import cmOptions from './codemirror-config/';

import * as api from '../../api';


export default {
  data() {
    return {
      cmOptions,
      category: this.$route.params.category,
      problemName: this.$route.params.name,
      problem: {},
      code: '',
      saving: null,
    };
  },

  computed: {
    ...mapGetters(['getSolution']),

    // The "starting" code for the problem
    baseCode() {
      const parameters = this.problem.parameters.map(p => `${p.type} ${p.name}`);
      return dedent`
        public class ${this.problem.name} {
          public ${this.problem.resultType} main(${parameters.join(', ')}) {
            // Your code here
          }
        }
      `;
    },

    // The version of the user's code that's on the server
    remoteCode() {
      return (this.getSolution(this.category, this.problemName) || {}).code;
    },
  },


  methods: {
    ...mapActions(['saveSolution']),

    async fetchData() {
      const problem = await api.get(`/problem/${this.category}/${this.problemName}`);
      this.problem = problem;
    },

    /* eslint-disable max-len */
    onInput(e) {
      this.code = e;

      if (this.$store.state.userFetched // We have access to the current saved code
        && this.code !== this.remoteCode // The code has changed since last save
        && !(this.code === this.baseCode && !this.remoteCode) // If no solution is saved, only create once code deviates from base
      ) {
        this.debouncedSave();
        this.saving = true;
      }
    },
    /* eslint-enable max-len */

    async save() {
      await this.saveSolution({
        name: this.problemName,
        category: this.category,
        code: this.code,
      });
      this.saving = false;
    },


    debouncedSave: debounce(function save2() { this.save(); }, 750),
  },

  async created() {
    await Promise.all([
      // Wait for user data so that we can display a pre-existing solution
      new Promise((resolve) => {
        if (this.$store.state.userFetched) resolve();
        else this.$store.subscribe((mutation) => { if (mutation.type === 'userFetched') resolve(); });
      }),
      // Fetch problem info so that we can display a base solution in lieu of a user solution
      this.fetchData(),
    ]);
    this.code = this.remoteCode || this.baseCode;
    // null for "unsaved" if there's no remote code, otherwise false for "saved"
    this.saving = typeof this.remoteCode === 'undefined' ? null : false;
  },
};
