import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Footer component with disclaimer and attribution.
 *
 * @component
 * @param {string} lastFetchedDate - The date when data was last fetched. Displays "N/A" if not provided.
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer({ lastFetchedDate }) {
  return (
    <footer className="bg-green-800 text-white px-6 py-6">
      {/* Disclaimer Section */}
      <div className="disclaimer-container max-w-6xl mx-auto">
        <p className="disclaimer-title flex items-center font-bold mb-2">
          <FaExclamationTriangle className="mr-2" />
          Disclaimer:
        </p>
        <p className="text-sm leading-relaxed">
          The information presented in this tool has been compiled from multiple sources. In cases where sources conflicted,
          the authors applied their best judgment to present the most accurate information. Chesapeake Conservancy, including
          its employees and contributors, assumes no responsibility for any inaccuracies, omissions, or misinterpretations of
          the data. This tool is intended as a general guide and should not replace consultation with local forestry or conservation
          experts. Users are encouraged to verify information before making any planting decisions.
        </p>
      </div>

      {/* Separator Line */}
      <hr className="my-6 border-t border-white/30" />

      {/* Attribution */}
      <p className="footer-attribution text-sm max-w-6xl mx-auto leading-relaxed">
        🌿 This web tool was developed by Aya Tarist, Emily Rivera, Claire Engel, John Uysal, Colin Soule, and Reva Sharma of Bucknell University, as a partnership effort between Chesapeake Conservancy and Susquehanna University. For questions, feedback, or to report any errors, please contact us at{" "}
        <a
          href="mailto:treeselector@chesapeakeconservancy.org"
          className="underline hover:text-green-300"
        >
          treeselector@chesapeakeconservancy.org
        </a>.
      </p>
    </footer>
  );
}

export default Footer;
