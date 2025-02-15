/**
 * Parses a CSV-formatted string into an array of objects.
 * @param {string} csvText - The raw CSV data as a string.
 * @returns {Object[]} An array of objects with keys mapped from the CSV headers.
 */
function parseCSV(csvText) {
  console.log(csvText); // Logs the raw CSV text for debugging

  const rows = csvText.split(/\r?\n/); // Split CSV into rows
  const headers = rows[0].split(",").map((header) => header.trim()); // Extract and clean headers
  const objects = [];

  // Iterate through each row (excluding the headers)
  for (let i = 2; i < rows.length; i++) {
    const rowData = rows[i].split(",");

    // Stop parsing if a row is completely empty
    if (rowData.every((cell) => cell.trim() === "")) {
      break;
    }

    const rowObject = {};

    // Map row data to corresponding object keys
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j];
      rowObject[key] = rowData[j] ? rowData[j].trim() : ""; // Assign value or empty string if missing
    }

    objects.push(rowObject);
  }

  return objects;
}

export default parseCSV;
