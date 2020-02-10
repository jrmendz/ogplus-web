import CardGames from '@/components/sidebar/games/CardGames'
export default {
  components: { CardGames },
  data () {
    return {
      finalTable: []
    }
  },

  mounted() {
    this.matchedGoodTips(this.tables, this.goodTipsMatch, this.goodTipsActive)
  },

  computed: {
    tables: {
      get () { return this.$store.state.tablelist }
    },
    goodTipsMatch: {
      get () { return this.$store.state.goodTipsMatch }
    },
    goodTipsActive: {
      get () { return this.$store.state.goodTipsActive }
    },
    goodTipsList : {
      get () { return this.$store.state.goodTipsList },
      set (v) { this.$store.state.goodTipsList = v }
    },
    inGameTable: {
      get () { return this.$store.state.currentTableIndex }
    }
  },
  methods: {
    /**
     * Good Tips List Processing Function
     * @param tableList
     * @param goodTipsMatched
     * @param goodTipsActive
     * @returns {Array}
     */
    matchedGoodTips: function (tableList = {}, goodTipsMatched = [], goodTipsActive = {}) {
      let _s = this
      let goodTipsException = _s.$store.state.goodTipsException // Game not to be shown on good tips bar
      let INITIAL_CHAR_OF_TABLE_INCLUDED = _s.$store.state.liveGame
      let activeTips = Object.getOwnPropertyNames(_.pickBy(goodTipsActive, (i) => i === true))
      let tables = [], matchedTips = [], unMatchedTips = []

      // Filter active and valid tables
      _.forEach(tableList, (v, k) => {
        let index = locIndex(tables, 'tableNumber', k)
        let dataToInsert = { tableNumber: k, gameName: v.code }
        let isIncluded = INITIAL_CHAR_OF_TABLE_INCLUDED.indexOf(k[0]) > -1

        // if (_.includes(['moneywheel'], v.code)) return;

        // Validators
        if (k === _s.inGameTable) return // Good Tips Table will be hidden when on In-Game
        if (index > -1) { // Table exist on list
          if (v.status !== 'disconnected' && isIncluded) {
            tables[index] = dataToInsert
          } else {
            tables.splice(index, 1)
          }
        } else { // Table not exist on list
          if (v.status !== 'disconnected' && isIncluded) {
            tables.push(dataToInsert)
          }
        }
      })

      // Probe for Good Tips tables
      for (let i = 0; i < tables.length; i++) {
        let table = tables[i]
        let index = _.findIndex(goodTipsMatched, (o) => { return o['tableNumber'] === table['tableNumber']})
        // Probe the table position in the table list
        if (index > -1) {
          // Check if the table has a matched good tips
          if (_.difference(activeTips, goodTipsMatched[index].goodTips).length !== activeTips.length && _.findIndex(goodTipsException, (o) => { return o === table.gameName }) === -1) {
            matchedTips.push(Object.assign(table, { hasGoodTips: true }))
          } else {
            unMatchedTips.push(Object.assign(table, { hasGoodTips: false }))
          }
        } else {
          unMatchedTips.push(Object.assign(table, { hasGoodTips: false }))
        }
      }
      // Sort tables alphanumerically
      matchedTips = matchedTips.sort((a, b) => a['tableNumber'].localeCompare(b['tableNumber'], 'en', { numeric: true }))
      unMatchedTips = unMatchedTips.sort((a, b) => a['tableNumber'].localeCompare(b['tableNumber'], 'en', { numeric: true }))

      // Return and sort table number in alphanumeric order
      // _s.goodTipsList = returnTable.sort((a, b) => a['tableNumber'].localeCompare(b['tableNumber'], 'en', { numeric: true }))
      // _s.goodTipsList = returnTable
      _s.finalTable = _.union(matchedTips, unMatchedTips)

      /**
       * Private helper of finding index in an array of objects
       * @param array
       * @param obj
       * @param key
       * @returns {*}
       */
      function locIndex (array, obj, key) {
        return array.map((d) => { return d[obj] }).indexOf(key)
      }
    }
  },

  watch: {
    goodTipsMatch: function (n) {
      if (n) {
        this.matchedGoodTips(this.tables, this.goodTipsMatch, this.goodTipsActive)
      }
    },
    inGameTable: function () {
      this.matchedGoodTips(this.tables, this.goodTipsMatch, this.goodTipsActive)
    },
    tables: function () {
      this.matchedGoodTips(this.tables, this.goodTipsMatch, this.goodTipsActive)
    },
    goodTipsActive: {
      handler: function (n) {
        if (n) {
          this.matchedGoodTips(this.tables, this.goodTipsMatch, this.goodTipsActive)
        }
      },
      deep: true
    }
  }
}
