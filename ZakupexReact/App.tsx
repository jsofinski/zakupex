import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './src/app/navigation/MainNavigator';
import store from './src/app/redux/store';

export default function App() {
	return (
		<Provider store={store} >
			<NavigationContainer>
				<MainNavigator/>
			</NavigationContainer>
		</Provider>
	);
}