/**
 * Main application component for a tree filtering and recommendation tool.
 *
 * It loads tree data from a CSV hosted on Google Sheets, applies filters based on user input,
 * scores and sorts the trees, fetches images, and routes to various views including results,
 * species detail pages, and static pages like About and Sources.
 */

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import StartMenu from "./components/StartMenu";
import InputManager from "./components/InputManager";
import Results from "./components/Results";
import GoOffline from "./components/GoOffline";
import Sources from "./components/Sources";
import TreeSpeciesPage from "./components/TreeSpeciesPage";
import { scoreTrees } from "./utils/scoreTrees";
import { fetchTreeImages } from "./utils/fetchTreeImages";
import Papa from "papaparse";

// Public URL to CSV data hosted on Google Sheets
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSN9qYza-MdxZdNBnWK58LbIFS6v6UIdYXPwrNgCewtPqVuYdt2g7HmzXXG9x6kshf_-8Cctgj2xTOp/pub?output=csv";

/**
 * Main app logic with routing and state management.
 * Handles fetching and parsing CSV data, applying filters,
 * fetching tree images, and rendering pages.
 */
function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Load filtering state from URL if available
  const initialFilteringState = searchParams.get("filteringState")
    ? JSON.parse(searchParams.get("filteringState"))
    : {};

  const [filteringState, setFilteringState] = useState(initialFilteringState);
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchedDate, setLastFetchedDate] = useState(null);

  /**
   * Fetches and parses CSV tree data once on component mount.
   */
  useEffect(() => {
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setTrees(result.data.slice(1)); // Skip potential header repetition
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  /**
   * When trees or filters change, re-score the trees and fetch updated images.
   */
  useEffect(() => {
    if (trees.length > 0 && filteringState) {
      const filtered = scoreTrees(trees, filteringState);
      setFilteredTrees(filtered);

      const populateWithImages = async () => {
        setIsLoading(true);
        setLastFetchedDate(new Date().toLocaleDateString());
        const updatedTrees = await fetchTreeImages(filtered);
        setFilteredTrees(updatedTrees);
        setIsLoading(false);
      };

      populateWithImages();
    }
  }, [trees, filteringState]);

  /**
   * Syncs filtering state back to the URL whenever it changes.
   */
  useEffect(() => {
    setSearchParams({ filteringState: JSON.stringify(filteringState) });
  }, [filteringState, setSearchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow bg-gray-100 dark:bg-gray-900">
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
          <Route path="/gooffline" element={<GoOffline />} />
          <Route path="/sources" element={<Sources />} />
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
              <Results
                treeData={filteredTrees}
                isLoading={isLoading}
                zipCode={filteringState.zipCode}
                filters={filteringState}
              />
            }
          />
          <Route
            path="/trees/:sciName"
            element={<TreeSpeciesPage trees={filteredTrees} />}
          />
        </Routes>
      </main>
      <Footer lastFetchedDate={lastFetchedDate} />
    </div>
  );
}

/**
 * Root App component that wraps the application in a Router.
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
