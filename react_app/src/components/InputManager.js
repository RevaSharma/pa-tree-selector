import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ZipCodeInput from "./ZipCodeInput";
import FilterInput from "./FilterInput";
import filterConfig from "../data/filterConfig.json";

function InputManager({ filteringState, setFilteringState }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get hardiness zone from navigation state if it exists
  useEffect(() => {
    if (location.state?.hardinessZone) {
      setFilteringState(prev => ({
        ...prev,
        hardinessZone: location.state.hardinessZone
      }));
    }
  }, [location.state, setFilteringState]);

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

      {/* Display current hardiness zone if it exists */}
      {filteringState.hardinessZone && (
        <div className="p-4 mb-6 bg-green-100 rounded-lg">
          <p className="text-green-800">
            Current Hardiness Zone: <strong>{filteringState.hardinessZone}</strong>
            <button 
              onClick={() => updateHardinessZone(null)}
              className="ml-4 text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            >
              Change
            </button>
          </p>
        </div>
      )}
      
      {/* Show ZIP input if no hardiness zone is selected */}
      {!filteringState.hardinessZone && (
        <div className="bg-white shadow-md rounded-lg p-5 mb-6 w-full max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-3">Hardiness Zone</h3>
          <ZipCodeInput updateHardinessZone={updateHardinessZone} />
        </div>
      )}

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
