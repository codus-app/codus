export default {
  data: () => ({
    dark: false,
  }),
  methods: {
    toggleDark() {
      this.dark = !this.dark;
    },
  },
};
