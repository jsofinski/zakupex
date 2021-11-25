import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/style'

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
                    console.log(email)
                    console.log(password)
                }}/>
            </TouchableOpacity>
        </View>
    );
}
