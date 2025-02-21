import {
    differenceInMinutes,
    differenceInHours,
    differenceInCalendarDays,
    differenceInCalendarMonths,
    isYesterday,
    format,
} from 'date-fns';

const getRelativeTime = (inputDate: string) => {
    const date = new Date(inputDate);
    const now = new Date();

    // Calculate difference in minutes
    const minutesDiff = differenceInMinutes(now, date);
    if (minutesDiff < 60) {
        return `${minutesDiff} minutes ago`;
    }

    // Calculate difference in hours
    const hoursDiff = differenceInHours(now, date);
    if (hoursDiff < 24) {
        return `${hoursDiff} hours ago`;
    }

    // Calculate calendar days difference
    const daysDiff = differenceInCalendarDays(now, date);
    if (daysDiff === 0) {
        // This case may be redundant since hoursDiff would catch most "today" cases,
        // but it's here if you want a catch-all for events on the same day.
        return 'Today';
    }
    if (daysDiff === 1 || isYesterday(date)) {
        return 'Yesterday';
    }
    if (daysDiff < 7) {
        return 'Last Week';
    }

    // For dates older than 1 week, check the calendar month difference
    const monthsDiff = differenceInCalendarMonths(now, date);
    if (monthsDiff === 0) {
        // If the event is still in the current month (but more than 7 days ago),
        // you might choose to return the formatted date (or add a "This Month" label).
        return format(date, 'dd/MM/yyyy');
    }
    if (monthsDiff === 1) {
        return 'Last Month';
    }
    if (monthsDiff === 2) {
        return 'Last 2 Months';
    }
    if (monthsDiff === 3) {
        return 'Last 3 Months';
    }

    // If the date is older than 3 months, return a formatted date.
    return format(date, 'dd/MM/yyyy');
};

export default getRelativeTime;
