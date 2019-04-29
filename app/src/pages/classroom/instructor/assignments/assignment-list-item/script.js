/* global CODUS_APP_URL */
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export default {
  props: {
    assignment: { type: Object, required: true },
    expanded: { type: Boolean },
    dragging: { type: Boolean },
    position: { type: Number },
  },

  data: () => ({
    holdTimeout: null,
    holding: false,
    dragged: false,
  }),

  computed: {
    overdue() {
      const date = dayjs(this.assignment.dueDate);
      const now = Date.now();
      return date.isBefore(now);
    },

    dueDate() {
      if (!this.assignment.dueDate) return 'No due date';
      const date = dayjs(this.assignment.dueDate);

      const formatted = date.calendar(null, {
        sameDay: '[Due] h:mm A',
        nextDay: '[Due tomorrow]',
        nextWeek: '[Due] dddd',
        lastDay: '[Due yesterday]',
        lastWeek: '[Due last] dddd',
        sameElse: '[ELSE]',
      });
      if (formatted !== 'ELSE') return formatted;
      const thisYear = date.year() === dayjs(Date.now()).year();
      return date.format(thisYear ? '[Due] MMM D' : '[Due] MMM D[,] YYYY');
    },

    link() { return `/classroom/${this.$route.params.classroomCode}/assignments/${this.assignment.id}`; },
  },

  methods: {
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),

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
  },

  watch: {
    // When position changes, set 'dragged' to true until the next time a drag starts
    position() { this.dragged = true; },
    dragging(dragging) { if (dragging) this.dragged = false; },
  },
};
