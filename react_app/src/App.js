import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import Footer component
import About from "./components/About";
import StartMenu from "./components/StartMenu";
import InputManager from "./components/InputManager";
import Results from "./components/Results";
import { filterTrees } from "./utils/filterTrees";
import { fetchTreeImages } from "./utils/fetchTreeImages";
import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSN9qYza-MdxZdNBnWK58LbIFS6v6UIdYXPwrNgCewtPqVuYdt2g7HmzXXG9x6kshf_-8Cctgj2xTOp/pub?output=csv";

function App() {
  const [filteringState, setFilteringState] = useState({});
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchedDate, setLastFetchedDate] = useState(null);

  useEffect(() => {
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setTrees(result.data.slice(1));
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  useEffect(() => {
    // This will run every time trees or filteringState changes
    if (trees.length > 0 && filteringState) {
      const filtered = filterTrees(trees, filteringState);
      setFilteredTrees(filtered);

      const populateWithImages = async () => {
        setIsLoading(true);
        setLastFetchedDate(new Date().toLocaleDateString());
        const updatedTrees = await fetchTreeImages(
          filterTrees(trees, filteringState)
        );
        setFilteredTrees(updatedTrees);
        setIsLoading(false);
      };

      populateWithImages();
    }
    console.log("Current filteringState:", filteringState);
  }, [trees, filteringState]);

  useEffect(() => {
    // This will run every time `filteredTrees` changes
    console.log("Current filtered trees:", filteredTrees);
  }, [filteredTrees]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <StartMenu
                  filteringState={filteringState}
                  setFilteringState={setFilteringState}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/filters"
              element={
                <InputManager
                  filteringState={filteringState}
                  setFilteringState={setFilteringState}
                />
              }
            />
            <Route
              path="/results"
              element={
                <Results treeData={filteredTrees} isLoading={isLoading} />
              }
            />
          </Routes>
        </main>
        <Footer lastFetchedDate={lastFetchedDate} />
      </div>
    </Router>
  );
}

export default App;
