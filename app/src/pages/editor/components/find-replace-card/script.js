
export default {
  props: ['cm'],

  data: () => ({
    query: '',
    replace: '',

    cursor: null,
    activeSearch: '',
    hasMatches: false,
  }),

  computed: {
    codemirror() { return this.cm.codemirror; },
  },

  methods: {
    setSearch() {
      this.cursor = this.codemirror.getSearchCursor(this.query);
      this.activeSearch = this.query;
      this.cursor.findNext();
      this.hasMatches = this.cursor.atOccurrence;
      this.cursor.findPrevious();
    },

    selectNext() {
      this.cursor.findNext();
      if (!this.cursor.atOccurrence) {
        // back before the start, then forward one place to the start
        this.cursor.findPrevious(); while (this.cursor.atOccurrence) this.cursor.findPrevious();
        this.cursor.findNext();
      }
      this.codemirror.setSelection(this.cursor.from(), this.cursor.to());
    },

    deselect() { this.codemirror.setCursor(this.codemirror.getCursor()); },

    find() {
      // If new query, set new cursor
      if (this.query !== this.activeSearch) this.setSearch();
      // If there is a query and it has matches, select the next one
      if (this.query.length && this.hasMatches) {
        this.selectNext();
        this.codemirror.focus();
      // Otherwise deselect everything
      } else if (!this.query.length) {
        this.deselect();
      }
    },
  },
};
