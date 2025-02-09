import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ZipCodeInput from "./ZipCodeInput";
import FilterInput from "./FilterInput";
import filterConfig from "../data/filterConfig.json";

/**
 * Manages the overall filtering state.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.setFilters - Function to update selected filters.
 * @param {Object} props.hardinessData - Data mapping ZIP codes to hardiness zones.
 * @param {Function} props.setSelectedHardinessZone - Function to update selected hardiness zone.
 *
 * @returns {JSX.Element} Filter management component.
 */
function InputManager({ setFilters }) {
  const [filteringState, updateFilteringState] = useState({});
  const navigate = useNavigate();

  // function used by filter input to update filtering state
  function updateFilter(property, value) {
    updateFilteringState((prev) => {
      // if given value is already in the array of selected values for that property, then...
      const selectedValues = prev[property]?.includes(value)
        ? prev[property].filter((v) => v !== value) // remove it from that array
        : [...(prev[property] || []), value]; // else, append value to the array

      // remove the property from filtering state if the selected values array is now empty
      const newSelectedFilters = {
        ...prev,
        [property]: selectedValues.length ? selectedValues : undefined,
      };

      return newSelectedFilters;
    });
  }

  // function used by zip code input to update filtering state
  function updateHardinessZone(zone) {
    updateFilteringState((prev) => {
      // if zone is null, remove hardinessZone from filtering state, else update it as zone
      return zone !== null
        ? { ...prev, hardinessZone: zone }
        : Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== "hardinessZone")
          );
    });
  }

  function handleViewResults() {
    setFilters(filteringState);
    navigate("/results");
  }

  return (
    <div>
      <h2>Tree Filtering Options</h2>
      filteringState = {JSON.stringify(filteringState, null, 2)}
      <ZipCodeInput updateHardinessZone={updateHardinessZone} />
      {filterConfig.map(({ property, options, displayTitle }) => (
        <FilterInput
          key={property}
          property={property}
          options={options}
          update={updateFilter}
          filter={filteringState[property]}
          displayTitle={displayTitle}
        />
      ))}
      <button onClick={handleViewResults} style={{ marginTop: "10px" }}>
        View Results
      </button>
    </div>
  );
}

export default InputManager;
