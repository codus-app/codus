import ResizeSensor from 'css-element-queries/src/ResizeSensor';

export default {
  props: ['profile'],

  mounted() {
    this.$refs.picture.addEventListener('load', this.layout);
    window.addEventListener('resize', this.layout);
    this.resizeSensor = new ResizeSensor(this.$el, this.layout);
  },
  destroyed() { window.removeEventListener('resize', this.layout); },

  methods: {
    layout() {
      const { height } = this.$refs.picture.getBoundingClientRect();
      this.$refs.picture.style.width = `${height}px`;
      this.$refs.picture.style.opacity = 1;
    },
  },
};
