import { useState } from "react";
import hardinessMap from "../data/hardinessMap.json";

function ZipCodeInput({ updateHardinessZone, setFilteringState }) {
  const [zipCode, setZipCode] = useState("");
  const [hardinessZone, setHardinessZone] = useState(null);

  const handleZipCodeChange = ({ target: { value } }) => {
    const zip = value.trim();
    setZipCode(zip);

    // Update Hardiness Zone based on the ZIP code
    const zone = hardinessMap[zip] || null;
    setHardinessZone(zone);
    updateHardinessZone(zone);

    // Save zipCode in filteringState
    setFilteringState((prev) => ({
      ...prev,
      zipCode: zip,
    }));
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">
        Zip Code (for Hardiness Zone)
      </h2>
      
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter ZIP code"
          className="w-64 px-4 py-2 border border-green-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        {zipCode && (
          <p className={`text-sm mt-3 ${hardinessZone ? "text-green-600" : "text-orange-500"}`}>
            {hardinessZone
              ? `ZIP code ${zipCode} maps to hardiness zone ${hardinessZone}.`
              : `No hardiness zone match found for ZIP code ${zipCode}.`}
          </p>
        )}
      </div>
    </div>
  );
}

export default ZipCodeInput;