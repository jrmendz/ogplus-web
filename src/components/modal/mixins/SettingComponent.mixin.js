/* Settings Component Mixin
  *start_date_picker - Function to fetch records from the DB (start date)
  *end_date_picker - Function to fetch records from the DB (start date)
  *videoSwitch - Function from the Setting modal component to switch the video on/off
  *musicSwitch - Function from the Setting modal component that enables the background music on/off
  *liveSoundSwitch - Function from the Setting modal component that enables the live audio of the video on/off
  *musicSlider (to, from)
  - Function from the Setting modal component that enables and control the volume of the music background
  *liveSlider (to, from)
  - Function from the Setting modal component that enables and control the volume of the live video
  *timeNow - date function (showing hours)
  *getCurrentDates - Date function to display the start date a day before and endate + 12hours
  *reportsWLR (event)
  - Function from the reports module to display the Win/Loss history of the player/user
  *betting_records_history - Function from the records module to display the bet history of the player/user
  *roadmapBackset - Function to change the background color of the roadmaps and store it in the local storage
  *roadmapBack - Function to change the background color of the roadmaps and store it in the local storage
  *video_refresh - Function to refresh the video
  *selectChannel - Function to select video channels from selected area
  *selectVideoQuality - Function to select video quality
  *volumeSlider - Function to enable/disable the volumes of the music
  *save - Function to save user settings to DB
  *fxSlider - Function to adjust volume of the sound effects
*/
// import moment from 'moment'

