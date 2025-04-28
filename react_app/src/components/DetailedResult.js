// DetailedResult.js
import TreeInfoButton from "./TreeInfoButton";
import { Link } from "react-router-dom";

/**
 * Detailed Result component representing an individual tree result in detailed view.
 */
const DetailedResult = ({ tree }) => {
  // Helper function to determine the background color based on pass percentage
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
    <Link
      to={`/trees/${tree.id || tree.sciName}`}
      className={`
        relative flex items-center justify-between
        border-0 border-gray-200 rounded-lg shadow-md
        md:flex-row hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2
      `}
    >

      <div className="w-full border-0 border-gray-200 rounded-lg p-4  bg-0 dark:bg-0 dark:border-gray-700">
        {tree.images && tree.images.length > 0 ? (
          <img
            src={tree.images[0]}
            alt={tree.commonName}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            No Image Available
          </div>
        )}
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {tree.commonName}
          </p>
          <p className="text-md italic text-gray-600 dark:text-gray-400">
            {tree.sciName}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Type: {tree.woodyPlantType}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Soil Moisture: {tree.soilMoistureConditions}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Shade Tolerance: {tree.shadeTolerance}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Growth Rate: {tree.growthRate}
          </p>
          <TreeInfoButton tree={tree} />
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

export default DetailedResult;
