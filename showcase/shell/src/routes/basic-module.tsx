import { ScalprumComponent } from '@scalprum/react-core';
import React from 'react';
import RouteLayout from '../components/route-layout';

const code = `
import { ScalprumComponent } from '@scalprum/react-core';

const BasicModule = () => {
  return (
    <div>
      <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />
      <ScalprumComponent 
        scope="remoteModule"
        module="RemoteModuleComponent"
        importName="NamedRemoteModuleComponent"
      />
    </div>
  )
}

export default BasicModule

`;

const BasicModule = () => {
  return (
    <RouteLayout editorProps={{ height: 350 }} code={code}>
      <div>
        <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />
        <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" importName="NamedRemoteModuleComponent" />
      </div>
    </RouteLayout>
  );
};

export default BasicModule;
