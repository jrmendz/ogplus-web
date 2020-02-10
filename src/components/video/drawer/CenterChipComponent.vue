<template>
	<ul class="list__ui --is-chip-and-button" :class="tablePlayers.length === 0 ? '--is-sidebet' : ''">
		<li>
			<v-avatar size="50" style="margin: 0 10px" :class="activeItem === null ? '--is-active' : ''">
				<v-img class="cursor" :src="$store.state.squareChip" @click.stop="$store.state.chipModal = !$store.state.chipModal; clickEff()" :title="[ tt('Edit chips') ]"></v-img>
				<template v-if="$store.state.maxChipValue <= _specialChip">
				</template>
			</v-avatar>
			<v-tabs show-arrow hide-slider next-icon="arrow_right" prev-icon="arrow_left" height="66px">
				<v-tab v-for="(chips, i) in getBettingChips" :key="i" :ripple="false"  :title="[ tt(chips.value) ]">
					<div :class="{ active: i === activeItem }">
						<div :class="[chips.class]" @click="selectedChip_Bet(i, chips)"></div>
					</div>
					<p class="--is-number" v-if="$store.state.locale === 'jp'">{{chips.value | minimizeNumberJP}}</p>
          <p class="--is-number" v-if="$store.state.locale === 'ko'">{{chips.value | minimizeNumberKO}}</p>
          <p class="--is-number" v-if="$store.state.locale === 'th'">{{chips.value | minimizeNumberTH}}</p>
          <p class="--is-number" v-if="$store.state.locale === 'en' || $store.state.locale === 'cn' || $store.state.locale === 'vn' || $store.state.locale === 'id'">{{chips.value | minimizeNumber}}</p>
				</v-tab>
			</v-tabs>
		</li>
		<li>
			<ul class="list__ui" :class="[getBettingtable === 'moneywheel' ? '--is-moneywheel' : '', getBettingtable === 'dragontiger' ? '--is-dragontiger' : '', getBettingtable === 'baccarat' ? '--is-dragontiger' : '']">
				<li>
					<v-btn @click="confirmChips()" outline large block class="--is-green" :disabled="isBusy">
						{{ tt('Confirm') }}
					</v-btn>
				</li>
				<li>
					<v-btn @click="rebetChips()" outline large block class="--is-gray" :disabled="isBusy">
						{{ tt('Rebet') }}
					</v-btn>
				</li>
				<li>
					<v-btn @click="clearChips()" outline large block class="--is-red" :disabled="isBusy">
						{{ tt('Cancel') }}
					</v-btn>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
import {Expo, TweenLite} from "gsap"
import Betting from '@/library/Betting.js'

