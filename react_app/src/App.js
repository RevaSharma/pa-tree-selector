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
            setTrees(result.data.slice(1));
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  useEffect(() => {
    // This will run every time `trees` or `filteringState` changes
    if (trees.length > 0 && filteringState) {
      const filtered = filterTrees(trees, filteringState);
      setFilteredTrees(filtered);
      fetchTreeImages(filtered);
    }
    console.log('Current filteringState:', filteringState);
  }, [trees, filteringState]);

  useEffect(() => {
    // This will run every time `filteredTrees` changes
    console.log('Current filtered trees:', filteredTrees);
  }, [filteredTrees]);

  /**
   * Cleans the scientific name by removing alternate names in parentheses
   */
  const cleanScientificName = (name) => {
    return name.replace(/\s*\(.*?\)/g, "").trim(); // Removes everything inside parentheses
  };

  /**
   * Fetches images for trees using GBIF first, then Wikimedia Commons, and finally a placeholder image (we can decide if we want this or not)
   */
  const fetchTreeImages = async (treeList) => {
    if (!treeList || treeList.length === 0) return;

    setIsLoading(true);
    setLastFetchedDate(new Date().toLocaleDateString()); // Store the fetch date

    const updatedTrees = await Promise.all(
      treeList.map(async (tree) => {
        try {
          const cleanedSciName = cleanScientificName(tree.sciName); //  scientific name
          const altNameMatch = tree.sciName.match(/\((.*?)\)/); //  alternate name
          const altSciName = altNameMatch ? altNameMatch[1].trim() : null;
          const commonName = tree.commonName;

          let images = [];

          // Try GBIF API first
          images = await fetchImagesFromGBIF(cleanedSciName);
          if (!images.length && altSciName) {
            images = await fetchImagesFromGBIF(altSciName);
          }
          if (!images.length) {
            images = await fetchImagesFromGBIF(commonName);
          }

          // If GBIF fails, try Wikimedia Commons
          if (!images.length) {
            images = await fetchImagesFromWikimedia(cleanedSciName);
          }
          if (!images.length) {
            images = await fetchImagesFromWikimedia(commonName);
          }

          // Last resort - use a placeholder image
          if (!images.length) {
            images = ["https://example.com/placeholder-tree.jpg"];
          }

          return { ...tree, images };
        } catch (error) {
          console.error("Error fetching images for:", tree.sciName, error);
          return {
            ...tree,
            images: ["https://example.com/placeholder-tree.jpg"],
          }; // Use placeholder if all else fails
        }
      })
    );

    setFilteredTrees(updatedTrees);
    setIsLoading(false);
  };

  const fetchImagesFromGBIF = async (searchName) => {
    try {
      const response = await axios.get(
        `https://api.gbif.org/v1/occurrence/search?scientificName=${encodeURIComponent(
          searchName
        )}&mediaType=StillImage`
      );
      return (
        response.data.results
          ?.flatMap((res) => res.media || [])
          ?.map((img) => img.identifier) || []
      );
    } catch (error) {
      console.error("Error fetching images from GBIF for:", searchName, error);
      return [];
    }
  };

  const fetchImagesFromWikimedia = async (searchName) => {
    try {
      const response = await axios.get(
        `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=images&titles=${encodeURIComponent(
          searchName
        )}&origin=*`
      );
      return response.data.query?.pages
        ? Object.values(response.data.query.pages)
            .flatMap((page) => page.images || [])
            .map(
              (img) =>
                `https://commons.wikimedia.org/wiki/Special:FilePath/${img.title}`
            )
        : [];
    } catch (error) {
      console.error(
        "Error fetching images from Wikimedia for:",
        searchName,
        error
      );
      return [];
    }
  };

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
