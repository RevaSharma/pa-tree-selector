import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import Footer component
import About from "./components/About";
import StartMenu from "./components/StartMenu";
import InputManager from "./components/InputManager";
import Results from "./components/Results";
import { filterTrees } from "./utils/filterTrees";
import Papa from "papaparse";
import axios from "axios";

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
            setTrees(result.data.slice(1)); // Removes the first object (second header)
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  useEffect(() => {
    if (trees.length > 0 && filteringState) {
      const filtered = filterTrees(trees, filteringState);
      setFilteredTrees(filtered);
      fetchTreeImages(filtered);
    }
  }, [trees, filteringState]);

  const fetchTreeImages = async (treeList) => {
    if (!treeList || treeList.length === 0) return;

    setIsLoading(true);
    setLastFetchedDate(new Date().toLocaleDateString()); // Store the fetch date

    const updatedTrees = await Promise.all(
      treeList.map(async (tree) => {
        try {
          const response = await axios.get(
            `https://api.gbif.org/v1/occurrence/search?scientificName=${encodeURIComponent(
              tree.sciName
            )}&mediaType=StillImage`
          );

          const images =
            response.data.results?.flatMap((res) => res.media || [])?.map((img) => img.identifier) || [];

          return { ...tree, images };
        } catch (error) {
          console.error("Error fetching images for:", tree.sciName, error);
          return { ...tree, images: [] };
        }
      })
    );

    setFilteredTrees((prevTrees) =>
      prevTrees.length === treeList.length ? updatedTrees : prevTrees
    );

    setIsLoading(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<StartMenu />} />
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
              element={<Results treeData={filteredTrees} isLoading={isLoading} />}
            />
          </Routes>
        </main>
        <Footer lastFetchedDate={lastFetchedDate} />
      </div>
    </Router>
  );
}

export default App;
