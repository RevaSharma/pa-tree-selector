// Handles tree filtering and scoring based on selected criteria
import { matchesHardinessZone } from "./matchesHardinessZone";
import { matchesMatureHeight } from "./matchesMatureHeight";
import { matchesTolerance } from "./matchesTolerance";
import filterConfig from "../data/filterConfig.json";

/**
 * Filters out trees that don't have a perfect match (i.e., pass all filters).
 * Returns a simplified tree object with scoring metadata removed.
 */
export function filterTrees(trees, filteringState) {
  return scoreTrees(trees, filteringState)
    .filter((tree) => tree.hasPerfectScore)
    .map(
      ({
        passedFilters,
        failedFilters,
        failedCriticalFilters,
        score,
        hasPerfectScore,
        hasCriticalFailure,
        passedPercent,
        ...rest
      }) => rest
    );
}

/**
 * Scores all trees based on how many filters they pass.
 * Returns sorted array of trees (highest score first).
 */
export function scoreTrees(trees, filteringState) {
  return trees
    .map((tree) => scoreTree(tree, filteringState))
    .sort((a, b) => b.score - a.score);
}

/**
 * Scores a single tree by evaluating it against all active filters.
 * Tracks passed filters, failed filters, and critical filter failures.
 */
function scoreTree(tree, filteringState) {
  const passedFilters = [];
  const failedFilters = [];
  const failedCriticalFilters = [];

  const { zipCode, ...activeFilters } = filteringState;

  Object.entries(activeFilters).forEach(([filterName, selectedOptions]) => {
    if (isTreePassingFilter(tree, filterName, selectedOptions)) {
      passedFilters.push(filterName);
    } else {
      failedFilters.push(filterName);
      if (filterConfig.find((filter) => filter.property === filterName)) {
        if (
          filterConfig.find((filter) => filter.property === filterName)
            .isCriticalForSurvival
        ) {
          failedCriticalFilters.push(filterName);
        }
      }
    }
  });

  return {
    ...tree,
    passedFilters,
    failedFilters,
    failedCriticalFilters,
    score: passedFilters.length,
    hasPerfectScore: failedFilters.length === 0,
    hasCriticalFailure: failedCriticalFilters.length !== 0,
    passedPercent: (
      (passedFilters.length / (passedFilters.length + failedFilters.length)) *
      100
    ).toFixed(0),
  };
}

/**
 * Determines if a specific tree property matches the user's selected filter options.
 */
function isTreePassingFilter(tree, filterName, selectedOptions) {
  if (!selectedOptions) return true;

  let treeEntry = tree[filterName]?.includes("-")
    ? tree[filterName].split("-").map((v) => {
        const num = Number(v.trim());
        return isNaN(num) ? v.trim() : num;
      })
    : tree[filterName];

  if (!treeEntry) return false;

  switch (filterName) {
    case "hardinessZone":
      return matchesHardinessZone(treeEntry, selectedOptions);
    case "matureHeight":
      return matchesMatureHeight(treeEntry, selectedOptions);
    case "pollinators":
    case "multifunctionalUses":
      if (selectedOptions.includes("Yes")) {
        return treeEntry !== "";
      } else if (selectedOptions.includes("No")) {
        return treeEntry === "";
      }
      break;
    case "flowerColor":
    case "fallColor":
      return selectedOptions.some((color) =>
        treeEntry.toLowerCase().includes(color.toLowerCase())
      );
    case "soilCompactionTolerance":
    case "shadeTolerance":
    case "floodTolerance":
    case "droughtTolerance":
    case "roadSaltSprayTolerance":
    case "jugloneTolerance":
      return matchesTolerance(treeEntry, selectedOptions);
    default:
      return Array.isArray(treeEntry)
        ? treeEntry.some((entry) => selectedOptions.includes(entry))
        : Array.isArray(selectedOptions)
        ? selectedOptions.includes(treeEntry)
        : treeEntry === selectedOptions;
  }
}
