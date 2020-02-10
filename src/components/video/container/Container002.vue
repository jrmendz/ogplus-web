<!--
  _________  ________           __________                     .___.__          __
 /   _____/ /  _____/           \______   \_______   ____    __| _/|__|  ____ _/  |_
 \_____  \ /   __  \    ______   |     ___/\_  __ \_/ __ \  / __ | |  |_/ ___\\   __\
 /        \\  |__\  \  /_____/   |    |     |  | \/\  ___/ / /_/ | |  |\  \___ |  |
/_______  / \_____  /            |____|     |__|    \___  >\____ | |__| \___  >|__|
        \/        \/                                    \/      \/          \/
  Programmer: Alvin Valdez
  Description:
    * Super-Six Toggle
    * Prediction Indicator
-->

<template>
  <ul class="table__setter"
      v-if="tableInfo.code !== 'moneywheel' && tableInfo.code !== 'roulette' && predict"
      :class="[tableInfo.code !== 'dragontiger' ? '' : '--is-dragontiger', $store.state.blackRoadMapSelected ? '--is-black' : '', $store.state.sideBetConfirmBets.length ? '--has-sidebet' : '']">
    <li>
      <ul class="prediction" @click="showPrediction('red')">
        <li class="--is-banker" v-if="tableInfo.code === 'baccarat'">{{ tt('B') }}</li>
        <li class="--is-banker" v-else-if="tableInfo.code === 'dragontiger' && _.includes(['en','jp','ko','th','vn','id'], language)">{{ tt('T') }}</li>
        <li class="--is-banker" v-else-if="tableInfo.code === 'dragontiger' && language === 'cn'">{{ tt('TG') }}</li>
        <li>
          <ul class="list__ui --is-banker cursor">
            <li><span :class="predict.red.bigEyeRoad"></span></li>
            <li><span :class="predict.red.smallRoad"></span></li>
            <li><span :class="predict.red.cockroachRoad"></span></li>
          </ul>
        </li>
      </ul>

      <ul class="prediction" @click="showPrediction('blue')">
        <li class="--is-player" >{{ tt(tableInfo.code === 'baccarat' ? 'P' : 'D') }}</li>
        <li>
          <ul class="list__ui --is-player cursor">
            <li><span :class="predict.blue.bigEyeRoad"></span></li>
            <li><span :class="predict.blue.smallRoad"></span></li>
            <li><span :class="predict.blue.cockroachRoad"></span></li>
          </ul>
        </li>
      </ul>

    </li>
    <li>
      <label for="super6" class="super__switch">
        <input type="checkbox" id="super6" v-model="tableInfo.isSuperSix" :disabled="tableInfo.superSixDisabled">
        <div class="slider round" :data-text="[ tt('Super 6') ]" :data-on="[ tt('On') ]" :data-off="[ tt('Off') ]"></div>
      </label>
    </li>
  </ul>
</template>

<script>
  /**
   * ====> IMPORTANT: Please use camelCase when declaring variables <====
   */
  export default {
    name: "Container002",
    props: {
      tableNumber: String
    },
    computed: {
      language: {
        get() {
          return this.$store.state.locale
        }
      },
      tableInfo: {
        get() {
          return this.$store.state.tablelist[this.$props.tableNumber]
        }
      },
      roadInGame: {
        get() {
          return this.$store.state.RoadInGame
        }
      },
      predict: {
        get() {
          return this.$store.state.RoadInGame.statistic.predict
        }
      },
      soundFx: {
        get() {
          return this.$store.state.soundFxSwitch
        }
      }
    },
    methods: {
      /**
       * Sound Effects
       */
      clickEff: function () {
        let _s = this
        if (_s.soundFx) {
          _s.$store.state.audiosprite['spotFX'].play('click')
        }
      },
      /**
       * Show Prediction
       * @param color
       */
      showPrediction: function (color = 'blue') {
        let _s = this
        _s.clickEff()
        let group = _s.roadInGame.statistic.predict[color]

        if (!_s.$store.state.predictOpen) {
          _s.$store.state.predictOpen = true

          _.forEach(_.omit(_s.roadInGame, ['statistic']), (val, key) => {
            let basedOnColor = ['beadRoad', 'bigRoad'].indexOf(key) > -1
            // If beadRoad & bigRoad look for parameter color
            plotPredict(_.isEqual(colorConv(basedOnColor ? color : group[key]), colorConv(val.lastResult.class)), key, val.lastResult)
          })

          // Cooldown
          setTimeout(() => {
            _s.$store.state.predictOpen = false
          }, 3000)
        }

        /**
         *
         * @param theClass
         * @returns {string}
         */
        function colorConv(theClass) {
          return theClass.includes('blue') ? 'b' : 'r'
        }

        /**
         *
         * @param isMatched
         * @param road
         * @param lastResult
         */
        function plotPredict(isMatched, road, lastResult) {
          let roadMap = _s.roadInGame[road].canvass
          let matchFound = false
          let mapper = {
            class: {
              blue: 'blue-dot --is-blue blink',
              red: 'red-dot --is-red blink'
            },
            char: {
              baccarat: {
                blue: 'P',
                red: 'B'
              },
              dragontiger: {
                blue: 'D',
                red: 'T'
              }
            }
          }

          for (let row = 0; row < roadMap.length && !matchFound; row++) {
            for (let col = 0; col < roadMap[row].length && !matchFound; col++) {
              let column = roadMap[row][col]
              // Bead and Big Road condition
              if (lastResult['isCellSingle']) {
                if (column['isPredict']) {
                  // Show and hide prediction
                  if (road === 'beadRoad') {
                    column.class = mapper['class'][color]
                    column.char = mapper['char'][_s.tableInfo.code][color]
                    column.isPredictShow = true
                    setTimeout(() => {
                      column.isPredictShow = false
                    }, 3000)
                    matchFound = true
                    break
                  } else {
                    if (column.ref === (isMatched ? 'same' : 'diff')) {
                      column.isPredictShow = true
                      column.class += ' blink'
                      setTimeout(() => {
                        column.isPredictShow = false
                      }, 3000)
                      matchFound = true
                      break
                    }
                  }
                }
                // Otherwise
              } else {
                for (let idx = 0; idx < column.length; idx++) {
                  let index = column[idx]
                  if (index['isPredict']) {
                    if (index.ref === (isMatched ? 'same' : 'diff')) {
                      index.isPredictShow = true
                      index.class += ' blink'
                      setTimeout(() => {
                        index.isPredictShow = false
                      }, 3000)
                      matchFound = true
                      break
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
.table__setter {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  // @include rem((
  //   margin-top: -44px,
  //   // border-top-right-radius: 10px
  // ));
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

  > li {
    display: inline-flex;
    flex: 1 0 50%;
    justify-content: center;
    @include rem((
      padding: 7px 10px
    ));
  }

  &.--is-dragontiger {

    > li {
      @include rem((
        padding: 10px 10px,
        height: 44px
      ));

      &:last-child {
        display: none;
      }
    }
  }

  &.--has-sidebet {

    > li {

      &:first-child {
        flex-basis: 0;
      }

      &:last-child {
        justify-content: flex-start;
      }
    }
  }
}
</style>
