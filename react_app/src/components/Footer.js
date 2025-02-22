import React from "react";

function Footer({ lastFetchedDate }) {
  return (
    <footer className="bg-gray-100 text-gray-700 text-center py-4 mt-10 w-full">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm">
          This project makes use of biodiversity occurrence data provided by the Global Biodiversity Information Facility (GBIF).
          Data accessed via the GBIF API. Citation:
        </p>
        <p className="text-sm italic">
          GBIF Secretariat: <strong>GBIF Backbone Taxonomy.</strong> Available from{" "}
          <a
            href="https://www.gbif.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            www.gbif.org
          </a>. Accessed on {lastFetchedDate || "N/A"}.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
