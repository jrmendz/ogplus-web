import Road from '@/components/road/RoadTemplate'
import GoodTipsTemplate from '@/components/sidebar/GoodTipsTemplate'
export default {
  components: {
    Road,
    GoodTipsTemplate
  },
  data () {
    return {
      goodTipsModal: false,
      closegoodTipsModal: false,
      checkallgoodtips: false,
      toggleAllVar: false
    }
  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    toggle: function (check) {
      let _s = this
      let tmp = []
      // Toggle radio button
      _s.getgoodtipsorig[check] = !!document.getElementById('radio-' + check).checked
      // Loop thru arrays and check if it's selected all
      _.forEach(_s.getgoodtipsorig, (v) => { if (tmp.indexOf(v) === -1) { tmp.push(v) } })
      switch (tmp.length) {
        case 2:
          _s.toggleAllVar = false
          break
        case 1:
          _s.toggleAllVar = tmp[0]
          break
      }
      document.getElementById('radio-all').checked = _s.toggleAllVar
    },
    toggleAll: function () {
      let _s = this
      _s.toggleAllVar = !!document.getElementById('radio-all').checked
      _.forEach(_s.getgoodtipsorig, (v, k) => {
        document.getElementById('radio-' + k).checked = _s.toggleAllVar
        _s.getgoodtipsorig[k] = _s.toggleAllVar
      })
    }
  },
  computed: {
    getgoodtipsorig: {
      get () {
        return this.$store.state.goodTipsActive
      }
    },
    GoodTipsModal: {
      get () {
        return this.$store.state.goodTipsModal
      }
    },
    goodTipName: {
      get () { return this.$store.state.goodTipsName }
    }
  },
  watch: {
    GoodTipsModal: function (n, o) {
      if (n) {
        let _s = this
        _s.$nextTick(() => {
          // To check the default value of good tips upon opening
          _s.toggleAllVar = true
          _.forEach(_s.getgoodtipsorig, (v, k) => {
            document.getElementById('radio-' + k).checked = v
            if (!v) {
              _s.toggleAllVar = false
            }
          })
          document.getElementById('radio-all').checked = _s.toggleAllVar
        })
      }
    }
  }
}
