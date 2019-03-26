import { mapActions, mapState, mapGetters } from 'vuex';
import routes from '../../pages';

export default {
  props: { collapsed: Boolean },

  computed: {
    ...mapGetters(['profile', 'role']),
    ...mapGetters('classroom/instructor', ['selectedClassroom']),
    ...mapState('classroom/instructor', ['classroomsFetched']),

    routes() { return routes[this.role] || []; },

    username() { return this.profile.username || this.profile.nickname; },
  },

  methods: {
    ...mapActions({ logout: 'auth/logout' }),

    getRoutes(category) { return this.routes.filter(r => r.meta.category === category); },

    replaceParams(path) {
      const currentClassCode = ({
        instructor: (this.selectedClassroom || {}).code,
        student: null, // TODO
      })[this.role];

      return path
        // Replace '/:username' with the user's username
        .replace(/\/:username(?=$|\/)/g, `/${this.username}`)
        // Replace '/:classroomCode' with the current classroom's code
        .replace(/\/:classroomCode(?=$|\/)/g, `/${currentClassCode}`);
    },

    openContextMenu() {
      this.$refs.contextmenuTrigger._tippy.show(); // eslint-disable-line no-underscore-dangle
    },

  },

  components: {
    'sidebar-link': require('./sidebar-link.vue').default,
    'sidebar-user-profile': require('./sidebar-user-profile/sidebar-user-profile.vue').default,
    'classroom-switcher': require('./classroom-switcher/classroom-switcher.vue').default,
  },
};
