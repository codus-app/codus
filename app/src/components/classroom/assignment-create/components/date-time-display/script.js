export default {
  props: { value: Date },

  methods: {
    date() { return new Date((this.value || new Date()).getTime()); },

    twentyfour(hours, period) {
      if (parseInt(hours, 10) === 12) return ({ am: 0, pm: 12 })[period];
      return parseInt(hours, 10) + ({ am: 0, pm: 12 })[period];
    },
  },

  computed: {
    month: {
      get() { return this.date().getMonth(); },
      set(value) { this.$emit('input', new Date(this.date().setMonth(value))); },
    },
    day: {
      get() { return this.date().getDate(); },
      set(value) { this.$emit('input', new Date(this.date().setDate(value))); },
    },
    hours: {
      get() { return this.date().getHours() % 12; },
      set(value) { this.$emit('input', new Date(this.date().setHours(this.twentyfour(value, this.period)))); },
    },
    minutes: {
      get() { return this.date().getMinutes().toString().padStart(2, '0'); },
      set(value) { this.$emit('input', new Date(this.date().setMinutes(value))); },
    },
    period: {
      get() { return (this.date().getHours() >= 12) ? 'pm' : 'am'; },
      set(value) { this.$emit('input', new Date(this.date().setHours(this.twentyfour(this.hours, value)))); },
    },
  },
};
