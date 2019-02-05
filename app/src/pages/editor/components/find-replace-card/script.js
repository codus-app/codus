
export default {
  props: ['cm', 'code'],

  data: () => ({
    query: '',
    replaceText: '',

    cursor: null,
    activeSearch: '',
    overlay: null,

    currMatch: 0,
  }),

  computed: {
    codemirror() { return this.cm.codemirror; },
    numMatches() { return this.query.length && this.code.split(this.query).length - 1; },
    hasMatches() { return this.numMatches > 0; },
  },

  mounted() { this.$refs.find.focus(); },

  methods: {
    setSearch() {
      // Set up search cursor
      this.cursor = this.codemirror.getSearchCursor(this.query);
      this.activeSearch = this.query;
      this.currMatch = 0;
      // Now stop if query is empty
      if (!this.query.length) return;
      // Check whether the search appears in the code
      this.cursor.findNext();
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
      this.currMatch += 1;
      if (!this.cursor.atOccurrence) {
        // back before the start, then forward one place to the start
        this.cursor.findPrevious(); while (this.cursor.atOccurrence) this.cursor.findPrevious();
        this.cursor.findNext();
        this.currMatch = 0;
        if (!this.cursor.atOccurrence) { return false; } // no matches
      }
      this.codemirror.setSelection(this.cursor.from(), this.cursor.to());
      this.codemirror.scrollIntoView({ from: this.cursor.from(), to: this.cursor.to() }, 50);
      return true;
    },

    deselect() { this.codemirror.setCursor(this.codemirror.getCursor()); },

    find(focus = true) {
      // If new query, set new cursor
      if (this.query !== this.activeSearch) this.setSearch();
      // If there is a query and it has matches, select the next one
      if (this.query.length && this.hasMatches) {
        this.selectNext();
        if (focus) this.codemirror.focus();
      }
    },

    replace(focus = true) {
      if (this.query !== this.activeSearch) this.find(focus);
      this.cursor.replace(this.replaceText);
      this.selectNext();
    },
    replaceAll(focus = true) {
      if (this.query !== this.activeSearch) this.find(focus);
      while (this.selectNext()) this.cursor.replace(this.replaceText);
    },
    handleReplace(e, focus = true) { (e.shiftKey ? this.replaceAll : this.replace)(focus); },
  },

  watch: {
    query(q) {
      this.removeOverlay();
      if (q) this.setOverlay();
    },
  },

  destroyed() { this.removeOverlay(); },
};
