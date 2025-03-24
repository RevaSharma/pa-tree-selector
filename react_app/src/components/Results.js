import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import TreeInfoButton from "./TreeInfoButton";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
import { camelCaseToTitleCase } from "./FilterInput";
import { FaFilePdf } from "react-icons/fa";

function Results({ treeData, isLoading, zipCode, filters }) {
  const navigate = useNavigate();
  const resultsRef = useRef();
  const [compactView, setCompactView] = useState(true);

  const toggleView = () => {
    setCompactView((prev) => !prev);
  };

  const renderSelectedFilters = () => {
    return Object.entries(filters)
      .map(([property, value]) => {
        if (property !== "zipCode" && value && value.length > 0) {
          const title = camelCaseToTitleCase(property);
          return (
            <div key={property} className="mb-2">
              <span className="font-semibold"> {title}: </span>
              {Array.isArray(value) ? value.join(", ") : value}
            </div>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  const generateTableHTML = () => {
    const treesPerPage = 16;

    let filterSummaryHTML = `
      <div style="margin-bottom: 20px; font-family: sans-serif;">
        <h2 style="margin-bottom: 10px;">Filter Summary</h2>
        <p><strong>ZIP Code:</strong> ${zipCode || "N/A"}</p>
    `;

    for (const [key, value] of Object.entries(filters)) {
      if (key !== "zipCode" && value && value.length > 0) {
        const formattedKey = camelCaseToTitleCase(key);
        const formattedValue = Array.isArray(value) ? value.join(", ") : value;
        filterSummaryHTML += `<p><strong>${formattedKey}:</strong> ${formattedValue}</p>`;
      }
    }

    filterSummaryHTML += `</div>`;

    let tableHTML = `
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: RGB(211, 222, 219); color: #1F2937; }
          .page-break { page-break-after: always; }
          .header-container {
            display: flex;
            align-items: center;
            background-color: RGB(51, 107, 136);
            padding: 10px;
          }
          .logo { height: 50px; margin-right: 10px; }
          .title { font-size: 24px; font-weight: bold; color: white; }
        </style>
      </head>
      <body>
        <div class="header-container">
          <img src="images/logo.png" alt="Chesapeake Conservancy Logo" class="logo" />
          <h1 class="title">Pennsylvania Native Tree Selector</h1>
        </div>

        ${filterSummaryHTML}

        <table>
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Scientific Name</th>
              <th>Plant Type</th>
              <th>Soil Moisture</th>
              <th>Shade Tolerance</th>
              <th>Growth Rate</th>
            </tr>
          </thead>
          <tbody>
    `;

    treeData.forEach((tree, index) => {
      if (index % treesPerPage === 0 && index !== 0) {
        tableHTML += `
          </tbody>
        </table>
        <div class="page-break"></div>
        <div class="header-container">
          <img src="images/logo.png" alt="Chesapeake Conservancy Logo" class="logo" />
          <h1 class="title">Pennsylvania Native Tree Selector</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Scientific Name</th>
              <th>Plant Type</th>
              <th>Soil Moisture</th>
              <th>Shade Tolerance</th>
              <th>Growth Rate</th>
            </tr>
          </thead>
          <tbody>
        `;
      }

      tableHTML += `
        <tr>
          <td>${tree.commonName || ""}</td>
          <td>${tree.sciName || ""}</td>
          <td>${tree.woodyPlantType || ""}</td>
          <td>${tree.soilMoistureConditions || ""}</td>
          <td>${tree.shadeTolerance || ""}</td>
          <td>${tree.growthRate || ""}</td>
        </tr>
      `;
    });

    tableHTML += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    return tableHTML;
  };

  const handleExport = () => {
    const tableHTML = generateTableHTML();
    const element = document.createElement("div");
    element.innerHTML = tableHTML;

    const opt = {
      margin: 10,
      filename: "tree-data.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-7 bg-gray-80 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => navigate("/filters")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            ← Return To Filtering
          </button>
          <button
            onClick={toggleView}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {compactView ? "Switch to Detailed View" : "Switch to Compact View"}
          </button>
        </div>

        {treeData.length > 0 && (
          <button
            id="export-button"
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            <FaFilePdf className="text-white" />
            Export Selection as PDF
          </button>
        )}
      </div>

      <section id="results-section" ref={resultsRef} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Filtered Results:
        </h2>

        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          {zipCode && (
            <p className="text-lg font-semibold mb-2"> ZIP Code: {zipCode} </p>
          )}
          <h3 className="text-lg font-semibold mb-2">Selected Filters:</h3>
          {renderSelectedFilters()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treeData && treeData.length > 0 ? (
            treeData.map((tree, index) => (
              <div key={index} className="w-full">
                {compactView ? (
                  <Result tree={tree} />
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 shadow-md bg-white">
                    {tree.images && tree.images.length > 0 ? (
                      <img
                        src={tree.images[0]}
                        alt={tree.commonName}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                        No Image Available
                      </div>
                    )}
                    <div className="p-4">
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
                      <TreeInfoButton tree={tree} />
                    </div>
                  </div>
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
