import { mapState } from 'vuex';
import debounce from 'debounce';
import * as api from '../../../api';
window.debounce = debounce;

let debouncedCheckUsername;

export default {
  data: () => ({
    username: undefined,
    usernameStatus: 'neutral',
    usernameMessage: '',
    usernameRequestController: undefined,

    name: undefined,
    nameStatus: 'neutral',
    nameMessage: '',

    email: undefined,
    emailStatus: 'neutral',
    emailMessage: '',
  }),

  computed: {
    ...mapState({ profile: state => state.user.profile }),

    profileChanged() {
      const remote = this.profile;
      return Object.keys(this.profile).length // Profile loaded
        && (this.username !== remote.username || this.name !== remote.name); // Info changed
    },
  },

  watch: {
    profile() {
      this.username = this.profile.username;
      this.name = this.profile.name;
      this.email = this.profile.email;
    },

    // Perform validation when username changes
    username(username, old) {
      // Don't validate the initial load (when username changes from undefined to whatever it is)
      if (typeof old === 'undefined') return;

      // Cancel any existing username check requests because the user has continued to type
      if (this.usernameRequestController) {
        this.usernameRequestController.abort();
        this.usernameRequestController = undefined;
      }

      // Usernames must be between 1 and 15 characters
      if (username.length === 0 || username.length > 15) {
        this.usernameStatus = 'failure';
        this.usernameMessage = username.length ? 'Too long!' : "Username can't be blank!";
        debouncedCheckUsername.clear();
      // Usernames can't have any characters besides lowercase letters, numbers, and underscores
      } else if (username.match(/[^a-z0-9_]/)) {
        this.usernameStatus = 'failure';
        this.usernameMessage = 'Usernames can only contain lowercase letters, numbers, and underscores';
        debouncedCheckUsername.clear();
      // If it's not blank, validate
      } else if (username === this.profile.username) {
        this.usernameStatus = 'success';
        this.usernameMessage = "That's you!";
        debouncedCheckUsername.clear();
      } else {
        this.usernameStatus = 'loading';
        this.usernameMessage = this.usernameMessage ? '\xa0' : ''; // non-breaking space
        this.debouncedCheckUsername(this);
      }
    },

    name(name) {
      if (name.length === 0) {
        this.nameStatus = 'failure';
        this.nameMessage = "Name can't be blank!";
      } else if (name.length > 'this is a very long name!'.length) {
        this.nameStatus = 'failure';
        this.nameMessage = 'Too long!';
      } else {
        this.nameStatus = 'neutral';
        this.nameMessage = '';
      }
    },
  },

  methods: {
    // Make a request to check availability of a username
    async checkUsername() {
      // the AbortController will be used to stop the request if the user continues to type
      this.usernameRequestController = new AbortController();
      try {
        // Make API request
        const { available } = await api.get({
          endpoint: `username-check/${this.username}`,
          store: this.$store,
          signal: this.usernameRequestController.signal,
        });
        this.usernameRequestController = undefined;
        // Set username input's status and message based on results
        this.usernameStatus = available ? 'success' : 'failure';
        this.usernameMessage = available ? 'Looks good!' : 'That username is taken!';
      // Most of the time, an error means that the request was aborted, in which case the error is
      // blank. If it's not blank, something actually went wrong and we should report it.
      } catch (e) {
        if (Object.keys(e).length) {
          this.usernameStatus = 'failure';
          this.usernameMessage = e;
        }
      }
    },

    debouncedCheckUsername: debouncedCheckUsername = debounce((t) => { t.checkUsername(); }, 500),
  },

  components: { 'password-reset': require('./password-reset/password-reset.vue').default },
};
