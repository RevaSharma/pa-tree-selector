import { Link } from "react-router-dom";
import { camelCaseToTitleCase } from "./FilterInput";

/**
 * Component: Result
 * Description: Displays a single tree result in compact view.
 * Props:
 * - tree: An object containing data about a tree, including name, image, match percent, and failed filters.
 */
const Result = ({ tree }) => {
  /**
   * getColor
   * Determines background color based on how many filters the tree passed.
   * This color is applied to the percentage badge.
   */
  const getColor = (percent) => {
    if (percent >= 100) return "bg-green-700 text-white";
    if (percent >= 80) return "bg-lime-500 text-white";
    if (percent >= 60) return "bg-yellow-500 text-white";
    if (percent >= 40) return "bg-amber-600 text-white";
    if (percent >= 20) return "bg-orange-600 text-white";
    if (percent > 0) return "bg-red-700 text-white";
    return "bg-red-900 text-white";
  };

  return (
    // Wraps the result in a clickable link to the individual tree page
    <Link
      to={`/trees/${tree.id || tree.sciName}`}
      className={`
        relative flex items-center justify-between
        border border-gray-200 rounded-full shadow-sm
        md:flex-row hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2
      `}
    >
      <div className="flex">
        <div className="w-24 h-24 rounded-full md:rounded-full border border-gray-200 dark:border-gray-700 flex-shrink-0 flex justify-center items-center truncate dark:bg-gray-700">
          {tree.images?.length > 0 && (
            <img
              className="w-24 h-24 rounded-full md:rounded-full border border-gray-200 dark:border-gray-700 flex-shrink-0 flex justify-center items-center truncate dark:bg-gray-700"
              src={tree.images[0]}
              alt={tree.commonName || "Tree image"}
            />
          )}
        </div>
        <div className="flex flex-col justify-center px-4 py-2 gap-2 dark:text-gray-200 text-gray-800">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {tree.commonName}
          </h5>
          <h6 className="font-normal text-gray-700 dark:text-gray-400">
            {tree.sciName}
          </h6>
          {/* Display failed filters in red text */}
          {tree.failedFilters?.length > 0 && (
            <div className="text-red-600 text-sm">
              Failed Filters:{" "}
              {tree.failedFilters.map((filter, index) => (
                <span key={index}>
                  {camelCaseToTitleCase(filter)}
                  {index < tree.failedFilters.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 p-1 w-12 h-12 rounded-full aspect-square flex flex-shrink-0 justify-center items-center text-lg font-bold ${getColor(
          tree.passedPercent
        )} ${isNaN(tree.passedPercent) ? "hidden" : ""}`}
      >
        {tree.passedPercent}
        <span className="text-sm">%</span>
      </div>

      {tree.hasCriticalFailure && tree.failedCriticalFilters && (
        <div className="rounded-full absolute top-0 right-0 uppercase bg-yellow-700 text-yellow-100 px-2 py-1 text-xs">
          fails to survive
        </div>
      )}
    </Link>
  );
};

export default Result;
