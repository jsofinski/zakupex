import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, SafeAreaView, TextInput, View, Text, TouchableOpacity, TouchableHighlight, Modal, FlatList, Pressable, Button } from 'react-native';
import styles from '../styles/style'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { newList, removeList, renameList } from '../redux/listReducer';
import { ListOptions } from '../utilities/listHandler';


const exampleListOptions : ListOptions= {
    name: 'Nowa Lista',
    users: ['KnQYLRxwzMXrO6ZHlKW9QvHtZzg2']
}

export default function ListListScreen(){
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSettings, setModalVisibleSettings] = useState(false);
    const [modalVisibleEditName, setModalVisibleEditName] = useState(false);
    const [name, onChangeName] = React.useState("");
    const [editList, setEditList] = useState('');

    const lists = useSelector((state: RootState) => state.listStore.lists)
    const getUsers = () => {
        return ['KnQYLRxwzMXrO6ZHlKW9QvHtZzg2']
    }
    return(
        <SafeAreaView>
            <FlatList
                data={lists}
                renderItem={({ item, index }) => (
                    <TouchableHighlight onPress={() => {
                        navigation.navigate('List', { id: item.id })
                    }}
                    onLongPress={() => {
                        setEditList(item.id)
                        onChangeName(item.name)
                        setModalVisibleSettings(!modalVisibleSettings)
                    }}>
                        <View style={styles.listContainer}>
                            <Text style={styles.item}>{item.name}</Text>
                            <Text style={{flex: 0.1}}>{index+1}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <TouchableOpacity style={styles.buttonSet}>
                <Button color="#f4511e" title='Stwórz nową listę' onPress={()=>{setModalVisible(true)}}></Button>
            </TouchableOpacity>
            <Modal // Modal dodawania listy
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
                        </SafeAreaView>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            dispatch(newList({name: name, users: getUsers()}));
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={styles.textStyle}>Stwórz listę</Text>
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
            <Modal // Modal ustawień listy
                animationType="slide"
                transparent={true}
                visible={modalVisibleSettings}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisibleSettings(!modalVisibleSettings);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleEditName(!modalVisibleEditName);
                        }}>
                            <Text style={styles.textStyle}>Zmień nazwę</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            dispatch(removeList(editList))
                            console.log(editList)
                            setModalVisibleSettings(!modalVisibleSettings);
                        }}>
                            <Text style={styles.textStyle}>Usuń listę</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleSettings(!modalVisibleSettings);
                        }}>
                            <Text style={styles.textStyle}>Dodaj znajomych</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleSettings(!modalVisibleSettings);
                        }}>
                            <Text style={styles.textStyle}>Anuluj</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal // Modal edycji listy
                animationType="slide"
                transparent={true}
                visible={modalVisibleEditName}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisibleEditName(!modalVisibleEditName);
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
                        </SafeAreaView>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            dispatch(renameList({id: editList, name: name}))
                            setModalVisibleEditName(!modalVisibleEditName);
                        }}>
                            <Text style={styles.textStyle}>Edytuj listę</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisibleEditName(!modalVisibleEditName);
                        }}>
                            <Text style={styles.textStyle}>Anuluj</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}