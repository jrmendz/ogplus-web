<!--
  _________  __            __
 /   _____/_/  |_ _____  _/  |_  ______
 \_____  \ \   __\\__  \ \   __\/  ___/
 /        \ |  |   / __ \_|  |  \___ \
/_______  / |__|  (____  /|__| /____  >
        \/             \/           \/
  Programmer: Alvin Valdez
  Description:
    * RoadMap Statistics (Bead per bet place counter)
-->

<template>
  <div>
    <!-- Baccarat -->
    <template v-if="$props.gameName === 'baccarat'">
      <ul  class="table__score" :class="[blackTheme ? '--is-black' : '']">
        <li>
          <span class="--is-player">{{ tt('P') }}</span>
          <span>{{beadCounter.beadRoad.blue}}</span>
        </li>
        <li>
          <span class="--is-banker">{{ tt('B') }}</span>
          <span>{{beadCounter.beadRoad.red}}</span>
        </li>
        <li>
          <span class="--is-tie">{{ tt('T') }}</span>
          <span>{{beadCounter.beadRoad.green}}</span>
        </li>
        <li>
          <span class="--is-player-pair">{{ tt('PP') }}</span>
          <span>{{beadCounter.beadRoad.blue_pair}}</span>
        </li>
        <li>
          <span class="--is-banker-pair">{{ tt('BP') }}</span>
          <span>{{beadCounter.beadRoad.red_pair}}</span>
        </li>
        <li>
          <span class="">{{ tt('S6') }}</span>
          <span>{{beadCounter.beadRoad.s6}}</span>
        </li>

        <li v-if="beadCounter">
          <span class="--is-result">{{ ('#') }}</span>
          <span>{{ _.sum([beadCounter.beadRoad.blue, beadCounter.beadRoad.red, beadCounter.beadRoad.green]) }}</span>
        </li>
      </ul>
    </template>

    <!-- Dragon-Tiger -->
    <template v-else-if="$props.gameName === 'dragontiger'">
      <ul  class="table__score" :class="[blackTheme ? '--is-black' : '']">
        <li>
          <span class="--is-player">{{ tt('D') }}</span>
          <span>{{beadCounter.beadRoad.blue}}</span>
        </li>
        <li v-if="['en', 'jp', 'th', 'ko', 'vn', 'id'].indexOf($store.state.locale) > -1">
          <span class="--is-banker">{{ tt('T') }}</span>
          <span>{{beadCounter.beadRoad.red}}</span>
        </li>
        <li v-if="$store.state.locale === 'cn'">
          <span class="--is-banker">{{ tt('TG') }}</span>
          <span>{{beadCounter.beadRoad.red}}</span>
        </li>

        <li>
          <span class="--is-tie">{{ tt('T') }}</span>
          <span>{{beadCounter.beadRoad.green}}</span>
        </li>

        <li v-if="beadCounter">
          <span class="--is-result">{{ ('#') }}</span>
          <span>{{ _.sum([beadCounter.beadRoad.blue, beadCounter.beadRoad.red, beadCounter.beadRoad.green]) }}</span>
        </li>
      </ul>
    </template>

    <!-- Roulette -->
    <template v-else-if="$props.gameName === 'roulette'">
      <ul  class="table__score" :class="[blackTheme ? '--is-black' : '']">
        <li v-for="(t, _t) in rltTabs" :key="_t" :class="{'--is-active': activeRltTab === t.code}" @click="rouletteTabClick(t.code)">{{ tt(t.name) }}</li>
      </ul>

      <v-scale-transition origin="center center">
        <ul v-if="activeRltTab === 'hotCold'" style="color: white" class="roulette__hot-and-cold">
          <li>
            <div>
              <div class="svg-holder">
                <svgicon name="hot" height="24" scale="1" original></svgicon>
              </div>
              {{ tt('Hot') }}
            </div>
            <div v-for="hot in rouletteCelcius.hot" :key="hot.id" :data-numbers="hot.id"></div>
          </li>
          <li>
            <div>
              <div class="svg-holder">
                <svgicon name="cold" height="24" scale="1" original></svgicon>
              </div>
              {{ tt('Cold') }}
            </div>
            <div v-for="cold in rouletteCelcius.cold" :key="cold.id" :data-numbers="cold.id"></div>
          </li>
        </ul>
      </v-scale-transition>
    </template>
  </div>
</template>

<script>
  /**
   * ====> IMPORTANT: Please use camelCase when declaring variables <====
   */
  export default {
    name: "Container001",
    props: {
      gameName: String
    },
    data() {
      return {
        activeRltTab: 'history',
        rltClass: 'history',
        rltTabs: [
          {name: 'HISTORY', code: 'history'},
          {name: 'ODD/EVEN', code: 'oddEven'},
          {name: 'HIGH/LOW', code: 'highLow'},
          {name: 'HOT/COLD', code: 'hotCold'},
        ],
        results: [
          {id: 'P', class: '--is-player'},
          {id: 'B', class: '--is-banker'},
          {id: 'T', class: '--is-tie'},
          {id: 'PP', class: '--is-player-pair'},
          {id: 'BP', class: '--is-banker-pair'},
          {id: '#', value: '0', class: '--is-result'}
        ]
      }
    },
    computed: {
      rouletteConfig: {
        get() {
          return this.$store.state.roulette
        },
        set(v) {
          this.$store.state.roulette = v
        }
      },
      rouletteCelcius: {
        get() {
          return this.$store.state.betTable.roulette.celsius
        }
      },
      beadCounter: {
        get() {
          return this.$store.state.RoadInGame.statistic.demographic
        }
      },
      blackTheme: {
        get() {
          return this.$store.state.blackRoadMapSelected
        }
      }
    },
    methods: {
      rouletteTabClick(tab) {
        this.activeRltTab = tab;

        if (tab !== 'hotCold') {
          this.rouletteConfig.road.class = tab === 'oddEven' ? '--odd-even' : tab === 'highLow' ? '--high-low' : ''
        }
      }
    }
  }
</script>

<style lang="scss">
.--is-roulette {
  .table__score {
    transform: translateY(-40px) !important;
    z-index: 1;
    opacity: 1 !important;
  }
}

.table__score {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: $base-color-inverted;
  opacity: 1;
  transition: 2s cubic-bezier(.56,.24,.18,.85) opacity, .3s ease-in-out background-color, transform 2s cubic-bezier(.56,.24,.18,.85);
  transform: translateY(-40px);

  &.--is-black {
    background-color: $base-color;

    li {
      color: $base-color-inverted;
    }
  }

  li {
    display: inline-flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 1 0 0;
    @include rem((
      padding: 10px
    ));

    span {
      @include rem((
        font-size: 16px
      ));

      &:first-child {
        font-weight: 500;
      }

      &.--is-player,
      &.--is-player-pair {
        color: $dark-blue
      }

      &.--is-banker,
      &.--is-banker-pair {
        color: $dark-red
      }

      &.--is-tie {
        color: $dark-green
      }
    }
  }
}
</style>
