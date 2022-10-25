import React from "react";
import "../styles/mainframe.css";
import Query from "./Query";
import Response from "./Response";

function Mainframe() {
  return (
    <div className="main">
      <div>
        <input
          id="url"
          type="text"
          value="http://localhost:3000/latchql"
          readOnly={true}
        />
      </div>
      <div className="mainframe">
        <Query />
        <Response />
      </div>
    </div>
  );
}

export default Mainframe;
