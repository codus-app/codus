import { mapActions, mapGetters } from 'vuex';
import routes from '../../pages';

export default {
  props: { collapsed: Boolean },

  data: () => ({
    userRoutes: routes.filter(r => r.meta.category === 'user'),
  }),

  computed: { ...mapGetters(['profile']) },

  methods: {
    ...mapActions({ logout: 'auth/logout' }),

    replaceParams(path) {
      // Replace '/:username' with the user's username
      return path.replace(/\/:username(?=$|\/)/g, `/${this.profile.username || this.profile.nickname}`);
    },
  },

  components: {
    'sidebar-user-profile': require('./sidebar-user-profile/sidebar-user-profile.vue').default,
  },
};
