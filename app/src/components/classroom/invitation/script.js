export default {
  props: { open: Boolean },

  data: () => ({
    page: 'list', // One of 'list', 'email', 'code', or 'link'
  }),
};
