import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

const ExampleEditor = (props: EditorProps) => {
  return <Editor height={200} {...props} language="javascript" theme="vs-dark" />;
};

export default ExampleEditor;
