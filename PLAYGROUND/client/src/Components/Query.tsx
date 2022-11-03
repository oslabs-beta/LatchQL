import React, { useState } from "react";
import Limiters from "./Limiters";
import Request from "./Request";
import "../styles/query.css";
import { LimitsObj, PresetType } from "./Mainframe";

type QueryProps = {
  queryHandler: (query: string) => string;
  // limits: AuthorizationType;
  limits: LimitsObj;
  sendQuery: () => void;
  variableHandler: (vars: string) => void;
  displayLimits: (authLvl: string) => void;
  allPresets: string[];
};

function Query(props: QueryProps) {
  const [currDepth, setDepth] = useState<number>(0);
  const [currCost, setCost] = useState<number>(0);

  const currDepthNum = (str: string): void => {
    const storage: string[] = [];
    let depthNow: number = 0;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "{") {
        storage.push(str[i]);
      } else if (str[i] === "}") {
        if (storage[storage.length - 1] === "{") {
          depthNow = Math.max(storage.length, depthNow);
          storage.pop();
        }
      }
    }
    if (depthNow > 0) setDepth(depthNow - 1);
    else setDepth(0);
  };

  const currCostNum = (query: string): void => {
    let costSum: number = 0,
      depthLvl: number = 1;
    const split = query.split("\n");
    for (let i = 1; i < split.length - 1; i++) {
      if (split[i] === "") {
        continue;
      } else if (split[i].includes("{")) {
        depthLvl += 1;
      } else if (!split[i].includes("{") && !split[i].includes("}")) {
        if (depthLvl === 1) costSum += 1;
        else {
          costSum += 1 * depthLvl * 1.5; //depth factor = 1.5
        }
      } else if (split[i].includes("}")) {
        depthLvl -= 1;
      }
    }
    setCost(costSum);
  };

  return (
    <div className="query">
      <Limiters
        limits={props.limits}
        displayLimits={props.displayLimits}
        allPresets={props.allPresets}
      />
      <Request
        currCostNum={currCostNum}
        currCost={currCost}
        currDepthNum={currDepthNum}
        currDepth={currDepth}
        queryHandler={props.queryHandler}
        sendQuery={props.sendQuery}
        variableHandler={props.variableHandler}
      />
    </div>
  );
}

export default Query;
