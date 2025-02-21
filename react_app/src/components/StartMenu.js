import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hardinessMap from "../data/hardinessMap.json";
import { FaTree, FaMapMarkerAlt } from "react-icons/fa"; // Import icons from react-icons

function StartMenu() {
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
    navigate("/filters", { state: { zip, hardinessZone } });
  };

  const isButtonEnabled = isValidZip(zip) && hardinessZone !== null;

  return (
    <section
      id="start-menu"
      className="hideable crumb-page flex flex-col items-center justify-center pt-17 px-8 bg-gradient-to-b from-green-50 to-white min-h-screen"
    >
      <div className="max-w-2xl w-full text-center bg-white p-8 rounded-xl shadow-lg border border-green-100">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-6">
          <FaTree className="text-6xl text-green-600 mr-4" />
          <h1 className="text-4xl font-bold text-green-900">
            Pennsylvania Native Tree Selector
          </h1>
        </div>

        {/* Description Section */}
        <p className="text-lg text-gray-700 mb-6">
          The <strong>Pennsylvania Tree Selector Tool</strong> is a user-friendly resource
          that helps landowners and conservation planners quickly find the best native species
          to plant in Pennsylvania. By evaluating your site conditions—such as soil preferences,
          growth rate, and shade tolerance—this tool provides efficient, research-backed
          recommendations.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Whether you're a seasoned professional or new to tree planting, this tool streamlines
          your decision-making process. Enter your ZIP code below to discover species best suited
          for your local conditions. It's a vital asset for ensuring successful plantings and
          healthy ecosystems.
        </p>

        {/* ZIP Code Input Section */}
        <div className="mb-6">
          <p className="text-xl mb-4 text-green-800 flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2" />
            Enter your ZIP code to get started:
          </p>
          <input
            type="text"
            value={zip}
            onChange={handleZipCodeChange}
            placeholder="Enter ZIP code"
            className="border-2 border-green-300 p-3 rounded-lg mb-4 w-64 text-center text-lg focus:border-green-500 focus:outline-none"
            required
          />
          {zip && (
            <p className="mb-4 text-green-700">
              {hardinessZone
                ? `ZIP code ${zip} maps to hardiness zone ${hardinessZone}.`
                : `No hardiness zone match found for ZIP code ${zip}.`}
            </p>
          )}
        </div>

        {/* Get Started Button */}
        <button
          id="start-button"
          onClick={handleGetStarted}
          className={`py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 flex items-center justify-center mx-auto ${
            isButtonEnabled
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isButtonEnabled}
        >
          <FaTree className="mr-2" />
          Get Started
        </button>
      </div>
    </section>
  );
}

export default StartMenu;
