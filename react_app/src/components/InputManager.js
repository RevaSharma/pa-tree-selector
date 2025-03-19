// export default InputManager;
import React from "react";
import { useNavigate } from "react-router-dom";
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

  function handleViewResults() {
    navigate("/results");
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
      Tree Filtering Options
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Welcome! Use the filters below to find your perfect tree. Please choose among 
        different filters to narrow down the best match.
      </p>


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

