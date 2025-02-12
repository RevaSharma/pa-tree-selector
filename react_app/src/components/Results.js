import React, { useRef, useState } from "react";
import "./Results.css";
import html2pdf from "html2pdf.js";

function Results({ treeData }) {
  const resultsRef = useRef();
  const [compactView, setCompactView] = useState(true); // Default to compact mode

  const handleExport = () => {
    if (resultsRef.current) {
      const options = {
        margin: 1,
        filename: "tree-results.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().set(options).from(resultsRef.current).save();
    }
  };

  return (
    <div>
      <button onClick={() => setCompactView((prev) => !prev)}>
        {compactView ? "Switch to Detailed View" : "Switch to Compact View"}
      </button>

      <section id="results-section" className="results-page" ref={resultsRef}>
        <h2 className="section-title">Filtered Results:</h2>

        <div className="results-grid">
          {treeData.length > 0 ? (
            treeData.map((tree, index) => (
              <div key={index} className="result-card">
                {compactView ? (
                  <p className="compact-name">{tree.commonName}</p>
                ) : (
                  <>
                    <div className="image-placeholder">Image</div>
                    <p>
                      <strong>{tree.commonName}</strong>
                    </p>
                    <p>{tree.sciName}</p>
                    <p>Type: {tree.woodyPlantType}</p>
                    <p>Soil Moisture: {tree.soilMoistureConditions}</p>
                    <p>Shade Tolerance: {tree.shadeTolerance}</p>
                    <p>Growth Rate: {tree.growthRate}</p>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No trees match the selected filters.</p>
          )}
        </div>

        {treeData.length > 0 && (
          <button className="export-button" onClick={handleExport}>
            Export Selection as PDF
          </button>
        )}
      </section>
    </div>
  );
}

export default Results;
