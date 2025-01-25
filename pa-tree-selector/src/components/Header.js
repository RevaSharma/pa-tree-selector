import React from 'react';

function Header() {
    return (
        <header>
            <img
                src="/images/logo.png"
                alt="Logo of the Chesapeake Conservancy."
                className="logo"
            />
            <h1>PA Tree Selector Tool</h1>
        </header>
    );
}

export default Header;