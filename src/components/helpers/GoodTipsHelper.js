/*
Handles most of the good tips logic
*/
export default {
  data () {
    return {
      // Note that first colors (red/blue) on each item are just checkers to ensure that the pattern is exactly as is
      // Didn't bother looping or creating function for it since it might make the function slower
      goodTipsList: {
        gt1: 'blue,red,red,red,red',
        gt2: 'red,blue,blue,blue,blue',
        gt3: 'blue,red,red,blue,blue,blue,blue,red,red',
        gt4: 'red,blue,red,blue,red',
        gt5: 'blue,red,blue,blue,red,blue,blue',
        gt6: 'blue,red,red,red,red,blue,red,blue,red',
        gt7: 'red,blue,red,red,blue,red,red',
        gt8: 'red,blue,blue,red,blue,blue,blue,blue,red',
        gt9: 'blue,red,red,red,red,blue,red,red,blue',
        gt10: 'blue,red,blue,red,red,blue,red,blue,red,red',
        gt11: 'red,blue,red,blue,blue,red,blue,red,blue,blue',
        gt12: '' // special case/computation inside loop
      }
    }
  },
  methods: {
    filterGames (tableNumber) {
      /*
      / TODO: Improve function, possibly make loops native javascript instead of using lodash
      */
      if (tableNumber.includes('M')) {
        return false
      }
      let _s = this
      let tableRoad = this.$store.state.tablelist[tableNumber].road
      if (tableRoad[tableRoad.length - 1] && (tableRoad[tableRoad.length - 1].result.includes(',') || tableRoad[tableRoad.length - 1].result.includes('tie'))) {
        return false
      }
      tableRoad = _.dropRightWhile(tableRoad, (a) => { return a.result.includes('tie') }) // Remove all ties
      let tableResults = _.takeRight(tableRoad, 9) // Gets last 9 results
      let roadResults = []
      _.each(tableResults, (x) => roadResults.push(x.result))
      _.each(roadResults, (x, i) => {
        if (x.includes(',')) {
          x = x.split(',')
          x = x[0]
          roadResults[i] = x
        }
        if (x === 'player' || x === 'dragon') {
          roadResults[i] = 'blue'
        }
        if (x === 'banker' || x === 'tiger') {
          roadResults[i] = 'red'
        }
      })
      roadResults = roadResults.join(',')
      let finalVal = false
      _.map(_s.goodTipsList, (val, key) => {
        if (key === 'gt12') {
          let croad = _.flatten(_.flatten(this.$store.state.tablelist[tableNumber].roadMaps.cockRoach)) // cockroach road plotted, use flatten twice to remove row and columns
          let checker = _.find(croad, {class: 'red-dot lastResult', isGT12: true})
          if (checker) {
            _s.$store.state.tablelist[tableNumber].goodTips[key] = true
            if (_s.selectedGoodTips[key]) {
              finalVal = true
            }
          }
          return
        }
        let comparators = roadResults.slice((val.length * -1)) // gets needed values depending on what category to compare on, use negative values to start from last string character
        if (comparators === val) {
          _s.$store.state.tablelist[tableNumber].goodTips[key] = true
          if (_s.selectedGoodTips[key]) {
            finalVal = true
          }
        } else {
          _s.$store.state.tablelist[tableNumber].goodTips[key] = false
        }
      })

      return finalVal
    },
    goodTipsCheck (tableNumber) {
      if (!this.selectedGoodTips) {
        return true
      }
      return this.filterGames(tableNumber)
    }
  },
  computed: {
    selectedGoodTips () {
      let x = _.pickBy(this.$store.state.goodTipsActive, (a) => a === true)
      // let actives = {}
      return _.isEmpty(x) ? null : x
    }
  }
}
