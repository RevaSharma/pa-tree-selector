import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
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

   // Call filterTrees whenever trees or filteringState changes
  useEffect(() => {
    if (trees.length > 0 && filteringState) {
      const filtered = filterTrees(trees, filteringState);
      setFilteredTrees(filtered);
      fetchTreeImages(filtered);
    }
  }, [trees, filteringState]);

  // Fetch images only for already filtered trees
  const fetchTreeImages = async (treeList) => {
    setIsLoading(true); // Show loading state while fetching
    const updatedTrees = await Promise.all(
      treeList.map(async (tree) => {
        try {
          const response = await axios.get(
            `https://api.gbif.org/v1/occurrence/search?scientificName=${encodeURIComponent(
              tree.sciName
            )}&mediaType=StillImage`
          );

          // image URLs
          const images =
            response.data.results
              .flatMap((res) => res.media || [])
              .map((img) => img.identifier) || [];

          return { ...tree, images };
        } catch (error) {
          console.error("Error fetching images for:", tree.sciName, error);
          return { ...tree, images: [] };
        }
      })
    );
    setFilteredTrees(updatedTrees);
    setIsLoading(false);
  };

  return (
    <Router>
      <Header />
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
        <Route path="/results" element={<Results treeData={filteredTrees} isLoading={isLoading} />} />
      </Routes>
    </Router>
  );
}

export default App;
