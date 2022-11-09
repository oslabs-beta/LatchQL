import React from "react";
import Metrics from "./Metrics";
import ResponseBody from "./ResponseBody";
import "../styles/response.css";

type ResponseProps = {
  response: string;
  cpuUsage: number;
  resTime: number;
};

function Response(props: ResponseProps) {
  return (
    <div className="response">
      <span>Response</span>
      <ResponseBody response={props.response} />
      <Metrics cpuUsage={props.cpuUsage} resTime={props.resTime} />
    </div>
  );
}

export default Response;
