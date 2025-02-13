import axios from "axios";

/**
 * Fetches CSV data from a public Google Sheets URL, parses it, and returns an array of objects.
 * @returns {Promise<Object[]>} A promise that resolves to an array of parsed objects.
 */
function fetchCSVData() {
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSN9qYza-MdxZdNBnWK58LbIFS6v6UIdYXPwrNgCewtPqVuYdt2g7HmzXXG9x6kshf_-8Cctgj2xTOp/pub?output=csv";

  return axios
    .get(CSV_URL)
    .then((response) => {
      console.log("Fetching CSV data...");
      return parseCSV(response.data);
    })
    .catch((error) => {
      console.error("Error fetching CSV data:", error);
      console.log("Retriveing Cached CSV data...")
      return []; // Return an empty array on error to prevent failures
      //TODO return a cached version of the CSV instead for the sake of PWA
    });
}

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

  // Mapping of CSV column headers to object property names
  const headerMap = {
    "Common Name": "commonName",
    "Scientific Name": "sciName",
    "Tree/Shrub": "woodyPlantType",
    "Deciduous/Evergreen": "leafType",
    "USDA Plant Hardiness Zone": "hardinessZone",
    "Physiographic Region (Chesapeake Bay Specific Only)": "region",
    "Soil Moisture Conditions": "soilMoistureConditions",
    "Soil Drainage (Based on USDA's 7 Classes of Natural Soil Drainage)": "soilDrainage",
    "Wetland Indicator": "wetlandIndicator",
    "Growth Rate": "growthRate",
    "Mature Height (Feet)": "matureHeight",
    "Shade Tolerance": "shadeTolerance",
    "Flood Tolerance": "floodTolerance",
    "Drought Tolerance": "droughtTolerance",
    "Soil Compaction Tolerance": "soilCompactionTolerance",
    "Road Salt Spray Tolerance": "roadSaltSprayTolerance",
    "Black Walnut (juglone) Tolerance1": "jugloneTolerance",
    "Livestock Toxicity2": "livestockToxicity",
    "Common Riparian Species3": "isCommonRiparianSpecies",
    "Multifunctional Use4": "multifunctionalUses",
    "Wildlife Value": "wildlifeValue",
    "Deer Palatability5": "deerPalatability",
    "Pollinator Use": "pollinators",
    "Flower Color": "flowerColor",
    "Fall Color": "fallColor",
    "Livestake Potential": "hasLivestakePotential",
    "Notes": "notes",
  };

  // Iterate through each row (excluding the header)
  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(",");

    // Stop parsing if a row is completely empty
    if (rowData.every(cell => cell.trim() === "")) {
      break;
    }

    const rowObject = {};

    // Map row data to corresponding object keys
    for (let j = 0; j < headers.length; j++) {
      const key = headerMap[headers[j]] || headers[j]; // Use mapped key or default to header name
      rowObject[key] = rowData[j] ? rowData[j].trim() : ""; // Assign value or empty string if missing
    }

    objects.push(rowObject);
  }

  return objects;
}

export default fetchCSVData;
