import * as api from '../../api';

export default {
  data() {
    return {
      category: this.$route.params.category,
      problemName: this.$route.params.name,
      problem: {},
    };
  },

  methods: {
    async fetchData() {
      const problem = await api.get(`/problem/${this.category}/${this.problemName}`);
      this.problem = problem;
    },
  },

  created() {
    this.fetchData();
  },
};
