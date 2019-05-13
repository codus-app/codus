function validDate(value) { return !Number.isNaN(Number(value)); }

export default {
  props: { value: Date },

  data() {
    return {
      month: '',
      day: validDate(this.value) ? this.value.getDate() : undefined,
      hours: validDate(this.value) ? this.value.getHours() % 12 : undefined,
      minutes: validDate(this.value) ? this.value.getMinutes() : undefined,
      // eslint-disable-next-line no-nested-ternary
      period: validDate(this.value)
        ? ((this.value.getHours() >= 12) ? 'pm' : 'am')
        : 'pm',

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

    noTime() {
      return [undefined, ''].includes(this.hours) && [undefined, ''].includes(this.minutes);
    },

    dateComponents() {
      const { noTime } = this;
      return [
        this.month,
        this.day,
        // If neither hours nor minutes is defined, default to 11:59 pm
        this.twentyfour(noTime ? 11 : this.hours, noTime ? 'pm' : this.period),
        noTime ? 59 : this.minutes,
      ];
    },

    constructedDate() {
      const now = new Date();
      let year = now.getFullYear();
      if (new Date(year, ...this.dateComponents) < now) { year += 1; }

      return new Date(year, ...this.dateComponents);
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
    dateComponents() { this.$emit('input', this.constructedDate); },

    // When month changes, if the day doesn't exist in that month, change to the greatest day that
    // does
    month() { if (this.day) this.day = Math.min(this.day, this.maxDayForMonth); },
  },
};
