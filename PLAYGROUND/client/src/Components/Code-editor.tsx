import Editor from "@monaco-editor/react";
import React, { useRef } from "react";
import "../styles/codeblock.css";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

type CodeEditorProps = {
  queryHandler: (query: string) => void;
};

function CodeEditor(props: CodeEditorProps) {
  const editorRef: React.MutableRefObject<null> = useRef(null);

  const onEditorChange = (
    value?: any,
    ev?: editor.IModelContentChangedEvent
  ): any => {
    props.queryHandler(value);
  };

  return (
    <div id="query-field">
      <Editor
        className="query-field"
        onChange={onEditorChange}
        height="300px"
        defaultLanguage="graphql"
        defaultValue=""
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          formatOnType: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
