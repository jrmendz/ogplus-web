<template>
  <ul class="road" :class="roadTheme">
    <!-- Shuffling Status -->
    <!-- $props.status === 'shuffling' -->
    <template v-if="$props.status === 'shuffling'">
      <div class="--is-shuffling">
        <div class="svg-holder" style="margin-right: 20px">
          <svgicon name="shuffling" height="20" scale="2.5" color="#fff"></svgicon>
        </div>
        {{ tt('Shuffling') }}...
      </div>
    </template>

    <template v-if="_.includes($props.road, 'beadRoad')" v-cloak>
      <!-- Baccarat & DT -->
      <li v-if="_.includes(['baccarat', 'dragontiger'], $props.game)" :data-row="$props.config.beadRoad.col">
        <ul class="table__road" :data-text="[ tt('Bead Road') ]">
          <!-- Bead Road Loading -->
          <template v-if="!$props.data.beadRoad.length">
            <div class="road__loader">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
          <!-- Bead Road Loaded -->
          <template v-else>
            <li v-for="(b0, i0) in $props.data.beadRoad" :key="i0">
              <template v-if="!b0.isPredict">
                <span :class="b0.class" :style="_.includes(_.get(b0,'rawResult.result',''), 'super_six') ? 'color:#FFC700' : ''"><i>{{ tt(locale === 'cn' && b0.result === 'tiger' ? 'TG' : _.includes(_.get(b0,'rawResult.result',''), 'super_six') ? '6' : b0.char) }}</i></span>
              </template>

              <template v-else-if="b0.isPredict && b0.isPredictShow">
                <span :class="b0.class" :style="_.includes(_.get(b0,'rawResult.result',''), 'super_six') ? 'color:#FFC700' : ''"><i>{{ tt(locale === 'cn' && b0.result === 'tiger' ? 'TG' : _.includes(_.get(b0,'rawResult.result',''), 'super_six') ? '6' : b0.char) }}</i></span>
              </template>
            </li>
          </template>
        </ul>
      </li>

      <!-- Roulette -->
      <li v-else-if="_.includes(['roulette'], $props.game)" :data-row="$props.config.beadRoad.col" :class="isLobby ? '--only-big__road' : ''">
        <ul class="table__road"  :class="[isLobby || $props.sidebar ? 'big__road' : '', $props.config.beadRoad.class]">
          <!-- Bead Road Loading -->
          <template v-if="!$props.data.beadRoad.length">
            <div class="road__loader">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
          <!-- Bead Road Loaded -->
          <template v-else>
            <li v-for="(b0, i0) in $props.data.beadRoad" :key="i0">
              <span v-if="_.isObject(b0)" :data-numbers="b0.rawResult.value"><i></i></span>
            </li>
          </template>
        </ul>
      </li>

      <!-- Moneywheel -->
      <li v-else data-row="8" data-col="40">
        <ul class="table__road moneywheel">
          <li v-for="(b0, i0) in $props.data.beadRoad" :key="i0">
            <span v-if="_.isObject(b0)" :class="b0.class"><i>{{ _.isEqual(b0.result, 'og') ? '' : b0.result }}</i></span>
          </li>
        </ul>
      </li>
    </template>

    <template v-if="_.difference(['bigRoad', 'bigEyeRoad', 'smallRoad', 'cockroachRoad'], $props.road).length < 4" v-cloak>
      <li :data-row="$props.config.bigRoad.col || 12" class="--only-big__road">
        <!-- Big Road -->
        <template v-if="_.includes($props.road, 'bigRoad')" v-cloak>
          <ul class="table__road big__road" :data-text="[ tt('Big Road') ]">
            <!-- Big Road Loading -->
            <template v-if="!$props.data.bigRoad.length">
              <div class="road__loader">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <!-- Big Road Loaded -->
            <template v-else>
              <li v-for="(b1, i1) in $props.data.bigRoad" :key="i1">
                <template v-if="!b1.isPredict">
                  <span :class="[b1.class, b1.ties > 0 ? '--is-tie' : '']"><i>{{b1.ties > 0 ? b1.ties : ''}}</i></span>
                </template>

                <template v-else-if="b1.isPredict && b1.isPredictShow">
                  <span :class="b1.class"></span>
                </template>
              </li>
            </template>
          </ul>
        </template>

        <!-- Big Eye Road -->
        <template v-if="_.includes($props.road, 'bigEyeRoad')" v-cloak>
          <ul class="table__road big__eye" :data-text="[ tt('Big Eye') ]">
            <!-- Big Eye Road Loading -->
            <template v-if="!$props.data.bigEyeRoad.length">
              <div class="road__loader">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <!-- Big Eye Road Loaded -->
            <template v-else>
              <li v-for="(b2, i2) in $props.data.bigEyeRoad" :key="i2">
                <div class="big__eye__content">
                  <helper v-for="(_b2, _i2) in b2" :key="_i2" :data="_b2">
                    <template slot-scope="{ data }">
                      <template v-if="_.isObject(_b2)">
                        <span v-if="!_b2.isPredict" :class="_b2.class"></span>
                        <span v-else-if="_b2.isPredict && _b2.isPredictShow" :class="_b2.class"></span>
                        <span v-else-if="_b2.isPredict && !_b2.isPredictShow"></span>
                      </template>
                      <template v-else>
                        <span></span>
                      </template>
                    </template>
                  </helper>
                </div>
              </li>
            </template>
          </ul>
        </template>
        <!-- Small Road-->
        <template v-if="_.includes($props.road, 'smallRoad')" v-cloak>
          <ul class="table__road small__eye" :data-text="[ tt('Small Road') ]">
            <!-- Small Road Loading -->
            <template v-if="!$props.data.smallRoad.length">
              <div class="road__loader">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <!-- Small Road Loaded -->
            <template>
              <li v-for="(b3, i3) in $props.data.smallRoad" :key="i3">
                <div class="big__eye__content">
                  <helper v-for="(_b3, _i3) in b3" :key="_i3" :data="_b3">
                    <template slot-scope="{ data }">
                      <template v-if="_.isObject(_b3)">
                        <span v-if="!_b3.isPredict" :class="_b3.class"></span>
                        <span v-else-if="_b3.isPredict && _b3.isPredictShow" :class="_b3.class"></span>
                        <span v-else-if="_b3.isPredict && !_b3.isPredictShow"></span>
                      </template>
                      <template v-else>
                        <span></span>
                      </template>
                    </template>
                  </helper>
                </div>
              </li>
            </template>
          </ul>
        </template>
        <!-- Cockroach Road-->
        <template v-if="_.includes($props.road, 'cockroachRoad')" v-cloak>
          <ul class="table__road cockroach" :data-text="[ tt('Cockroach') ]">
            <!-- Cockroach Road Loading -->
            <template v-if="!$props.data.cockroachRoad.length">
              <div class="road__loader">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <!-- Cockroach Road Loaded -->
            <template v-else>
              <li v-for="(b4, i4) in $props.data.cockroachRoad" :key="i4">
                <div class="big__eye__content">
                  <helper v-for="(_b4, _i4) in b4" :key="_i4" :data="_b4">
                    <template slot-scope="{ data }">
                      <template v-if="_.isObject(_b4)">
                        <span v-if="!_b4.isPredict" :class="_b4.class"></span>
                        <span v-else-if="_b4.isPredict && _b4.isPredictShow" :class="_b4.class"></span>
                        <span v-else-if="_b4.isPredict && !_b4.isPredictShow"></span>
                      </template>
                      <template v-else>
                        <span></span>
                      </template>
                    </template>
                  </helper>
                </div>
              </li>
            </template>
          </ul>
        </template>
      </li>
    </template>
  </ul>
