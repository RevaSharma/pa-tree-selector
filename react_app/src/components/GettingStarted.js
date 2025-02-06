import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GettingStarted() {
    const [zip, setZip] = useState("");
    const navigate = useNavigate();

    return (
        <section id="getting-started" className="hideable crumb-page">
            <h2>What is the Tree Selector Tool?</h2>
            <p>
                The Pennsylvania Tree Selector Tool is a comprehensive
                Pennsylvania-specific tool that provides landowners and conservation
                planners with an easy-to-use, effective means to select native species
                to plant on projects based on variables input by the user. Data and
                selections within the tool are designed to assist seasoned
                professionals as well as those who are new to the field by cutting
                research time and increasing efficiency. The selections within the
                tool provide site-specific solutions with a wide variety of options
                and data to back it up, ensuring that the correct species are planted
                in the correct locations. The tool generates a list of species based
                on inputs and includes attributes of each species such as soil
                preferences, growth rate, shade tolerance, and much more.
            </p>

            <p>
                The Pennsylvania Tree Selector Tool is an easy-to-use tool for both
                professionals and landowners and provides data that is critical for
                decision-making in the field.
            </p>


            <h2 className="section-title">Getting Started</h2>

            <p>GUIDE ON HOW TO USE THE TOOL </p>

            <p>Enter your ZIP Code to get started.</p>

            <div className="zip-container">
                <label htmlFor="zip">Enter ZIP Code</label>
                <input
                    id="zip"
                    type="text"
                    placeholder="ZIP Code"
                    className="text-input"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                />
                <button id="start-button" onClick={() => navigate("/getting-started", { state: { zip } })}>
                    Get Started
                </button>
            </div>
        </section>
    );
}

export default GettingStarted;

