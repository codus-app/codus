const now = new Date();

export default {
  props: { date: Date },

  data: () => ({
    mounted: false,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  }),

  components: {
    'date-time-display': require('../../components/date-time-display/date-time-display.vue').default,
    'date-picker': require('../../components/date-picker/date-picker.vue').default,
    'time-picker': require('../../components/time-picker/time-picker.vue').default,
    'proceed-button': require('../../components/proceed-button/proceed-button.vue').default,
  },
};
