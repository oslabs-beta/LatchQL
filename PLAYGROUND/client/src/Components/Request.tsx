import React, { useState } from "react";
import "../styles/req.css";
import CodeEditor from "./Code-editor";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

type RequestProps = {
  queryHandler: (query: string) => string;
  sendQuery: () => void;
  currDepth: number;
  currDepthNum: (str: string) => void;
  currCost: number;
  currCostNum: (str: string) => void;
};

function Request(props: RequestProps) {

  function twoCalls(value: string){
    props.currDepthNum(props.queryHandler(value));
    props.currCostNum(props.queryHandler(value));
  }

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
        initialValue=""
        onChange={(value) => twoCalls(value)}
      />
      <div className="currDepth">
        Current Depth: {props.currDepth}
      </div>
      <div className="currCost">
        Current Cost: {props.currCost}
      </div>

      <span>Variables</span>
      <MonacoEditor
        value=""
        height="160px"
        language="graphql"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default Request;
