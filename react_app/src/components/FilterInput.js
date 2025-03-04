import React from "react";
import InfoTooltip from "./InfoTooltip";

/**
 * Converts a camelCase string to title case, with spaces inserted before capital letters.
 *
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The string formatted in title case, with spaces before capital letters.
 *
 * @example
 * camelCaseToTitleCase("jugloneTolerance"); // "Juglone Tolerance"
 */
const camelCaseToTitleCase = (str) =>
  str
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter

/**
 * FilterInput component for managing a single filter with selectable options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.property - The property being filtered.
 * @param {Array<string>} props.options - Available options for the filter.
 * @param {Function} props.update - Callback function triggered when an option is toggled.
 * @param {Array<string>} [props.selectedOptions=[]] - List of currently selected filter options.
 * @param {string} [props.displayTitle] - Custom display title for the filter (defaults to a formatted version of `property`).
 *
 * @returns {JSX.Element} The rendered filter input component.
 */
const FilterInput = ({
  property,
  options,
  update,
  selectedOptions = [],
  displayTitle,
}) => {
  const title = displayTitle || camelCaseToTitleCase(property);

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
