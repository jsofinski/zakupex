import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
});