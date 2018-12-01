import auth from '../../auth';

const base = !Number.isNaN(parseInt(window.location.hostname, 10)) || window.location.hostname === 'localhost'
  ? `http://${window.location.hostname}:3000/api`
  : 'https://api.codus.arkis.io/api';


export default {
  data: () => ({
    name: '',
    email: '',
    username: '',
    password: '',
    errors: [],
  }),

  methods: {
    signup() {
      fetch(`${base}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
        }),
      })
        .then(r => r.json())
        .then(({ data, error }) => {
          if (error) this.errors = error;
          else auth.login(data.username, this.password);
        });
    },
  },

  mounted() {
    this.$el.getElementsByTagName('input')[0].focus();
  },
};
