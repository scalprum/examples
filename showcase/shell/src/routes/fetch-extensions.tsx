import React, { useEffect, useState } from 'react';
import { useScalprum } from '@scalprum/react-core';
import { Extension, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';
import { Button, Box } from '@chakra-ui/react';
import RouteLayout from '../components/route-layout';

const code = `
// src/fetchDogDataExtension.ts

export const fetchRandomDog = () => {
  return fetch('https://dog.ceo/api/breeds/image/random').then((r) => r.json());
};

export const fetchRandomDogWithBreed = (breed = 'australian-shepherd') => {
  return fetch(\`https://dog.ceo/api/breed/\${breed}/images/random\`).then((r) => r.json());
};

// webpack.config.js

/** @type { import("@openshift/dynamic-plugin-sdk-webpack").Extension[] } */
const extensions = [
  {
    type: 'custom.tabs',
    properties: {
      tabs: {
        $codeRef: 'TabsExtension.Tab',
      },
    },
    flags: {
      required: ['REMOTE_TAB_FLAG'],
    },
  },
  {
    type: 'custom.dogs',
    properties: {
      fetchRandomDog: {
        $codeRef: 'DogsExtension.fetchRandomDog',
      },
      fetchRandomDogWithBreed: {
        $codeRef: 'DogsExtension.fetchRandomDogWithBreed',
      },
    },
  },
];

const dynamicPlugin = new DynamicRemotePlugin({
  extensions: extensions,
  pluginMetadata: {
    exposedModules: {
      TabsExtension: './src/TabsExtension.tsx',
      DogsExtension: './src/fetchDogDataExtension.ts',
    },
  },
  // rest of config
});

/*************************************************************/

type FetchDog = Extension<
'custom.dogs',
{
  fetchRandomDog: () => Promise<() => Promise<{ message: string; status: string }>>;
  fetchRandomDogWithBreed: () => Promise<(breed?: string) => Promise<{ message: string; status: string }>>;
}
>;

// using type guard again to check if the extension is of type FetchDog
function isFetchDog(e: Extension): e is FetchDog {
  return !!(e.type === 'custom.dogs' && e.properties.fetchRandomDog && e.properties.fetchRandomDogWithBreed);
}

// use the extensions


const FetchWrapper = () => {
  const [fetchExtensions, fetchResolved] = useResolvedExtensions(isFetchDog);
  const [randomDog, setRandomDog] = useState<string | undefined>(undefined);
  const [randomDogWithBreed, setRandomDogWithBreed] = useState<string | undefined>(undefined);

  const handleFetchRandomDog = async () => {
    // make sure the extensions is resolved before using it
    if (!fetchResolved) {
      return;
    }
    const fetchRandomDog = fetchExtensions[0].properties.fetchRandomDog;
    const response = await fetchRandomDog();
    setRandomDog(response.message);
  };

  const handleFetchRandomDogWithBreed = async () => {
    if (!fetchResolved) {
      return;
    }
    const fetchRandomDogWithBreed = fetchExtensions[0].properties.fetchRandomDogWithBreed;
    const response = await fetchRandomDogWithBreed('kelpie');
    setRandomDogWithBreed(response.message);
  };
  // rest of the code
}

`;

type FetchDog = Extension<
  'custom.dogs',
  {
    fetchRandomDog: () => Promise<() => Promise<{ message: string; status: string }>>;
    fetchRandomDogWithBreed: () => Promise<(breed?: string) => Promise<{ message: string; status: string }>>;
  }
>;

function isFetchDog(e: Extension): e is FetchDog {
  return !!(e.type === 'custom.dogs' && e.properties.fetchRandomDog && e.properties.fetchRandomDogWithBreed);
}

const FetchWrapper = () => {
  const [fetchExtensions, fetchResolved] = useResolvedExtensions(isFetchDog);
  const [randomDog, setRandomDog] = useState<string | undefined>(undefined);
  const [randomDogWithBreed, setRandomDogWithBreed] = useState<string | undefined>(undefined);

  const handleFetchRandomDog = async () => {
    if (!fetchResolved) {
      return;
    }
    const fetchRandomDog = fetchExtensions[0].properties.fetchRandomDog;
    const response = await fetchRandomDog();
    setRandomDog(response.message);
  };

  const handleFetchRandomDogWithBreed = async () => {
    if (!fetchResolved) {
      return;
    }
    const fetchRandomDogWithBreed = fetchExtensions[0].properties.fetchRandomDogWithBreed;
    const response = await fetchRandomDogWithBreed('kelpie');
    setRandomDogWithBreed(response.message);
  };

  useEffect(() => {
    if (!fetchResolved) {
      return;
    }

    handleFetchRandomDog();
    handleFetchRandomDogWithBreed();
  }, [fetchResolved]);

  if (!fetchResolved) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Box>
        <h2>Click button to get Random dog</h2>
        <Button onClick={handleFetchRandomDog}>Fetch Random Dog</Button>
        <img src={randomDog} alt="Random Dog" />
      </Box>
      <Box>
        <h2>Click button to get Random dog from a breed</h2>
        <Button onClick={handleFetchRandomDogWithBreed}>Fetch Random Dog with Breed</Button>
        <img src={randomDogWithBreed} alt="Random Dog with Breed" />
      </Box>
    </Box>
  );
};

const FetchExtensions = () => {
  const [loaded, setLoaded] = useState(false);
  const scalprum = useScalprum();

  useEffect(() => {
    Promise.all([scalprum.pluginStore.loadPlugin(scalprum.config['remoteModule'].manifestLocation!)]).then(() => {
      setLoaded(true);
    });
  }, []);
  return <RouteLayout code={code}>{loaded ? <FetchWrapper /> : 'Loading...'}</RouteLayout>;
};

export default FetchExtensions;
