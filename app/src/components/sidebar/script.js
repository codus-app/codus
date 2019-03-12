import { mapActions, mapGetters } from 'vuex';
import routes from '../../pages';

export default {
  props: { collapsed: Boolean },

  computed: {
    ...mapGetters(['profile', 'role']),

    routes() { return routes[this.role] || []; },

    username() { return this.profile.username || this.profile.nickname; },
  },

  methods: {
    ...mapActions({ logout: 'auth/logout' }),

    getRoutes(category) { return this.routes.filter(r => r.meta.category === category); },

    openContextMenu() {
      this.$refs.contextmenuTrigger._tippy.show(); // eslint-disable-line no-underscore-dangle
    },
  },

  components: {
    'sidebar-link': require('./sidebar-link.vue').default,
    'sidebar-user-profile': require('./sidebar-user-profile/sidebar-user-profile.vue').default,
  },
};
