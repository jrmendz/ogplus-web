/**
 * Table Information Component
 */
import Settings from '@/library/Settings.js'
import Global from '@/library/Global.js'

export default {
  data () {
    return {
      heightStyle: {},
      toggle: false,
      betLimit: [],
      totalBets: [],
      totalWinnings: 0
    }
  },
  mixins: [Settings, Global],
  watch: {
    toggle: function () {
      let _s = this
      _s.clickEff()
    },
    shoeGame: function (value) {
      let _s = this
      _s.resetTotalBets()
    },
    'table.status': function (value) {
      let _s = this
      if (value === 'dealing') {
        _s.$store.state.sidebar_winresult[_s.currentTableIndex] = 0
      }
    },
    'winLoss': function (values) {
      let _s = this

      if (!values) return;

      // console.log("WINLOSSS --", values)
      setTimeout(() => {
        let wl = values.win + values.loss

        if (!isNaN(wl)) {
          _s.$store.state.message = (wl > 0 ? "+" : "") + _s.$options.filters.toMoney(values.win + values.loss)
        }

        if (_s.$store.state.soundFxSwitch) {
          _s.$store.state.audiosprite['spotFX'].play('winchips')
        }
      }, 3000)
    }
  },
  computed: {
    result: {
      get () {
        return _s.$store.state.sidebar_winresult[this.currentTableIndex]
      }
    },
    winLoss: {
      get () {
        return this.$store.state.win_loss[this.currentTableIndex]
      }
    },
    balance: {
      get () {
        return this._User.balance
      },
      set (balance) {
        this.$store.commit('SET_USER_BALANCE', balance)
      }
    },
    currentTableIndex: {
      get () {
        return this._LiveTable || {}
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
    table: {
      get () {
        return this._TableInfo()
      }
    },
    shoeGame: function () {
      return this.table.shoeGame
    }
  },
  methods: {
    changeStatus: function (status) {
      this.$store.state.tablelist['P8'].status = status
    },
    // getHeight () {
    //   let style = this.$refs.tableInfo.clientHeight + 50 + 'px'
    //   this.$set(this.heightStyle, 'top', style)
    // },
    formatToPrice (value) {
      return this.$options.filters.toMoney(value)
    },
    getBetLimits () {
      let _s = this
      let betLimit
      // console.log('get tableeeee', _s.getBettingtable)
      if (this.getBettingtable === 'baccarat') {
        betLimit = [
          { name: 'Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Max Bet:', value: _s._User.otherBetLimits._max },
          { name: 'Tie Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Tie Max Bet:', value: _s._User.otherBetLimits.tie_max },
          { name: 'Pair Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Pair Max Bet:', value: _s._User.otherBetLimits.pair_max },
          { name: 'Super 6 Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Super 6 Max Bet:', value: _s._User.otherBetLimits.ss_max }
        ]
      } else if (this.getBettingtable === 'dragontiger') {
        betLimit = [
          { name: 'Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Max Bet:', value: _s._User.otherBetLimits._max },
          { name: 'Tie Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Tie Max Bet:', value: _s._User.otherBetLimits.tie_max }
        ]
      } else if (this.getBettingtable === 'moneywheel') {
        betLimit = [
          { name: 'Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Max Bet:', value: _s._User.otherBetLimits._max }
        ]
      } else if (this.getBettingtable === 'roulette') {
        betLimit = [
          { name: 'Min Bet:', value: _s._User.otherBetLimits._min },
          { name: 'Max Bet:', value: _s._User.otherBetLimits._max }
        ]
      }
      return betLimit
    },
    getTotalBets () {
      let _s = this
      let totalBets
      if (this.getBettingtable === 'baccarat') {
        totalBets = [
          // { name: 'Banker:', total_bet: _s._TotalBettingPerSection('banker') },
          // { name: 'Player:', total_bet: _s._TotalBettingPerSection('player') },
          // { name: 'Tie:', total_bet: _s._TotalBettingPerSection('tie') },
          // { name: 'Banker Pair:', total_bet: _s._TotalBettingPerSection('banker_pair') },
          // { name: 'Player Pair:', total_bet: _s._TotalBettingPerSection('player_pair') },
          // { name: 'Supersix', total_bet: '0' }
        ]
      } else if (this.getBettingtable === 'dragontiger') {
        totalBets = [
          // { name: 'Dragon:', total_bet: _s._TotalBettingPerSection('dragon') },
          // { name: 'Tiger:', total_bet: _s._TotalBettingPerSection('tiger') },
          // { name: 'Tie', total_bet: _s._TotalBettingPerSection('tie') }
        ]
      } else if (this.getBettingtable === 'moneywheel') {
        totalBets = [
          { name: 'Pays 1x:', total_bet: _s._TotalBettingPerSection('1') },
          { name: 'Pays 2x:', total_bet: _s._TotalBettingPerSection('2') },
          { name: 'Pays 5x:', total_bet: _s._TotalBettingPerSection('5') },
          { name: 'Pays 10x:', total_bet: _s._TotalBettingPerSection('10') },
          { name: 'Pays 20x:', total_bet: _s._TotalBettingPerSection('20') },
          { name: 'Pays 40x:', total_bet: _s._TotalBettingPerSection('og') }
        ]
      }
      return totalBets
    },
    resetTotalBets () {
      let _s = this
      _.forEach(_s.table.totalBettingInfo, function (val, key) {
        val.totalUsers = 0
        val.totalBetAmt = 0
      })
    },
    setMaxTieValue () {
      let _s = this
      _s.$store.state.maxTieValue = Math.ceil(_s._User.max_bet_limit / 8)
    },
    setMinTieValue () {
      let _s = this
      _s.$store.state.minTieValue = _s._User.min_bet_limit
    },
    setMaxPairValue () {
      let _s = this
      _s.$store.state.maxPairValue = Math.ceil(_s._User.max_bet_limit / 11)
    },
    setMinPairValue () {
      let _s = this
      _s.$store.state.minPairValue = _s._User.min_bet_limit
    }
  },
  mounted () {
    let _s = this
    requestAnimationFrame(function () {
      // _s.getHeight()
      _s.setMaxTieValue()
      _s.setMinTieValue()
      _s.setMaxPairValue()
      _s.setMinPairValue()
    })

    _s.getTotalBets()
    _s.resetTotalBets()
  }
}
