import Global from '@/library/Global.js'
import GoodTipsHelper from '@/helpers/GoodTipsHelper.js'

export default {
  mixins: [ GoodTipsHelper, Global ],
  props: {
    table: '',
    index: ''
  },
  computed: {
    // isActiveCategory () {
    //   var _s = this
    //   let categories = _s.$store.state.filters.gamelist.filter(function (category) {
    //     if (category.isActive) {
    //       return category
    //     }
    //   })
    //
    //   // if category is empty return this
    //   if (categories.length === 0) {
    //     return _s.$store.state.filters.gamelist.filter(function (category) {
    //       if (!category.isActive) {
    //         return category
    //       }
    //     })
    //   }
    //   return categories
    // },
    // onlinePlayers: {
    //   get () {
    //     let _s = this
    //     return _s.$store.state.userinfo.onlinePlayers
    //   },
    //
    //   set (onlinePlayers) {
    //     let _s = this
    //     _s.$store.commit('SET_ONLINE_PLAYERS', onlinePlayers)
    //   }
    // },
    //
    // tables: {
    //   get () {
    //     return this.$store.state.tablelist
    //   }
    // }
  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    // getvideo: function () {
    //   let _s = this
    //   let tableNumber = _s.$store.state.currentTableInfo.tableNumber
    //   _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableNumber.charAt(0) + 'game' + tableNumber.substr(1) + 'table1.m3u8')
    //   _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
    //   _s.$store.state.hlsPlayer.play()
    // },
    enterGame: function (table, index) {
      let _s = this
      _s.clickEff()
      let confirmed = localStorage.getItem('_confirm')
      let playerCount = table.playerLists.length
      let tableInfo = {
        data: table,
        tableid: index
      }

      if (confirmed === 'off') {
        // if (table.code !== 'moneywheel') {
        //   if (parseInt(this.$store.state.userinfo.balance) >= this.$store.state.chipsminbalance) {
        //     // _s.$store.dispatch('ENTER_TABLE', tableInfo)
        //     _s.$store.dispatch(playerCount >= 5 ? 'ENTER_SIDEBET' : 'ENTER_TABLE', { data: tableInfo, tableid: index })
        //   } else {
        //     _s.$store.state.message = 'minimum balance is ' + _s.$store.state.chipsminbalance
        //   }
        // } else {
        //   _s.$store.dispatch('ENTER_TABLE', { data: tableInfo, tableid: index })
        //   if (_s.$store.state.isLobby !== true) {
        //     // console.log('BALDOG!!!', '//stream.oriental-game.com/hls/' + tableInfo.tableid.charAt(0) + 'game' + tableInfo.tableid.substr(1) + 'table1.m3u8')
        //     _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableInfo.tableid.charAt(0) + 'game' + tableInfo.tableid.substr(1) + 'table1.m3u8')
        //     _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
        //     _s.$store.state.hlsPlayer.play()
        //   }
        // }
        _s.$store.dispatch('ENTER_TABLE', { data: tableInfo, tableid: index })
        if (_s.$store.state.isLobby !== true) {
          // console.log('BALDOG!!!', '//stream.oriental-game.com/hls/' + tableInfo.tableid.charAt(0) + 'game' + tableInfo.tableid.substr(1) + 'table1.m3u8')
          _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableInfo.tableid.charAt(0) + 'game' + tableInfo.tableid.substr(1) + 'table1.m3u8')
          _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
          _s.$store.state.hlsPlayer.play()
        }
      }
    },
    sidebetGame (table, index, tables) {
      let _s = this
      _s.clickEff()
      let tableInfo = {
        data: table,
        tableid: index
      }
      let confirmed = localStorage.getItem('_confirm')
      if (confirmed === 'off') {
        _s.$store.dispatch('ENTER_TABLE', { data: tableInfo, tableid: index })
        if (_s.$store.state.isLobby !== true) {
          _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableInfo.tableid.charAt(0) + 'game' + tableInfo.tableid.substr(1) + 'table1.m3u8')
          _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
          _s.$store.state.hlsPlayer.play()
        }
      }
    },
    notification: function (message) {
      // let value = true
      this._NotifyUser(message, 'info')
      // this.$store.commit('SET_USER_NOTIFICATION', {value, message})
    },
    timer: function (tableName) {
      return this.$store.state.tablelist[tableName].game.timer ? this.$store.state.tablelist[tableName].game.timer : 0
    },
    toggleTile: function () {
      let _s = this
      _s.$data.tile = true
      _s.$data.list = false
    },

    toggleList: function () {
      let _s = this
      _s.$data.tile = false
      _s.$data.list = true
    }
  }
}
