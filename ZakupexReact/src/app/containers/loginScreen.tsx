import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from '../styles/style'
import { login } from '../redux/userReducer';

export default function LoginScreen(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    return (
        <View style={[styles.mainmenu_container, {
			flexDirection: "column",
		  }]}>
			<View style={{ flex: 25, backgroundColor: "white" }}>
				<Image style={styles.mainmenu_image} source={require('../assets/logo.png')} />
			</View>
            <View style={{ flex: 75, backgroundColor: "white" }}>
                
            <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16}}>Email</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16}}>Hasło</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button color="#f4511e" title="Login" onPress={() => {
                if(email != '' && password != ''){
                    dispatch(login({
                        email: email,
                        password: password,
                        onSuccess: () => props.navigation.navigate('Home'),
                        onError: (error) => console.log(error)
                    }));
                }
            }} />
            <Text />
            <Button color="#f4511e" title="Don't have an account?" onPress={() =>
                props.navigation.navigate('Register')
            } />
            {/* <Text />
            <Button color="#f4511e" title="Cancel" onPress={() =>
                props.navigation.navigate('Home')
            } /> */}
            <Text />
            <Button color="#f4511e" title="<*** DEVMODE ***>" onPress={() => {
                dispatch(login({
                    email: 'A@a.pl',
                    password: 'Haslo123',
                    onSuccess: () => props.navigation.navigate('Home'),
                    onError: (error) => console.log(error)
                }));
            }} />
			</View>
		</View>
			

            
    );
}
