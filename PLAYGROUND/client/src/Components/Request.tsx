import React, { useState } from "react";
import "../styles/req.css";
import CodeEditor from "./Code-editor";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

type RequestProps = {
  queryHandler: (query: string) => string;
  sendQuery: () => void;
  variableHandler: (vars: string) => void;
  previewsHandler: () => void;
  depthPreview: number;
  costPreview: number;
};

function Request(props: RequestProps) {
  const onVarsChange = (
    value?: any,
    ev?: editor.IModelContentChangedEvent
  ): any => {
    props.variableHandler(value);
  };

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
      <CodeEditor queryHandler={props.queryHandler} />
      <div className="previews">
        <div className="previews-dc">
          <span>Current Depth: {props.depthPreview}</span>
          <span>Current Cost: {props.costPreview}</span>
        </div>
        <div className="previews-btn">
          <button id="previews-btn" onClick={() => props.previewsHandler()}>Preview</button>
        </div>
      </div>

      <span>Variables</span>
      <Editor
        className="variables-input"
        onChange={onVarsChange}
        value=""
        height="160px"
        language="json"
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
