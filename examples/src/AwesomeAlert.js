import React, { Component } from 'react'
import CheckBox from 'react-native-check-box'
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
import PropTypes from 'prop-types'
import AlertStorageManager from './AlertStorageManager'
import TimeManager from './TimeManager'
import awesomeAlertStyles from './AwesomeAlert.style'

const styles = {}
const NEVER_ALERT_PREFIX = "neverAskAlert:"
const RANDOM_ALERT_PREFIX = "randomAskAlert:"

export default class AwesomeAlert extends Component {

    static propTypes = {
        styles: PropTypes.object,
        transparent: PropTypes.bool,
        animationType: PropTypes.string,
        checkedImage: PropTypes.element,
        unCheckedImage: PropTypes.element,
        checkBoxColor: PropTypes.string
      }
    
    static defaultProps = {
        styles: awesomeAlertStyles,
        transparent: false,
        animationType: 'none'
      }

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
        this.checkText = " ",
        this.invisibleTime = null
        
        new AlertStorageManager().getObjDatasArr().then(objDatas => {
                                    console.log("outPutData:",objDatas)
                                    this.setState({alertsArr: objDatas})
                                    })
                                    .catch((err) => console.warn("CheckAlert :: getObjDatsaArr err", err.message))

        if (this.props.styles) {
            Object.keys(awesomeAlertStyles).forEach(key => {
                styles[key] = StyleSheet.flatten([
                awesomeAlertStyles[key],
                this.props.styles[key]
            ])
        })
        } else {
            styles = awesomeAlertStyles
        }                                    
    }

    shouldComponentUpdate(nextProps, nextState) {
        const beforeAskAlways = this.state.askAlways
        const beforeModalVisible = this.state.modalVisible
        const { askAlways, modalVisible } = nextState

        if ((beforeAskAlways != askAlways) || (beforeModalVisible != modalVisible)) {
            return true
        } else {
            return false
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    typeChecker(title, messagesView, buttons, checkText, invisibleTime) {
        if (typeof title !== "string" || !(React.isValidElement(messagesView)) || !(Array.isArray(buttons)) || 
            typeof checkText  !== "string" || typeof invisibleTime !== "number") {
            return true
        } else {
            return false
        }   
    }

    parseButton(buttons, isNeverAsk){
        // Search button id
        for (let i in buttons) {
            if(buttons[i].hasOwnProperty("id")) {
                this.modalID = isNeverAsk ? NEVER_ALERT_PREFIX + buttons[i].id : RANDOM_ALERT_PREFIX + buttons[i].id
                this.checkSaveBtnIdx = parseInt(i)
                break
            }
        }
    }        

    alert(title, messagesView, buttons) {
        const typeError = this.typeChecker(title, messagesView, buttons," ",0)
        if (typeError) {
            console.warn("TypeErr, check the alert param"); return
        } 

        this.title = title
        this.messagesView = messagesView
        this.buttons = buttons
        this.checkbox = false

        this.openModal()
    }

    checkAlert(title, messagesView, buttons, checkText, invisibleTime, isNeverAsk) {
        const typeError = this.typeChecker(title, messagesView, buttons, checkText, invisibleTime)
        if (typeError) {
            console.warn("TypeErr, check the alert param"); return
        } 

        let newID = true
        let alertData = null

        this.parseButton(buttons, isNeverAsk)

        if(this.modalID != null) {
            this.title = title
            this.messagesView = messagesView
            this.buttons = buttons
            this.checkbox = true
            this.checkText = checkText
            this.invisibleTime = invisibleTime

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
                alertData = {id: this.modalID, show: true, savedTime: Date.now()}
                new AlertStorageManager().saveAlert(alertData).then(()=>
                {
                    this.openModal(alertData)
                    new AlertStorageManager().getObjDatasArr().then(objDatas => this.setState({alertsArr: objDatas}))
                                             .catch((err) => console.warn("CheckAlert :: getObjDatsaArr2 err", err.message))
                })
             } else {
                 console.log("this is not first alert data. Don't save data")
                 this.openModal(alertData)
             }
        } else {
            console.warn("you missed Alert button's ID")
        }
    }

    neverAskAlert(title, messagesView, buttons, checkText = " ") {
        this.checkAlert(title, messagesView, buttons, checkText,0,true)
    }

    randomAskAlert(title, messagesView, buttons, checkText = " ", invisibleTime) {
        this.checkAlert(title, messagesView, buttons, checkText, invisibleTime, false)
    }

    setModalVisible(visible, buttonIdx = null) {
        if(!visible && !this.state.askAlways && (buttonIdx === this.checkSaveBtnIdx)) {
            const alertStorageManager = new AlertStorageManager()
            alertStorageManager.showFalse(this.modalID).then(()=>
            alertStorageManager.getObjDatasArr().then(objDatas => this.setState({alertsArr: objDatas}))) 
                                                .catch((err) => console.warn("CheckAlert :: getObjDatsaArr3 err", err.message))
        }
        this.setState({modalVisible: visible, askAlways: true})
    }

    openModal(alertData = null) {
        if (alertData == null) {
            this.setModalVisible(true)
            return
        }
        if (alertData.id.includes(RANDOM_ALERT_PREFIX)) {
            const overDay = TimeManager.randomeTimeCheck(alertData.savedTime, Date.now(), this.invisibleTime)
            if (overDay && !alertData.show) {
                const alertStorageManager = new AlertStorageManager()
                alertStorageManager.showTrue(this.modalID).then(()=>
                alertStorageManager.getObjDatasArr().then(objDatas => this.setState({alertsArr: objDatas}))) 
                                                    .catch((err) => console.warn("CheckAlert :: getObjDatsaArr4 err", err.message))
                this.setModalVisible(true)
            }
        }
        
        alertData.show ? this.setModalVisible(true) : this.buttons[this.checkSaveBtnIdx].onPress()
    }

    render(){
        const buttonTextStyle = []

        // apply button style 
        for (let button of this.buttons) {    
            const textStyle = StyleSheet.flatten([
                styles.buttonText,
                button.style
            ])
            buttonTextStyle.push(textStyle)
        }
        return(
            <View>
                <Modal
                    transparent={this.props.transparent}
                    animationType={this.props.animationType}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>this.setModalVisible(false)}>
                    <View style = {styles.modalContainer}>
                        <Animated.View style = {styles.modalView}>
                            <Text style = {styles.titleText}>{this.title}</Text>
                                {this.messagesView}
                                {this.checkbox && this.renderCheckBox()}
                            <View style = {styles.buttonContainer}>
                                {
                                    this.buttons.map((button, index) => {
                                        return (
                                            <TouchableOpacity key = {index} onPress = {()=> {
                                                button.onPress()
                                                this.setModalVisible(false, index)}} 
                                                style = {styles.button}>
                                                <Text style = {buttonTextStyle[index]}>{button.text}</Text>
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

    renderCheckBox() {
        return(
            <CheckBox
                style={styles.checkBox}
                onClick={()=>this.setState({askAlways: !this.state.askAlways})}
                isChecked={!this.state.askAlways}
                rightTextStyle={styles.checkBoxText}
                rightText={this.checkText}
                checkedImage={this.props.checkedImage}
                unCheckedImage={this.props.unCheckedImage}
                checkBoxColor={this.props.checkBoxColor}
            />
            )
    }
}