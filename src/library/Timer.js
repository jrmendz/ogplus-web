import Global from '@/library/Global.js'

export default {
  data () {
    return {
      maxTime: this.index ? this.$store.state.tablelist[this.index].maxtime / 2 : 7.5,
      initC: true,
      firstTime: 0,
      statusboolean: true,
      extendenable: true
    }
  },
  props: {
    index: ''
  },
  mixins: [ Global ],
  computed: {
    getStatus: {
      get () {
        return this._TableStatus()
      }
    },
    initialCount: {
      get () {
        return this._TableTimer()
      }
    },
    getTableCode: {
      get () {0
        console.log('code >>>> ', this.$store.state.tablelist[this.index].code)
        return this.$store.state.tablelist[this.index].code
      }
    },
    getTableSubCode: {
      get () {
        console.log('code >>>> ', this.$store.state.tablelist[this.index].subcode)
        return this.$store.state.tablelist[this.index].subcode
      }
    },
    isSideBet: {
      get () {
        return this.$store.state.isSideBet
      }
    },
    getTableExtendable: {
      get () {
        return this.$store.state.tablelist[this.index].extendable
      }
    },
    mainWS () {
      return this.$store.state.mainWS
    }
  },
  watch: {
    getTableinformation: function () {
      // console.log('INFO: ', this.getTableinformation)
    },
    getStatus: function () {
      switch (this.getStatus) {
        case 'squeeze_start' :
          this.statusboolean = true
          break
        case 'default' :
          this.statusboolean = false
          break
      }
      return this.statusboolean
    }
  },
  methods: {
    extend_fired: function (tableName) {
      this.mainWS.send(JSON.stringify({
        action: 'extend',
        code: this.getTableCode,
        table: tableName,
        triggered: true
      }))
      console.log('Extend Time', this.mainWS)
    },
    timer: function (tableName) {
      let _s = this
      // let locale = _s.$store.state.locale
      let time = _s.initialCount
      if (_s.$store.state.currentTableInfo.status === 'betting') {
        switch (_s.$store.state.soundFxSwitch) {
          case true:
            if (time === 3 && time !== 0) {
              _s.$store.state.audiosprite['spotFX'].play('timetick')
            }
            if (time === 2 && time !== 0) {
              _s.$store.state.audiosprite['spotFX'].play('timetick')
            }
            if (time === 1 && time !== 0) {
              _s.$store.state.audiosprite['spotFX'].play('timetick')
            }
            if (time === 0) {
              _s.initC = true
            }
            if (time > 0) {
              if (_s.initC) {
                _s.firstTime = _s.initialCount
                _s.initC = false
              }
            }
            break
          case false:
            if (time === 0) {
              _s.initC = true
            }
            if (time > 0) {
              if (_s.initC) {
                _s.firstTime = _s.initialCount
                _s.initC = false
              }
            }
            break
        }
      }
      return _s.$store.state.tablelist[tableName].game.timer ? _s.$store.state.tablelist[tableName].game.timer : 0
    },
    prompt: function () {
      let _s = this
      if (_s._TableStatus() === 'betting') {
        if (_s.timer(_s.$props.index) <= 10) {
          return _s.tt('Betting Ends In')
        } else {
          return _s.tt('Betting Start')
        }
      } else if (_s._TableStatus().includes('squeeze')) {
        if (_s.timer(_s.$props.index) <= 5) {
          return _s.tt('Squeeze Ends In')
        } else {
          return _s.tt('Squeeze Start')
        }
      }
    }
  }
}
