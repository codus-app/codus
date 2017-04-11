// Component to display an interactive carousel for a series of items
require('./carousel.sass');

/*
 * CarouselItem component
 *
 * Represents a single slide in the carousel. This component mostly just exists to abstract the CSS
 * styles that let the carousel move and animate.
 */


export const CarouselItem = {
  template: '<div class="carousel-item" v-bind:style="style" v-bind:class="classes" v-on:click="centerSelf"><slot></slot></div>',
  data: () => ({
    zIndex: 0,
    xtrans: 0,
    ytrans: 0,
    scale: 1,
    fadeLevel: 0,

    transitionSeconds: 0.5,
    transitionEasing: 'ease',
  }),

  computed: {
    style() {
      return {
        transform: this.transform,
        'z-index': this.zIndex,
        transitionDuration: `${this.transitionSeconds}s`,
        transitionTimingFunction: this.transitionEasing,
      };
    },

    transform() {
      return [
        `translate(${this.xtrans - 50}%, ${this.ytrans - 50}%)`,
        `scale(${this.scale})`,
      ].join(' ');
    },

    classes() {
      return [`fade-${this.fadeLevel}`];
    },
  },

  methods: {
    centerSelf() {
      this.$parent.centerIndex = this.$parent.$children.indexOf(this);
    },
  },
};


/*
 * Carousel component
 *
 * This displays a series of CarouselItems in a nice arrangement and can change which item is
 * displayed in the center position of the carousel.
 */


export const Carousel = {
  // Render function wraps all children in carousel-item components
  render(createElement) {
    return createElement(
      'div',
      {
        class: 'carousel',
        ref: 'carousel',
      },
      this.$slots.default.map(el => createElement('carousel-item', [el])),
    );
  },

  data: () => ({
    centerIndex: undefined,
  }),

  // Begin by centering the first element in the carousel
  mounted() { this.centerIndex = 0; },

  methods: {
    // http://stackoverflow.com/q/4467539
    mod: (n, m) => ((n % m) + m) % m,

    setTransition(duration = 0.5, easing = 'ease') {
      this.$children.forEach((item) => {
        item.transitionSeconds = duration;
        item.transitionEasing = easing;
      });
    },
  },

  watch: {
    // Distribute elements so that they align with the selected elemenent in the center
    centerIndex(index) {
      // The element to be placed in the center position of the carousel
      const center = this.$children[index];
      // Half the length of the carousel (floor)
      const half = this.$children.length / 2;

      // 1. Build a list of items that will be displayed to the left of the item at centerIndex
      const before = [];
      // Keep adding items until half the non-centerIndex items have been added
      for (let i = index - 1; before.length < half; i -= 1) {
        // this._mod is used to emulate a toroidal array by mapping elements below index 0 or beyond
        // the max index to elements in the valid array range
        before.push(this.$children[this.mod(i, this.$children.length)]);
      }

      // 2. Build a list of items that will be displayed to the right of the item at centerIndex
      const after = [];
      // Number of elements that have not yet been accounted for (neither before nor center)
      const numberRemaining = (this.$children.length - before.length - 1);
      // Add the rest of the elements to 'after'
      for (let i = index + 1; after.length < numberRemaining; i += 1) {
        after.push(this.$children[this.mod(i, this.$children.length)]);
      }

      // -- Style all the elements --

      // 3. Position the center element
      center.xtrans = 0;
      center.scale = 1;
      center.fadeLevel = 0;
      center.zIndex = Math.max(before.length, after.length) + 1;

      // 4. Position elements to the left and right. These elements have identical properties except
      // that for elements on the left the X translation is negative.
      [before, after].forEach((list, listIndex) => {
        // Tracks the amount by which the parent was translated
        let parentTrans = 0;

        // Apply styles for each element in selected list
        list.forEach((item, i) => {
          // Set size
          item.scale = 0.8 ** (i + 1);
          // Set x offset. Negative for before, positive for after
          const absolute = (50 * item.scale * 1.25) + parentTrans;
          parentTrans = absolute; // Update how much parent was translated by
          item.xtrans = (listIndex === 0 ? -1 : 1) * absolute;
          // Set level of fade (see carousel.sass)
          item.fadeLevel = Math.min(i + 1, 3);
          // Set z-index
          item.zIndex = Math.max(before.length, after.length) - i;
        });
      });
    },
  },
};
