import React from 'react';
import RouteLayout from '../components/route-layout';
import { ScalprumComponent } from '@scalprum/react-core';

const code = `
/**
 * {
 *   "remoteModule": {
 *     "name": "remoteModule",
 *     "manifestLocation": "http://localhost:8003/plugin-manifest.json"
 *   }
 * } 
 */

/***********************************/

const Root = () => {
  const [internalCounter, setInternalCounter] = React.useState(0);
  return (
    <ScalprumProvider
      api={{
        user: {
          name: 'John Doe',
        },
        increment: () => {
          setInternalCounter(prev => prev + 1);
        },
        internalCounter,
      }}
    >
      {children}
    </ScalprumProvider>
  )
}

/***********************************/

<ScalprumComponent scope="remoteModule" module="RemoteUsingScalprumApi" />

/***********************************/

import React from 'react';
import { useScalprum } from '@scalprum/react-core';

const RemoteUsingScalprumApi = () => {
  const scalprumApi = useScalprum();
  const { api } = scalprumApi;
  return (
    <div>
      <div>Remote component using scalprum API</div>
      <div>
        <button onClick={api.increment}>Increment</button>
      </div>
      <div>
        <span>Internal counter: {api.internalCounter}</span>
      </div>
      <hr />
      <pre>{JSON.stringify(scalprumApi, null, 2)}</pre>
    </div>
  );
};

export default RemoteUsingScalprumApi;
`;

const ScalprumApi = () => {
  return (
    <RouteLayout code={code}>
      <ScalprumComponent scope="remoteModule" module="RemoteUsingScalprumApi" />
    </RouteLayout>
  );
};

export default ScalprumApi;
