import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Button } from 'react-native';
import styles from '../styles/style'
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { declineFriendRequest, acceptFriendRequest } from '../redux/friendsReducer'
export function FriendRequest() {
    const dispatch = useDispatch();
    const requests = useSelector((state: RootState) => state.friendsStrore.requests)
    // console.log(requests)
    
    const actionOnAccept = (item: any) => {
        dispatch(acceptFriendRequest(item));
        console.log('Zaakceptowano :', item);
    }
    const actionOnDecline = (item: any) => {
        dispatch(declineFriendRequest(item));
        console.log('Odrzucono :', item);    
    }

    return (
        <View style={styles.container}>
            <FlatList 
            data = {requests}
            renderItem = {({ item }) =>
                <View style={styles.listContainer}>
                    <Text style={styles.adam}>
                        {item.name}
                    </Text>
                    <TouchableOpacity onPress={() => actionOnAccept(item)}>
                        <Icon name='favorite' color='#FF0000' size={50}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => actionOnDecline(item)}>
                        <Icon name='delete' color='#2137FF' size={50}/>
                    </TouchableOpacity>
                </View>
        
            }
            
            />
            <Button title="console.log(requests)" onPress={() => {console.log(requests)}}> 123</Button>
        </View>
    );
}