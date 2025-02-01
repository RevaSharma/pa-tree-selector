import React, { useRef } from "react";
import "./Results.css"; // For styling
import html2pdf from "html2pdf.js";

function Results() {
  const resultsRef = useRef(); // Reference to the results section

  // Function to export the section as a PDF
  const handleExport = () => {
    const element = resultsRef.current; // Get the section DOM node
    const options = {
      margin: 1,
      filename: "results.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 }, // Improve resolution
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save(); // Generate and download PDF
  };

  // Placeholder data for cards
  const placeholderData = Array(8).fill({
    commonName: "Common Name",
    scientificName: "Scientific Name",
    type: "Tree/Shrub",
    category: "Deciduous/Evergreen",
  });

  return (
    <section id="results-section" className="results-page" ref={resultsRef}>
      <h2 className="section-title">Search Results:</h2>
      <div className="results-grid">
        {placeholderData.map((item, index) => (
          <div key={index} className="result-card">
            <div className="image-placeholder">Image</div>
            <p><strong>{item.commonName}</strong></p>
            <p>{item.scientificName}</p>
            <p>{item.type}</p>
            <p>{item.category}</p>
          </div>
        ))}
      </div>
      <button className="export-button" onClick={handleExport}>
        Export Selection
      </button>
    </section>
  );
}

export default Results;
