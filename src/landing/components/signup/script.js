import auth from '../../../auth';

export default {
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  }),

  methods: {
    signup() {
      auth.signup(
        this.username,
        this.password,
        this.email,
        [this.firstName, this.lastName].join(' '),
      ).then(() => auth.login(this.username, this.password));
    },
  },

  mounted() {
    this.$refs.firstNameInput.focus();
  },
};
