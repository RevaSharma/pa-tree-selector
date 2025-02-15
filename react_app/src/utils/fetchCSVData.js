import axios from "axios";
import parseCSV from "./parseCSV";
// Import the IndexedDB functions
import { saveTreesToIndexedDB, getTreesFromIndexedDB } from "./indexedDB";

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
      console.log(response.data);
      const trees = parseCSV(response.data);
      saveTreesToIndexedDB(trees); // Save to IndexedDB for later offline use
      return trees;
    })
    .catch((error) => {
      console.error("Error fetching CSV data:", error);
      console.log("Retrieving cached CSV data...");

      // Try getting the trees from IndexedDB if offline
      return getTreesFromIndexedDB().then((cachedTrees) => {
        if (cachedTrees.length > 0) {
          console.log("Retrieved cached trees.");
          return cachedTrees;
        } else {
          console.log("Failed to get cached trees. Returning no trees.");
          return []; // Fallback: return an empty array if no cached data
        }
      });
    });
}

export default fetchCSVData;
