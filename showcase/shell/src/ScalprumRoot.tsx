import React from 'react';
import { AppsConfig } from '@scalprum/core';
import { ScalprumProvider, ScalprumComponent } from '@scalprum/react-core';

const config: AppsConfig = {
  remoteModule: {
    name: 'remoteModule',
    manifestLocation: 'http://localhost:8003/plugin-manifest.json',
  },
};

const ScalprumRoot = () => {
  return (
    <div>
      <ScalprumProvider config={config}>
        <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />
      </ScalprumProvider>
    </div>
  );
};

export default ScalprumRoot;
