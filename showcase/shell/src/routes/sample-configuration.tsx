import React from 'react';
import RouteLayout from '../components/route-layout';

const config = {
  remoteModule: {
    name: 'remoteModule',
    manifestLocation: 'http://localhost:8003/plugin-manifest.json',
  },
  pluginB: {
    name: 'pluginB',
    manifestLocation: '/plugin-b/plugin-manifest.json',
  },
  pluginC: {
    name: 'pluginC',
    manifestLocation: '/plugin-c/plugin-manifest.json',
  },
};

const code = `
import { ScalprumProvider } from '@scalprum/react-core';

const config = ${JSON.stringify(config, null, 2)};

const ScalprumRoot = () => {
  return (
    <ScalprumProvider config={config}>
      <div>{/** children */}</div>
    </ScalprumProvider>
  );
}

export default ScalprumRoot;

`;

const SampleConfiguration = () => {
  return <RouteLayout editorProps={{ height: 600 }} code={code} />;
};

export default SampleConfiguration;
