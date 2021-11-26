import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/style'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default function RegisterScreen(props: any) {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} />
            <Text>Nick</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setNick(text)}
                value={nick}
            />
            <Text>Email</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Text>Hasło</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Text>Powtórz Hasło</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
            />
            <Text>Rejestracja</Text>
            <TouchableOpacity style={styles.buttonSet}>
                <Button title="Home" onPress={() => 
                props.navigation.navigate('Home')
                }/>
                <Button title="Logowanie" onPress={() => 
                props.navigation.navigate('Login')
                }/>
                <Button title="Test register" onPress={() =>  {
                    if(password == confirmPassword && nick != ''){
                        auth().createUserWithEmailAndPassword(email, password)
                            .then((userCredential) => {
                                console.log('Created accound and logged in as:' + userCredential.user.uid);
                                database().ref(`users/${userCredential.user.uid}`).set({
                                    'nickname': nick
                                });
                            })
                            .catch((error) => {
                                console.log('Error during account creation:', error);
                            });
                    }else{
                        console.log('Error during account creation: Passwords don\'t match');
                    }
                }}/>
            </TouchableOpacity>
        </View>
    );
}
