import { delay } from '../../helpers';

export default {
  props: { value: String, placeholder: String, onClick: Function },

  methods: {
    click() {
      const value = this.onClick();
      if (value instanceof Promise) {
        value
          .then(() => this.$emit('success'))
          .catch(() => {
            this.$emit('failure');
          });
      }
    },
  },
};
