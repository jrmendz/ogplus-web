// // import TableRoad from '@/components/road/TableRoad'
// import Road from '@/components/road/RoadTemplate'
// import Global from '@/library/Global.js'
// export default {
//   mixins: [ Global ],
//   components: {
//     // TableRoad,
//     Road
//   },
//   props: {
//     table: '',
//     index: ''
//   },
//   data () {
//     return {
//       bigRoad: [],
//       tableNum: this.$props.index,
//       tableInfo: this.$props.table
//     }
//   },
//   mounted () {
//     this.loadCardRoad()
//   },
//   computed: {
//     status: {
//       get () {
//         return this.$store.state.tablelist[this.tableNum].status
//       }
//     },
//     timer: {
//       get () {
//         return this.$store.state.tablelist[this.tableNum].game.timer || 0
//       }
//     },
//     isHalted: {
//       get () {
//         return this.$store.state.haltedTbl.list.indexOf(this.tableNum) > -1
//       }
//     },
//   },
//   watch: {
//     status: function (n, o) {
//       if (n === 'default') {
//         this.loadCardRoad()
//       }
//     }
//   },
//   methods: {
//     clickEff: function () {
//       let _s = this
//       if (_s.$store.state.soundFxSwitch === true) {
//         _s.$store.state.audiosprite['spotFX'].play('click')
//       }
//     },
//     enterGame (isSideBet = false) {
//       let _s = this
//
//       if (_s.tableInfo.code !== 'moneywheel') {
//         if (parseInt(_s.$store.state.userinfo.balance) >= _s.$store.state.chipsminbalance) {
//           _s.$store.dispatch(isSideBet ? 'ENTER_TABLE' : 'ENTER_SIDEBET', { data: _s.tableInfo, tableid: _s.tableNum })
//         } else {
//           // let message = 'minimum balance is 500'
//           // _s.notification(message)
//           _s.$store.state.message = 'minimum balance is ' + _s.$store.state.chipsminbalance
//           _s.$store.state.lobbymessage = 'minimum balance is ' + _s.$store.state.chipsminbalance
//         }
//       } else {
//         _s.$store.dispatch(isSideBet ? 'ENTER_TABLE' : 'ENTER_SIDEBET', { data: _s.tableInfo, tableid: _s.tableNum })
//       }
//       localStorage.setItem('_confirm', 'off')
//       _s.clickEff()
//     },
//     loadCardRoad: function () {
//       let _s = this
//       let tableNumber = _s.tableNum
//       // Validators
//       if (!tableNumber) return
//       // Execute function
//       _s.$store.dispatch('GET_ROAD_MAP', {
//         config: { bigRoad: { row: 6, col: 12 }},
//         tableNumber: tableNumber
//       }).then((res) => {
//         console.log(res)
//         _s.bigRoad = res.bigRoad
//       })
//     }
//   }
// }
