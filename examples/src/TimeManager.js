export default class TimeManager {
    static randomeTimeCheck(savedTime, now, invisibleTime) {
        const passdTime = Math.floor((now - savedTime) / (6 * Math.pow(10,4)))
        console.log(`${passdTime} minutes have paseed after the alert is set to be invisible`)
        return (now - savedTime) > invisibleTime * (6 * Math.pow(10,4)) // minute
    }
}