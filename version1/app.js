let filtersData = [];
let treesData = [];
let hardinessData = {};
let selectedHardinessZone = null;

async function init() {
  // Get filter data from a JSON file
  const filtersResponse = await fetch("filters.json");
  filtersData = await filtersResponse.json();

  // Get tree data from a JSON file
  const treesResponse = await fetch("trees.json");
  treesData = await treesResponse.json();

  // Get hardiness data from a JSON file
  const hardinessResponse = await fetch("hardiness.json");
  hardinessData = await hardinessResponse.json();

  // Setup zip input event handler
  document.getElementById("zip").addEventListener("input", () => {
    updateHardinessZone();
    applyFilters();
  });

  // Create filters
  createFilters();

  // Setup filter event handlers
  document.querySelectorAll(".filter select").forEach((select) => {
    select.addEventListener("change", () => applyFilters());
  });

  // Create breadcrumb navigation
  createCrumbs();

  // Hide all hideables except the getting started section
  hideAllHideables();
  document.getElementById("getting-started").classList.remove("hidden");

  // Setup buttons
  setupButtons();

  // Apply filters (none initially) and display results
  applyFilters();
}

function createFilters() {
  // Get a reference to the results element
  const resultsSectionEl = document.getElementById("results-section");

  // Add a filter group for each entry in the filters data
  filtersData.forEach((filterGroup) => {
    // Create an element representing the filter group
    const filterGroupEl = document.createElement("section");
    filterGroupEl.classList.add("filter-group");
    filterGroupEl.classList.add("hideable");
    filterGroupEl.classList.add("crumb-page");
    filterGroupEl.id = filterGroup.id;

    // Create and add a heading to the filter group element
    const h2 = document.createElement("h2");
    h2.innerText = filterGroup.title;
    h2.classList.add("section-title");
    filterGroupEl.appendChild(h2);

    // Create and add a div to the filter group element
    const filterContainerEl = document.createElement("div");
    filterContainerEl.classList.add("filters");
    filterGroupEl.appendChild(filterContainerEl);

    // Add filters to the filter group element
    filterGroup.filters.forEach((filter) => {
      // Create an element representing the filter
      const filterEl = document.createElement("div");
      filterEl.setAttribute("data-filter", JSON.stringify(filter));
      filterEl.classList.add("filter");

      // Create and add a label to the filter element
      const label = document.createElement("label");
      label.innerText = filter.title;
      filterEl.appendChild(label);

      // Create a select (a dropdown) to the filter element
      const select = document.createElement("select");
      select.name = filter.property;

      // Add a default option to the select
      const defaultOption = document.createElement("option");
      defaultOption.value = "No Preference";
      defaultOption.innerText = "No Preference";
      select.appendChild(defaultOption);

      // Add an option to the select for each option in the filter entry
      filter.options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.innerText = option;
        select.appendChild(opt);
      });

      // Add the finalized select to the filter element
      filterEl.appendChild(select);

      // Add the finalized filter element to the filter container
      filterContainerEl.appendChild(filterEl);
    });

    // Add the finalized filter group element before the results section element
    resultsSectionEl.insertAdjacentElement("beforebegin", filterGroupEl);
  });
}

