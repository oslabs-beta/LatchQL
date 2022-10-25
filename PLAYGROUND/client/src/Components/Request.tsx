import React from "react";
import "../styles/req.css";

function Request() {
  return (
    <div className="request">
      <span>Request Body</span>
      <textarea name="req-body" id="req-body" cols={73} rows={23}></textarea>
      <span>Variables</span>
      <textarea
        readOnly={true}
        name="req-variables"
        id="req-var"
        cols={73}
        rows={6}
      ></textarea>
    </div>
  );
}

export default Request;
