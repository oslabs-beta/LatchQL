import React from "react";
import Mainframe from "./Components/Mainframe";
import logo from "./assets/finallogo.png";
import "./styles/app.css";

function App() {
  return (
    <div className="app">
      <div className="glow"></div>
      <div className="top">
        <img id="logo" src={logo} />
        <span>Playground</span>
      </div>
      <Mainframe />
    </div>
  );
}

export default App;
