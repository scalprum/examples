import React, { useEffect } from 'react';
import { AppsConfig } from '@scalprum/core';
import { ScalprumProvider } from '@scalprum/react-core';
import { getScalprumConfig } from './server';
import { Progress } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import BasicModule from './routes/basic-module';
import SampleConfiguration from './routes/sample-configuration';
import ScalprumApi from './routes/scalprum-api';
import TabsExtensions from './routes/tabs-extensions';
import FetchExtensions from './routes/fetch-extensions';
import PreloadModule from './routes/preload-module';

const useScalprumConfig = () => {
  const [config, setConfig] = React.useState<AppsConfig | undefined>(undefined);
  useEffect(() => {
    getScalprumConfig().then((data) => {
      setConfig(data);
    });
  }, []);
  return config;
};

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const ScalprumRoot = () => {
  const [internalCounter, setInternalCounter] = React.useState(0);
  const config = useScalprumConfig();
  if (!config) return <Progress size="xs" isIndeterminate />;
  return (
    <ScalprumProvider
      api={{
        user: {
          name: 'John Doe',
        },
        increment: () => {
          setInternalCounter(internalCounter + 1);
        },
        internalCounter,
      }}
      config={config}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample-config" element={<SampleConfiguration />} />
        <Route path="/basic-module" element={<BasicModule />} />
        <Route path="/scalprum-api" element={<ScalprumApi />} />
        <Route path="/tabs-extensions" element={<TabsExtensions />} />
        <Route path="/fetch-extensions" element={<FetchExtensions />} />
        <Route path="/preload" element={<PreloadModule />} />
      </Routes>
    </ScalprumProvider>
  );
};

export default ScalprumRoot;
