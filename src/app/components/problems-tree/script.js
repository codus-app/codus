import * as api from '../../api';

export default {
  data: () => ({
    problems: {},
  }),

  computed: {
    categories() {
      return Object.keys(this.problems);
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() { this.problems = await api.get('/solutions'); },
  },
};
