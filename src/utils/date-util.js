function getDateTimeFromUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedTime} - ${formattedDate}`;
}

export { getDateTimeFromUnixTimestamp };
