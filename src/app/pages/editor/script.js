import dedent from 'dedent';
import debounce from 'debounce';
import { mapGetters, mapActions, mapState } from 'vuex';

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
    };
  },

  computed: {
    ...mapGetters(['getSolution']),
    ...mapState(['solutionSaveInProgress']),

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

    onInput(e) {
      this.code = e;
      this.debouncedSave();
    },

    save() {
      this.saveSolution({
        name: this.problemName,
        category: this.category,
        code: this.code,
      });
    },

    debouncedSave: debounce(function save2() {
      if (this.code !== this.remoteCode) this.save();
    }, 750),
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
  },
};
