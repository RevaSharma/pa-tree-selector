import React, { useState } from "react";
import { Info } from "lucide-react";

const TreeInfoButton = ({ tree }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getWikipediaLink = (treeName) => {
    return `https://en.wikipedia.org/wiki/${treeName.replace(/\s+/g, "_")}`;
  };

  return (
    <div className="relative inline-block">
      {/* Info Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-white text-green-600 border border-green-600 
                   rounded-full hover:bg-gray-100 transition"
        aria-label="Show tree information"
      >
        <Info size={20} />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          className="absolute left-full transform -translate-y-1/2 
                     ml-4 w-48 bg-white text-gray-800 shadow-lg rounded-md p-2 
                     border border-gray-300"
        >
          <a
            href={getWikipediaLink(tree.commonName)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-green-600 hover:text-green-700"
            >
              Learn more on Wikipedia
              <svg
                className="w-4 h-8 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 
                     002 2h10a2 2 0 002-2v-4M14 4h6m0 
                     0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
      )}
    </div>
  );
};

export default TreeInfoButton;
