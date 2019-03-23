import { delay } from '../../helpers';

export default {
  props: {
    index: { type: Number, default: 0 },
    transitionDuration: { type: Number, default: 200 },
    staggerFunc: { type: Function, default: i => Math.log(i + 1) * 75 },
  },

  methods: {
    transition(direction) {
      return {
        transitionProperty: 'transform, opacity',
        transitionDuration: `${this.transitionDuration / 1000}s, ${this.transitionDuration / 1000 * (direction === 'in' ? 0.85 : 1)}s`,
        transitionDelay: `${this.staggerFunc(this.index) / 1000}s`,
        transitionTimingFunction: ({ in: 'cubic-bezier(0.215, 0.61, 0.355, 1)', out: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' })[direction],
      };
    },

    async enter(el, done) {
      // Move off to right
      Object.assign(el.style, {
        opacity: '0',
        transform: 'translate(100%)',
      });
      // Wait for styles to apply
      (() => {})(el.offsetHeight);
      await delay(50);
      // Transition in
      Object.assign(el.style, {
        opacity: 1,
        transform: null,
        ...this.transition('in'),
      });
      // Wait for transition to complete
      await delay(this.transitionDuration + this.staggerFunc(this.index));
      // Clean up
      ['opacity', 'transform', 'transitionProperty', 'transitionDuration', 'transitionDelay']
        .forEach((prop) => { el.style[prop] = null; });
      done();
    },

    async leave(el, done) {
      // Transition out
      Object.assign(el.style, {
        ...this.transition('out'),
        opacity: '0',
        transform: 'translate(100%)',
      });
      // Wait for transition to complete
      await delay(this.transitionDuration + this.staggerFunc(this.index));
      done();
    },
  },
};
