import React from "react";
import Limiters from "./Limiters";
import Request from "./Request";
import "../styles/query.css";

function Query() {
  return (
    <div className="query">
      <Limiters />
      <Request />
    </div>
  );
}

export default Query;
