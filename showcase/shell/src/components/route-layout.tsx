import { Grid, GridItem } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import ExampleEditor from './example-editor';
import { EditorProps } from '@monaco-editor/react';

const RouteLayout = ({ code, children, editorProps }: PropsWithChildren<{ code: string; editorProps?: EditorProps }>) => {
  return (
    <Grid templateColumns={`repeat(${children ? '2' : '1'}, 1fr)`} gap={6}>
      <GridItem sx={{ padding: 4, minHeight: '100%' }}>{children}</GridItem>
      <GridItem bg="#1e1e1e" sx={{ height: '100%' }}>
        <ExampleEditor {...editorProps} value={code} />
      </GridItem>
    </Grid>
  );
};

export default RouteLayout;
