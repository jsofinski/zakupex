import React from 'react';
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import styles from '../styles/style'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { logout } from '../redux/userReducer';

export default function HomeScreen() {
	const navigation = useNavigation();

	const user = useSelector((state: RootState) => state.userStore.username);
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Image source={require('../assets/logo.png')} />
			<Text>{user == null ? 'Not logged in' : 'Welcome ' + user} </Text>
			<TouchableOpacity style={styles.buttonSet}>
				<Button title="Znajomi" onPress={() =>
					navigation.navigate('First')
				} />
				<Button title="Listy zakupów" onPress={() =>
					navigation.navigate('ListList')
				} />
				<Button title="Lista znajomych" onPress={() =>
					navigation.navigate('FriendsList')
				} />
			</TouchableOpacity>
			<Button title="Logowanie" onPress={() =>
				navigation.navigate('Login')
			} />
			<Button title="Wyloguj" onPress={() => { dispatch(logout()) }} />
		</View>
	);
}
