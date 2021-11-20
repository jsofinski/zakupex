import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class FirstScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>hello screen 1</Text>
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

