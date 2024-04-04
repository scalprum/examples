import { Grid, GridItem } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import ExampleEditor from './example-editor';
import { EditorProps } from '@monaco-editor/react';

const RouteLayout = ({ code, children, editorProps }: PropsWithChildren<{ code: string; editorProps?: EditorProps }>) => {
  return (
    <Grid templateColumns={`repeat(${children ? '2' : '1'}, 1fr)`} gap={6}>
      <GridItem>{children}</GridItem>
      <GridItem>
        <ExampleEditor {...editorProps} value={code} />
      </GridItem>
    </Grid>
  );
};

export default RouteLayout;
