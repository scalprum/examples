import { ScalprumComponent } from '@scalprum/react-core';
import React from 'react';
import RouteLayout from '../components/route-layout';

const code = `
import { ScalprumComponent } from '@scalprum/react-core';
/**
 * {
 *   "remoteModule": {
 *     "name": "remoteModule",
 *     "manifestLocation": "http://localhost:8003/plugin-manifest.json"
 *   }
 * } 
 */

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
    <RouteLayout editorProps={{ height: 500 }} code={code}>
      <div>
        <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" />
        <ScalprumComponent scope="remoteModule" module="RemoteModuleComponent" importName="NamedRemoteModuleComponent" />
      </div>
    </RouteLayout>
  );
};

export default BasicModule;
