import { utcToZonedTime, format } from "date-fns-tz";

export default function get_publish_date(time) {
  const date = utcToZonedTime(time, "Europe/Oslo");
  if (date) {
    const today = new Date();

    if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      today.getDate() == date.getDate()
    ) {
      return "I dag - kl. " + format(date, "HH:mm");
    } else if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      today.getDate() - 1 == date.getDate()
    ) {
      return "I går - kl. " + format(date, "HH:mm");
    } else {
      return format(date, "dd.MM.yyyy") + " - kl. " + format(date, "HH:mm");
    }
  } else {
    return "Dato ikke gitt";
  }
}
