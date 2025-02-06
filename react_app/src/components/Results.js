// import React, { useRef } from "react";
// import "./Results.css";
// import html2pdf from "html2pdf.js";

// function Results({ filters, treeData }) {
//   const resultsRef = useRef();

//   const handleExport = () => {
//     const element = resultsRef.current;
//     const options = {
//       margin: 1,
//       filename: "plant-results.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };
//     html2pdf().set(options).from(element).save();
//   };

//   const filteredResults = treeData.filter((tree) => {
//     for (const key in filters) {
//       if (filters[key].length > 0 && !filters[key].includes(tree[key])) {
//         return false;
//       }
//     }
//     return true;
//   });

//   return (
//     <section className="results-page" ref={resultsRef}>
//       <h2 className="section-title">Search Results</h2>
      
//       <div className="results-grid">
//         {filteredResults.length > 0 ? (
//           filteredResults.map((tree, index) => (
//             <div key={index} className="result-card">
//               <div className="image-container">
//                 <div className="image-placeholder">
//                   Image
//                 </div>
//               </div>
//               <div className="card-content">
//                 <h3 className="common-name">{tree.commonName || "Common Name"}</h3>
//                 <p className="scientific-name">{tree.scientificName || "Scientific Name"}</p>
//                 <p className="plant-type">{tree.woodyPlantType || "Tree/Shrub"}</p>
//                 <p className="category">{tree.category || "Deciduous/Evergreen"}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">
//             <p>No plants match the selected filters.</p>
//           </div>
//         )}
//       </div>

//       {filteredResults.length > 0 && (
//         <button className="export-button" onClick={handleExport}>
//           Export Selection
//         </button>
//       )}
//     </section>
//   );
// }

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
            <div key={index} className="result-card"> {/* Each tree is displayed as a card */}
              <div className="image-placeholder">Image</div> {/* Placeholder for the tree image */}
              <p><strong>{tree.commonName}</strong></p> {/* Display common name of the tree */}
              <p>{tree.sciName}</p> {/* Display scientific name of the tree */}
              <p>Type: {tree.woodyPlantType}</p> {/* Display type (Tree/Shrub) */}
              <p>Soil Moisture: {tree.soilMoistureConditions}</p> {/* Display soil moisture preference */}
              <p>Shade Tolerance: {tree.shadeTolerance}</p> {/* Display shade tolerance */}
              <p>Growth Rate: {tree.growthRate}</p> {/* Display growth rate */}
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


