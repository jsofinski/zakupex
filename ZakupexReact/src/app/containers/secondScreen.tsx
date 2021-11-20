import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SecondScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>hello screen 2</Text>
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

