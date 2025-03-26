import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterInput from "./FilterInput";
import ZipCodeInput from "./ZipCodeInput";
import filterConfig from "../data/filterConfig.json";
import hardinessMap from "../data/hardinessMap.json";

// Component managing the filtering UI and logic
function InputManager({ filteringState, setFilteringState }) {
  const navigate = useNavigate();

  // State to show/hide ZIP input UI
  const [showZipInput, setShowZipInput] = useState(false);

  // Temporary ZIP code state for input
  const [tempZip, setTempZip] = useState(filteringState.zipCode || "");

  // Function to update filter selections
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

  // Navigate to results page
  function handleViewResults() {
    navigate("/results");
  }

  // Reset filters except ZIP and zone
  function reinitializeFilters() {
    setFilteringState((prev) => {
      const { hardinessZone, zipCode } = prev;
      return { hardinessZone, zipCode };
    });
  }

  // Confirm and update ZIP code and corresponding hardiness zone
  function handleConfirmZip() {
    const zone = hardinessMap[tempZip] || null;

    setFilteringState((prev) => ({
      ...prev,
      zipCode: tempZip,
      hardinessZone: zone,
    }));

    setShowZipInput(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      {/* Component Heading */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
        Tree Filtering Options
      </h2>

      {/* Introduction Text */}
      <p className="text-lg text-gray-700 leading-relaxed">
        Welcome! Use the filters below to find your perfect tree. Please choose
        among different filters to narrow down the best match.
      </p>

      {/* Current ZIP code and hardiness zone display */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md shadow-sm">
        <p className="text-lg text-gray-800">
          Your current ZIP code is{" "}
          <span className="font-bold">{filteringState.zipCode || "not set"}</span>,
          mapping to Hardiness Zone{" "}
          <span className="font-bold">
            {filteringState.hardinessZone || "N/A"}
          </span>
          .
        </p>

        {/* Button to toggle ZIP input UI */}
        {!showZipInput && (
          <button
            onClick={() => setShowZipInput(true)}
            className="px-5 py-2 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Change ZIP Code
          </button>
        )}

        {/* ZIP input UI */}
        {showZipInput && (
          <div className="mt-4 p-4 bg-white shadow-sm rounded-lg">
            <ZipCodeInput
              updateHardinessZone={(zone) => {
                setFilteringState((prev) => ({
                  ...prev,
                  hardinessZone: zone,
                }));
              }}
              setFilteringState={(fn) => {
                setFilteringState((prev) => {
                  const newState = fn(prev);
                  setTempZip(newState.zipCode || "");
                  return newState;
                });
              }}
            />

            {/* Confirm and cancel buttons for ZIP input */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleConfirmZip}
                className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowZipInput(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamically generated filter inputs */}
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

      {/* Buttons for viewing results or resetting filters */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleViewResults}
          className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          View Results
        </button>
        <button
          onClick={reinitializeFilters}
          className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default InputManager;