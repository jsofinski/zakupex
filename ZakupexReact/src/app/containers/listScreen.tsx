import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import styles from '../styles/style'



export default function ListScreen(props: any) {
    const [names, setNames] = useState([
        {name: 'Produkt 1', key: '1'},
        {name: 'Produkt 2', key: '2'},
        {name: 'Produkt 3', key: '3'},
        {name: 'Produkt 4', key: '4'},
        {name: 'Produkt 5', key: '5'},
        {name: 'Produkt 6', key: '6'},
        {name: 'Produkt 7', key: '7'},
        {name: 'Produkt 8', key: '8'},
        {name: 'Produkt 9', key: '9'},
        {name: 'Produkt 10', key: '10'},
      ]);


    return (
        <SafeAreaView style={styles.listContainer}>
        <FlatList
            data={names}
            renderItem={({ item }) => (
            <TouchableHighlight onPress={() =>(handleClick(item))}>
                    <View style={styles.listContainer}>
                        <Text style={styles.item}>{item.name}</Text>  
                    </View>
            </TouchableHighlight>
            )}  
        />
        </SafeAreaView>
    );
    function handleClick(item: {name: string, key: string}) {
        console.log(item.name);
    }
}