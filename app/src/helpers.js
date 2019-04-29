import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export function clamp(val, low, high) {
  return Math.max(Math.min(val, high), low);
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Format a date as for a due date */
export function formatDueDate(dueDate) {
  if (!dueDate) return 'No due date';
  const date = dayjs(dueDate);

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
}
