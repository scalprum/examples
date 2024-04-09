import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

const ExampleEditor = (props: EditorProps) => {
  return <Editor height={'100%'} language="javascript" {...props} theme="vs-dark" />;
};

export default ExampleEditor;
