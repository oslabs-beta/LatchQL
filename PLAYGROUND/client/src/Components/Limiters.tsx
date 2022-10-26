import React from "react";
import "../styles/limiters.css";
import { LimitsObj } from "./Mainframe";

type LimitersProps = {
  limits: LimitsObj;
};

function Limiters(props: LimitersProps) {
  return (
    <div className="limiters">
      <div className="limiter">
        <span>Depth Limit: {props.limits.depthLimit}</span>
      </div>
      <div className="limiter">
        <span>Cost Limit: {props.limits.costLimit}</span>
      </div>
      <div className="limiter">
        <span>Rate Limit: {props.limits.rateLimit}</span>
      </div>
    </div>
  );
}

export default Limiters;
