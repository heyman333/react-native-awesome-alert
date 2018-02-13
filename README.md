## react-native-awesome-alert

[ ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/heyman333/react-native-awesome-alert/pulls)
[ ![NPM version](https://img.shields.io/badge/npm-0.2.2-blue.svg)](https://www.npmjs.com/package/react-native-awesome-alert)
[![License MIT](http://img.shields.io/badge/license-MIT-orange.svg?style=flat)](https://raw.githubusercontent.com/heyman333/react-native-awesome-alert/master/LICENSE)
[![License MIT](https://img.shields.io/badge/downloads-100%2Fmonth-brightgreen.svg)](https://www.npmjs.com/package/react-native-awesome-alert)


Customizable modal components with ✔️check options in React Native

### INSTALLATION

#### npm 
Run `npm install react-native-awesome-alert --save`

#### yarn
Run `yarn add react-native-awesome-alert`

### DEMO
- It works on both iOS and android well
- The style in the gif is just an example. You can reconfigure styles fully<br><br>
![Image](https://thumbs.gfycat.com/DefiantUnimportantEagle-size_restricted.gif)


### API 

#### Props

Thankfully, `react-native-awesome-alert` is using `react-native-check-box` in modal view

so, this props have many similarities with [react-native-check-box](https://github.com/crazycodeboy/react-native-check-box) (author : [crazycodeboy](https://github.com/crazycodeboy))


|Prop            | Type      | Default                |Description                                                              
|----------------|-----------|------------------------|--------------------------------------------------------------
|`styles`        |`object`   |`AwesomeAlert.style.js` |please refer to `STYLING` section 😁
|`trnasparent`   |`bool`     |`false`                 |equal to React Native `Modal` prop
|`animationType` |`string`   |`none`                  |equal to React Native `Modal` prop                                  
|`checkedImage`  |`element`  |`Default image`         |Custom checked Image
|`unCheckedImage`|`element`  |`Default image`         |Custom unchecked Image 
|`checkBoxColor `|`string`   |`black`                 |Tint color of the checkbox image 

 
#### Methods
 - `alert(title, messageView, buttons)`

| Arguments    |type      | default  |optional
|--------------|----------|----------|--------
|`title `      |`string`  |`none`    |`false`
|`messageView `|`element` |`none`    |`false`
|`buttons`     |`array`   |`none`    |`false`

 - `neverAskAlert(title, messagesView, buttons, checkText = " ")`
 
| Arguments    |type      | default  |optional
|--------------|----------|----------|--------
|`title `      |`string`  |`none`    |`false`
|`messageView `|`element` |`none`    |`false`
|`buttons`     |`array`   |`none`    |`false`
|`checkText`   |`string`  |`" "`     |`true`


 - `randomAskAlert(title, messagesView, buttons, checkText = " ", invisibleTime)`
 
| Arguments    |type              | default  |optional
|--------------|------------------|----------|--------
|`title `      |`string`          |`none`    |`false`
|`messageView `|`element`         |`none`    |`false`
|`buttons`     |`array`           |`none`    |`false`
|`checkText`   |`string`          |`" "`     |`true`
|`invisibleTime`|`number(minute)` |`none`    |`false`


### HOW TO USE

```js

import AwesomeAlert from "react-native-awesome-alert"

const NeverAskView = (
  <View style={styles.sampleView}>
    <Text style={styles.sampleViewText}>This is "Do not ask again" checkable alert</Text>
  </View>
)

...

export default class App extends Component {

  onPressSimpleAlert() {
    this.awesomAlert.alert("Hello!!", SimpleView, [
      { text: "OK", onPress: () => console.log("OK touch") },
      { text: "Cancel", onPress: () => console.log("Cancel touch") }
    ])
  }

  onPresshNeverAskAlert() {
    this.awesomAlert.neverAskAlert(
      "Hello1!!",
      NeverAskView,
      [
        { text: "OK", onPress: () => console.log("OK touch"), id: "helloAlert" },
        { text: "Cancel", onPress: () => console.log("Cancel touch") }
      ],
      "Do not ask again"
    )
  }

  onPresshNot24HAlert() {
    this.awesomAlert.randomAskAlert(
      "Hello2!!",
      RandomAskView,
      [
        { text: "OK", onPress: () => console.log("OK touch"), id: "helloAlert12" },
        { text: "Cancel", onPress: () => console.log("Cancel touch") }
      ],
      "Do not ask for 3 minutes",
      3
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <AwesomeAlert
          styles={{
            modalContainer: { backgroundColor: "rgba(49,49,49,0.8)" },
            checkBox: { padding: 10 },
            modalView: { marginBottom: 10, borderRadius: 0 }
          }}
          ref={ref => (this.awesomAlert = ref)}
          transparent={true}
          animationType={"fade"}
        />
        <TouchableOpacity style={styles.touchButton} onPress={this.onPressSimpleAlert.bind(this)}>
          <Text style={styles.toucaButtonTxt}>simple Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchButton}
          onPress={this.onPresshNeverAskAlert.bind(this)}
        >
          <Text style={styles.toucaButtonTxt}>neverAsk Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchButton} onPress={this.onPresshNot24HAlert.bind(this)}>
          <Text style={styles.toucaButtonTxt}>randomAsk Alert</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

```
#### The usage of the method is quite similar to React Native's Alert. But, be careful to pass the buttons' `id`. the `id` is used like primary Key in local DB. if not, it warns you that you didn't pass a `id`

### STYLING
 
```js
export default {
    modalContainer : { 
        flex: 1,
        backgroundColor: 'rgba(49,49,49, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: { 
        backgroundColor: '#rgb(235,233,227)',
        borderRadius: 15,
        width: 275,
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth
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
    titleText: {
        fontSize: 17,
        fontWeight: '600',
        padding: 15, 
        alignSelf: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderColor: 'gray',
        borderTopWidth: StyleSheet.hairlineWidth
    },
    buttonText: {
        fontSize: 17
    },
    button: {
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 15,
        borderColor: 'gray'
    }
}
```

#### The above keys are uesd for styling the entire `view`. you just pass the object value like this 

```js
<AwesomeAlert
    styles={{
      modalContainer: { backgroundColor: "rgba(49,49,49,0.8)" },
      checkBox: { padding: 10 },
      modalView: { marginBottom: 10, borderRadius: 0 }
    }}
/>
```



### WHAT YOU NEED TO KNOW
 - If the alert is set to not be visible again, the action of the `button with the ID` is executed. 
 - The checkbox is actually activated only when the `button with the ID` is pressed.

### CONTRIBUTING
The PR of talented developers is always welcome and appreciated

including .md file😁

### AUTHOR
 - [heyman333](https://github.com/heyman333), Mobile developer, Seoul, South Korea
 - [gglife333@gmail.com](mailto:gglife333@gmail.com)



