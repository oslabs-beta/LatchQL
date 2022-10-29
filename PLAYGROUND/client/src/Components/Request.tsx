import React, { useState } from "react";
import "../styles/req.css";
import CodeEditor from './Code-editor';

type RequestProps = {
  queryHandler: (query: string) => void;
  sendQuery: () => void;
};

function Request(props: RequestProps) {
  return (
    <div className="request">
      <div className="jj">
        <span>Request Body</span>
        <button
          onClick={() => props.sendQuery()}
          className="button"
          id="run-btn"
        >
          Run Query
        </button>
      </div>
      <CodeEditor 
      initialValue="TYPE YOUR QUERY HERE"
      onChange={(value)=>props.queryHandler(value)}
        />
      {/* <textarea
        onChange={(e) => props.queryHandler(e.target.value)}
        name="req-body"
        id="req-body"
        cols={69}
        rows={15}
      ></textarea> */}
   
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
