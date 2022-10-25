import React, { useState } from "react";
import Limiters from "./Limiters";
import Request from "./Request";
import "../styles/query.css";

type QueryProps = {
  queryHandler: () => void
}

function Query() {
  return (
    <div className="query">
      <Limiters />
      <Request />
    </div>
  );
}

export default Query;
