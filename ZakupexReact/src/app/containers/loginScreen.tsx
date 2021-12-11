import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from '../styles/style'
import { login } from '../redux/userReducer';

export default function LoginScreen(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

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
                } />
                <Button title="Rejestracja" onPress={() =>
                    props.navigation.navigate('Register')
                } />
                <Button title="Test login" onPress={() => {
                    if(email != '' && password != ''){
                        dispatch(login({
                            email: email,
                            password: password,
                            onSuccess: () => props.navigation.navigate('Home'),
                            onError: (error) => console.log(error)
                        }));
                    }
                }} />
            </TouchableOpacity>
        </View>
    );
}
