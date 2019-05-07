const now = new Date();

export default {
  props: { date: Date },

  data: () => ({
    mounted: false,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  }),

  components: {
    'date-picker': require('./date-picker/date-picker.vue').default,
    'time-picker': require('./time-picker/time-picker.vue').default,
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