function isTreePassing(tree) {
  // DEBUG message
  console.debug(`Checking if ${tree.commonName} passes the filters...`);

  // Check if hardiness zone passes
  let isInHardinessZone = true;
  if (selectedHardinessZone !== null) {
    const zoneNumber = parseInt(selectedHardinessZone.slice(0, -1));
    const [min, max] = tree.hardinessZone.split("-").map(Number);
    isInHardinessZone = zoneNumber >= min && zoneNumber <= max;
    if (isInHardinessZone) {
      console.debug(
        `  ✅︎ selected hardiness zone ${zoneNumber} in range ${min} to ${max}`
      );
    } else {
      console.debug(
        `  ❌ selected hardiness zone ${zoneNumber} not in range ${min} to ${max}`
      );
    }
  }

  // Gather all currently selected filter values into a data structure
  const selectedFilters = {};
  document.querySelectorAll(".filter").forEach((filter) => {
    const select = filter.querySelector("select");
    const filterObject = JSON.parse(filter.getAttribute("data-filter"));
    selectedFilters[select.name] = {};
    selectedFilters[select.name].value = select.value;
    selectedFilters[select.name].filterBy = filterObject.filterBy;
  });

  const isPassingFilters = Object.keys(selectedFilters).every((filterKey) => {
    // If no preference is given, pass the filter
    if (selectedFilters[filterKey].value === "No Preference") {
      console.debug(`  ✅︎ ${filterKey}: No Preference`);
      return true;
    }
    // Check filtering method to determine if the filter was passed
    switch (selectedFilters[filterKey].filterBy) {
      case "exactMatch":
        if (tree[filterKey] === selectedFilters[filterKey].value) {
          console.debug(
            `  ✅︎ ${filterKey}: ${tree[filterKey]} = ${selectedFilters[filterKey].value}`
          );
          return true;
        } else {
          console.debug(
            `  ❌ ${filterKey}: ${tree[filterKey]} != ${selectedFilters[filterKey].value}`
          );
          return false;
        }
      case "includesString":
        if (
          tree[filterKey]
            .toLowerCase()
            .includes(selectedFilters[filterKey].value.toLowerCase())
        ) {
          console.debug(
            `  ✅︎ ${filterKey}: "${selectedFilters[
              filterKey
            ].value.toLowerCase()}" is in the string "${tree[
              filterKey
            ].toLowerCase()}"`
          );
          return true;
        } else {
          console.debug(
            `  ❌ ${filterKey}: "${selectedFilters[
              filterKey
            ].value.toLowerCase()}" is not in the string "${tree[
              filterKey
            ].toLowerCase()}"`
          );
          return false;
        }
      case "includesStringCaseSensitive":
        if (tree[filterKey].includes(selectedFilters[filterKey].value)) {
          console.debug(
            `  ✅︎ ${filterKey}: "${selectedFilters[filterKey].value}" is in the case-sensitive string "${tree[filterKey]}"`
          );
          return true;
        } else {
          console.debug(
            `  ❌ ${filterKey}: "${selectedFilters[filterKey].value}" is not in the case-sensitive string "${tree[filterKey]}"`
          );
          return false;
        }
      case "notEmpty":
        if (tree[filterKey] !== "") {
          console.debug(
            `  ✅︎ ${filterKey}: "${tree[filterKey]}" is not an empty string`
          );
          return true;
        } else {
          console.debug(
            `  ❌ ${filterKey}: "${tree[filterKey]}" is an empty string`
          );
          return false;
        }
      case "numberComparison":
        const [minHeight, maxHeight] = tree[filterKey].split("-").map(Number);
        const isMinHeightValidNumber = !isNaN(minHeight);
        const isMaxHeightValidNumber = !isNaN(maxHeight);
        switch (selectedFilters[filterKey].value) {
          case "Less than 10ft":
            if (isMinHeightValidNumber && isMaxHeightValidNumber) {
              if (maxHeight < 10) {
                console.debug(`  ✅︎ ${filterKey}: ${maxHeight} < 10`);
                return true;
              } else {
                console.debug(`  ❌ ${filterKey}: ${maxHeight} < 10`);
                return false;
              }
            } else if (isMinHeightValidNumber) {
              if (minHeight < 10) {
                console.debug(`  ✅︎ ${filterKey}: ${minHeight} < 10`);
                return true;
              } else {
                console.debug(`  ❌ ${filterKey}: ${minHeight} < 10`);
                return false;
              }
            } else {
              console.error(`  ❌ ${filterKey}: invalid min height`);
            }
          case "10 to 30ft":
            if (isMinHeightValidNumber && isMaxHeightValidNumber) {
              if (minHeight >= 10 && maxHeight <= 30) {
                console.debug(
                  `  ✅︎ ${filterKey}: 10 <= ${minHeight} - ${maxHeight} <= 30`
                );
                return true;
              } else {
                console.debug(
                  `  ❌ ${filterKey}: 10 <= ${minHeight} - ${maxHeight} <= 30`
                );
                return false;
              }
            } else if (isMinHeightValidNumber) {
              if (minHeight >= 10 && minHeight <= 30) {
                console.debug(`  ✅︎ ${filterKey}: 10 <= ${minHeight} <= 30`);
                return true;
              } else {
                console.debug(`  ❌ ${filterKey}: 10 <= ${minHeight} <= 30`);
                return false;
              }
            } else {
              console.error(`  ❌ ${filterKey}: invalid min height`);
              return false;
            }
          case "30 to 50ft":
            if (isMinHeightValidNumber && isMaxHeightValidNumber) {
              if (minHeight >= 30 && maxHeight <= 50) {
                console.debug(
                  `  ✅︎ ${filterKey}: 30 <= ${minHeight} - ${maxHeight} <= 50`
                );
                return true;
              } else {
                console.debug(
                  `  ❌ ${filterKey}: 30 <= ${minHeight} - ${maxHeight} <= 50`
                );
                return false;
              }
            } else if (isMinHeightValidNumber) {
              if (minHeight >= 30 && minHeight <= 50) {
                console.debug(`  ✅︎ ${filterKey}: 30 <= ${minHeight} <= 50`);
                return true;
              } else {
                console.debug(`  ❌ ${filterKey}: 30 <= ${minHeight} <= 50`);
                return false;
              }
            } else {
              console.error(`  ❌ ${filterKey}: invalid min height`);
              return false;
            }
          case "Greater than 50ft":
            if (isMinHeightValidNumber) {
              if (minHeight > 50) {
                console.debug(`  ✅︎ ${filterKey}: ${minHeight} > 50`);
                return true;
              } else {
                console.debug(`  ❌ ${filterKey}: ${minHeight} > 50`);
                return false;
              }
            } else {
              console.error(`  ❌ ${filterKey}: invalid min height`);
              return false;
            }
          default:
            console.error("Number comparison not recognized");
        }
      default:
        console.error("Unknown filtering method");
    }
  });

  return isInHardinessZone && isPassingFilters;
}

