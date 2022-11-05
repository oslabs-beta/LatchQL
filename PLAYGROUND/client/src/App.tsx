import React from "react";
import Mainframe from "./Components/Mainframe";
import logo from "./assets/finallogo.png";
import "./styles/app.css";

function App() {
  return (
    <div className="app">
      <div className="top">
        <img id="logo" src={logo} />
        <span id="header">Playground</span>
      </div>
      <Mainframe />
    </div>
  );
}

export default App;
