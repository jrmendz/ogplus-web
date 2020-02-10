export default {
  data () {
    return {
      displayMessage: false,
      message: '',
      promptClass: '',
      timer: 0
    }
  },
  mounted: function () {
    requestAnimationFrame(() => {})
  },
  computed: {
    messageWatcher: {
      get () { return this.$store.state.message },
      set (v) { this.$store.state.message = v }
    },
    inGameStatus: {
      get () { return this.tableInfo ? this.tableInfo.status : null }
    },
    tableInfo: {
      get () {
        let $state = this.$store.state
        return $state.currentTableIndex ? $state.tablelist[$state.currentTableIndex] : null
      }
    }
  },
  watch: {
    inGameStatus: function (n) {
      let _s = this
      let message = '', result = ''
      // console.log(n, 'stats!!!!')
      _s.promptClass = ''

      switch(n) {
        case 'betting':
          message = _s.tt('Place your bets')
          break
        case 'dealing':
          _s.$store.state.message = 'No more Bets'
          message = _s.tableInfo.code === 'moneywheel' || _s.tableInfo.code === 'roulette' ? 'Spinning Wheel' : 'Dealing'
          break
        case 'shuffling':
          message = _s.tt('Shuffling') + '...'
          break
        case 'default':
          if (_s.tableInfo) {
            if (_s.tableInfo.name === "ROULETTE") {
              result = _s.tableInfo.game.value
            } else {
              result = !_.isNull(_s.tableInfo) ? !_.isUndefined(_s.tableInfo.game.result) ? _s.tableInfo.game.result.split(',')[0] : '' : ''
            }
          }
          if (['banker', 'tiger'].indexOf(result) > -1) {
            _s.promptClass = '--is-banker'
          } else if (['player', 'dragon'].indexOf(result) > -1) {
            _s.promptClass = '--is-player'
          } else if (['tie', 'dt-tie'].indexOf(result) > -1) {
            _s.promptClass = '--is-tie'
          }
          message = result === 'Og' ? '财' +  _s.tt(' wins!') : _s.tt(result) + _s.tt(result === 'tie' ? '!' : ' wins!')
          break
        case null:
          message = 'CLOSE_IMMEDIATE'
          break
      }
      _s.$store.state.message = message
    },
    messageWatcher: function (n) {
      let _s = this
      let parsedMess
      // Close Immediate Notification
      if (n === 'CLOSE_IMMEDIATE') {
        _s.displayMessage = false
        return 0
      }
      // Do nothing if invalid data passed
      if (!n) return 0

      clearTimeout(_s.timer)
      // Reset values to default
      _s.timer = setTimeout(() => {
        _s.message = ''
        _s.promptClass = ''
        _s.displayMessage = false
        // Reset message data
        _s.$store.state.message = ''
      }, 3000)

      // Parse Message (This is used if you want to pass parameter in a text message)
      parsedMess = _.split(n, '||')
      // Display condition
      _s.displayMessage = true
      _s.message = parsedMess[0]
      if (!_.isUndefined(parsedMess[1])) { _s.promptClass = parsedMess[1] }
    }
  }

}
