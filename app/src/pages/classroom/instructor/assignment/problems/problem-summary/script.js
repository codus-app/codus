import { mapGetters } from 'vuex';

export default {
  props: {
    problem: Object,
    expanded: Boolean,
    totalStudents: Number,
  },

  computed: {
    ...mapGetters(['getUser']),

    correct() { return this.problem.studentSolutions.correct; },
    incorrect() { return this.problem.studentSolutions.incorrect; },
  },

  methods: {
    expand() { this.$emit('expand'); },
    collapse() { this.$emit('collapse'); },
    toggle() {
      if (this.expanded) this.collapse();
      else this.expand();
    },
  },
};
