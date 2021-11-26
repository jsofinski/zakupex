import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import styles from '../styles/style'
import { Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { renderNode } from 'react-native-elements/dist/helpers';

export default class ListListScreen extends React.Component {
    lists: Array<{ name: string, key: string }> = []

    constructor(props: any){
        super(props);
        const currentUser = auth().currentUser
        if (currentUser != null) {
            database().ref(`users/${currentUser.uid}/lists`).once('value')
                .then((snapshot) => {
                    this.lists = []
                    snapshot.forEach(list => {
                        database().ref(`lists/${ list.val()}/${list.key}/name`).once('value')
                            .then((name) => {
                                var ref = name.ref.toString()
                                ref = ref.substring(50, ref.length - 5);
                                this.lists.push({name: name.val(), key: ref});
                                this.forceUpdate();
                            })
                            .catch(error => {
                                console.log('List fetch error: ' + error);
                            });
                        return undefined;
                    });
                });
        }
    }

    render(){
        return (
            <SafeAreaView style={styles.listContainer}>
                <FlatList
                    data={this.lists}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => (this.handleClick(item))}>
                            <View style={styles.listContainer}>
                                <Text style={styles.item}>{item.name}</Text>
                                <Icon style={styles.item} name='rowing' />
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </SafeAreaView>
        );
    }

    handleClick(item: { name: string, key: string }) {
        console.log(item.name);
        this.props.navigation.navigate('List', { ref: item.key })
    }
}