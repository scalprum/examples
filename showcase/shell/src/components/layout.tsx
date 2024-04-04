import { Box, HStack, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ padding: 2 }}>
      <VStack spacing={4}>
        <HStack sx={{ width: '100%' }} spacing="24px">
          <ChakraLink as={ReactRouterLink} to="/">
            Home
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/sample-config">
            Sample configuration
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/basic-module">
            Basic remote module
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/scalprum-api">
            Scalprum API
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/tabs-extensions">
            Tabs Extensions
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/fetch-extensions">
            Fetch Extension
          </ChakraLink>
        </HStack>
        <Box sx={{ width: '100%' }}>{children}</Box>
      </VStack>
    </Box>
  );
};

export default Layout;
