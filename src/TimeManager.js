const TimeManager = {
  randomeTimeCheck(savedTime, now, invisibleTime) {
    return now - savedTime > invisibleTime * (6 * Math.pow(10, 4)) // minute
  },
}

export default TimeManager
