<template>
  <li class="left__drawer" :class="getBettingtable === 'moneywheel' ? '--is-moneywheel' : ''">
    <div class="road__table">
      <!-- Bead Statistics -->
      <Container001 :gameName="_table.code"/>

      <RoadMapJS
        :class="getBettingtable === 'moneywheel' ? '--is-moneywheel' : ''"
        :road="['beadRoad']"
        :game="_table.code"
        :status="_table.status"
        :data="{ beadRoad: flatMatrix(RoadInGame.beadRoad.canvass, 17)}"
        :config="{ beadRoad: { col: 17, class: rouletteConfig.road.class } }"
      />
    </div>

    <!-- SWITCH FOR TESTING -->
    <!-- <SqueezeComponent :thirdCP ='thirdCardP' :left="true" v-if="initialSqueeze && (checkHighest(_getUserID) === true)"/> -->
    <!-- <SqueezeComponent :left="true"/> -->
    <!-- <template  v-if="getBettingtable !== 'moneywheel'">
      <ul class="drawer__header">
        <li>
          <ChatComponent />
        </li>
      </ul>
      <ul class="drawer__body">

        <li>
          <ul class="list__ui">
            <li :title="[ tt('Gift') ]" class="--is-icon" @click="true" :class="$store.state.giftModal ? '--is-active' : ''">
              <div class="svg-holder">
                <svgicon name="gift" height="24" scale="1.5" color="url(#gradient)"></svgicon>
              </div>
            </li>
            <li :title="[ tt('Ranking') ]" class="--is-icon --has-border-top" @click="toggleRankModal" :class="$store.state.rankModal ? '--is-active' : ''">
              <div class="svg-holder">
                <svgicon name="rank" height="24" scale="1.5" color="url(#gradient)"></svgicon>
              </div>
            </li>
            <li :title="[ tt('Friends list') ]" class="--is-icon --has-border-top" @click="toggleSocialModal" :class="$store.state.socialModal ? '--is-active': ''">
              <div class="svg-holder">
                <svgicon name="social" height="24" scale="1.5" color="url(#gradient)"></svgicon>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </template> -->
    <!-- <ul class="drawer__body --is-moneywheel"  v-if="getBettingtable === 'moneywheel'">
      <li>
        <ChatComponent />
      </li>
      <li>
        <ul class="list__ui">
          <li :title="[ tt('Gift') ]" class="--is-icon" @click="true" :class="$store.state.giftModal ? '--is-active' : ''">
            <div class="svg-holder">
              <svgicon name="gift" height="24" scale="1.5" color="url(#gradient)"></svgicon>
            </div>
          </li>
          <li :title="[ tt('Ranking') ]" class="--is-icon --has-border-top" @click="toggleRankModal" :class="$store.state.rankModal ? '--is-active' : ''">
            <div class="svg-holder">
              <svgicon name="rank" height="24" scale="1.5" color="url(#gradient)"></svgicon>
            </div>
          </li>
          <li :title="[ tt('Friends list') ]" class="--is-icon --has-border-top" @click="toggleSocialModal" :class="$store.state.socialModal ? '--is-active': ''">
            <div class="svg-holder">
              <svgicon name="social" height="24" scale="1.5" color="url(#gradient)"></svgicon>
            </div>
          </li>
        </ul>
      </li>
    </ul> -->
    <!-- <v-divider></v-divider>
    <ul class="drawer__footer" >
      <li>
        <ul class="current__balance">
          <li>
            <span>{{ tt('Balance') }}:</span>
            <animated-number class="--is-number" :value="balance" :formatValue="formatToPrice"/>
          </li>
          <li>
            <span>{{ tt('Total Bet') }}:</span>
            <animated-number class="--is-number" :value="totalBetsToday" :formatValue="formatToPrice"/>
          </li>
        </ul>
      </li>
      <li class="--is-column" v-if="getBettingtable !== 'moneywheel'">
        <ul class="legends">
          <li v-if="currentTable.code === 'baccarat'">{{ tt('P') }}</li>
          <li v-else-if="currentTable.code === 'dragontiger'">{{ tt('D') }}</li>
          <li>
            <ul class="list__ui --is-player cursor">
              <li><span :class="[getPredictionClass('bigEye', 'player_dragon')]"></span></li>
              <li><span :class="[getPredictionClass('smallRoad', 'player_dragon')]"></span></li>
              <li><span :class="[getPredictionClass('cochRoach', 'player_dragon')]"></span></li>
            </ul>
          </li>
        </ul>
        <ul class="legends">
          <li v-if="currentTable.code === 'baccarat'">{{ tt('B') }}</li>
          <li v-else-if="currentTable.code === 'dragontiger'">{{ tt('T') }}</li>
          <li>
            <ul class="list__ui --is-banker cursor">
              <li><span :class="[getPredictionClass('bigEye', 'banker_tiger')]"></span></li>
              <li><span :class="[getPredictionClass('smallRoad', 'banker_tiger')]"></span></li>
              <li><span :class="[getPredictionClass('cochRoach', 'banker_tiger')]"></span></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul> -->
  </li>
</template>

<script>
import RoadMapJS from '@/components/road/RoadmapJS'
import ChatComponent from '@/components/video/ChatComponent'
import ResultComponent from '@/components/video/ResultComponent'

