/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import CheckAlert from "./src/CheckAlert"

export default class App extends Component {
  constructor(props) {
    super(props)
  }

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
        <CheckAlert
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  touchButton: {
    padding: 10
  },
  toucaButtonTxt: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 20
  },
  sampleView: {
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  sampleViewText: {
    fontSize: 18,
    fontWeight: "600",
    padding: 5,
    textAlign: "center"
  }
})

const SimpleView = (
  <View style={styles.sampleView}>
    <Text style={styles.sampleViewText}>This is simple alert</Text>
  </View>
)

const NeverAskView = (
  <View style={styles.sampleView}>
    <Text style={styles.sampleViewText}>This is "Do not ask again" checkable alert</Text>
  </View>
)

const RandomAskView = (
  <View style={styles.sampleView}>
    <Text style={styles.sampleViewText}>This is "Do not ask for 00" checkable alert</Text>
  </View>
)
