import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/style'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { useDispatch } from 'react-redux';
import { register } from '../redux/userReducer';
import { ScrollView } from 'react-native-gesture-handler';

export default function RegisterScreen(props: any) {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch()
    
    return (
        <View style={[styles.mainmenu_container, {
			flexDirection: "column",
		  }]}>
            <View style={{ flex: 25, backgroundColor: "white" }}>
				<Image style={styles.mainmenu_image} source={require('../assets/logo.png')} />
			</View>
            <View style={{ flex: 75, backgroundColor: "white" }}>
				<ScrollView>
                <ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={{}}>
                <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16}}>Nick</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setNick(text)}
                    value={nick}
                />
                <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16}}>E-mail</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16}}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16}}>Repeat Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                />
                <Button color="#f4511e" title="Register" onPress={() =>  {
                    if(password == confirmPassword && nick != '' && email != '' && password != ''){
                        dispatch(register({
                            email: email,
                            password: password,
                            nickname: nick,
                            onSuccess: () => props.navigation.navigate('Home'),
                            onError: (error) => console.log(error)
                        }));
                    }else{
                        console.log('Error during account creation: Passwords don\'t match or empty string');
                    }
                }}/>
                <Text />
                <Button color="#f4511e" title="Already have an account?" onPress={() => 
                props.navigation.navigate('Login')
                }/>
                </ImageBackground>
                </ScrollView>

            </View>
        </View>
    );
}
