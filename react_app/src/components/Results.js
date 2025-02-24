import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import TreeInfoButton from './TreeInfoButton'; 

function Results({ treeData }) {
  const resultsRef = useRef();
  const [compactView, setCompactView] = useState(true);

  const toggleView = () => {
    setCompactView((prev) => !prev);
  };

  const handleExport = () => {
    if (resultsRef.current) {
      // Hide Export Button during PDF generation (bc it was showing up in exported pdf too)
      document.getElementById("export-button").style.display = "none";

      const options = {
        margin: 10,
        filename: "tree-results.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .set(options)
        .from(resultsRef.current)
        .save()
        .then(() => {
          // Restore Export Button after PDF generation
          document.getElementById("export-button").style.display = "block";
        });
    }
  };

  return (
    <div className="text-center p-5 bg-gray-100 min-h-screen">
      <button
        onClick={toggleView}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        {compactView ? "Switch to Detailed View" : "Switch to Compact View"}
      </button>

      <section id="results-section" ref={resultsRef} className="max-w-5xl mx-auto">
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
                  <div className="flex justify-between items-center p-4">
                    <p className="text-lg font-semibold text-gray-800 p-4">
                      {tree.commonName}
                    </p>
                    <TreeInfoButton tree={tree} />
                  </div>
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
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-800">
                          {tree.commonName}
                        </p>
                        <TreeInfoButton tree={tree} />
                      </div>
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

        {treeData.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              id="export-button"
              className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition"
              onClick={handleExport}
            >
              Export Selection as PDF
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Results;