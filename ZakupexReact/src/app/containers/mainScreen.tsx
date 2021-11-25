import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import styles from '../styles/style'

export default class MainClass extends React.Component {
    isLoggedIn: boolean = false
    
    render() {
      return (
        <View style={styles.container}>
        <Image source={require('../assets/logo.png')} />
        <Text>hello!</Text>
        <TouchableOpacity style={styles.buttonSet}>
          <Button title="Znajomi" onPress={() => 
            this.props.navigation.navigate('First')
          }/>
          <Button title="Listy zakupów" onPress={() => 
            this.props.navigation.navigate('ListList')
          }/>
          <Button title="Lista znajomych" onPress={() => 
            this.props.navigation.navigate('FriendsList')
          }/>
          </TouchableOpacity>
          <Button title="Logowanie" onPress={() => 
            this.props.navigation.navigate('Login')
          }/>
      </View>
      );
    }
  
}
