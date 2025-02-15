import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-300 py-4 shadow-lg flex justify-center">
      <div className="flex justify-between items-center w-11/12 max-w-5xl">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Chesapeake Conservancy Logo"
            className="h-12 mr-3"
          />
          <h1 className="text-white text-2xl font-bold">
            PA Tree Selector Tool
          </h1>
        </div>
        <nav className="flex gap-5">
          <Link
            to="/"
            className="text-white text-lg font-medium px-3 py-2 rounded transition duration-300 hover:bg-white/20"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-lg font-medium px-3 py-2 rounded transition duration-300 hover:bg-white/20"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
