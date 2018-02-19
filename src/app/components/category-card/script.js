import * as api from '../../api';
global.api = api;
export default {
  props: ['categoryId'],
  data: () => ({
    name: this.categoryId, // Will be replaced with readable name after first HTTP request completes
    description: '',
    problems: [],
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const category = await api.get(`/categoryOverview/${this.categoryId}`).then(r => r.json());

      this.name = category.readableName;
      this.description = category.description;

      const problemNames = category.problems;
      const solvedNames = category.solutions.filter(s => s.passed).map(s => s.name);

      problemNames.forEach(p => this.problems.push({ name: p, passed: solvedNames.includes(p) }));
    },
  },
};
