import React from 'react';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import style from '../styles/style';
import FirstScreen from '../containers/firstScreen';
import FriendsList from '../containers/friendsList';
import HomeScreen from '../containers/homeScreen';
import ListListScreen from '../containers/listListScreen';
import ListScreen from '../containers/listScreen';
import RegisterScreen from '../containers/registerScreen';
import LoginScreen from '../containers/loginScreen';

import { updateUser } from '../redux/userReducer';

const Stack = createStackNavigator();

export default function MainNavigator() {
	useDispatch()(updateUser());

	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					title: 'Main screen',
					headerLeft: () => null,
					headerTintColor: '#fff',
					headerStyle: style.headerStyle,
					headerTitleStyle: style.headerTitleStyle
				}
				}
				name="Home"
				component={HomeScreen}
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
				initialParams={{ id: null }}
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
	);
}