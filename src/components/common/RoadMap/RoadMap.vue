<template>
  <div class="road__wrapper">
    <ul class="road" :class="[_.includes(['MONEYWHEEL'], _.toUpper($props.gameCode)) ? 'is-moneywheel' : '']">
      <template v-if="_.has($props.data, 'beadRoad')">
        <!-- Baccarat & DT -->
        <li v-if="_.includes(['BACCARAT', 'DRAGONTIGER'], _.toUpper($props.gameCode))"
            :data-row="beadRoad.columns">
          <ul class="table__road" :data-text="'Bead Road'">
            <!-- START: BEAD LOOP -->
            <li v-for="(n, i) in _gbl_roadParser({ type: 'beadRoad', data: _.get($props.data, 'beadRoad', []), rows: _.get(beadRoad, 'rows', 6), columns: _.get(beadRoad, 'columns', 12)})" :key="i">
              <span v-if="!_.isEmpty(n)"
                  :class="[
                      n.result === 0 ? 'red-dot' : n.result === 1 ? 'blue-dot' : n.result === 2 ? 'green-dot' : '',
                      n.tie ? 'is-tie' : '',
                      n.super_six ? 'is-supersix' : '',
                      _.get(n, 'pair[0]', 0) ? 'is-pp' : '',
                      _.get(n, 'pair[1]', 0) ? 'is-bp' : ''
                    ]">
                <i>{{ n.super_six ? 6 : n.result === 0 ? _.isEqual(_.toUpper($props.gameCode), 'BACCARAT') ? 'P' : 'D' : n.result === 1 ? _.isEqual(_.toUpper($props.gameCode), 'BACCARAT') ? 'B' : 'T' : n.result === 2 ? 'T' : '' }}</i>
                </span>
            </li>
            <!-- END: BEAD LOOP -->
          </ul>
        </li>
        <!-- Money-wheel -->
        <li v-else-if="_.includes(['MONEYWHEEL'], _.toUpper($props.gameCode))"
            :data-row="beadRoad.columns" :data-col="beadRoad.rows * beadRoad.columns" >
          <ul class="table__road" :data-text="'Bead Road'">
            <!-- START: BEAD LOOP -->

            <li v-for="(n, i) in _gbl_roadParser({ type: 'beadRoad', data: _.get($props.data, 'beadRoad', []), rows: _.get(beadRoad, 'rows', 6), columns: _.get(beadRoad, 'columns', 12)})" :key="i">
              <span v-if="!_.isEmpty(n)" :class="true">
                <i>{{ n }}</i>
              </span>
            </li>
            <!-- END: BEAD LOOP -->
          </ul>
        </li>
        <!-- Roulette -->
        <li v-else :data-row="beadRoad.columns" :data-col="beadRoad.rows * beadRoad.columns">
          <ul class="table__road" :data-text="'Bead Road'">
            <!-- START: BEAD LOOP -->
            <li v-for="(n, i) in _gbl_roadParser({ type: 'beadRoad', data: _.get($props.data, 'beadRoad', []), rows: _.get(beadRoad, 'rows', 6), columns: _.get(beadRoad, 'columns', 12)})" :key="i">
              <span v-if="!_.isObject(n)" :data-numbers="n">
                <i>{{ n }}</i>
              </span>
            </li>
            <!-- END: BEAD LOOP -->
          </ul>
        </li>
      </template>

      <template v-if="_.difference(['bigRoad', 'bigEyeRoad', 'smallRoad', 'roachRoad'], _.keys($props.data)).length < 4 && _.includes(['BACCARAT', 'DRAGONTIGER'], _.toUpper($props.gameCode))" v-cloak>
        <li :data-row="bigRoad.columns">
          <ul class="table__road big__road">
            <li v-for="(n, i) in _gbl_roadParser({ type: 'bigRoad', data: _.get($props.data, 'bigRoad', []), rows: _.get(bigRoad, 'rows', 6), columns: _.get(bigRoad, 'columns', 24)})" :key="i">
              <span v-if= "!_.isEmpty(n)"
                    :class="[
                        'is-outline',
                        n.result === 0 ? 'red-dot' : 'blue-dot',
                        n.tie ? 'is-tie' : '',
                        _.get(n, 'pair[0]', 0) ? 'is-pp' : '',
                        _.get(n, 'pair[1]', 0) ? 'is-bp' : ''
                      ]">
                <i>{{ n.tie ? n.tie : '' }}</i>
              </span>
            </li>
          </ul>
          <ul class="table__road big__eye">
            <li v-for="(n, i) in _gbl_roadParser({ type: 'bigEyeRoad', data: _.get($props.data, 'bigEyeRoad', []), rows: _.get(bigEyeRoad, 'rows', 3), columns: _.get(bigEyeRoad, 'columns', 24)})" :key="i">
              <div class="big__eye__content">
                <span v-for="(_n, _i) in n" :key="_i"
                      :class="['is-outline','isOutLine',!_.isNull(_n) ? _n === 1 ? 'red-dot' : 'blue-dot' : '']">
                </span>
              </div>
            </li>
          </ul>
          <ul class="table__road small__eye">
            <li v-for="(n, i) in _gbl_roadParser({ type: 'smallRoad', data: _.get($props.data, 'smallRoad', []), rows: _.get(smallRoad, 'rows', 3), columns: _.get(smallRoad, 'columns', 12)})" :key="i">
              <div class="big__eye__content">
                <span v-for="(_n, _i) in n" :key="_i"
                      :class="[!_.isNull(_n) ? _n === 1 ? 'red-dot' : 'blue-dot' : '']">
                </span>
              </div>
            </li>
          </ul>
          <ul class="table__road cockroach">
            <li v-for="(n, i) in _gbl_roadParser({ type: 'roachRoad', data:  _.get($props.data, 'roachRoad', []), rows: _.get(roachRoad, 'rows', 3), columns: _.get(roachRoad, 'columns', 12)})" :key="i">
              <div class="big__eye__content">
              <span v-for="(_n, _i) in n" :key="_i"
                    :class="[!_.isNull(_n) ? _n === 1 ? 'red-dot' : 'blue-dot' : '']"
                    class="is-slash">
              </span>
              </div>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "RoadMap",
    props: {
      gameCode: {
        type: String,
        required: true,
        default: ''
      },
      data: {
        type: Object,
        required: true,
        default: function () { return {} }
      }
    },

    mounted() {
      const config = this.$props.data.config;

      // Check if the configuration need over-ride
      if (!_.isEmpty(config)) {
        // Loop through configurations
        _.forEach(config, (road, type) => {
          if (!this[type]) return;
          _.assign(this[type], road);
        })
      }
    },

    data () {
      return {
        beadRoad: {
          data: [],
          rows: 6,
          columns: 12
        },
        bigRoad: {
          data: [],
          rows: 6,
          columns: 24
        },
        bigEyeRoad: {
          data: [],
          rows: 3,
          columns: 24
        },
        smallRoad: {
          data: [],
          rows: 3,
          columns: 12
        },
        roachRoad: {
          data: [],
          rows: 3,
          columns: 12
        }
      }
    }
  }
