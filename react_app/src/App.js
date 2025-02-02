import "./App.css";
import React from "react";
import Header from "./components/Header.js";
import GettingStarted from "./components/GettingStarted.js";
import Results from "./components/Results.js";
import About from "./components/About.js";
import FetchCSVData from "./components/FetchCSVData.js";
import Filters from "./components/Filters.js";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <GettingStarted />
        <Filters />
        <Results />
        <About />
        <FetchCSVData />
      </main>
    </div>
  );
}

export default App;
