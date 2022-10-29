import React, { useState, MouseEvent } from "react";
import dropdown from "../assets/dropdown.png";
import "../styles/presetdropdown.css";

type PresetDropdownProps = {
  displayLimits: (authLvl: string) => void;
};

function PresetDropdown(props: PresetDropdownProps) {
  const [preset, togglePreset] = useState(false);
  const [authLevel, setAuthLevel] = useState("Non-User");

  const authLevelHandler = (authoLevel: string) => {
    setAuthLevel(authoLevel);
    props.displayLimits(authoLevel);
  };

  return (
    <div className="auth" onClick={() => togglePreset(!preset)}>
      <span>{authLevel}</span>
      <img id="dropdown" src={dropdown} />
      {preset ? (
        <div className="dd-menu">
          <ul>
            <li onClick={() => authLevelHandler("Non-User")}>Non-User Level</li>
            <li onClick={() => authLevelHandler("Admin")}>Admin Level</li>
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* <select onChange={(e: Mouse...) => props.displayLimits(e.target.value)}
        className="dropdown">
        <option value="user">
          User Level
        </option>
        <option
          value="admin">
          Admin Level
        </option> */}
    </div>
  );
}

export default PresetDropdown;
