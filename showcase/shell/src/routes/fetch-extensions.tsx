import React, { useEffect, useState } from 'react';
import { useScalprum } from '@scalprum/react-core';
import { Extension, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';
import { Button, Box } from '@chakra-ui/react';
import RouteLayout from '../components/route-layout';

const code = ``;

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
