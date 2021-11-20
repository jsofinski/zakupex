import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

class FriendsButton extends React.Component {
    render() {
        return (
            <View style={styles.screen}>
              <TouchableOpacity
                    onPress={this.buttonClickedHandler}
                    style={styles.roundButton1}>
                    <Text>Znajomi</Text>
              </TouchableOpacity>
            </View>
          );
    }

    
    buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        // do something
    };
  }

function pressed(){

}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundButton1: {
      width: 75,
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'pink',
    },
  });

export default FriendsButton;