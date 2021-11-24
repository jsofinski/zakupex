import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class FirstScreen extends React.Component {
    render() {
        return (
          <View style={styles.container}>
          <Text>hello!</Text>
          <StatusBar style="auto" />
            <Button title="Dodawanie znajomego"  onPress={() => 
              this.props.navigation.navigate('First')
            }/>
            <Button title="Lista znajomych" onPress={() => 
              this.props.navigation.navigate('FriendsList')
              }/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
