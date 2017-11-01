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
  TouchableOpacity
} from 'react-native';
import AwesomeAlert from './src/AwesomeAlert'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


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
    this.awesomAlert.alertWithCheck("Hello2!!",SampleView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch"), id: "helloAlert"},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}
    ]
  )
    
  }

  onPresshNot24HAlert() {
    alert("onPresshNot24HAlert")
    
  }


  render() {
    return (
      <View style = {styles.container}>
        <AwesomeAlert ref={ref => this.awesomAlert = ref}
          styles = {{checkBoxText: {fontSize: 12, color: 'blue', fontWeight: '600'}, buttonContainer:{flexDirection: 'row', justifyContent: 'space-around'}}
                    
        }
          rightText = {"never Ask Again2"}
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
