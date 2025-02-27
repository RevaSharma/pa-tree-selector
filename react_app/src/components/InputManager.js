// export default InputManager;
import React from "react";
import { useNavigate } from "react-router-dom";
import ZipCodeInput from "./ZipCodeInput";
import FilterInput from "./FilterInput";
import filterConfig from "../data/filterConfig.json";

function InputManager({ filteringState, setFilteringState }) {
  const navigate = useNavigate();

  function updateFilter(property, value) {
    setFilteringState((prev) => {
      const selectedValues = prev[property]?.includes(value)
        ? prev[property].filter((v) => v !== value)
        : [...(prev[property] || []), value];

      return {
        ...prev,
        [property]: selectedValues.length ? selectedValues : undefined,
      };
    });
  }

  function updateHardinessZone(zone) {
    setFilteringState((prev) => {
      return zone !== null
        ? { ...prev, hardinessZone: zone }
        : Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== "hardinessZone")
          );
    });
  }

  function handleViewResults() {
    navigate("/results");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Tree Filtering Options
      </h2>
      <p className="text-gray-600 mb-6">
        Welcome! Use the filters below to find your perfect tree. First, enter
        your ZIP code to determine your Hardiness Zone. Then, choose among
        different environmental and aesthetic filters to narrow down the best
        match. 
      </p>

      {/* ZIP Code Input
      <ZipCodeInput updateHardinessZone={updateHardinessZone} /> */}

      {/* Filter Inputs */}
      <div className="space-y-4 mt-6">
        {filterConfig.map(({ property, options, displayTitle }) => (
          <FilterInput
            key={property}
            property={property}
            options={options}
            update={updateFilter}
            selectedOptions={filteringState[property]}
            displayTitle={displayTitle}
          />
        ))}
      </div>

      {/* View Results Button */}
      <button
        onClick={handleViewResults}
        className="mt-8 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
      >
        View Results
      </button>
    </div>
  );
}

export default InputManager;

