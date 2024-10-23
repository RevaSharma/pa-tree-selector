// This code runs after the document has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const treeSelect = document.getElementById('tree-select');
    const treeInfo = document.getElementById('tree-info');

    // Load trees from JSON
    fetch('trees.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(tree => {
                const option = document.createElement('option');
                option.value = tree.sciName;
                option.textContent = tree.commonName;
                treeSelect.appendChild(option);
            });
        });

    // Handle when the selection changes
    treeSelect.addEventListener('change', (event) => {
        const selectedTree = event.target.value;
        treeInfo.textContent = `Scientific name: ${selectedTree}.`;
    });
});
