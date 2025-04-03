import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TreeSpeciesPage = ({ trees }) => {
  const { sciName } = useParams();
  const tree = trees.find(
    (tree) => tree.sciName.toLowerCase() === sciName.toLowerCase()
  );

  const navigate = useNavigate();

  function handleViewResults() {
    navigate("/results");
  }

  if (!tree) {
    return <div className="justify-center h-64 flex items-center p-4 text-green-700">Finding {sciName}...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <button
        onClick={handleViewResults}
        className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
      >
        ← Back to Results
      </button>
      <div className="flex justify-center mb-4">
        {tree.images?.length > 0 && (
          <img
            className="w-64 h-64"
            src={tree.images[0]}
            alt={tree.commonName || "Tree image"}
          />
        )}
      </div>
      <h1 className="text-4xl font-bold text-center">{tree.commonName}</h1>
      <h2 className="mb-4 text-3xl text-gray-600 italic text-center">
        {tree.sciName}
      </h2>

      <div className="gap-2 grid grid-cols-1 md:grid-cols-2">
        {Object.entries(tree)
          .filter(
            ([key]) =>
              ![
                "commonName",
                "sciName",
                "problems",
                "notes",
                "passedFilters",
                "failedFilters",
                "score",
                "passedPercent",
                "hasPerfectScore",
                "images",
              ].includes(key)
          ) // Exclude specific keys
          .map(([key, value]) => (
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-2xl font-bold">
                {key
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/^./, (str) => str.toUpperCase())}
              </h3>
              <div className="text-xl">{value}</div>
            </div>
          ))}
      </div>

      {/* Iterate over all properties and display them */}
      <div className="mt-4"></div>
    </div>
  );
};

export default TreeSpeciesPage;
