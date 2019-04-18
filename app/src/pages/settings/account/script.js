import { mapState, mapGetters, mapActions } from 'vuex';
import debounce from 'debounce';
import isEmail from 'validator/lib/isEmail';
import * as api from '../../../api';
window.debounce = debounce;

let debouncedCheckUsername;

export default {
  data: () => ({
    newImage: undefined,
    pictureStatus: undefined,
    pictureMessage: '',

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

    codeToJoin: undefined,
    leaveModalOpen: false,
  }),

  computed: {
    ...mapGetters(['profile', 'role']),
    ...mapState('classroom/student', ['classroom', 'classroomFetched']),

    changed() {
      return Object.keys(this.profile).length // Profile loaded
        && (this.username !== (this.profile.username || this.profile.nickname)
          || this.name !== this.profile.name
          || this.email !== this.profile.email // Info changed
          || !!this.newImage);
    },

    canSave() {
      return this.changed
        && [this.usernameStatus, this.nameStatus, this.emailStatus]
          .every(st => !['loading', 'failure'].includes(st));
    },
  },

  created() {
    if (Object.keys(this.profile).length) {
      this.username = this.profile.username || this.profile.nickname;
      this.name = this.profile.name;
      this.email = this.profile.email;
    } else {
      this.$once('profileChanged', () => {
        this.username = this.profile.username;
        this.name = this.profile.name;
        this.email = this.profile.email;
      });
    }
  },

  watch: {
    profile() { this.$emit('profileChanged'); },

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

    email(email) {
      if (!isEmail(email)) {
        this.emailStatus = 'failure';
        this.emailMessage = 'Must be a valid email';
      } else {
        this.emailStatus = 'neutral';
        this.emailMessage = '';
      }
    },

    pictureStatus(status) { if (status === 'failure') this.newImage = undefined; },
  },

  methods: {
    ...mapActions(['updatePrimaryUserProfile', 'uploadProfileImage']),
    ...mapActions('classroom/student', ['joinClassroom', 'leaveClassroom']),

    join() {
      return this.joinClassroom(this.codeToJoin)
        .catch((e) => { this.codeToJoin = ''; throw e; });
    },

    // Make a request to check availability of a username
    async checkUsername() {
      // the AbortController will be used to stop the request if the user continues to type
      this.usernameRequestController = new AbortController();
      try {
        // Make API request
        const { available } = await api.get({
          endpoint: `user-check/username/${this.username}`,
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

    save() {
      const patch = {};
      if (this.username !== this.profile.username) patch.username = this.username;
      if (this.name !== this.profile.name) patch.name = this.name;
      if (this.email !== this.profile.email) patch.email = this.email;

      // Make requests

      const reqs = [];
      // Update basic profile information
      if (Object.keys(patch).length) reqs.push(this.updatePrimaryUserProfile(patch));
      // Update profile image (takes separate request)
      if (this.newImage) reqs.push(this.uploadProfileImage(this.newImage));
      // Wait for all requests to complete
      return Promise.all(reqs)
        .then((responses) => { this.newImage = undefined; return responses; });
    },

    saved() {
      // Reset messages and statuses after successful save
      ['username', 'name', 'email'].forEach((c) => {
        this[`${c}Status`] = 'neutral';
        this[`${c}Message`] = '';
      });
    },

    errored(errs) {
      errs.forEach(({ key, message }) => {
        this[`${key}Status`] = 'failure';
        this[`${key}Message`] = message;
      });
    },
  },

  components: {
    'profile-picture-upload': require('./components/profile-picture-upload/profile-picture-upload.vue').default,
    'password-reset': require('./components/password-reset/password-reset.vue').default,
  },
};