</script>

<style scoped>
/***
*    ██████╗ ███████╗███████╗██████╗     ███████╗███████╗██╗     ███████╗ ██████╗████████╗ ██████╗ ██████╗
*    ██╔══██╗██╔════╝██╔════╝██╔══██╗    ██╔════╝██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
*    ██║  ██║█████╗  █████╗  ██████╔╝    ███████╗█████╗  ██║     █████╗  ██║        ██║   ██║   ██║██████╔╝
*    ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝     ╚════██║██╔══╝  ██║     ██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
*    ██████╔╝███████╗███████╗██║         ███████║███████╗███████╗███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
*    ╚═════╝ ╚══════╝╚══════╝╚═╝         ╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
Intended for breaking hierarchy rules using ">>>" or "/deep/" see link below,
without changing any custom css in other components
https://vue-loader.vuejs.org/guide/scoped-css.html
*/
</style>

<style lang="scss" scoped>
@for $i from 1 through 160 {
$row: $i;
$col: $i;
$bead: $row / $row-count;
$width: $bead-road-size * $bead;

// data-row = the number of rows
  [data-row="#{$row}"] {
    width: $width;

    .table__road {
      width: $width;

      &.big__road,
      &.big__eye {
        width: $width / 2;
      }

      &.big__eye {

        li {
          width: ($width / $row) / 2;

          .big__eye__content {
            width: ($width / $row) / 2;
            height: round($big-road-size / $row);

            span {
              width: round(($big-road-size / $row) / 2 - 1);
              height: round(($big-road-size / $row) / 2 - 1);
            }
          }
        }
      }

      &.small__eye,
      &.cockroach {
        width: $width / 4;

        li {
          width: ($width / $row) / 2;

          .big__eye__content {
            width: ($width / $row) / 2;
            height: round($big-road-size / $row);

            span {
              width: round(($big-road-size / $row) / 2 - 1);
              height: round(($big-road-size / $row) / 2 - 1);
            }
          }
        }
      }
    }

    &:not(:first-child),
    &.only-big__road {
      width: $width / 2;
      box-sizing: content-box;
    }
  }

  // data-col = the number of total box
  [data-col="#{$col}"] {
  $divisible: 4;

    // row is for computing height in data-col value

    @if $col == 102 {
    $row: 12;
    $raw: $col * $row * 1px;
      height: round($raw / 11.3 * $multiplier);

      > .table__road {
        height: round($raw / 11.3 * $multiplier);
      }
    }

    @if $col == 80 {
    $row: 12;
    $raw: $col * $row * 1px;
      height: round($raw / 5.33 * $multiplier);

      > .table__road {
        height: round($raw / 5.33 * $multiplier);
      }
    }

    @if $col == 64 {
    $row: 10;
    $raw: $col * $row * 1px;
      height: round($raw / 4.45 * $multiplier);

      > .table__road {
        height: round($raw / 4.45 * $multiplier);
      }
    }

    @if $col == 60 {
    $row: 12;
    $raw: $col * $row * 1px;
      height: round($raw / $divisible * $multiplier);

      > .table__road {
        height: round($raw / $divisible * $multiplier);
      }
    }

    @if $col == 48 {
    $row: 12;
    $raw: $col * $row * 1px;
      height: round($raw / $divisible * $multiplier);

      > .table__road {
        height: round($raw / $divisible * $multiplier);
      }
    }

    @if $col == 40 {
    $row: 12;
    $raw: $col * $row * 1px;
      height: round($raw / 2.66 * $multiplier);

      > .table__road {
        height: round($raw / 2.66 * $multiplier);
      }
    }

    @if $col == 36 {
    $row: 12;
    $raw: $col * $row * 1px;
      height: round($raw / $divisible * $multiplier);

      > .table__road {
        height: round($raw / $divisible * $multiplier);
      }
    }
  }
}

.road {
  display: inline-flex;
  flex-wrap: wrap;
  flex-flow: row;
  padding: 0;
  margin: 0;
  list-style: none;
  // border: $border-size solid $border-color;
  box-sizing: content-box;

  > li {
    display: inline-flex;
    flex-wrap: wrap;
    width: 50%;
    &:not(:first-child) {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        z-index: 2;
        height: 100%;
        border-right: $border-size solid $border-color;
      }
    }
  }
}