function applyFilters() {
  // Filter tree data with the currently selected filters
  const filteredTrees = treesData.filter((tree) => isTreePassing(tree));

  // Display only the trees that passed every filter
  displayTrees(filteredTrees);
}

function displayTrees(trees) {
  // Get a reference to the results container
  const resultsContainer = document.getElementById("results");

  // Empty the results container
  resultsContainer.innerHTML = "";

  // Show a message and return if there are no trees to display
  if (trees.length === 0) {
    resultsContainer.innerHTML = "<p>No trees match the selected filters.</p>";
    return;
  }

  // Add provided trees to the results container
  trees.forEach((tree) => {
    // Create an element representing the tree
    const treeDiv = document.createElement("div");
    treeDiv.innerText = `${tree.commonName}`;
    treeDiv.classList.add("tree");

    // Add the finalized tree element to the results container
    resultsContainer.appendChild(treeDiv);
  });
}

function createCrumbs() {
  // Get a reference to the breadcrumb navigation element
  const crumbsEl = document.getElementById("crumbs");

  // Create and add a crumb to the breadcrumb navigation element for each hideable element
  const crumbPageEls = document.querySelectorAll("main > .crumb-page");
  crumbPageEls.forEach((crumbPageEl) => {
    button = document.createElement("button");
    button.classList.add("crumb");
    button.innerText = crumbPageEl.querySelector(".section-title").textContent;
    button.addEventListener("click", () => {
      hideAllHideables();
      const elementToUnhide = document.getElementById(crumbPageEl.id);
      elementToUnhide.classList.remove("hidden");
    });
    crumbsEl.appendChild(button);
  });
}

function hideAllHideables() {
  // Hide all hideable direct children of the main element
  const hideableEls = document.querySelectorAll("main > .hideable");
  hideableEls.forEach((hideableEl) => {
    hideableEl.classList.add("hidden");
  });
}

function setupButtons() {
  // Setup the about button
  const aboutButton = document.getElementById("about-button");

  // Whenever the about button is clicked...
  aboutButton.addEventListener("click", () => {
    // Hide all hideables
    hideAllHideables();

    // Unhide the about section
    const elementToUnhide = document.getElementById("about-section");
    elementToUnhide.classList.remove("hidden");
  });

  // Setup the start button
  const startButton = document.getElementById("start-button");

  // Whenever the start button is clicked...
  startButton.addEventListener("click", () => {
    // Hide all hideables
    hideAllHideables();

    // Unhide the Woody Plant Type section
    const elementToUnhide = document.getElementById("woody-plant-type");
    elementToUnhide.classList.remove("hidden");
  });
}

function updateHardinessZone() {
  const zipInput = document.getElementById("zip").value.trim();

  if (zipInput in hardinessData) {
    selectedHardinessZone = hardinessData[zipInput];
  }
}

// Initialize the app
init();
