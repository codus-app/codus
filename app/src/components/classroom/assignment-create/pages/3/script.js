import { en } from 'vuejs-datepicker/dist/locale';
en.days = 'su mo tu we th fr sa'.split(' ');

const now = new Date();

export default {
  props: { date: Date },

  data: () => ({
    en,
    mounted: false,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    monthDisplayed: now,
  }),

  computed: {
    datepicker() {
      return this.mounted && this.$refs.datepicker;
    },
  },

  methods: {
    calendarPageChanged(e) {
      this.monthDisplayed = e;
    },
  },

  mounted() {
    this.mounted = true;
  },

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
