import React from "react";
import InfoTooltip from "./InfoTooltip";

export const camelCaseToTitleCase = (str) =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase());

const FilterInput = ({
  property,
  options,
  values,
  setValues,
  displayTitle,
  isCriticalForSurvival,
  canSelectMultipleOptions = true,
}) => {
  const title = displayTitle || camelCaseToTitleCase(property);

  const handleOptionSelected = (option) => {
    if (canSelectMultipleOptions) {
      if (values.includes(option)) {
        setValues(values.filter((v) => v !== option));
      } else {
        setValues([...values, option]);
      }
    } else {
      if (values.includes(option)) {
        setValues([]);
      } else {
        setValues([option]);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6 w-full border border-gray-200 dark:bg-gray-600 dark:border-gray-700">
      <div className="flex justify-between items-center mb-3 text-gray-800 dark:text-gray-200">
        <h3 className="text-lg font-semibold">{title}</h3>
        <InfoTooltip label={title} />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option) => {
          return (
            <button
              key={option}
              onClick={() => handleOptionSelected(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  values.includes(option)
                    ? "bg-green-600 text-white shadow-md hover:bg-green-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterInput;
