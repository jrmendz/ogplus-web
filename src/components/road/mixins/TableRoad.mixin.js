// export default {
//   data () {
//     return {
//       num: 0,
//       finalMainrod: [],
//       lastBigRoadResult: {}
//     }
//   },
//   methods: {
//     mwRoad (r, c, tbl) {
//       r -= 1
//       c -= 1
//       if (!this._road || !this._road.wheelies || !this._road.wheelies[r] || !this._road.wheelies[r][c]) {
//         return ''
//       }
//       let rd = this._road.wheelies
//       if (!rd && !rd) {
//         return ''
//       }
//       return !rd[r][c] ? '' : rd[r][c].result
//     },
//     MRRoad (r, c, cs, tbl) {
//       let beadRoadLeng = this._road.beadRoad.length
//       r--
//       cs = cs - 0 // no space for beadroad
//       c = beadRoadLeng > cs ? (c - 1) + (beadRoadLeng - cs) : c - 1 // get the latest road
//       if (!this._road || !this._road.beadRoad || !this._road.beadRoad[c] || !this._road.beadRoad[c][r]) {
//         return ''
//       }
//       let rd = this._road.beadRoad[c] && this._road.beadRoad[c][r] ? this._road.beadRoad[c][r].result : ''
//       let ar = _.split(rd, ',')
//       let roadClass = ''
//       ar.forEach(function (value, index) {
//         switch (value) {
//           case 'banker' :
//             roadClass += ' red-dot --is-red'
//             break
//           case 'player' :
//             roadClass += ' blue-dot --is-blue'
//             break
//           case 'tiger' :
//             roadClass += ' red-dot --is-red'
//             break
//           case 'dragon' :
//             roadClass += ' blue-dot --is-blue'
//             break
//           case 'banker_pair' :
//             roadClass += ' --is-bp'
//             break
//           case 'player_pair' :
//             roadClass += ' --is-pp'
//             break
//           case 'tie' :
//             roadClass += ' green-dot --is-green --is-pp --is-bp'
//         }
//       })
//       return roadClass
//     },
//     MRRoadText (r, c, cs, tbl) {
//       let beadRoadLeng = this._road.beadRoad.length
//       r--
//       cs = cs - 0 // 2 spaces for beadroad
//       c = beadRoadLeng > cs ? (c - 1) + (beadRoadLeng - cs) : c - 1 // get the latest road
//       if (!this._road || !this._road.beadRoad || !this._road.beadRoad[c] || !this._road.beadRoad[c][r]) {
//         return ''
//       }
//       let rd = this._road.beadRoad[c] && this._road.beadRoad[c][r] ? this._road.beadRoad[c][r].result : ''
//       let ar = _.split(rd, ',')
//       let roadLabel = ''
//       switch (ar[0]) {
//         case 'banker' :
//           roadLabel = this.tt('B')
//           break
//         case 'player' :
//           roadLabel = this.tt('P')
//           break
//         case 'tie' :
//           roadLabel = this.tt('T')
//           break
//         case 'dragon' :
//           roadLabel = this.tt('D')
//           break
//         case 'tiger' :
//           roadLabel = this.tt('T')
//           break
//       }
//       return roadLabel
//     },
//     BRRoad (r, c, isMiniCard, tbl) {
//       let _s = this
//       // Shifts roadmap of sidebar/lobby card games
//       let lastCol = _s.lastRoadColumn
//       if (isMiniCard && lastCol > 10) {
//         c += (lastCol - 10)
//       }
//       r--
//       c--
//       if (!_s._road || !_s._road.bigRoads || !_s._road.bigRoads[r] || !_s._road.bigRoads[r][c]) {
//         return '--is-out line'
//       }
//       let rd = _s._road.bigRoads && _s._road.bigRoads[r] && _s._road.bigRoads[r][c] ? _s._road.bigRoads[r][c].class : ''
//       let ar = _.split(rd, ' ')
//       let roadClass = '--is-outline'
//       ar.forEach(function (value, index) {
//         switch (value) {
//           case '-banker' :
//             roadClass += ' red-dot --is-red'
//             break
//           case '-player' :
//             roadClass += ' blue-dot --is-blue'
//             break
//           case '-bp' :
//             roadClass += ' --is-bp'
//             break
//           case '-pp' :
//             roadClass += ' --is-pp'
//             break
//         }
//       })
//       return roadClass
//     },
//     BRRoadtieCount (r, c, isMiniCard, tbl) {
//       // Shifts roadmap tie count of sidebar/lobby card games
//       let lastCol = this.lastRoadColumn
//       if (isMiniCard && lastCol >= 10) {
//         c += (lastCol - 10)
//       }
//       r--
//       c--
//       if (!this._road || !this._road.bigRoads || !this._road.bigRoads[r] || !this._road.bigRoads[r][c]) {
//         return ''
//       }
//       let rd = this._road.bigRoads[r][c].class
//       let ar = _.split(rd, ' ')
//       let tieCount = 0
//       ar.forEach(function (value, index) {
//         switch (value) {
//           case '-tie' :
//             tieCount++
//             break
//         }
//       })
//       if (tieCount === 0) {
//         tieCount = ''
//       }
//       return tieCount
//     },
//     BERoad (r, c, tbl, item) {
//       r -= 1
//       c -= 1
//       if (!this._road || !this._road.bigEye || !this._road.bigEye[r] || !this._road.bigEye[r][c]) {
//         return ''
//       }
//       let rd = this._road.bigEye[r][c]
//       let ar = _.split(rd[item].class, ' ')
//       let roadClass = '--is-outline'
//       ar.forEach(function (value, index) {
//         switch (value) {
//           case 'red-dot' :
//             roadClass += ' red-dot --is-red'
//             break
//           case 'blue-dot' :
//             roadClass += ' blue-dot --is-blue'
//             break
//           case 'samePrediction' :
//             roadClass += ' samePrediction'
//             break
//           case 'oppositePrediction' :
//             roadClass += ' oppositePrediction'
//             break
//           case 'lastResult' :
//             roadClass += ' lastResult'
//             break
//         }
//       })
//       return !roadClass ? '' : roadClass
//     },
//     SRRoad (r, c, tbl, item) {
//       r -= 1
//       c -= 1
//       if (!this._road || !this._road.smallRoad || !this._road.smallRoad[r] || !this._road.smallRoad[r][c]) {
//         return ''
//       }
//       let rd = this._road.smallRoad[r][c]
//       let ar = _.split(rd[item].class, ' ')
//       let roadClass = ''
//       ar.forEach(function (value, index) {
//         switch (value) {
//           case 'red-dot' :
//             roadClass += ' red-dot --is-red'
//             break
//           case 'blue-dot' :
//             roadClass += ' blue-dot --is-blue'
//             break
//         }
//       })
//       return !roadClass ? '' : roadClass
//     },
//     CRRoad (r, c, tbl, item) {
//       let _s = this
//       r -= 1
//       c -= 1
//       if (!_s._road || !_s._road.cochRoach || !_s._road.cochRoach[r] || !_s._road.cochRoach[r][c]) {
//         return null
//       }
//       let rd = this._road.cochRoach[r][c]
//       let ar = _.split(rd[item].class, ' ')
//       let roadClass = ''
//       ar.forEach(function (value, index) {
//         if (rd[item].isFilled) {
//           switch (value) {
//             case 'red-dot' :
//               roadClass += ' red-slash --is-red'
//               break
//             case 'blue-dot' :
//               roadClass += ' blue-slash --is-blue'
//               break
//           }
//         }
//       })
//       return !roadClass ? '' : roadClass
//     }
//   },
//   props: {
//     index: '',
//     table: '',
//     rows: '',
//     columns: '',
//     isGoodTips: false,
//     isBigRoad: false,
//     isMainRoad: false,
//     isBigEyeRoad: false,
//     isSmallRoad: false,
//     isCockRoachRoad: false,
//     isAnimal: false,
//     isDragon: false,
//     isMiniCard: false
//   },
//   created: function () {
//     let _s = this
//     if (_s.$props.isGoodTips) {
//       return false
//     }
//     let roadMaps = localStorage.getItem('roadMaps_' + _s.$props.table.tableNumber)
//     if (roadMaps !== null) {
//       _s._road = JSON.parse(roadMaps).data
//     } else {
//       _s.$store.dispatch('GET_ROADMAP', _s.table.tableNumber)
//     }
//   },
//   computed: {
//     _road: {
//       get () {
//         return this.$store.state.tablelist[this.table.tableNumber].roadMaps
//       },
//       set (newValue) {
//         this.$store.state.tablelist[this.table.tableNumber].roadMaps = newValue
//       }
//     },
//     lastRoadColumn () {
//       let _s = this
//       let road = _s._road.bigRoads
//       let lastColumn = 0
//       _.eachRight(road, (value, index) => {
//         let lastIndex = _.findLastIndex(value, 'isFilled')
//         lastColumn = lastIndex > lastColumn ? lastIndex : lastColumn
//       })
//       // console.log('lastColumn', lastColumn)
//       return lastColumn
//     },
//     goodtips_patterns: function () {
//       return this.$store.state.goodtips_patterns
//     }
//   }
// }
