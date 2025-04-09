import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null); // Add a ref for the hamburger button

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the menu and not on the hamburger button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-headerBg py-4 shadow-lg flex justify-center dark:bg-headerBgDark">
      <div className="flex justify-between items-center w-11/12 max-w-5xl">

        {/* Logo and Title */}
        <div className="flex items-center">

        {/* If logo/title is clicked, go to the start menu */}
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        >

          <img
            src="/images/logo.png"
            alt="Chesapeake Conservancy Logo"
            className="h-12 mr-3"
          />
          <h1 className="text-white text-4xl font-bold">
            Pennsylvania Native Tree Selector
          </h1>
        </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          ref={buttonRef} // Attach the ref to the button
          className="text-white text-3xl focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links (hidden by default, shown when menu is open) */}
        <nav
          ref={menuRef}
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transform transition-transform duration-300 ease-in-out fixed top-0 right-0 h-full w-64 bg-headerBg p-5 z-50 dark:bg-headerBgDark`}
        >
          <Link
            to="/"
            className="text-white text-lg font-medium px-3 py-2 rounded transition duration-300 hover:bg-white/20 block mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-lg font-medium px-3 py-2 rounded transition duration-300 hover:bg-white/20 block mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/GoOffline"
            className="text-white text-lg font-medium px-3 py-2 rounded transition duration-300 hover:bg-white/20 block mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Go Offline
          </Link>
          <Link
            to="/sources"
            className="text-white text-lg font-medium px-3 py-2 rounded transition duration-300 hover:bg-white/20 block mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Sources
          </Link>

          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Header;
