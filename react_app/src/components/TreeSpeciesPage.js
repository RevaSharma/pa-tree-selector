import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TreeSpeciesPage = ({ trees }) => {
  const { sciName } = useParams();
  const tree = trees.find(
    (tree) => tree.sciName.toLowerCase() === sciName.toLowerCase()
  );

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/results");
  };

  if (!tree) {
    return (
      <div className="text-center text-green-700 dark:text-green-300 py-12">
        Looking for <span className="italic">{sciName}</span>...
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center pt-12 px-6 bg-gradient-to-b min-h-screen dark:from-[#0f172a] dark:to-[#1e293b]">
      <div className="max-w-4xl w-full text-center bg-white p-8 rounded-xl shadow-lg border border-green-100 dark:bg-green-800 dark:border-green-600">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
        >
          ← Back to Results
        </button>

        {/* Header */}
        <h1 className="text-4xl font-bold text-green-900 dark:text-green-100 mb-2">
          {tree.commonName}
        </h1>
        <h2 className="text-2xl italic text-gray-700 dark:text-gray-300 mb-8">
          {tree.sciName}
        </h2>

        {/* Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            )
            .map(([key, value]) => (
              <div
                key={key}
                className="p-4 rounded-lg border border-green-200 dark:border-green-500 bg-gray-50 dark:bg-green-900 text-left"
              >
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-100 mb-1 capitalize">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </h3>
                <p className="text-gray-800 dark:text-gray-200">{value}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TreeSpeciesPage;
