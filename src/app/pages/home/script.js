import * as api from '../../api';

export default {
  data: () => ({
    categories: [],
    cardsFaded: false,
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const categories = await api.get('/categories');
      this.categories = categories.map(c => c.id);
    },

    closeAll() {
      this.$children.forEach((c) => { c.expanded = false; });
    },
  },
};
