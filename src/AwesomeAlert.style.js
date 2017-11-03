import { Platform, StyleSheet, PixelRatio } from 'react-native'
import { getHeightPercent } from './ratio'

export default {
    modalContainer : { 
        flex: 1,
        backgroundColor: 'rgba(49,49,49, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: { 
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        width: 270
    },
    checkBox: {
        marginBottom: 10
    },
    checkBoxText: {
        marginLeft: 4,
        alignSelf: 'center',
        fontSize: 15,
        justifyContent: 'center'
    },
    textContainer: {
        alignItems: 'center',
        padding: 13,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray'
    },
    titleTxt: {
        fontSize: 17,
        fontWeight: '500',
        padding: 10, 
        alignSelf: 'center'
    },
    messagesTxt: {
        fontSize: 14,
        marginBottom: 100,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        borderColor: 'gray',
        borderTopWidth: StyleSheet.hairlineWidth
    },
    buttonTxt: {
        color: 'rgb(0,122,255)',
        fontSize: 17
    },
    button: {
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 15,
        borderColor: 'gray'
    }
}