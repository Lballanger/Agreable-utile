export default function formatDate(date) {
  var isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  if (!isoRegex.test(date)) {
    throw new Error(
      "Invalid date format, expected ISO 8601 format (yyyy-mm-ddThh:mm:ss.sssZ)"
    );
  }
  var dateObject = new Date(date);
  var day = dateObject.getUTCDate().toString().padStart(2, "0");
  var month = dateObject.toLocaleString("default", { month: "short" });
  var year = dateObject.getUTCFullYear();
  var hours = dateObject.getUTCHours().toString().padStart(2, "0");
  var minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}
