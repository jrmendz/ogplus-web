/**
 * Used by ResultComponent
 * Edit by:
 *  1. Alvin Phoebe Artemis Valdez
 */
import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax} from 'gsap'
import '@/library/DrawSVGPlugin.js'
import { TLSSocket } from 'tls';
export default {
  /*
  ________            __
  \______ \  _____  _/  |_ _____
   |    |  \ \__  \ \   __\\__  \
   |    `   \ / __ \_|  |   / __ \_
  /_______  /(____  /|__|  (____  /
          \/      \/            \/
   */
  component: {
    Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax
  },
  data () {
    return {
      results: {
        table: '',
        amount: 0,
        multiplier: 0,
        pc1: '',
        pc2: '',
        pc3: '',
        bc1: '',
        bc2: '',
        bc3: '',
        pc1T: '',
        pc2T: '',
        pc3T: '',
        bc1T: '',
        bc2T: '',
        bc3T: '',
        dc: '',
        tc: '',
        dcT: '',
        tcT: '',
      },
      tmpBets: {},
      dealingCtr: 0,
      defaultCtr: 0,
      oddeven: ''
    }
  },
  mounted () {
    let _s = this
    if (_s._table.code === 'moneywheel') {
      setTimeout(() => {
        if (_s._table.status === 'betting') {
          _s.results.table = _s.lastResultMW.section
          _s.results.multiplier = _s.lastResultMW.multiplier
          _s.results.amount = 0
        } else if (_s._table.status === 'default') {
          _s.results.table = _s._table.game.result
          _s.results.multiplier = Math.pow(3, _s._table.game.values.split(',').length - 1)
          _s.results.amount = 0
        }
      }, 350)
    }
  },
  /*
     _____            __   .__                 .___
    /     \    ____ _/  |_ |  |__    ____    __| _/
   /  \ /  \ _/ __ \\   __\|  |  \  /  _ \  / __ |
  /    Y    \\  ___/ |  |  |   Y  \(  <_> )/ /_/ |
  \____|__  / \___  >|__|  |___|  / \____/ \____ |
          \/      \/            \/              \/
  */
  methods: {
    return_playerCard1 (val) {
      let _s = this
      if (val !== '') {
        _s.pc1 = val
        _s.pc1T = _s.playerCards.card1value.value
      }
      return _s.pc1
    },
    return_playerCard2 (val) {
      let _s = this
      if (val !== '') {
        _s.pc2 = val
        _s.pc2T = _s.playerCards.card2value.value
      }
      return _s.pc2
    },
    return_playerCard3 (val) {
      let _s = this
      if (this.$store.state.currentTableInfo.status === 'betting') {
        _s.pc3 = ''
      }
      if (val !== '') {
        _s.pc3 = val
        if (this.getBettingtable === 'baccarat') {
          _s.pc3T = _s.playerCards.card3value.value
        }
      }
      return _s.pc3
    },
    return_bankerCard1 (val) {
      let _s = this
      if (val !== '') {
        _s.bc1 = val
        _s.bc1T = _s.bankerCards.card1value.value
      }
      return _s.bc1
    },
    return_bankerCard2 (val) {
      let _s = this
      if (val !== '') {
        _s.bc2 = val
        _s.bc2T = _s.bankerCards.card2value.value
      }
      return _s.bc2
    },
    return_bankerCard3 (val) {
      let _s = this
      if (this.$store.state.currentTableInfo.status === 'betting') {
        _s.bc3 = ''
      }
      if (val !== '') {
        _s.bc3 = val
        if (this.getBettingtable === 'baccarat') {
          _s.bc3T = _s.bankerCards.card3value.value
        }
      }
      return _s.bc3
    },
    return_dragoncard (val) {
      let _s = this
      if (val !== '') {
        _s.dc = val
        if (this.getBettingtable === 'dragontiger') {
          _s.dcT =  _s._table.game.cards.dragonValue.value
        }
      }
      return _s.dc
    },
    return_tigercard (val) {
      let _s = this
      if (val !== '') {
        _s.tc = val
        if (this.getBettingtable === 'dragontiger') {
          _s.tcT =  _s._table.game.cards.tigerValue.value
        }
      }
      return _s.tc
    },
    formatToPrice (value) {
      return this.$options.filters.toMoney(value)
    }
  },
  /*
  _________                                    __               .___
  \_   ___ \   ____    _____  ______   __ __ _/  |_   ____    __| _/
  /    \  \/  /  _ \  /     \ \____ \ |  |  \\   __\_/ __ \  / __ |
  \     \____(  <_> )|  Y Y  \|  |_> >|  |  / |  |  \  ___/ / /_/ |
   \______  / \____/ |__|_|  /|   __/ |____/  |__|   \___  >\____ |
          \/               \/ |__|                       \/      \/
  */
  computed: {
    _getBrowsertype: {
      get () {
        let returnBrowser = ''
        let browseris = this.$browserDetect.meta.ua
        let filterBrowser = browseris.match(/QQBrowser/g)
        try {
          console.log('filterBrowser[0]: ', filterBrowser[0])
          if (filterBrowser[0] === 'QQBrowser') {
            return returnBrowser = filterBrowser[0]
          }
        }
        catch(err) {

        }
        return returnBrowser
      }
    },
    checkif3rdcardiscalled: {
      get () {
        return this.$store.state.currentFlipped.thirdCard
      }
    },
    checkwasFlipped: {
      get () {
        return this.$store.state.currentFlipped.flipped
      }
    },
    lastResultMW: {
      get () {
        return this.$store.state.betTable.moneywheel.lastResult
      }
    },
    p1Val: {
      get () {
        return this.$store.state.currentFlipped.p1
      }
    },
    p2Val: {
      get () {
        return this.$store.state.currentFlipped.p2
      }
    },
    p3Val: {
      get () {
        return this.$store.state.currentFlipped.p3
      }
    },
    b1Val: {
      get () {
        return this.$store.state.currentFlipped.b1
      }
    },
    b2Val: {
      get () {
        return this.$store.state.currentFlipped.b2
      }
    },
    b3Val: {
      get () {
        return this.$store.state.currentFlipped.b3
      }
    },
    tVal: {
      get () {
        return this.$store.state.currentFlipped.t
      }
    },
    dVal: {
      get () {
        return this.$store.state.currentFlipped.d
      }
    },
    gameStatus: {
      get () {
        return this._table.status
      }
    },
    baccWinAmount: {
      get () {
        let _s = this
        var result = 0
        // need to add table status to updated bacResult
        if (_s.$store.state.sidebar_winresult[_s._table.tableNumber].length === 0 && this._table.status === 'default') {
          result = 0
        } else if (this._table.status === 'default') {
          result = _s.$store.state.sidebar_winresult[_s._table.tableNumber]
          _s.$store.state.sidebar_winresult[_s._table.tableNumber] = 0
        }
        return result
      }
    },
    getBettingStatus: {
      get () {
        let _s = this
        var result = false

        if (this.$store.state.currentTableInfo.status === 'default' || this.$store.state.currentTableInfo.status === 'betting') {
          result = true
          this.return_playerCard3(this.playerCard3)
          this.return_bankerCard3(this.bankerCard3)
          this.return_dragoncard(this.dragoncard)
          this.return_tigercard(this.tigercard)
          if (this.$store.state.currentTableInfo.status === 'betting') {
            _s.pc1T = ''
            _s.pc2T = ''
            _s.pc3T = ''
            _s.bc1T = ''
            _s.bc2T = ''
            _s.bc3T = ''
            _s.dcT = ''
            _s.tcT = ''
            _s.$store.state.currentFlipped.p1 = false
            _s.$store.state.currentFlipped.p2 = false
            _s.$store.state.currentFlipped.p3 = false
            _s.$store.state.currentFlipped.b1 = false
            _s.$store.state.currentFlipped.b2 = false
            _s.$store.state.currentFlipped.b3 = false
            _s.$store.state.currentFlipped.t = false
            _s.$store.state.currentFlipped.d = false
            _s.$store.state.currentFlipped.flipped = false
            _s.$store.state.currentFlipped.thirdCard = false
            _s.$store.state.currentFlipped.squeezeL = false
            _s.$store.state.currentFlipped.squeezeR = false
            _s.$store.state.cardSHOWnobet = true
          }
        }
        return result
      }
    },
    currentTableIndex: {
      get () {
        return this.$store.state.currentTableIndex || {}
      }
    },
    _table: {
      get () {
        return this.$store.state.tablelist[this.currentTableIndex] || {}
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
    result: {
      get () {
        return this._table.game && this._table.game.result ? this._table.game.result : ''
      }
    },
    // Multiplier for moneywheel
    multiplier: {
      get () {
        let _s = this
        if (!_s._table.game.values) {
          return ''
        }
        let values = _s._table.game.values.split(',').length - 1
        return Math.pow(3, values)
      }
    },
    bankerCards: {
      get () {
        // return this._table.game.result && this._table.game.cards.banker ? this._table.game.cards.banker : ''
        return this._table.game.cards ? this._table.game.cards.banker : ''
      }
    },
    playerCards: {
      get () {
        // return this._table.game.result && this._table.game.cards.player ? this._table.game.cards.player : ''
        return this._table.game.cards ? this._table.game.cards.player : ''
      }
    },
    dragoncardshow: {
      get () {
        // return this._table.game.result && this._table.game.cards ? this._table.game.cards : ''
        return this._table.game.cards ? this._table.game.cards.dragon : ''
      }
    },
    tigercardshow: {
      get () {
        // return this._table.game.result && this._table.game.cards ? this._table.game.cards : ''
        return this._table.game.cards ? this._table.game.cards.tiger : ''
      }
    },
    dragoncard: {
      get () {
        return this.dragoncardshow ? '--is-' + this.dragoncardshow.toLowerCase().replace('a', '1') : ''
        // return this.dragoncardshow ? '--is-' + this.dragoncardshow.dragon.toLowerCase().replace('a', '1') : ''
      }
    },
    tigercard: {
      get () {
        return this.tigercardshow ? '--is-' + this.tigercardshow.toLowerCase().replace('a', '1') : ''
        // return this.tigercardshow.tiger ? '--is-' + this.tigercardshow.tiger.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard1: {
      get () {
        return this.bankerCards.card1 ? '--is-' + this.bankerCards.card1.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard2: {
      get () {
        return this.bankerCards.card2 ? '--is-' + this.bankerCards.card2.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard3: {
      get () {
        if (this.getBettingtable === 'baccarat') {
          return this.bankerCards.card3 ? '--is-' + this.bankerCards.card3.toLowerCase().replace('a', '1') : ''
        }
      }
    },
    playerCard1: {
      get () {
        return this.playerCards.card1 ? '--is-' + this.playerCards.card1.toLowerCase().replace('a', '1') : ''
      }
    },
    playerCard2: {
      get () {
        return this.playerCards.card2 ? '--is-' + this.playerCards.card2.toLowerCase().replace('a', '1') : ''
      }
    },
    playerCard3: {
      get () {
        if (this.getBettingtable === 'baccarat') {
          return this.playerCards.card3 ? '--is-' + this.playerCards.card3.toLowerCase().replace('a', '1') : ''
        }
      }
    },
    bankerTotalcheckwasnotFlipped: {
      get () {
        let _s = this
        let result = 0
        if (_s.checkif3rdcardiscalled) {
          result = (_s.bc1T + _s.bc2T) % 10
          return isNaN(result) ? 0 : result
        } else {
          return result
        }
      }
    },
    bankerTotalcheckwasFlipped: {
      get () {
        let _s = this
        let result = 0
        if (_s.getBettingtable === 'dragontiger') {
          if (_s.tVal) {
            return isNaN(_s.tcT) ? 0 : _s.tcT
          }
        }
        if (_s.b3Val) {
          result = (_s.bc1T + _s.bc2T + _s.bc3T) % 10
          return isNaN(result) ? 0 : result
        }
        if (!_s.b1Val && !_s.b2Val) {
          if (_s.checkif3rdcardiscalled) {
            result = (_s.bc1T + _s.bc2T) % 10
            return isNaN(result) ? 0 : result
          } else {
            return result
          }
        }
        if (_s.b1Val && !_s.b2Val) {
          console.log('================ 1')
          if (_s.checkif3rdcardiscalled) {
            result = (_s.bc1T + _s.bc2T) % 10
            return isNaN(result) ? 0 : result
          } else {
            result = (_s.bc1T) % 10
            return isNaN(result) ? 0 : result
          }
        } else if (_s.b2Val && !_s.b1Val) {
          console.log('================ 2')
          if (_s.checkif3rdcardiscalled) {
            result = (_s.bc2T + _s.bc1T) % 10
            return isNaN(result) ? 0 : result
          } else {
            result = (_s.bc2T) % 10
            return isNaN(result) ? 0 : result
          }
        } else if (_s.b3Val) {
          console.log('================ 3 card')
          result = (_s.bc1T + _s.bc2T + _s.bc3T) % 10
          return isNaN(result) ? 0 : result
        } else if (_s.b1Val && _s.b2Val) {
          console.log('================ 1 and 2 open')
          result = (_s.bc1T + _s.bc2T) % 10
          return isNaN(result) ? 0 : result
        }
      }
    },
    bankerTotal: {
      get () {
        let _s = this
        if (_s.getBettingtable === 'moneywheel') return
        let bankerCard1 = _s.bankerCards && _s.bankerCards.card1value.value ? _s.bankerCards.card1value.value : 0
        let bankerCard2 = _s.bankerCards && _s.bankerCards.card2value.value ? _s.bankerCards.card2value.value : 0
        let bankerCard3 = _s.bankerCards && _s.bankerCards.card3value.value ? _s.bankerCards.card3value.value : 0
        let result = (bankerCard1 + bankerCard2 + bankerCard3) % 10
        return isNaN(result) ? 0 : result
      }
    },
    playerTotalcheckwasnotFlipped: {
      get () {
        let _s = this
        let result = 0
        if (_s.checkif3rdcardiscalled) {
          if (_s.$store.state.currentFlipped.p3) {
            result = (_s.pc1T + _s.pc2T + _s.pc3T) % 10
            return isNaN(result) ? 0 : result
          }
          result = (_s.pc1T + _s.pc2T) % 10
          return isNaN(result) ? 0 : result
        } else {
          return result
        }
      }
    },
    playerTotalcheckwasFlipped: {
      get () {
        let _s = this
        let result = 0
        if (_s.getBettingtable === 'dragontiger') {
          if (_s.dVal) {
            return isNaN(_s.dcT) ? 0 : _s.dcT
          }
        }
        if (_s.p3Val) {
          console.log('================ 3 card')
          result = (_s.pc1T + _s.pc2T + _s.pc3T) % 10
          return isNaN(result) ? 0 : result
        }
        if (!_s.p1Val && !_s.p2Val) {
          if (_s.checkif3rdcardiscalled) {
            result = (_s.p1Val + _s.p2Val) % 10
            return isNaN(result) ? 0 : result
          } else {
            return result
          }
        }
        if (_s.p1Val && !_s.p2Val) {
          console.log('================ 1')
          if (_s.checkif3rdcardiscalled) {
            result = (_s.pc1T + _s.pc2T) % 10
            return isNaN(result) ? 0 : result
          } else {
            result (_s.pc1T) % 10
            return isNaN(result) ? 0 : result
          }
        } else if (_s.p2Val && !_s.p1Val) {
          console.log('================ 2')
          if (_s.checkif3rdcardiscalled) {
            result = (_s.pc2T + _s.pc1T) % 10
            return isNaN(result) ? 0 : result
          } else {
            result = (_s.pc2T) % 10
            return isNaN(result) ? 0 : result
          }
        } else if (_s.p3Val) {
          console.log('================ 3 card')
          result = (_s.pc1T + _s.pc2T + _s.pc3T) % 10
          return isNaN(result) ? 0 : result
        } else if (_s.p1Val && _s.p2Val) {
          console.log('================ 1 and 2 open')
          result = (_s.pc1T + _s.pc2T) % 10
          return isNaN(result) ? 0 : result
        }
      }
    },
    playerTotal: {
      get () {
        let _s = this
        if (_s.getBettingtable === 'moneywheel') return
        let playerCard1 = _s.playerCards && _s.playerCards.card1value.value ? _s.playerCards.card1value.value : 0
        let playerCard2 = _s.playerCards && _s.playerCards.card2value.value ? _s.playerCards.card2value.value : 0
        let playerCard3 = _s.playerCards && _s.playerCards.card3value.value ? _s.playerCards.card3value.value : 0
        let result = (playerCard1 + playerCard2 + playerCard3) % 10
        return isNaN(result) ? 0 : result
      }
    },
    dragonTotal: {
      // get () {
      //   let _s = this
      //   let dragonCard = _s.dragoncard && _s.dragoncardshow.dragonValue.value ? _s.dragoncardshow.dragonValue.value : 0
      //   return dragonCard
      // }
      get () {
        let _s = this
        let dragonCard = 0
        if (_s.getBettingtable === 'moneywheel') return
        if(_s._table) {
          // let dragonCard = _s.dragoncard && _s.dragoncardshow.dragonValue.value ? _s.dragoncardshow.dragonValue.value : 0
          try {
            dragonCard = _s._table && _s._table.game.cards.dragonValue.value ? _s._table.game.cards.dragonValue.value : 0
          } catch (e) {
            return
          }
          return isNaN(dragonCard) ? 0 :  dragonCard
        } else {
          return
        }
      }

    },
    tigerTotal: {
      get () {
        let _s = this
        let tigerCard = 0
        if (_s.getBettingtable === 'moneywheel') return
        if(_s._table) {
          // let tigerCard = _s.tigercard && _s.tigercardshow.tigerValue.value ? _s.dragoncardshow.dragonValue.value : 0
          try {
            tigerCard = _s._table && _s._table.game.cards.tigerValue.value ? _s._table.game.cards.tigerValue.value : 0
          } catch (e) {
            return
          }
          return  isNaN(tigerCard) ? 0 : tigerCard
        } else {
          return
        }
      }

    },
    moneywheelTotal: {
      get () {
        let _s = this
        let mw = _s._table.game && _s._table.game.result ? _s._table.game.result : 0
        return mw
      }
    },
    roulette: {
      get() {
        let _s = this
        let rl = _s._table.game && _s._table.game.value ? _s._table.game.value : 0
        return rl
      }
    }
  },
  /*
   __      __          __           .__
  /  \    /  \_____  _/  |_   ____  |  |__
  \   \/\/   /\__  \ \   __\_/ ___\ |  |  \
   \        /  / __ \_|  |  \  \___ |   Y  \
    \__/\  /  (____  /|__|   \___  >|___|  /
         \/        \/            \/      \/
  */
  watch: {
    multiplier: function (n, o) {
      if (n) {
        this.results.multiplier = n
      }
    },
    p1Val: function () {
      let _s = this
      if (this.$store.state.currentFlipped.p1 && this.$store.state.currentFlipped.p2) {

      }
    },
    p2Val: function () {
      let _s = this
      if (this.$store.state.currentFlipped.p1 && this.$store.state.currentFlipped.p2) {

      }
    },
    result: function (newValue, oldValue) {
      // CLEARING TABLE BETS ON EVERY RESULT
      let _s = this
      let locale = _s.$store.state.locale
      if (_s._table.code === 'baccarat') {
        if (_s._table.subcode === 'bidding') {
          if (_s.$store.state.currentTableInfo.status === 'squeezedt_end' || _s.$store.state.currentTableInfo.status === 'squeezeb_end' || _s.$store.state.currentTableInfo.status === 'squeezep_end' || _s.$store.state.currentTableInfo.status === 'squeeze_end') {
            // if (_s.$store.state.currentTableInfo.status === 'dealing') {
            if (_s.bankerTotal) {
              setTimeout(function () {
                if (_s.$store.state.soundFxSwitch === true) {
                  if (locale === 'en') {
                    _s.$store.state.audiosprite['baccaraten'].play('banker' + _s.bankerTotal)
                  } else if (locale === 'cn') {
                    _s.$store.state.audiosprite['baccaratcn'].play('banker' + _s.bankerTotal)
                  } else {
                    //
                  }
                }
              }, 2000)
            }
            if (_s.bankerTotal === 0) {
              setTimeout(function () {
                if (_s.$store.state.soundFxSwitch === true) {
                  if (locale === 'en') {
                    _s.$store.state.audiosprite['baccaraten'].play('banker0')
                  } else if (locale === 'cn') {
                    _s.$store.state.audiosprite['baccaratcn'].play('banker0')
                  } else {
                    //
                  }
                }
              }, 2000)
            }
            if (_s.playerTotal) {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['baccaraten'].play('player' + _s.playerTotal)
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['baccaratcn'].play('player' + _s.playerTotal)
                } else {
                  //
                }
              }
            }
            if (_s.playerTotal === 0) {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['baccaraten'].play('player0')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['baccaratcn'].play('player0')
                } else {
                  //
                }
              }
            }
          }
        }
        if (_s._table.subcode === 'normal') {
          if (_s.$store.state.currentTableInfo.status === 'dealing') {
            // if (_s.$store.state.currentTableInfo.status === 'dealing') {
            if (_s.bankerTotal) {
              setTimeout(function () {
                if (_s.$store.state.soundFxSwitch === true) {
                  if (locale === 'en') {
                    _s.$store.state.audiosprite['baccaraten'].play('banker' + _s.bankerTotal)
                  } else if (locale === 'cn') {
                    _s.$store.state.audiosprite['baccaratcn'].play('banker' + _s.bankerTotal)
                  } else {
                    //
                  }
                }
              }, 2000)
            }
            if (_s.bankerTotal === 0) {
              setTimeout(function () {
                if (_s.$store.state.soundFxSwitch === true) {
                  if (locale === 'en') {
                    _s.$store.state.audiosprite['baccaraten'].play('banker0')
                  } else if (locale === 'cn') {
                    _s.$store.state.audiosprite['baccaratcn'].play('banker0')
                  } else {
                    //
                  }
                }
              }, 2000)
            }
            if (_s.playerTotal) {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['baccaraten'].play('player' + _s.playerTotal)
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['baccaratcn'].play('player' + _s.playerTotal)
                } else {
                  //
                }
              }
            }
            if (_s.playerTotal === 0) {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['baccaraten'].play('player0')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['baccaratcn'].play('player0')
                } else {
                  //
                }
              }
            }
          }
        }
      }
      if (_s._table.code === 'dragontiger') {
        if (_s.$store.state.currentTableInfo.status === 'squeezedt_end' || _s.$store.state.currentTableInfo.status === 'squeezeb_end' || _s.$store.state.currentTableInfo.status === 'squeezep_end' || _s.$store.state.currentTableInfo.status === 'squeeze_end') {
          if (_s.dragonTotal) {
            if (_s.$store.state.soundFxSwitch === true) {
              if (locale === 'en') {
                _s.$store.state.audiosprite['dragontigeren'].play('dragon' + _s.dragonTotal)
              } else if (locale === 'cn') {
                _s.$store.state.audiosprite['dragontigercn'].play('dragon' + _s.dragonTotal)
              } else {
                //
              }
            }
          }
          if (_s.tigerTotal) {
            setTimeout(function () {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['dragontigeren'].play('tiger' + _s.tigerTotal)
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['dragontigercn'].play('tiger' + _s.tigerTotal)
                } else {
                  //
                }
              }
            }, 2000)
          }
        }
        if (_s._table.subcode === 'normal') {
          if (_s.dragonTotal) {
            if (_s.$store.state.soundFxSwitch === true) {
              if (locale === 'en') {
                _s.$store.state.audiosprite['dragontigeren'].play('dragon' + _s.dragonTotal)
              } else if (locale === 'cn') {
                _s.$store.state.audiosprite['dragontigercn'].play('dragon' + _s.dragonTotal)
              } else {
                //
              }
            }
          }
          if (_s.tigerTotal) {
            setTimeout(function () {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['dragontigeren'].play('tiger' + _s.tigerTotal)
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['dragontigercn'].play('tiger' + _s.tigerTotal)
                } else {
                  //
                }
              }
            }, 2000)
          }
        }
      }
      if (newValue) {
        setTimeout(function () {
          if (_.isUndefined(_s._table.game))
            return 0

          let winner = _s._table.game.result || ""
          // console.log(winner, 'WINNER')
          if (_s._table.code === 'baccarat') {
            if (winner === 'player' || winner === 'player,banker_pair' || winner === 'player,player_pair' || winner === 'player,banker_pair,player_pair' || winner === 'player,super_six' || winner === 'player,banker_pair,player_pair,super_six') {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['baccaraten'].play('pwin')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['baccaratcn'].play('pwin')
                } else {
                  //
                }
              }
            } else if (winner === 'banker' || winner === 'banker,banker_pair' || winner === 'banker,player_pair' || winner === 'banker, player_pair, super_six' || winner === 'banker,banker_pair,player_pair' || winner === 'banker,super_six' || winner === 'banker,banker_pair,player_pair,super_six') {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['baccaraten'].play('bwin')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['baccaratcn'].play('bwin')
                } else {
                  //
                }
              }
            } else {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'cn') {
                  _s.$store.state.audiosprite['spotFXcn'].play('tie')
                } else if (locale === 'en') {
                  _s.$store.state.audiosprite['spotFXen'].play('tie')
                } else {
                  //
                }
              }
            }
          }
          if (_s._table.code === 'dragontiger') {
            if (winner === 'dragon') {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['dragontigeren'].play('dwin')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['dragontigercn'].play('dwin')
                } else {
                  //
                }
              }
            } else if (winner === 'tiger') {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['dragontigeren'].play('twin')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['dragontigercn'].play('twin')
                } else {
                  //
                }
              }
            } else {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'en') {
                  _s.$store.state.audiosprite['spotFXen'].play('tie')
                } else if (locale === 'cn') {
                  _s.$store.state.audiosprite['spotFXcn'].play('tie')
                } else {
                  //
                }
              }
            }
          }
          // Moneywheel
          if (_s._table.code === 'moneywheel') {
            let mw = _s.moneywheelTotal
            switch (mw) {
              case '1' :
                mw = 'one'
                break
              case '2' :
                mw = 'two'
                break
              case '5' :
                mw = 'five'
                break
              case '10' :
                mw = 'ten'
                break
              case '20' :
                mw = 'twenty'
                break
              case '40' :
                mw = 'og'
                break
            }
            if (mw) {
              if (_s.$store.state.soundFxSwitch === true) {
                if (locale === 'cn') {
                  _s.$store.state.audiosprite['moneywheelcn'].play(mw + 'wins')
                } else {
                  _s.$store.state.audiosprite['moneywheelen'].play(mw + 'wins')
                }
              }
            }
          }

          // Roulette
          if (_s._table.code === 'roulette') {
            let tl = new TimelineLite()
            let hitArea = _s.$store.state.ROULETTE_AREA
            let textToSpeech = _s.$store.state.TEXT_TO_SPEECH
            let rlte = parseInt(_s.roulette)
            let itemsWinner = winner.split(',');
            let classToChange = ''
            let isEven, isRed, ttsLocal;

            // Pre-setting variables
            isEven = rlte % 2 === 0;
            ttsLocal = locale === 'cn' ? 'roulettecn' : 'rouletteen';

            if (_.isNaN(rlte))
              return 0;

            if (rlte < 0)
              return 0;

            if(rlte === 0) {
              classToChange = '#s_' + rlte;
            }

            // Use map since no definite order in this result
            if(rlte !== 0) {
              _.map(itemsWinner, (o) => {
                if (_.includes(['small', 'big'], o)) {
                  classToChange += '#bs_' + (o === 'small' ? '1' : '2') + ','
                } else if (_.includes(['red', 'black'], o)) {
                  classToChange += '#' + o + ','
                  isRed = o === 'red'
                } else {
                  classToChange += '#' + o + ','
                }
              });

              // Hit area for the result
              classToChange += '#s_' + rlte + ',';
              // Search for Dozen hit
              if (_.includes(hitArea.dozen1, rlte))
                classToChange += '#doz_1,';
              else if (_.includes(hitArea.dozen2, rlte))
                classToChange += '#doz_2,';
              else if (_.includes(hitArea.dozen3, rlte))
                classToChange += '#doz_3,';

              // Search for Row hit
              if (_.includes(hitArea.row1, rlte))
                classToChange += '#r_1';
              else if (_.includes(hitArea.row2, rlte))
                classToChange += '#r_2';
              else if (_.includes(hitArea.row3, rlte))
                classToChange += '#r_3';
            }

            // console.log(itemsWinner)
            // Execute TweenLite plug-ins
            tl
              .set('#s_' + rlte, {
                stroke:'#ffff00',
                strokeWidth:6
              })
              .to(classToChange, 1, {
                transformOrigin: "50% 50%",
                scale: 1,
                opacity: 0.5,
                repeat: 3,
                yoyo: true
              })

            // SoundFX starts here
            if (_s.$store.state.soundFxSwitch) {

              setTimeout(function () {
                _s.$store.state.audiosprite[ttsLocal].play(textToSpeech[rlte])
                setTimeout(function () {
                  _s.$store.state.audiosprite[ttsLocal].play(isRed ? 'red' : 'black')
                }, 1000)
                setTimeout(function () {
                  _s.$store.state.audiosprite[ttsLocal].play(isEven ? 'even' : 'odd')
                }, 2000)

              }, 3000)
            }
          }
        }, 4000)
      }
    },
    gameStatus: function (n) {
      let _s = this
      let sections, totalAmount = 0
      if (n && _s._table.code === 'moneywheel') {
        sections = _s.$store.state.betTable.moneywheel.section
        switch (n) {
          case 'default':
            console.log(_s._table.game.result)

            _.forEach(sections, (sec, secKey) => {
              if (_s._table.game.result === secKey) {
                _.map(sec.bets, (bet) => {
                  if (bet.isConfirmed) totalAmount += bet.chipValue
                })
              }
            })
            _s.results.table = _s._table.game.result
            _s.results.multiplier = Math.pow(3, _s._table.game.values.split(',').length - 1)
            _s.results.amount = totalAmount * (_s._table.game.result === 'og' ? 40 : parseInt(_s._table.game.result)) * _s.results.multiplier
            break
          case 'dealing':
            _s.results.table = '?'
            _s.results.multiplier = 0
            _s.results.amount = 0
            break
        }
      }
    },
    currentTableIndex: function (n) {
      let _s = this
      let lastResult = _s.$store.state.betTable.moneywheel.lastResult

      if (n && _s._table.code === 'moneywheel') {
        setTimeout(() => {
          switch (_s._table.status) {
            case 'betting':
            case 'default':
              _s.results.table = lastResult.section
              _s.results.multiplier = lastResult.multiplier
              _s.results.amount = 0
              break
            case 'dealing':
              _s.results.table = '?'
              _s.results.multiplier = 0
              _s.results.amount = 0
              break
          }
        }, 350)
      }
    }
  }
}
