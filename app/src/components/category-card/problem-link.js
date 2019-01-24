export default {
  template: '<router-link v-bind:to="location" class="problem-link" v-bind:class="{passed}">{{ name }}</router-link>',

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
