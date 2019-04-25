import { delay } from '../../helpers';

export default {
  props: { transitionDuration: { type: Number, default: 300 } },

  methods: {
    transition(direction) {
      const duration1 = `${this.transitionDuration / 1000}s, `;
      const duration2 = `${this.transitionDuration / 1000 * (direction === 'in' ? 0.65 : 1)}s`;
      return {
        transitionProperty: 'height, padding-top, padding-bottom, margin-top, margin-bottom, opacity',
        transitionDuration: duration1.repeat(3) + duration2,
      };
    },

    async enter(el, done) {
      // Capture element height
      Object.assign(el.style, { position: 'absolute', opacity: '0' });
      const { height } = el.getBoundingClientRect();
      // Set to 0 height
      Object.assign(el.style, {
        height: '0',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0',
        overflow: 'hidden',
        position: null,
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      // Transition in
      Object.assign(el.style, {
        ...this.transition('in'),
        height: `${height}px`,
        paddingTop: null,
        paddingBottom: null,
        marginTop: null,
        marginBottom: null,
        opacity: null,
      });
      // Wait for transition to complete
      await delay(this.transitionDuration);
      // Clean up
      ['height', 'transition', 'overflow']
        .forEach((prop) => { el.style[prop] = null; });
      done();
    },

    async leave(el, done) {
      // Make height explicit
      const { height } = el.getBoundingClientRect();
      Object.assign(el.style, {
        height: `${height}px`,
        overflow: 'hidden',
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      // Transition out
      Object.assign(el.style, {
        ...this.transition('out'),
        height: '0',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0',
        opacity: '0',
      });
      // Wait for transition to complete
      await delay(this.transitionDuration);
      done();
    },
  },
};