import Settings from '@/library/Settings.js'
import Container001 from '@/components/video/container/Container001'

export default {
  components: {
    RoadMapJS,
    ResultComponent,
    ChatComponent,
    Container001
  },
  mixins: [ Settings ],
  data () {
    return {
      initialSqueeze: false,
      thirdCardP: false
    }
  },
  methods: {
    checkHighest (val) {
      let _s = this
      switch (_s.getBettingtable) {
        case 'baccarat':
          if (val === _s.highestPlayerBidder.userId || val === _s.highestBankerBidder.userId) {
            return true
          }
          break
        case 'dragontiger':
          if (val === _s.highestDragonBidder.userId || val === _s.highestTigerBidder.userId) {
            return true
          }
          break
      }
    },
    formatToPrice (value) {
      // return value.toFixed(0)
      return this.$options.filters.toMoney(value)
    },
    flatMatrix: function (matrix = [], columnLength = 0) {
      let finalArray = [];

      if (!matrix.length || !columnLength) return []
      // Flatten matrix by column
      for (let col = 0; col < columnLength; col++) {
        finalArray.push(matrix.map(function(value) { return value[col] }))
      }
      return _.flatMap(finalArray);
    }
  },
  computed: {
    rouletteConfig: {
      get() { return this.$store.state.roulette }
    },
    RoadInGame: {
      get () {
        return this.$store.state.RoadInGame
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
    currentTable: {
      get () {
        return this.$store.state.currentTableInfo
      }
    },
    getStatus: {
      get () {
        return this.$store.state.currentTableInfo.status
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
    currentTableIndex: {
      get () {
        return this.$store.state.currentTableIndex || {}
      }
    },
    prediction: {
      get () {
        let _s = this
        return _s.currentTable.roadMaps.prediction
      }
    },
    totalBetsToday: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.totalBetsToday ? _s.$store.state.userinfo.totalBetsToday : 0
      }
    },
    shoeGame: {
      get () {
        let _s = this
        return _s.currentTable.shoeGame
      }
    },
    highestPlayerBidder: {
      get () {
        return this._table.highestPlayerBidder
      }
    },
    highestBankerBidder: {
      get () {
        return this._table.highestBankerBidder
      }
    },
    highestDragonBidder: {
      get () {
        return this._table.highestDragonBidder
      }
    },
    highestTigerBidder: {
      get () {
        return this._table.highestTigerBidder
      }
    },
    _getUserID: {
      get () {
        return this.$store.state.userinfo.id
      }
    },
    _getCurrentTime: {
      get () {
        return this.$store.state.currentTableInfo.game.timer
      }
    },
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
    }
  },
  watch: {
    _getCurrentTime: function () {
      let _s = this
      if (_s.initialSqueeze && _s._getCurrentTime === 0) {
        _s.initialSqueeze = false
      }
    },
    totalBetsToday: function () {
      // console.log('TOTALBETS!!!!!!!!!', this.$store.state.userinfo)
    },
    getStatus: function () {
      let _s = this
      switch (this.$store.state.currentTableInfo.status) {
        case 'squeeze_start' :
          break
        case 'squeeze_end' :
          break
        case 'squeezep_start' :
        case 'squeezedt_start' :
          _s.thirdCardP = true
          break
        case 'squeezep_end' :
        case 'squeezedt_end' :
          break
        case 'squeeze_time' :
          _s.thirdCardP = false
          _s.initialSqueeze = true
          break
        case 'squeezep_time' :
        case 'squeezeb_time' :
        case 'squeezedt_time' :
          _s.initialSqueeze = true
          break
      }
    },
    shoeGame: async function (newval, oldval) {
      let _s = this
      await _s.$store.dispatch('GET_ALL_BETS', _s.currentTable)
    }
  },
  mounted: async function () {
    let _s = this
    await _s.$store.dispatch('GET_ALL_BETS', _s.currentTable)
    // console.log('taeetaeats', _s.$store.state.currentTableInfo.totalResult)
  }
}
</script>

<style lang="scss">
  .--is-result {
    color: $gold-text
  }

  .road__table {

    .roulette__hot-and-cold {
      @include position(absolute, $index: 2);
      background-color: $base-color;
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 100%;

      li {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        justify-content: center;

        &:first-child {
          @include rem((
            border-bottom: 1px solid $border-color
          ))
        }

        > div {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          @include box(40px);
          @include rem((
            margin-right: 10px,
            border: 2px solid #b4a689,
            border-radius: 2px
          ));

          &:first-child {
            @include rem((
              width: 100px,
              font-size: 18px
            ));
            border: 0;
            border-radius: 0;
          }

          &[data-numbers="0"] {
            background-color: #006c00;

            &:before {
              display: block;
              content: '0';
              color: $base-color-inverted;
            }
          }

          @each $odd in $odds {

            &[data-numbers="#{$odd}"] {
              background-color: #7a0204;

              &:before {
                display: block;
                content: '#{$odd}';
              }
            }
          }

          @each $even in $evens {

            &[data-numbers="#{$even}"] {
              background-color: $base-color;

              &:before {
                display: block;
                content: '#{$even}';
              }
            }
          }
        }
      }
    }
  }
</style>
