import { Box, Button } from '@chakra-ui/react';
import { preloadModule } from '@scalprum/core';
import { ScalprumComponent } from '@scalprum/react-core';
import React from 'react';

const PreloadModule = () => {
  const [preloaded, setPreloaded] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handlePreload = async () => {
    await preloadModule('remoteModule', 'RemoteModuleComponent');
    setPreloaded(true);
  };
  return (
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
  );
};

export default PreloadModule;
