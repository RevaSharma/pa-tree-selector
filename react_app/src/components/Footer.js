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
    <footer className="bg-green-800 text-white px-6 py-6 dark:bg-green-900">
      {/* Disclaimer Section */}
      <div className="disclaimer-container max-w-6xl mx-auto dark:bg-green-700">
        <p className="disclaimer-title flex items-center font-bold mb-2 dark:text-green-100">
          <FaExclamationTriangle className="mr-2" />
          Disclaimer:
        </p>
        <p className="text-sm leading-relaxed dark:text-green-100">
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
<p className="footer-attribution text-sm max-w-6xl mx-auto leading-relaxed dark:text-green-100">
  🌿 <a
    href="https://patreeselector.netlify.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-green-300"
  >
    Pennsylvania Native Tree Selector
  </a>{" "}
  © 2025 by Aya Tarist, Emily Rivera, Claire Engel, John Uysal, Colin Soule, and Reva Sharma of Bucknell University and Ava Lang of Susquehanna University, as a partnership effort with Chesapeake Conservancy is licensed under{" "}
  <a
    href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-green-300"
  >
    CC BY-NC-ND 4.0
  </a>. For questions, feedback, or to report any errors, please contact us at{" "}
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
