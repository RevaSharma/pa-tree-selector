import React, { useState } from "react";
import hardinessMap from "../data/hardinessMap.json";

function ZipCodeInput({ updateHardinessZone }) {
  const [zipCode, setZipCode] = useState("");
  const [hardinessZone, setHardinessZone] = useState(null);

  const handleZipCodeChange = ({ target: { value } }) => {
    const zip = value.trim();
    setZipCode(zip);
    const zone = hardinessMap[zip] || null;
    setHardinessZone(zone);
    updateHardinessZone(zone);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="zipcode-input" className="mb-2 text-gray-700">
        Enter your ZIP code to find your Hardiness Zone:
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          id="zipcode-input"
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter ZIP code"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {zipCode && (
        <p className={`mt-2 ${hardinessZone ? 'text-green-600' : 'text-red-500'}`}>
          {hardinessZone
            ? `ZIP code ${zipCode} maps to hardiness zone ${hardinessZone}.`
            : `No hardiness zone match found for ZIP code ${zipCode}.`}
        </p>
      )}
    </div>
  );
}

export default ZipCodeInput;