.table__road {
  position: relative;
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  width: $bead-road-size;
  height: $bead-road-size;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  overflow: hidden;

  > li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: stretch;
    width: $bead-size;
    height: $bead-size;
    border: $border-size solid $border-color;
    box-sizing: border-box;
    border-top: 0;
    border-left: 0;
    list-style: none;
    font-size: $font-size;
      > span{
        height: 35px;
        width: 35px;
        >i{
          font-style:normal;
          line-height: 2;
        }
      }
  // for debbugging
  // top row
  // 		&:nth-child(#{$row-count}n + 1) {
  // 			 background: rgba(234,232,21,.5);
  // 		}

  // 		// left row
  // 		&:nth-child(-n + #{$row-count}) {
  // 			background: yellow;
  // 		}

  // 		// right row
  // 		&:nth-last-child(-n + #{$row-count}) {
  // 			background: blue;
  // 		}

  // 		// bottom row
  // 		&:nth-child(#{$row-count}n) {
  // 			background: green;
  // 		}
  }

  &.big__road {
  // get the bead-road-size by 2
  $size: $bead-road-size / 2;
    height: $size;

    &:before {
      content: '';
      position: absolute;
      bottom: 1px;
      z-index: 1;
      width: 100%;
      border-bottom: $border-size solid $border-color;
    }

    li {
      width: $size / $row-count;
      height: $size / $row-count;

      .red-dot,
      .blue-dot,
      .green-dot {
        width: round($size / $row-count - 3px);
        height: round($size / $row-count - 3px);
      }
    }
  }

  &.big__eye {
  // get the bead-road-size by 4
  $size: $bead-road-size / 4;
  $row: $row-count - 3;

    height: $size;

    &:before {
      content: '';
      position: absolute;
      bottom: 1px;
      z-index: 2;
      width: 100%;
      border-bottom: $border-size solid $border-color;
    }

    li {
      flex-flow: wrap;
      flex-direction: column;
      height: $size / $row;

      .big__eye__content {

        span {

          &.blue-dot {

            &.is-outline {
              background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwIDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzAwNTdGRTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAsMEM0LjUsMCwwLDQuNSwwLDEwYzAsNS41LDQuNSwxMCwxMCwxMGM1LjUsMCwxMC00LjUsMTAtMTBDMjAsNC41LDE1LjUsMCwxMCwweiBNMTYuMywxMGMwLDMuNS0yLjgsNi4zLTYuMyw2LjNTMy43LDEzLjUsMy43LDEwUzYuNSwzLjcsMTAsMy43UzE2LjMsNi41LDE2LjMsMTB6Ii8+PC9zdmc+);
            }
          }

          &.red-dot {

            &.is-outline {
              background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwIDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0FEMDAxNTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAsMEM0LjUsMCwwLDQuNSwwLDEwYzAsNS41LDQuNSwxMCwxMCwxMGM1LjUsMCwxMC00LjUsMTAtMTBDMjAsNC41LDE1LjUsMCwxMCwweiBNMTYuMywxMGMwLDMuNS0yLjgsNi4zLTYuMyw2LjNTMy43LDEzLjUsMy43LDEwUzYuNSwzLjcsMTAsMy43UzE2LjMsNi41LDE2LjMsMTB6Ii8+PC9zdmc+);
            }
          }
        }
      }

    // for debugging
    // 			// top row
    // 			&:nth-child(#{$big-eye-row}n + 1) {
    // 				background: rgba(234,232,21,.5);
    // 			}

    // 			// left row
    // 			&:nth-child(-n + #{$big-eye-row}) {
    // 				background: yellow;
    // 			}

    // 			// right row
    // 			&:nth-last-child(-n + #{$big-eye-row}) {
    // 				background: rgba(255,222,222,.5);
    // 			}

    // 			// bottom row
    // 			&:nth-child(#{$big-eye-row}n) {
    // 				background: rgba(255,123,21,.5);
    // 			}
    }
  }

  &.small__eye {

    &:before {
      content: '';
      position: absolute;
      right: 1px;
      z-index: 2;
      height: 100%;
      border-right: $border-size solid $border-color;
    }
  }

  &.small__eye,
  &.cockroach {
  $small-eye-height: $bead-road-size / 4;
  $small-eye-row: $row-count - 3;

    float: left;
    height: $small-eye-height;

    li {
      flex-flow: wrap;
      flex-direction: column;
      height: $small-eye-height / $small-eye-row;
    }
  }

  &.big__eye,
  &.small__eye,
  &.cockroach {

    .big__eye__content {
      display: flex;
      flex-flow: column;
      flex-wrap: wrap;
    }
  }
}


// bead
.red-dot,
.blue-dot,
.green-dot,
.is-dragon,
.is-og {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $bead-size - 3px;
  height: $bead-size - 3px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  color: #fff;
  line-height: 0;

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%) translateY(-50%);
    font-style: normal;
  }

  &.is-bp:before,
  &.is-pp:after {
    content: "";
    position: absolute;
    width: round($bead-size / 5);
    height: round($bead-size / 5);
    border: $border-size solid #fff;
    border-radius: round($bead-size / 5);
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  &.is-bp {

    &:before {
      top: 0;
      left: 0;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjQUQwMDE1Ij4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);
    }
  }

  &.is-pp {

    &:after {
      right: 0;
      bottom: 0;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjMDA1N0ZFIj4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);
    }
  }

  &.is-outline {

    &.is-bp:before,
    &.is-pp:after {
      width: round($bead-size / 8);
      height: round($bead-size / 8);
      border-radius: round($bead-size / 8);
    }
  }
}

.blue-dot {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjMDA1N0ZFIj4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

  &.is-outline {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzAwNTdGRSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+) !important;

    &.is-tie {
      color: #00b00c;
    }
  }

  &.is-slash {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMwMDU3RkU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
  }
}

.red-dot {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjQUQwMDE1Ij4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

  &.is-outline {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iI0FEMDAxNSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);

    &.is-tie {
      color: #00b00c;
    }
  }

  &.is-slash {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNBRDAwMTU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
  }
}

.green-dot {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwIDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzAwOEMwNzt9PC9zdHlsZT48Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxMCIgY3k9IjEwIiByPSI5LjkiLz48L3N2Zz4=);
}

.is-dragon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTIwLjcgMTIwLjciPiAgPGRlZnM+ICAgIDxzdHlsZT4gICAgICAuY2xzLTEgeyAgICAgICAgZmlsbDogI2ZmZjsgICAgICB9ICAgICAgLmNscy0yIHsgICAgICAgIGZpbGw6ICM1YjAwMDA7ICAgICAgfSAgICAgIC5jbHMtMyB7ICAgICAgICBmaWxsOiB1cmwoI3JhZGlhbC1ncmFkaWVudCk7ICAgICAgfSAgICA8L3N0eWxlPiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InJhZGlhbC1ncmFkaWVudCIgY3g9Ii00ODgwLjM5IiBjeT0iNTg2My4xNyIgcj0iNTIwLjczIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDc1OS43IC03NjAuMSkgc2NhbGUoMC4xNCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4gICAgICA8c3RvcCBvZmZzZXQ9IjAuMTEiIHN0b3AtY29sb3I9IiM1YjAwMDAiLz4gICAgICA8c3RvcCBvZmZzZXQ9IjAuODkiIHN0b3AtY29sb3I9IiM5ZjA1MDUiLz4gICAgPC9yYWRpYWxHcmFkaWVudD4gIDwvZGVmcz4gIDx0aXRsZT5NVy1kcmFnb24tcmVkLWJlYWRzPC90aXRsZT4gIDxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjAuMyIgY3k9IjYwLjMiIHI9IjYwLjMiLz4gIDxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iNjAuMyIgY3k9IjYwLjMiIHI9IjU2LjciLz4gIDxjaXJjbGUgY2xhc3M9ImNscy0zIiBjeD0iNjAuMyIgY3k9IjYwLjMiIHI9IjU0LjkiLz48L3N2Zz4=);
}

