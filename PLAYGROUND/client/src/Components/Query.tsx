import React, { useState } from "react";
import Limiters from "./Limiters";
import Request from "./Request";
import "../styles/query.css";
import { LimitsObj } from "./Mainframe";

type QueryProps = {
  queryHandler: (query: string) => void;
  limits: LimitsObj;
  sendQuery: () => void;
};

function Query(props: QueryProps) {
  return (
    <div className="query">
      <Limiters limits={props.limits} />
      <Request queryHandler={props.queryHandler} sendQuery={props.sendQuery} />
    </div>
  );
}

export default Query;
