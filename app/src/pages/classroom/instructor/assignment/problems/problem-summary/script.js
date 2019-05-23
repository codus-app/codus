import { mapGetters } from 'vuex';

export default {
  props: {
    problem: Object,
    expanded: Boolean,
  },

  computed: mapGetters(['getUser']),

  methods: {
    expand() { this.$emit('expand'); },
    collapse() { this.$emit('collapse'); },
    toggle() {
      if (this.expanded) this.collapse();
      else this.expand();
    },
  },
};
