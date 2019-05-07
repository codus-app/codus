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
    prevMonthDisabled: true,
  }),

  computed: {
    datepicker() { return this.mounted && this.$refs.datepicker; },
    datepicker2() { return this.datepicker.$children[1]; },
  },

  methods: {
    calendarPageChanged(e) {
      this.monthDisplayed = e;
    },

    prevMonth() { this.datepicker2.previousMonth(); },
    nextMonth() { this.datepicker2.nextMonth(); },
  },

  watch: {
    monthDisplayed() {
      this.$nextTick()
        .then(() => { this.prevMonthDisabled = this.datepicker2.isLeftNavDisabled; });
    },
  },

  mounted() {
    this.mounted = true;
  },

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
