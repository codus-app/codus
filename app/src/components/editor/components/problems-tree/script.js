export default {
  props: {
    categories: Array,
    solved: Array,
    solutionsBegun: Array,
  },

  methods: {
    isSolved(searchCategory, searchProblem) {
      return this.solved
        .findIndex(({ category, name }) => category === searchCategory && name === searchProblem)
        !== -1;
    },

    isSolutionBegun(searchCategory, searchProblem) {
      return this.solutionsBegun
        .findIndex(({ category, name }) => category === searchCategory && name === searchProblem)
        !== -1;
    },

    isCategoryComplete(searchCategory) {
      return this.categories
        .find(({ name }) => name === searchCategory).problems.length
        === this.solved.filter(({ category }) => category === searchCategory).length;
    },
  },

  components: {
    'category-folder': require('./category-folder.vue').default,
    'problem-link': require('./problem-link.vue').default,
  },
};
