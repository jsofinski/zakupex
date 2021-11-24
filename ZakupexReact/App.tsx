import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './src/app/containers/firstScreen';
import FriendsList from './src/app/containers/friendsList';
import MainClass from './src/app/containers/mainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            options={{
                title: 'Main screen',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }
          }
            name="Home"
            component={MainClass}
          />
          <Stack.Screen
            options={{
                title: 'Dodawanie znajomego',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }
          }
            name="First"
            component={FirstScreen}
          />
          <Stack.Screen
            options={{
                title: 'Znajomi',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }
          }
            name="FriendsList"
            component={FriendsList}
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
