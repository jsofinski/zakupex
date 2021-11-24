import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

export default class FirstScreen extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Dodaj znajomego</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeNumber}
                    placeholder="id"
                    keyboardType="numeric"
                />
            </View>
        );
    }
    onChangeNumber(){
        console.log('Cos sie zmienilo');
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

