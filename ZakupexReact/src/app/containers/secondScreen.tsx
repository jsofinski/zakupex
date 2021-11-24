import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/style'

export default class SecondScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>hello screen 2</Text>
            </View>
        );
    }
}