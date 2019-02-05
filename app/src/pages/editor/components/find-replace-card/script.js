
export default {
  props: ['cm'],

  data: () => ({
    query: '',
    replaceText: '',

    cursor: null,
    activeSearch: '',
    hasMatches: false,
    overlay: null,
  }),

  computed: {
    codemirror() { return this.cm.codemirror; },
  },

  mounted() { this.$refs.find.focus(); },

  methods: {
    setSearch() {
      // Set up search cursor
      this.cursor = this.codemirror.getSearchCursor(this.query);
      this.activeSearch = this.query;
      // Now stop if there are no results
      if (!this.query.length) { this.hasMatches = false; return; }
      // Check whether the search appears in the code
      this.cursor.findNext();
      this.hasMatches = this.cursor.atOccurrence;
      this.cursor.findPrevious();
    },

    setOverlay() {
      // Initialize search highlight
      this.overlay = {
        token: (stream) => {
          if (stream.string.substring(stream.pos, stream.pos + this.query.length) === this.query) {
            stream.pos += this.query.length;
            return 'searching';
          }
          if (stream.string.substring(stream.pos).includes(this.query)) stream.pos += 1;
          else stream.skipToEnd();
          return undefined;
        },
      };
      this.codemirror.addOverlay(this.overlay);
    },
    removeOverlay() { if (this.overlay) this.codemirror.removeOverlay(this.overlay); },

    selectNext() {
      this.cursor.findNext();
      if (!this.cursor.atOccurrence) {
        // back before the start, then forward one place to the start
        this.cursor.findPrevious(); while (this.cursor.atOccurrence) this.cursor.findPrevious();
        this.cursor.findNext();
      }
      this.codemirror.setSelection(this.cursor.from(), this.cursor.to());
      this.codemirror.scrollIntoView({ from: this.cursor.from(), to: this.cursor.to() }, 50);
    },

    deselect() { this.codemirror.setCursor(this.codemirror.getCursor()); },

    find() {
      // If new query, set new cursor
      if (this.query !== this.activeSearch) this.setSearch();
      // If there is a query and it has matches, select the next one
      if (this.query.length && this.hasMatches) {
        this.selectNext();
        this.codemirror.focus();
      }
    },

    replace() {
      if (this.query !== this.activeSearch) this.find();
      this.cursor.replace(this.replaceText);
      this.selectNext();
    },
  },

  watch: {
    query(q) {
      this.removeOverlay();
      if (q) this.setOverlay();
    },
  },

  destroyed() { this.removeOverlay(); },
};
