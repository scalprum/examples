import React from 'react';
import { createRoot } from 'react-dom/client';
import ScalprumRoot from './ScalprumRoot';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <ScalprumRoot />
      </ChakraProvider>
    </BrowserRouter>
  );
};

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
