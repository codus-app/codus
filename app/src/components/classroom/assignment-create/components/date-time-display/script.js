export default {
  props: { value: Date },

  data: () => ({
    month: '',
    day: null,
    hours: null,
    minutes: null,
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


    // update() {
    //   this.month = this.getMonth();
    //   this.day = this.getDay();
    //   this.hours = this.getHours();
    //   this.minutes = this.getMinutes();
    //   this.period = this.getPeriod();
    // },
  },

  // watch: {
  //   value() { this.update(); },
  // },
};
