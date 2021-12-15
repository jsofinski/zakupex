import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Button, Image } from 'react-native';
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
		<View style={[styles.mainmenu_container, {
			flexDirection: "column",
		  }]}>
			<View style={{ flex: 25, backgroundColor: "white" }}>
				<Image style={styles.mainmenu_image} source={require('../assets/logo.png')} />
			</View>
			<View style={{ flex: 5, backgroundColor: "white" }}>

				<Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>{user == null ? 'Not logged in' : 'Welcome ' + user} </Text>
		  		
			</View>
			
			<View style={{ flex: 70 }}>
				
				{user == null ?
					<View>
						<ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={{}}>
							<Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
								<Button color="#f4511e" title="Logowanie" onPress={() =>
									navigation.navigate('Login')
								} />
							<Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
						</ImageBackground>
					</View>
				:
				<View>
				<ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={{}}>
						<Text />
							<Button color="#f4511e" title="Listy zakupów" onPress={() =>
								navigation.navigate('ListList')
							} />
						<Text />
							<Button color="#f4511e" title="Lista znajomych" onPress={() =>
								navigation.navigate('FriendsList')
							} />
						<Text />
							<Button color="#f4511e" title="Dodaj znajomego" onPress={() =>
								navigation.navigate('First')
							} />
						<Text />
						<Button color="#f4511e" title="Wyloguj" onPress={() => { dispatch(logout()) }} />
						<Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
		 		 </ImageBackground>
					
				</View>
				}
				
			</View>
			
		  </View>
	);
}
