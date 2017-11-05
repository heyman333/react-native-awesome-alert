export default class TimeManager {

    static dayTimeCheck(savedTime, now) {
        return (now - savedTime) > (8.64 * Math.pow(10,7))
    }

    static weekTimeCheck(savedTime, now) {
        return (now - savedTime) > (7 * 8.64 * Math.pow(10,7))
    }

    static costomTimeCheck(savedTime, now, settingTime) {
        return (now - savedTime) > settingTime
    }
}