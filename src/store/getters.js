import moment from 'moment'
export default {
  roadMaps: state => table => {
    return state.road[table]
  },
  getRoadMaps: state => () => {
    return state.road
  },
  playersInTable: state => table => {
    try {
      return state.tablelist[table].playerLists
    } catch (err) {
      return null
    }
  },
  getLocalTime: state => time => {
    let _time = moment(time).utcOffset(0)
    if (['testing', 'production', 'development'].indexOf(process.env.NODE_ENV) > -1) {
      let utcOffset = moment().utcOffset()
      _time = moment(_time).utcOffset(utcOffset)
    }
    return _time.format('YYYY-MM-DD HH:mm:ss')
  },
  getTotalBetDT: state => {
    let total = 0 // 400 + 800 + 400
    for (let item in state.stacking_dragontiger_bets) {
      total += _.sumBy(state.stacking_dragontiger_bets[item], 'chipValue')
    }
    // console.log('totalx', total)
    return total
  },
  getTotalBetMoneyWheel: state => {
    let total = 0 // 400 + 800 + 400
    for (let item in state.stacking_moneywheel_bets) {
      total += _.sumBy(state.stacking_moneywheel_bets[item], 'chipValue')
    }
    return total
  },
  getTotalBaccarat: state => {
    let total = 0 // 400 + 800 + 400
    for (let item in state.stacking_baccarat_bets) {
      total += _.sumBy(state.stacking_baccarat_bets[item], 'chipValue')
    }
    return total
  }
}
