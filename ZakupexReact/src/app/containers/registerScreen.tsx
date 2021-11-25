import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/style'

export default function RegisterScreen(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
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
            <Text>Hasło</Text>
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
                    console.log(email)
                    console.log(password)
                    console.log(confirmPassword)
                }}/>
            </TouchableOpacity>
        </View>
    );
}
