import { en } from 'vuejs-datepicker/dist/locale';
en.days = 'su mo tu we th fr sa'.split(' ');

export default {
  props: { date: Date },

  data: () => ({ en }),

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
