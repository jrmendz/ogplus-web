import DrawerComponent from '@/components/video/DrawerComponent'
import TimerComponent from '@/components/video/TimerComponent'
import NewTimerComponent from '@/components/video/NewTimerComponent'
import TableInfoComponent from '@/components/video/TableInfoComponent'
import ResultComponent from '@/components/video/ResultComponent'

import ChannelDrawerComponent from '@/components/video/drawer/ChannelDrawerComponent'
import GiftContainer from '@/components/video/GiftContainerComponent'
import HighestBidderComponent from '@/components/video/HighestBidderComponent'
import RouletteStatComponent from '@/components/video/drawer/RouletteStatComponent'
import BaccaratDragonStatComponent from '@/components/video/drawer/BaccaratDragonStatComponent'
import MoneywheelTableInfoComponent from '@/components/video/drawer/MoneywheelTableInfoComponent'
import MiniDrawerComponent from '@/components/video/drawer/MiniDrawerComponent'
import StreamerVideoComponent from '@/components/lobby/Streamer-Video'
import VideoSettings from '@/library/VideoSettings.js'

export default {
  components: {
    DrawerComponent,
    TimerComponent,
    NewTimerComponent,
    TableInfoComponent,
    ChannelDrawerComponent,
    ResultComponent,
    GiftContainer,
    HighestBidderComponent,
    RouletteStatComponent,
    BaccaratDragonStatComponent,
    MoneywheelTableInfoComponent,
    MiniDrawerComponent,
    StreamerVideoComponent
  },
  mixins: [ VideoSettings ],
  data () {
    return {
      startReset: false,
      initialSqueeze: false,
      thirdCardB: null,
      thirdCardP: null
    }
  },
  mounted () {
    this.$store.state.audiosprite['bgm'].stop()
  },
  methods: {
    getTablebidding () {
      let _s = this
      return _s._table.subcode
    },
    isTable: function () {
      let _s = this
      let tableInfo = _s.$store.state.currentTableInfo
      // console.log('tableInfosss', tableInfo)
      if ((tableInfo.name === "BIDDING BACCARAT" || tableInfo.name === "BIDDING NEW DT") && tableInfo.isSideBetting === false)  {
        return true
      } else
        return false
    },
    checkHighest (val) {
      let _s = this
      switch (_s.getBettingtable) {
        case 'baccarat':
          if (val === _s.highestPlayerBidder.userId || val === _s.highestBankerBidder.userId) {
            _s.$store.state.cardSHOWnobet = false
            return true
          }
          break
        case 'dragontiger':
          if (val === _s.highestDragonBidder.userId || val === _s.highestTigerBidder.userId) {
            _s.$store.state.cardSHOWnobet = false
            return true
          }
          break
      }
    },
    checkHighestSTATUS (val) {
      let _s = this
      let stats = null
      stats = 'PB'
      // console.log('val: ', val)
      return stats
      switch (_s.getBettingtable) {
        case 'baccarat':
          if (val === _s.highestBankerBidder.userId && val === _s.highestPlayerBidder.userId) {
            stats = 'PB'
            return stats
          }
          if (val === _s.highestPlayerBidder.userId) {
            stats = 'P'
            return stats
          }
          if (val === _s.highestBankerBidder.userId) {
            stats = 'B'
            return stats
          }
          break
        case 'dragontiger':
          if (val === _s.highestTigerBidder.userId && val === _s.highestDragonBidder.userId) {
            stats = 'DT'
            return stats
          }
          if (val === _s.highestDragonBidder.userId) {
            stats = 'D'
            return stats
          }
          if (val === _s.highestTigerBidder.userId) {
            stats = 'T'
            return stats
          }
          break
      }
    },

    loadGoodTips () {
      let _s = this
      _s.$store.dispatch('GET_GOOD_TIPS', {
        tableNumber: _s.currentTableIndex,
        customPattern: this.$store.state.customPattern,
        isBroadcast: false
      }).then((res) => {
        _s.$store.commit('GOOD_TIPS_UPDATE', res)
      })
    }
  },
  watch: {
    _getCurrentTime: function () {
      let _s = this
      if (_s.initialSqueeze && _s._getCurrentTime === 0) {
        _s.initialSqueeze = false
      }
    },
    getStatus: function () {
      let _s = this
      // console.log(_s.$store.state.message, '_s.$store.state.message')
      switch (_s.$store.state.currentTableInfo.status) {
        case 'shuffling':
          localStorage.removeItem('_bet_' + this.currentTableIndex)
          break;
        case 'betting' :
          _s.startReset = false
          this.$store.dispatch('LOAD_INGAME_ROAD', {
            code: this._table.code,
            tableNumber: this.currentTableIndex,
            shoeGame: this._table.shoeGame
          })
          _s.loadGoodTips()
          // Kick Out Checker
          if (_s.kickOutCtr === 3) {
            setTimeout(function () {
              if (_s.isLobby === false) {
                _s.$store.state.message = 'You have not bet for 3 times, 2 more and you will be redirected to lobby'
              }
            }, 3000)
          } else if (_s.kickOutCtr === 5) {
            _s.$store.dispatch('EXIT_TABLE', {tableid: _s.$store.state.currentTableIndex})
            _s.$store.state.hlsjs.destroy()
            _s.$root.$emit('vDestroy')
            _s.$store.state.rrModal = false
          }
          break
        case 'dealing' :
          _s.startReset = true
          break
        case 'squeeze_start' :
          _s.startReset = true
          break
        case 'squeeze_end' :

          break
        case 'squeezeb_start' :
          _s.$store.state.currentFlipped.thirdCard = true
          _s.$store.state.currentFlipped.squeezeL = true
          _s.$store.state.currentFlipped.squeezeR = false
          _s.thirdCardB = true
          _s.thirdCardP = true
          _s.startReset = true
          break
        case 'squeezep_start' :
          _s.$store.state.currentFlipped.thirdCard = true
          _s.$store.state.currentFlipped.squeezeR = true
          _s.$store.state.currentFlipped.squeezeL = false
          _s.thirdCardP = true
          _s.thirdCardB = true
          _s.startReset = true
          break
        case 'squeezedt_start' :
          console.log('DT START')
          _s.thirdCardP = true
          _s.thirdCardB = true
          break
        case 'squeezep_end' :
          console.log(' END P')
          _s.$store.state.currentFlipped.p3 = true
          break
        case 'squeezeb_end' :
          console.log(' END B')
          _s.$store.state.currentFlipped.b3 = true
          break
        case 'squeezedt_end' :
          console.log('DT END')
          break
        case 'squeeze_time' :
          _s.startReset = true
          _s.thirdCardB = false
          _s.thirdCardP = false
          _s.initialSqueeze = true

          if (_s.getBettingtable === 'dragontiger') {
            _s.thirdCardP = true
            _s.thirdCardB = true
          }
          break
        case 'squeezep_time' :
        case 'squeezeb_time' :
        case 'squeezedt_time' :
          _s.initialSqueeze = true
          break
        case 'default':
          // console.log(_s.$store.state.isConfirm, _s.kickOutCtr, 'Confirm on this round')
          // Check if the player is confirmed a bet if yes reset kickout
          _s.$store.state.isConfirm ? _s.kickOutCtr = 0 : _s.kickOutCtr++
          break
      }
    },
    currentTableIndex: function (n, o) {
      let _s = this
      if (n) {
        this.$store.dispatch('LOAD_INGAME_ROAD', {
          code: this._table.code,
          tableNumber: this.currentTableIndex,
          shoeGame: this._table.shoeGame
        })
        _s.kickOutCtr = 0
      }
    }
  },
  computed: {
    kickOutCtr: {
      get () { return this.$store.state.kickOutCtr },
      set (v) { this.$store.state.kickOutCtr = v }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      }
    },
    RoadInGame: {
      get () {
        return this.$store.state.RoadInGame
      },
      set (val) {
        this.$store.state.RoadInGame = val
      }
    },
    streamerInGame: {
      get () { return this.$store.state.streamer.isInGame }
    },
    getGiftThrown: {
      get () {
        return this.$store.state.giftModalName
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
    currentTableIndex: {
      get () {
        return this.$store.state.currentTableIndex
      }
    },
    table: {
      get () {
        return this.$store.state.currentTableInfo
      }
    },
    getStatus: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
    highestBankerBidder: {
      get () {
        return this._table.highestBankerBidder
      }
    },
    highestPlayerBidder: {
      get () {
        return this._table.highestPlayerBidder
      }
    },
    highestTigerBidder: {
      get () {
        return this._table.highestTigerBidder
      }
    },
    highestDragonBidder: {
      get () {
        return this._table.highestDragonBidder
      }
    },
    rouletteStat: {
      get () { return this.$store.state.betTable.roulette.resultStat },
      set (v) { this.$store.state.betTable.roulette.resultStat = v }
    },
    _table: {
      get () {
        return this.$store.state.tablelist[this.currentTableIndex]
      }
    },
    _getUserID: {
      get () {
        return this.$store.state.userinfo.id
      }
    },
    _getCurrentTime: {
      get () {
        return this.$store.state.currentTableInfo.game.timer
      }
    },
    bankerCards: {
      get () {
        return this._table.game.cards ? this._table.game.cards.banker : ''
      }
    },
    playerCards: {
      get () {
        return this._table.game.cards ? this._table.game.cards.player : ''
      }
    },
    bankerCard1: {
      get () {
        return this.bankerCards.card1 ? this.bankerCards.card1.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard2: {
      get () {
        return this.bankerCards.card2 ? this.bankerCards.card2.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard3: {
      get () {
        if (this.getBettingtable === 'baccarat') {
          return this.bankerCards.card3 ? this.bankerCards.card3.toLowerCase().replace('a', '1') : ''
        }
      }
    },
    playerCard1: {
      get () {
        return this.playerCards.card1 ? this.playerCards.card1.toLowerCase().replace('a', '1') : ''
      }
    },
    playerCard2: {
      get () {
        return this.playerCards.card2 ? this.playerCards.card2.toLowerCase().replace('a', '1') : ''
      }
    },
    playerCard3: {
      get () {
        if (this.getBettingtable === 'baccarat') {
          return this.playerCards.card3 ? this.playerCards.card3.toLowerCase().replace('a', '1') : ''
        }
      }
    },
    dragoncard: {
      get () {
        return this.dragoncardshow ? '--is-' + this.dragoncardshow.toLowerCase().replace('a', '1') : ''
      }
    },
    tigercard: {
      get () {
        return this.tigercardshow ? '--is-' + this.tigercardshow.toLowerCase().replace('a', '1') : ''
      }
    },
    dragoncardshow: {
      get () {
        return this._table.game.cards ? this._table.game.cards.dragon : ''
      }
    },
    tigercardshow: {
      get () {
        return this._table.game.cards ? this._table.game.cards.tiger : ''
      }
    }
  }
}