export default {
  data () {
    return {
      roadWhite: 'https://static.oriental-game.com/image/road-white.png',
      roadBlack: 'https://static.oriental-game.com/image/road-black.png',
      // musicSlider: this.$store.state.musicSlider,
      // fxSlider: this.$store.state.fxSlider,
      // liveSlider: this.$store.state.liveSlider,
      // soundFxSwitch: this.$store.state.soundFxSwitch,
      // liveSoundSwitch: this.$store.state.islivesoundactive,
      // chatSwitch: true,
      // videoSwitch: this.$store.state.videoSwitch,
      // flags: this.$store.state.flags
      modified: false,
      userSettings: {
        desktop: {},
        mobile: {}
      }
      // pagination: {
      //   page: 1,
      //   rowsPerPage: 10,
      //   totalItems: 1
      // }
    }
  },
  mounted: function () {
    if (this.isLobby === true && this.$store.state.musicSwitch === true) {
      // var myAudio = document.getElementById('myAudio')
      // myAudio.autoplay = true
    }
    this.roadmapBackset()
    this.getTableFirstLoad()
  },
  computed: {
    timer: {
      get () {
        return this.$store.state.time
      }
    },
    IsfirstTableNo: {
      get () {
        return this.$store.state.currentTableIndex
      }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    },
    blackRoadMapSelected: {
      get () {
        return this.$store.state.blackRoadMapSelected
      }
    },
    musicSlider: {
      get (e) {
        return e.$store.state.musicSlider
      },
      set (value) {
        this.$store.state.musicSlider = value
      }
    },
    fxSlider: {
      get (e) {
        return e.$store.state.fxSlider
      },
      set (value) {
        this.$store.state.fxSlider = value
      }
    },
    liveSlider: {
      get (e) {
        return e.$store.state.liveSlider
      },
      set (value) {
        this.$store.state.liveSlider = value
      }
    },
    soundFxSwitch: {
      get (e) {
        return e.$store.state.soundFxSwitch
      },
      set (value) {
        this.$store.state.soundFxSwitch = value
      }
    },
    liveSoundSwitch: {
      get (e) {
        return e.$store.state.liveSoundSwitch
      },
      set (value) {
        this.$store.state.liveSoundSwitch = value
      }
    },
    withchat: {
      get (e) {
        return e.$store.state.withchat
      },
      set (value) {
        this.$store.state.withchat = value
      }
    },
    musicSwitch: {
      get (e) {
        return e.$store.state.musicSwitch
      },
      set (value) {
        this.$store.state.musicSwitch = value
      }
    },
    videoSwitch: {
      get (e) {
        return e.$store.state.videoSwitch
      },
      set (value) {
        this.$store.state.videoSwitch = value
      }
    },
    // pages () {
    //   if (this.pagination.rowsPerPage == null ||
    //     this.pagination.totalItems == null
    //   ) return 0
    //
    //   return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    // },
    currentTableIndex: {
      get (e) {
        return e.$store.state.currentTableIndex
      }
    },
    tableData: {
      get (e) {
        return e.$store.state.tablelist[e.currentTableIndex]
      }
    },
    status: function () {
      if (this.tableData) {
        return this.tableData.status
      }
    },
    recordModal: {
      get (e) {
        return e.$store.state.recordModal
      }
    }
  },
  watch: {
    IsfirstTableNo: {
      handler: function (value) {
        let _s = this
        let tableResult = _s.$store.state.tablelist[value]
        if (tableResult) {
          _s.table = tableResult.id
        } else {
          _s.table = ''
        }
      },
      deep: true},

    'blackRoadMapSelected': function () {
      let _s = this
      if (_s.$store.state.blackRoadMapSelected === true) {
        _s.$store.commit('ROAD_BACKGROUND', 'black')
      } else {
        _s.$store.commit('ROAD_BACKGROUND', 'white')
      }
    }
    // 'pagination.page': function (e) {
    //   let _s = this
    //   _s.page = e
    //   _s.betting_records_history()
    // },
    // 'table': function (id) {
    //   let _s = this
    //   _s.table = id
    //   _s.pagination.page = 1
    //   _s.betting_records_history()
    // },
    // 'start_date_picker': function () {
    //   let _s = this
    //   _s.betting_records_history()
    // },
    // 'end_date_picker': function () {
    //   let _s = this
    //   _s.betting_records_history()
    // },
    // 'shoeno': function () {
    //   let _s = this
    //   _s.betting_records_history()
    // },
    // status: function () {
    //   let _s = this
    //   if (!_s.tableData) return
    //   if (_s.tableData.status === 'default') {
    //     _s.getCurrentDates()
    //     _s.getTableList()
    //     _s.betting_records_history()
    //   }
    // },
    // recordModal: function () {
    //   let _s = this
    //   _s.getCurrentDates()
    //   _s.getTableList()
    //   _s.betting_records_history()
    // },
    // 'videoSwitch': function () {
    //   var _s = this
    //   if (_s.videoSwitch === true) {
    //     _s.$store.dispatch('HLS_PLAY')
    //   } else {
    //     if (_s.$store.state.isLobby === false) {
    //       _s.$store.state.hlsjs.destroy()
    //     }
    //   }
    // },
    // 'chatSwitch': function () {
    //   let _s = this
    //   if (_s.chatSwitch === true) {
    //     _s.$store.state.withchat = 0
    //   } else {
    //     _s.$store.state.withchat = 1
    //   }
    // },
    // 'soundFxSwitch': function () {
    //   let _s = this
    //   if (_s.$store.state.soundFxSwitch === false) {
    //     _s.$store.state.fxSlider = 0
    //   } else {
    //     _s.$store.state.fxSlider = 100
    //   }
    //   if (_s.$store.state.soundFxSwitch === false && _s.$store.state.liveSoundSwitch === false) {
    //     _s.$store.commit('SET_MUTE', false)
    //   } else {
    //     _s.$store.commit('SET_MUTE', true)
    //   }
    // },
    // 'musicSwitch': function () {
    //   let _s = this
    //   // var myAudios = document.getElementById('myAudio')
    //   if (_s.$store.state.musicSwitch === true) {
    //     if (_s.isLobby === true) {
    //       // myAudios.play()
    //     }
    //     _s.$store.state.musicSlider = 100
    //     localStorage.setItem('_musicSwitch', true)
    //   } else {
    //     if (_s.isLobby === true) {
    //       // myAudios.pause()
    //     }
    //     _s.$store.state.musicSlider = 0
    //     localStorage.setItem('_musicSwitch', false)
    //   }
    // },
    // 'liveSoundSwitch': function () {
    //   let _s = this
    //   _s.$store.state.islivesoundactive = !_s.$store.state.islivesoundactive
    //   if (_s.$store.state.isLobby !== true) {
    //     if (_s.$store.state.islivesoundactive === false) {
    //       _s.$store.state.hlsPlayer.volume = 0
    //     } else {
    //       _s.$store.state.hlsPlayer.volume = 1
    //     }
    //   }
    //   if (_s.$store.state.liveSoundSwitch === false) {
    //     _s.$store.state.liveSlider = 0
    //   } else {
    //     _s.$store.state.liveSlider = 100
    //   }
    //   if (_s.$store.state.soundFxSwitch === false && _s.$store.state.liveSoundSwitch === false) {
    //     _s.$store.commit('SET_MUTE', false)
    //   } else {
    //     _s.$store.commit('SET_MUTE', true)
    //   }
    // },
    // 'fxSlider' (to, from) {
    //   let _s = this
    //   _s.$store.state.soundfx = to * 0.01
    //   if (_s.$store.state.soundfx === 0) {
    //     _s.$store.state.soundFxSwitch = false
    //   } else {
    //     _s.$store.state.soundFxSwitch = true
    //   }
    // },
    // 'musicSlider' (to, from) {
    //   if (this.isLobby === true && this.$store.state.musicSwitch === true) {
    //     // var myAudio = document.getElementById('myAudio')
    //     // myAudio.volume = to * 0.01
    //   }
    //   if (this.$store.state.musicSlider === 0) {
    //     this.$store.state.ismusicactive = false
    //     this.$store.state.musicSwitch = false
    //   } else {
    //     this.$store.state.ismusicactive = true
    //     this.$store.state.musicSwitch = true
    //   }
    // },
    // 'liveSlider' (to, from) {
    //   if (this.$store.state.isLobby !== true) {
    //     var myLive = document.getElementById('panda_desk_Video')
    //     if (myLive && this.$store.state.islivesoundactive) {
    //       myLive.volume = to * 0.01
    //     }
    //     this.$store.state.hlsPlayer.volume = myLive.volume
    //   }
    //   if (this.$store.state.liveSlider === 0) {
    //     this.$store.state.liveSoundSwitch = false
    //   } else {
    //     this.$store.state.liveSoundSwitch = true
    //   }
    // }
  },
  methods: {
    getTableFirstLoad: function () {
      let _s = this
      let value = _s.$store.state.currentTableIndex
      let tableResult = _s.$store.state.tablelist[value]
      // console.log('_s.isLobby', _s.isLobby, tableResult)
      if (_s.isLobby) {
        this.table = ''
      } else {
        this.table = tableResult.id
      }
    },
    // bgm: function () {
    //   if (this.musicSwitch === true) {
    //     localStorage.setItem('_musicSwitchIng', true)
    //   } else {
    //     localStorage.setItem('_musicSwitchIng', false)
    //   }
    // },
    // IsfirstTableNo: function () {
    //   let _s = this
    //   let index = _s.$store.state.currentTableIndex
    //   let tableResult = _s.$store.state.tablelist[index]
    //   if (tableResult) {
    //     console.log('tableResult.idxxx', tableResult.id)
    //     _s.table = tableResult.id
    //   }
    // },
    // getTableList: async function () {
    //   let _s = this
    //   _s.tableNo = await this.$store.dispatch('GET_TABLE_LIST')
    // },
    // nosave: function () {
    //   let _s = this
    //   _s.$store.state.settingModal = false
    //   _s.$translate.setLang(_s.$store.state.locale)
    // },
    // save: function () {
    //   let _s = this
    //   let options = {}
    //   // Get specific settings to save
    //   _.map(_s.$options.computed, (value, key) => {
    //     if (['musicSlider', 'fxSlider', 'liveSlider', 'soundFxSwitch', 'liveSoundSwitch', 'musicSwitch', 'videoSwitch', 'locale', 'blackRoadMapSelected'].indexOf(key) > -1) {
    //       options[key] = _s[key]
    //     }
    //   })

    //   // Close dialogs
    //   _s.$store.state.settingModal = false
    //   // Execute update user & stringify settings
    //   _s.$store.dispatch('UPDATE_USER', {
    //     user_settings: JSON.stringify({ desktop: options, mobile: _s.$store.state.mobile })
    //   })
    // },
    // timeNow: function () {
    //   let d = new Date() // for now
    //   return d.getHours()
    // },
    // getCurrentDates: function () {
    //   let _s = this
    //   if (_s.timeNow() < 12) {
    //     _s.start_date_picker = moment().subtract(1, 'days').format('YYYY-MM-DD')
    //     _s.start_date_picker_rep = moment().subtract(1, 'days').format('YYYY-MM-DD')
    //     _s.end_date_picker = moment().format('YYYY-MM-DD')
    //     _s.end_date_picker_rep = moment().format('YYYY-MM-DD')
    //   } else {
    //     _s.start_date_picker = moment().format('YYYY-MM-DD')
    //     _s.start_date_picker_rep = moment().format('YYYY-MM-DD')
    //     _s.end_date_picker = moment().add(1, 'days').format('YYYY-MM-DD')
    //     _s.end_date_picker_rep = moment().add(1, 'days').format('YYYY-MM-DD')
    //   }
    // },
    // reportsWLR: function (event) {
    //   let _s = this
    //   _s.$store.state.socketio.socket.get('/transaction/reports', {token: localStorage._token, fromDate: _s.start_date_picker_rep, toDate: _s.end_date_picker_rep}, function (response, length) {
    //     _s.itemsrep.win_loss = response.data.reports[0].win_loss
    //     _s.itemsrep.rolling = response.data.reports[0].rolling
    //   })
    // },
    // betting_records_history: function () {
    //   let _s = this
    //   if (_s.$options._componentTag === 'RecordModalComponent') { // preventing the method to call multiple times because of mixins in the other components it will cause traffic
    //     let startdate = _s.start_date_picker + 'T00:00:00.000Z'
    //     let enddate = _s.end_date_picker + 'T11:59:59.000Z'
    //     _s.$store.state.socketio.socket.get('/transaction/records', {token: localStorage._token, fromDate: startdate, toDate: enddate, perPage: _s.perpage, page: _s.page, table_id: _s.table, shoehand_id: _s.shoeno}, function (response, length) {
    //       if (response.status === 200) {
    //         _s.items = response.data.betting_history
    //         _s.pagination.totalItems = response.data.totalRows
    //         _s.loading = false
    //       }
    //     })
    //   }
    // },
    roadmapBackset: function () {
      let _s = this
      if (_s.$store.state.blackRoadMapSelected === false) {
        localStorage.setItem('roadback', 'white')
      } else {
        localStorage.setItem('roadback', 'black')
      }
    },
    // roadmapBack: function () {
    //   let _s = this
    //   if (localStorage.getItem('roadback') === 'black') {
    //     _s.$store.state.blackRoadMapSelected = true
    //   } else {
    //     _s.$store.state.blackRoadMapSelected = false
    //   }
    // },
    video_refresh: function () {
      let _s = this
      _s.$store.dispatch('HLS_PLAY')
      // _s.$store.state.hlsPlayer.src('//stream.oriental-game.com/hls/Ggame2table1.m3u8')
      // _s.$store.state.hlsPlayer.src(_s.$store.state.currentTableInfo.videoUrl.sea[0]) --> use this for dynamic video link
    },
    selectChannel: function (index) {
      var _s = this
      if (_s.$data.videoChannels[index].name === 'China') {
      }
      if (_s.$data.videoChannels[index].name === 'SE Asia') {
      }
      if (_s.$data.videoChannels[index].name === 'NE Asia') {
      }
      _s.$data.videoChannels.forEach(function (v, i) {
        if (index === i) {
          _s.$data.videoChannels[i].is_active = true
        } else {
          _s.$data.videoChannels[i].is_active = false
        }
      })
    },
    // temporary video URl
    selectVideoQuality: function (index) {
      var _s = this
      let tableNumber = _s.$store.state.currentTableInfo.tableNumber
      if (_s.$data.videoQualities[index].name === 'SD') {
        _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableNumber.charAt(0) + 'game' + tableNumber.substr(1) + 'table2.m3u8')
        _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
        _s.$store.state.hlsPlayer.play()
      }
      if (_s.$data.videoQualities[index].name === 'HD') {
        _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableNumber.charAt(0) + 'game' + tableNumber.substr(1) + 'table1.m3u8')
        _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
        _s.$store.state.hlsPlayer.play()
      }
      if (_s.$data.videoQualities[index].name === 'FHD') {
        _s.$store.state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableNumber.charAt(0) + 'game' + tableNumber.substr(1) + 'table1.m3u8')
        _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
        _s.$store.state.hlsPlayer.play()
      }
      _s.$data.videoQualities.forEach(function (v, i) {
        if (index === i) {
          _s.$data.videoQualities[i].is_active = true
        } else {
          _s.$data.videoQualities[i].is_active = false
        }
      })
    }
    // musicSwitch: function () {
    //   var myAudio = document.getElementById('myAudio')
    //   console.log(this.$store.state.musicSlider)
    //   if (this.$store.state.ismusicactive) {
    //     myAudio.play()
    //     this.$store.state.musicSlider = this.$store.state.musicSlider
    //     this.$store.state.musicSlider = 100
    //   } else {
    //     myAudio.pause()
    //     this.$store.state.musicSlider = 0
    //   }
    // },
    // music_backG: function (e) {
    //   let _s = this
    //   if (_s.isLobby === true) {
    //     var myAudio = document.getElementById('myAudio')
    //     _s.$store.state.musicSwitch = !_s.$store.state.musicSwitch
    //     if (_s.$store.state.musicSwitch === true) {
    //       myAudio.play()
    //       localStorage.setItem('_musicSwitchIng', true)
    //     }
    //     if (_s.$store.state.musicSwitch === false) {
    //       myAudio.pause()
    //       localStorage.setItem('_musicSwitchIng', false)
    //     }
    //   }
    //   if (_s.isLobby === false) {
    //     _s.$store.state.setmute = !_s.$store.state.setmute
    //     if (_s.$store.state.setmute === true) {
    //       _s.$store.state.soundFxSwitch = true
    //       _s.$store.state.liveSoundSwitch = true
    //     } else {
    //       _s.$store.state.soundFxSwitch = false
    //       _s.$store.state.liveSoundSwitch = false
    //     }
    //   }
    // }
  }
}
