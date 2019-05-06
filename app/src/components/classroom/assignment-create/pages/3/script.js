import { en } from 'vuejs-datepicker/dist/locale';
en.days = 'su mo tu we th fr sa'.split(' ');

const now = new Date();

export default {
  props: { date: Date },

  data: () => ({
    en,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  }),

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
