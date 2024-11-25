import { format, addMonths, setDate, getDate, isBefore, startOfMonth } from 'date-fns';

export function getNextFellowshipDate(): string {
  const today = new Date();
  let nextMeeting = startOfMonth(today);
  
  // Set to second Sunday
  let date = 8; // Start with 8th of the month
  while (new Date(nextMeeting.getFullYear(), nextMeeting.getMonth(), date).getDay() !== 0) {
    date++;
  }
  nextMeeting.setDate(date);

  // If this month's meeting has passed, get next month's
  if (isBefore(nextMeeting, today)) {
    nextMeeting = startOfMonth(addMonths(today, 1));
    date = 8;
    while (new Date(nextMeeting.getFullYear(), nextMeeting.getMonth(), date).getDay() !== 0) {
      date++;
    }
    nextMeeting.setDate(date);
  }

  return format(nextMeeting, 'MMMM do, yyyy');
}