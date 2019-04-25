import { delay } from '../../helpers';

export default {
  props: {
    transitionDuration: { type: Number, default: 300 },
    axis: { type: String, default: 'y', validator: value => ['x', 'y'].includes(value) },
  },

  computed: {
    styleProps() {
      return this.axis === 'y'
        ? ['height', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom']
        : ['width', 'paddingLeft', 'paddingRight', 'marginLeft', 'marginRight'];
    },
  },

  methods: {
    getStyleObject(value) {
      return Object.assign({}, ...this.styleProps.map(p => ({ [p]: value })));
    },

    transition(direction) {
      const duration1 = `${this.transitionDuration / 1000}s, `;
      const duration2 = `${this.transitionDuration / 1000 * (direction === 'in' ? 0.65 : 1)}s`;
      return {
        transitionProperty: 'height, width, padding-top, padding-right, padding-bottom, padding-left, margin-top, margin-right, margin-bottom, margin-left, opacity',
        transitionDuration: duration1.repeat(10) + duration2,
      };
    },

    async enter(el, done) {
      // Capture element width/height
      Object.assign(el.style, { position: 'absolute', opacity: '0' });
      const { width, height } = el.getBoundingClientRect();
      // Set to 0 width or height
      Object.assign(el.style, {
        ...this.getStyleObject('0'),
        overflow: 'hidden',
        position: null,
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      // Transition in
      Object.assign(el.style, {
        ...this.transition('in'),
        ...this.getStyleObject(null),
        ...this.axis === 'x' && { width: `${width}px` },
        ...this.axis === 'y' && { height: `${height}px` },
        opacity: null,
      });
      // Wait for transition to complete
      await delay(this.transitionDuration);
      // Clean up
      ['height', 'width', 'transition', 'overflow']
        .forEach((prop) => { el.style[prop] = null; });
      done();
    },

    async leave(el, done) {
      // Make height or width explicit
      const { height, width } = el.getBoundingClientRect();
      Object.assign(el.style, {
        ...this.axis === 'x' && { width: `${width}px` },
        ...this.axis === 'y' && { height: `${height}px` },
        overflow: 'hidden',
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      // Transition out
      Object.assign(el.style, {
        ...this.transition('out'),
        ...this.getStyleObject('0'),
        opacity: '0',
      });
      // Wait for transition to complete
      await delay(this.transitionDuration);
      done();
    },
  },
};
