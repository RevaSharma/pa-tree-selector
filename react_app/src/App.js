import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import GettingStarted from "./components/GettingStarted";
import InputManager from "./components/InputManager";
import Results from "./components/Results";
import fetchCSVData from "./utils/fetchCSVData";
import { filterTrees } from "./utils/filterTrees";

function App() {
  const [filteringState, setFilteringState] = useState({});
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchCSVData().then((fetchedData) => {
      console.log("Fetched Data:", fetchedData);
      setTrees(fetchedData);
    });
  }, []);

  // Call filterTrees whenever trees or filteringState changes
  useEffect(() => {
    if (trees.length > 0 && filteringState) {
      const filtered = filterTrees(trees, filteringState);
      setFilteredTrees(filtered);
    }
  }, [trees, filteringState]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GettingStarted />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/getting-started"
          element={
            <InputManager
              filteringState={filteringState}
              setFilteringState={setFilteringState}
            />
          }
        />
        <Route path="/results" element={<Results treeData={filteredTrees} />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
