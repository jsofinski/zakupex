import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import styles from '../styles/style'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default class MainClass extends React.Component {
	isLoggedIn: boolean = false
	user: string | null = null

	constructor(props: any){
		super(props);
		const currentUser = auth().currentUser
		if(currentUser != null){
			database().ref(`users/${currentUser.uid}/nickname`).once('value')
				.then((snapshot)=>{
					this.user = snapshot.val();
					this.forceUpdate();
				});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image source={require('../assets/logo.png')} />
				<Text>{this.user == null ? 'Not logged in' : 'Welcome ' + this.user} </Text>
				<TouchableOpacity style={styles.buttonSet}>
					<Button title="Znajomi" onPress={() =>
						this.props.navigation.navigate('First')
					} />
					<Button title="Listy zakupów" onPress={() =>
						this.props.navigation.navigate('ListList')
					} />
					<Button title="Lista znajomych" onPress={() =>
						this.props.navigation.navigate('FriendsList')
					} />
				</TouchableOpacity>
				<Button title="Logowanie" onPress={() =>
					this.props.navigation.navigate('Login')
				} />
				<Button title="Wyloguj" onPress={() =>{
					if(auth().currentUser == null){
						auth().signOut();
						this.user = null
						this.forceUpdate();
					}
				}} />
			</View>
		);
	}
}
