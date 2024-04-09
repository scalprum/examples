import React, { ComponentType, useEffect, useState } from 'react';
import { useScalprum } from '@scalprum/react-core';
import { Extension, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import RouteLayout from '../components/route-layout';

const code = `
// src/TabsExtension.tsx
import React from 'react';

export const Tab = () => {
  return (
    <div>
      <p>
        A tab defined in scope of <strong>Plugin with tab 1</strong>
      </p>
    </div>
  );
};

/***********************************/
// webpack.config.js

// extension config
const tabExtension = [
  {
    type: 'custom.tabs',
    properties: {
      tabs: {
        // "TabsExtension" is exposed module (key) from exposedModules
        // and ".Tab" is the named export from the module
        $codeRef: 'TabsExtension.Tab',
      },
    },
  },
  // multiple extensions can be defined
];

const dynamicPlugin = new DynamicRemotePlugin({
  extensions: tabExtension,
  pluginMetadata: {
    exposedModules: {
      // reference to the source file with the extension
      TabsExtension: './src/TabsExtension.tsx',
    },
  },
  // rest of the config
});

/***********************************/


// getting specific extension type from all resolved extensions

import { Extension, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';

type TabExtension = Extension<
  'custom.tabs',
  {
    tabs: () => Promise<ComponentType>;
  }
>;

// regular TS typeguard can be used to filter out specific extension types
function isTabExtension(e: Extension): e is TabExtension {
  return !!(e.type === 'custom.tabs' && e.properties.tabs);
}

const TabsWrapper = () => {
  // tabsExtensions is array of extensions of specific type based on the argument passed
  const [tabsExtensions, tabsResolved] = useResolvedExtensions(isTabExtension);
  
  // or all resolved extensions can be used if the argument is empty
  const [tabsExtensions, tabsResolved] = useResolvedExtensions();

  // get the required component from the resolved extensions
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

  return (

  )
}

/***********************************/

// extension toggling, build in feature flag like support

// The "remotePlugin" custom.tab extension depends on feature flag "REMOTE_TAB_FLAG" to be enabled.

scalprum.pluginStore.setFeatureFlags({ REMOTE_TAB_FLAG: true });



`;

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
