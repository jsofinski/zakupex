import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import styles from '../styles/style'

export default class FirstScreen extends React.Component {
    render() {
        return (
          <View style={styles.container}>
          <Image source={require('../assets/logo.png')} />
          <Text>hello!</Text>
          <StatusBar style="auto" />
            <Button title="Znajomi" onPress={() => 
              this.props.navigation.navigate('First')
            }/>
            <Button title="Listy zakupów" onPress={() => 
              this.props.navigation.navigate('ListList')
            }/>
            <Button title="Lista znajomych" onPress={() => 
              this.props.navigation.navigate('FriendsList')
            }/>
        </View>
        );
    }
}
