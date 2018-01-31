export default class TimeManager {
  static randomeTimeCheck(savedTime, now, invisibleTime) {
    const passdTime = Math.floor((now - savedTime) / (6 * Math.pow(10, 4)))
    return now - savedTime > invisibleTime * (6 * Math.pow(10, 4)) // minute
  }
}
