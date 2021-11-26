import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './src/app/containers/firstScreen';
import FriendsList from './src/app/containers/friendsList';
import MainClass from './src/app/containers/mainScreen';
import ListListScreen from './src/app/containers/listListScreen';
import ListScreen from './src/app/containers/listScreen';
import RegisterScreen from './src/app/containers/registerScreen';
import LoginScreen from './src/app/containers/loginScreen';
import style from './src/app/styles/style';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            options={{
                title: 'Main screen',
                headerLeft: ()=> null,
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
          }
            name="Home"
            component={MainClass}
          />
          <Stack.Screen
            options={{
                title: 'Dodawanie znajomego',
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
          }
            name="First"
            component={FirstScreen}
          />
          <Stack.Screen
            options={{
                title: 'Znajomi',
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
          }
            name="FriendsList"
            component={FriendsList}
          />
          <Stack.Screen
            options={{
                title: 'Lista list zakupów',
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
          }
            name="ListList"
            component={ListListScreen}
          />
          <Stack.Screen
            options={{
                title: 'Lista zakupów',
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
            
          }
            name="List"
            initialParams={{ref: null}}
            component={ListScreen}
          />
          <Stack.Screen
            options={{
                title: 'Logowanie',
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
          }
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
                title: 'Rejestracja',
                headerTintColor: '#fff',
                headerStyle: style.headerStyle,
                headerTitleStyle: style.headerTitleStyle
            }
          }
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}