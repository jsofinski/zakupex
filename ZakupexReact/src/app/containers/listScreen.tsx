import React from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, ListItem } from '../redux/listReducer';
import { RootState } from '../redux/store';
import styles from '../styles/style'

const exampleItem : ListItem = {
    id: '',
    name: 'item',
    quantity: 1,
    icon: ''
}

export default function ListScreen({ route }) {
    const dispatch = useDispatch();
    
    const items = useSelector((state: RootState) => state.listStore.lists.find((el) => el.id == route.params.id)?.items);

    return (
        <View style={{
            backgroundColor: "white",
            flex: 1,
            flexDirection: "column",
        }}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableHighlight>
                        <View style={styles.listContainer}>
                            <Text style={styles.item}>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <Button title='Add item' onPress={()=>{dispatch(addItem({listid:route.params.id, item: exampleItem}))}}></Button>
        </View>
    );
};