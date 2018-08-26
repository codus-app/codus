import dedent from 'dedent';
import { mapGetters } from 'vuex';

import cmOptions from './codemirror-config/';

import * as api from '../../api';


export default {
  data() {
    return {
      cmOptions,
      category: this.$route.params.category,
      problemName: this.$route.params.name,
      problem: {},
    };
  },

  computed: {
    ...mapGetters(['getSolution']),

    solution() { return this.getSolution(this.category, this.problemName) || {}; },

    code: {
      get() { return this.solution.code || this.getBase(); },
      // TODO
      set(val) { (() => {})(val); },
    },
  },

  methods: {
    async fetchData() {
      const problem = await api.get(`/problem/${this.category}/${this.problemName}`);
      this.problem = problem;
    },

    getBase() {
      if (!Object.keys(this.problem).length) return '';

      const parameters = this.problem.parameters.map(p => `${p.type} ${p.name}`);
      return dedent`
        public class ${this.problem.name} {
          public ${this.problem.resultType} main(${parameters.join(', ')}) {
            // Your code here
          }
        }
      `;
    },
  },

  async created() { await this.fetchData(); },
};
