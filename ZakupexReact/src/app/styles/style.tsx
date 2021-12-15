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
    },
    item: {
        padding: 6,
        backgroundColor: 'pink',
        fontSize: 24,
        marginHorizontal: 10
    },
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        width: 200,
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
    }
});