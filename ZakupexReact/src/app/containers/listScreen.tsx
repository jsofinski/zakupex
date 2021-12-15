import React, { useState } from 'react';
import { Alert, SafeAreaView, TextInput, View, Text, TouchableHighlight, Modal, FlatList, Pressable, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, ListItem, removeItem, modifyItem, addUserToList, addReceipt } from '../redux/listReducer';


import { RootState } from '../redux/store';
import styles from '../styles/style'
import { Icon } from 'react-native-elements'

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

    const [modalVisibleAddReceipt, setModalVisibleAddReceipt] = useState(false);

    const [modalVisibleAddFriend, setModalVisibleAddFriend] = useState(false);
    const friends = useSelector((state: RootState) => state.friendsStrore.friends);

    const [name, onChangeName] = React.useState("");
    const [quantity, onChangeQuantity] = React.useState("");
    const [receiptDescription, onChangeReceiptDescription] = React.useState("");
    const [receiptAmount, onChangeReceiptAmount] = useState('');
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
                            <Icon style={styles.itemIcon} name='rowing' />
                            <Text style={styles.item}>{item.name}</Text>
                            <Text style={styles.item}>{item.quantity}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <Button color="#f4511e" title='Dodaj produkt' onPress={() => {
                onChangeName("")
                onChangeQuantity("")
                setModalVisible(!modalVisible);
                }}></Button>
            <Text/>
            <Button color="#f4511e" title='Dodaj znajomego' onPress={() => {
                setModalVisibleAddFriend(!modalVisibleAddFriend);
                }}></Button>
            <Text/>
            <Button color="#f4511e" title='Dodaj rachunek' onPress={() => {
                setModalVisibleAddReceipt(!modalVisibleAddReceipt);
                }}></Button>
            <Modal  //add item
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
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
            
            <Modal  //add firend
                animationType="slide"
                transparent={true}
                visible={modalVisibleAddFriend}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisibleAddFriend(!modalVisibleAddFriend);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={friends}
                            renderItem={({ item }) =>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        dispatch(addUserToList({list: route.params.id, user: item.id}));
                                    }}>
                                        <Text style={styles.item}>
                                            {item.name}
                                        </Text>
                                        <Text font-size="1px">
                                            {item.id}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleAddFriend(!modalVisibleAddFriend);
                        }}
                        >
                            <Text style={styles.textStyle}>Anuluj</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal  //add receipt
                animationType="slide"
                transparent={true}
                visible={modalVisibleAddReceipt}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisibleAddReceipt(!modalVisibleAddReceipt);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <SafeAreaView>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeReceiptDescription}
                                value={receiptDescription}
                                placeholder='Opis'
                                keyboardType='default'                             
                            />
                        </SafeAreaView>
                        <SafeAreaView>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeReceiptAmount}
                                value={receiptAmount}
                                placeholder='Kwota'
                                keyboardType='numeric'                             
                            />
                        </SafeAreaView>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            console.log("dodano ", parseFloat(receiptAmount))
                            dispatch(addReceipt({lid:route.params.id, description: receiptDescription, cost: parseFloat(receiptAmount)}));
                            setModalVisibleAddReceipt(!modalVisibleAddReceipt);
                        }}
                        >
                            <Text style={styles.textStyle}>Dodaj koszty</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleAddReceipt(!modalVisibleAddReceipt);
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