.is-og {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTI0LjcgMTI0LjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyNC43IDEyNC43OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6dXJsKCNTVkdJRF8xXyk7fS5zdDF7b3BhY2l0eTowLjMyO2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9LnN0MntmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOnVybCgjU1ZHSURfMl8pO30uc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzVCMDAwMDt9LnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOnVybCgjU1ZHSURfM18pO30uc3Q1e2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0YxQ0E2Mjt9LnN0NntmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOnVybCgjU1ZHSURfNF8pO30uc3Q3e2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0NFMUQyMzt9LnN0OHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOnVybCgjU1ZHSURfNV8pO30uc3Q5e2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6dXJsKCNTVkdJRF82Xyk7fS5zdDEwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0UxNjIyNzt9PC9zdHlsZT48dGl0bGU+cm9hZG1hcF9iZWFkczwvdGl0bGU+PGc+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2Mi42MzAyIiB5MT0iLTI3LjE5NzEiIHgyPSI2Mi42MzAyIiB5Mj0iMTg1LjMwMTMiPjxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNUUyREYiLz48c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojREVEOUQ2Ii8+PHN0b3AgIG9mZnNldD0iNC43NzIwOTJlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojRTBEN0M3Ii8+PHN0b3AgIG9mZnNldD0iMC4xMzkzIiBzdHlsZT0ic3RvcC1jb2xvcjojRTdEMkEwIi8+PHN0b3AgIG9mZnNldD0iMC4yNjQiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMUNBNjIiLz48c3RvcCAgb2Zmc2V0PSIwLjUyMjUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGM0Y0RjQiLz48c3RvcCAgb2Zmc2V0PSIwLjU3NTMiIHN0eWxlPSJzdG9wLWNvbG9yOiNGM0YwRTUiLz48c3RvcCAgb2Zmc2V0PSIwLjY3NjgiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMkU1QkUiLz48c3RvcCAgb2Zmc2V0PSIwLjgxNTIiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMUQzODAiLz48c3RvcCAgb2Zmc2V0PSIwLjg3NjQiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMUNBNjIiLz48c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRDFEM0Q0Ii8+PHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0E3QTlBQyIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0MCIgZD0iTTYyLjYsMTI0LjdjMzQuNCwwLDYyLjQtMjgsNjIuNC02Mi40QzEyNSwyOCw5NywwLDYyLjYsMEMyOC4zLDAsMC4zLDI4LDAuMyw2Mi4zQzAuMyw5Ni43LDI4LjMsMTI0LjcsNjIuNiwxMjQuN0w2Mi42LDEyNC43eiIvPjwvZz48Zz48Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSI2Mi42IiBjeT0iNjIuNCIgcj0iNjAuMyIvPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMl8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzIuMTY0NCIgeTE9IjMwNy4xMTQ1IiB4Mj0iNTYuNTIxNSIgeTI9IjQzMi40MjExIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuNjI4OSAwIDAgMC42Mjg5IDM5LjM4NCAtMTQ2LjA5NzIpIj48c3RvcCAgb2Zmc2V0PSIwLjIyIiBzdHlsZT0ic3RvcC1jb2xvcjojRjFBMDAwIi8+PHN0b3AgIG9mZnNldD0iMC41MDU2IiBzdHlsZT0ic3RvcC1jb2xvcjojRjFDQTYyIi8+PHN0b3AgIG9mZnNldD0iMC43OCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRiIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0MiIgZD0iTTEyMi4zLDUzLjdjMC40LDIuOCwwLjYsNS43LDAuNiw4LjdjMCwzMy4zLTI3LDYwLjMtNjAuMyw2MC4zYy0zMy4zLDAtNjAuMy0yNy02MC4zLTYwLjNjMC0zLjUsMC4zLTcsMC45LTEwLjRjMy42LDYuOSwxOS40LDMxLjksNjEuOSwzMC44Qzk2LDgyLDExMy41LDY1LjcsMTIyLjMsNTMuN0wxMjIuMyw1My43eiIvPjxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjYyLjYiIGN5PSI2Mi40IiByPSI1Ni43Ii8+PHJhZGlhbEdyYWRpZW50IGlkPSJTVkdJRF8zXyIgY3g9IjQ1Mi42ODg2IiBjeT0iOTYyLjE3MjciIHI9IjUyMC43MjcxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuMTQzMyAwIDAgMC4xNDMzIC0yLjIzOTggLTU1Ljc1NTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3AgIG9mZnNldD0iMC4xMSIgc3R5bGU9InN0b3AtY29sb3I6I0YxQTcwMCIvPjxzdG9wICBvZmZzZXQ9IjAuODkiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMUNBNjIiLz48L3JhZGlhbEdyYWRpZW50PjxjaXJjbGUgY2xhc3M9InN0NCIgY3g9IjYyLjYiIGN5PSI2Mi40IiByPSI1NC45Ii8+PC9nPjxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik02Mi40LDYuOWMyOSwwLDUyLjcsMjIuNiw1NC41LDUxLjFjLTExLjksMTQuNS0zMS45LDI0LTU0LjUsMjRjLTIyLjcsMC00Mi43LTkuNS01NC41LTI0QzkuNywyOS41LDMzLjQsNi45LDYyLjQsNi45TDYyLjQsNi45eiIvPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNTg0Ljc5NzIiIHkxPSI2NjAuNjc2NCIgeDI9IjU4NC43OTcyIiB5Mj0iMTQyNy44MTc1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuMTA4MiAwIDAgNy42MDAwMDBlLTAyIC0xLjIzMzcgLTQzLjEzNjgpIj48c3RvcCAgb2Zmc2V0PSIwLjE3IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGIi8+PHN0b3AgIG9mZnNldD0iMC44MyIgc3R5bGU9InN0b3AtY29sb3I6I0YxQ0E2MiIvPjwvbGluZWFyR3JhZGllbnQ+PGVsbGlwc2UgY2xhc3M9InN0NiIgY3g9IjYyIiBjeT0iMzYuMiIgcng9IjQxLjUiIHJ5PSIyOS4yIi8+PGc+PGc+PHBhdGggY2xhc3M9InN0NyIgZD0iTTU3LjMsODQuNWMwLjcsMCwxLjMsMC4zLDEuOSwwLjhjMC41LDAuNSwwLjgsMS4xLDAuOCwxLjljMCwwLjctMC4zLDEuNC0wLjgsMS45Yy0wLjUsMC41LTEuMSwwLjgtMS45LDAuOGMtMC44LDAtMS40LTAuMy0xLjktMC44Yy0wLjUtMC41LTAuOC0xLjEtMC44LTEuOWMwLTAuNSwwLjEtMC45LDAuNC0xLjNjMC4yLTAuNCwwLjUtMC43LDEtMUM1Ni40LDg0LjcsNTYuOCw4NC41LDU3LjMsODQuNXogTTU2LjEsODZjLTAuMywwLjMtMC41LDAuNy0wLjUsMS4yYzAsMC41LDAuMiwxLDAuNiwxLjNjMC4zLDAuMywwLjcsMC40LDEuMSwwLjRjMC41LDAsMC45LTAuMiwxLjEtMC41YzAuMy0wLjMsMC41LTAuNywwLjUtMS4ycy0wLjItMC45LTAuNS0xLjJjLTAuMy0wLjMtMC43LTAuNS0xLjItMC41QzU2LjgsODUuNSw1Ni40LDg1LjYsNTYuMSw4NnoiLz48cGF0aCBjbGFzcz0ic3Q3IiBkPSJNNjEuOSw4NS42djFoMC4zYzAuMywwLDAuNSwwLDAuNi0wLjFjMC4xLTAuMSwwLjItMC4zLDAuMi0wLjRsLTAuMS0wLjNjLTAuMS0wLjEtMC4yLTAuMi0wLjMtMC4yTDYxLjksODUuNnogTTYzLjksODYuMWMwLDAuMy0wLjEsMC42LTAuMiwwLjljLTAuMiwwLjItMC40LDAuNC0wLjcsMC41bDEuMiwyLjNoLTEuMWwtMS4xLTIuMWgtMC4xdjIuMWgtMXYtNS4xaDFjMC40LDAsMC44LDAsMS4yLDAuMWMwLjIsMC4xLDAuNCwwLjMsMC42LDAuNUM2My44LDg1LjUsNjMuOSw4NS44LDYzLjksODYuMXoiLz48cmVjdCB4PSI2NC45IiB5PSI4NC43IiBjbGFzcz0ic3Q3IiB3aWR0aD0iMSIgaGVpZ2h0PSI1LjEiLz48cG9seWdvbiBjbGFzcz0ic3Q3IiBwb2ludHM9IjY5LjcsODYuNSA2OS43LDg3LjUgNjcuOSw4Ny41IDY3LjksODguOCA2OS43LDg4LjggNjkuNyw4OS43IDY2LjksODkuNyA2Ni45LDg0LjcgNjkuNyw4NC43IDY5LjcsODUuNiA2Ny45LDg1LjYgNjcuOSw4Ni41ICIvPjxwb2x5Z29uIGNsYXNzPSJzdDciIHBvaW50cz0iNzMuNyw4OS43IDcxLjYsODYuNCA3MS42LDg5LjcgNzAuNiw4OS43IDcwLjYsODQuNyA3MS41LDg0LjcgNzMuNyw4OCA3My43LDg0LjcgNzQuNiw4NC43IDc0LjYsODkuNyAiLz48cG9seWdvbiBjbGFzcz0ic3Q3IiBwb2ludHM9Ijc1LjMsODQuNyA3OC4xLDg0LjcgNzguMSw4NS42IDc3LjIsODUuNiA3Ny4yLDg5LjcgNzYuMiw4OS43IDc2LjIsODUuNiA3NS4zLDg1LjYgIi8+PHBhdGggY2xhc3M9InN0NyIgZD0iTTc4LjQsODkuN2wxLjktNS4xaDFsMiw1LjFoLTFsLTAuNC0xaC0yLjFsLTAuNCwxSDc4LjR6IE04MC44LDg2bC0wLjcsMS43aDEuNEw4MC44LDg2eiIvPjxwb2x5Z29uIGNsYXNzPSJzdDciIHBvaW50cz0iODQsODQuNyA4NSw4NC43IDg1LDg4LjggODYuNCw4OC44IDg2LjQsODkuNyA4NCw4OS43ICIvPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik05My44LDg1LjVsLTAuNywwLjdjLTAuNC0wLjUtMC45LTAuNy0xLjUtMC43Yy0wLjUsMC0wLjksMC4yLTEuMywwLjVjLTAuMywwLjMtMC41LDAuNy0wLjUsMS4yYzAsMC41LDAuMiwwLjksMC41LDEuM2MwLjQsMC4zLDAuOCwwLjUsMS4zLDAuNWMwLjMsMCwwLjYtMC4xLDAuOS0wLjJjMC4yLTAuMSwwLjQtMC40LDAuNi0wLjdoLTEuNXYtMC45aDIuNnYwLjJjMCwwLjQtMC4xLDAuOS0wLjMsMS4zYy0wLjIsMC40LTAuNSwwLjctMC45LDAuOWMtMC40LDAuMi0wLjgsMC4zLTEuMywwLjNjLTAuNSwwLTEtMC4xLTEuNC0wLjNjLTAuNC0wLjMtMC44LTAuNi0xLTFjLTAuMi0wLjQtMC40LTAuOS0wLjQtMS40YzAtMC43LDAuMi0xLjIsMC43LTEuN2MwLjUtMC42LDEuMi0wLjksMi0wLjljMC41LDAsMC45LDAuMSwxLjMsMC4zQzkzLjEsODQuOSw5My40LDg1LjEsOTMuOCw4NS41eiIvPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik05Ny41LDg0LjdsMiw1LjFoLTFsLTAuNC0xSDk2bC0wLjQsMWgtMWwyLTUuMUg5Ny41eiBNOTcuOCw4Ny44TDk3LjEsODZsLTAuNywxLjdIOTcuOHoiLz48cG9seWdvbiBjbGFzcz0ic3Q3IiBwb2ludHM9IjEwMy4zLDg5LjcgMTAyLjQsODkuNyAxMDEuNCw4Ni41IDEwMC44LDg5LjcgOTkuOSw4OS43IDEwMC44LDg0LjcgMTAxLjcsODQuNyAxMDIuOSw4OC4yIDEwNC4xLDg0LjcgMTA1LDg0LjcgMTA1LjgsODkuNyAxMDQuOSw4OS43IDEwNC40LDg2LjUgIi8+PHBvbHlnb24gY2xhc3M9InN0NyIgcG9pbnRzPSIxMDkuNCw4Ni41IDEwOS40LDg3LjUgMTA3LjYsODcuNSAxMDcuNiw4OC44IDEwOS40LDg4LjggMTA5LjQsODkuNyAxMDYuNiw4OS43IDEwNi42LDg0LjcgMTA5LjQsODQuNyAxMDkuNCw4NS42IDEwNy42LDg1LjYgMTA3LjYsODYuNSAiLz48L2c+PGc+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF81XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNDUuMzQzOCIgeTE9Ii05MzYuNTUwOSIgeDI9IjIzNS4zOTQxIiB5Mj0iLTkzNi41NTA5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAgMC40MzE3IC0wLjQzMTcgLTQuMDAwMDAwZS0wNCAtMzM1LjAyMzUgLTE3LjMxNDkpIj48c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRjA3NjI1Ii8+PHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0NFMUQyMyIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0OCIgZD0iTTU4LjgsNDIuNGMzLjUsMS4xLDYuNSwzLDguOSw1LjdsMC4xLDAuMWwwLDAuMWMwLjMsMC40LDAuNCwwLjksMC4xLDEuM2wtMi44LDVsMCwwYy0xLjUtMi44LTMuNy00LjgtNi42LTYuMWMtMi45LTEuMy02LTEuNS05LjEtMC42Yy0zLjYsMS02LjMsMy4yLTguMiw2LjRjLTEuOSwzLjMtMi4zLDYuNy0xLjMsMTAuM2MxLDMuNiwzLjEsNi4zLDYuNCw4LjJjMy4zLDEuOSw2LjcsMi4zLDEwLjMsMS4zYzIuNC0wLjcsNC41LTEuOSw2LjMtMy44YzEuNy0xLjgsMi44LTMuOSwzLjMtNi4zYzAuMS0wLjMsMC4yLTAuOCwwLjItMS4zbDAtMi43YzAuMy01LjEsMi4zLTkuNSw2LTEzYzMuOC0zLjYsOC4yLTUuNCwxMy40LTUuNGM0LjUsMCw4LjUsMS40LDEyLDQuMWMzLjUsMi43LDUuNyw2LjIsNi44LDEwLjRoLTUuM2MtMC4zLDAtMC42LTAuMS0wLjktMC40Yy0wLjItMC40LTAuNC0wLjctMC40LTAuN0w5OCw1NC41Yy0xLjItMi4xLTIuOC0zLjktNC45LTUuMWMtMi4xLTEuMy00LjUtMi03LTJjLTMuOCwwLTcsMS4zLTkuNiw0Yy0yLjYsMi43LTQsNS45LTQsOS42YzAsMSwwLDEuNywwLDJsLTAuMSwxLjZjLTAuNSwyLjUtMS40LDQuNy0yLjcsNi44Yy0xLjMsMi0yLjgsMy43LTQuNyw1LjFjLTIsMS41LTQuMSwyLjUtNi41LDMuMmMtNS4yLDEuNS0xMC4xLDAuOS0xNC43LTEuOGMtNC43LTIuNi03LjctNi42LTkuMi0xMS43QzMzLDYxLDMzLjYsNTYuMSwzNi4yLDUxLjRjMi42LTQuNyw2LjUtNy43LDExLjctOS4yQzUxLjYsNDEuMiw1NS4yLDQxLjMsNTguOCw0Mi40eiIvPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNl8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTQ1LjM1NSIgeTE9Ii05ODAuMjY2NyIgeDI9IjIzNS4zMTczIiB5Mj0iLTk4MC4yNjY3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAgMC40MzE3IC0wLjQzMTcgLTQuMDAwMDAwZS0wNCAtMzM1LjAyMzUgLTE3LjMxNDQpIj48c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRjA3NjI1Ii8+PHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0NFMUQyMyIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0OSIgZD0iTTEwNS4yLDYzLjlsLTAuNywzLjJsLTAuMywwLjd2MGMtMS40LDMuNy0zLjgsNi43LTcsOWMtMy4zLDIuMy03LjEsMy41LTExLjEsMy41Yy0yLjksMC01LjYtMC42LTguMS0xLjhjLTIuNS0xLjItNC42LTIuOC02LjQtNC44bC0wLjEtMC4xYy0wLjMtMC40LTAuNC0wLjktMC4yLTEuM2wyLjctNS4zYzEuMSwyLjIsMi44LDQsNC45LDUuNGMyLjIsMS40LDQuNiwyLjEsNy4yLDIuMWMyLDAsMy45LTAuNCw1LjctMS4yYzEuNy0wLjgsMy4yLTEuOSw0LjUtMy40aC01Ljd2LTQuOWMwLTAuMywwLjEtMC42LDAuNC0wLjljMC4yLTAuMiwwLjUtMC40LDAuOC0wLjRIMTA1LjJ6Ii8+PC9nPjxnPjxwYXRoIGNsYXNzPSJzdDEwIiBkPSJNNzAuNiw0Mi41Yy0xLjYsMC4xLTMuNCwwLjMtNS4zLDAuNmMtMS41LTEtMy4xLTEuOC00LjktMi41bDAuMy0wLjJjMC43LTAuNSwxLjgtMSwzLjEtMS4yYzAuOC0wLjEsMi0wLjMsMy43LTAuNGMyLjktMC4yLDQuOC0wLjYsNS43LTEuMWMxLjctMSwyLjYtMi40LDIuNy00LjRjMC0wLjYsMC0xLjItMC4xLTEuOWwtMC4yLTAuOGwwLjIsMC4zYzAuMiwwLjMsMC4zLDAuNSwwLjQsMC44YzAuNCwwLjgsMC44LDEuNiwxLDIuNGMwLjgsMi42LDAuNSw0LjYtMC45LDYuMWMtMC45LDEtMS43LDEuNy0yLjYsMkM3My4xLDQyLjMsNzIuMSw0Mi40LDcwLjYsNDIuNXoiLz48cGF0aCBjbGFzcz0ic3QxMCIgZD0iTTUxLDI0LjljMi40LDEuMywzLjcsMywzLjgsNWMwLDEuNC0wLjEsMi40LTAuNiwzLjFjLTAuMywwLjUtMC45LDEuMy0xLjksMi40Yy0xLjIsMS4zLTIuNCwyLjgtMy42LDQuM2wtMC4xLDAuMmMtMS43LDAuMy0zLjUsMS01LjIsMS44bDAuMS0xYzAuMi0xLjIsMS41LTMuMiwzLjctNS44YzEuOS0yLjEsMy0zLjcsMy40LTQuOGMwLjUtMS44LDAuMS0zLjQtMS4xLTQuOWMtMC40LTAuNC0wLjgtMC44LTEuNC0xLjNsLTAuNy0wLjRsMC4zLDBsMC45LDAuM0M0OS42LDI0LjIsNTAuNCwyNC41LDUxLDI0Ljl6Ii8+PHBhdGggY2xhc3M9InN0MTAiIGQ9Ik0zMS4zLDM4YzEsMC45LDEuNywxLjgsMS45LDIuNmMwLjIsMC41LDAuNCwxLjUsMC40LDNjMC4xLDIsMC40LDMuOCwwLjcsNS41bDAuMywxYy0wLjgsMS41LTEuNSwzLTIsNC42Yy0wLjQtMC40LTAuOC0wLjgtMS4xLTEuMmMtMC44LTEuMS0xLjQtMy4zLTEuNy02LjZjLTAuMy0yLjktMC43LTQuOS0xLjItNS43Yy0xLTEuNi0yLjUtMi40LTQuNC0yLjVjLTAuNi0wLjEtMS4yLDAtMS45LDAuMWwtMC43LDAuMmwwLjItMC4xbDAuOC0wLjRjMS0wLjUsMS45LTAuOCwyLjYtMUMyNy43LDM2LjUsMjkuOCwzNi43LDMxLjMsMzh6Ii8+PHBhdGggY2xhc3M9InN0MTAiIGQ9Ik0zMS4xLDY1LjdjMC40LDAuMiwwLjgsMC40LDEuMywwLjZjMC40LDEuNywxLDMuMiwxLjcsNC41Yy0wLjcsMC4xLTEuMiwwLTEuNywwYy0wLjktMC4xLTItMC41LTMuMS0xLjNjLTAuNy0wLjUtMS43LTEuMi0zLTIuMmMtMi4yLTEuOC0zLjgtMi44LTUtMy4xYy0xLjgtMC40LTMuNCwwLjEtNC45LDEuNGMtMC40LDAuMy0wLjgsMC44LTEuMiwxLjRsLTAuNCwwLjdsMC4zLTEuMWMwLjMtMC44LDAuNi0xLjYsMS0yLjRjMS4zLTIuNCwyLjktMy43LDUtNGMxLjMtMC4xLDIuNCwwLjEsMy4zLDAuNGMwLjUsMC4yLDEuMywwLjcsMi40LDEuN0MyOC4xLDYzLjUsMjkuNiw2NC42LDMxLjEsNjUuN3oiLz48cGF0aCBjbGFzcz0ic3QxMCIgZD0iTTQwLjQsNzkuMmwwLjktMC4zYzEuNCwxLDIuOSwxLjcsNC40LDIuM2MtMC40LDAuNC0wLjcsMC42LTAuOCwwLjdjLTEuMSwwLjgtMy40LDEuNC02LjgsMS43Yy0yLjksMC4zLTQuOCwwLjctNS43LDEuM2MtMS43LDEtMi41LDIuNC0yLjYsNC40YzAsMC43LDAuMSwxLjMsMC4xLDEuOWwwLjIsMC44bC0wLjYtMWMtMC41LTEtMC44LTEuOS0xLTIuNWMtMC44LTIuNS0wLjYtNC42LDAuOC02LjFjMC45LTEuMSwxLjgtMS43LDIuNi0yYzAuNS0wLjIsMS41LTAuNCwzLTAuNUMzNy4xLDc5LjcsMzksNzkuNSw0MC40LDc5LjJ6Ii8+PHBhdGggY2xhc3M9InN0NyIgZD0iTTMxLjQsNzMuNGMxLjUsMC40LDMsMC41LDQuNCwwLjJjMC43LDEsMS42LDIsMi42LDNsLTAuNywwLjNjLTAuNywwLjMtMS45LDAuNC0zLjYsMC40Yy0yLjcsMC4xLTQuNiwwLjYtNS44LDEuNGMtMS41LDEtMi4zLDIuNy0yLjUsNS4xYy0wLjEsMC43LTAuMSwxLjUsMCwyLjNsMCwwLjZsMC4xLDAuM2wtMS0xLjljLTAuNi0xLjUtMC44LTIuOC0wLjctMy45YzAuMy0yLjEsMS0zLjYsMi4xLTQuN2MwLjMtMC4zLDAuNy0wLjUsMS4xLTAuN2MwLjEtMC4xLDAuMi0wLjEsMC4zLTAuMWwwLjEsMEwyNyw3NC44Yy0xLTAuOC0xLjgtMS41LTIuMy0xLjljLTAuOC0wLjYtMS42LTEuMS0yLjMtMS41Yy0wLjktMC40LTEuNy0wLjUtMi4zLTAuNGMtMS44LDAuMy0zLjEsMS4xLTQsMi4yYy0wLjQsMC41LTEuMSwxLjUtMi4xLDIuOWwtMC45LDEuMmwwLTAuMWwwLjEtMS4yYzAuMi0xLjMsMC41LTIuMywwLjgtMy4zYzEuMi0zLjMsMy4xLTUuMSw1LjctNS42YzEuNi0wLjMsMy41LDAuNiw1LjksMi43QzI3LjksNzEuNywyOS44LDcyLjksMzEuNCw3My40eiIvPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik0yNC43LDQ5LjZjLTAuMi0xLjMtMC40LTIuMi0wLjYtMi43Yy0wLjMtMS0wLjgtMS42LTEuMy0yYy0xLjQtMS0yLjgtMS40LTQuNC0xLjNsLTUsMC44bDEuMS0wLjljMS4xLTAuOCwyLjEtMS40LDMtMS44YzMuMi0xLjUsNS44LTEuNSw4LDAuMWMxLjMsMC45LDIsMi45LDIuMSw2LjFjMC4xLDMsMC42LDUuMiwxLjMsNi43YzAuNywxLjQsMS43LDIuNSwzLDMuM2MtMC4yLDEuNC0wLjMsMi43LTAuMiw0bC0xLTAuNGMtMC43LTAuMy0xLjYtMS0yLjctMi4yYy0yLTEuOC0zLjYtMi45LTUuMS0zLjFjLTEuOC0wLjMtMy42LDAuMy01LjQsMS43Yy0wLjcsMC42LTEuMywxLjEtMS43LDEuNmwtMC40LDAuNWwtMC4xLDAuM2wwLjctMmMwLjctMS42LDEuNS0yLjcsMi40LTMuM2MxLjctMS4zLDMuMy0xLjksNC44LTEuOWMwLjUsMCwwLjksMC4xLDEuMiwwLjJsMC40LDAuM2wwLjEtMS4yQzI0LjksNTEuNCwyNC44LDUwLjQsMjQuNyw0OS42eiIvPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik00Ny4yLDgzLjhjMC44LTAuNSwxLjQtMS4xLDEuOC0xLjdsMC4xLDBDNDguNiw4Mi44LDQ3LjksODMuNCw0Ny4yLDgzLjh6Ii8+PHBhdGggY2xhc3M9InN0NyIgZD0iTTQzLjMsMzFjMC41LTEsMC43LTEuNywwLjYtMi4zYy0wLjItMS44LTEtMy4xLTIuMi00LjFjLTEtMC44LTEuOS0xLjUtMi43LTIuMWwtMS4zLTAuOWwxLjQsMC4yYzEuMiwwLjIsMi4zLDAuNSwzLjQsMC45YzMuMywxLjIsNS4xLDMuMSw1LjQsNS43YzAuMywxLjYtMC43LDMuNS0zLDUuN2MtMi4xLDIuMS0zLjUsNC00LDUuNmMtMC41LDEuNC0wLjYsMi43LTAuNSwzLjhjLTEuMiwwLjktMi4yLDEuOC0zLjIsMi45bC0wLjItMC42Yy0wLjItMC43LTAuMy0xLjgtMC4zLTMuNGMwLTIuNi0wLjQtNC41LTEuMi01LjdjLTEtMS41LTIuNy0yLjQtNS0yLjdjLTAuNy0wLjEtMS40LTAuMS0yLjMsMEwyNy42LDM0aC0wLjNsMi0wLjljMS42LTAuNSwyLjktMC43LDQtMC42YzIuMSwwLjMsMy43LDEuMSw0LjcsMi4yYzAuMywwLjQsMC41LDAuOCwwLjYsMS4xbDAuMSwwLjN2MC4xbDAuMy0wLjJsMC43LTAuNmMwLjctMC43LDEuNC0xLjQsMi0yLjFDNDIuNCwzMi41LDQyLjksMzEuNyw0My4zLDMxeiIvPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik02OS42LDMxLjRjMC40LTAuNywwLjgtMS4zLDEtMmMwLjItMC43LDAuMy0xLjUsMC4zLTIuNGwtMC45LTVsMC45LDEuMWMwLjcsMC45LDEuMywxLjksMS44LDIuOWMxLjMsMi43LDEuNSw1LjEsMC40LDcuMmwtMC40LDAuN2MtMC45LDEuMy0zLDItNi4yLDIuMWMtMi45LDAuMS01LjEsMC42LTYuNywxLjRsLTEsMC42Yy0wLjYsMC40LTEuMSwwLjktMS43LDEuNWMtMS41LTAuMi0yLjktMC4zLTQuMy0wLjNjMC4zLTAuNiwxLTEuNSwyLjItMi43YzEuOC0xLjksMi45LTMuNSwzLjEtNWMwLjMtMS43LTAuMy0zLjUtMS44LTUuNGMtMC40LTAuNC0xLTEtMS43LTEuNmwtMC41LTAuNGwtMC4xLDBsLTAuMi0wLjJsMi4xLDAuN2MxLjUsMC43LDIuNiwxLjQsMy4yLDIuM2MxLjQsMS43LDIsMy4yLDEuOSw0LjdjMCwwLjUtMC4xLDAuOS0wLjMsMS4ybC0wLjEsMC4zbC0wLjEsMC4xaDBsMC4zLDBjMC4zLDAsMC42LDAsMC45LDBjMSwwLDItMC4xLDMtMC4yYzEuMS0wLjEsMi0wLjQsMi44LTAuN0M2OC41LDMyLjQsNjkuMiwzMS45LDY5LjYsMzEuNHoiLz48cGF0aCBjbGFzcz0ic3Q3IiBkPSJNNDEuMiw4OC40Yy0xLjEsMC4xLTIsMC4zLTIuNywwLjZjLTEsMC4zLTEuNywwLjgtMiwxLjNjLTAuNSwwLjctMC45LDEuNS0xLjIsMi4zYy0wLjIsMC43LTAuMywxLjQtMC4yLDJjMC4xLDEuMSwwLjIsMi4yLDAuNCwzLjRsMC4zLDEuNWwtMC4xLTAuMUwzNSw5OC40Yy0wLjctMS0xLjMtMi0xLjgtMi45Yy0xLjItMi42LTEuMy00LjktMC40LTYuOGMwLjItMC4zLDAuNC0wLjcsMC43LTFjMC45LTEuMywzLTIsNi4xLTIuMWMyLjksMCw1LjItMC40LDYuOC0xLjNsMC43LTAuNGMwLjctMC40LDEuNC0xLDItMS42YzEuNSwwLjMsMi45LDAuNCw0LjMsMC40Yy0wLjMsMC43LTEsMS41LTIuMSwyLjZjLTEuOSwxLjktMywzLjYtMy4yLDVjLTAuNCwxLjcsMC4yLDMuNSwxLjcsNS40YzAuNSwwLjYsMS4xLDEuMiwxLjYsMS42YzAuMSwwLjIsMC4zLDAuMywwLjYsMC40bDAuMSwwLjFsLTAuMi0wLjFsLTAuNC0wLjFMNTAsOTdjLTEuNS0wLjYtMi41LTEuNC0zLjMtMi4zYy0xLjMtMS44LTEuOS0zLjMtMS44LTQuOGMwLTAuNCwwLjEtMC45LDAuMy0xLjNsMC0wLjFsMC0wLjFsMC4xLTAuMmwtMS4zLTAuMUM0My4xLDg4LjIsNDIuMSw4OC4zLDQxLjIsODguNHoiLz48L2c+PC9nPjwvc3ZnPg==);
}
</style>
