import React from "react";
import InfoTooltip from "./InfoTooltip";

/**
 * Manages a single filter.
 *
 * @param {Object} props - Component props.
 * @param {string} props.property - Property being filtered.
 * @param {Array<string>} props.options - Options for the filtered property.
 * @param {Function} props.update - Function to call when toggling an option.
 * @param {Array<string>} [props.selectedOptions=[]] - Currently selected filter options.
 * @param {string} [props.displayTitle] - Title displayed for this filter (optional).
 *
 * @returns {JSX.Element} Rendered filter component.
 */

// Helper function to convert a string to title case.
const titleCase = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const FilterInput = ({ property, options, update, selectedOptions = [], displayTitle }) => {
  // First, insert spaces before capital letters.
  const formatted = property.replace(/([A-Z])/g, " $1").trim();
  // Then, convert the result to title case.
  const title = displayTitle || titleCase(formatted);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6 w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <InfoTooltip label={title} />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => update(property, option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedOptions.includes(option)
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterInput;
