import React from 'react';
import { useScalprum } from '@scalprum/react-core';

const RemoteUsingScalprumApi = () => {
  const scalprumApi = useScalprum<{ api: { user: { name: string }; internalCounter: number; increment: () => void } }>();
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
