import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default class FriendsList extends React.Component {
    users: Array<{ key: string, owe: string }> = [];

    constructor(props: any) {
        const currentUser = auth().currentUser;
        if (currentUser != null) {
            database().ref(`/users/${currentUser.uid}/friends`).once('value')
                .then(snapshot => {
                    snapshot.forEach((user) => {
                        if (user.key != null) {
                            this.users.push({
                                key: user.child('nick').val(),
                                owe: user.child('owe').val()
                            });
                        }
                        return undefined;
                    });
                    this.forceUpdate()
                });
        }
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.users}
                    renderItem={({ item }) =>
                        <View style={[styles.friendEntry]}>
                            <TouchableOpacity onPress={() => this.actionOnRow(item)} onLongPress={() => this.longActionOnRow(item)}>
                                <Text style={styles.item}>
                                    name: {item.key}     dłużny: {item.owe}zł
                                </Text>
                                {/* <Image
                                    style={styles.stretch}
                                    source={require('./minus.png')}
                                /> */}
                            </TouchableOpacity>
                        </View>
                    }
                />
                <TouchableOpacity onPress={() => this.addFriend()}>
                    <Image
                        style={styles.addFriendImage}
                        source={require('./person-icon.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    actionOnRow(item: any) {
        console.log('Kliknieto :', item);
        Alert.alert(
            "Czy na pewno chcesz dodac znajomego " + item.key + " do listy?",
            "",
            [
                {
                    text: "Anuluj",
                    onPress: () => console.log("Anulowanie dodawania"),
                    style: "cancel"
                },
                { text: "Dodaj", onPress: () => console.log("Dodaj znajomego") }
            ]
        )
    }
    longActionOnRow(item: any) {
        console.log('Przytrzymano :', item);
        Alert.alert(
            "Czy na pewno chcesz usunac znajomego " + item.key + "?",
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
    addFriend() {
        this.props.navigation.navigate('First')
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        alignSelf: 'flex-start'
    },
    // stretch: {
    //   width: 20,
    //   height: 20,
    //   resizeMode: 'stretch',
    //   alignSelf: 'center',
    // },
    addFriendImage: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        alignSelf: 'center',
    },
    friendEntry: {
        width: Dimensions.get('window').width,
        flexDirection: "row",
    }
});

