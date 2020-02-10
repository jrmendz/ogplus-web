
import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax} from 'gsap'
import '@/library/DrawSVGPlugin.js'

export default {
  component: {
    Back,
    Expo,
    TweenLite,
    TweenMax,
    Power2,
    TimelineLite,
    TimelineMax
  },
  mounted () {
    this.loadStat()
  },
  data () {
    return {
      sliderPos: 1,
      pointMap: {
        "s0": "328.2,89.1 320.9,321.6 289.1,91.2",
        "s2": "500.9,173.5 523.2,205.6 320.9,321.6 500.5,173.1",
        "s32": "367.3,93.6 320.9,321.6 328.2,89.1 328.5,89.1",
        "s15": "405.8,104.8 320.9,321.6 367.3,93.6 367.7,93.6 405.7,104.8",
        "s19": "405.8,104.8 440.7,121.9 320.9,321.6",
        "s4": "472.9,145 320.9,321.6 440.7,121.9 441.2,122.2",
        "s21": "473.3,145.3 500.5,173.1 320.9,321.6 472.9,145",
        "s25": "523.5,206 540.1,241.7 320.9,321.6 523.2,205.6",
        "s17": "540.2,241.9 550.4,279.4 320.9,321.6 540.1,241.7",
        "s34": "550.6,280 554.3,318.7 320.9,321.6 550.4,279.4",
        "s6": "554.3,318.7 554.4,319.4 551.5,358.5 320.9,321.6",
        "s27": "551.5,358.5 551.5,358.8 542,397.2 320.9,321.6",
        "s13": "542,397.2 526.2,433.2 320.9,321.6",
        "s36": "526.2,433.2 526.1,433.4 504.6,466 320.9,321.6",
        "s11": "504.6,466 504.4,466.4 477.3,495.3 477.3,495.3 320.9,321.6",
        "s30": "320.9,321.6 477.3,495.3 445.9,519.1",
        "s8": "320.9,321.6 445.9,519.1 445.8,519.2 410.7,537.4 410.4,537.5",
        "s23": "320.9,321.6 410.4,537.5 373.2,549.3",
        "s10": "320.9,321.6 373.2,549.3 373,549.4 334,554.8",
        "s5": "320.9,321.6 334,554.8 333.9,554.9 294.4,553.6 294.1,553.6",
        "s24": "320.9,321.6 294.1,553.6 255.6,545.8",
        "s16": "320.9,321.6 255.6,545.8 255.6,545.8 218.8,531.4 218.6,531.3",
        "s33": "320.9,321.6 218.6,531.3 184.8,511.1 184.6,510.9",
        "s1": "320.9,321.6 184.6,510.9 154.9,485.3 154.6,485",
        "s20": "320.9,321.6 154.6,485 129.7,454.9 129.4,454.4",
        "s14": "320.9,321.6 129.4,454.4 110,420.6 109.8,420.2",
        "s31": "320.9,321.6 109.8,420.2 96.4,383.4 96.3,383.1",
        "s9": "320.9,321.6 96.3,383.1 89.2,344.5 89.2,344",
        "s22": "320.9,321.6 89.2,344 88.8,305 88.8,304.9",
        "s18": "320.9,321.6 88.8,304.9 95,266 95.1,265.8",
        "s29": "320.9,321.6 95.1,265.8 107.7,228.5 108,228.1",
        "s7": "320.9,321.6 108,228.1 126.6,193.8 126.9,193.4",
        "s28": "320.9,321.6 126.9,193.4 150.9,163.1",
        "s12": "180.5,136.3 320.9,321.6 150.9,163.1 151.1,162.7 180.5,136.3",
        "s35": "213.8,115.2 320.9,321.6 180.5,136.3",
        "s3": "250,100.1 320.9,321.6 213.8,115.2 213.9,115.2",
        "s26": "289.1,91.2 320.9,321.6 250,100.1 250.4,100 289,91.2"
      },
      twObj: {}
    }
  },
  methods: {
    /**
     * Load Roulette Statistics
     * @param shoe
     * @returns {number}
     */
    loadStat: _.debounce(function () {
      console.log("Computing Statistics")

      let _s = this
      let result = _s.RoadInGame.beadRoad.list || []
      let finalStat = {}, totalHits = 0, hotCold = []
      let statChunk;

      // Validators
      if (_s.table.code !== "roulette")
        return 0
      if (!result.length)
        return 0

      // statChunk = _.take(result, shoe === -1 ? _s.RoadInGame.beadRoad.canvass.length : shoe)
      statChunk = _.slice(result, 0, _s.sliderPos)

      // Reset TweenMax position
      _.forEach(_s.twObj, (v) => {
        v.pause(0)
      });

      // Process counting of hits
      for (let i = 0; i < statChunk.length; i++) {
        let statKey = _.toString('s' + result[i].value)

        // Check if the key/result is in the finalStat `object`
        if (_.has(finalStat, statKey)) {
          finalStat[statKey].hits++
        } else {
          _.assign(finalStat, {
            [statKey]: {
              hits: 1,
              percentage: 0
            }
          })
        }
        // Increment total hits
        totalHits++
      }

      _.forEach(finalStat, (v, k) => {
        hotCold.push({id: k.replace('s', ''), hits: v.hits})
      })

      hotCold = _.sortBy(hotCold, ['hits'])

      // console.log(this.$store.state.RoadInGame.beadRoad.canvass)
      // console.log(result)

      _s.celcius.hot = _.reverse(_.takeRight(hotCold, 5))
      _s.celcius.cold = _.take(hotCold, 5)

      // Calculate percentage
      _.forEach(finalStat, (v, k) => {
        finalStat[k].percentage = (v.hits / totalHits) * 100
        // Divided by 2 because max TweenMax value to pause is 50
        let zoomPercent = (_s.sliderPos / _s.maxSliderPos)
        let withZoom = finalStat[k].percentage * (zoomPercent > 0.50 ? zoomPercent * 10 : 4.5)
        // Check if the Tween object is already saved
        if (_.has(this.twObj, k)) {
          _s.twObj[k].pause(withZoom)
        } else {
          _.assign(this.twObj, {[k]: TweenMax.to(("." + k), 100, {attr: {points: this.pointMap[k]}})})
          _s.twObj[k].pause(withZoom)
        }
      });
    }, 250),

    sliderChange: function () {
      this.loadStat()
    }
  },
  computed: {
    celcius: {
      get () { return this.$store.state.betTable.roulette.celsius }
    },
    getBettingtable: {
      get () { return this.$store.state.currenttab }
    },
    table: {
      get () { return this.$store.state.tablelist[this.currentTableIndex] }
    },
    currentTableIndex: {
      get () { return this.$store.state.currentTableIndex }
    },
    maxSliderPos: {
      get () { return this.RoadInGame.beadRoad.list.length }
    },
    RoadInGame: {
      get () { return this.$store.state.RoadInGame }
    }
  },
  watch: {
    maxSliderPos: function (n) {
      if (n) this.sliderPos = n
    },
    'table.status': function (n) {
      let _s = this
      switch (n) {
        case 'betting':
          break;
        case 'default':
          break;
        default:
          break;
      }
    }
  }
}
