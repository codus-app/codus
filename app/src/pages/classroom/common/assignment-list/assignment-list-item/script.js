/* global CODUS_APP_URL */
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import { formatDueDate } from '../../../../../helpers';


export default {
  props: {
    assignment: { type: Object, required: true },
    expanded: { type: Boolean },
    editable: { type: Boolean },
  },

  data: () => ({
    holdTimeout: null,
    holdStart: null,
  }),

  computed: {
    ...mapState(['contentFetched', 'categories']),

    overdue() {
      const date = dayjs(this.assignment.dueDate);
      const now = Date.now();
      return date.isBefore(now);
    },

    link() { return `/classroom/${this.$route.params.classroomCode}/assignments/${this.assignment.id}`; },

    contextItems() {
      if (this.editable) {
        return [
          {
            icon: 'external-link',
            label: 'Open',
            onclick: () => this.$router.push(this.link),
          },
          { icon: 'copy', label: 'Copy link', onclick: this.copyLink },
          { icon: 'trash', label: 'Delete', onclick: () => this.$emit('delete') },
        ];
      }

      return [
        {
          icon: 'play',
          label: 'Start assignment',
          onclick: () => alert('TODO'),
        },
      ];
    },

    assignmentProblems() {
      if (!this.contentFetched || !this.assignment.problems || !this.assignment.problems.length) {
        return {};
      }

      const problemsByCategory = {};
      this.assignment.problems.forEach(({ category, name, solved }) => {
        if (!problemsByCategory[category]) problemsByCategory[category] = [];
        problemsByCategory[category].push({ name, solved });
      });
      return problemsByCategory;
    },

    assignmentCategories() {
      const cats = this.categories;
      return Object.keys(this.assignmentProblems)
        // Order categories in the proper order
        .sort((cat1, cat2) => cats.indexOf(cat1) - cats.indexOf(cat2));
    },

    categoryProblems(cat) { return this.assignmentProblems[cat]; },
  },

  methods: {
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),

    formatDueDate,

    expand() { this.$emit('expand'); },
    collapse() { this.$emit('collapse'); },
    toggle() {
      if (this.expanded) this.collapse();
      else this.expand();
    },

    openContextMenu() {
      this.$refs.contextMenuTrigger._tippy.show(); // eslint-disable-line no-underscore-dangle
    },

    copyLink() {
      navigator.permissions.query({ name: 'clipboard-write' })
        .then(({ state }) => {
          if (state === 'granted') { navigator.clipboard.writeText(CODUS_APP_URL + this.link); }
        });
    },

    clickDuration() { return new Date() - this.holdStart; },
  },
};
