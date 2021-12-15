import React, { useState } from 'react';
import { Alert, SafeAreaView, TextInput, View, Text, StyleSheet, TouchableHighlight, Modal, FlatList, Pressable, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, ListItem, removeItem, modifyItem } from '../redux/listReducer';
import { RootState } from '../redux/store';
import styles from '../styles/style'

const exampleItem : ListItem = {
    id: '',
    name: 'item',
    quantity: '1',
    icon: ''
}

export default function ListScreen({ route }) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [name, onChangeName] = React.useState("");
    const [quantity, onChangeQuantity] = React.useState("");
    const items = useSelector((state: RootState) => state.listStore.lists.find((el) => el.id == route.params.id)?.items);

    const [editItem, setEditItem] = useState('');


    return (
        <View style={{
            backgroundColor: "white",
            flex: 1,
            flexDirection: "column",
        }}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableHighlight 
                    onPress={() => {
                        console.log(item.id)
                        setEditItem(item.id)
                        onChangeName(item.name)
                        onChangeQuantity(item.quantity)
                        setModalVisibleEdit(!modalVisibleEdit)
                    }}
                    onLongPress={() => {
                        console.log('Long Press: ', item.id)
                        dispatch(removeItem({listid: route.params.id, itemid: item.id}))
                    }}>
                        <View style={styles.listContainer}>
                            <Text style={styles.item}>{item.name}</Text>
                            <Text style={styles.item}>{item.quantity}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <Button title='Add item' onPress={() => {
                onChangeName("")
                onChangeQuantity("")
                setModalVisible(true);
                }}></Button>
            <Modal  //add item
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <SafeAreaView>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeName}
                                value={name}
                                placeholder="Nazwa"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeQuantity}
                                value={quantity}
                                placeholder="Ilość"
                                keyboardType="default"
                            />
                        </SafeAreaView>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            dispatch(addItem({listid:route.params.id, item: {id:'', name: name, quantity: quantity, icon: ''}}));
                            setModalVisible(!modalVisible);
                        }}
                        >
                            <Text style={styles.textStyle}>Dodaj produkt</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                            <Text style={styles.textStyle}>Anuluj</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal  //edit item
                animationType="slide"
                transparent={true}
                visible={modalVisibleEdit}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisibleEdit(!modalVisibleEdit);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <SafeAreaView>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeName}
                                value={name}
                                placeholder="Nazwa"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeQuantity}
                                value={quantity}
                                placeholder="Ilość"
                                keyboardType="default"
                            />
                        </SafeAreaView>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            dispatch(modifyItem({listid:route.params.id, item: {id:editItem, name: name, quantity: quantity, icon: ''}}));
                            setModalVisibleEdit(!modalVisibleEdit);
                        }}
                        >
                            <Text style={styles.textStyle}>Edytuj produkt</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleEdit(!modalVisibleEdit);
                        }}
                        >
                            <Text style={styles.textStyle}>Anuluj</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    );
};