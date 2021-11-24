import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import styles from '../styles/style'
import { Icon } from 'react-native-elements'



export default function ListListScreen(props: any) {
    const [names, setNames] = useState([
        {name: 'Lista 1', key: '1'},
        {name: 'Lista 2', key: '2'},
        {name: 'Lista 3', key: '3'},
        {name: 'Lista 4', key: '4'},
        {name: 'Lista 5', key: '5'},
        {name: 'Lista 6', key: '6'},
        {name: 'Lista 7', key: '7'},
        {name: 'Lista 8', key: '8'},
        {name: 'Lista 9', key: '9'},
        {name: 'Lista 10', key: '10'},
      ]);


    return (
        <SafeAreaView style={styles.listContainer}>
        <FlatList
            data={names}
            renderItem={({ item }) => (
            <TouchableHighlight onPress={() =>(handleClick(item))}>
                    <View style={styles.listContainer}>
                        <Text style={styles.item}>{item.name}</Text>  
                        <Icon style={styles.item} name='rowing' />
                    </View>
            </TouchableHighlight>
            )}  
        />
        </SafeAreaView>
    );
    function handleClick(item: {name: string, key: string}) {
        console.log(item.name);
        props.navigation.navigate('List')
    }
}