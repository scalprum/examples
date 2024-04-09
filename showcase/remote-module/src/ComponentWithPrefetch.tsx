import { usePrefetch } from '@scalprum/react-core';
import React from 'react';

const response = {
  data: 'Prefetched data',
};

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
    return <div>Error: {`${error}`}</div>;
  }

  if (!ready) {
    return <div>Loading data from prefetch...</div>;
  }

  return (
    <div>
      <h2>Prefetched data: {data.data}</h2>
    </div>
  );
};

export default ComponentWithPrefetch;
