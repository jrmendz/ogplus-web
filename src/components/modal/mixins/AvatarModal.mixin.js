// export default {
//   data () {
//     return {
//       oldNickName: 'Hello World!'
//     }
//   },
//   methods: {
//     formatToPrice (value) {
//       return this.$options.filters.toMoney(value)
//       // return value.toLocaleString()
//       // return value.toFixed(2)
//     },
//     nosaveChanges: function () {
//       let _s = this
//       _s.$store.dispatch('GET_USER_INFO_AVATAR')
//       _s.$store.state.avatarModal = false
//     },
//     saveChanges: function () {
//       let _s = this
//       let validation = _s.nickname.trim()
//       if (!_s.modified) {
//         _s.$store.state.avatarModal = false
//         return false
//       } else {
//         if (validation.length <= 12 && validation.length >= 1) {
//           _s.$store.state.avatarModal = false
//           let user = Object.assign({
//             nickname: _s.$store.state.userinfo.nickname.trim(),
//             imgname: _s.$store.state.userinfo.avatar
//           })
//           _s.$store.dispatch('UPDATE_USER', user).then((res) => {
//             _s.$store.dispatch('SET_USER_NICKNAME_ON_CHAT', {
//               token: localStorage._token,
//               newNickname: _s.nickname,
//               oldNickname: _s.oldNickName,
//               table_number: this.$store.state.currentTableIndex || null
//             }).then((res) => {
//               // If successfully update, also update the oldNickname to new nickname
//               _s.oldNickName = _s.nickname
//               console.log(res)
//             }, (err) => {
//               console.log(err)
//             })
//           }, (err) => {
//             // Will return to it's old nickname
//             _s.nickname = _s.oldNickName
//             console.log(err)
//           })
//         } else {
//           this.$store.dispatch('GET_USER_INFO_AVATAR').then(() => {
//             let _s = this
//             // _s.$store.state.message = 'Nickname is required'
//             // _s.$store.state.lobbymessage = 'Nickname is required'
//             _s.$store.state.avatarModal = false
//           }, (err) => {
//             console.log('GET_USER_INFO_AVATAR', err)
//           })
//         }
//       }
//     },
//     updateAvatar: function (e) {
//       let _s = this
//       let avtr = e.srcElement.value
//       _s.modified = true
//       let obj = avtr < 10 ? 'http://og-333.s3.amazonaws.com/panda/assets/avatar/avtr_0' + avtr + '.png' : 'http://og-333.s3.amazonaws.com/panda/assets/avatar/avtr_' + avtr + '.png'
//       _s.$store.commit('SET_USER_AVATAR', obj)
//     },
//     isActiveAvatar (avatar) {
//       let _s = this
//       let obj = avatar < 10 ? 'http://og-333.s3.amazonaws.com/panda/assets/avatar/avtr_0' + avatar + '.png' : 'http://og-333.s3.amazonaws.com/panda/assets/avatar/avtr_' + avatar + '.png'
//       let avatard = _s.$store.state.userinfo.avatar
//       return obj === avatard
//     }
//   },
//   mounted () {
//     setTimeout(() => {
//       let s = this
//       // Used to have a copy of current nickname
//       s.oldNickName = this.$store.state.userinfo.nickname
//     }, 2000)
//   },
//   computed: {
//     nickname: {
//       get () {
//         let _s = this
//         return _s.$store.state.userinfo.nickname
//       },
//
//       set (nickname) {
//         let _s = this
//         _s.modified = true
//         _s.$store.commit('SET_USER_NICKNAME', nickname)
//       }
//     },
//
//     balance: {
//       get () {
//         let _s = this
//         return _s.$store.state.userinfo.balance
//       },
//
//       set (balance) {
//         let _s = this
//         _s.$store.commit('SET_USER_BALANCE', balance)
//       }
//     },
//
//     avatar: {
//       get () {
//         let _s = this
//         return _s.$store.state.userinfo.avatar
//       },
//
//       set (avatar) {
//         let _s = this
//         _s.$store.commit('SET_USER_AVATAR', avatar)
//       }
//     },
//
//     drawerWidth: {
//       get () {
//         let _s = this
//         return _s.$store.state.drawerWidth
//       },
//
//       set (drawerWidth) {
//         let _s = this
//         _s.$store.commit('SET_DRAWER_WIDTH', drawerWidth)
//       }
//     }
//   }
// }
