import React from "react";

/**
 * Footer component with disclaimer.
 *
 * @component
 * @param {string} lastFetchedDate - The date when data was last fetched. Displays "N/A" if not provided.
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer({ lastFetchedDate }) {
  return (
    <footer>
      {/* Disclaimer Section */}
      <div className="disclaimer-container">
        <p className="disclaimer-title">⚠️ Disclaimer:</p>
        <p>
          The information presented in this tool has been compiled from multiple sources. In cases where sources conflicted, 
          the authors applied their best judgment to present the most accurate information. Chesapeake Conservancy, including 
          its employees and contributors, assumes no responsibility for any inaccuracies, omissions, or misinterpretations of 
          the data. This tool is intended as a general guide and should not replace consultation with local forestry or conservation 
          experts. Users are encouraged to verify information before making any planting decisions.
        </p>
      </div>

      {/* Footer Content */}
      <div className="mt-4 text-center text-xs">
        <p>Chesapeake Conservancy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
