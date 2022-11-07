import React from "react";
import Limiters from "./Limiters";
import Request from "./Request";
import "../styles/query.css";
import { LimitsObj } from "./Mainframe";

type QueryProps = {
  queryHandler: (query: string) => string;
  variableHandler: (vars: string) => void;
  displayLimits: (authLvl: string) => void;
  sendQuery: () => void;
  previewsHandler: () => void;
  allPresets: string[];
  limits: LimitsObj;
  depthPreview: number;
  costPreview: number;
};

function Query(props: QueryProps) {
  return (
    <div className="query">
      <Limiters
        limits={props.limits}
        displayLimits={props.displayLimits}
        allPresets={props.allPresets}
      />
      <Request
        queryHandler={props.queryHandler}
        sendQuery={props.sendQuery}
        variableHandler={props.variableHandler}
        previewsHandler={props.previewsHandler}
        depthPreview={props.depthPreview}
        costPreview={props.costPreview}
      />
    </div>
  );
}

export default Query;
