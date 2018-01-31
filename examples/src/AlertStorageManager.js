import { AsyncStorage } from "react-native"
const KEY_ALERTS = "KEY_ALERTS"

export default class AlertStorageManager {
  getItem(key) {
    const localDataStr = AsyncStorage.getItem(key).then(data => data)
    return localDataStr
  }

  setItem(key, value) {
    try {
      AsyncStorage.setItem(key, value)
    } catch (error) {
      console.error(error.message)
    }
  }

  async saveAlert(alertData) {
    const localDataStr = await this.getItem(KEY_ALERTS)

    if (localDataStr == null) {
      const alertStrArr = []
      const newAlertObj = alertData
      alertStrArr.push(JSON.stringify(newAlertObj))
      this.setItem(KEY_ALERTS, alertStrArr.join())
    } else {
      const newAlertObj = alertData
      const newAlertData = localDataStr + " " + JSON.stringify(newAlertObj)
      this.setItem(KEY_ALERTS, newAlertData)
    }
  }

  async getObjDatasArr() {
    const localDataStr = await this.getItem(KEY_ALERTS)

    if (localDataStr) {
      const objDatasArr = localDataStr.split(" ").map(obj => JSON.parse(obj))
      return objDatasArr
    } else {
      return null
    }
  }

  async changeDataInfo(alertID, changedData) {
    const localDataStr = await this.getItem(KEY_ALERTS)
    const objDatasArr = localDataStr.split(" ").map(obj => JSON.parse(obj))

    for (let obj of objDatasArr) {
      if (obj.id == alertID) {
        const newObj = Object.assign({}, obj, changedData)
        const newData = localDataStr.replace(JSON.stringify(obj), JSON.stringify(newObj))
        this.setItem(KEY_ALERTS, newData)
        break
      }
    }
  }

  showFalse(alertID, callBack) {
    const newObj = { show: false, savedTime: Date.now() }
    this.changeDataInfo(alertID, newObj).then(() => callBack())
  }

  showTrue(alertID, callBack) {
    const newObj = { show: true }
    this.changeDataInfo(alertID, newObj).then(() => callBack())
  }
}
