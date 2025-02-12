import React, { useRef } from "react"; // Import React and useRef for referencing elements
import "./Results.css"; // Import CSS for styling
import html2pdf from "html2pdf.js"; // Import library for exporting PDF

function Results({ treeData }) {
  const resultsRef = useRef(); // Reference to the results section for exporting

  // Function to handle exporting results as a PDF
  const handleExport = () => {
    const element = resultsRef.current; // Get the results section
    const options = {
      margin: 1,
      filename: "tree-results.pdf", // Name of the exported file
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save(); // Generate and save the PDF
  };

  return (
    // Section that contains the entire results page, referenced for export
    <section id="results-section" className="results-page" ref={resultsRef}>
      <h2 className="section-title">Filtered Results:</h2>

      {/* Display the results in a grid format */}
      <div className="results-grid">
        {treeData.length > 0 ? (
          treeData.map((tree, index) => (
            <div key={index} className="result-card">
              {" "}
              <div className="image-placeholder">Image</div>{" "}
              <p>
                <strong>{tree.commonName}</strong>
              </p>{" "}
              <p>{tree.sciName}</p>
              <p>Type: {tree.woodyPlantType}</p>{" "}
              <p>Soil Moisture: {tree.soilMoistureConditions}</p>{" "}
              <p>Shade Tolerance: {tree.shadeTolerance}</p>{" "}
              <p>Growth Rate: {tree.growthRate}</p>
            </div>
          ))
        ) : (
          // If no trees match the selected filters, show this message
          <p>No trees match the selected filters.</p>
        )}
      </div>

      {/* Export button, only shown if there are filtered results */}
      {treeData.length > 0 && (
        <button className="export-button" onClick={handleExport}>
          Export Selection as PDF
        </button>
      )}
    </section>
  );
}

export default Results; // Export component so it can be used in other parts of the app
