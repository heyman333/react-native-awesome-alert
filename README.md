## react-native-awesome-alert

[ ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/heyman333/react-native-awesome-alert/pulls)
[ ![NPM version](https://img.shields.io/badge/npm-v0.0.1-blue.svg)](https://www.npmjs.com/package/react-native-awesome-alert)
[![License MIT](http://img.shields.io/badge/license-MIT-orange.svg?style=flat)](https://raw.githubusercontent.com/heyman333/react-native-awesome-alert/master/LICENSE)

✨ Modal component that offers awesome options and costomizable view in React Native

### INSTALLATION
Run `npm install react-native-awesome-alert --save`

### DEMO
![Image](https://thumbs.gfycat.com/DefiantUnimportantEagle-size_restricted.gif)


### API 

#### Props

Thankfully, `react-native-awesome-alert` is using `react-native-check-box` in modal view

so, this props have many similarities with [react-native-check-box](https://github.com/crazycodeboy/react-native-check-box) (author : [crazycodeboy](https://github.com/crazycodeboy))


|Prop            | Type      | Default                |Description                                                              
|----------------|-----------|------------------------|--------------------------------------------------------------
|`styles`        |`object`   |`AwesomeAlert.style.js` |Style Object. Pleae refer to `style.js code` and `example`
|`trnasparent`   |`bool`     |`false`                 |equal to React Native `Modal` prop
|`animationType` |`string`   |`none`                  |equal to React Native `Modal` prop                                  
|`checkedImage`  |`element`  |`Default image`         |Custom checked Image
|`unCheckedImage`|`element`  |`Default image`         |Custom unchecked Image 
|`checkBoxColor `|`string`   |                        |Tint color of the checkbox image 

 
#### Methods
 - `alert(title, messageView, buttons)`

| Arguments    | default  |optional
|--------------|----------|---------
|`title `      |`none`    |`false`
|`messageView `|`none`    |`false`
|`buttons`     |`none`    |`false`

 - `neverAskAlert(title, messagesView, buttons, checkText = " ")`

| Arguments    | default  |optional
|--------------|----------|---------
|`title `      |`none`    |`false`
|`messageView `|`none`    |`false`
|`buttons`     |`none`    |`false`
|`checkText `  |`" "`     |`true`

 - `randomAskAlert(title, messagesView, buttons, checkText = " ", invisibleTime)`

| Arguments     | default  |optional
|-------------- |----------|---------
|`title `       |`none`    |`false`
|`messageView ` |`none`    |`false`
|`buttons`      |`none`    |`false`
|`checkText `   |`" "`     |`true`
|`invisibleTime`|`none`    |`false`


### HOW TO USE

```js
import AwesomeAlert from 'react-native-awesome-alert'

const SimpleView = (
  <View style = {styles.sampleView}>
    <Text style = {styles.sampleViewText}>This is simple alert</Text>
  </View>
)

const NeverAskView = (
  <View style = {styles.sampleView}>
    <Text style = {styles.sampleViewText}>This is "Do not ask again" checkable alert</Text>
  </View>
)

const RandomAskView = (
  <View style = {styles.sampleView}>
    <Text style = {styles.sampleViewText}>This is "Do not ask for 00" checkable alert</Text>
  </View>
)


export default class App extends Component {

  constructor(props){
    super(props)

  }

  onPressSimpleAlert() {
    this.awesomAlert.alert("Hello!!",SimpleView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch")},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}
    ]
  )

  }

  onPresshNeverAskAlert() {
    this.awesomAlert.neverAskAlert("Hello1!!",NeverAskView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch"), id: "helloAlert"},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}
    ],
    "Do not ask again"
  )
    
  }

onPressrandomAskAlert() {
    this.awesomAlert.randomAskAlert("Hello2!!",RandomAskView,
    [
      {text: "OK", onPress: ()=>console.log("OK touch"), id: "helloAlert12", style:{color: 'red'}},
      {text: "Cancel", onPress: ()=>console.log("Cancel touch")}
    ],
    "Do not ask for 10 minutes", 10
  )
  }

  render() {
    return (
      <View style = {styles.container}>
        <AwesomeAlert ref={ref => this.awesomAlert = ref}
          transparent = {true}
          animationType = {'fade'}
        />
        <TouchableOpacity style = {styles.touchButton} onPress={this.onPressSimpleAlert.bind(this)}> 
          <Text style = {styles.toucaButtonTxt}>simple Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.touchButton} onPress={this.onPresshNeverAskAlert.bind(this)}>  
          <Text style = {styles.toucaButtonTxt}>neverAsk Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.touchButton} onPress={this.onPressrandomAskAlert.bind(this)}> 
          <Text style = {styles.toucaButtonTxt}>randomAsk Alert</Text>
        </TouchableOpacity>
      </View>
    )  
  }
}

```
#### The usage of the method is quite similar to React Native's Alert. But, be careful to pass the buttons' `id`. the `id` is used like primary Key in local DB. if not, it warns you that you didn't pass a `id`


### What you need to know
 - If the alert is set to not be visible again, the action of the `button with the ID` is executed. 
 - The checkbox is actually activated only when the `button with the ID` is pressed.

### Contributing
In fact, I've just started React Native, and I'm not used to using `JS` and `npm`. The PR of talented developers is always welcome and appreciated

including .md file😁

### AUTHOR
 - [heyman333](https://github.com/heyman333), Mobile develpor, Seoul, South Korea
 - gglife333@gmail.com


