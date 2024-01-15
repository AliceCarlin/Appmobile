import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { FavoritesProvider } from './providers/FavoritesProvider';

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
