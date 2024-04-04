import React, { ComponentType, useEffect, useState } from 'react';
import { useScalprum } from '@scalprum/react-core';
import { Extension, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import RouteLayout from '../components/route-layout';

const code = ``;

type TabExtension = Extension<
  'custom.tabs',
  {
    tabs: () => Promise<ComponentType>;
  }
>;

function isWorkspaceExtension(e: Extension): e is TabExtension {
  return !!(e.type === 'custom.tabs' && e.properties.tabs);
}

const TabsWrapper = () => {
  const [extensions, resolved] = useResolvedExtensions(isWorkspaceExtension);
  const tabPanels = resolved
    ? extensions.map((e, i) => {
        const T = e.properties.tabs;
        return (
          <TabPanel key={i}>
            <T />
          </TabPanel>
        );
      })
    : [];

  const tabs = resolved
    ? extensions.map((e, i) => {
        return <Tab key={i}>{e.pluginName}</Tab>;
      })
    : [];
  return (
    <Box>
      <p>The order depends on the extension loading order</p>
      <Tabs>
        <TabList>{tabs}</TabList>
        <TabPanels>{tabPanels}</TabPanels>
      </Tabs>
    </Box>
  );
};

const Extensions = () => {
  const [loaded, setLoaded] = useState(false);
  const scalprum = useScalprum();

  useEffect(() => {
    Promise.all([
      scalprum.pluginStore.loadPlugin(scalprum.config['remoteModule'].manifestLocation!),
      scalprum.pluginStore.loadPlugin(scalprum.config['plugin-with-tab-1'].manifestLocation!),
      scalprum.pluginStore.loadPlugin(scalprum.config['plugin-with-tab-2'].manifestLocation!),
    ]).then(() => {
      console.log(scalprum.pluginStore);
      setLoaded(true);
    });
  }, []);
  // scalprum.pluginStore.loadPlugin(scalprum.config.extensions);
  return <RouteLayout code={code}>{loaded ? <TabsWrapper /> : 'Loading...'}</RouteLayout>;
};

export default Extensions;
