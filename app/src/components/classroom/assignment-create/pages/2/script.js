import { mapState } from 'vuex';

export default {
  props: { selected: Array },

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
