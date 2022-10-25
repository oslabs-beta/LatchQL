import React, { useState } from "react";
import "../styles/req.css";

function Request() {
  return (
    <div className="request">
      <span>Request Body</span>
      <textarea name="req-body" id="req-body" cols={69} rows={15}></textarea>
      <span>Variables</span>
      <textarea
        readOnly={true}
        name="req-variables"
        id="req-var"
        cols={69}
        rows={6}
      ></textarea>
    </div>
  );
}

export default Request;
