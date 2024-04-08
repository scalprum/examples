import React, { ComponentType, useEffect, useState } from 'react';
import { useScalprum } from '@scalprum/react-core';
import { Extension, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import RouteLayout from '../components/route-layout';

const code = ``;

type TabExtension = Extension<
  'custom.tabs',
  {
    tabs: () => Promise<ComponentType>;
  }
>;

function isTabExtension(e: Extension): e is TabExtension {
  return !!(e.type === 'custom.tabs' && e.properties.tabs);
}

const TabsWrapper = () => {
  const scalprum = useScalprum();
  const [allExtensions] = useResolvedExtensions();
  const [tabsExtensions, tabsResolved] = useResolvedExtensions(isTabExtension);
  const tabPanels = tabsResolved
    ? tabsExtensions.map((e, i) => {
        const T = e.properties.tabs;
        return (
          <TabPanel key={i}>
            <T />
          </TabPanel>
        );
      })
    : [];

  const tabs = tabsResolved
    ? tabsExtensions.map((e, i) => {
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
      <hr />
      <Button
        onClick={() => {
          scalprum.pluginStore.setFeatureFlags({ REMOTE_TAB_FLAG: !scalprum.pluginStore.getFeatureFlags()['REMOTE_TAB_FLAG'] });
        }}
      >
        Enable remote tab flag
      </Button>
      <hr />
      <p>Typeguards are used to select specific extension types</p>
      <Box>
        <h2>All</h2>
        <pre>
          <code>{JSON.stringify(allExtensions, null, 2)}</code>
        </pre>
        <h2>Tabs</h2>
        <pre>
          <code>{JSON.stringify(tabsExtensions, null, 2)}</code>
        </pre>
      </Box>
    </Box>
  );
};

const TabsExtensions = () => {
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
  return <RouteLayout code={code}>{loaded ? <TabsWrapper /> : 'Loading...'}</RouteLayout>;
};

export default TabsExtensions;
