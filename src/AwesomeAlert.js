import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    AsyncStorage,
    Platform,
    Animated,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import AlertStorageManager from './AlertStorageManager'

const {width, height} = Dimensions.get('window')

export default class AwesomeAlert extends Component {

    // static propTypes = {
    //   }
    
    // static defaultProps = {
    //   }

    constructor(props){
        super(props)
        this.state = { 
            modalVisible : false,
            askAlways: true,
            alertsArr: []
        }

        this.checkbox = true
        this.modalID = null
        this.checkSaveBtnIdx = null
        this.title = " "
        this.messagesView = null
        this.buttons = []
        this.buttonStyles = []
        
        this.scaleValue = new Animated.Value(0)

        new AlertStorageManager().getObjDatasArr().then(objDatas => 
                                    this.setState({alertsArr: objDatas}))
                                    .catch((err) => console.log("CheckAlert :: getObjDatsaArr err", err.message))

    }

    shouldComponentUpdate(nextProps, nextState) {
        const beforeAskAlways = this.state.askAlways
        const beforeModalVisible = this.state.modalVisible
        const { askAlways, modalVisible } = nextState

        if ((beforeAskAlways != askAlways) || (beforeModalVisible != modalVisible) ) {
            return true
        } else {
            return false
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    typeChecker(title, messagesView, buttons) {
        if (typeof title !== "string" || !(React.isValidElement(messagesView)) ||
            !(Array.isArray(buttons))) {
            return true
        } else {
            return false
        }   
    }

    parseButton(buttons){
        // Search button id
        for (let i in buttons) {
            if(buttons[i].hasOwnProperty("id")) {
                this.modalID = buttons[i].id
                this.checkSaveBtnIdx = parseInt(i)
                break
            }
        }
        // apply button style 
        for (let button of buttons) {    
            const buttonStyle = StyleSheet.flatten([
                styles.buttonTxt,
                button.style
            ])
            this.buttonStyles.push(buttonStyle)
        }        
    }

    alert(title, messagesView, buttons){

        let typeError = this.typeChecker(title, messagesView, buttons)
        if (typeError) {
            console.warn("TypeErr, check the alert param"); return
        } 

        this.parseButton(buttons)
        this.title = title
        this.messagesView = messagesView
        this.buttons = buttons
        this.checkbox = false

        this.openModal()

    }

    alertWithCheck(title, messagesView, buttons) {
        console.log("alertArr:", this.state.alertsArr)

        let typeError = this.typeChecker(title, messagesView, buttons)
        if (typeError) {
            console.warn("TypeErr, check the alert param"); return
        } 

        let newID = true
        let alertData = null

        this.parseButton(buttons)

        if(this.modalID != null) {
            this.title = title
            this.messagesView = messagesView
            this.buttons = buttons

            if(this.state.alertsArr != null){
                for (let alert of this.state.alertsArr) {
                     if (alert.id == this.modalID) {
                         newID = false 
                         alertData = alert
                         break
                     }
                 }
             }
     
             if (newID) {
                 alertData = {id: this.modalID, show: true}
                 new AlertStorageManager().saveAlertId(this.modalID).then(()=>
                 {
                     this.openModal(alertData)
                     new AlertStorageManager().getObjDatasArr().then(objDatas => this.setState({alertsArr: objDatas}))
                                         .catch((err) => console.log("CheckAlert :: getObjDatsaArr2 err", err.message))
                 }
                 )
             } else {
                 console.log("this is not first alert data. Don't save data")
                 this.openModal(alertData)
             }
        } else {
            console.warn("you missed Alert button's ID")
        }
    }

    setModalVisible(visible, buttonIdx = null) {
        if(!visible && !this.state.askAlways && (buttonIdx === this.checkSaveBtnIdx)) {
            new AlertStorageManager().showFalse(this.modalID).then(()=>
            new AlertStorageManager().getObjDatasArr().then(objDatas => this.setState({alertsArr: objDatas}))) 
                                 .catch((err) => console.log("CheckAlert :: getObjDatsaArr3 err", err.message))
        }

        this.setState({modalVisible: visible, askAlways: true})
    }

    openModal(alertData = null) {
        if (alertData == null) {
            this.setModalVisible(true)
            return
        }
        alertData.show ? this.setModalVisible(true) : this.buttons[this.checkSaveBtnIdx].onPress()
    }

    render(){
        const viewScale = this.scaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1]
        })
        const opacityValue = this.scaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
        const dynamicContainerStyle = {}
        const dynamicButtonStyle = {}
        if (this.buttons.length > 2) {
            dynamicContainerStyle.flexDirection = 'column'
            dynamicButtonStyle.flex = 0
            dynamicButtonStyle.borderBottomWidth = StyleSheet.hairlineWidth 

        } else {
            dynamicContainerStyle.flexDirection = 'row'
            dynamicButtonStyle.flex = 1 
            dynamicButtonStyle.borderRightWidth = StyleSheet.hairlineWidth 
        }

        return(
            <View>
                <Modal
                    transparent
                    visible={this.state.modalVisible}
                    onShow={()=>this.scaleDown()}
                    onRequestClose={()=>this.setModalVisible(false)}>
                    <View style = {styles.modalContainer}>
                        <Animated.View style = {[styles.contentsView, {transform: [{scale: viewScale}], opacity: opacityValue}]}>
                            <Text style = {styles.titleTxt}>{this.title}</Text>
                            {this.messagesView}
                            
                            <View style = {[dynamicContainerStyle, styles.buttonContainer]}>
                                {
                                    this.buttons.map((button, index) => {
                                        return (
                                            <TouchableOpacity key = {index} onPress = {()=> {
                                                button.onPress()
                                                this.setModalVisible(false, index)
                                            }} style = {[dynamicButtonStyle, styles.button]}>
                                                <Text style = {this.buttonStyles[index]}>{button.text}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
            </View>
        )
    }

    // renderCheckBox() {
    //     return(
    //         <Checkbox style={styles.checkbox} leftIcon text={I18n.t("CheckAlert.notAskAgain")}
    //             textStyle={styles.checkboxText} isSelected={!this.state.askAlways}
    //             onPress={() => this.setState({askAlways: !this.state.askAlways})}/>
    //     )
    // }

    //Animation Function
    scaleDown() {
        Animated.timing(
           this.scaleValue,
           {
             toValue: 1,
             duration: 200,
             useNativeDriver: true
           }
       ).start()
    }
}

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
        width: height * 0.8,
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