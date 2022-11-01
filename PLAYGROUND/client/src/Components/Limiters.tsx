import React from "react";
import "../styles/limiters.css";
import { LimitsObj, PresetType } from "./Mainframe";
import PresetDropdown from "./PresetDropdown";

type LimitersProps = {
  // limits: AuthorizationType;
  limits: LimitsObj;
  displayLimits: (authLvl: string) => void;
  allPresets: string[]
};

function Limiters(props: LimitersProps) {
  // console.log(props.limits.Admin.depthLimit);
  return (
    <div className="limiters">
      <PresetDropdown
        displayLimits={props.displayLimits}
        allPresets={props.allPresets}
      />
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
