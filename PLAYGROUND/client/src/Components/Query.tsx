import React, { useState } from "react";
import Limiters from "./Limiters";
import Request from "./Request";
import "../styles/query.css";
import { LimitsObj, PresetType } from "./Mainframe";

type QueryProps = {
  queryHandler: (query: string) => string;
  limits: LimitsObj;
  sendQuery: () => void;
  variableHandler: (vars: string) => void;
  displayLimits: (authLvl: string) => void;
  allPresets: string[];
  previewsHandler: () => void;
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
