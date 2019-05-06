import { mapState } from 'vuex';

function problemJoin(category, problem) {
  return `${category}/${problem}`;
}

export default {
  props: { selected: Array },

  computed: {
    ...mapState(['categories']),

    valid() { return this.selected.length > 0; },
  },

  methods: {
    // Fix for jerky scroll on bad window sizes: set the height of the scroll content to an integer
    // pixel value
    setScrollHeight() {
      const parent = this.$refs.scrollContentContainer;
      const height = parent.lastElementChild.getBoundingClientRect().bottom
        - parent.firstElementChild.getBoundingClientRect().top;
      parent.style.height = `${Math.ceil(height)}px`;
    },

    select(category, problem) {
      const problemOrder = this.categories
        .map(c => c.problems.map(p => problemJoin(c.name, p.name)))
        .flat();
      this.$emit('update:selected',
        [...this.selected, problemJoin(category, problem)]
          .sort((a, b) => problemOrder.indexOf(a) - problemOrder.indexOf(b)));
    },

    deselect(category, problem) {
      const remove = problemJoin(category, problem);
      this.$emit('update:selected', this.selected.filter(s => s !== remove));
    },

    isSelected(category, problem) {
      return this.selected.includes(problemJoin(category, problem));
    },
  },

  mounted() {
    this.$nextTick(this.setScrollHeight);
    window.addEventListener('resize', this.setScrollHeight);
    this.$watch('selected', this.setScrollHeight);
  },
  destroyed() { window.removeEventListener('resize', this.setScrollHeight); },

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
