import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InfoScreen from '../screens/InfoScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const InfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InfoStack;
