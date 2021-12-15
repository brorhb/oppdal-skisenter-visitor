export const formatTimestamp = (timestamp) => {
  let date = new Date(timestamp);
  const d = date.getDate();
  let month = date.getMonth();
  month++;
  return d + "." + month;
};
export const isToday = (timestamp) => {
  let date = new Date(timestamp);
  let today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};
