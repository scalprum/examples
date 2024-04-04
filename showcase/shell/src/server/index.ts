// this is a mock of a simple server that "fakes" the API for scalprum configuration
import { AppsConfig } from '@scalprum/core';
import data from './data.json';

// eslint-disable-next-line import/prefer-default-export
export function getScalprumConfig() {
  return new Promise<AppsConfig>((res) => {
    setTimeout(() => {
      return res(data);
      // fake a delay
    }, 500);
  });
}
