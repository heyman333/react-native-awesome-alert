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
import awesomeAlertStyles from './AwesomeAlert.style'

const styles = {}

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
            this.checkbox = true

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
                                         .catch((err) => console.warn("CheckAlert :: getObjDatsaArr2 err", err.message))
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
                                 .catch((err) => console.warn("CheckAlert :: getObjDatsaArr3 err", err.message))
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

        return(
            <View>
                <Modal
                    transparent
                    visible={this.state.modalVisible}
                    onShow={()=>this.scaleDown()}
                    onRequestClose={()=>this.setModalVisible(false)}>
                    <View style = {styles.modalContainer}>
                        <Animated.View style = {[styles.modalView, {transform: [{scale: viewScale}], opacity: opacityValue}]}>
                            <Text style = {styles.titleTxt}>{this.title}</Text>
                            {this.messagesView}
                            {this.checkbox && this.renderCheckBox()}
                            <View style = {styles.buttonContainer}>
                                {
                                    this.buttons.map((button, index) => {
                                        return (
                                            <TouchableOpacity key = {index} onPress = {()=> {
                                                button.onPress()
                                                this.setModalVisible(false, index)
                                            }} style = {styles.button}>
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

    renderCheckBox() {
        return(
            <CheckBox
                style={styles.checkBox}
                onClick={()=>this.setState({askAlways: !this.state.askAlways})}
                isChecked={!this.state.askAlways}
                rightTextStyle={styles.checkBoxText}
                rightText={this.props.rightText}
                leftTextStyle={styles.checkBoxText}
                leftText={this.props.leftText}
            />
            )
    }

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