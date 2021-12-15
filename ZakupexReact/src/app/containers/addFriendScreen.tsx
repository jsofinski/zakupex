import React from 'react';
import { View, Text, SafeAreaView, Button, TextInput, FlatList, TouchableHighlight } from 'react-native';
import { querryFriends, addFriend } from '../redux/friendsReducer';
import styles from '../styles/style'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function AddFriendScreen() {

    // const users = useSelector((state: RootState) => state.friendsStrore.friends)
    const users = useSelector((state: RootState) => state.friendsStrore.friends)
    const [name, onChangeName] = React.useState("");
    const dispatch = useDispatch();
    const querry = useSelector((state: RootState) => state.friendsStrore.querry)
    console.log(querry)
    return (
        <SafeAreaView>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Nazwa"
                />
                <Button color="#f4511e" title='Wyszukaj' onPress={() => {
                    console.log(name)
                    dispatch(querryFriends(name))
                    console.log(querry)
                }}></Button>
            </View>
            <FlatList
            data={querry}
            renderItem={({ item, index }) => (
                <TouchableHighlight 
                onPress={() => {
                    console.log("click")
                    console.log(querry[index].id)
                }}
                onLongPress={() => {
                    console.log("long click")
                    console.log(querry[index].id)
                    dispatch(addFriend(item));
                }}>
                    <View style={styles.listContainer}>
                        <Text style={styles.item}>{item.name}</Text>
                        <Text style={styles.item}>{item.id}</Text>
                    </View>
                </TouchableHighlight>
            )}
            />
        </SafeAreaView>
    );
}
