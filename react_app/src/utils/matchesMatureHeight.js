/**
 * Checks if a tree's mature height falls within any of the specified height ranges.
 *
 * @param {string} height - The tree's mature height, which can be a single number (e.g., "12") or a range (e.g., ["40", "50"]).
 * @param {string[]} heightRanges - An array of height range filters, which can include:
 *     - "Less than Xft" → Matches heights below X.
 *     - "Greater than Xft" → Matches heights above X.
 *     - "X to Yft" → Matches heights is in the inclusive range.
 * @returns {boolean} - Returns `true` if the tree's height fits within any of the specified height ranges, otherwise `false`.
 *
 * @example
 * matchesMatureHeight(["40", "50"], ["30 to 50ft"]); // true
 * matchesMatureHeight(["75", "125"], ["Greater than 50ft"]); // true
 * matchesMatureHeight(["12"], ["Less than 10ft"]); // false
 * matchesMatureHeight(["30", "50"], ["Less than 10ft", "30 to 50ft"]); // true
 */
export function matchesMatureHeight(height, heightRanges) {
  // If it's a range, split it,
  // otherwise, treat it as a single number.
  const [minHeight, maxHeight] = height;

  return heightRanges.some((range) => {
    // Handle "Less than Xft" case
    if (range.startsWith("Less than")) {
      const maxAllowedHeight = parseInt(range.match(/\d+/)[0], 10);
      return maxHeight < maxAllowedHeight;
    }

    // Handle "Greater than Xft" case
    if (range.startsWith("Greater than")) {
      const minAllowedHeight = parseInt(range.match(/\d+/)[0], 10);
      return minHeight > minAllowedHeight;
    }

    // Handle "X to Yft" range case
    const [filterMin, filterMax] = range.match(/\d+/g).map(Number);
    return maxHeight >= filterMin && minHeight <= filterMax;
  });
}
