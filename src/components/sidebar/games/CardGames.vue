<template>
  <div class="sidebar__card" :class="[tableInfo.code, hasConfirm && tableInfo.status === 'betting' ? '--has-betting' : '', $props.hasGoodTips ? '--has-goodtips' : '']">
    <!-- Mini View -->
    <div class="mini-tile">
      <ul>
        <li><span>{{tableInfo.game.timer || 0}}</span></li>
        <li>{{ tableInfo.tableNumber }}</li>
      </ul>
    </div>
    <!-- Full View -->
    <div class="inner-wrapper">
      <!-- Card Header -->
      <ul class="card__header">
        <!-- Table Number -->
        <li class="--is-number">
          {{ tt(tableInfo.tableNumber) }}
        </li>
        <!-- Table Name -->
        <li>
          <div class="marquee-animate">
            <marquee behavior="scroll" direction="left" scrollamount="5" style="width:100%; height:100%; vertical-align:middle;" onmouseout="javascript:this.setAttribute('scrollamount','5');">{{ tt(tableInfo.name) }}</marquee>
          </div>
        </li>
        <!-- Custom Header -->
        <v-slide-x-reverse-transition v-if="['baccarat'].indexOf(tableInfo.code) > -1">
          <li v-if="tableInfo.isSideBetting && !isLobby" class="--is-shown">
            <label :for="'s6SideBet-' + tableInfo.tableNumber" class="super__switch" :class="hasConfirm || isSidebarBusy || tableInfo.status !== 'betting' ? 'disable__superSixclick' : ''">
              <input type="checkbox" :id="'s6SideBet-' + tableInfo.tableNumber" v-model="superSix">
              <div class="slider round" :data-text="tt('Super 6')"></div>
            </label>
          </li>
        </v-slide-x-reverse-transition>
        <!-- Table Timer -->
        <li class="--is-number">
          <span>{{tableInfo.game.timer || 0}}</span>
        </li>
      </ul>

      <!-- Card Body -->
      <div class="card__body">
        <!-- Overlay Status Prompt -->
        <v-scale-transition origin="center center">
          <div>
            <!-- Message Prompt -->
            <div class="notification" v-if="sideBetPrompt !== ''">
              <span> {{ tt(sideBetPrompt) }} </span>
            </div>

            <!-- Prompt for Baccarat / Dragon Tiger -->
            <template v-if="['baccarat', 'dragontiger'].indexOf(tableInfo.code) > -1">
              <!-- Shuffling Prompt -->
              <div class="--is-shuffling" style="z-index: 999" v-if="tableInfo.status === 'shuffling'">
                <div class="svg-holder">
                  <svgicon name="shuffling" height="24" scale="3" color="#ffffff"></svgicon>
                </div>
                {{ tt('Shuffling') }}...
              </div>
              <!-- Dealing Prompt -->
              <div class="--is-shuffling" style="z-index: 999" v-if="!squeezeStart && table.status === 'dealing'">
                <div class="svg-holder">
                  <svgicon name="shuffling" height="24" scale="3" color="#ffffff"></svgicon>
                </div>
                {{ tt('Dealing') }}...
              </div>
              <!-- Winner Prompt -->
              <div class="--is-shuffling --mw-win-multiplier" style="z-index: 999" v-if="showWinnings">
                <span class="winning-card-box">{{ getWinner }}</span>

                <template v-if="!hasConfirm">
                  <span class="multiplier-box --is-number" >0.00</span>
                </template>

                <template v-else>
                  <span class="multiplier-box --is-number">{{ winAmount | toMoney() }}</span>
                </template>

              </div>
            </template>

            <!-- Prompt for Roulette -->
            <template v-else-if="['roulette'].indexOf(tableInfo.code) > -1">
              <div class="--is-shuffling --mw-win-sidebar" style="z-index: 999" v-if="tableInfo.status === 'default' && !rshowWinnings">
                <span class="--mw-has-result" v-if="tableInfo.game.value">{{ tableInfo.game.value }}</span>
              </div>
              <!-- Spinning Wheel -->
              <div class="--is-shuffling" style="z-index: 999" v-if="tableInfo.status === 'dealing'">
                <div class="svg-holder-mw">
                </div>
                {{ tt('Spinning Wheel') }}...
              </div>

              <!-- Winner Prompt -->
              <div class="--is-shuffling --mw-win-multiplier" style="z-index: 999" v-if="rshowWinnings">
                <span class="winning-card-box">{{ getWinner }}</span>

                <template v-if="!hasConfirm">
                  <span class="multiplier-box --is-number" >0.00</span>
                </template>

                <template v-else>
                  <span class="multiplier-box --is-number">{{ winAmount | toMoney() }}</span>
                </template>
              </div>
            </template>

            <!-- Prompt for Moneywheel -->
            <template v-else>
              <div class="--is-shuffling --mw-win-sidebar" style="z-index: 999" v-if="tableInfo.status === 'default'">
                <span class="--mw-has-result" v-if="tableInfo.game.result !== 'og'">{{ tableInfo.game.result }}</span>
                <span class="--mw-has-og-result" v-else-if="tableInfo.game.result === 'og'"></span>
                <!--<span class="&#45;&#45;mw-has-multi-result" v-if="multiplier > 1"> x{{ multiplier }}</span>-->
                <span class="--mw-has-amount" v-if="multiplier > 1"> x{{ multiplier }}</span>
                <!--<span class="&#45;&#45;mw-has-amount"> {{ mwBetResult }}</span>-->
              </div>
              <!-- Spinning Wheel -->
              <div class="--is-shuffling" style="z-index: 999" v-if="tableInfo.status === 'dealing'">
                <div class="svg-holder-mw">
                  <!-- <svgicon name="moneywheel" color="#ffffff"></svgicon> -->
                </div>
                {{ tt('Spinning Wheel') }}...
              </div>

              <div class="--is-shuffling --mw-win-multiplier" v-if="!tableInfo.game.result && multiplier > 1" style="z-index: 999;">
                <span class="multiplier-box">x{{ multiplier }}</span>
              </div>

              <!-- Winner Prompt -->
              <div class="--is-shuffling --mw-win-multiplier" style="z-index: 999" v-if="showWinnings">
                <span class="winning-card-box">{{ getWinner }}</span>

                <template v-if="!hasConfirm">
                  <span class="multiplier-box --is-number" >0.00</span>
                </template>

                <template v-else>
                  <span class="multiplier-box --is-number">{{ winAmount | toMoney() }}</span>
                </template>
              </div>

            </template>
          </div>
        </v-scale-transition>

        <v-scale-transition origin="center center">
          <div class="--has-result" v-if="(tableInfo.status !== 'betting') && ['baccarat', 'dragontiger'].indexOf(tableInfo.code) > -1">
            <ul class="list__ui">
              <li class="--is-center">
                <span class="blue--text text--darken-3">{{ (tableInfo.code !== 'dragontiger') ?  tt('P') : tt('D') }}</span>
                <span class="--is-number" v-if="_.includes(['baccarat', 'dragontiger'], tableInfo.code)">{{ ((tableInfo.code !== 'dragontiger') ?  playerTotal : dragonTotal) || 0}}</span>
              </li>
              <li class="--is-center">
                <span class="red--text text--darken-3" v-if="$store.state.locale==='cn'">{{ (tableInfo.code !== 'dragontiger') ? tt('B') : tt('TG') }}</span>
                <!-- <span class="red--text text--darken-3" v-if="$store.state.locale==='en' || $store.state.locale==='jp' || $store.state.locale==='ko' || $store.state.locale==='vn' || $store.state.locale==='th' || $store.state.locale==='id'">{{ (tableInfo.code !== 'dragontiger') ? tt('B') : tt('T') }}</span> -->
                <span class="red--text text--darken-3" v-else>{{ (tableInfo.code !== 'dragontiger') ? tt('B') : tt('T') }}</span>
                <span class="--is-number" v-if="_.includes(['baccarat', 'dragontiger'], tableInfo.code)">{{ ((tableInfo.code !== 'dragontiger') ? bankerTotal : tigerTotal) || 0}}</span>
              </li>
            </ul>
            <ul class="card__deck__result">
              <li>
                <!-- First card -->
                <!-- change playerCards to bankerCards at if condition to avoid early card reveal -->
                <div class="front" v-if="tableInfo.code !== 'dragontiger' && this.bankerCards.card1 === undefined"></div>
                <div class="front" v-if="tableInfo.code === 'dragontiger' && this.dragoncardshow.dragon === undefined"></div>
                <div :class="[tableInfo.code !== 'dragontiger' ? playerCard1 : dragoncard]"></div>
                <!-- Second card -->
                <div class="front" v-if="this.bankerCards.card2 === undefined && tableInfo.code !== 'dragontiger'"></div>
                <div :class="[playerCard2,getBettingStatus]" v-if="_tableSidebet.code !== 'dragontiger'"></div>
                <!-- Third card -->
                <div :class="[playerCard3,getBettingStatus]" class="--is-horizontal" v-if="_tableSidebet.code !== 'dragontiger' && this.bankerCards.card1 !== undefined"></div>
              </li>
              <li>
                <!-- First card -->
                <div class="front --is-redbg" v-if="tableInfo.code !== 'dragontiger' && this.bankerCards.card1 === undefined"></div>
                <div class="front --is-redbg" v-if="tableInfo.code === 'dragontiger' && this.tigercardshow.tiger === undefined"></div>
                <!-- --TODO.alfie -->
                <div :class="[tableInfo.code !== 'dragontiger' ? bankerCard1 : tigercard]"></div>
                <!-- Second card -->
                <div class="front --is-redbg" v-if="this.bankerCards.card2 === undefined && tableInfo.code !== 'dragontiger'"></div>
                <div :class="[bankerCard2,getBettingStatus]" v-if="_tableSidebet.code !== 'dragontiger'"></div>
                <!-- Third card -->
                <div :class="[bankerCard3,getBettingStatus]" class="--is-horizontal" v-if="_tableSidebet.code !== 'dragontiger'"></div>
              </li>
            </ul>
          </div>
        </v-scale-transition>

        <!--
         __________          __     __   .__                     _____
          \______   \  ____ _/  |_ _/  |_ |__|  ____    ____     /  _  \ _______   ____  _____
           |    |  _/_/ __ \\   __\\   __\|  | /    \  / ___\   /  /_\  \\_  __ \_/ __ \ \__  \
           |    |   \\  ___/ |  |   |  |  |  ||   |  \/ /_/  > /    |    \|  | \/\  ___/  / __ \_
           |______  / \___  >|__|   |__|  |__||___|  /\___  /  \____|__  /|__|    \___  >(____  /
                  \/      \/                       \//_____/           \/             \/      \/
         -->
        <v-scale-transition origin="center center">
          <div class="--is-side-betting" style="z-index: 99" v-if="(tableInfo.isSideBetting && !tableInfo.game.cards && !isLobby && !_.startsWith(tableInfo.status, 'squeeze')) || hasConfirm && tableInfo.status !== 'default' && tableInfo.status === 'betting'">
            <!-- Betting Area -->
            <ul class="side__betting__area" :class="[tableInfo.code === 'baccarat' ? '--is-bacarrat --is-bacc-sb' : tableInfo.code === 'dragontiger' ? '--is-dragontiger --is-dt-sb' : '--is-money-wheel --is-dragon', superSix ? '--is-super6' : '']">
              <li v-for="(section, sectionIndex) in sideBetTable[tableInfo.code].section" @click="_addChips(sectionIndex)" :key="sectionIndex">
                <!-- Ratio -->
                <span :class="tableInfo.code !== 'moneywheel' ? '--sb-ratio --is-number' : '--mw-ratio'">
                  {{ tt(sectionIndex === 'banker' ? (superSix ? section.alterRatio : section.ratio) : section.ratio) }}
                </span>

                <!-- Middle Logo -->
                <p v-if="sectionIndex !== 'og'" :class="tableInfo.code !== 'moneywheel' ? section.class : 'red--text text--darken-3 --mw-font-size'">{{tt(getName(section.name))}}</p>

                <img v-else style="margin-top: 10px; height: 25px;" src="https://static.oriental-game.com/image/jackpot.png">
                <!-- Stacking Chips -->
                <img style="position:absolute; height:40px; width:40px" class="label__sbet" v-for="(chip, chipIndex) in section.bets" :src="'https://static.oriental-game.com/chips/betting/'+chip.chipImage+'.png'" :key="chipIndex">

                <!-- Total Chips -->
                <span class="--betting-sidebar --is-number" v-if="section.sumOfStagedChips > 0">{{section.sumOfStagedChips | minimizeNumber }}</span>
              </li>
            </ul>

            <!-- Action Buttons -->
            <ul class="btn__group">
              <li><v-btn @click="_confirmChips()" block color="btn__success_gradient --is-btn-radius" small :disabled="isSidebarBusy || tableInfo.status !== 'betting' || tableInfo.status === 'shuffling'">{{ tt('Confirm') }}</v-btn></li>
              <li><v-btn @click="_clearChips()" block color="btn__error_gradient --is-btn-radius" small :disabled="isSidebarBusy || tableInfo.status !== 'betting'">{{ tt('Cancel') }}</v-btn></li>
            </ul>
          </div>
        </v-scale-transition>

        <!-- Mini Road Maps -->
        <div class="table__wrapper" :class="[$store.state.blackRoadMapSelected ? '--is-black' : '', tableInfo.code === 'moneywheel' ? '--is-moneywheel' : '']">
          <!--<Road :type="tableInfo.code === 'moneywheel' ? 'beadRoad' : 'bigRoad'" :game="tableInfo.code" :data="roadData" :tooltip="false"></Road>-->
          <RoadMapJS
            :road="_.includes(['moneywheel', 'roulette'], tableInfo.code) ? ['beadRoad'] : ['bigRoad']"
            :sidebar="true"
            :game="tableInfo.code"
            :status="tableInfo.status"
            :data="roadData"
            :config="roadConfig"
          />
        </div>

        <!-- Enter Button -->
        <ul class="btn__group" :class="tableInfo.code === 'baccarat' || tableInfo.code === 'dragontiger' ? '--is-baccarat' : ''">
          <!-- <li><v-btn @click="enterGame(tableInfo, table.tableNumber)" block :outline="isLobby ? true : false" color="btn__success_gradient --is-btn-radius" small>{{ tt((['normal', '', null].indexOf(tableInfo.subcode) > -1  ? 'Enter' : 'Enter')) }}</v-btn></li> -->
          <li><v-btn @click="enterGame(tableInfo, table.tableNumber)" block color="btn__success_gradient --is-btn-radius" small>{{ tt((['normal', '', null].indexOf(tableInfo.subcode) > -1  ? 'Enter' : 'Enter')) }}</v-btn></li>
          <li v-if="tableInfo.code !== 'roulette' && !isLobby"><v-btn @click="activeSideBar(true)" block color="btn__info_gradient --is-btn-radius" small>{{ tt('Bet') }}</v-btn></li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
import RoadMapJS from '@/components/road/RoadmapJS'
import Betting from '@/library/Betting'
import _ from 'lodash'
const COOLDOWN = 80
export default {
  mixins: [ Betting ],
  components: { RoadMapJS },
  props: {
    table: Object,
    hasGoodTips: {
      type: Boolean,
      default: false
    }
  },
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
      sideBetTable: {
        baccarat: {
          section: {
            player_pair: {
              name: 'PP',
              ratio: '1:11',
              alterRatio: '1:11',
              isActive: true,
              class: 'blue--text text--darken-3',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            tie: {
              name: 'T',
              ratio: '1:8',
              alterRatio: '1:8',
              isActive: true,
              class: 'green--text text--darken-1',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              bets: []
            },
            banker_pair: {
              name: 'BP',
              ratio: '1:11',
              alterRatio: '1:11',
              class: 'red--text text--darken-3',
              isActive: true,
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              bets: []
            },
            player: {
              name: 'P',
              ratio: '1:1',
              alterRatio: '1:1',
              isActive: true,
              class: 'blue--text text--darken-3',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            super_six: {
              name: 'S6',
              ratio: '1:12',
              alterRatio: '1:12',
              isActive: false,
              totalBetAmt: 0,
              class: 'green--text text--darken-1',
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            banker: {
              name: 'B',
              ratio: '1:0.95',
              alterRatio: '1:1',
              isActive: true,
              class: 'red--text text--darken-3',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            }
          }
        },
        dragontiger: {
          section: {
            tie: {
              name: 'T',
              ratio: '1:8',
              alterRatio: '1:8',
              isActive: true,
              class: 'green--text text--darken-1',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            dragon: {
              name: 'D',
              ratio: '1:1',
              alterRatio: '1:1',
              isActive: true,
              class: 'blue--text text--darken-3',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            tiger: {
              name: 'TG',
              ratio: '1:1',
              alterRatio: '1:1',
              isActive: true,
              class: 'red--text text--darken-3',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            }
          }
        },
        moneywheel: {
          section: {
            '1': {
              name: '1',
              ratio: 'Pays 1x',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            '2': {
              name: '2',
              ratio: 'Pays 2x',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            '5': {
              name: '5',
              ratio: 'Pays 5x',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            '10': {
              name: '10',
              ratio: 'Pays 10x',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            '20': {
              name: '20',
              ratio: 'Pays 20x',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            },
            'og': {
              name: 'og',
              ratio: 'Pays 40x',
              totalBetAmt: 0,
              sumOfStagedChips: 0,
              players: 0,
              bets: []
            }
          }
        },
        roulette: {
          section: {

          }
        }
      },
      hasConfirm: false,
      superSix: false,
      betHasSuperSix: false,
      isSidebarBusy: false,
      sideBetPrompt: ''
    }
  },
  mounted () {
    this.loadCardRoad()
  },
  computed: {
    projectedBalance: {
      get () { return this.$store.state.betTableGlobal.projectedAmount },
      set (v) { this.$store.state.betTableGlobal.projectedAmount = v > 0 ? v : 0 }
    },
    tableInfo: {
      get () {
        return this.$store.state.tablelist[this.$props.table.tableNumber]
      }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      }
    },
    tableIndex: {
      get () {
        return this.$store.state.currentTableIndex
      }
    },
    stackingBets: {
      get () {
        return this.$store.state.stacking_moneywheel_bets
      }
    },
    mwBetResult: {
      get () {
        let _s = this
        let winningBet = 0
        let result = this.table.game.result === 'og' ? 40 : this.table.game.result
        let multi = this.multiplier
        _.map(_s.$store.state.betting_moneywheel_totals, (v, i) => {
          let betPlace = i.split('_')[1].replace('x', '')
          betPlace = betPlace === 'Og' ? 40 : betPlace
          if (betPlace === result) {
            winningBet += v
          }
          _s.$store.state.betting_moneywheel_totals[i] = 0
        })
        return (winningBet * (result) * multi) + winningBet
      }
    },
    multiplier: {
      get () {
        let _s = this
        if (!_s.table.game.values) {
          return ''
        }
        let values = _s.table.game.values.split(',').length - 1
        let multi = Math.pow(3, values)
        return multi
      }
    },
    goodTipsList: {
      get () { return this.$store.state.goodTipsList }
    },
    _tableSidebet: {
      get () {
        try {
          return this.$store.state.tablelist[this.$props.table.tableNumber]
        } catch (err) {
          console.log('_tableSidebet', err)
        }
      }
    },

    resultSidebet: {
      // RETURN RESULT AFTER THE GAME IS FINISHED
      get () {
        return this._tableSidebet.game.result ? this._tableSidebet.game.result : ''
      }
    },
    road: {
      get () {
        return this._tableSidebet.road
      }
    },
    tblNumber: {
      get () {
        return this._tableSidebet.tableNumber
      }
    },
    bankerCards: {
      get () {
        return this._tableSidebet.game.result && this._tableSidebet.game.cards.banker ? this._tableSidebet.game.cards.banker : ''
      }
    },
    playerCards: {
      get () {
        return this._tableSidebet.game.cards && this._tableSidebet.game.cards.player ? this._tableSidebet.game.cards.player : ''
      }
    },
    dragoncardshow: {
      get () {
        return this._tableSidebet.game.result && this._tableSidebet.game.cards ? this._tableSidebet.game.cards : ''
      }
    },
    tigercardshow: {
      get () {
        return this._tableSidebet.game.result && this._tableSidebet.game.cards ? this._tableSidebet.game.cards : ''
      }
    },
    DragonCards: {
      get () {
        let _s = this
        return _s._tableSidebet.game.cards && _s._tableSidebet.game.cards.dragonValue ? _s._tableSidebet.game.cards.dragonValue.value : 0
      }
    },
    TigerCards: {
      get () {
        let _s = this
        return _s._tableSidebet.game.cards && _s._tableSidebet.game.cards.tigerValue ? _s._tableSidebet.game.cards.tigerValue.value : 0
      }
    },
    // SIDE BETTING
    winAmount: {
      get () { return this.$store.state.sidebar_winresult[this.table.tableNumber] },
      set (v) { this.$store.state.sidebar_winresult[this.table.tableNumber] = v }
    },
  },
  methods: {
    getName: function (val) {
      // Fix for sidebar in tiger because when translated to chinese the Tie is also showing on Tiger
      let content = val
      if (this.$store.state.locale !== 'cn') {
        if (val === 'TG') {
          content = 'T'
        }
      }
      return content
    },
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    enterGame: function (table, index) {
      let _s = this
      let $state = _s.$store.state
      let confirmed = $state.isConfirm
      let checkIfHasBet = localStorage.getItem('_bet_' + _s.tableIndex)
      $state.progscreen = 0
      let tableInfo = {
        data: table,
        tableid: index,
        isStreamer: false
      }

      _s.clickEff()

      if (!confirmed && !checkIfHasBet) {
        _s.$store.dispatch('ENTER_TABLE', tableInfo)
      } else {
        _s.$store.state.message = _s.tt('You can\'t exit with confirmed bets')
      }
    },
    notification: function (message) {
      // let value = true
      this._NotifyUser(message, 'info')
      // this.$store.commit('SET_USER_NOTIFICATION', {value, message})
    },
    toggleTile: function () {
      let _s = this
      _s.$data.tile = true
      _s.$data.list = false
    },
    toggleList: function () {
      let _s = this
      _s.$data.tile = false
      _s.$data.list = true
    },
    loadCardRoad: function () {
      let _s = this
      let config = {}
      let roadType
      // Validators
      if (!_s.table.tableNumber) return

      // Pre-setting variables
      // Moneywheel Config
      if (_s.table.code === 'moneywheel') {
        config = { beadRoad: { row: 5, col: 8 }, statistics: { beadRoadDemoGraph: true } }
        roadType = 'beadRoad'
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
        tableNumber: _s.table.tableNumber,
        shoeHand: _s.table.shoeGame,
        gameName: _s.table.code
      }).then((res) => {
        // console.log(res)
        _s.statistic = _.isUndefined(res.statistic.demographic) ? {} : res.statistic.demographic[roadType]
        _s.roadData[roadType] = flatMatrix(res[roadType].canvass, config[roadType].col)
        _s.roadConfig[roadType].col = config[roadType].col
      })
    },

    /**
     * Add Chips on side bet
     * @param section
     * @private
     */
    _addChips: _.debounce(function (section) {
      let _s = this
      if (_s.tableInfo.status !== 'betting' || _s.isSidebarBusy) return 0
      // Activate only when not on lobby
      if (!_s.isLobby) {
        _s.sideBetPrompt = _s.addChips(section, {}, false, _s.sideBetTable[_s.tableInfo.code].section, 'label__sbet', false, true).status
      }
    }, COOLDOWN),

    /**
     * Clear chips on side bet
     * @private
     * @param isReset
     * @param sectionCode
     */
    _clearChips: function (isReset = false, sectionCode = '') {
      let _s = this
      // Validators
      let hasBets = 0,
        totalMount = 0,
        sections = sectionCode ? [_s.sideBetTable[_s.tableInfo.code].section[sectionCode]] : _s.sideBetTable[_s.tableInfo.code].section

      _.forEach(sections, (sec) => {
        totalMount = 0
        if (isReset) {
          _.forEachRight(sec.bets, (bet) => { _s.projectedBalance -= parseFloat(bet.chipValue) })
            // Empty Bets
            sec.bets = []
        } else {
          if (sec.bets.length) hasBets++
          // Loop thru bets and remove unconfirmed bets
          _.forEachRight(sec.bets, (bet, betKey) => {
            // Look for unconfirmed bets
            if (!bet.isConfirmed) {
              sec.bets.splice(betKey, 1)
              _s.projectedBalance -= parseFloat(bet.chipValue)
            } else {
              totalMount += parseFloat(bet.chipValue)
            }
          })
        }

        // Set staged display total per bet place
        sec.sumOfStagedChips = totalMount
      })

      // If no bets upon click cancel close betting area
      if (!hasBets) { _s.tableInfo.isSideBetting = false }
    },

    /**
     * Confirm chips
     * @private
     */
    _confirmChips: _.debounce(function () {
      let _s = this
      let finalBet = [], allChips = []
      let sections, allIndx
      // Validators
      if (_s.tableInfo.status !== 'betting') return 0
      // Pre-setting variables
      sections = _s.sideBetTable[_s.tableInfo.code].section
      _s.isSidebarBusy = true
      // Loop to find unconfirmed bet
      _.forEach(sections, (sec, secKey) => {
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
          if (bet.isConfirmed) { return }

          if (bet.betSection === "super_six") { _s.betHasSuperSix = true }
          // Find Index of same chip bet section
          let index = _.findIndex(finalBet, function (o) { return o.index === bet.betSection })
          if (index > -1) {
            finalBet[index].index = secKey
            finalBet[index].chipValue += parseFloat(bet.chipValue)
          } else {
            finalBet.push({
              index: bet.betSection,
              chipValue: parseFloat(bet.chipValue)
            })
          }
        })
      })
      // Dispatch request to API
      _s.$store.dispatch('CONFIRM_BETTINGS', {
        bettings: finalBet,
        gameset: _s.tableInfo.gameSet,
        tableid: _s.tableInfo.id,
        superSix: _s.betHasSuperSix,
        tableNumber: _s.tableInfo.tableNumber,
        isSideBet: true,
      }).then((res) => {
        // Set all unconfirmed to confirmed
        _.forEach(sections, (sec) => {
          _.forEach(sec.bets, (bet) => {
            if (bet.isConfirmed) { return }
            bet.isConfirmed = true
            _s.projectedBalance -= parseFloat(bet.chipValue)
          })
        })
        // Set confirm flag to true
        _s.hasConfirm = true
        // Add tableNumber to the list in-connection with sidebar expanding
        _s.$store.state.sideBetConfirmBets.push(_s.tableInfo.tableNumber)
        _s.sideBetPrompt = 'Bet Successful'

        // Add current confirm bet to server cache in-case of refresh of page
        _s.$store.dispatch('LTHB_API', {
          method: 'SET',
          tableNumber:_s.tableInfo.tableNumber,
          gameSet: _s.tableInfo.gameSet,
          shoeGame: _s.tableInfo.shoeGame,
          sections: allChips
        })
        _s.isSidebarBusy = false
      }, (err) => {
        _s.isSidebarBusy = false
        console.log(err)
      })
    }, COOLDOWN),
    rTimer: function () {
      setTimeout(function () {
        let _s = this
        _s.rshowWinnings = true
        // console.log('default ***', _s.rshowWinnings)
      }, 700)
    },
    changeRoulette: function () {
      this.rshowWinnings = false
    }
  },
  watch: {
    'tableInfo.status': function (n) {
      let _s = this
      let confTable = _s.$store.state.sideBetConfirmBets

      switch (n) {
        case 'betting':
          _s.loadCardRoad()
          _s._clearChips(true)
          _s.showWinnings = false
          _s.rshowWinnings = false
          _s.superSix = false
          _s.betHasSuperSix = false
          // console.log('betting ***', _s.rshowWinnings)
          if (n) {
            if (_s.hasConfirm) {
              _.forEachRight(confTable, (v, k) => {
                if (v === _s.tableInfo.tableNumber) {
                  confTable.splice(k, 1)
                }
              })
            }
            _s.hasConfirm = false
          }
          this.winAmount = 0
          break
        case 'dealing':
          _s._clearChips()
          break
        case 'default':
          setTimeout(function () {
            _s.showWinnings = true
          }, 500)
          setTimeout(function () {
            _s.rshowWinnings = true
          }, 500)
          break;
      }
    },
    isLobby: function (ss) {
      if (ss) {
        if (this.betHasSuperSix) {
          this.superSix = true
        }
      }
    },
    tableIndex: function () {
      this._clearChips()
    },
    sideBetPrompt: function (n) {
      if (n) {
        setTimeout(() => {
          this.sideBetPrompt = ''
        }, 2000)
      }
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
</script>

<style lang="scss">
.marquee-animate {
  @include position(absolute,0,0,0,0);
  @include rem((
    margin-top: 8px,
    margin-left: 30px,
    height: 20px,
    width: 135px
  )); 
  overflow: hidden;
}

.v-btn__content {
  font-size: 10px !important;
}

.ellipsis {
  font-size: 30px;
}

.ellipsis:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4,end) 900ms infinite;
  animation: ellipsis steps(4,end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

.btn__success_gradient {
  background-image: linear-gradient(to left, #008fa4 0%,#00bf51 100%);
}

.btn__info_gradient {
  background-image: linear-gradient(to left, #4185ea 0%,#27a8e2 100%);
}

.btn__error_gradient {
  background-image: linear-gradient(to left, #ec3b43 0%,#f15b61 100%)
}

.disable__superSixclick {
  pointer-events: none
}
</style>
