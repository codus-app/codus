import { delay } from '../../helpers';

export default {
  props: { value: String, placeholder: String, onClick: Function },

  data: () => ({ failed: false }),

  methods: {
    click() {
      const value = this.onClick();
      if (value instanceof Promise) {
        value
          .then(() => this.$emit('success'))
          .catch(() => {
            this.$emit('failure');
            this.failure();
          });
      }
    },

    async failure() {
      this.failed = true;
      await delay(500);
      this.failed = false;
    },
  },
};
