import dayjs from 'dayjs';
import { formatDueDate } from '../../../../helpers';

export default {
  props: { classroom: Object },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
    assignments() { return this.classroom.assignments || []; },
    displayAssignments() {
      const now = Date.now();
      // Future assignments (sorted with nearest-due first)
      const dueInFuture = this.assignments
        .filter(({ dueDate }) => dueDate && dayjs(dueDate).isAfter(now))
        .sort(({ dueDate: ddA }, { dueDate: ddB }) => new Date(ddA) - new Date(ddB));
      // Assignments with no due date
      const noDueDate = this.assignments.filter(({ dueDate }) => !dueDate);
      // Past assignments (sorted with most-recently-due first)
      const dueInPast = this.assignments
        .filter(({ dueDate }) => dueDate && dayjs(dueDate).isBefore(now))
        .sort(({ dueDate: ddA }, { dueDate: ddB }) => new Date(ddB) - new Date(ddA));

      return [...dueInFuture, ...noDueDate, ...dueInPast];
    },
    numNotDisplayed() {
      return this.assignments.length - this.displayAssignments.slice(0, 3).length;
    },
  },

  methods: {
    formatDueDate,
  },
};
