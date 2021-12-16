import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import styles from '../styles/style'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { updateFriendRequests, upadateFriends } from '../redux/friendsReducer';

export default function FriendsList() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const users = useSelector((state: RootState) => state.friendsStrore.friends);
    // console.log(users)

    const actionOnRow = (item: any) => {
        console.log('Kliknieto :', item);
        navigation.navigate('OweList', {name: item.name ,id: item.id})
    }
    const longActionOnRow = (item: any) => {
        console.log('Przytrzymano :', item);
        Alert.alert(
            "Czy na pewno chcesz usunac znajomego " + item.name + "?",
            "",
            [
                {
                    text: "Anuluj",
                    onPress: () => console.log("Anulowanie usuniecia"),
                    style: "cancel"
                },
                { text: "Usun", onPress: () => console.log("Usun znajomego") }
            ]
        )
    }
    const addFriend = () => {
        navigation.navigate('AddFriend')
    }
    const checkRequests = () => {
        dispatch(updateFriendRequests())
        navigation.navigate('FriendRequests')
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <View>
                        <TouchableOpacity onPress={() => actionOnRow(item)} onLongPress={() => longActionOnRow(item)}>
                            {item.owe == 0 ?
                                <Text style={styles.item}>
                                    {item.name}     ist eben
                                </Text>
                                :
                                item.owe > 0 ? 
                                    <Text style={styles.item}>
                                        {item.name}     jest dłużny: {item.owe.toFixed(2)}zł
                                    </Text>
                                    :
                                    <Text style={styles.item}>
                                        {item.name}    jesteś dłużny: {-item.owe.toFixed(2)}zł
                                   </Text>
                            }
                            {/* <Image
                                style={styles.stretch}
                                source={require('./minus.png')}
                            /> */}
                        </TouchableOpacity>
                    </View>
                }
            />
            <TouchableOpacity style={styles.buttonSet}>
                <Button color="#f4511e" title='Dodaj znajomego' onPress={()=>{addFriend()}}></Button>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSet}>
                <Button color="#f4511e" title='Zaproszenia' onPress={()=>{checkRequests()}}></Button>
            </TouchableOpacity>
        </View>
    );

}
