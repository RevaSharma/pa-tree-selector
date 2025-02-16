import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import GettingStarted from "./components/GettingStarted";
import InputManager from "./components/InputManager";
import Results from "./components/Results";
import { filterTrees } from "./utils/filterTrees";
import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSN9qYza-MdxZdNBnWK58LbIFS6v6UIdYXPwrNgCewtPqVuYdt2g7HmzXXG9x6kshf_-8Cctgj2xTOp/pub?output=csv";

function App() {
  const [filteringState, setFilteringState] = useState({});
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setTrees(result.data.slice(1)); // Removes the first object
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
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