</template>

<script>
/**
 __________                    .___                             ____.  _________
 \______   \  ____ _____     __| _/ _____  _____   ______      |    | /   _____/
  |       _/ /  _ \\__  \   / __ | /     \ \__  \  \____ \     |    | \_____  \
  |    |   \(  <_> )/ __ \_/ /_/ ||  Y Y  \ / __ \_|  |_> >/\__|    | /        \
  |____|_  / \____/(____  /\____ ||__|_|  /(____  /|   __/ \________|/_______  /
         \/             \/      \/      \/      \/ |__|                      \/
 @description Intended for rendering road only, refrain from adding functions/logic here, add logic on parent component instead :)
 @author Louie Biñas
 @author Mary Grace Delos Reyes
 @author Alvin Phoebe Artemis Valdez
 */
export default {
  name: "RoadMapJS",

  props: {
    road: Array,    // ['beadRoad', 'bigRoad', 'bigEyeRoad', 'smallRoad', 'cockroachRoad']
    data: Object,   // { beadRoad: [], bigRoad: [], bigEyeRoad: [], smallRoad: [], cockroachRoad: [] }
    game: String,   // "baccarat, dragontiger, moneywheel"
    config: Object, // { beadRoad: [], bigRoad: [], bigEyeRoad: [], smallRoad: [], cockroachRoad: [] }
    status: String,
    sidebar: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: false
    }
  },
  /**
   _________                                    __               .___
   \_   ___ \   ____    _____  ______   __ __ _/  |_   ____    __| _/
   /    \  \/  /  _ \  /     \ \____ \ |  |  \\   __\_/ __ \  / __ |
   \     \____(  <_> )|  Y Y  \|  |_> >|  |  / |  |  \  ___/ / /_/ |
    \______  / \____/ |__|_|  /|   __/ |____/  |__|   \___  >\____ |
           \/               \/ |__|                       \/      \/
   */
  computed: {
    locale: {
      get () { return this.$store.state.locale }
    },
    roadTheme: {
      get () { return this.$store.state.blackRoadMapSelected ? '--is-dark' : '--is-light' }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .road__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: $base-color-inverted;
  }

  @for $i from 1 through 160 {
    $row: $i;
    $col: $i;
    $bead: $row / $row-count;
    $width: $bead-road-size * $bead;

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
      &.--only-big__road {
        width: $width / 2;
        box-sizing: content-box;
      }
    }

    [data-col="#{$col}"] {
      $divisible: 4;

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

    .--is-shuffling {
      display: flex;
      align-items: center;
      justify-content: center;
      @include position(absolute,0,0,0,0,$index:3);
      color: $base-color-inverted;
      @include rem((
        font-size: 16px
      ));
    }

    > li {
      display: inline-flex;
      flex-wrap: wrap;

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

    &.--is-moneywheel {
      $multiplier: 1.5;
      $row: 8;
      $raw: 40 * $row * 1px;
      $bead: $row / $row-count;
      $width: $bead-road-size * $bead;

      width: $width * $multiplier;
      height: round($raw / 2.23 * $multiplier);

      > li {
        width: $width * $multiplier;

        > .table__road {
          width: $width * $multiplier;
          height: round($raw / 2.23 * $multiplier);

          li {
            @include box(54px, 43px);

            span {
              @include box(42px);
            }
          }
        }
      }
    }

    &.--is-dark {
      background-color: #000;
      border-color: darken($border-color, 65%);

      .table__road {

        &:after {
          color: rgba($base-color-inverted, .25);
        }

        > li {
          border-color: darken($border-color, 65%);
        }

        &.big__road:before,
        &.big__eye:before,
        &.small__eye:before {
          border-color: darken($border-color, 65%);
        }
      }
    }

    &.--is-light {
      background-color: #fff;

      .table__road {

        &:after {
          color: rgba($base-color, .25);
        }
      }

      > li {
        &:after {
          color: rgba($base-color, .25);
        }
      }
    }
  }

  .table__road {
    position: relative;
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    // width: $bead-road-size;
    height: $bead-road-size;
    margin: 0;
    padding: 0;
    box-sizing: content-box;

    &:after {
      content: attr(data-text);
      @include position(absolute,$right: 0, $bottom: 0, $index: 0);
      @include rem((
        margin: 3px 10px,
        font-size: 16px,
      ));
      font-weight: normal;
      text-transform: uppercase;
    }

    &.--odd-even {
      $odds: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35;
      $evens: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36;

      > li {

        span {
          @each $odd in $odds {

            &[data-numbers="#{$odd}"] {
              background-color: #7a0204;
              filter: grayscale(100%) contrast(70%);

              &:before {
                content: 'O';
              }
            }
          }

          @each $even in $evens {

            &[data-numbers="#{$even}"] {
              background-color: $base-color;
              filter: grayscale(100%) contrast(70%);

              &:before {
                content: 'E';
              }
            }
          }
        }
      }
    }

    &.--high-low {
      $highs: 19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36;
      $lows: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18;

      > li {

        span {

          @each $low in $lows {

            &[data-numbers="#{$low}"] {
              background-color: $base-color;
              filter: grayscale(100%) contrast(70%);

              &:before {
                content: 'L';
              }
            }
          }

          @each $high in $highs {

            &[data-numbers="#{$high}"] {
              background-color: #7a0204;
              filter: grayscale(100%) contrast(70%);

              &:before {
                content: 'H';
              }
            }
          }
        }
      }
    }

    > li {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: stretch;
      width: $bead-size;
      height: $bead-size;
      border: $border-size - 1px solid $border-color;
      box-sizing: border-box;
      border-top: 0;
      border-left: 0;
      list-style: none;
      font-size: 10px;

      span {

        &[data-numbers] {
          @include  position(absolute,0,0,0,0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: $base-color-inverted;
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

      &:after {
        @include rem(margin, 0 6px);
      }

      &:before {
        content: '';
        position: absolute;
        bottom: -1px;
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

          i {
            @include rem(font-size,12px);
            letter-spacing: 0;
          }
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
        bottom: -1px;
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

              &.--is-outline {
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwIDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzAwNTdGRTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAsMEM0LjUsMCwwLDQuNSwwLDEwYzAsNS41LDQuNSwxMCwxMCwxMGM1LjUsMCwxMC00LjUsMTAtMTBDMjAsNC41LDE1LjUsMCwxMCwweiBNMTYuMywxMGMwLDMuNS0yLjgsNi4zLTYuMyw2LjNTMy43LDEzLjUsMy43LDEwUzYuNSwzLjcsMTAsMy43UzE2LjMsNi41LDE2LjMsMTB6Ii8+PC9zdmc+);
              }
            }

            &.red-dot {

              &.--is-outline {
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
        right: 0;
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

      &:after {
        @include rem(margin, 0 7px);
      }

      .big__eye__content {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }

  // bead
  .red-dot,
  .blue-dot,
  .green-dot,
  .--is-dragon,
  .--is-og,
  .blue-slash,
  .red-slash,
  .--is-odd,
  .--is-even {
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

    &.--is-bp:before,
    &.--is-pp:after {
      content: "";
      position: absolute;
      width: round($bead-size / 5);
      height: round($bead-size / 5);
      border: $border-size - 1px solid #fff;
      border-radius: round($bead-size / 5);
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }

    &.--is-bp {

      &:before {
        top: 0;
        left: 0;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjQUQwMDE1Ij4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);
      }
    }

    &.--is-pp {

      &:after {
        right: 0;
        bottom: 0;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjMDA1N0ZFIj4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);
      }
    }

    &.--is-outline {

      &.--is-bp:before,
      &.--is-pp:after {
        width: round($bead-size / 8);
        height: round($bead-size / 8);
        border-radius: round($bead-size / 8);
      }
    }
  }

  .blue-dot {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjMDA1N0ZFIj4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

    &.--is-outline {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzAwNTdGRSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);

      &.--is-tie {
        color: #00b00c;
      }
    }

    &.--is-slash {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMwMDU3RkU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
    }
  }

  .red-dot {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjQUQwMDE1Ij4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

    &.--is-outline {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iI0FEMDAxNSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);

      &.--is-tie {
        color: #00b00c;
      }
    }

    &.--is-slash {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNBRDAwMTU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
    }
  }

  .blue-slash {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMwMDU3RkU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
  }

  .red-slash {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNBRDAwMTU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
  }

  .green-dot {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwIDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzAwOEMwNzt9PC9zdHlsZT48Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxMCIgY3k9IjEwIiByPSI5LjkiLz48L3N2Zz4=);
  }

  .--is-dragon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTIwLjcgMTIwLjciPiAgPGRlZnM+ICAgIDxzdHlsZT4gICAgICAuY2xzLTEgeyAgICAgICAgZmlsbDogI2ZmZjsgICAgICB9ICAgICAgLmNscy0yIHsgICAgICAgIGZpbGw6ICM1YjAwMDA7ICAgICAgfSAgICAgIC5jbHMtMyB7ICAgICAgICBmaWxsOiB1cmwoI3JhZGlhbC1ncmFkaWVudCk7ICAgICAgfSAgICA8L3N0eWxlPiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InJhZGlhbC1ncmFkaWVudCIgY3g9Ii00ODgwLjM5IiBjeT0iNTg2My4xNyIgcj0iNTIwLjczIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDc1OS43IC03NjAuMSkgc2NhbGUoMC4xNCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4gICAgICA8c3RvcCBvZmZzZXQ9IjAuMTEiIHN0b3AtY29sb3I9IiM1YjAwMDAiLz4gICAgICA8c3RvcCBvZmZzZXQ9IjAuODkiIHN0b3AtY29sb3I9IiM5ZjA1MDUiLz4gICAgPC9yYWRpYWxHcmFkaWVudD4gIDwvZGVmcz4gIDx0aXRsZT5NVy1kcmFnb24tcmVkLWJlYWRzPC90aXRsZT4gIDxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjAuMyIgY3k9IjYwLjMiIHI9IjYwLjMiLz4gIDxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iNjAuMyIgY3k9IjYwLjMiIHI9IjU2LjciLz4gIDxjaXJjbGUgY2xhc3M9ImNscy0zIiBjeD0iNjAuMyIgY3k9IjYwLjMiIHI9IjU0LjkiLz48L3N2Zz4=);
  }

  .--is-og {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMjAuNyAxMjAuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIwLjcgMTIwLjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KCS5zdDF7ZmlsbDojNUIwMDAwO30NCgkuc3Qye2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQ0KPC9zdHlsZT4NCjx0aXRsZT5NVy1kcmFnb24tcmVkLWJlYWRzPC90aXRsZT4NCjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjYwLjMiIGN5PSI2MC4zIiByPSI2MC4zIi8+DQo8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSI2MC4zIiBjeT0iNjAuMyIgcj0iNTYuNyIvPg0KPHJhZGlhbEdyYWRpZW50IGlkPSJTVkdJRF8xXyIgY3g9Ii00MzcwLjE3NTgiIGN5PSItNzA4Ni44MTMiIHI9IjUyMC43MyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjE0IDAgMCAtMC4xNCA2ODguMzIgLTkzMS4zNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4NCgk8c3RvcCAgb2Zmc2V0PSIwLjExIiBzdHlsZT0ic3RvcC1jb2xvcjojNUIwMDAwIi8+DQoJPHN0b3AgIG9mZnNldD0iMC44OSIgc3R5bGU9InN0b3AtY29sb3I6IzlGMDUwNSIvPg0KPC9yYWRpYWxHcmFkaWVudD4NCjxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjYwLjMiIGN5PSI2MC4zIiByPSI1NC45Ii8+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDMuMiw0Ny4xSDQ5djE1LjhjMCwxLjQtMC4xLDIuOC0wLjQsNC4yYzMuNywzLjIsNy4xLDYuNSwxMC40LDkuOGwtNS4yLDRjLTEuOC0yLjItNC4yLTQuOS03LjItOC4xDQoJYy0yLjEsMy44LTUuNSw3LjEtMTAuMiw5LjhjLTEuMS0xLjMtMi41LTIuOS00LjItNC43YzcuMy00LjIsMTEtOS4zLDExLTE1LjJWNDcuMXogTTM0LjUsNjguM1Y0MGgyMy4zdjI3LjloLTYuMVY0NS4yaC0xMXYyMy4xDQoJSDM0LjV6IE01OS4zLDQ2LjVoMTV2LTguNGg3LjN2OC40aDUuN3Y1LjVoLTUuN3YyMy4yYzAsMS45LTAuNSwzLjUtMS40LDQuNmMtMSwxLjEtMi4yLDEuOC0zLjYsMi4xYy0xLjUsMC4zLTUuMSwwLjQtMTAuOSwwLjUNCgljLTAuNS0yLjUtMS00LjUtMS41LTYuMWMxLjcsMC4yLDMuOCwwLjIsNi4zLDAuMmMyLjUsMCwzLjgtMS4yLDMuOC0zLjVWNTkuM2MtMy42LDUuNi04LjEsMTAuNi0xMy42LDE1Yy0xLjYtMS40LTMuNS0yLjktNS43LTQuMg0KCWM3LjEtNSwxMi44LTExLDE3LjEtMTguMUg1OS4zVjQ2LjV6Ii8+DQo8L3N2Zz4NCg==);
  }
</style>
