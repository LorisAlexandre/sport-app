export function formatDate(dateStr: Date, separator: "-" | "/" = "/") {
  const date = new Date(dateStr);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}${separator}${month}${separator}${year}`;

  return formattedDate;
}
