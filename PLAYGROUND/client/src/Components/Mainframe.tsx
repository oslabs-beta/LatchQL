import React, { useState } from "react";
import "../styles/mainframe.css";
import Query from "./Query";
import Response from "./Response";

type queryHandler = {
  queryHandler: () => void;
};

function Mainframe() {
  const [query, setQuery] = useState("");

  const queryHandler = (query: string): void => {
    setQuery(query);
  };

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
        <button id="run-btn">Run Query</button>
        <Response />
      </div>
    </div>
  );
}

export default Mainframe;
