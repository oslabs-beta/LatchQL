import React, { useState, MouseEvent, useEffect } from "react";
import dropdown from "../assets/dropdown.png";
import "../styles/presetdropdown.css";

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
            {props.allPresets.map((auth) => (
              <li onClick={() => authLevelHandler(auth)}>{auth}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PresetDropdown;
