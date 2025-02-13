// Open IndexedDB and return the database instance
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("treesDB", 1);

    dbRequest.onerror = (event) => reject(event.target.error);

    dbRequest.onsuccess = (event) => resolve(event.target.result);

    dbRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore("trees", { keyPath: "id", autoIncrement: true });
    };
  });
}

// Save trees data to IndexedDB
function saveTreesToIndexedDB(trees) {
  openIndexedDB()
    .then((db) => {
      const transaction = db.transaction("trees", "readwrite");
      const store = transaction.objectStore("trees");
      store.clear(); // Clear existing data
      trees.forEach((tree) => store.add(tree)); // Add new trees
      transaction.oncomplete = () => {
        console.log("Trees data saved to IndexedDB");
      };
    })
    .catch((error) => console.error("Error saving trees data to IndexedDB", error));
}

// Get trees data from IndexedDB
function getTreesFromIndexedDB() {
  return new Promise((resolve, reject) => {
    openIndexedDB()
      .then((db) => {
        const transaction = db.transaction("trees", "readonly");
        const store = transaction.objectStore("trees");
        const request = store.getAll();
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      })
      .catch((error) => reject(error));
  });
}

export { saveTreesToIndexedDB, getTreesFromIndexedDB };
