import Global from '@/library/Global.js'

export default {
  mixins: [ Global ],
  /*
    ________          __
    \______ \ _____ _/  |______
     |    |  \\__  \\   __\__  \
     |    `   \/ __ \|  |  / __ \_
    /_______  (____  /__| (____  /
            \/     \/          \/
   */
  data () {
    return {
      selected: [],
      // START: Avatar Component
      oldNickName: 'Hello World!',
      // END: Avatar Component

      // START: ChipModal Component
      // END: ChipModal Component

      // START: Gift Modal Component
      storeItems: [
        { image: '/static/storeicon/airplane.svg' },
        { image: '/static/storeicon/books.svg' },
        { image: '/static/storeicon/coins.svg' },
        { image: '/static/storeicon/creativity.svg' },
        { image: '/static/storeicon/money.svg' },
        { image: '/static/storeicon/money-bag-with-dollar-symbol.svg' },
        { image: '/static/storeicon/planet-earth.svg' },
        { image: '/static/storeicon/telescope.svg' },
        { image: '/static/storeicon/ufo.svg' },
      ],
      gifts: [
        // { isCus: 1, image: 'https://static.oriental-game.com/svg/gift/plane.svg', label: null, value: null },
        { isCus: 0, image: 'https://static.oriental-game.com/gift/kisslips_icon.png', label: 'Lips Kiss', value: 10 },
        { isCus: 0, image: 'https://static.oriental-game.com/gift/explosive_icon.png', label: 'Explosives', value: 50 },
        { isCus: 0, image: 'https://static.oriental-game.com/gift/star1.png', label: 'Stars', value: 100 },
        { isCus: 0, image: 'https://static.oriental-game.com/gift/star1.png', label: 'Dog', value: 200 },
        // { isCus: 0, image: 'https://static.oriental-game.com/gift/star1.png', label: 'Great Wall', value: 300 },
        { isCus: 0, image: 'https://static.oriental-game.com/gift/star1.png', label: 'Coy', value: 400 },
        { isCus: 0, image: 'https://static.oriental-game.com/gift/star1.png', label: 'Flower', value: 400 }
        // { isCus: 0, image: '/static/svg/gift/birthday cake.svg', label: 'Birthday Cake', value: 50 },
        // { isCus: 0, image: '/static/svg/gift/red envelope.svg', label: 'Red Envelope', value: 100 },
        // { isCus: 0, image: '/static/svg/gift/special gift.svg', label: 'Special Gift', value: 500 },
        // { isCus: 0, image: '/static/svg/gift/casino chip.svg', label: 'Casino Chip', value: 1000 },
        // { isCus: 0, image: '/static/svg/gift/diamond ring.svg', label: 'Diamond Ring', value: 5000 },
        // { isCus: 0, image: '/static/svg/gift/sports car.svg', label: 'Sports Car', value: 8000 },
        // { isCus: 0, image: '/static/svg/gift/yacht.svg', label: 'Yacht', value: 10000 },
        // { isCus: 0, image: '/static/svg/gift/plane.svg', label: 'Airplane', value: 15000 }
      ],
      // END: Gift Modal Component

      // START: Social Modal Component
      count: 0,
      // END: Social Modal Component


      // START: Notification Component (OLD)
      y: 'top',
      x: null,
      mode: 'vertical',
      timeout: 6000,
      editChip: false,
      notificationMsg: ''
      // END: Notification Component
    }
  },
  /*
    _________                        __             .___
    \_   ___ \_______   ____ _____ _/  |_  ____   __| _/
    /    \  \/\_  __ \_/ __ \\__  \\   __\/ __ \ / __ |
    \     \____|  | \/\  ___/ / __ \|  | \  ___// /_/ |
     \______  /|__|    \___  >____  /__|  \___  >____ |
            \/             \/     \/          \/     \/
   */
  created () {},
  /*
       _____                       __             .___
      /     \   ____  __ __  _____/  |_  ____   __| _/
     /  \ /  \ /  _ \|  |  \/    \   __\/ __ \ / __ |
    /    Y    (  <_> )  |  /   |  \  | \  ___// /_/ |
    \____|__  /\____/|____/|___|  /__|  \___  >____ |
            \/                  \/          \/     \/
   */
  mounted () {
    let _s = this
    // START: Avatar Component
    setTimeout(() => {
      let s = this
      // Used to have a copy of current nickname
      s.oldNickName = this.$store.state.userinfo.nickname
    }, 2000)
    // END: Avatar Component

    _s.setTempdefaultchip()
  },
  /*
       _____          __  .__               .___
      /     \   _____/  |_|  |__   ____   __| _/______
     /  \ /  \_/ __ \   __\  |  \ /  _ \ / __ |/  ___/
    /    Y    \  ___/|  | |   Y  (  <_> ) /_/ |\___ \
    \____|__  /\___  >__| |___|  /\____/\____ /____  >
            \/     \/          \/            \/    \/
   */
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    setTempdefaultchip () {
      let _s = this
      let tempChip = _.filter(_s.$store.state.TempbettingChips, 'isActive')
      if (tempChip.length === 0) {
        _s.$store.state.TempbettingChips[0].isActive = true
        _s.$store.state.TempbettingChips[0].isCustom = true
      }
    },
    // START: Common
    formatToPrice (value) {
      return this.$options.filters.toMoney(value)
    },
    // END: Common

    // START: Avatar Component
    nosaveChanges: function () {
      let _s = this
      _s.$store.dispatch('GET_USER_INFO_AVATAR')
      _s.$store.state.avatarModal = false
      _s.clickEff()
    },
    saveChanges: function () {
      let _s = this
      let validation = _s.nickname.trim()
      _s.clickEff()
      if (!_s.modified) {
        _s.$store.state.avatarModal = false
        return false
      } else {
        if (validation.length <= 12 && validation.length >= 1) {
          console.log(validation, 'meron')
          _s.$store.state.avatarModal = false
          let user = Object.assign({
            nickname: _s.$store.state.userinfo.nickname.trim(),
            imgname: _s.$store.state.userinfo.avatar
          })
          _s.$store.dispatch('UPDATE_USER', user).then((res) => {
            _s.$store.dispatch('SET_USER_NICKNAME_ON_CHAT', {
              token: localStorage._token,
              newNickname: _s.nickname,
              oldNickname: _s.oldNickName,
              table_number: this.$store.state.currentTableIndex || null
            }).then((res) => {
              // If successfully update, also update the oldNickname to new nickname
              _s.oldNickName = _s.nickname
              // _s.$store.dispatch('WINNINGAMOUNT_USER')
              console.log(res)
            }, (err) => {
              console.log(err)
            })
          }, (err) => {
            // Will return to it's old nickname
            _s.nickname = _s.oldNickName
            console.log(err)
          })
        } else {
          console.log(validation, 'wala')
          this.$store.dispatch('GET_USER_INFO_AVATAR').then(() => {
            let _s = this
            _s.$store.state.message = 'Nickname is required'
            // _s.$store.state.lobbymessage = 'Nickname is required'
            _s.$store.state.avatarModal = true
          }, (err) => {
            console.log('GET_USER_INFO_AVATAR', err)
          })
        }
      }
    },
    updateAvatar: function (e) {
      let _s = this
      _s.clickEff()
      let avtr = e.srcElement.value
      _s.modified = true
      let obj = avtr < 10 ? 'http://static.oriental-game.com/avatars/desktop/avatar' + avtr + 'a.png' : 'http://static.oriental-game.com/avatars/desktop/avatar' + avtr + 'a.png'
      _s.$store.commit('SET_USER_AVATAR', obj)
    },
    isActiveAvatar (avatar) {
      let _s = this
      let obj = avatar < 10 ? 'http://static.oriental-game.com/avatars/desktop/avatar' + avatar + 'a.png' : 'http://static.oriental-game.com/avatars/desktop/avatar' + avatar + 'a.png'
      let avatard = _s.$store.state.userinfo.avatar
      return obj === avatard
    },

    activeClick: function (chip) {
      let _s = this
      let activeChips = _.filter(_s.bettingChips, 'isCustom')
      let countChips = _.filter(_s.$store.state.bettingChips, 'isActive')

      if (!_s.editChip) {
        if (countChips.length < 5) {
          chip.isActive = !chip.isActive
          if (countChips.length === 1)
            chip.isActive = true
        } else {
          if (activeChips.length > 0) {
            if (!chip.isActive) {
              activeChips[0].isActive = false
              chip.isActive = true
            } else
              chip.isActive = false
          } else {
            if (!chip.isActive) {
              _s.bettingChips[4].isActive = false
              chip.isActive = true
            } else
              chip.isActive = false
          }
        }
        _s.bettingChips.forEach(function (content, index) {
          if (content.class === chip.class) {
            _.mapValues(_s.bettingChips, function (x) { x.isCustom = false }) // this is to set all isCustom to default
            content.isCustom = true // this is to set the chips to be move
          }
        })
      } else {
        if (chip.isActive) {
          chip.isActive = !chip.isActive
          // chip.isActive = true
          _.mapValues(_s.TempbettingChips, function (x) { x.isCustom = false })
        } else {
          _.mapValues(_s.TempbettingChips, function (x) { x.isActive = false, x.isCustom = false })
          chip.isActive = true
          chip.isCustom = true
          _s.customChipsValue = chip.value
        }
      }
    },

    setchipModal: function () {
      let _s = this
      let customchips = _s.$store.state.customChipsValue
      let duplicateValue = _.find(_s.$store.state.TempbettingChips, x => x.value === customchips.toString())
      let countChips = _.filter(_s.$store.state.TempbettingChips, 'isActive')

      if (countChips.length === 0) {
        // Dinhi pag kita kun may ada kaparihas nga chips.
        _s.notificationMsg = _s.tt('No Chips selected')
        _s.$store.state.customChipsValue = _s.$store.state.tempcustomChipsValue
      } else if (duplicateValue) {
        _s.notificationMsg = _s.tt('Chip amount is already existing')
        _s.$store.state.customChipsValue = countChips[0].value
      } else {
        if (_s.editChip) {
          if (customchips > 0) {
            _s.$store.commit('SET_PLAYER_CHIPS', customchips)
            _s.$store.state.tempcustomChipsValue = customchips
            _s.notificationMsg = 'Successfully changed the Chip amount'
            _s.$store.state.TempChipClass = _s.$store.state.bettingSpecialChip[0].class
            let TempchipCustom = _.filter(_s.$store.state.TempbettingChips, 'isCustom')
            if (TempchipCustom.length > 0) {
              let chipCustom = _.find(_s.$store.state.bettingChips, x => x.class === TempchipCustom[0].class)

              //set the chips
              chipCustom.value = _s.$store.state.customChipsValue
              TempchipCustom[0].value = _s.$store.state.customChipsValue
              TempchipCustom[0].isActive = true
              // TempchipCustom[0].isCustom = false -gin tangal para permi la active pag pili nang chips
              if (_s.$store.state.selectedChip.class === TempchipCustom[0].class) {
                _s.$store.state.selectedChip.value = TempchipCustom[0].value
              }
              //call method to edit chips
              _s.setupEditChips()
            }
          }
        } else {
          _s.$store.state.Tempdefaultchip = _s.$store.state.bettingChips
          _s.$store.state.customChipsValue = _s.$store.state.tempcustomChipsValue
          let valuechip = _.find(_s.$store.state.TempbettingChips, x => x.value === customchips.toString())
          valuechip.isActive = true
        }
      }
    },
    setupEditChips: function () {
      // setup array to arrange the selected chips to first array
      let setchips = [], toclone = []
      let _s = this

      let customchips = _s.$store.state.customChipsValue
      _.each(_s.$store.state.bettingChips, (val, index) => {
        if (val.value === customchips && val.isActive === true) {
          setchips.push(val)
        } else {
          toclone.push(val)
        }
      })
      _s.$store.state.bettingChips = _.cloneDeep(_.union(setchips, toclone))
      // alfie. This is to setup edit chips from Temp.
      _s.$store.state.TempbettingChips = _.cloneDeep(_s.$store.state.bettingChips)
      _.mapValues(_s.$store.state.TempbettingChips, function (x) { x.isActive = false })
      _.each(_s.$store.state.TempbettingChips, (val, index) => {
        if (val.value === customchips) {
          _s.$store.state.TempbettingChips[index].isActive = true
        }
      })
    },
    addCommas: function (nStr) {
      nStr += '';
      let x = nStr.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    },
    sendGift: function (index) {
      console.log('GIFT SEND')
      let _s = this
      let yourGift = _s.gifts[index] || null
      _s.$store.state.giftModalName = yourGift.label
      // Validator
      // Check if label is valid (for custom only)
      if (!yourGift.label) {
        alert('You cannot send gift with an empty gift label')
        // Check if the gift value is greater than balance
      } else if (yourGift.value > _s.balance) {
        alert('You cannot send gift above your balance amount')
        // Check if the gift value if valid
      } else if (isNaN(yourGift.value) || !yourGift.value || yourGift.value <= 0) {
        alert('You cannot send gift with an invalid gift value')
      } else {
        // Confirm sending
        // if (confirm('Are you sure to send ' + this.formatToPrice(yourGift.value) + ' to ' + _s.dealer_name)) {
        // Proceed sending

        _s.$store.state.giftModal = false
        _s.$store.dispatch('SEND_GIFT_TO_DEALER', {
          dealer_id: _s.dealer_id,
          table_id: _s.table_id,
          gift_name: yourGift.label,
          gift_price: yourGift.value
        })
        // .then((res) => {
        //   // console.log('sendGift', '[SUCCESS]', res)
        //   // Close modal gift
        //   // console.log('THROW GIFT: ', yourGift.label)
        //   // _s.$store.state.giftModalName = yourGift.label
        //   // console.log('================', _s.$store.state.giftModalName)
        //
        //   // _s.$store.state.message = 'You have sent a gift to ' + this.formatToPrice(yourGift.value) + ' to ' + _s.dealer_name
        // }, (err) => {
        //   console.log('sendGift', '[ERROR]', err)
        //   _s.$store.state.message = 'Send gift failed'
        // })
        // }
      }
    },
    // END: Gift Modal Component

    // START: Social Modal Component
    removeUserFriends: function (userid) {
      var _s = this
      // console.log('removeUserFriends:', userid)
      _s.$store.dispatch('REMOVE_FRIEND', userid)
      _s.clickEff()
    },

    directtableNo: function (index) {
      var _s = this
      let confirmed = _s.$store.state.isConfirm
      if (index !== 'Lobby') {
        let tableResult = _.find(_s.$store.state.tablelist, function (o) {
          return o.tableNumber === index
        })
        let tableInfo = {
          data: tableResult,
          tableid: index
        }
        if (!confirmed) {
          _s.$store.dispatch('ENTER_TABLE', tableInfo).then((res) => {
            _s.closeModal()
            _s.getvideo()
          })
        } else {
          _s.$store.state.message = 'You can\'t exit with confirmed bets'
        }
      } else {
        if (confirmed === 'off' || confirmed === false) {
          let tableInfo = {
            data: _s.$store.state.currentTableInfo,
            tableid: _s.$store.state.currentTableIndex
          }
          _s.$store.dispatch('EXIT_TABLE', tableInfo).then((res) => {
            _s.closeModal()
          })
        }
      }
    },
    closeModal: function () {
      let _s = this
      _s.$store.state.chipModal = false
      _s.$store.state.rankModal = false
      _s.$store.state.socialModal = false
      _s.$store.state.giftModal = false
      _s.clickEff()
    },
    notification: function (message) {
      // let value = true
      this._NotifyUser(message, 'info')
      // this.$store.commit('SET_USER_NOTIFICATION', {value, message})
    },
    getvideo: function (value) {
      let _s = this
      let tableNumber = _s.$store.state.currentTableInfo.tableNumber
      console.log('BIDYO TAE', tableNumber)
      if (_s.$store.state.currentTableInfo.code !== 'moneywheel') {
        _s.$store.state.hlsjs.loadSource(_s.$store.state.tablelist[tableNumber].videoUrl.sea[0])
      } else {
        _s.$store.state.hlsjs.loadSource(_s.$store.state.tablelist[tableNumber].videoUrl.sea[0])
      }
      _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
      _s.$store.state.hlsPlayer.play()
      // console.log('getting video')
      // dynamic
      // _s.$store.state.hlsPlayer.src(_s.$store.state.currentTableInfo.videoUrl.sea[0])
    },
  },
  /*
    _________                               __             .___
    \_   ___ \  ____   _____ ______  __ ___/  |_  ____   __| _/
    /    \  \/ /  _ \ /     \\____ \|  |  \   __\/ __ \ / __ |
    \     \___(  <_> )  Y Y  \  |_> >  |  /|  | \  ___// /_/ |
     \______  /\____/|__|_|  /   __/|____/ |__|  \___  >____ |
            \/             \/|__|                    \/     \/
   */
  computed: {
    getcustomChipsValue: {
      get () {
        return this.$store.state.customChipsValue
      },
    },
    socialModal: {
      get () {
        return this.$store.state.socialModal
      },
      set (value) {
        this.$store.state.socialModal = value
      }
    },
    getTableChips: {
      get () {
        return this.editChip ? this.$store.state.TempbettingChips : this.$store.state.bettingChips
      }
    },
    getImgUrl: {
      get () {
        let storeimage = this.$store.state.tempbettingSpecialChip[0].class
        let image = 'static/chips/' + storeimage + '.png'
        return image
      }
    },
    table_id: {
      get () {
        return this.$store.state.currentTableInfo.id || ''
      }
    },
    // END: Common

    // START: Avatar Component
    AvatarModal: {
      get (e) {
        return e.$store.state.avatarModal
      }
    },
    avatar: {
      get (e) {
        return e.$store.state.userinfo.avatar
      },
      set (avatar) {
        let _s = this
        _s.$store.commit('SET_USER_AVATAR', avatar)
      }
    },

    drawerWidth: {
      get (e) {
        return e.$store.state.drawerWidth
      },
      set (drawerWidth) {
        let _s = this
        _s.$store.commit('SET_DRAWER_WIDTH', drawerWidth)
      }
    },

    bettingChips: {
      get (e) {
        return e.$store.state.bettingChips
      },
      set (value) {
        this.e.$store.state.bettingChips = value
      }
    },

    TempbettingChips: {
      get (e) {
        return e.$store.state.TempbettingChips
      },
      set (value) {
        this.e.$store.state.TempbettingChips = value
      }
    },

    dealer_name: {
      get () {
        return this.$store.state.tablelist[this.$store.state.currentTableIndex].dealer.name || ''
      }
    },
    dealer_id: {
      get () {
        return this.$store.state.tablelist[this.$store.state.currentTableIndex].dealer.rid || ''
      }
    },

    chipModal: {
      get () {
        return this.$store.state.chipModal
      }
    },

    // END: Rank Modal Component
  },
  /*
   __      __         __         .__
  /  \    /  \_____ _/  |_  ____ |  |__
  \   \/\/   /\__  \\   __\/ ___\|  |  \
   \        /  / __ \|  | \  \___|   Y  \
    \__/\  /  (____  /__|  \___  >___|  /
         \/        \/          \/     \/
   */
  watch: {
    getcustomChipsValue: {
      handler: function (value) {
        let _s = this
        let maxchips = 99999999
        if (value <= maxchips) {
          _s.$store.state.tempmaxdigitvalue = value
        }
        if (value > maxchips) {
          _s.$store.state.customChipsValue = _s.$store.state.tempmaxdigitvalue
        }
      }, deep: true
    },

    chipModal: function (ed) {
      if (ed === false) {
        let _s = this
        _s.notificationMsg = ''
      }
    },

    'notificationMsg':  function (notif) {
      let _s = this
      setTimeout (function () {
        notif = ''
        _s.notificationMsg = notif
      }, 4000)
    },

    getImgUrl: {
      handler: function (value) {
      }, deep: true},

    AvatarModal: function (n, o) {
      let _s = this
      if (!n) {
        _s.saveChanges()
      } else {
        _s.oldNickName = _s.$store.state.userinfo.nickname
      }
    }
  }
}
