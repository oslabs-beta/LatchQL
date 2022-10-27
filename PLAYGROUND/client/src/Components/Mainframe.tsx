import React, { useEffect, useState } from "react";
import "../styles/mainframe.css";
import Query from "./Query";
import Response from "./Response";

export type LimitsObj = {
  depthLimit: number;
  costLimit: number;
  rateLimit: number;
};

// export type ResponseType = {
//   [data: string] : Array<>
// }

function Mainframe() {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [authorizationLevel, setAuthorizationLevel] =
    useState<string>("Non-User");
  const [limits, setLimits] = useState<LimitsObj>({
    depthLimit: 0,
    costLimit: 0,
    rateLimit: 0,
  });

  const queryHandler = (query: string) => {
    setQuery(query);
  };

  const sendQuery = () => {
    console.log(query);
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `${query}`,
      }),
      headers: {
        "Content-Type": "application/json",
        gui: "Admin",
      },
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        setResponse(JSON.stringify(data, null, 4));
      })
      .catch((err) => console.log(err));
  };

  const displayLimits = (authLvl: string) => {
    setAuthorizationLevel(authLvl);
  };

  useEffect(() => {
    fetch("http://localhost:8080/latchql")
      .then((res) => res.json())
      .then((data) => {
        setLimits(data[authorizationLevel]);
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
        <Response response={response} />
      </div>
    </div>
  );
}

export default Mainframe;
