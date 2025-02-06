import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import GettingStarted from "./components/GettingStarted";
import Filters from "./components/Filters";
import Results from "./components/Results";
import FetchCSVData from "./components/FetchCSVData";

function App() {
  // State to store selected filters
  const [filters, setFilters] = useState({
    woodyPlantType: [],
    soilMoistureConditions: [],
    shadeTolerance: [],
    growthRate: [],
    pollinators: [],
    jugloneTolerance: [],
  });

  // State to store the tree data fetched from CSV
  const [treesData, setTreesData] = useState([]);

  // Function to check if a tree matches the selected filters
  const isTreePassing = (tree) => {
    console.log("Checking tree:", tree); // Debugging: log each tree being checked
  
    for (const filterKey in filters) {
      const selectedValues = filters[filterKey];

      // If no filter is applied for this category, continue checking other filters
      if (selectedValues.length === 0) continue; 

      console.log(`Checking filter ${filterKey}:`, selectedValues, "vs tree value:", tree[filterKey]);

      // If the tree value does not match the selected filters, exclude it
      if (!selectedValues.some(value => tree[filterKey]?.includes(value))) {
        console.log(`Tree ${tree.commonName} does NOT match filter ${filterKey}.`);
        return false; // Tree doesn't match, so it's not included in results
      }
    }

    console.log(`Tree ${tree.commonName} PASSES all filters.`); // Tree matches all filters
    return true;
  };

  // Function to get only the trees that match the filters
  const getFilteredTrees = () => {
    const filtered = treesData.filter(isTreePassing);
    console.log("Final filtered trees:", filtered); // Debugging: log the trees that passed filtering
    return filtered;
  };

  return (
    <Router>
      <Header /> {/* Navigation Header */}
      <FetchCSVData setTreesData={setTreesData} /> {/* Fetch tree data from CSV */}
      <Routes>
        <Route path="/" element={<GettingStarted />} /> {/* Home Page */}
        <Route path="/about" element={<About />} /> {/* About Page */}
        <Route
          path="/getting-started"
          element={<Filters filters={filters} setFilters={setFilters} />} // Filters Page
        />
        <Route path="/results" element={<Results treeData={getFilteredTrees()} />} /> {/* Results Page */}
      </Routes>
    </Router>
  );
}

export default App;
