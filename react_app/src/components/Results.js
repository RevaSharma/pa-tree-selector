import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import TreeInfoButton from './TreeInfoButton'; 

function Results({ treeData }) {
  const resultsRef = useRef();
  const [compactView, setCompactView] = useState(true);

  const toggleView = () => {
    setCompactView((prev) => !prev);
  };

  const generateTableHTML = () => {
    const treesPerPage = 16; // Adjust as needed
    let tableHTML = `
      <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          tr {
            min-height: 50px;
          }
          th {
            background-color: RGB(211, 222, 219);
            color: #1F2937; /* Tailwind gray-800 */
          }
          .header-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            background-color: RGB(51, 107, 136); /* Chesapeake Conservancy blue */
            padding: 10px;
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
          .page-break {
            page-break-after: always;
          }
        </style>
      </head>
      <body>
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
          <td>${tree.commonName || ''}</td>
          <td>${tree.sciName || ''}</td>
          <td>${tree.woodyPlantType || ''}</td>
          <td>${tree.soilMoistureConditions || ''}</td>
          <td>${tree.shadeTolerance || ''}</td>
          <td>${tree.growthRate || ''}</td>
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

    const element = document.createElement('div');
    element.innerHTML = tableHTML;

    const opt = {
      margin: 10,
      filename: 'tree-data.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
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