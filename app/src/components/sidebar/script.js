import urljoin from 'url-join';
import { mapActions, mapState, mapGetters } from 'vuex';
import routes from '../../pages';

export default {
  props: { collapsed: Boolean },

  computed: {
    ...mapGetters(['profile', 'role']),
    ...mapGetters('classroom/instructor', { instructorSelectedClassroom: 'selectedClassroom' }),
    ...mapState('classroom/instructor', { instructorClassroomsFetched: 'classroomsFetched' }),
    ...mapState('classroom/student', { studentClassroom: 'classroom' }),

    routes() {
      const roleRoutes = routes[this.role] || [];
      return [
        // Routes without children can be added straight up
        ...roleRoutes.filter(r => !r.children),
        // Routes with children need to be processed (only works 1 level deep)
        ...roleRoutes
          .filter(r => r.children)
          // Convert to nested array of child routes where each route has its path adjusted to be
          // absolute
          .map(r => r.children.map(r2 => ({ ...r2, path: urljoin(r.path, r2.path) })))
          // Flatten that
          .flat(),
      ];
    },

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
        .replace(/\/:classroomCode(?=$|\/)/g, `/${currentClassCode}`)
        // Replace optional params at the end of routes with nothing
        .replace(/\/:.*\?\/?$/g, '/');
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
