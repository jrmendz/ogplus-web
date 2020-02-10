/**
 * IMPORTANT! Add function here that can only be used globally
 * 1. Use _ for declaration of global function, computed
 */
export default {
  data () {
    return {
      NotifDefaultDelay: 500,
      follow: 0
    }
  },
  created () {
    let _s = this
    let deftab = localStorage.getItem('_deftab')
    _s.$store.state.lobbyTable = deftab === 'streamer' ? _s.$store.state.filters.gamelist[0].name : deftab
  },
  mounted: function () {

  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    directtableNo: function (index) {
      var _s = this
      let confirmed = _s.$store.state.isConfirm
      if (index !== 'Lobby') {
        let tableResult = _.find(_s.$store.state.tablelist, function (o) {
          return o.tableNumber === index
        })
        let tableInfo = {
          data: tableResult,
          tableid: index
        }
        if (!confirmed) {
          _s.$store.dispatch('ENTER_TABLE', tableInfo).then((res) => {
            _s.closeModal()
            _s.getvideo()
          })
        } else {
          _s.$store.state.message = 'You can\'t exit with confirmed bets'
        }
      } else {
        if (confirmed === 'off' || confirmed === false) {
          let tableInfo = {
            data: _s.$store.state.currentTableInfo,
            tableid: _s.$store.state.currentTableIndex
          }
          _s.$store.dispatch('EXIT_TABLE', tableInfo).then((res) => {
            _s.closeModal()
          })
        }
      }
    },
    closeModal: function () {
      let _s = this
      _s.$store.state.chipModal = false
      _s.$store.state.rankModal = false
      _s.$store.state.socialModal = false
      _s.$store.state.giftModal = false
      _s.clickEff()
    },
    capitalizeName: function (name) {
      return name.toUpperCase() + name.slice(1)
    },
    processExit: function (tableInfo) {
      let _s = this
      let $state = _s.$store.state

      // This will remove user/player from the table
      if (!_.isNull(tableInfo.tableid)) {
        _s.$store.dispatch('EXIT_TABLE', tableInfo).then((res) => {
          if ($state.isStreamer === false) {
            _s.$root.$emit('vDestroy')
          }
          // Check if there's a valid HLS playing
          if (!_.isUndefined(_s.$store.state.hlsjs)) {
            _s.$store.state.hlsjs.stopLoad()
            _s.$store.state.hlsjs.destroy()
          }
        }, (err) => {
          console.log('Error - exit (whatButton)', err)
        })
      }
    },
    exit (whatButton) {
      let _s = this
      let $state = _s.$store.state
      let lsBet
      // Validators
      if ($state.currentTableIndex) {
        lsBet = JSON.parse(localStorage.getItem('_bet_' + $state.currentTableIndex))
      }

      if (!lsBet) {
        let tableInfo = {
          data: $state.currentTableInfo,
          tableid: $state.currentTableIndex
        }
        // Check if player has confimed bet
        if (_s.$store.state.isConfirm) {
          console.log('Cannot logout when having confirm bet')
        } else {
          // Validator
          if (typeof whatButton === 'undefined' || !whatButton) whatButton = '-888-'
          // Exit Procedure
          switch (whatButton.toLowerCase()) {
            case 'home':
              _s.processExit(tableInfo)
              break
            case 'logout':
              if (!_.isNull(tableInfo.tableid)) {
                _s.processExit(tableInfo)
              }
              _s.$store.dispatch('AUTH_LOGOUT', tableInfo)
              break
            default:
              // _s.$store.dispatch('EXIT_TABLE', tableInfo)
              _s.processExit(tableInfo)
              break
          }
        }
        // console.log($state.isStreamer, '$state.isStreamer')
        // $state.isStreamer = false
        $state.isNiuniu = false
        $state.is3Cards = false
        $state.hideTabOnLobby = false
      } else {
        _s.$store.state.message = 'You can\'t exit with confirmed bets'
      }
    },

    _NotifyUser: function (type) {
      // this.$snotify.success(message)
      // this.$snotify[type]('Example body content', 'Example Title')
      this.$snotify.html(`<div class="snotifyToast__title"><b>Html Bold Title</b></div>
  <div class="snotifyToast__body"><i>Html</i> <b>toast</b> <u>content</u></div> `, {
        position: 'centerCenter'
      })
      // let _s = this
      // let $s = _s.$store.state
      // let notifClass = '--is-info'
      //
      // // Notification class selector
      // switch (type) {
      //   case 'info' : notifClass = '--is-info'; break
      //   case 'error' : notifClass = '--is-error'; break
      //   case 'warn' : notifClass = '--is-warn'; break
      //   default: notifClass = '--is-info'; break
      // }
      // // Showing
      // internalShow({ message: message, notifClass: notifClass, hideDelay: _s.NotifDefaultDelay })
      //
      // function internalShow (toast) {
      //   if ($s.notifs.lastMsg === toast.message) { clearTimeout($s.notifs.debounce) }
      //   $s.notifs.lastMsg = toast.message
      //   $s.notifs.debounce = setTimeout(function () {
      //     $s.notifs.lastMsg = null
      //     $s.notifs.stack.push(toast)
      //     // Check if the stack is not empty
      //     if ($s.notifs.stack.length === 1) {
      //       showStacked(toast)
      //     }
      //   }, $s.notifs.coolDown)
      // }
      // function showStacked (opt) {
      //   // Return if there is no notification on queue
      //   if (!$s.notifs.stack.length) return
      //   // Show Notification
      //   $s.notifs.show = true
      //   $s.notifs.active = $s.notifs.stack[0]
      //   _s.$store.dispatch('NotifDefer', opt).then(() => { showStacked() })
      // }
    },
    _SortAlphaNum: function (array) {
      return array.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    },
    _ToMoney: function (value) {
      return this.$options.filters.toMoney(value)
    }
  },
  computed: {
    nickname: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.nickname
      },

      set (nickname) {
        let _s = this
        _s.modified = true
        _s.$store.commit('SET_USER_NICKNAME', nickname)
      }
    },
    balance: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.balance
      },
      set (balance) {
        let _s = this
        _s.$store.commit('SET_USER_BALANCE', balance)
      }
    },
    // Used to select specific table information, If no argument found it will return current table info
    currentTableIndex: {
      get () {
        return this.$store.state.currentTableIndex
      }
    },
    countfollowers: {
      get () {
        try {
          let _s = this
          let getresult = _.find(_s.$store.state.dealerfollowers, function (o) { return o.dealerscode === parseInt(_s._tables.dealer.rid) })
          if (getresult) {
            _s.follow = getresult.followers < 0 ? 0 : getresult.followers
            return _s.follow
          } else {
            _s.follow = 0
            return _s.follow
          }
        } catch (err) {
          // console.log('countfollowers', err)
        }
      }
    },
    _tables: {
      get () {
        let _s = this
        return _s.$store.state.tablelist[_s.currentTableIndex]
      }
    },
    _TableInfo: {
      get () {
        return function (index) {
          let _s = this
          if (typeof index === 'undefined') index = _s._LiveTable
          return _s.$store.state.tablelist[index]
        }
      }
    },
    // Used to select and set current table/index
    _LiveTable: {
      get () {
        return this.$store.state.currentTableIndex
      },
      set (v) {
        this.$store.state.currentTableIndex = v
      }
    },
    _TotalBettingPerSection: {
      get () {
        return function (section, index) {
          let _s = this
          if (typeof index === 'undefined' || index === null) index = _s._LiveTable
          if (typeof section === 'undefined') return 0
          return _s.$store.state.tablelist[index].totalBettingInfo[section].totalBetAmt
        }
      }
    },
    _TableGameSet: {
      get () {
        return function (index) {
          let _s = this
          if (typeof index === 'undefined' || index === null) index = _s._LiveTable
          return _s.$store.state.tablelist[index].gameSet
        }
      }
    },
    _TableShoeGame: {
      get () {
        return function (index) {
          let _s = this
          if (typeof index === 'undefined' || index === null) index = _s._LiveTable
          return _s.$store.state.tablelist[index].shoeGame
        }
      }
    },
    // Used to check if the player in lobby or not
    _InLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (v) {
        this.$store.state.isLobby = v
      }
    },
    _ChatModal: {
      get () {
        return this.$store.state.chatModal
      },
      set (v) {
        this.$store.state.chatModal = v
      }
    },
    // Used to toggle social modal
    _SocialModal: {
      get () {
        return this.$store.state.socialModal
      },
      set (v) {
        this.$store.state.socialModal = v
      }
    },
    // Used to toggle record/report modal
    _ReportModal: {
      get () {
        return this.$store.state.rrModal
      },
      set (v) {
        this.$store.state.rrModal = v
      }
    },
    // Used to toggle record/report modal
    _SettingModal: {
      get () {
        return this.$store.state.settingModal
      },
      set (v) {
        this.$store.state.settingModal = v
      }
    },
    _GiftModal: {
      get () {
        return this.$store.state.giftModal
      },
      set (v) {
        this.$store.state.giftModal = v
      }
    },
    _StoreModal: {
      get () {
        return this.$store.state.storeModal
      },
      set (v) {
        this.$store.state.storeModal = v
      }
    },
    // Used to toggle record/report modal
    _AvatarModal: {
      get () {
        return this.$store.state.avatarModal
      },
      set (v) {
        this.$store.state.avatarModal = v
      }
    },
    _User: {
      get () {
        return this.$store.state.userinfo
      }
    },
    _TableStatus: {
      get () {
        return function (index) {
          let _s = this
          if (typeof index === 'undefined' || index === null) index = _s._LiveTable
          return _s.$store.state.tablelist[index].status
        }
      }
    },
    _TableTimer: {
      get () {
        return function (index) {
          let _s = this
          if (typeof index === 'undefined' || index === null) index = _s._LiveTable
          return _s.$store.state.tablelist[index].game.timer
        }
      }
    }
  }
}
