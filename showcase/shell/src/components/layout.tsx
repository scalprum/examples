import {
  Box,
  HStack,
  VStack,
  Link as ChakraLink,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AccordionIcon,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { useExtensions, useResolvedExtensions } from '@openshift/dynamic-plugin-sdk';
import { useScalprum } from '@scalprum/react-core';

const PluginData = () => {
  useResolvedExtensions();
  const { pluginStore } = useScalprum();

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Version</Th>
            <Th>Enabled</Th>
            <Th>Build hash</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pluginStore.getPluginInfo().map((pluginInfo) => {
            return (
              <Tr key={pluginInfo.manifest.name}>
                <Td>{pluginInfo.manifest.name}</Td>
                <Td>{pluginInfo.manifest.version}</Td>
                {/* @ts-ignore */}
                <Td>{pluginInfo.status}</Td>
                <Td>
                  <pre>{pluginInfo.manifest.buildHash}</pre>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const ExtensionsData = () => {
  const extensions = useExtensions();
  const [rExtensions] = useResolvedExtensions();
  const rows = extensions.map((ext) => (
    <Tr key={ext.uid}>
      <Td>{ext.type}</Td>
      <Td>{ext.pluginName}</Td>
      <Td>{rExtensions.find((re) => re.uid === ext.uid) ? 'Yes' : 'No'}</Td>
      <Td>
        <pre>{Object.keys(ext.properties).join(',')}</pre>
      </Td>
    </Tr>
  ));
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Plugin name</Th>
            <Th>Resolved</Th>
            <Th>Properties</Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ padding: 0 }}>
      <VStack spacing={0} sx={{ minHeight: '100vh' }}>
        <HStack bg="cyan.900" color="white" sx={{ width: '100%', padding: 4 }} spacing="24px">
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
          <ChakraLink as={ReactRouterLink} to="/preload">
            Preload module
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/prefetch">
            Prefetch data
          </ChakraLink>
        </HStack>
        <Box sx={{ width: '100%' }}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Loaded plugins
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <PluginData />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Loaded extensions
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <ExtensionsData />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Box sx={{ width: '100%', padding: 0, flex: 1 }}>{children}</Box>
      </VStack>
    </Box>
  );
};

export default Layout;
