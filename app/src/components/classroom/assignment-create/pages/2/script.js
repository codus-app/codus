import { mapState } from 'vuex';

export default {
  props: { selected: Array },

  computed: {
    ...mapState(['categories']),
  },

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
