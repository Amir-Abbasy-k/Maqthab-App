/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import UserContextProvider from './UserContext';

function Ret() {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Ret);
