import { mapActions } from 'vuex';

export default {
  props: { email: { type: String, required: true } },

  data: () => ({ message: '', disabled: false, requested: false }),

  methods: {
    ...mapActions({ requestPasswordReset: 'auth/requestPasswordReset' }),

    onClick() {
      if (!this.requested) {
        this.requested = true;
        this.requestPasswordReset({ email: this.email })
          .then((msg) => { this.message = msg; this.disabled = true; })
          .catch(() => { this.message = 'Something went wrong'; });
      }
    },
  },
};
