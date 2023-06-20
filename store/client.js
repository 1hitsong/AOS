import { LemmyHttp } from 'lemmy-js-client'
import * as SecureStore from 'expo-secure-store';

export async function init(instanceURI) {
  return {
    client: new LemmyHttp(instanceURI, null),
    jwt: await SecureStore.getItemAsync('server_jwt')
  }
};