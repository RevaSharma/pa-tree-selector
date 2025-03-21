import React from "react";

/**
 * Footer component. Displayed at the bottom of every page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.lastFetchedDate - The date when data was last fetched. Displays "N/A" if not provided.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer({ lastFetchedDate }) {
  return (
    <footer className="bg-headerBg p-4">
      <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/80">
        {/* Left side text */}
        <p className="mb-2 md:mb-0 md:mr-6">
          This project makes use of biodiversity occurrence data provided by the
          Global Biodiversity Information Facility{" "}
          <a
            href="https://www.gbif.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white"
          >
            GBIF
          </a>
          . Data accessed on {lastFetchedDate || "N/A"}.
        </p>

        {/* Right side sources */}
        <div>
          <p className="font-semibold text-white mb-1">Sources:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Merriam-Webster (10th ed., 1999)</li>
            <li>NOAA (Soil Moisture Preference)</li>
            <li>
              NRCS (Soil Compaction Tolerance, Wetland Indicator,
              Multifunctional Use)
            </li>
            <li>
              USDA National Agroforestry Center (Shade, Flood, Drought
              Tolerance, Growth Rate, Pollinator Friendly)
            </li>
            <li>Purdue Extension (Black Walnut Tolerance)</li>
            <li>USDA Forest Service (Mature Height)</li>
            <li>Arbor Day Foundation (Fall Color)</li>
            <li>PSU (Livestock Potential)</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
