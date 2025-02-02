import { useState } from "react";
import React from "react";

/**
 * Filter component for rendering filter options and handling selection.
 *
 * @param {string} property - property being filtered
 * @param {Array<string>} options - options for the value of filtered property
 * @param {Function} toggle - function to call when toggling an option
 * @param {Array<string>} [filter=[]] - currently selected filter options
 * @param {string} [displayTitle] - title displayed for this filter (optional)
 *
 * @returns {JSX.Element} rendered filter component
 */
const Filter = ({ property, options, toggle, filter = [], displayTitle }) => {
  // function for generating title from property name
  const generateTitle = (str) => {
    return str
      .split(/(?=[A-Z])/) // split by capital letters
      .join(" ") // join by spaces
      .replace(/^\w/, (c) => c.toUpperCase()); // capitalize first letter
  };

  // use display title if provided, else generate from property
  const title = displayTitle || generateTitle(property);

  return (
    <div>
      <h3>{title}</h3>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => toggle(property, option)}
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
};

function Filters() {
  const [activeFilters, updateActiveFilters] = useState({});

  const toggle = (property, value) => {
    updateActiveFilters((prev) => {
      const updatedProperty = prev[property]
        ? prev[property].includes(value)
          ? prev[property].filter((v) => v !== value) // remove the value if it's selected
          : [...prev[property], value] // add the value if it's not selected
        : [value]; // initialize value if undefined

      // add updated filter to active filters
      const newSelectedFilters = {
        ...prev,
        [property]: updatedProperty,
      };

      // if all options are de-selected for updated filter, remove it from active filters
      if (updatedProperty.length === 0) {
        delete newSelectedFilters[property];
      }

      return newSelectedFilters;
    });
  };

  return (
    <div>
      activeFilters = {JSON.stringify(activeFilters, null, 2)}
      <Filter
        property="woodyPlantType"
        options={["Tree", "Shrub"]}
        toggle={toggle}
        filter={activeFilters.woodyPlantType}
      />
      <Filter
        property="soilMoistureConditions"
        options={["Dry", "Moist", "Wet"]}
        toggle={toggle}
        filter={activeFilters.soilMoistureConditions}
      />
      <Filter
        property="soilCompactionTolerance"
        options={["Tolerant", "Intermediate"]}
        toggle={toggle}
        filter={activeFilters.soilCompactionTolerance}
      />
      <Filter
        property="shadeTolerance"
        options={[
          "Very Tolerant",
          "Tolerant",
          "Intermediate",
          "Intolerant",
          "Very Intolerant",
        ]}
        toggle={toggle}
        filter={activeFilters.shadeTolerance}
      />
      <Filter
        property="floodTolerance"
        options={["Tolerant", "Intermediate"]}
        toggle={toggle}
        filter={activeFilters.floodTolerance}
      />
      <Filter
        property="droughtTolerance"
        options={["Tolerant", "Intermediate"]}
        toggle={toggle}
        filter={activeFilters.droughtTolerance}
      />
      <Filter
        property="roadSaltSprayTolerance"
        options={["Tolerant", "Intermediate", "Intolerant"]}
        toggle={toggle}
        filter={activeFilters.roadSaltSprayTolerance}
      />
      <Filter
        property="hasLivestakePotential"
        options={["Yes"]}
        toggle={toggle}
        filter={activeFilters.hasLivestakePotential}
        displayTitle="Livestake Potential"
      />
      <Filter
        property="wetlandIndicator"
        options={["OBL", "FACW", "FAC", "FACU", "UPL"]}
        toggle={toggle}
        filter={activeFilters.wetlandIndicator}
      />
      <Filter
        property="pollinators"
        options={["Yes"]}
        toggle={toggle}
        filter={activeFilters.pollinators}
      />
      <Filter
        property="jugloneTolerance"
        options={["Yes"]}
        toggle={toggle}
        filter={activeFilters.jugloneTolerance}
        displayTitle="Cohabitable with Black Walnut"
      />
      <Filter
        property="deerPalatability"
        options={["Palatable", "Unpalatable"]}
        toggle={toggle}
        filter={activeFilters.deerPalatability}
      />
      <Filter
        property="multifunctionalUses"
        options={["Yes"]}
        toggle={toggle}
        filter={activeFilters.multifunctionalUses}
      />
      <Filter
        property="growthRate"
        options={["Slow", "Medium", "Fast"]}
        toggle={toggle}
        filter={activeFilters.growthRate}
      />
      <Filter
        property="matureHeight"
        options={[
          "Less than 10ft",
          "10 to 30ft",
          "30 to 50ft",
          "Greater than 50ft",
        ]}
        toggle={toggle}
        filter={activeFilters.matureHeight}
      />
      <Filter
        property="flowerColor"
        options={["White", "Pink", "Yellow", "Purple"]}
        toggle={toggle}
        filter={activeFilters.flowerColor}
      />
      <Filter
        property="fallColor"
        options={["Yellow", "Orange", "Red", "Purple", "Green", "Gold"]}
        toggle={toggle}
        filter={activeFilters.fallColor}
      />
    </div>
  );
}

export default Filters;
