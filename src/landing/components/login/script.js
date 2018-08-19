import auth from '../../../auth';

export default {
  data: () => ({
    username: '',
    password: '',
  }),

  methods: {
    login() {
      auth.login(this.username, this.password);
    },
  },

  mounted() {
    this.$refs.usernameInput.focus();
  },
};
