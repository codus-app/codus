import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export default {
  props: { assignment: { type: Object, required: true } },
  computed: {
    dueDate() {
      if (!this.assignment.dueDate) return 'No due date';
      const date = dayjs('2019-04-27 6:00 pm');
      if (date.isBefore(Date.now())) return 'Overdue';

      const formatted = date.calendar(null, {
        sameDay: '[Due] h:mm A',
        nextDay: '[Due tomorrow]',
        nextWeek: '[Due] dddd',
        sameElse: '[ELSE]',
      });
      if (formatted !== 'ELSE') return formatted;
      const thisYear = date.year() === dayjs(Date.now()).year();
      return date.format(thisYear ? '[Due] MMM D' : '[Due] MMM D YYYY');
    },
  },
};
