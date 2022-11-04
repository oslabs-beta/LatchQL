import React, { useEffect, useState } from "react";
import "../styles/mainframe.css";
import Query from "./Query";
import Response from "./Response";

export type LimitsObj = {
  depthLimit: number;
  costLimit: number;
  rateLimit: number;
};

export type PresetType = {
  [key: string]: [value: LimitsObj];
};

function Mainframe() {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [variables, setVariables] = useState("");
  const [depthPreview, setDepthPreview] = useState<number>(0);
  const [costPreview, setCostPreview] = useState<number>(0);
  const [authorizationLevel, setAuthorizationLevel] =
    useState<string>("Non-User");
  const [limits, setLimits] = useState<LimitsObj>({
    depthLimit: 0,
    costLimit: 0,
    rateLimit: 0,
  });
  const [resTime, setResTime] = useState(0);
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [allPresets, setAllPresets] = useState<string[]>([]);

  const queryHandler = (query: string) => {
    setQuery(query);
    return query;
  };

  const sendQuery = () => {
    fetch("http://localhost:2222/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `${query}`,
        variables: JSON.stringify({ variables }),
      }),
      headers: {
        "Content-Type": "application/json",
        gui: authorizationLevel,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("data from frontend", data);
        setResponse(JSON.stringify(data, null, 4));
        getMetrics();
      })
      .catch((err) => console.log(err));
  };

  const displayLimits = (authLvl: string) => {
    setAuthorizationLevel(authLvl);
  };

  const getMetrics = () => {
    fetch("http://localhost:2222/metrics")
      .then((res) => res.json())
      .then((data) => {
        setCpuUsage(data[0].toFixed(2));
        setResTime(data[1]);
      })
      .catch((err) => console.log(err));
  };

  const variableHandler = (vars: string) => {
    setVariables(vars);
  };

  const previewsHandler = () => {
    console.log("queryPreview:", query);
    fetch("http://localhost:2222/previews", {
      method: "POST",
      body: JSON.stringify({
        queryPreview: `${query}`,
        maxDepth: limits.depthLimit,
        maxCost: limits.costLimit,
      }),
      headers: {
        "Content-Type": "application/json",
        gui: authorizationLevel,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCostPreview(data[1].costSum);
        setDepthPreview(data[0].depth);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("http://localhost:2222/latchql")
      .then((res) => res.json())
      .then((data) => {
        setLimits(data[authorizationLevel]);
        const presetsArr = [];
        for (const key in data) {
          presetsArr.push(key);
        }
        setAllPresets(presetsArr);
      })
      .catch((err) => console.log(err));
  }, [authorizationLevel]);

  return (
    <div className="main">
      <div className="url-div">
        <input
          id="url"
          type="text"
          value="http://localhost:8080/latchql"
          readOnly={true}
        />
      </div>
      <div className="mainframe">
        <Query
          allPresets={allPresets}
          limits={limits}
          queryHandler={queryHandler}
          variableHandler={variableHandler}
          sendQuery={sendQuery}
          displayLimits={displayLimits}
          previewsHandler={previewsHandler}
          depthPreview={depthPreview}
          costPreview={costPreview}
        />
        <Response response={response} cpuUsage={cpuUsage} resTime={resTime} />
      </div>
    </div>
  );
}

export default Mainframe;
