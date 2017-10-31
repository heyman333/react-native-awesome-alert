const iosStyles = StyleSheet.create({
    modalContainer : { 
        flex: 1,
        backgroundColor: 'rgba(49,49,49, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentsView: { 
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        // width: SceneWidth.getSceneWidth() * 0.8,
        // height: SceneWidth.getHeight() * 0.5
        width: 270,
        marginBottom: 60

    },
    checkbox: {
        marginBottom: 10,
        alignSelf: 'center'
    },
    checkboxText: {
        marginLeft: 4,
        alignSelf: 'center',
        fontSize: 15,
        justifyContent: 'center',
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
})

const androidStyles = StyleSheet.create({
    modalContainer : { 
        flex: 1,
        backgroundColor: 'rgba(49,49,49, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentsView: { 
        backgroundColor: 'white',
        width: SceneWidth.getSceneWidth() * 0.8,
        marginBottom: 60,
        elevation: 10,
        padding: 18

    },
    titleTxt: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 10,
        color: 'rgba(49,49,49,0.9)'
    },
    messagesTxt: {
        fontSize: 14,
        marginBottom: 100,
        marginBottom: 10,
        color: 'rgba(49,49,49,0.9)'
    },
    checkbox: {
    },
    checkboxText: {
        marginLeft: 4,
        alignSelf: 'center',
        fontSize: 15,
        justifyContent: 'center',
        color: 'rgba(49,49,49,0.9)'
    },
    buttonContainer: { 
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonTxt: {
        color: 'rgb(110, 183, 161)',
        fontWeight: '500',
        fontSize: 13
    },
    button: {
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        flex: 0
    }
})

const styles = function() {
    return Platform.OS === 'ios' ? iosStyles : androidStyles
}()