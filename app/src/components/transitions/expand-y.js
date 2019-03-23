import { delay } from '../../helpers';

export default {
  props: { transitionDuration: { type: Number, default: 300 } },

  methods: {
    async enter(el, done) {
      // Capture element height
      Object.assign(el.style, { position: 'absolute', opacity: '0' });
      const { height } = el.getBoundingClientRect();
      // Set to 0 height
      Object.assign(el.style, {
        height: '0',
        paddingTop: '0',
        paddingBottom: '0',
        overflow: 'hidden',
        transition: `height ${this.transitionDuration / 1000}s, opacity ${this.transitionDuration / 1000}s`,
        position: null,
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      // Transition in
      Object.assign(el.style, {
        height: `${height}px`,
        opacity: null,
      });
      // Wait for transition to complete
      await delay(this.transitionDuration);
      // Clean up
      ['height', 'transition', 'overflow', 'padding-top', 'padding-bottom', 'opacity']
        .forEach((prop) => { el.style[prop] = null; });
      done();
    },

    async leave(el, done) {
      // Make height explicit
      const { height } = el.getBoundingClientRect();
      Object.assign(el.style, {
        height: `${height}px`,
        overflow: 'hidden',
        transition: `height ${this.transitionDuration / 1000}s, opacity ${this.transitionDuration / 1000}s`,
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      // Transition out
      Object.assign(el.style, {
        height: '0',
        paddingTop: '0',
        paddingBottom: '0',
        opacity: '0',
      });
      // Wait for transition to complete
      await delay(this.transitionDuration);
      done();
    },
  },
};
