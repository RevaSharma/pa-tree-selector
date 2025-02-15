import { useNavigate } from "react-router-dom";
import ZipCodeInput from "./ZipCodeInput";
import FilterInput from "./FilterInput";
import filterConfig from "../data/filterConfig.json";

/**
 * Manages the overall filtering state.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.filteringState - The current filtering state from App.js.
 * @param {Function} props.setFilteringState - Function to update selected filters.
 *
 * @returns {JSX.Element} Filter management component.
 */
function InputManager({ filteringState, setFilteringState }) {
  const navigate = useNavigate();

  // function used by filter input to update filtering state
  function updateFilter(property, value) {
    setFilteringState((prev) => {
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
    setFilteringState((prev) => {
      // if zone is null, remove hardinessZone from filtering state, else update it as zone
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Tree Filtering Options
      </h2>

      <ZipCodeInput updateHardinessZone={updateHardinessZone} />

      {/* Mapping Filter Options */}
      <div className="space-y-4">
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
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        View Results
      </button>
    </div>
  );
}

export default InputManager;
