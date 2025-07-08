import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RoleProvider } from './src/context/RoleContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <RoleProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </RoleProvider>

);

export default App;