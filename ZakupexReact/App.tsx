import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './src/app/containers/firstScreen';
import SecondScreen from './src/app/containers/secondScreen';
import MainClass from './src/app/containers/mainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainClass}
          />
          <Stack.Screen
            name="First"
            component={FirstScreen}
          />
          <Stack.Screen
            name="Second"
            component={SecondScreen}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
