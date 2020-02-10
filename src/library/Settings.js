// import $cookie from 'vue-cookie'
// import {Howl} from 'howler'
export default {
  data () {
    return {
      roadWhite: 'static/road-white.png',
      roadBlack: 'static/road-black.png'
    }
  },
  // mixins: [ SettingComponentMixin ],
  mounted: function () {
    let _s = this
    _s.roadmapBackset()
    this.$nextTick(() => {
      document.body.addEventListener('wheel', e => {
        if (e.ctrlKey) {
          event.preventDefault()
        }
      })
      document.body.addEventListener('keydown', function (event) {
        if (event.ctrlKey === true && (event.keyCode === 107 || event.keyCode === 109 || event.keyCode === 187 || event.keyCode === 189)) {
          event.preventDefault()
        }
      })
    })
  },
  computed: {
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
    locale: {
      get () {
        return this.$store.state.locale
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
    user: {
      get () {
        let _s = this
        return _s.$store.state.userinfo
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
    },
    chips: {
      get (e) {
        return e.$store.state.bettingChips
      }
    }
  },
  watch: {
    'chips': function () {
    },
    'blackRoadMapSelected': function () {
      let _s = this
      if (_s.$store.state.blackRoadMapSelected === true) {
        _s.$store.commit('ROAD_BACKGROUND', 'black')
      } else {
        _s.$store.commit('ROAD_BACKGROUND', 'white')
      }
    },
    'videoSwitch': function () {
      var _s = this
      if (_s.videoSwitch === true) {
        _s.$store.dispatch('HLS_PLAY')
      } else {
        if (_s.$store.state.isLobby === false) {
          _s.$store.state.hlsjs.destroy()
        }
      }
    },
    'chatSwitch': function () {
      let _s = this
      if (_s.chatSwitch === true) {
        _s.$store.state.withchat = 0
      } else {
        _s.$store.state.withchat = 1
      }
    },
    'soundFxSwitch': function () {
      let _s = this
      _s.clickEff()
      if (_s.$store.state.soundFxSwitch === false) {
        _s.$store.state.fxSlider = 0
      } else {
        _s.$store.state.fxSlider = 100
      }
      if (_s.$store.state.soundFxSwitch === false && _s.$store.state.liveSoundSwitch === false) {
        _s.$store.commit('SET_MUTE', false)
      } else {
        _s.$store.commit('SET_MUTE', true)
      }
    },
    'musicSwitch': function () {
      let _s = this
      // var myAudio = document.getElementById('myAudio')
      if (_s.isLobby === true) {
        if (_s.musicSwitch === true) {
          // console.log(_s.$store.state.audiosprite['bgm'])
          _s.$store.state.audiosprite['bgm'].play()
          _s.$store.state.musicSlider = 100
          localStorage.setItem('_musicSwitch', true)
        } else {
          // console.log(_s.$store.state.audiosprite['bgm'])
          _s.$store.state.audiosprite['bgm'].stop()
          _s.$store.state.musicSlider = 0
          localStorage.setItem('_musicSwitch', false)
        }
      }
    },
    'liveSoundSwitch': function (to, from) {
      let _s = this
      _s.clickEff()
      _s.$store.state.islivesoundactive = !_s.$store.state.islivesoundactive
      if (_s.liveSoundSwitch === true) {
        _s.$store.commit('LIVE_SOUND', true)
        _s.$store.state.liveSlider = 100
      } else {
        _s.$store.commit('LIVE_SOUND', false)
        _s.$store.state.liveSlider = 0
      }
      // if (_s.$store.state.isLobby !== true) {
      //   if (_s.$store.state.islivesoundactive === false) {
      //     _s.$store.state.hlsPlayer.volume = 0
      //   } else {
      //     _s.$store.state.hlsPlayer.volume = 1
      //   }
      // }
      // if (_s.soundFxSwitch === false && _s.liveSoundSwitch === false) {
      //   _s.$store.commit('SET_MUTE', false)
      // } else {
      //   _s.$store.commit('SET_MUTE', true)
      // }
    },
    'liveSlider' (to, from) {
      let _s = this 
      if (_s.$store.state.isLobby !== true) {
        var myLive = document.getElementById('panda_desk_Video')
        if (myLive && this.$store.state.islivesoundactive) {
          myLive.volume = to * 0.01
        }
        _s.$store.state.hlsPlayer.volume = myLive.volume     
      }
      if (_s.$store.state.liveSlider === 0) {
        _s.$store.state.liveSoundSwitch = false
      } else {
        _s.$store.state.liveSoundSwitch = true
      }

    },
    'fxSlider' (to, from) {
      let _s = this
      _s.$store.state.soundfx = to * 0.01
      if (_s.$store.state.soundfx === 0) {
        _s.$store.state.soundFxSwitch = false
      } else {
        _s.$store.state.soundFxSwitch = true
      }
      if (_s.$store.state.soundFxSwitch === true) {
        return (_s.$store.state.audiosprite['spotFX'].volume(to * 0.01)._volume, _s.$store.state.audiosprite['spotFXen'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['spotFXcn'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['dragontigeren'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['dragontigercn'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['moneywheelen'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['moneywheelcn'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['baccaraten'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['rouletteen'].volume(to * 0.01)._volume,
        _s.$store.state.audiosprite['roulettecn'].volume(to * 0.01)._volume)
      }
    },
    'musicSlider' (to, from) {
      let _s = this
      if (_s.isLobby === true && _s.$store.state.musicSwitch === true) {
        _s.$store.state.audiosprite['bgm'].volume(to * 0.01)._volume
      }
      if (_s.$store.state.musicSlider === 0) {
        _s.$store.state.ismusicactive = false
        _s.$store.state.musicSwitch = false
      } else {
        _s.$store.state.ismusicactive = true
        _s.$store.state.musicSwitch = true
      }
    }
  },
  methods: { 
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    nosave: function () {
      let _s = this
      _s.$store.state.settingModal = false
      _s.$translate.setLang(_s.$store.state.locale)
      _s.clickEff()
    },
    save: function () {
      let _s = this
      let options = {}
      _s.clickEff()
      // Get specific settings to save
      _.map(_s.$options.computed, (value, key) => {
        if (['musicSlider', 'fxSlider', 'liveSlider', 'soundFxSwitch', 'liveSoundSwitch', 'musicSwitch', 'videoSwitch', 'locale', 'blackRoadMapSelected', 'chips'].indexOf(key) > -1) {
          options[key] = _s[key]
        }
      })

      // Close dialogs
      _s.$store.state.settingModal = false
      // Execute update user & stringify settings
      _s.$store.dispatch('UPDATE_USER', {
        user_settings: JSON.stringify({ desktop: options, mobile: _s.$store.state.mobile })
      })
    },
    roadmapBackset: function () {
      let _s = this
      if (_s.$store.state.blackRoadMapSelected === false) {
        localStorage.setItem('roadback', 'white')
      } else {
        localStorage.setItem('roadback', 'black')
      }
    },
    volumeSlider: function () {
      var _s = this
      return Math.floor(_s.liveSlider * 0.3465)
      // return Math.floor(_s.liveSlider * 0.3465)
    }
  }
}
