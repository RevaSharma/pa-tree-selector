import React, { useState } from "react";

function Results({ treeData }) {
  const [compactView, setCompactView] = useState(true);

  const toggleView = () => {
    setCompactView((prev) => !prev);
  };

  return (
    <div className="text-center p-5 bg-gray-100">
      <button
      onClick={toggleView}
      className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        {compactView ? "Switch to Detailed View" : "Switch to Compact View"}
        </button>


      <section id="results-section" className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Filtered Results:
        </h2>

        <div className="grid gap-8 p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {treeData && treeData.length > 0 ? (
            treeData.map((tree, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md"
              >
                {compactView ? (
                  <p className="text-lg font-semibold text-gray-800 p-4">
                    {tree.commonName}
                  </p>
                ) : (
                  <>
                    {tree.images && tree.images.length > 0 ? (
                      <img
                        src={tree.images[0]}
                        alt={tree.commonName}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                        No Image Available
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-2">
                      <p className="text-lg font-semibold text-gray-800">
                        {tree.commonName}
                      </p>
                      <p className="text-md italic text-gray-600">
                        {tree.sciName}
                      </p>
                      <p className="text-sm text-gray-700">
                        Type: {tree.woodyPlantType}
                      </p>
                      <p className="text-sm text-gray-700">
                        Soil Moisture: {tree.soilMoistureConditions}
                      </p>
                      <p className="text-sm text-gray-700">
                        Shade Tolerance: {tree.shadeTolerance}
                      </p>
                      <p className="text-sm text-gray-700">
                        Growth Rate: {tree.growthRate}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-lg text-gray-600 p-10">
              No trees match the selected filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Results;
