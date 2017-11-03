/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import AwesomeAlert from './src/AwesomeAlert'


const SampleView = <Text>Hello!</Text>

export default class App extends Component {

  constructor(props){
    super(props)

  }

  onPressSimpleAlert() {
    this.awesomAlert.alert("Hello!!",SampleView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch")},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}

    ]
  )

  }

  onPresshNeverAskAlert() {
    this.awesomAlert.neverAskAlert("Hello1!!",SampleView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch"), id: "helloAlert"},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}
    ]
  )
    
  }

  onPresshNot24HAlert() {
    this.awesomAlert.notAskDayAlert("Hello2!!",SampleView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch"), id: "helloAlert"},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}
    ]
  )
    
  }


  render() {

    const checkedImg = <Image source = {require("./image/Icon_Check_on.png")} style = {{width: 15, height: 15}}/>
    const unCheckedImg = <Image source = {require("./image/Icon_Check_dim.png")} style = {{width: 15, height: 15}}/>


    return (
      <View style = {styles.container}>
        <AwesomeAlert ref={ref => this.awesomAlert = ref}
          styles = {{checkBoxText: {fontSize: 12, color: 'blue', fontWeight: '600'}, buttonContainer:{flexDirection: 'row', justifyContent: 'space-around'}}}
          transparent = {true}
          animationType = {'fade'}
          neverAskText= {"다시 묻지 않기"}
          notAskDayText= {"하루동안 보지 않기"}
          checkedImage={checkedImg}
          unCheckedImage={unCheckedImg}
          checkBoxColor= 'red'
        />
        <TouchableOpacity style = {styles.touchButton} onPress={this.onPressSimpleAlert.bind(this)}> 
          <Text style = {styles.toucaButtonTxt}>simple Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.touchButton} onPress={this.onPresshNeverAskAlert.bind(this)}>  
          <Text style = {styles.toucaButtonTxt}>neverAsk Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.touchButton} onPress={this.onPresshNot24HAlert.bind(this)}> 
          <Text style = {styles.toucaButtonTxt}>not Ask for 24H Alert</Text>
        </TouchableOpacity>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  touchButton: {
    padding:10
  },
  toucaButtonTxt:{
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20
    
  }
});
