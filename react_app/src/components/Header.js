import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Chesapeake Conservancy Logo" className="logo" />
          <h1 className="title">PA Tree Selector Tool</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          {/* <Link to="/getting-started" className="nav-link">Getting Started</Link> */}
          {/* <Link to="/results" className="nav-link">Results</Link> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;

