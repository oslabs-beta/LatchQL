import React, { useEffect, useState } from "react";
import "../styles/mainframe.css";
import Query from "./Query";
import Response from "./Response";

// interface AuthType {
//   [key: string] : LimitsObj
// }

export type AuthorizationType = {
  [key: string]: LimitsObj;
};

export type LimitsObj = {
  depthLimit: number;
  costLimit: number;
  rateLimit: number;
};

function Mainframe() {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [authorizationLevel, setAuthorizationLevel] =
    useState<string>("Non-User");
  const [limits, setLimits] = useState<AuthorizationType>({
    authorizationLevel: {
      depthLimit: 0,
      costLimit: 0,
      rateLimit: 0,
    },
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
    console.log("in displayLimits", authLvl);
    setAuthorizationLevel(authLvl);
  };

  useEffect(() => {
    fetch("http://localhost:8080/latchql")
      .then((res) => res.json())
      .then((data) => {
        console.log("in fetch", data);
        const targetPreset = {};
        for (let key in data) {
          if (key === authorizationLevel) {
            targetPreset[key] = data[key]
          }
        }
        console.log(targetPreset);
        // setLimits(targetPreset);
      })
      .catch((err) => console.log(err));
  }, [authorizationLevel]);

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
