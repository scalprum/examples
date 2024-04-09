import React, { useEffect, useMemo } from 'react';
import RouteLayout from '../components/route-layout';
import { ScalprumComponent } from '@scalprum/react-core';
import { Box } from '@chakra-ui/react';

const code = `
// component definition

import { usePrefetch } from '@scalprum/react-core';
import React from 'react';

const response = {
  data: 'Prefetched data',
};

// named export "prefetch" is picked up automatically
export const prefetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
      // deliberately slow response
    }, 5000);
  });
};

const ComponentWithPrefetch = () => {
  const { error, data, ready } = usePrefetch();
  if (error) {
    return <div>Error: {\`\${error}\`}</div>;
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Prefetched data: {data.data}</h2>
    </div>
  );
};

export default ComponentWithPrefetch;

/********************************************/

// webpack.config.js

const dynamicPlugin = new DynamicRemotePlugin({
  pluginMetadata: {
    exposedModules: {
      // expose the component with prefetch as usual
      ComponentWithPrefetch: './src/ComponentWithPrefetch.tsx',
    },
  },
  // rest of config
});

/********************************************/

// in component its business as usual

const Component = () => {
  return <ScalprumComponent scope="remoteModule" module="ComponentWithPrefetch" />
}
`;

const PrefetchData = () => {
  const [counter, setCounter] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const nodes = useMemo(() => {
    const nodes = [];
    for (let index = 0; index < counter; index++) {
      nodes.push(<ScalprumComponent key={index} scope="remoteModule" module="ComponentWithPrefetch" />);
    }

    return nodes;
  }, [counter]);
  return (
    <RouteLayout editorProps={{ height: 800 }} code={code}>
      <Box>
        <ScalprumComponent scope="remoteModule" module="ComponentWithPrefetch" />
        {nodes}
      </Box>
    </RouteLayout>
  );
};

export default PrefetchData;
