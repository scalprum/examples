
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div>I am an app!</div>
  )
}

const domNode = document.getElementById('root');
if(domNode) {
  const root = createRoot(domNode);
  root.render(<App />)
}
