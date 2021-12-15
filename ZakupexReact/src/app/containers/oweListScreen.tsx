import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Dimensions, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import styles from '../styles/style'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { updateFriendRequests, upadateFriends } from '../redux/friendsReducer';

export default function oweListScreen({ route }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.friendsStrore.friends);
    const rawList = useSelector((state: RootState)=> state.friendsStrore.friendOwe.find((el)=>el.id == route.params.id)?.log);
    const oweLog = rawList==undefined ? [] : rawList;


    const actionOnRow = (item: any) => {
        console.log('Kliknieto :', item);
    }
    const longActionOnRow = (item: any) => {
        console.log('Przytrzymano :', item);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.item}>Wybrany dłużnik: {route.params.name}</Text>
            <FlatList
                data={oweLog}
                renderItem={({ item }) =>
                    <View>
                        { <TouchableOpacity onPress={() => actionOnRow(item)} onLongPress={() => longActionOnRow(item)}>
                            <Text style={styles.item}>
                                Lista: {item.list}
                                {'\n'}
                                Opis: {item.description}
                                {'\n'}
                                {item.type == "owe" ? `Jesteś dłużny: ${item.cost}` : `Zapłaciłeś: ${item.cost}`}
                            </Text>
                        </TouchableOpacity> }
                        
                    </View>
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

}
