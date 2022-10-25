import React from "react";
import "../styles/limiters.css";

function Limiters() {
  return (
    <div className="limiters">
      <div className="limiter">
        <span>Depth Limit: </span>
      </div>
      <div className="limiter">
        <span>Cost Limit: </span>
      </div>
      <div className="limiter">
        <span>Rate Limit: </span>
      </div>
    </div>
  );
}

export default Limiters;
