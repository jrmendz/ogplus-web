// NOTES:
// Please only add betting commands that will only be used for betting
// VUE component using this
// src/components/BettingComponent.vue
// src/sidebar/games/CardGames.vue
import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax} from 'gsap'
import '@/library/DrawSVGPlugin.js'

export default {
  component: {DrawSVGPlugin, Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax
  },
  data () {
    return {
      value: 25,
      cardNotif: false,
      betConfirm: false,
      confirmedBet: false,
      showWinnings: false,
      rshowWinnings: false,
      squeezed: false,
      currentTable: ''
    }
  },
  methods: {
    roulette_checkNumber: function (val) {
      let ovalNumbers = this.betTable.ovalHoverNumbers
      let hoverNumbers = _.includes(ovalNumbers, val.toString())
      if (hoverNumbers) {
        return '--is-hovernumbers'
      }
    },
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    formatToPrice (value) {
      return this.$options.filters.toMoney(value)
    },
    convertToAmount (value) {
      return this.$options.filters.minimizeNumber(value)
    },
    runContent: function () {
      TweenLite.set('.betting__area', {opacity: 0})
      TweenLite.set('#baccarattable', {opacity: 0})
      TweenLite.set('#dragontiger', {opacity: 0})
      TweenLite.set('#moneywheel', {opacity: 0})
      switch (this.$store.state.currenttab) {
        case 'baccarat' :
          setTimeout(function () {
            let tl = new TimelineLite()
            // DRAGON TIGER AND BACCARAT
            tl.set('.bc0', {fill: 'none'})
              .set('#baccarattable, .betting__area', {opacity: 1})
              .set('.bc1', {stroke: '#49fb35'})
              .fromTo('.bc0, .bc1, .baccarat-table', 0.5, {visibility: 'hidden'}, {visibility: 'visible'})
              .fromTo('.bc0, .bc1', 1, {drawSVG: 0}, {drawSVG: '102%'})
              .fromTo('.bc0, .bc1', 0.5, {stroke: '#49fb35'}, {stroke: '#fcac09'})
              .fromTo('.bcfill', 0.5, {fill: 'none'}, {fill: '#fcac09'})
            TweenLite.render()
          }, 1000)
          break
        case 'dragontiger' :
          setTimeout(function () {
            let tl = new TimelineLite()
            // DRAGON TIGER AND BACCARAT
            tl.set('.bc0', {fill: 'none'})
              .set('#dragontiger, .betting__area', {opacity: 1})
              .set('.bc0, .bc1', {stroke: '#49fb35'})
              .fromTo('.bc0, .bc1, .baccarat-table', 1, {visibility: 'hidden'}, {visibility: 'visible'})
              .fromTo('.bc0, .bc1', 1, {drawSVG: 0}, {drawSVG: '102%'})
              .fromTo('.bc0, .bc1', 1, {stroke: '#49fb35'}, {stroke: '#fcac09'})
              .fromTo('.bcfill', 0.5, {fill: 'none'}, {fill: '#fcac09'})
            TweenLite.render()
          }, 1000)
          break
        case 'emcee' :
          break
        case 'moneywheel' :
          setTimeout(function () {
            let tl = new TimelineLite()
            tl.set('.mw0', {fill: 'none'})
              .set('#moneywheel, .betting__area', {opacity: 1})
              .set('.mwLog', {opacity: 0})
              .set('.mw0, .mwtext, .mwtext2', {stroke: '#49fb35'})
              .fromTo('.mw0, .mwtext, .mwtext2', 1, {visibility: 'hidden'}, {visibility: 'visible'})
              .fromTo('.logoog, .mw0, .mwtext, .mwtext2', 1, {drawSVG: 0}, {drawSVG: '102%'})
              .fromTo('.mw0 ', 1, {stroke: '#49fb35'}, {stroke: '#5B0000'}, 2)
              .fromTo('.mwtext ', 1, {stroke: '#49fb35'}, {stroke: '#FFED40'}, 2)
              .fromTo('.mwtext2', 1, {stroke: '#49fb35'}, {stroke: '#fcac09'}, 2)
              .fromTo('.mwLog', 1, {opacity: 0}, {opacity: 1}, 2)
              .fromTo('.mw0 ', 0.5, {fill: 'none'}, {fill: '#5B0000'}, 3.5)
              .fromTo('.mwtext ', 0.5, {fill: 'none'}, {fill: '#FFED40'}, 3.5)
              .fromTo('.mwtext2', 0.5, {fill: 'none'}, {fill: '#fcac09'}, 3.5)
            TweenLite.render()
          }, 1000)
          break
      }
    },
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    activeSideBar: function (bool) {
      let _s = this
      let obj = []
      _s.clickEff()
      if (bool) {
        _s.table.isSideBetting = true
        if (_s.table.code === 'baccarat') {
          obj = {
            [_s.table.tableNumber]: {
              player_pair: [],
              tie: [],
              banker_pair: [],
              player: [],
              super_six: [],
              banker: []
            }
          }
        } else if (_s.table.code === 'dragontiger') {
          obj = {
            [_s.table.tableNumber]: {
              dragon: [],
              tiger: [],
              tie: []
            }
          }
        }
        Object.assign(_s.$store.state.sidebar_betting, obj)
        return true
      }
    },

    /*
    .___                    ________
    |   |  ____            /  _____/ _____     _____    ____
    |   | /    \   ______ /   \  ___ \__  \   /     \ _/ __ \
    |   ||   |  \ /_____/ \    \_\  \ / __ \_|  Y Y  \\  ___/
    |___||___|  /          \______  /(____  /|__|_|  / \___  >
              \/                  \/      \/       \/      \/
     */

    /**
     * Dynamic function for adding of chips to the betting areas in Baccarat, Dragon-Tiger and MoneyWheel including side-bet
     * @contact Alvin V.
     * @param sectionCode
     * @param customChip
     * @param showAlert
     * @param customSection 'This refer to the game section'
     * @param betClass
     * @param byPassConfirm
     * @param byPassBusy
     * @param hasAnimation
     * @data chipInfo { value: 0.00, class: '' }
     * @returns {{err: number, status: string}}
     */
    addChips: function (sectionCode = '', customChip = {}, showAlert = true, customSection = {}, betClass = '', byPassConfirm = false, byPassBusy = false, hasAnimation = true) {
      let _s = this;
      _s.clickEff();

      let totChipAmt = 0, m25 = 15, m100 = 60, secTotal = 0;
      let section, chosenChip, myBalance, currentBet;
      let map = {
        betLimits: {
          min: {
            player: '_min',
            banker: '_min',
            dragon: '_min',
            tiger: '_min',
            tie: '_min',
            player_pair: '_min',
            banker_pair: '_min',
            super_six: '_min',
            '1': '_min',
            '2': '_min',
            '5': '_min',
            '10': '_min',
            '20': '_min',
            'og': '_min',
            default: '_min'
          },
          max: {
            player: '_max',
            banker: '_max',
            dragon: '_max',
            tiger: '_max',
            tie: 'tie_max',
            player_pair: 'pair_max',
            banker_pair: 'pair_max',
            super_six: 'ss_max',
            '1': '_max',
            '2': '_max',
            '5': '_max',
            '10': '_max',
            '20': '_max',
            'og': '_max',
            default: '_max'
          }
        }
      };

      let CUSTOM_BALANCE = parseFloat(_s.$store.state.userinfo.balance || '0.00');
      let CUSTOM_MIN_BET = limit('min');
      let CUSTOM_MAX_BET = limit('max');

      // Initial validators
      if (!sectionCode) return { err: 1, status: 'Invalid Section Code' };
      if (!byPassBusy) {
        if (_s.isBusy) return { err: 1, status: 'Please wait while processing your bets' }
      }

      // section = !_.isEmpty(customSection) ? customSection[sectionCode] : _s.betTable.section[sectionCode]
      section = !_.isEmpty(customSection) ? customSection[sectionCode] : _s.$store.state.betTable[_s.getBettingtable].section[sectionCode]
      chosenChip = !_.isEmpty(customChip) ? customChip : _s.$store.state.selectedChip
      myBalance = CUSTOM_BALANCE;

      // Secondary validators
      if (myBalance <= 0 || myBalance - _s.projectedBalance <= 0) {
        _s.$store.state.message = showAlert ? 'Insufficient Balance' : '';
        return { err: 1, status: 'Insufficient Balance' };
      }

      currentBet = parseFloat(chosenChip.value)

      // Minimum Bet Limit
      if (currentBet < CUSTOM_MIN_BET) {
        // console.log('Tracker 1 - Minimum Bet Condition');

        // All-In Chips: If the chips is greater than balance
        if (currentBet >= myBalance) {
          // console.log('Tracker 1.1');
          currentBet = myBalance

        // Bet chips below minimum
        } else {
          // console.log('Tracker 1.2');K
          // Sum all chipValue
          secTotal = _.sumBy(section.bets, 'chipValue')

          if (secTotal < CUSTOM_MIN_BET) {
            // console.log('Tracker 1.2.1');
            _s.$store.state.message = showAlert ? 'Bet is below minimum' : '';
            return {err: 1, status: 'Bet is below minimum'};
          } else if (secTotal + currentBet > CUSTOM_MAX_BET) {
            // console.log('Tracker 1.2.2');
            _s.$store.state.message = showAlert ? 'Maximum bet reached' : '';
            return {err: 1, status: 'Maximum bet reached'};
          }
        }

      // Maximum-Equal Bet Limit
      } else {
        // console.log('Tracker 2 - Maximum Bet Condition')

        // All-In Chips: If balance is less than minimum/maximum bet limit
        if (myBalance < CUSTOM_MIN_BET && myBalance < CUSTOM_MAX_BET) {
          // console.log('Tracker 2.1');
          currentBet = myBalance
        }

        // If chips is greater than maximum bet limit and maximum bet limit is greater than balance
        else if (currentBet > CUSTOM_MAX_BET && CUSTOM_MAX_BET > myBalance) {
          // console.log('Tracker 2.2');
          currentBet = myBalance
        }

        // If chips is greater than maximum bet limit
        else if (currentBet > CUSTOM_MAX_BET ) {
          // console.log('Tracker 2.3');
          currentBet = CUSTOM_MAX_BET
        }

        else {
          // console.log('Tracker 2.3');
        }

        // Existing Chips Comparison
        if (section.sumOfStagedChips + currentBet > CUSTOM_MAX_BET) {
          // console.log('Tracker 2.4');

          if (CUSTOM_MAX_BET - section.sumOfStagedChips > 1) {
            // console.log('Tracker 2.4.1');
            currentBet = Math.abs(CUSTOM_MAX_BET - section.sumOfStagedChips)
          } else {
            // console.log('Tracker 2.4.2');
            _s.$store.state.message = showAlert ? 'Maximum bet reached' : '';
            return {err: 1, status: 'Maximum bet reached'};
          }
        }
      }

      // Projected Balance condition
      if (_s.projectedBalance + currentBet > myBalance) {
        // console.log('Tracker 3 - Project Balance Condition');

        if (myBalance - _s.projectedBalance > 1) {
          // console.log('Tracker 3.1');
          currentBet = Math.abs(myBalance - _s.projectedBalance)
        } else {
          // console.log('Tracker 3.2');
          _s.$store.state.message = showAlert ? 'Insufficient Balance' : '';
          return { err: 1, status: 'Insufficient Balance' };
        }
      }

      // Add the computed balanced chips to projected balance
      _s.projectedBalance += currentBet;

      // Push bets
      section.bets.push({
        betSection: sectionCode,
        chipClass: chosenChip.class,
        chipImage: chosenChip.class,
        chipValue: currentBet,
        isConfirmed: byPassConfirm,
        isRebet: chosenChip.isRebet
      });

      // Sum all betting chips and add positioning of chips
      _.forEach(section.bets, function (bet, index) {
        let valueIs, valueOfY

        if (hasAnimation) {
          m100 = m100 - m25
          valueIs = '._' + (index + 1)
          valueOfY = '+' + m100 + '%'
          setTimeout(function () {
            if (_s.$store.state.currenttab === 'moneywheel') {
              TweenLite.set(valueIs, { width: 30, height: 30 })
            }
            TweenLite.set('.' + (betClass ? betClass : 'label__bet'), { x: '-20', opacity: 1 })
            TweenLite.to(valueIs, 1, { ease: Expo.easeOut, rotation: 0, y: valueOfY, x: '-15' })
          }, 100)
        }
        // Total chips amount
        totChipAmt += parseFloat(bet.chipValue)
      });

      // Set sum of chips value
      section.sumOfStagedChips = totChipAmt;

      // Return success
      return { err: 0, status: '' };

      /**
       * Limit
       * @param type
       * @returns {*}
       */
      function limit (type) {
        return _s.$store.state.userinfo.otherBetLimits[map.betLimits[type][_.has(map.betLimits[type], sectionCode) ? sectionCode : 'default']]
      }
    },
  },
  computed: {
    isBusy: {
      get () { return this.$store.state.isBusy },
      set (v) { this.$store.state.isBusy = v }
    },
    isConfirm: {
      get (e) {
        return e.$store.state.isConfirm
      }
    },
    selectedChips: {
      get (e) {
        return e.$store.state.selectedChip
      }
    },
    // Returns bet table information
    betTable: {
      get (e) {
        return e.$store.state.betTable[this.getBettingtable]
      }
    },
    projectedBalance: {
      get () { return this.$store.state.betTableGlobal.projectedAmount },
      set (v) { this.$store.state.betTableGlobal.projectedAmount = v > 0 ? v : 0 }
    },
    // Returns current table information
    _table: {
      get () {
        return this.$store.state.tablelist[this.$store.state.currentTableIndex]
      }
    },

    isSuperSix: {
      get () {
        this.runContent(this.$store.state.currenttab)
        return this._table.isSuperSix
      },
      set (n) {
        this._table.isSuperSix = n
      }
    },

    getSelectedChips: {
      get () {
        return this.$store.state.selectedChip
      }
    },
    balance: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.balance
      },
      set (balance) {
        let _s = this
        _s.$store.commit('SET_USER_BALANCE', balance)
      }
    },
    getBettingtable: {
      get () {
        let _s = this
        _s.runContent()
        return this.$store.state.currenttab
      }
    },
    getLanguage: {
      get () {
        return this.$store.state.locale || 'en'
      }
    },
    result: {
      // RETURN RESULT AFTER THE GAME IS FINISHED
      get () {
        return this._table.game.result ? this._table.game.result : ''
      }
    },
    getMessage: {
      get () {
        return this.$store.state.sideBarMsg
      }
    },
    getWinner () {
      let result = ''
      let _s = this
      if (_s.table.game && _s.table.game.result) {
        if (_s.table.game.result.split(',')[0] === 'tie') {
          result = _s.tt('Tie!')
        } else {
          if (_s.table.code.toLowerCase() === 'roulette') {
            result = _s.tt(_s.table.game.value + ' Wins!')
          } else {
            result = _s.tt(_s.capitalizeFirstLetter(_s.table.game.result.split(',')[0]) + ' Wins!')
          }
        }
      }
      return result
    },
    getBettingStatus: {
      get () {
        var result = false
        if (this.table.status === 'default' || this.table.status === 'betting') {
          result = true
        }
        return result
      }
    },
    squeezeStart: {
      get () {
        let _s = this
        if (_s.table.subcode === 'dealing') {
          if (_s.table.status === 'squeeze_start') {
            _s.squeezed = true
          } else if (_s.table.status === 'default') {
            _s.squeezed = false
          }
        } else {
          if (_s.table.status === 'dealing') {
            setTimeout(() => {
              _s.squeezed = true
            }, 5000)
          } else if (_s.table.status === 'default') {
            _s.squeezed = false
          }
        }
        return _s.squeezed
      }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },

      set (value) {
        this.$store.state.isLobby = value
      }
    },
    selectedChip: {
      get () {
        return this.$store.state.selectedChip
      }
    },
    sideBarBet: {
      get () {
        return this.$store.state.sidebar_betting
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
        return this.bankerCards.card3 ? '--is-' + this.bankerCards.card3.toLowerCase().replace('a', '1') : ''
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
        return this.playerCards.card3 ? '--is-' + this.playerCards.card3.toLowerCase().replace('a', '1') : ''
      }
    },
    dragoncard: {
      get () {
        return this.dragoncardshow.dragon ? '--is-' + this.dragoncardshow.dragon.toLowerCase().replace('a', '1') : ''
      }
    },
    tigercard: {
      get () {
        return this.tigercardshow.tiger ? '--is-' + this.tigercardshow.tiger.toLowerCase().replace('a', '1') : ''
      }
    },
    status: {
      get () { return this._table.status || '' }
    },
    supersix: function () {
      let _s = this
      return _s._table.superSix
    },
    bankerTotal: {
      get () {
        let _s = this
        let bankerCard1 = _s.bankerCards && _s.bankerCards.card1value.value ? _s.bankerCards.card1value.value : 0
        let bankerCard2 = _s.bankerCards && _s.bankerCards.card2value.value ? _s.bankerCards.card2value.value : 0
        let bankerCard3 = _s.bankerCards && _s.bankerCards.card3value.value ? _s.bankerCards.card3value.value : 0
        return (bankerCard1 + bankerCard2 + bankerCard3) % 10
      }
    },
    playerTotal: {
      get () {
        let _s = this
        let playerCard1 = _s.playerCards && _s.playerCards.card1value.value ? _s.playerCards.card1value.value : 0
        let playerCard2 = _s.playerCards && _s.playerCards.card2value.value ? _s.playerCards.card2value.value : 0
        let playerCard3 = _s.playerCards && _s.playerCards.card3value.value ? _s.playerCards.card3value.value : 0
        return (playerCard1 + playerCard2 + playerCard3) % 10
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
    dragonTotal: {
      get () {
        return this.DragonCards || 0
      }
    },
    tigerTotal: {
      get () {
        return this.TigerCards || 0
      }
    }
  },
  watch: {
    getMessage: function (a, b) {
      if (!a) {
        return false
      }
      let self = this
      setTimeout(function () {
        self.$store.state.sideBarMsg = ''
        self.cardNotif = false
      }, 3000)
    }
  }
}
