let filtersData = [];
let treesData = [];

async function init() {
  // Get filter data from a JSON file
  const filtersResponse = await fetch("filters.json");
  filtersData = await filtersResponse.json();

  // Get tree data from a JSON file
  const treesResponse = await fetch("trees.json");
  treesData = await treesResponse.json();
  
  // Create filters
  createFilters();

  // Setup filter event handlers
  document.querySelectorAll("#filters select").forEach((select) => {
    select.addEventListener("change", () => applyFilters());
  });

  // Apply filters (none initially) and display results
  applyFilters();
}

function createFilters() {
  // Get a reference to the filter container
  const filterContainer = document.getElementById("filters");

  // Empty the filter container
  filterContainer.innerHTML = "";

  // Add a filter to the filter container for each entry in the filters data
  filtersData.forEach((filter) => {
    // Create an element representing the filter
    const filterDiv = document.createElement("div");
    filterDiv.setAttribute("data-filter", JSON.stringify(filter));
    filterDiv.classList.add("filter");

    // Create and add a label to the filter element
    const label = document.createElement("label");
    label.innerText = filter.title;
    filterDiv.appendChild(label);

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
    filterDiv.appendChild(select);

    // Add the finalized filter element to the filter container
    filterContainer.appendChild(filterDiv);
  });
}

function applyFilters() {
  // Gather all currently selected filter values into a data structure
  const selectedFilters = {};
  document.querySelectorAll("#filters .filter").forEach((filter) => {
    const select = filter.querySelector("select");
    const filterObject = JSON.parse(filter.getAttribute("data-filter"));
    selectedFilters[select.name] = {}
    selectedFilters[select.name].value = select.value;
    selectedFilters[select.name].filterBy = filterObject.filterBy;
  });

  // Filter tree data with the currently selected filters
  const filteredTrees = treesData.filter((tree) => {
    return Object.keys(selectedFilters).every((filterKey) => {
      // If no preference is given, pass the filter
      if (selectedFilters[filterKey].value === "No Preference") {
        return true;
      }
      // Check filtering method to determine if the filter was passed
      switch (selectedFilters[filterKey].filterBy) {
        case "exactMatch":
          return tree[filterKey] === selectedFilters[filterKey].value;
        case "includesString":
          return tree[filterKey].toLowerCase().includes(selectedFilters[filterKey].value.toLowerCase());
        case "includesStringCaseSensitive":
          return tree[filterKey].includes(selectedFilters[filterKey].value);
        case "notEmpty":
          return tree[filterKey] !== "";
        case "numberComparison":
          // TODO: This handling of number comparison is hard-coded and will not respond to JSON changes. Not ideal implementation.
          switch (selectedFilters[filterKey].value) {
            case "Less than 10ft":
              return tree[filterKey] < 10;
            case "10 to 30ft":
              return tree[filterKey] >= 10 && tree[filterKey] <= 30;
            case "30 to 50ft":
              return tree[filterKey] >= 30 && tree[filterKey] <= 50;
            case "Greater than 50ft":
              return tree[filterKey] > 50;
            default:
              console.log("Number comparison not recognized");
          }
          return true;
        default:
          console.log("Unknown filtering method");
      };
    });
  });

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
    treeDiv.classList.add("tree");

    // Create and add a header to the tree element
    const header = document.createElement("h3");
    header.innerText = `${tree.commonName} (${tree.sciName})`;
    treeDiv.appendChild(header);

    // Add a paragraph element to the tree element for each property in the tree
    Object.keys(tree).forEach((key) => {
      const propertyDiv = document.createElement("p");
      propertyDiv.innerText = `${key}: ${tree[key]}`;
      treeDiv.appendChild(propertyDiv);
    });

    // Add the finalized tree element to the results container
    resultsContainer.appendChild(treeDiv);
  });
}

// Initialize the app
init();