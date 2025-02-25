import { useState } from "react";
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
    <div>
      <h3>Zip Code (for Hardiness Zone)</h3>
      <input
        type="text"
        value={zipCode}
        onChange={handleZipCodeChange}
        placeholder="Enter ZIP code"
      />
      {zipCode && (
        <p>
          {hardinessZone
            ? `ZIP code ${zipCode} maps to hardiness zone ${hardinessZone}.`
            : `No hardiness zone match found for ZIP code ${zipCode}.`}
        </p>
      )}
    </div>
  );
}

export default ZipCodeInput;
