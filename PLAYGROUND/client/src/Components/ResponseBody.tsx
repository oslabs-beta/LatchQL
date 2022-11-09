import React from "react";
import Editor from "@monaco-editor/react";

type ResponseBodyProps = {
  response: string;
};

function ResponseBody(props: ResponseBodyProps) {
  return (
    <div>
      <Editor
        value={props.response}
        height="430px"
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

export default ResponseBody;
