import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './src/app/screens/firstScreen';
import SecondScreen from './src/app/screens/secondScreen';
import MainClass from './src/app/screens/mainScreen';
import ListListScreen from './src/app/screens/listListScreen';

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
            name="ListList"
            component={ListListScreen}
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
