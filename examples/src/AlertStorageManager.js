import { AsyncStorage } from 'react-native'
const KEY_ALERTS = "KEY_ALERTS"

export default class AlertStorageManager {
    constructor(){
    }

    getItem(key) {
        const localDataStr = AsyncStorage.getItem(key).then(data => data)
        return localDataStr
    }

    setItem(key, value) {
        try {
            AsyncStorage.setItem(key,value)
        } catch (error) {
            console.error('AsyncStorage#setItem error: ' + error.message)
        }
    }

    async saveAlert(alertData){
        const localDataStr = await this.getItem(KEY_ALERTS)
        console.log("localDataString: ", localDataStr)

        if (localDataStr == null){
            console.log("this alert is totally new one")
            const alertStrArr = []
            const newAlertObj = alertData
            alertStrArr.push(JSON.stringify(newAlertObj))
            await this.setItem(KEY_ALERTS, alertStrArr.join())
        } else {
            console.log("this alert is new one and local DB was not empty")
            const newAlertObj = alertData
            const newAlertData = localDataStr + " " + JSON.stringify(newAlertObj)
            await this.setItem(KEY_ALERTS, newAlertData)
        }
    }

    async getObjDatasArr() {
        const localDataStr = await this.getItem(KEY_ALERTS)
        console.log("localDataStr:", localDataStr)

        if (localDataStr) {
            const objDatasArr = localDataStr.split(' ').map(obj => JSON.parse(obj))
            return objDatasArr
        } else {
            return null
        }
    }

    async changeDataInfo(alertID, changedData) {
        const localDataStr = await this.getItem(KEY_ALERTS)
        const objDatasArr = localDataStr.split(' ').map(obj => JSON.parse(obj))

        for (let obj of objDatasArr) {
            if (obj.id == alertID) {
                const newObj = Object.assign({},obj, changedData)
                const newData = localDataStr.replace(JSON.stringify(obj), JSON.stringify(newObj))
                await this.setItem(KEY_ALERTS, newData)
                break
            }
        }
    }
    
    async showFalse(alertID){
        const newObj = {show: false, savedTime: Date.now()}
        await this.changeDataInfo(alertID, newObj)
    }

    async showTrue(alertID){
        const newObj = {show: true}
        await this.changeDataInfo(alertID, newObj)
    }

}