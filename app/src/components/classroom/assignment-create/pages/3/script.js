const now = new Date();

export default {
  props: { date: Date },

  data: () => ({
    mounted: false,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  }),

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
