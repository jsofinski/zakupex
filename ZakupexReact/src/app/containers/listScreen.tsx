import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import styles from '../styles/style'
import database from '@react-native-firebase/database'

export default class ListScreen extends React.Component {
    items: Array<{ name: string, key: string }> = [];
        
    constructor(props: any) {
        super(props)

        const ref = props.route.params.ref
        if(ref != null){
            const reference = database().ref(ref)
            reference.child('entries').once('value')
                .then(snapshot=>{
                    this.items = [];
                    snapshot.forEach(item => {
                        if(item.key!=null){
                            this.items.push({
                                name: item.child('name').val(),
                                key: item.key
                            });
                            this.forceUpdate();
                        }
                        return undefined;
                    });
                });
        }
    }

    render(){
        return (
            <SafeAreaView style={styles.listContainer}>
            <FlatList
                data={this.items}
                renderItem={({ item }) => (
                <TouchableHighlight onPress={() =>(this.handleClick(item))}>
                        <View style={styles.listContainer}>
                            <Text style={styles.item}>{item.name}</Text>  
                        </View>
                </TouchableHighlight>
                )}  
            />
            </SafeAreaView>
        );
    }

    handleClick(item: {name: string, key: string}) {
        console.log(item.name);
    }
}