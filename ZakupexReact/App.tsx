import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FriendsButton from './src/app/components/test';
import TitleScreen from './src/app/components/titlescreen';

export default function App() {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <TitleScreen />
      </View>
      <View style={{ flex: 6, backgroundColor: "darkorange" }}>

      </View>
      <View style={styles.bottomPanel}>
          <FriendsButton />  
          <FriendsButton />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  bottomPanel: {
    flex: 1,
    backgroundColor: "green",
    flexDirection: "row"
  },
});
