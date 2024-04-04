import React from 'react';
import { createRoot } from 'react-dom/client';
import ScalprumRoot from './ScalprumRoot';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout';

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Layout>
          <ScalprumRoot />
        </Layout>
      </ChakraProvider>
    </BrowserRouter>
  );
};

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
