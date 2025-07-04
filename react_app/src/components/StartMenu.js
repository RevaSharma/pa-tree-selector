/**
 * StartMenu Component
 * 
 * Acts as the landing page for the Pennsylvania Native Tree Selector tool.
 * Introduces the app, collects the user's ZIP code to determine hardiness zone,
 * and directs the user to the filter selection screen.
 * 
 * Props:
 * - filteringState: current set of filters (e.g. zone, soil type, etc.)
 * - setFilteringState: function to update the filter state
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import ZipCodeInput from "./ZipCodeInput";
import { FaTree } from "react-icons/fa";

function StartMenu({ filteringState, setFilteringState }) {
  const navigate = useNavigate();

  /**
   * Updates the filtering state with the selected hardiness zone
   * or removes it if zone is null.
   */
  function updateHardinessZone(zone) {
    setFilteringState((prev) => {
      return zone !== null
        ? { ...prev, hardinessZone: zone }
        : Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== "hardinessZone")
          );
    });
  }

  /**
   * Navigates the user to the filters page once they click "Get Started"
   */
  const handleClick = () => {
    navigate("/filters");
  };

  return (
    <section
      id="start-menu"
      className="hideable crumb-page flex flex-col items-center justify-center pt-12 px-8 bg-gradient-to-b min-h-screen "
    >
      <div className="max-w-2xl w-full text-center bg-white p-8 rounded-xl shadow-lg border border-green-100 dark:bg-green-800">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-6">
          <FaTree className="text-6xl text-green-600 mr-4 text-4xl font-extrabold text-green-800 dark:text-green-100 flex items-center gap-2 mb-4" />
          <h1 className="text-4xl font-bold text-green-900 dark:text-green-100">
            Pennsylvania Native Tree Selector
          </h1>
        </div>

        {/* Description Section */}
        <p className="text-lg text-gray-700 mb-6 dark:text-gray-300">
          The <strong>Pennsylvania Native Tree Selector</strong> is a
          user-friendly resource that helps landowners and conservation planners
          quickly find the best native species to plant in Pennsylvania. By
          evaluating your site conditions—such as soil preferences, growth rate,
          and shade tolerance—this tool provides efficient, research-backed
          recommendations.
        </p>
        <p className="text-lg text-gray-700 mb-8 dark:text-gray-300">
          Whether you're a seasoned professional or new to tree planting, this
          tool streamlines your decision-making process. Enter your ZIP code
          below to discover species best suited for your local conditions. It's
          a vital asset for ensuring successful plantings and healthy
          ecosystems.
        </p>

        {/* ZIP Code Input - No heading here because ZipCodeInput has its own */}
        <div className="mb-8">
          <ZipCodeInput 
            updateHardinessZone={updateHardinessZone} 
            setFilteringState={setFilteringState}
          />
        </div>

        {/* Get Started Button */}
        <button
          id="start-button"
          onClick={handleClick}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition-colors duration-300 flex items-center justify-center mx-auto"
        >
          <FaTree className="mr-2" />
          Get Started
        </button>
      </div>
    </section>
  );
}

export default StartMenu;
