import dedent from 'dedent';

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

  methods: {
    async fetchData() {
      const problem = await api.get(`/problem/${this.category}/${this.problemName}`);
      this.problem = problem;
      this.code = this.getBase();
    },

    getBase() {
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

  async created() {
    await this.fetchData();
    this.code = this.getBase();
  },
};
