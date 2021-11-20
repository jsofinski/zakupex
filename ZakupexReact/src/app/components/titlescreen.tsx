import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

class TitleScreen extends React.Component {
    render() {
        return (
        <View>
            <Image
            source={require('./simple_logo.png')}
            />

        </View>

        );
    }
  }



export default TitleScreen;