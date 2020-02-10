// import Road from '@/components/road/RoadTemplate'
// import RoadMapJS from '@/components/road/RoadmapJS'
import { Store } from 'vuex';
export default {
  // components: { Road, RoadMapJS },
  props: { table: '', index: '' },
  data () {
    return {
      roadData: {
        beadRoad: [],
        bigRoad: []
      },
      roadConfig: {
        beadRoad: { col: 0, row: 0 },
        bigRoad: { col: 0, row: 0 }
      },
      roadMapData: {},
      statistic: {},
      tableNum: this.$props.index,
      // tableInfo: this.$props.table
    }
  },
  mounted () {
    // this.loadCardRoad()
    this.loadCardRoad2()
    this.loadGoodTips()
  },
  computed: {
    tableInfo: {
      get () { return this.$store.state.tablelist[this.tableNum] }
    },
    status: {
      get () { return this.tableInfo.status }
    },
    timer: {
      get () { try { return this.tableInfo.game.timer || 0 } catch (err) { } }
    },
    events: {
      get () { return _.isUndefined(this.tableInfo.events) ? [] : this.tableInfo.events }
    },
    isHalted: {
      get() { return this.$store.state.haltedTbl.list.indexOf(this.tableNum) > -1 }
    },
    playerCount: {
      get () { return this.$store.state.playerLocation[this.tableNum] || {} }
    }
  },
  watch: {
    status: function (n, o) {
      if (n === 'betting') this.loadCardRoad2()
    }
  },
  methods: {
    getName: function (val) {
      let content = val
      if (this.$store.state.locale === 'cn') {
        return content.replace(/normal/gi, '').trim()
      }
      return content
    },
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    enterGame (isSideBet = false) {
      /*
      * TODO: Sir Alfie makiki-edit nalang nito, nagre-factor kasi ako kanina
      *
      * */
      let _s = this
      let betTable = _s.$store.state.betTable

      _s.$store.dispatch('ENTER_TABLE', {
        data: _s.tableInfo,
        tableid: _s.tableNum
      }).then((table) => {

        _s.$store.dispatch('LTB_API', {
          method: 'GET',
          tableNumber: _s.tableNum
        }).then((res) => {
          if (!_.isEmpty(res.data)) {

            if (table.data.gameSet === res.data.gameSet) {
              _.map(res.data.sections, (o) => {
                let section = betTable[_s.tableInfo.code].section[o.betSection]
                section.bets.push({
                  betSection: o.betSection,
                  chipClass: o.chipClass,
                  chipImage: o.chipClass,
                  chipValue: parseFloat(o.chipValue),
                  isConfirmed: true,
                  isRebet: false
                })
                _s.$store.state.totalOnTableBet += parseFloat(o.chipValue)
                setTimeout(function () {
                  if (table.code === 'moneywheel') {
                    TweenLite.set('._1', {width: 30, height: 30})
                  }
                  TweenLite.set('.label__bet', {x: '-20', opacity: 1})
                  TweenLite.to('._1', 1, {ease: Expo.easeOut, rotation: 0, y: '+45%', x: '-15'})
                }, 100)
                section.sumOfStagedChips = parseFloat(o.chipValue)
              })
            }
          }
        }, (err) => {
          console.error(new Error(err))
        })
      })
    },
    loadCardRoad: function () {
      let _s = this
      let config = {}
      let roadType
      // Validators
      if (!_s.tableNum) return

      _s.$store.dispatch("ROAD", {
        gameType: _s.tableInfo.code,
        tableNumber: _s.tableInfo.tableNumber
      }).then((data) => {
        console.log({
          gameType: _s.tableInfo.code,
          tableNumber: _s.tableInfo.tableNumber
        }, data);

      }, (error) => {
        console.error(new Error(error))
      });

      // Pre-setting variables
      // Moneywheel Config
      if (_s.tableInfo.code === 'moneywheel') {
        config = { beadRoad: { row: 5, col: 8 }, statistics: { beadRoadDemoGraph: true } }
        roadType = 'beadRoad'
      // Baccarat, Dragon Tiger Config
      } else if (_s.tableInfo.code === 'roulette') {
        config = { beadRoad: { row: 6, col: 12 } }
        _s.roadConfig.beadRoad.row = 6
        _s.roadConfig.beadRoad.col = 12
        roadType = 'beadRoad'
      // Baccarat, Dragon Tiger Config
      } else {
        config = { bigRoad: { row: 6, col: 12 }, statistics: { bigRoadDemoGraph: true }}
        roadType = 'bigRoad'
      }

      // Execute functions
      _s.$store.dispatch('GET_ROAD_MAP', {
        config: config,
        tableNumber: _s.tableNum,
        shoeHand: _s.tableInfo.shoeGame,
        gameName: _s.tableInfo.code
      }).then((res) => {
        // console.log(res)
        try {
          if (_s.tableInfo.code !== 'roulette') {
            _s.statistic = res.statistic.demographic[roadType]
          }
          _s.roadData[roadType] = flatMatrix(res[roadType].canvass, config[roadType].col)
          _s.roadConfig[roadType].col = config[roadType].col
        } catch (err) {
          console.log('GET_ROAD_MAP', err)
        }
      })
    },

    loadCardRoad2: function () {
      this.$store
        .dispatch('LOAD_ROAD_MAP', {
          gameType: this.tableInfo.code,
          tableNumber: this.tableInfo.tableNumber
        })
        .then((resData) => {

          switch(_.toLower(this.tableInfo.code)) {
            case 'baccarat':
            case 'dragontiger':
              _.assign(resData, {
                config: {
                  bigRoad: {rows: 6, columns: 12},
                  // bigRoad: {rows: 6, columns: 24},
                  // bigEyeRoad: {rows: 3, columns: 24},
                  // smallRoad: {rows: 3, columns: 12},
                  // roachRoad: {rows: 3, columns: 12}
                }
              });
              break;
            case 'moneywheel':
              _.assign(resData, {
                config: {
                  beadRoad: {rows: 6, columns: 12},
                }
              });
              break;
            case 'roulette':
              _.assign(resData, {
                config: {
                  beadRoad: {rows: 6},
                }
              });
              break;
            case 'niuniu':
              _.assign(resData, {
                config: {
                  beadRoad: {columns: 12},
                }
              });
              break;
            case 'threecards':
              _.assign(resData, {
                config: {
                  beadRoad: {rows: 6, columns: 12},
                }
              });
              break;
            default:
              console.warn('Invalid Table Code');
              break;
          }
          this.roadMapData = resData;
        })
        .catch((error) => {
          console.error('Unable to pull road-map data.', JSON.stringify(error))
        })
    },
    loadGoodTips: function () {
      let _s = this
      // Execute functions
      _s.$store.dispatch('GET_GOOD_TIPS', {
        tableNumber: _s.tableNum,
        customPattern: _s.$store.state.customPattern,
        isBroadcast: false
      })
    },
    imageLoadOnError: function () {
      this.tableInfo.dealer.imagePrestige = this.$store.state.noImg
    }
  }
}

/**
 * Used to help flatten 2D matrix by column
 * @param matrix
 * @param columnLength
 * @returns {Array}
 */
function flatMatrix(matrix = [], columnLength = 0) {
  let finalArray = [];

  if (!matrix.length || !columnLength) return []
  // Flatten matrix by column
  for (let col = 0; col < columnLength; col++) {
    finalArray.push(matrix.map(function(value) { return value[col] }))
  }
  return _.flatMap(finalArray);
}
