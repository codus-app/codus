import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export default {
  props: {
    assignment: { type: Object, required: true },
    expanded: { type: Boolean },
  },

  data: () => ({
    holdTimeout: null,
    holding: false,
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
  },
};
