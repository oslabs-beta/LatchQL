import React from "react";
import "../styles/metrics.css";

function Metrics() {
  return (
    <div className="metrics">
      <div className="metric">
        <span className="metric-span">Response Time:</span>
      </div>
      <div className="metric">
        <span className="metric-span">CPU Usage:</span>
      </div>
    </div>
  );
}

export default Metrics;
