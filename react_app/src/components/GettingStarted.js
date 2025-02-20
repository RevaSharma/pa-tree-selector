import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hardinessMap from "../data/hardinessMap.json";

function GettingStarted() {
  const [zip, setZip] = useState("");
  const [hardinessZone, setHardinessZone] = useState(null);
  const navigate = useNavigate();

  const isValidZip = (zip) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
  };

  const handleZipCodeChange = (e) => {
    const newZip = e.target.value.trim();
    setZip(newZip);
    const zone = hardinessMap[newZip] || null;
    setHardinessZone(zone);
  };

  const handleGetStarted = () => {
    if (!isValidZip(zip) || !hardinessZone) {
      alert("Please enter a valid ZIP code with a corresponding hardiness zone");
      return;
    }
    navigate("/getting-started", { state: { zip, hardinessZone } });
  };

  const isButtonEnabled = isValidZip(zip) && hardinessZone !== null;

  return (
    <section id="getting-started" className="hideable crumb-page flex flex-col items-center pt-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Pennsylvania Native Tree Selector</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        Please enter your ZIP code to get started with selecting native trees for your area.
      </p>
      <input
        type="text"
        value={zip}
        onChange={handleZipCodeChange}
        placeholder="Enter ZIP code"
        className="border border-gray-400 p-2 rounded mb-4 w-64"
        required
      />
      {zip && (
        <p className="mb-4">
          {hardinessZone
            ? `ZIP code ${zip} maps to hardiness zone ${hardinessZone}.`
            : `No hardiness zone match found for ZIP code ${zip}.`}
        </p>
      )}
      <button
        id="start-button"
        onClick={handleGetStarted}
        className={`py-2 px-4 rounded transition-colors duration-300 ${
          isButtonEnabled ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        disabled={!isButtonEnabled}
      >
        Get Started
      </button>
    </section>
  );
}

export default GettingStarted;
