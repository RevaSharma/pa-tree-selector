// This code runs after the document has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const propertySelect = document.getElementById('property-select');
    const valueSelect = document.getElementById('value-select');
    const filteredTreesDiv = document.getElementById('filtered-trees');

    // Array to hold objects, each holding the data for one species
    let trees = [];

    // Load trees from JSON into trees array
    fetch('trees.json')
        .then(response => response.json())
        .then(data => {
            trees = data;
            createPropertySelect(trees);
            displayAllTrees(trees);
        });

    // Create property select dropdown
    function createPropertySelect(trees) {
        // Get selectable properties from the first tree
        const properties = Object.keys(trees[0]);

        // For each property, make it an option
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property;
            option.textContent = property.charAt(0).toUpperCase() + property.slice(1);
            propertySelect.appendChild(option);
        });

        // Handle when the property select changes
        propertySelect.addEventListener('change', (event) => {
            populateValueSelect(trees, event.target.value);
        });
    }

    // Populate value select dropdown, based on the selected property's possible values
    function populateValueSelect(trees, property) {
        // Reset options
        valueSelect.innerHTML = '<option value="">Value...</option>';

        if (property) {
            // Get unique values for the selected property
            const uniqueValues = [...new Set(trees.map(tree => tree[property]))];

            // For each unique value, make it an option
            uniqueValues.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                valueSelect.appendChild(option);
            });
        }
    }

    // Display only trees that pass the filter
    function displayFilteredTrees(filteredTrees) {
        filteredTreesDiv.innerHTML = ''; // Clear previous results

        if (filteredTrees.length === 0) {
            filteredTreesDiv.textContent = 'No trees found.';
            return;
        }

        filteredTrees.forEach(tree => {
            const treeDiv = document.createElement('div');
            treeDiv.textContent = `${tree.commonName} / ${tree.sciName}`;
            filteredTreesDiv.appendChild(treeDiv);
        });
    }

    // Handle when the value select changes (filter the trees)
    valueSelect.addEventListener('change', () => {
        const selectedProperty = propertySelect.value;
        const selectedValue = valueSelect.value;

        if (selectedProperty && selectedValue) {
            const filteredTrees = trees.filter(tree => tree[selectedProperty] === selectedValue);
            displayFilteredTrees(filteredTrees);
        } else {
            displayAllTrees(trees); // In this case, there is NO FILTER: show all trees!
        }
    });

    function displayAllTrees(trees) {
        displayFilteredTrees(trees);
    }
});
