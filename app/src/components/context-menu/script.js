export default {
  props: {
    targetName: { type: String, required: true },
    placement: { type: String, default: 'bottom-start' },
    items: {
      type: Array,
      required: true,
      // For every object passed in the items array, make sure it's an object and that it has at
      // least the keys "icon," "label," and "onclick"
      validator: val => val.every(n => n instanceof Object && ['icon', 'label', 'onclick'].every(key => Object.keys(n).includes(key))),
    },
    theme: String,
  },

  methods: {
    /* eslint-disable no-underscore-dangle */
    show(i) { i._tippy.popper.firstElementChild.classList.add('shown'); },
    hide(i) { i._tippy.popper.firstElementChild.classList.remove('shown'); },
    /* eslint-enable */

    close() {
      document.querySelectorAll(`[name=${this.targetName}]`)
        .forEach((el) => {
          // eslint-disable-next-line no-underscore-dangle
          if (el._tippy && el._tippy.state.visible) el._tippy.hide();
        });
    },
  },
};
