import * as api from '../../api';

export default {
  data: () => ({
    categories: [],
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const categories = await api.get('/categories');
      this.categories = categories.map(c => c.id);
    },
  },
};
