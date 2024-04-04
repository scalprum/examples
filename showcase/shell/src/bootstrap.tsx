import React from 'react';
import { createRoot } from 'react-dom/client';
import ScalprumRoot from './ScalprumRoot';

const App = () => {
  return <ScalprumRoot />;
};

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
