export default {
  template: '<a v-bind:href="location" class="problem-link" v-bind:class="{completed}">{{ problemName }}</a>',

  props: ['category', 'problemName', 'completed'],

  computed: {
    location() { return `/app/problem/${this.category}/${this.problemName}`; },
  },
};
