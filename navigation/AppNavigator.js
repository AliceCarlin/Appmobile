import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfoScreen from '../screens/InfoScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

import InfoStack from './InfoStack'

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (

    
    <Tab.Navigator>
      <Tab.Screen name="Info" component={InfoStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
