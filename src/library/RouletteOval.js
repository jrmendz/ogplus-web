// NOTES:
// Please only add Squeeze commands that will only be used for Squeezing
// VUE component using this
// src/components/drawer/SqueezeComponent.vue


import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax} from 'gsap'
import '@/library/DrawSVGPlugin.js'
import Betting from '@/library/Betting.js'

export default {
  mixins: [ Betting ],
  component: {
    Back,
    Expo,
    TweenLite,
    TweenMax,
    Power2,
    TimelineLite,
    TimelineMax
  },
  data () {
    return {
      hitArea: {
        outer: {
          '0' :  [ 15, 32, 0 , 26, 3  ],
          '1' :  [ 16, 33, 1 , 20, 14 ],
          '2' :  [ 17, 25, 2 , 21, 4  ],
          '3' :  [ 0 , 26, 3 , 35, 12 ],
          '4' :  [ 2 , 21, 4 , 19, 15 ],
          '5' :  [ 23, 10, 5 , 24, 16 ],
          '6' :  [ 13, 27, 6 , 34, 17 ],
          '7' :  [ 18, 29, 7 , 28, 12 ],
          '8' :  [ 11, 30, 8 , 23, 10 ],
          '9' :  [ 14, 31, 9 , 22, 18 ],
          '10' : [ 8 , 23, 10, 5 , 24 ],
          '11' : [ 8 , 30, 11, 36, 13 ],
          '12' : [ 7 , 28, 12, 35, 3  ],
          '13' : [ 11, 36, 13, 27, 6  ],
          '14' : [ 1 , 20, 14, 31, 9  ],
          '15' : [ 4 , 19, 15, 32, 0  ],
          '16' : [ 5 , 24, 16, 33, 1  ],
          '17' : [ 6 , 34, 17, 25, 2  ],
          '18' : [ 9 , 22, 18, 29, 7  ],
          '19' : [ 21, 4 , 19, 15, 32 ],
          '20' : [ 33, 1 , 20, 14, 31 ],
          '21' : [ 25, 2 , 21, 4 , 19 ],
          '22' : [ 31, 9 , 22, 18, 29 ],
          '23' : [ 30, 8 , 23, 10, 5  ],
          '24' : [ 10, 5 , 24, 16, 33 ],
          '25' : [ 34, 17, 25, 2 , 21 ],
          '26' : [ 32, 0 , 26, 3 , 35 ],
          '27' : [ 36, 13, 27, 6 , 34 ],
          '28' : [ 29, 7 , 28, 12, 35 ],
          '29' : [ 22, 18, 29, 7 , 28 ],
          '30' : [ 23, 8 , 30, 11, 36 ],
          '31' : [ 20, 14, 31, 9 , 22 ],
          '32' : [ 19, 15, 32, 0 , 26 ],
          '33' : [ 24, 16, 33, 1 , 20 ],
          '34' : [ 27, 6 , 34, 17, 25 ],
          '35' : [ 28, 12, 35, 3 , 26 ],
          '36' : [ 30, 11, 36, 13, 27 ]
        },
        inner: {
          series58:  [ 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 33 ],
          orphans:   [ 1, 20, 14, 31, 9, 6, 34, 17 ],
          series023: [ 25, 2, 21, 4, 19, 22, 18, 29, 7, 28 ],
          zerospiel: [ 12, 35, 3, 26, 0, 32, 15 ]
        }
      }
    }
  },
  methods: {
    ovalOut: function () {
      let tl = new TimelineLite()
      let opacity = { opacity: 0 }
      for (let i = 0; i < 37; i++) tl.set('._' + i, opacity)
      tl.set('._series58', opacity)
      tl.set('._orphans', opacity)
      tl.set('._series023', opacity)
      tl.set('._zerospiel', opacity)
      this.betTable.ovalHover = ''
      this.betTable.ovalHoverNumbers = []
    },
    ovalHoverNumbers: function (val) {
      let _s = this
      let tl = new TimelineLite();
      let _class = _s.hitArea.outer[val.target.classList[1].replace('_', '')]
      // Set opacity on numbers
      tl.set(_.join(_.map(_class, (o) => { return '._' + o }), ', '), { opacity: 0.5 });
      // Add chips on numbers
      _s.betTable.ovalHoverNumbers = _.map(_class, (o) => { return o.toString() });
    },

    ovalHover: function (val) {
      let _s = this
      let tl = new TimelineLite();
      let elem = val.target.classList[1].replace('_', '')
      let _class = _s.hitArea.inner[elem]

      // Set opacity on numbers
      tl.set(_.join(_.map(_.concat(_class, [elem]), (o) => { return '._' + o})), { opacity: 0.5 })
      // Add chips on numbers
      _s.betTable.ovalHoverNumbers = _.map(_class, (o) => { return o.toString() });
      _s.betTable.ovalHover = '--is-' + elem
    },

    ovalClick: function (val) {
      let _s = this
      let del, hitAreas;

      // Pre-setting variables
      del = val.target.classList[1].replace('_', '');
      hitAreas = _s.hitArea[ _.isNaN(_.parseInt(del)) ? 'inner': 'outer' ][del] || [];

      // Validators
      if (_.isUndefined(hitAreas))
        return 0
      if ((parseFloat(this.getSelectedChips.value) * hitAreas.length) > _s.userInfo.balance) {
        _s.notification = 'insufficient fund';
        return 0
      }

      _.map( hitAreas, (o) => {
        // Add chips on betting table state
        _s.addChips('s' + o, {}, true, {}, '', false, false, false)
      })
    }
  },
  watch: {
    getStatus: function () {
      if (this.getStatus === 'dealing') {
        this.ovalOut()
      }
    }
  },
  computed: {
    userInfo: {
      get () { return this.$store.state.userinfo },
    },
    notification: {
      get () { return this.$store.state.message },
      set (v) { this.$store.state.message = v }
    },
    chipLocale: {
      get () { return this.$store.state.chipLocale }
    },

    getSelectedChips: {
      get () {
        return this.$store.state.selectedChip
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
    betTable: {
      get () {
        return this.$store.state.betTable[this.getBettingtable]
      }
    },
    getStatus: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
    _table: {
      get () {
        return this.$store.state.tablelist[this.currentTableIndex]
      }
    }
  }
}
