export default {
  props: { value: Date },

  data() {
    return {
      month: '',
      day: this.value ? this.value.getDate() : '',
      hours: this.value ? this.value.getHours() % 12 : '',
      minutes: this.value ? this.value.getMinutes() : '',
      // eslint-disable-next-line no-nested-ternary
      period: this.value
        ? ((this.date().getHours() >= 12) ? 'pm' : 'am')
        : 'am',

      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],

      textCanvas: document.createElement('canvas'),
    };
  },

  computed: {
    maxDayForMonth() {
      const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return this.month
        ? maxDays[this.month]
        : 31;
    },

    constructedDate() {
      if ([this.month, this.day, this.hours, this.minutes].some(n => n.length)) {
        return new Date(2019,
          this.month,
          this.day,
          this.twentyfour(this.hours, this.period),
          this.minutes);
      }
      return null;
    },

  },

  methods: {
    twentyfour(hours, period) {
      if (parseInt(hours, 10) === 12) return ({ am: 0, pm: 12 })[period];
      return parseInt(hours, 10) + ({ am: 0, pm: 12 })[period];
    },

    textWidth(text) {
      const ctx = this.textCanvas.getContext('2d');
      const rem = parseFloat(getComputedStyle(document.body).fontSize);
      ctx.font = `${rem * 0.95}px 'lato', sans-serif`;
      return `${ctx.measureText(text).width / rem}rem`;
    },

    // Get the future value of an input from a 'keydown' event (when it's not too late to cancel)
    getUpcomingValue(evt) {
      const { selectionStart, selectionEnd, value } = evt.target;
      const noSelection = selectionStart === selectionEnd;
      if (evt.key.length === 1) {
        return value.substring(0, selectionStart) + evt.key + value.substring(selectionEnd);
      } if (evt.key === 'Backspace') {
        return value.substring(0, selectionStart - (noSelection ? 1 : 0))
          + value.substring(selectionEnd);
      } if (evt.key === 'Delete') {
        return value.substring(0, selectionStart)
          + value.substring(selectionEnd + (noSelection ? 1 : 0));
      }
      return value;
    },
  },

  watch: {
    value() { /* TODO: implement */ },
    constructedDate() { this.$emit('input', this.constructedDate); },

    // When month changes, if the day doesn't exist in that month, change to the greatest day that
    // does
    month() { if (this.day) this.day = Math.min(this.day, this.maxDayForMonth); },
  },
};
