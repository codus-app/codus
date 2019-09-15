/* global CODUS_APP_URL */
import dayjs from 'dayjs';
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
