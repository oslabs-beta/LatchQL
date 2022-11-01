import React from "react";
import MonacoEditor from "@monaco-editor/react";

type ResponseBodyProps = {
  response: string;
};

function ResponseBody(props: ResponseBodyProps) {
  return (
    <div>
      <MonacoEditor
        value={props.response}
        height="500px"
        language="graphql"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 15,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: true,
        }}
      />
    </div>
  );
}

export default ResponseBody;
