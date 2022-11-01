import React, { useState, MouseEvent, useEffect } from "react";
import dropdown from "../assets/dropdown.png";
import "../styles/presetdropdown.css";
import { LimitsObj, PresetType } from "./Mainframe";

type PresetDropdownProps = {
  displayLimits: (authLvl: string) => void;
  allPresets: string[];
};

function PresetDropdown(props: PresetDropdownProps) {
  const [preset, togglePreset] = useState<boolean>(false);
  const [authLevel, setAuthLevel] = useState<string>("Non-User");

  const authLevelHandler = (authoLevel: string) => {
    setAuthLevel(authoLevel);
    props.displayLimits(authoLevel);
  };

  return (
    <div className="auth" onClick={() => togglePreset(!preset)}>
      <span id="level">{authLevel}</span>
      <img id="dropdown" src={dropdown} />
      {preset ? (
        <div className="dd-menu">
          <ul className="dd-ul">
            {/* <li onClick={() => authLevelHandler("Non-User")}>Non-User Level</li>
            <li onClick={() => authLevelHandler("Admin")}>Admin Level</li>
            <li onClick={() => authLevelHandler("Gary")}>Gary Level</li> */}
            {props.allPresets.map((auth) => (
              <li onClick={() => authLevelHandler(auth)}>{auth} Level</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* <div> */}
      {/* <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => authLevelHandler(e.target.value)}
        className="auth" >
        <option selected disabled>
        authLevel
        </option>
        <option value="user">
          User Level
        </option>
        <option
          value="admin">
          Admin Level
        </option>
        </select > */}
    </div>
  );
}

export default PresetDropdown;
