import { matchesHardinessZone } from "./matchesHardinessZone";
import { matchesMatureHeight } from "./matchesMatureHeight";

/**
 * Filters an array of trees based on the provided filtering state.
 *
 * @param {Object[]} trees - The array of tree objects to be filtered.
 * @param {Object} filteringState - An object where keys are tree properties and values
 *                                  are filtering criteria (single values or arrays).
 * @returns {Object[]} - An array of trees that match all filtering criteria.
 */
export function filterTrees(trees, filteringState) {
  return trees.filter((tree) =>
    // Check if the tree passes all filters
    Object.entries(filteringState).every(([property, filterValues]) => {
      // If filterValues is undefined or null, skip the filter for that property
      if (!filterValues) return true;

      const treeValue = tree[property]; // Get the corresponding value from the tree

      // If the tree doesn't have the property managed by the filter, it doesn't pass the filter
      if (!treeValue) return false;

      // Special case: hardiness zone requires numeric range comparison
      if (property === "hardinessZone") {
        return matchesHardinessZone(treeValue, filterValues);
      }

      // Special case: pollinators and multifunctionalUses checks for a non-empty string
      if (property === "pollinators" || property === "multifunctionalUses") {
        return filterValues.includes("Yes") ? treeValue !== "" : true;
      }

      // Special case: cohabitable with black walnut checks for juglone tolerance
      if (property === "jugloneTolerance") {
        return filterValues.includes("Yes") ? treeValue === "Tolerant" : false;
      }

      // Special case: colors are a substring check
      if (property === "flowerColor" || property === "fallColor") {
        return filterValues.some((color) =>
          treeValue.toLowerCase().includes(color.toLowerCase())
        );
      }

      // Special case: mature height ranges are determined by phrases
      if (property === "matureHeight") {
        return matchesMatureHeight(treeValue, filterValues);
      }

      // Handle cases where tree value contains multiple acceptable values separated by "-"
      if (treeValue.includes("-")) {
        const treeValueParts = treeValue.split("-").map((v) => v.trim());
        // Check if any of the parts match the filter values
        return treeValueParts.some((val) => filterValues.includes(val));
      }

      // If the filter value is an array (which is the case for all filter inputs), check if at least one of them matches the tree's property.
      return Array.isArray(filterValues)
        ? filterValues.includes(treeValue)
        : treeValue === filterValues; // Otherwise, check for an exact match
    })
  );
}
