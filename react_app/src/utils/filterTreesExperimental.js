import { matchesHardinessZone } from "./matchesHardinessZone";
import { matchesMatureHeight } from "./matchesMatureHeight";

/**
 * Filters an array of trees based on the provided filtering state.
 *
 * @param {Object[]} trees - The array of tree objects to be filtered.
 * @param {Object} filteringState - An object where keys are tree properties and values
 *                                  are filtering criteria (single values or arrays).
 * @returns {Object[]} - An array of trees with passedFilters and failedFilters properties.
 */
export function filterTrees(trees, filteringState) {
  return trees.map((tree) => {
    // Arrays to track passed and failed filters
    const passedFilters = [];
    const failedFilters = [];

    // Iterate over each filter and check whether the tree passes or fails
    Object.entries(filteringState).forEach(([property, filterValues]) => {
      // If filterValues is undefined or null, skip the filter for that property
      if (!filterValues) {
        passedFilters.push(property);
        return;
      }

      const treeValue = tree[property]; // Get the corresponding value from the tree

      // If the tree doesn't have the property managed by the filter, it fails the filter
      if (!treeValue) {
        failedFilters.push(property);
        return;
      }

      // Special case: hardiness zone requires numeric range comparison
      if (property === "hardinessZone") {
        if (matchesHardinessZone(treeValue, filterValues)) {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
        return;
      }

      // Special case: pollinators and multifunctionalUses checks for a non-empty string
      if (property === "pollinators" || property === "multifunctionalUses") {
        if (filterValues.includes("Yes") && treeValue !== "") {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
        return;
      }

      // Special case: cohabitable with black walnut checks for juglone tolerance
      if (property === "jugloneTolerance") {
        if (filterValues.includes("Yes") && treeValue === "Tolerant") {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
        return;
      }

      // Special case: colors are a substring check
      if (property === "flowerColor" || property === "fallColor") {
        const passed = filterValues.some((color) =>
          treeValue.toLowerCase().includes(color.toLowerCase())
        );
        if (passed) {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
        return;
      }

      // Special case: mature height ranges are determined by phrases
      if (property === "matureHeight") {
        if (matchesMatureHeight(treeValue, filterValues)) {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
        return;
      }

      // Handle cases where tree value contains multiple acceptable values separated by "-"
      if (treeValue.includes("-")) {
        const treeValueParts = treeValue.split("-").map((v) => v.trim());
        const passed = treeValueParts.some((val) => filterValues.includes(val));
        if (passed) {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
        return;
      }

      // Otherwise, handle exact or array matching
      if (Array.isArray(filterValues)) {
        if (filterValues.includes(treeValue)) {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
      } else {
        if (treeValue === filterValues) {
          passedFilters.push(property);
        } else {
          failedFilters.push(property);
        }
      }
    });

    // Add the passedFilters and failedFilters properties to the tree object
    return {
      ...tree,
      passedFilters,
      failedFilters,
    };
  });
}
