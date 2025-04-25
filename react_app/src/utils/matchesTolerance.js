/**
 * Checks whether a given tolerance level matches any of the desired tolerance categories.
 *
 * This function handles special logic where selecting a broader category (like "Tolerant")
 * will also match stricter subcategories (e.g., "Very Tolerant").
 *
 * @param {string} tolerance - The specific tolerance level to check.
 *        Expected values: "Tolerant", "Very Tolerant", "Intolerant", "Very Intolerant", etc.
 * @param {string[]} desiredTolerances - An array of desired tolerance levels or categories to match against.
 *        Can include broad categories like "Tolerant" or "Intolerant".
 *
 * @returns {boolean} - Returns true if the given tolerance matches or falls under any of the desired categories.
 */
export function matchesTolerance(tolerance, desiredTolerances) {
  if (desiredTolerances.includes("Tolerant")) {
    if (tolerance === "Tolerant" || tolerance === "Very Tolerant") {
      return true;
    }
  }
  if (desiredTolerances.includes("Intolerant")) {
    if (tolerance === "Intolerant" || tolerance === "Very Intolerant") {
      return true;
    }
  }
  return desiredTolerances.includes(tolerance);
}
