import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList, Button } from 'react-native';
import styles from '../styles/style'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { newList, removeList } from '../redux/listReducer';
import { ListOptions } from '../utilities/listHandler';


const exampleListOptions : ListOptions= {
    name: 'Nowa Lista',
    users: ['KnQYLRxwzMXrO6ZHlKW9QvHtZzg2']
}

export default function ListListScreen(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const lists = useSelector((state: RootState) => state.listStore.lists)
    
    return(
        <SafeAreaView style={styles.listContainer}>
            <FlatList
                data={lists}
                renderItem={({ item }) => (
                    <TouchableHighlight onPress={() => {
                        navigation.navigate('List', { id: item.id })
                    }}>
                        <View style={styles.listContainer}>
                            <Icon style={styles.item} name='rowing' />
                            <Text style={styles.item}>{item.name}</Text>
                            <Button title=' X ' onPress={()=>{dispatch(removeList(item.id))}}></Button>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <Button title='new list' onPress={()=>{dispatch(newList(exampleListOptions))}}></Button>
        </SafeAreaView>
    );
}