export default {
  mounted: function () {
    this.isflags()
    this.toggleTranslation(this.$store.state.locale)
  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true && _s.user.user_settings !== undefined) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    toggleTranslation: function (code) {
      var _s = this
      _s.$store.state.flags.forEach(function (v, i) {
        if (_s.$store.state.flags[i].code === code) {
          if (_s.$store.state.flags[i].code === 'cn') {
            localStorage.setItem('_locale', 'cn')
            _s.$store.commit('SET_LOCALE', 'cn')
            _s.$translate.setLang('cn')
            _s.clickEff()
          }
          if (_s.$store.state.flags[i].code === 'en') {
            localStorage.setItem('_locale', 'en')
            _s.$store.commit('SET_LOCALE', 'en')
            _s.$translate.setLang('en')
            _s.clickEff()
          }
          if (_s.$store.state.flags[i].code === 'jp') {
            localStorage.setItem('_locale', 'jp')
            _s.$store.commit('SET_LOCALE', 'jp')
            _s.$translate.setLang('jp')
            _s.clickEff()
          }
          if (_s.$store.state.flags[i].code === 'ko') {
            localStorage.setItem('_locale', 'ko')
            _s.$store.commit('SET_LOCALE', 'ko')
            _s.$translate.setLang('ko')
            _s.clickEff()
          }
          if (_s.$store.state.flags[i].code === 'vn') {
            localStorage.setItem('_locale', 'vn')
            _s.$store.commit('SET_LOCALE', 'vn')
            _s.$translate.setLang('vn')
            _s.clickEff()
          }
          if (_s.$store.state.flags[i].code === 'th') {
            localStorage.setItem('_locale', 'th')
            _s.$store.commit('SET_LOCALE', 'th')
            _s.$translate.setLang('th')
            _s.clickEff()
          }
          if (_s.$store.state.flags[i].code === 'id') {
            localStorage.setItem('_locale', 'id')
            _s.$store.commit('SET_LOCALE', 'id')
            _s.$translate.setLang('id')
            _s.clickEff()
          }
          _s.$store.state.flags[i].is_selected = true
        } else {
          _s.$store.state.flags[i].is_selected = false
        }
      })
    },
    isflags: function () {
      var _s = this
      let flag = localStorage.getItem('_locale')
      if (flag === 'en') {
        _s.$store.state.flags[1].is_selected = true
        _s.$store.commit('SET_LOCALE', 'en')
        _s.$translate.setLang('en')
        _s.clickEff()
      } else if (flag === 'cn') {
        _s.$store.state.flags[0].is_selected = true
        _s.$store.commit('SET_LOCALE', 'cn')
        _s.$translate.setLang('cn')
        _s.clickEff()
      } else if (flag === 'jp') {
        _s.$store.state.flags[2].is_selected = true
        _s.$store.commit('SET_LOCALE', 'jp')
        _s.$translate.setLang('jp')
        _s.clickEff()
      } else if (flag === 'ko') {
        _s.$store.state.flags[3].is_selected = true
        _s.$store.commit('SET_LOCALE', 'ko')
        _s.$translate.setLang('ko')
        _s.clickEff()
      } else if (flag === 'vn') {
        _s.$store.state.flags[4].is_selected = true
        _s.$store.commit('SET_LOCALE', 'vn')
        _s.$translate.setLang('vn')
        _s.clickEff()
      } else if (flag === 'th') {
        _s.$store.state.flags[5].is_selected = true
        _s.$store.commit('SET_LOCALE', 'th')
        _s.$translate.setLang('th')
        _s.clickEff()
      } else if (flag === 'id') {
        _s.$store.state.flags[6].is_selected = true
        _s.$store.commit('SET_LOCALE', 'id')
        _s.$translate.setLang('id')
        _s.clickEff()
      } else {
        //
      }
    }
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
    locale: {
      get (e) {
        return e.$store.state.locale
      }
    },
    user: {
      get () {
        let _s = this
        return _s.$store.state.userinfo
      }
    },
    flags: {
      get (e) {
        return e.$store.state.flags
      },
      set (value) {
        console.log(value)
        this.$store.state.flags = value
      }
    }
  }
}
