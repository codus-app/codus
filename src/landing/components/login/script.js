import auth from '../../auth';

export default {
  data: () => ({
    username: '',
    password: '',
    error: {},
  }),

  methods: {
    login() {
      auth.login(this.username, this.password)
        .catch((err) => { this.error = err; });
    },
  },

  mounted() {
    this.$refs.usernameInput.focus();
  },
};
