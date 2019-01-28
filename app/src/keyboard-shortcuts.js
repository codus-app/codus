import Mousetrap from 'mousetrap';

export default {
  install(Vue) {
    Vue.mixin({
      created() {
        const kbs = this.$options.keyboardShortcuts;
        if (kbs) Object.entries(kbs).forEach(([sc, func]) => Mousetrap.bind(sc, func.bind(this)));
      },
      destroyed() {
        const kbs = this.$options.keyboardShortcuts;
        if (kbs) Object.keys(kbs).forEach(sc => Mousetrap.unbind(sc));
      },
    });
  },
};
