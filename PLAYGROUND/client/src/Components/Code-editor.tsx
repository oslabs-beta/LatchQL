import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import React, { useRef } from "react";
import "../styles/codeblock.css";
// import prettier from 'prettier';
// import parser from 'prettier/parser-babel'
// import { useRef } from 'react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  // Get called when editor first displayed on screen, get the value from the code editor
  const onEditorDidMount: EditorDidMount = (getValue, MonacoEditor) => {
    editorRef.current = MonacoEditor;
    MonacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    // tab spaces
    MonacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  // const onFormatClick = () => {
  //     //get current value from editor
  //     //format that value
  //     //set the formatted value back in the editor
  //     const unformatted = editorRef.current.getModel().getValue();
  // 	const formatted = prettier
  // 		.format(unformatted, {
  // 			parser: 'babel',
  // 			plugins: [parser],
  // 			useTabs: false,
  // 			semi: true,
  // 			singleQuote: true,
  // 		})
  // 		.replace(/\n$/, '');

  // 	editorRef.current.setValue(formatted);
  // }

  return (
    <div className="codeblock">
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="360px"
        language="graphql"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          // lineHeight: 35,
        }}
      />
    </div>
  );
};

export default CodeEditor;
