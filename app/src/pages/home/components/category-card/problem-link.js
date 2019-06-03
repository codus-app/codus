export default {
  props: ['category', 'name', 'passed'],

  computed: {
    location() {
      return {
        name: 'problem',
        params: { category: this.category, name: this.name },
      };
    },
  },
};
