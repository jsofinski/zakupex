import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class FirstScreen extends React.Component {
    render() {
        return (
          <View style={styles.container}>
          <Text>hello!</Text>
          <StatusBar style="auto" />
            <Button title="Screen 1" onPress={() => 
              this.props.navigation.navigate('First')
            }/>
            <Button title="Screen 2" onPress={() => 
              this.props.navigation.navigate('Second')
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
