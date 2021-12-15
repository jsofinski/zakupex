import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
    listContainer: {
        flex: 2,
        flexDirection: 'row',
        paddingTop: 12,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomStartRadius: 0,
        borderBottomWidth: 2,
    },
    item: {
        flex: 1,
        padding: 6,
        fontSize: 24,
        marginHorizontal: 10,
    },
    itemIcon: {
      flex: 0.2,
      padding: 6,
      fontSize: 24,
      marginHorizontal: 10,
    },
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        width: '95%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonSet: {
        padding: 10,
    },
    mainmenu_container: {
        flex: 1,
        padding: 10,
    },
    mainmenu_image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
    },
    button_mainmenu: {
        flexDirection: "column"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#f4511e",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        },
});