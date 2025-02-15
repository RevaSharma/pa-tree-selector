import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GettingStarted() {
  const [zip, setZip] = useState("");
  const navigate = useNavigate();

  return (
    <section id="getting-started" className="hideable crumb-page">
      <button
        id="start-button"
        onClick={() => navigate("/getting-started", { state: { zip } })}
      >
        Get Started
      </button>
    </section>
  );
}

export default GettingStarted;
