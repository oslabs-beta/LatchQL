import React, { useEffect, useState } from "react";
import "../styles/mainframe.css";
import Query from "./Query";
import Response from "./Response";

export type LimitsObj = {
  depthLimit: number;
  costLimit: number;
  rateLimit: number;
};

function Mainframe() {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [limits, setLimits] = useState<LimitsObj>({
    depthLimit: 0,
    costLimit: 0,
    rateLimit: 0,
  });

  const queryHandler = (query: string) => {
    setQuery(query);
  };

  const sendQuery = () => {
    //fetch()
    //.then(res => res.json())
    //.then()
  };

  const displayLimits = (authLvl: string) => {
    // setLimits({})
    console.log(authLvl);
  };

  useEffect(() => {
    // fetch (get) preset limits from user server
    // displayLimits({})
  }, [limits]);

  return (
    <div className="main">
      <div className="url-div">
        <input
          id="url"
          type="text"
          value="http://localhost:3000/latchql"
          readOnly={true}
        />
      </div>
      <div className="mainframe">
        <Query
          limits={limits}
          queryHandler={queryHandler}
          sendQuery={sendQuery}
          displayLimits={displayLimits}
        />
        {/* <button onClick={() => sendQuery()} id="run-btn">
          Run Query
        </button> */}
        <Response response={response} />
      </div>
    </div>
  );
}

export default Mainframe;
