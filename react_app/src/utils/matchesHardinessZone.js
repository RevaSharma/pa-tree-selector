/**
 * Checks if a given hardiness zone falls within the range specified for a tree.
 *
 * Many trees have a hardiness zone range (e.g., "4-8"), meaning they can survive
 * in zones from the minimum to the maximum value.
 *
 * @param {string} zoneRange - The hardiness zone range of the tree (e.g., "4-8").
 * @param {string} zone - The filtered hardiness zone (e.g., "5a").
 * @returns {boolean} - Returns `true` if the filter zone falls within the tree's range, `false` otherwise.
 *
 * @example
 * matchesHardinessZone("4-8", "5a"); // true
 * matchesHardinessZone("6-9", "5a"); // false
 * matchesHardinessZone("3-5", "5b"); // true
 */
export function matchesHardinessZone(zoneRange, zone) {
  const [min, max] = zoneRange.split("-").map((z) => parseInt(z, 10)); // Extract numeric range
  const filterNum = parseInt(zone, 10); // Convert filter zone to number (drops letter)

  return filterNum >= min && filterNum <= max;
}