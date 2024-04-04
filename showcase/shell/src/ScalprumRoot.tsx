import React, { useEffect } from 'react';
import { AppsConfig } from '@scalprum/core';
import { ScalprumProvider, ScalprumComponent } from '@scalprum/react-core';
import { getScalprumConfig } from './server';

const useScalprumConfig = () => {
  const [config, setConfig] = React.useState<AppsConfig | undefined>(undefined);
  useEffect(() => {
    getScalprumConfig().then((data) => {
      setConfig(data);
    });
  }, []);
  return config;
};

const ScalprumRoot = () => {
  const config = useScalprumConfig();
  if (!config) return <div>Loading config...</div>;
  return (
    <div>
      <ScalprumProvider config={config}>
        <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />
      </ScalprumProvider>
    </div>
  );
};

export default ScalprumRoot;
