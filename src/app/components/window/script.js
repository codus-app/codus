export default {
  props: {
    canResize: { type: Boolean, default: true },
    canMove: { type: Boolean, default: true },
    canCollapse: { type: Boolean, default: true },
    bounds: { type: Array, default: () => [0, 0, window.innerWidth, window.innerHeight] },
    collapsed: { Boolean, default: true },
  },

  methods: {
    expand() { this.$emit('expand'); },
    collapse() { this.$emit('collapse'); },
  },
};
