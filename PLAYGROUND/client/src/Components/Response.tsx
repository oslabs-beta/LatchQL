import React from "react";
import Metrics from "./Metrics";
import ResponseBody from "./ResponseBody";
import "../styles/response.css";

function Response() {
  return (
    <div className="response">
      <ResponseBody />
      <Metrics />
    </div>
  );
}

export default Response;
