/* Video Component Mixin
  *mounted function - default function to play the video on click
  *created function - function to refesh the video or keep the video up to date upon switching browser
  *getBettingtable - function to fetch current tab in-game
  *_tables - function to fetch current table list in-game
  *AddDealerFriend - Function to add dealer
  *countfollowers - Function to count the followers of the dealer
*/
import Hls from 'hls.js'
export default {
  data () {
    return {
      follow: 0,
      hide: true,
      messageplacebet: '',
      showpb: false,
      hlsjs: null,
      videIn: [
        {
          url: 'http://146.88.78.225:8787/hls/main.m3u8'
        },
        {
          url: 'http://146.88.78.225:8787/hls/mid.m3u8'
        },
        {
          url: 'http://146.88.78.225:8787/hls/result.m3u8'
        }
      ],
    }
  },
  mounted: function () {
    let _s = this
    let dgame = _s.$store.state.currentTableInfo.code
    // console.log('BIDYO!!', _s.videIn)
    setTimeout(function () {
      _s.$store.dispatch('HLS_PLAY')
      if (_s.$store.state.liveSoundSwitch === false) {
        _s.$store.state.hlsPlayer.volume = 0
      } else {
        _s.$store.state.hlsPlayer.volume = 1
      }

    }, 1)
  },
  watch: {
    'placebets': function () {
      let _s = this
      let locale = _s.$store.state.locale
      if (_s.$store.state.currentTableInfo.game.timer === 0) {
        if (_s.$store.state.soundFxSwitch === true) {
          _s.$store.state.audiosprite['spotFX'].play('endRing')
        }
      }
      if (_s.$store.state.currentTableInfo.status === 'dealing') {
        setTimeout(function () {
          if (_s.$store.state.soundFxSwitch === true) {
            if (locale === 'en') {
              _s.$store.state.audiosprite['spotFXen'].play('betstop')
            } else if (locale === 'cn') {
              _s.$store.state.audiosprite['spotFXcn'].play('betstop')
            } else {
              //
            }
          }
        }, 1000)
      }
      if (_s.$store.state.currentTableInfo.status === 'betting') {
        _s.show = true
        // _s.$store.state.message = 'Place your bets'
        setTimeout(function () {
          _s.showpb = false
        }, 3000)
        if (_s.$store.state.soundFxSwitch === true) {
          if (_s.$store.state.currentTableInfo.code === 'roulette') {
            setTimeout(function () {
              if (locale === 'en') {
                _s.$store.state.audiosprite['spotFXen'].play('betstart')
              } else if (locale === 'cn') {
                _s.$store.state.audiosprite['spotFXcn'].play('betstart')
              } else {
                //
              }
            }, 3000)
          } else {
            if (locale === 'en') {
              _s.$store.state.audiosprite['spotFXen'].play('betstart')
            } else if (locale === 'cn') {
              _s.$store.state.audiosprite['spotFXcn'].play('betstart')
            } else {
              //
            }
          }
        }
        _s.$store.state.lastBet += 1
      }
    },
    // 'shoeGame': function () {
    //   let _s = this
    //   let lastBet = _s.$store.state.lastBet
    //   if (lastBet === 3) {
    //     _s.$store.state.message = 'You have not bet for 3 times, 2 more and you will be redirected to lobby'
    //   }
    //   if (lastBet === 5) {
    //     let _bettings = localStorage.getItem('_bettings')
    //     let _bettingStatus = localStorage.getItem('_betStatus')
    //     if (_bettings === '0' || _bettingStatus === 'betting') {
    //       if (_s.table.code === 'baccarat' && _s.table.subcode === 'bidding') {
    //         _s.$store.state.lobbyTable = 'Bidding Bacc'
    //       } else if (_s.table.code === 'baccarat' && _s.table.subcode === 'normal') {
    //         _s.$store.state.lobbyTable = 'Baccarat'
    //       } else if (_s.table.code === 'dragontiger' && _s.table.subcode === 'bidding') {
    //         _s.$store.state.lobbyTable = 'Bidding DT'
    //       } else if (_s.table.code === 'dt' && _s.table.subcode === 'normal') {
    //         _s.$store.state.lobbyTable = 'Dragon Tiger'
    //       } else if (_s.table.code === 'moneywheel') {
    //         _s.$store.state.lobbyTable = 'MoneyWheel'
    //       } else {
    //         //
    //       }
    //       let bgmwatch = localStorage.getItem('_musicSwitch')
    //       let bgmmethod = localStorage.getItem('_musicSwitchIng')
    //       if (bgmwatch === bgmmethod) {
    //         this.$store.state.musicSwitch = false
    //         this.$store.state.musicSlider = 0
    //       } else {
    //         this.$store.state.musicSwitch = true
    //         this.$store.state.musicSlider = 100
    //       }
    //       let tableInfo = {
    //         data: _s.$store.state.currentTableInfo,
    //         tableid: _s.$store.state.currentTableIndex
    //       }
    //       _s.closeModal()
    //       _s.$store.state.hlsjs.stopLoad()
    //       _s.$store.dispatch('EXIT_TABLE', tableInfo)
    //     }
    //   }
    // },
    countfollowers: {
      handler: function (value) {
      },
      deep: true}
  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    AddDealerFriend: function (rid) {
      var _s = this
      _s.$store.dispatch('FOLLOW_UNFOLLOW_DEALER', { dealerscode: rid, method: 'remove'})
    },
    closeModal: function () {
      let _s = this
      _s.$store.state.chipModal = false
      _s.$store.state.rankModal = false
      _s.$store.state.socialModal = false
    },
    capitalizeName: function (name) {
      return name.toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    let _s = this
    let dgame = _s.$store.state.currentTableInfo.code
    let vis = (function () {
      let stateKey
      let eventKey
      let keys = {
        hidden: 'visibilitychange',
        webkitHidden: 'webkitvisibilitychange',
        mozHidden: 'mozvisibilitychange',
        msHidden: 'msvisibilitychange'
      }
      for (stateKey in keys) {
        if (stateKey in document) {
          eventKey = keys[stateKey]
          break
        }
      }
      return function (c) {
        if (c) document.addEventListener(eventKey, c)
        return !document[stateKey]
      }
    })()
    vis(function () {
      if (vis()) {
        if (_s.$store.state.videoSwitch === true) {
          if (dgame !== 'moneywheel') {
            _s.$store.dispatch('HLS_PLAY')
          } else {
            _s.mw_video_main()
          }
        } else {
          _s.$store.state.hlsjs.destroy()
        }
        // _s.$store.state.hlsPlayer.src('http://stream.oriental-game.com/hls/Ggame2table1.m3u8')
        // _s.$store.state.hlsPlayer.src(_s.$store.state.currentTableInfo.videoUrl.sea[0]) --> use this for dynamic video link
      }
    })
  },
  computed: {
    placebets: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      }
    },
    shoeGame: {
      get () {
        return this.$store.state.currentTableInfo.shoeGame
      }
    },
    shoeHand: {
      get () {
        return parseInt(this.$store.state.currentTableInfo.shoeGame.split('-')[0])
      }
    },
    shoeNumber: {
      get () {
        return parseInt(this.$store.state.currentTableInfo.shoeGame.split('-')[1])
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
        let _s = this
        return _s.$store.state.tablelist[_s.currentTableIndex]
      }
    },
    _tables: {
      get () {
        let _s = this
        // console.log('_s.$store.state.tablelist:', _s.$store.state.tablelist)
        return _s.$store.state.tablelist
      }
    },
    countfollowers: {
      get () {
        let _s = this
        let resultdealer = _s.$store.state.dealerfollowers
        _s.follow = resultdealer.length < 0 ? 0 : resultdealer.length
        return _s.follow
      }
    }
  }
}
