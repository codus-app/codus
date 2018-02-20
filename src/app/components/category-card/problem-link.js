export default {
  template: '<a v-bind:href="location" class="problem-link" v-bind:class="{passed}">{{ name }}</a>',

  props: ['category', 'name', 'passed'],

  computed: {
    location() { return `/app/problem/${this.category}/${this.name}`; },
  },
};
