import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['contentFetched', 'categories']),
    ...mapGetters(['isSolved', 'isSolutionBegun', 'isCategoryComplete']),
  },
  methods: {
    ...mapActions(['fetchContent']),
  },

  created() {
    if (!this.contentFetched) this.fetchContent();
  },

  components: {
    'category-folder': require('./category-folder.vue').default,
    'problem-link': require('./problem-link.vue').default,
  },
};
