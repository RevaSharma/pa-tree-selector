import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import GettingStarted from "./components/GettingStarted";
import InputManager from "./components/InputManager";
import Results from "./components/Results";
import fetchCSVData from "./utils/fetchCSVData";

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

  return (
    <Router>
      <Header /> {/* Navigation Header */}
      <pre
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        trees = {JSON.stringify(trees, null, 2)}
      </pre>
      <pre>filteringState = {JSON.stringify(filteringState)}</pre>
      <Routes>
        <Route path="/" element={<GettingStarted />} /> {/* Home Page */}
        <Route path="/about" element={<About />} /> {/* About Page */}
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
        {/* Results Page */}
      </Routes>
      <pre
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        filteredTrees = {JSON.stringify(filteredTrees, null, 2)}
      </pre>
    </Router>
  );
}

export default App;
