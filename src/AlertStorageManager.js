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
    
    async showFalse(alertID){
        const localDataStr = await this.getItem(KEY_ALERTS)
        const objDatasArr = localDataStr.split(' ').map(obj => JSON.parse(obj))

        for (let obj of objDatasArr) {
            if (obj.id == alertID) {
                const newObj = Object.assign({}, obj,{show: false, savedTime: Date.now()})
                const newData = localDataStr.replace(JSON.stringify(obj), JSON.stringify(newObj))
                console.log("new Data: ", newData)
                await this.setItem(KEY_ALERTS, newData)
                break
            }
        }
    }

    async showTrue(alertID){
        const localDataStr = await this.getItem(KEY_ALERTS)
        const objDatasArr = localDataStr.split(' ').map(obj => JSON.parse(obj))

        for (let obj of objDatasArr) {
            if (obj.id == alertID) {
                const newObj =Object.assign({}, obj,{show: true})
                const newData = localDataStr.replace(JSON.stringify(obj), JSON.stringify(newObj))
                console.log("new Data: ", newData)
                await this.setItem(KEY_ALERTS, newData)
                break
            }
        }
    }

}