export default {
  mixins: [ Betting ],
    data() {
      return {
        activeItem: 0,
        isSendingBet: false
      }
    },
    mounted: function () {
      let _s = this
      let lsBet = JSON.parse(localStorage.getItem('_bet_' + _s.table.tableNumber))
      // Reset Chips
      _s.clearChips(true)
      if (lsBet) {
        // Remove confirm storage, if gameSet and tableNumber is not the same
        if (lsBet.gameSet !== _s.table.gameSet && lsBet.tableNumber !== _s.table.tableNumber) {
          localStorage.removeItem('_bet_' + _s.table.tableNumber)
        }
      }
      _s.getfirstvalue()
    },
    methods: {
      clickEff: function () {
        let _s = this
        if (_s.$store.state.soundFxSwitch === true) {
          _s.$store.state.audiosprite['spotFX'].play('click')
        }
      },
      getfirstvalue: function () {
        //to.do alfie
        let result = _.filter(this.$store.state.bettingChips, 'isActive')
        this.$store.state.selectedChip = result[0]
      },
      formatToPrice(value) {
        // return value.toFixed(0)
        return this.$options.filters.toMoney(value)
      },
      selectedChip_Bet(index, chips) {
        let _s = this
        _s.activeItem = index
        let addbettingchips = Object.assign({
          class: chips.class,
          isActive: chips.isActive,
          isCustom: chips.isCustom,
          value: chips.value
        })
        _s.$store.state.selectedChip = addbettingchips
        _s.$store.state.bettingSpecialChip[0].isActive = false
        _s.clickEff()
      },
      sectionObjToName: function (code) {
        let objects = {
          player: 'player',
          player_pair: 'player pair',
          banker: 'banker',
          banker_pair: 'banker pair',
          tie: 'tie',
          super_six: 'super six',
          dragon: 'dragon',
          tiger: 'tiger',
          '1': '1',
          '2': '2',
          '5': '5',
          '10': '10',
          '20': '20',
          'og': 'OG',
          s0: 's0',
          s1: 's1',
          s2: 's2',
          s3: 's3',
          s4: 's4',
          s5: 's5',
          s6: 's6',
          s7: 's7',
          s8: 's8',
          s9: 's9',
          s10:'s10',
          s11:'s11',
          s12:'s12',
          s13:'s13',
          s14:'s14',
          s15:'s15',
          s16:'s16',
          s17:'s17',
          s18:'s18',
          s19:'s19',
          s20:'s20',
          s21:'s21',
          s22:'s22',
          s23:'s23',
          s24:'s24',
          s25:'s25',
          s26:'s26',
          s27:'s27',
          s28:'s28',
          s29:'s29',
          s30:'s30',
          s31:'s31',
          s32:'s32',
          s33:'s33',
          s34:'s34',
          s35:'s35',
          s36:'s36',
          near1: 'near1',
          near2: 'near2',
          near3: 'near3',
          near4: 'near4',
          near5: 'near5',
          near6: 'near6',
          near7: 'near7',
          near8: 'near8',
          near9: 'near9',
          near10: 'near10',
          near11: 'near11',
          near12: 'near12',
          near13: 'near13',
          near14: 'near14',
          near15: 'near15',
          near16: 'near16',
          near17: 'near17',
          near18: 'near18',
          near19: 'near19',
          near20: 'near20',
          near21: 'near21',
          near22: 'near22',
          near23: 'near23',
          near24: 'near24',
          split1: 'split1',
          split2: 'split2',
          split3: 'split3',
          split4: 'split4',
          split5: 'split5',
          split6: 'split6',
          split7: 'split7',
          split8: 'split8',
          split9: 'split9',
          split10:'split10',
          split11:'split11',
          split12:'split12',
          split13:'split13',
          split14:'split14',
          split15:'split15',
          split16:'split16',
          split17:'split17',
          split18:'split18',
          split19:'split19',
          split20:'split20',
          split21:'split21',
          split22:'split22',
          split23:'split23',
          split24:'split24',
          split25:'split25',
          split26:'split26',
          split27:'split27',
          split28:'split28',
          split29:'split29',
          split30:'split30',
          split31:'split31',
          split32:'split32',
          split33:'split33',
          split34:'split34',
          split35:'split35',
          split36:'split36',
          street1:'street1',
          street2:'street2',
          street3:'street3',
          street4:'street4',
          street5:'street5',
          street6:'street6',
          street7:'street7',
          street8:'street8',
          street9:'street9',
          street10:'street10',
          street11:'street11',
          street12:'street12',
          line0: 'line0',
          line1: 'line1',
          line2: 'line2',
          line3: 'line3',
          line4: 'line4',
          line5: 'line5',
          line6: 'line6',
          line7: 'line7',
          line8: 'line8',
          line9: 'line9',
          line10: 'line10',
          line11: 'line11',
          square1:'square1',
          square2:'square2',
          square3:'square3',
          square4:'square4',
          square5:'square5',
          square6:'square6',
          square7:'square7',
          square8:'square8',
          square9:'square9',
          square10:'square10',
          square11:'square11',
          square12:'square12',
          square13:'square13',
          square14:'square14',
          square15:'square15',
          square16:'square16',
          square17:'square17',
          square18:'square18',
          square19:'square19',
          square20:'square20',
          square21:'square21',
          square22:'square22',
          square23:'square23',
          square24:'square24',
          square25:'square25',
          square26:'square26',
          square27:'square27',
          square28:'square28',
          square29:'square29',
          square30:'square30',
          square31:'square31',
          square32:'square32',
          square33:'square33',
          square34:'square34',
          square35:'square35',
          tri1: 'tri1',
          tri2: 'tri2',
          row1: 'row1',
          row2: 'row2',
          row3: 'row3',
          dozen1: 'dozen1',
          dozen2: 'dozen2',
          dozen3: 'dozen3',
          small: 'small',
          big: 'big',
          even: 'even',
          odd: 'odd',
          red: 'red',
          black: 'black'
        }
        if (typeof code === 'undefined') return ''
        return objects[code]
      },

      /**
       * Clear chips to the betting area
       * @param sectionCode
       * @param isReset
       */
      clearChips: function (isReset = false, sectionCode = '') {
        let _s = this
        let rebetChipsCtr = 0
        let section, totalMount, bets

        // If sending bet while timer ends defer clear chips
        if (_s.isSendingBet) return

        // Pre-setting variables
        section = _s.betTable.section

        // If no section code defined loop every bet place
        if (!sectionCode) {
          // Clear Bets
          _.forEach(section, (sec) => {
            totalMount = 0
            // Clear chips including confirmed
            if (isReset) {
              _.forEachRight(sec.bets, (bet) => { _s.projectedBalance -= parseFloat(bet.chipValue) })

              // Reset bet information
              sec.bets = []
              sec.percentage = 0
              sec.players = 0
              sec.totalBetAmt = 0
              // Reset re-bet flag
              rebetChipsCtr++
            } else {
              // Loop thru bets and remove unconfirmed bets
              _.forEachRight(sec.bets, (bet, betKey) => {
                // Look for unconfirmed bets
                if (!bet.isConfirmed) {
                  _s.projectedBalance -= parseFloat(bet.chipValue)
                  sec.bets.splice(betKey, 1)
                  // Reset local re-bet flag
                  if (bet.isRebet) {
                    rebetChipsCtr++
                  }
                } else {
                  totalMount += parseFloat(bet.chipValue)
                }
              })
            }
            // Set staged display total per bet place
            sec.sumOfStagedChips = totalMount
          })
        } else {
          bets = section[sectionCode].bets
          totalMount = 0
          // Specific bet area will be coded here
          if (isReset) {
            // Reset specific section including confirmed chips
            bets = []
          } else {
            _.forEachRight(bets, (bet, betKey) => {
              // Look for unconfirmed bets
              if (!bet.isConfirmed) {
                _s.projectedBalance -= parseFloat(bet.chipValue)
                bets.splice(betKey, 1)
                // Reset local re-bet flag
                if (bet.isRebet) {
                  rebetChipsCtr++
                }
              } else {
                totalMount += parseFloat(bet.chipValue)
              }
            })
          }
          // Set staged display total per bet place
          section[sectionCode].sumOfStagedChips = totalMount
        }

        // If there's a re-bet chips, call API delete re-bet
        if (rebetChipsCtr) {
          _s.isBusy = true
          _s.$store.dispatch('REBET_FLAG_API', {
            method: 'DEL',
            tableNumber: _s.table.tableNumber,
            gameSet:_s.table.gameSet,
            shoeGame: _s.table.shoeGame
          }).then((res) => {
            _s.isBusy = false
          }, (err) => {
            _s.isBusy = false
          })
        }
      },
      /**
       * Confirmation of chips
       */
      confirmChips: function () {
        let _s = this
        let finalBet = [], allChips = []
        let section, hasRebetOnStaged, unconfIndx, allIndx;

        // Pre-setting variables
        section = _s.betTable.section
        _s.isBusy = true
        _s.isSendingBet = true

        // Loop to find unconfirmed bet
        _.forEach(section, (sec, secKey) => {
          // If super six is toggled-off don'tinclude on betting confirmation
          if (secKey === 'super_six' && !_s.superSix) return 0

          _.forEach(sec.bets, (bet) => {
            allIndx = _.findIndex(allChips, function (o) { return o.betSection === bet.betSection })
            if (allIndx > -1) {
              allChips[allIndx].betSection = secKey
              allChips[allIndx].chipValue += parseFloat(bet.chipValue)
            } else {
              allChips.push({ isConfirmed: true, betSection: bet.betSection, chipValue: bet.chipValue, chipClass: bet.chipClass })
            }

            // Look for unconfirmed bets
            if (!bet.isConfirmed) {
              unconfIndx = _.findIndex(finalBet, function (o) { return o.index === bet.betSection })
              if (unconfIndx > -1) {
                finalBet[unconfIndx].index = secKey
                finalBet[unconfIndx].chipValue += parseFloat(bet.chipValue)
              } else {
                finalBet.push({ index: bet.betSection, chipValue: bet.chipValue, chipClass: bet.chipClass })
              }
              // Look for a chips that is coming from rebet
              if (bet.isRebet) {
                hasRebetOnStaged = true
              }
            }
          })
        })

        // Dispatch request to API
        _s.$store.dispatch('CONFIRM_BETTINGS', {
          bettings: finalBet,
          gameset: _s.table.gameSet,
          tableid: _s.table.id,
          superSix: _s.superSix,
          tableNumber: _s.table.tableNumber
        }).then((res) => {
          console.log(res)
          // Flag activate for confirm
          _s.$store.state.isConfirm = true
          // This is to set the main re-bet flag is successful
          if (hasRebetOnStaged) {
            _s.$store.dispatch('REBET_API', { method: 'DEL', tableNumber: _s.table.tableNumber })
          }
          // Set Staged chips confirm status
          _.forEach(section, (sec,secKey) => {
            // If super six is toggled-off don'tinclude on betting confirmation
            if (secKey === 'super_six' && !_s.superSix) return 0

            _.forEach(sec.bets, (bet) => {
              if (bet.isConfirmed) { return }
              bet.isConfirmed = true
              _s.projectedBalance -= parseFloat(bet.chipValue)
            })
          })
          // Show bet prompt
          _s.isBusy = false
          _s.isSendingBet = false
          _s.promptBet({ betPlace: finalBet, betAmount: _.sumBy(finalBet, (d) => { return d['chipValue'] }) })

          // Add current confirm bet to server cache in-case of refresh of page
          _s.$store.dispatch('LTHB_API', {
            method: 'SET',
            tableNumber: _s.table.tableNumber,
            gameSet: _s.table.gameSet,
            shoeGame: _s.table.shoeGame,
            sections: allChips
          })
        }, (err) => {
          _s.isBusy = false
          _s.isSendingBet = false
          console.log(err)

          if (_s.table.status !== 'betting') {
            _s.clearChips()
          }
        })
      },
      /**
       * Rebet Function
       * @param sectionCode
       */
      rebetChips: function (sectionCode = '') {
        let _s = this
        let totalChipsAmount = 0;
        let myBalance = _s.$store.state.userinfo.balance;
        _s.isBusy = true
        // Check re-bet condition
        _s.$store.dispatch('REBET_API', {
          method: 'GET',
          tableNumber: _s.currentTableIndex,
          shoeGame: _s.table.shoeGame,
          gameSet: _s.table.gameSet
        }).then((res) => {
          // If re-bet object is empty
          if (!_.isEmpty(res.data)) {

            // Sum all chips
            totalChipsAmount = _.sumBy(res.data, 'chipValue');

            // Projected Balance condition
            if (totalChipsAmount > myBalance) {
              _s.$store.state.message = 'Insufficient funds to rebet';
            } else {
              // Add chips based on cached data
              _.map(res.data, (chip) => {
                // Clear unconfirmed bets
                _s.clearChips(false, chip.betSection)
                // Toggle super six if there is a super six in re-bet
                if (chip.betSection === 'super_six') { _s.superSix = true }
                // Add chips
                _s.addChips(chip.betSection, {
                  value: parseFloat(chip.chipValue),
                  class: chip.chipClass,
                  isRebet: true
                }, true, {}, '', false, true)
              })
            }

            _s.isBusy = false
          } else {
            console.log('_.isEmpty(res.data)', _.isEmpty(res.data))
            _s.isBusy = false
            _s.$store.state.message = 'Rebet is not available'
          }
        }, (err) => {
          console.log(err)
          _s.isBusy = false
          _s.$store.state.message = 'Rebet is not available'
          return false
        })
      },

      /**
       * Prompt player bets
       * @param betInfo
       */
      promptBet: function (betInfo) {
        // let user = this.$store.state.userinfo
        /*
       user.avatar - for avatar
       user.nickname - for backup
       */
        let _s = this
        let sectionString = 'You\'ve just bet '
        let sectionStringcn = '你在'
        let ctr = betInfo.betPlace.length

        if (ctr === 1) {
          if (_s.locale === 'en' || _s.locale === 'jp' || _s.locale === 'ko' || _s.locale === 'th' || _s.locale === 'id' || _s.locale === 'vn') {
            sectionString += `<span class="bet__amount">` + _s.$options.filters.toMoney(betInfo.betPlace[0].chipValue) + `</span> in <span class='bet__section ` + betInfo.betPlace[0].index + `'>` + _s.$options.filters.resultAlias(betInfo.betPlace[0].index) + `</span>`
          } else {
            sectionStringcn += `<span class='bet__section ` + betInfo.betPlace[0].index + `'>` + _s.tt(_s.sectionObjToName(betInfo.betPlace[0].index)) + `</span>` + `<span>区下注</span>` + `<span class="bet__amount">` + _s.$options.filters.toMoney(betInfo.betPlace[0].chipValue) + `</span>`
          }
        } else {
          betInfo.betPlace.map(function (d, i) {
            // Check if the bet place count is greater than 1
            // if (ctr > 1) {
            //   // Check if it is the item
            //   if (i === ctr - 1) {
            //     sectionString += ' and '
            //   } else {
            //     // If not the first item add comma
            //     if (i !== 0) {
            //       sectionString += ', '
            //     }
            //   }
            // }
            sectionString += `<br><span class="bet__amount">` + _s.$options.filters.toMoney(d.chipValue) + `</span> in <span class='bet__section ` + d.index + `'>` + _s.$options.filters.resultAlias(d.index) + `</span>`
            sectionStringcn += `<br><span class='bet__section ` + d.index + `'>` + _s.tt(_s.$options.filters.resultAlias(d.index)) + `</span>` + `<span>區下注</span>` + `<span class="bet__amount">` + _s.$options.filters.toMoney(d.chipValue) + `</span>`
          })
        }

        if (_s.locale === 'en' || _s.locale === 'jp' || _s.locale === 'ko' || _s.locale === 'th' || _s.locale === 'id' || _s.locale === 'vn') {
          _s.$snotify.html(`<div class="notification__wrapper" style="text-align: left;">` + sectionString + `</div>`, {
            timeout: 2500,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            animation: {
              enter: 'bounceIn',
              exit: 'zoomOut',
              time: 500
            }
          })
        } else {
          _s.$snotify.html(`<div class="notification__wrapper" style="text-align: left;">` + sectionStringcn + `</div>`, {
            timeout: 2500,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            animation: {
              enter: 'bounceIn',
              exit: 'zoomOut',
              time: 500
            }
          })
        }

        _s.$store.state.isConfirm = true
      },

      resetGameValues: function () {
        let _s = this

        // Clear highest bidders
        _s.table.highestBankerBidder.userId = 0
        _s.table.highestPlayerBidder.userId = 0
        _s.table.highestDragonBidder.userId = 0
        _s.table.highestTigerBidder.userId = 0
        _s.table.superSixDisabled = false
        // Reset isConfirm status
        _s.$store.state.isConfirm = false
        localStorage.removeItem('_bet_' + _s.table.tableNumber)
        // Remove temporary super six info upon change of shoeHand
        // console.log('_s.table.codecc', _s.table.code)
        if (_s.table.code !== 'moneywheel' && _s.table.code !== 'dragontiger') {
          if (_s.betTable.section['super_six']) {
            let s6 = _s.betTable.section['super_six']
            s6._bets = []
            s6._totalBetAmt = 0
            s6._sumOfStagedChips = 0
          }
        }
      }
    },
    computed: {
      isBusy: {
        get () { return this.$store.state.isBusy },
        set (v) { this.$store.state.isBusy = v }
      },
      projectedBalance: {
        get () { return this.$store.state.betTableGlobal.projectedAmount },
        set (v) { this.$store.state.betTableGlobal.projectedAmount = v > 0 ? v : 0 }
      },

      getImgUrl: {
        get() {
          let storeimage = this.$store.state.TempChipClass
          return 'static/chips/' + storeimage + '.png'
        }
      },
      getBettingChips: {
        get() {
          return _.filter(this.$store.state.bettingChips, 'isActive')
        }
      },
      avatar: {
        get(e) {
          return e.$store.state.userinfo.avatar
        }
      },
      balance: {
        get(e) {
          return e.$store.state.userinfo.balance
        }
      },
      currentTableIndex: {
        get(e) {
          return e.$store.state.currentTableIndex }
      },
      _specialChip: {
        get(e) {
          e.$store.state.bettingSpecialChip[0].value = e.$store.state.customChipsValue
          return e.$store.state.customChipsValue
        }
      },
      table: {
        get() {
          return this.$store.state.tablelist[this.currentTableIndex]
        }
      },
      status: function () {
        return this.table.status
      },
      tablePlayers: {
        get() {
          let _s = this
          let players = _s.table.playerLists
          if (_s.table.tableNumber.includes('M') && players.length !== 0) {
            // The most important piece of the puzzle, must be in array in order for _.union() to work
            let you = [_.find(players, x => x.id === _s.$store.state.userinfo.id)]
            // other player group
            let oth = []
            // sorted friend group to be filled after iteration
            let frn = []
            let friends = _s.$store.state.contentfromuser
            _.each(players, (val, ind) => {
              _.each(friends, (v, i) => {
                // check values if they are your friends
                if (val.id === v.follow_user_id) {
                  // move to friend array
                  frn.push(val)
                } else {
                  // move to others array
                  oth.push(val)
                }
              })
            })
            // Sort by the richest person
            _.orderBy(oth, 'balance', 'desc')
            _.orderBy(frn, 'balance', 'desc')
            // Combining all arrays
            players = _.union(you, _.union(frn, oth))
            players = !players[0] ? [] : players
          }
          return players
        }
      },
      shoeGame: {
        get () {
          return this.table.shoeGame
        }
      },
      locale: {
        get() {
          return this.$store.state.locale
        }
      },
      highestPlayerBidder: {
        get() {
          return this.table.highestPlayerBidder
        }
      },
      highestBankerBidder: {
        get() {
          return this.table.highestBankerBidder
        }
      },
      highestDragonBidder: {
        get() {
          return this.table.highestDragonBidder
        }
      },
      highestTigerBidder: {
        get() {
          return this.table.highestTigerBidder
        }
      },
      timer: {
        get() {
          return this.table.game.timer
        }
      },
      result: {
        // RETURN RESULT AFTER THE GAME IS FINISHED
        get() {
          let _s = this
          return _s.$store.state.tablelist[_s.currentTableIndex].game.result ? _s.$store.state.tablelist[_s.currentTableIndex].game.result : ''
        }
      },
      getBettingtable: {
        get () {
          return this.$store.state.currenttab
        }
      },
      // Returns bet table information
      betTable: {
        get() {
          return this.$store.state.betTable[this.getBettingtable]
        }
      },
      superSix: {
        get() { return this.$store.state.tablelist[this.table.tableNumber].isSuperSix },
        set (v) { this.$store.state.tablelist[this.table.tableNumber].isSuperSix = v }
      }
    },

    watch: {
      getBettingChips: {
        handler: function (value) {
          let _s = this
          let checkSelectedChip = _.filter(_s.$store.state.bettingChips, x => x.class === _s.$store.state.selectedChip.class)
          let result = _.filter(_s.$store.state.bettingChips, 'isActive')
          result.forEach(function (content, index) {
            if (content.class === _s.$store.state.selectedChip.class) {
              _s.activeItem = index
            }
          })
          if (!checkSelectedChip[0].isActive) {
            let result = _.filter(this.$store.state.bettingChips, 'isActive')
            _s.$store.state.selectedChip = result[0]
            _s.activeItem = 0
          }
        },
        deep: true
      },
      currentTableIndex: function (n, o) {
        let _s = this

        // Clear Chips if tablNumber change
        if (n) {
          _s.clearChips(true)
          _s.$store.dispatch('LTB_API', {
            method: 'GET',
            tableNumber: n
          }).then((res) => {
            // console.log('LTB_API', res)
          }, (err) => {
            console.error(new Error(err))
          })
        }
      },
      status: function (n, o) {
        let _s = this
        let toLocalStorage = []
        switch (n) {
          case 'betting':
            _s.isBusy = false
            break
          case 'dealing':
            _s.clearChips()
            break
          case 'default':
            // Get all chips to be set on localStorage
            _.forEach(_s.betTable.section, (v) => {
              _.map(v.bets, (bet) => {
                if (bet.isConfirmed) {
                  let index = _.findIndex(toLocalStorage, (o) => {
                    return o.betSection === bet.betSection
                  })
                  if (index > -1) {
                    toLocalStorage[index].chipValue += parseFloat(bet.chipValue)
                    toLocalStorage[index].chipClass = bet.chipClass
                  } else {
                    toLocalStorage.push(bet)
                  }
                }
              })
            })

            if (toLocalStorage.length) {
              // Add re-bet to server cache
              _s.$store.dispatch('REBET_API', {
                method: 'SET',
                tableNumber: _s.table.tableNumber,
                gameSet: _s.table.gameSet,
                shoeGame: _s.table.shoeGame,
                sections: toLocalStorage
              })
            } else {
              // _s.$store.dispatch('REBET_API', {
              //   method: 'DEL',
              //   tableNumber: _s.table.tableNumber
              // })
            }

            // Reset chips
            _s.clearChips(true)
            // Reset main rebet flag
            _s.betTable.hasRebet = false
            break
          case 'shuffling':
            _s.resetGameValues()
            break;
        }
      },
      shoeGame: function () {
        this.resetGameValues()
      },
      superSix: function (n) {
        let s6 = this.betTable.section['super_six']
        if (n) {
          // Pull out from temporary super six info
          _.forEach(s6.bets, (v, k) => {
            setTimeout(() => {
              TweenLite.set('.label__bet', {x: '-20', opacity: 1})
              TweenLite.to('._' + (k+1), 1, {ease: Expo.easeOut, rotation: 0, y: '+45%', x: '-15'})
            }, 100)
          })
        }
      },
      timer: function (n) {
        let _s = this
        if (n === 0) {
          _s.isBusy = true
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.--is-green {
  color: $green-text
}

.v-btn--outline {

  &.--is-orange {
    @include color-switch($btn-stroke-color !important, $text-color: true, $border-color: true);
  }

  &.--is-green {
    @include color-switch($dark-green !important, $text-color: true, $border-color: true);
  }

  &.--is-gray {
    @include color-switch(lighten($sidebar-bg, 20%) !important, $text-color: true, $border-color: true);
  }

  &.--is-red {
    @include color-switch($dark-red !important, $text-color: true, $border-color: true);
  }
}
</style>
