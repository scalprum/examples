import { Box, Button } from '@chakra-ui/react';
import { preloadModule } from '@scalprum/core';
import { ScalprumComponent } from '@scalprum/react-core';
import React from 'react';
import RouteLayout from '../components/route-layout';

const code = `
import { preloadModule } from '@scalprum/core';

const PreloadModule = () => {
  const [preloaded, setPreloaded] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handlePreload = async () => {
    await preloadModule('remoteModule', 'RemoteModuleComponent');
    setPreloaded(true);
  };
  return (
    <>
      <div>
        <Button onClick={handlePreload}>Click button to preload a module</Button>
      </div>
      {preloaded && (
        <div>
          <div>
            <Button onClick={() => setShow((prev) => !prev)}>Toggle remote module</Button>
          </div>
          {show && <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />}
        </div>
      )}
    </>
  )
}

`;

const PreloadModule = () => {
  const [preloaded, setPreloaded] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handlePreload = async () => {
    await preloadModule('remoteModule', 'RemoteModuleComponent');
    setPreloaded(true);
  };
  return (
    <RouteLayout editorProps={{ height: 500 }} code={code}>
      <Box>
        <div>
          <Button onClick={handlePreload}>Click button to preload a module</Button>
        </div>
        {preloaded && (
          <div>
            <div>
              <Button onClick={() => setShow((prev) => !prev)}>Toggle remote module</Button>
            </div>
            {show && <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />}
          </div>
        )}
      </Box>
    </RouteLayout>
  );
};

export default PreloadModule;
