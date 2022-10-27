import React from "react";
import "../styles/limiters.css";
import { LimitsObj, AuthorizationType } from "./Mainframe";
import PresetDropdown from "./PresetDropdown";

//  {Admin: { d:, c:, r:},
//   User: {d:, c:, r:} }

type LimitersProps = {
  limits: AuthorizationType;
  displayLimits: (authLvl: string) => void;
};

function Limiters(props: LimitersProps) {
  // console.log(props.limits.Admin.depthLimit);
  return (
    <div className="limiters">
      <PresetDropdown displayLimits={props.displayLimits} />
      <div className="limiter">
        <span>Depth Limit: {0}</span>
      </div>
      <div className="limiter">
        <span>Cost Limit: {0}</span>
      </div>
      <div className="limiter">
        <span>Rate Limit: {0}</span>
      </div>
    </div>
  );
}

export default Limiters;
