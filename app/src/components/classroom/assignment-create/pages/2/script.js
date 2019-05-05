import { mapState } from 'vuex';

export default {
  data: () => ({
    selected: [],
  }),

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
