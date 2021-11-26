import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/style'
import auth from '@react-native-firebase/auth'

export default function LoginScreen(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} />
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
            <Text>Logowanie</Text>
            <TouchableOpacity style={styles.buttonSet}>
                <Button title="Home" onPress={() => 
                    props.navigation.navigate('Home')
                }/>
                <Button title="Rejestracja" onPress={() => 
                    props.navigation.navigate('Register')
                }/>
                <Button title="Test login" onPress={() =>  {
                    auth().signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            console.log('Logged in as: ' + userCredential.user.uid);
                            props.navigation.navigate('Home');
                        })
                        .catch((error) => {
                            console.log('Login error:' + error);
                        });
                }}/>
            </TouchableOpacity>
        </View>
    );
}
