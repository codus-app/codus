import { clamp } from '../../helpers';

export default {
  props: {
    canResize: { type: Boolean, default: true },
    canMove: { type: Boolean, default: true },
    canCollapse: { type: Boolean, default: true },
    bounds: { type: Array, default: () => [0, 0, window.innerWidth, window.innerHeight] },
    collapsed: { Boolean, default: true },
  },

  data: () => ({
    previousPos: [0, 0],
    mouseStart: [], // When dragging, this is where the mouse started
    pos: [0, 0],
    mouseAction: null,
    initialBounds: {},
  }),

  mounted() {
    this.computeBounds();
    window.addEventListener('resize', this.computeBounds);
  },
  destroyed() { window.removeEventListener('resize', this.computeBounds); },

  computed: {
    transform() {
      const [x, y] = this.collapsed ? [0, 0] : this.pos;
      return x !== 0 && y !== 0
        ? [
          `translateX(${x}px)`,
          `translateY(${y}px)`,
        ].join(' ')
        : undefined;
    },
  },

  methods: {
    expand() { this.$emit('expand'); },
    collapse() { this.$emit('collapse'); },

    topBarClick(e) {
      if (!this.collapsed && e.target === this.$refs['top-bar']) {
        this.previousPos = this.pos;
        this.mouseStart = [e.clientX, e.clientY];
        this.mouseAction = 'move';
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.topBarRelease);
      }
    },

    drag(e) {
      e.preventDefault();
      const [startX, startY] = this.mouseStart;
      const [prevX, prevY] = this.previousPos;
      const x = prevX + (e.clientX - startX);
      const y = prevY + (e.clientY - startY);

      const minX = this.bounds[0] - this.initialBounds.left;
      const maxX = this.bounds[2] - this.initialBounds.right;
      const minY = this.bounds[1] - this.initialBounds.top;
      const maxY = this.bounds[3] - this.initialBounds.bottom;
      this.pos = [
        clamp(x, minX, maxX),
        clamp(y, minY, maxY),
      ];
    },

    topBarRelease() {
      this.mouseStart = [];
      this.mouseAction = null;
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('mouseup', this.titleBarRelease);
    },

    // Recompute what the initial boundaries of the expanded window element are (ignoring
    // transforms). Called IF window is expanded, on mount, resize, and change of "collapsed" state.
    computeBounds() {
      if (this.collapsed) return;

      const { top, right, bottom, left, width, height } = this.$el.getBoundingClientRect(); // eslint-disable-line object-curly-newline, max-len
      const [x, y] = this.pos;
      this.initialBounds = {
        top: top - y,
        right: right - x,
        bottom: bottom - y,
        left: left - x,
        width,
        height,
      };
    },
  },
  watch: { collapsed() { setTimeout(this.computeBounds, 500); } },
};
