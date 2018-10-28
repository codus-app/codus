import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['categoriesFetched', 'categories']),
  },
  methods: {
    ...mapActions(['fetchCategories']),
  },

  created() {
    if (!this.categoriesFetched) this.fetchCategories();
  },

  components: {
    'category-folder': require('./category-folder.vue').default,
  },
};
