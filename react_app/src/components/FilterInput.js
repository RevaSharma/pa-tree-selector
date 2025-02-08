import React from "react";

/**
 * Manages a single filter.
 *
 * @param {Object} props - Component props.
 * @param {string} props.property - Property being filtered.
 * @param {Array<string>} props.options - Options for the filtered property.
 * @param {Function} props.update - Function to call when toggling an option.
 * @param {Array<string>} [props.filter=[]] - Currently selected filter options.
 * @param {string} [props.displayTitle] - Title displayed for this filter (optional).
 *
 * @returns {JSX.Element} Rendered filter component.
 */
function Filter({ property, options, update, filter = [], displayTitle }) {
  function generateTitle(str) {
    return str
      .replace(/([A-Z])/g, " $1") // Insert space before capital letters
      .replace(/^./, (c) => c.toUpperCase()); // Capitalize first letter
  }

  const title = displayTitle || generateTitle(property);

  return (
    <div>
      <h3>{title}</h3>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => update(property, option)}
          style={{
            background: filter.includes(option) ? "green" : "gray",
            margin: "5px",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Filter;
