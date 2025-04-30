/**
 * 
 * Displays filtered tree results (compact or detailed view), allows PDF export,
 * and shows selected filters and project info. Users can toggle between views,
 * include partial matches, and export a formatted PDF.
 * 
 * Props:
 * - treeData: Array of tree objects with filtering results
 * - isLoading: Boolean indicating if data is being loaded (unused here but passed in)
 * - zipCode: User-selected zip code
 * - filters: Object of user-selected filters
 */
import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import Result from "./Result";
import DetailedResult from "./DetailedResult"
import { useNavigate } from "react-router-dom";
import { camelCaseToTitleCase } from "./FilterInput";
import { FaFilePdf } from "react-icons/fa";


function Results({ treeData, isLoading, zipCode, filters }) {
  const navigate = useNavigate();
  const resultsRef = useRef();

   // UI state
  const [compactView, setCompactView] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const [showPartialMatch, setShowPartialMatch] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleView = () => {
    setCompactView((prev) => !prev);
  };

  /**
   * Renders the selected filters in human-readable format.
   */
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

  /**
   * Creates an HTML string for a printable PDF version of the filtered results.
   * Uses html2pdf to render the HTML content into a downloadable file.
   */
  const generateTableHTML = () => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const filteredTreeData = treeData.filter(
      (tree) => 
        !tree.hasCriticalFailure && 
        tree.passedPercent >= (showPartialMatch ? 50 : 100)
    );

    const rowsPerPage = 9;
    const totalPages = Math.ceil(filteredTreeData.length / rowsPerPage);

    let html = `
      <html><head>
      <style>
        body {
          font-family: sans-serif;
          margin: 0;
          padding: 0;
        }
        .pdf-page {
          padding: 20px 40px;
          min-height: 550px;
          box-sizing: border-box;
          page-break-after: always;
        }
        .pdf-page:last-child {
          page-break-after: auto;
        }
        .header-container {
          display: flex;
          align-items: center;
          background-color: RGB(51, 107, 136);
          padding: 10px;
          page-break-inside: avoid;
        }
        .logo {
          height: 50px;
          margin-right: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          color: white;
        }
        .project-title {
          font-size: 20px;
          font-weight: bold;
          margin-top: 20px;
        }
        .filter-summary {
          margin-top: 10px;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: RGB(211, 222, 219);
          color: #1F2937;
        }
        tr {
          page-break-inside: avoid;
        }
        .footer-spacer {
          height: 30px;
        }
        .footer {
          font-size: 10px;
          text-align: right;
          font-style: italic;
          margin-top: 4px;
        }
      </style>
      </head><body>
    `;

    // Paginate results across PDF pages
    for (let page = 0; page < totalPages; page++) {
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      const trees = filteredTreeData.slice(start, end);

      html += `
        <div class="pdf-page">
          <div class="header-container">
            <img src="images/logo.png" alt="Chesapeake Conservancy Logo" class="logo" />
            <h1 class="title">Pennsylvania Native Tree Selector</h1>
          </div>

          ${
            page === 0 && projectTitle
              ? `<h1 class="project-title">${projectTitle}</h1>`
              : ""
          }

          ${
            page === 0
              ? `
          <div class="filter-summary">
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">Filter Summary</h2>
            <p><strong>ZIP Code:</strong> ${zipCode || "N/A"}</p>
            ${Object.entries(filters)
              .filter(([key, val]) => key !== "zipCode" && val?.length)
              .map(
                ([key, val]) =>
                  `<p><strong>${camelCaseToTitleCase(key)}:</strong> ${
                    Array.isArray(val) ? val.join(", ") : val
                  }</p>`
              )
              .join("\n")}
          </div>`
              : ""
          }

          <table>
            <thead>
              <tr>
                <th>Common Name</th>
                <th>Scientific Name</th>
                <th>Plant Type</th>
                <th>Soil Moisture</th>
                <th>Shade Tolerance</th>
                <th>Growth Rate</th>
                <th>Percentage Match</th>
              </tr>
            </thead>
            <tbody>
              ${trees
                .map(
                  (tree) => `
                <tr>
                  <td>${tree.commonName || ""}</td>
                  <td>${tree.sciName || ""}</td>
                  <td>${tree.woodyPlantType || ""}</td>
                  <td>${tree.soilMoistureConditions || ""}</td>
                  <td>${tree.shadeTolerance || ""}</td>
                  <td>${tree.growthRate || ""}</td>
                  <td>${
                    tree.passedPercent != null
                      ? `${tree.passedPercent}%`
                      : "N/A"
                  }</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="footer-spacer"></div>
          <div class="footer">Generated on ${today} — Page ${
        page + 1
      } of ${totalPages}</div>
        </div>
      `;
    }

    html += `</body></html>`;
    return html;
  };

  /**
   * Exports the current filtered results as a styled PDF file.
   */
  const handleExport = () => {
    const tableHTML = generateTableHTML();
    const element = document.createElement("div");
    element.innerHTML = tableHTML;

    const opt = {
      margin: [0, 10, 10, 10],
      filename: "tree-data.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-7 bg-gray-80 min-h-screen">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">  
        <div>
          <button
            onClick={() => navigate("/filters")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            ← Return to Filters
          </button>
          <button
            onClick={toggleView}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {compactView ? "Switch to Detailed View" : "Switch to Compact View"}
          </button>
        </div>

        {treeData.length > 0 && (
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter project name"
              className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-green-500"
            />
            <button
              id="export-button"
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <FaFilePdf className="text-white" />
              Export to PDF
            </button>
          </div>
        )}
      </div>      

      <div className="mb-6">
          <label className="flex items-center gap-2 text-lg dark:text-gray-300">
            <input
              type="checkbox"
              checked={showPartialMatch}
              onChange={(e) => setShowPartialMatch(e.target.checked)}
            />
            Show trees that partially match filters (≥ 50% match)
          </label>
      </div>

      <section
        id="results-section"
        ref={resultsRef}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 dark:text-green-100">
          Filtered Results:
        </h2>

        <div className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {zipCode && (
            <p className="text-lg font-semibold mb-2 dark:text-gray-300">
              {" "}
              ZIP Code: {zipCode}{" "}
            </p>
          )}
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">
            Selected Filters:
          </h3>
          <p className="text-lg font-semibold mb-2 dark:text-gray-300">
            {" "}
            {renderSelectedFilters()}{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treeData &&
          treeData.filter(
            (tree) => 
              !tree.hasCriticalFailure && 
            tree.passedPercent >= (showPartialMatch ? 50 : 100)
          ).length > 0 ? (
            treeData
              .filter(
                (tree) => 
                  !tree.hasCriticalFailure && 
                tree.passedPercent >= (showPartialMatch ? 50 : 100)
              )
              .map((tree, index) => (
                <div key={index} className="w-full">
                  {compactView ? (
                    <Result key={tree.commonName} tree={tree} />
                  ) : (
                    <DetailedResult key={tree.commonName} tree={tree} />
                    )}
                </div>
              ))
          ) : (
            <p className="col-span-full text-lg text-gray-600 p-10 dark:text-gray-300">
              No trees match the selected filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Results;
