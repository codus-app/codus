export default {
  template: '<a v-bind:href="location" class="problem-link" v-bind:class="{completed}">{{ problem }}</a>',

  props: ['problem', 'completed'],

  computed: {
    location: () => `/app/problem/${this.problem}`,
  },
};
