export default {
  props: { value: Date },

  data: () => ({
    month: '',
    day: null,
    hours: null,
    minutes: null,

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
  }),

  computed: {
    period: {
      get() { return (this.date().getHours() >= 12) ? 'pm' : 'am'; },
      set(value) { this.$emit('input', new Date(this.date().setHours(this.twentyfour(this.hours, value)))); },
    },
  },

  methods: {
    date() { return new Date((this.value || new Date()).getTime()); },

    twentyfour(hours, period) {
      if (parseInt(hours, 10) === 12) return ({ am: 0, pm: 12 })[period];
      return parseInt(hours, 10) + ({ am: 0, pm: 12 })[period];
    },

    getMonth() { return this.date().getMonth(); },
    setMonth(value) { this.$emit('input', new Date(this.date().setMonth(value))); },

    getDay() { return this.date().getDate(); },
    setDay(value) { this.$emit('input', new Date(this.date().setDate(value))); },

    getHours() { return this.date().getHours() % 12; },
    setHours(value) { this.$emit('input', new Date(this.date().setHours(this.twentyfour(value, this.period)))); },

    getMinutes() { return this.date().getMinutes().toString().padStart(2, '0'); },
    setMinutes(value) { this.$emit('input', new Date(this.date().setMinutes(value))); },

    textWidth(text) {
      const ctx = this.textCanvas.getContext('2d');
      const rem = parseFloat(getComputedStyle(document.body).fontSize);
      ctx.font = `${rem * 0.95}px 'lato', sans-serif`;
      return `${ctx.measureText(text).width / rem}rem`;
    },
  },

  // watch: {
  //   value() { this.update(); },
  // },
};
