import Mousetrap from 'mousetrap';

// Override default "stopCallback" checker to allow keybindings from within codemirror
Mousetrap.prototype.stopCallback = (evt, el) => {
  if (el.closest('.CodeMirror')) return false;
  // The rest of this function mirrors the default implementation
  // https://craig.is/killing/mice#api.stopCallback
  if (el.classList.contains('mousetrap')) return false;
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)
    || (el.contentEditable === 'true');
};

export default {
  install(Vue) {
    // Utility for transforming 'mod+X' to '⌘+X' on Mac and 'Cmd+X' on Windows/Linux
    const mac = window.navigator.platform.includes('Mac');

    Vue.prototype.$nativizeShortcut = shortcut => shortcut
      .replace(/mod/g, mac ? '\u2318' : 'Ctrl')
      .replace(/backspace/g, '\u232B');

    // If the component has a keyboardShortcuts property, bind on created and unbind on destroyed
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
