// import { useState } from "react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Filter = ({ property, options, toggle, filter = [], displayTitle }) => {
//   const generateTitle = (str) => {
//     return str.split(/(?=[A-Z])/).join(" ").replace(/^\w/, (c) => c.toUpperCase());
//   };

//   const title = displayTitle || generateTitle(property);

//   return (
//     <div>
//       <h3>{title}</h3>
//       {options.map((option) => (
//         <button
//           key={option}
//           onClick={() => toggle(property, option)}
//           style={{
//             background: filter.includes(option) ? "green" : "gray",
//             margin: "5px",
//           }}
//         >
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// };

// function Filters({ setFilters, hardinessData, setSelectedHardinessZone }) {
//   const [activeFilters, updateActiveFilters] = useState({});
//   const [zipCode, setZipCode] = useState('');
//   const navigate = useNavigate();

//   const handleZipCodeChange = (e) => {
//     const zip = e.target.value.trim();
//     setZipCode(zip);
    
//     if (zip in hardinessData) {
//       setSelectedHardinessZone(hardinessData[zip]);
//     } else {
//       setSelectedHardinessZone(null);
//     }
//   };

//   const toggle = (property, value) => {
//     updateActiveFilters((prev) => {
//       const updatedProperty = prev[property]
//         ? prev[property].includes(value)
//           ? prev[property].filter((v) => v !== value)
//           : [...prev[property], value]
//         : [value];

//       const newSelectedFilters = { ...prev, [property]: updatedProperty };

//       if (updatedProperty.length === 0) {
//         delete newSelectedFilters[property];
//       }

//       return newSelectedFilters;
//     });
//   };

//   const handleViewResults = () => {
//     setFilters(activeFilters);
//     navigate("/results");
//   };

//   return (
//     <div>
//       <h2>Tree Filtering Options</h2>
      
//       <div>
//         <h3>Zip Code (for Hardiness Zone)</h3>
//         <input
//           type="text"
//           value={zipCode}
//           onChange={handleZipCodeChange}
//           placeholder="Enter ZIP code"
//         />
//       </div>

//       <Filter property="woodyPlantType" options={["Tree", "Shrub"]} toggle={toggle} filter={activeFilters.woodyPlantType} />
//       <Filter property="soilMoistureConditions" options={["Dry", "Moist", "Wet"]} toggle={toggle} filter={activeFilters.soilMoistureConditions} />
//       <Filter property="soilCompactionTolerance" options={["Tolerant", "Intermediate"]} toggle={toggle} filter={activeFilters.soilCompactionTolerance} />
//       <Filter property="shadeTolerance" options={["Very Tolerant", "Tolerant", "Intermediate", "Intolerant", "Very Intolerant"]} toggle={toggle} filter={activeFilters.shadeTolerance} />
//       <Filter property="floodTolerance" options={["Tolerant", "Intermediate"]} toggle={toggle} filter={activeFilters.floodTolerance} />
//       <Filter property="droughtTolerance" options={["Tolerant", "Intermediate"]} toggle={toggle} filter={activeFilters.droughtTolerance} />
//       <Filter property="roadSaltSprayTolerance" options={["Tolerant", "Intermediate", "Intolerant"]} toggle={toggle} filter={activeFilters.roadSaltSprayTolerance} />
//       <Filter property="hasLivestakePotential" options={["Yes"]} toggle={toggle} filter={activeFilters.hasLivestakePotential} displayTitle="Livestake Potential" />
//       <Filter property="wetlandIndicator" options={["OBL", "FACW", "FAC", "FACU", "UPL"]} toggle={toggle} filter={activeFilters.wetlandIndicator} />
//       <Filter property="pollinators" options={["Yes"]} toggle={toggle} filter={activeFilters.pollinators} />
//       <Filter property="jugloneTolerance" options={["Yes"]} toggle={toggle} filter={activeFilters.jugloneTolerance} displayTitle="Cohabitable with Black Walnut" />
//       <Filter property="deerPalatability" options={["Palatable", "Unpalatable"]} toggle={toggle} filter={activeFilters.deerPalatability} />
//       <Filter property="multifunctionalUses" options={["Yes"]} toggle={toggle} filter={activeFilters.multifunctionalUses} />
//       <Filter property="growthRate" options={["Slow", "Medium", "Fast"]} toggle={toggle} filter={activeFilters.growthRate} />
//       <Filter property="matureHeight" options={["Less than 10ft", "10 to 30ft", "30 to 50ft", "Greater than 50ft"]} toggle={toggle} filter={activeFilters.matureHeight} />
//       <Filter property="flowerColor" options={["White", "Pink", "Yellow", "Purple"]} toggle={toggle} filter={activeFilters.flowerColor} />
//       <Filter property="fallColor" options={["Yellow", "Orange", "Red", "Purple", "Green", "Gold"]} toggle={toggle} filter={activeFilters.fallColor} />
      
//       <button onClick={handleViewResults}>View Results</button>
//     </div>
//   );
// }

// export default Filters;
import React from "react";
import { useNavigate } from "react-router-dom";

// Filters component that allows users to select filtering options
function Filters({ filters, setFilters }) {
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to update the selected filter values
  const updateFilter = (property, event) => {
    const value = event.target.value; // Get the selected value from dropdown
    setFilters((prev) => ({
      ...prev,
      [property]: value ? [value] : [], // Store selection as an array
    }));
  };
  return (
    <div>
      <h3>Filter Options</h3>

      {/* Dropdown Filters */}
      <label>Woody Plant Type:</label>
      <select onChange={(e) => updateFilter("woodyPlantType", e)}>
        <option value="">Any</option>
        <option value="Tree">Tree</option>
        <option value="Shrub">Shrub</option>
      </select>

      <label>Soil Moisture:</label>
      <select onChange={(e) => updateFilter("soilMoistureConditions", e)}>
        <option value="">Any</option>
        <option value="Dry">Dry</option>
        <option value="Moist">Moist</option>
        <option value="Wet">Wet</option>
      </select>

      <label>Shade Tolerance:</label>
      <select onChange={(e) => updateFilter("shadeTolerance", e)}>
        <option value="">Any</option>
        <option value="Very Tolerant">Very Tolerant</option>
        <option value="Tolerant">Tolerant</option>
        <option value="Intermediate">Intermediate</option>
      </select>

      <label>Growth Rate:</label>
      <select onChange={(e) => updateFilter("growthRate", e)}>
        <option value="">Any</option>
        <option value="Slow">Slow</option>
        <option value="Medium">Medium</option>
        <option value="Fast">Fast</option>
      </select>

      <label>Pollinators:</label>
      <select onChange={(e) => updateFilter("pollinators", e)}>
        <option value="">Any</option>
        <option value="Yes">Yes</option>
      </select>

      <label>Juglone Tolerance:</label>
      <select onChange={(e) => updateFilter("jugloneTolerance", e)}>
        <option value="">Any</option>
        <option value="Yes">Yes</option>
      </select>

      {/* View Results Button */}
      <button onClick={() => navigate("/results")} style={{ marginTop: "10px" }}>
        View Results
      </button>
    </div>
  );
}

export default Filters;

