<template>
  <li class="right__drawer">
  <div class="rouletteoval__container" v-if="getBettingtable === 'roulette'">
    <RouletteOvalComponent class="rouletteoval__right" />
  </div>
  <template v-if="getBettingtable !== 'roulette'">

    <Container002 :tableNumber="_table.tableNumber"/>

    <RoadMapJS
      v-if="getBettingtable !== 'moneywheel' && getBettingtable !== 'roulette' "
      :road="['bigRoad', 'bigEyeRoad', 'smallRoad', 'cockroachRoad']"
      :game="_table.code"
      :status="_table.status"
      :data="{
        bigRoad: flatMatrix($store.state.RoadInGame.bigRoad.canvass, 24),
        bigEyeRoad: flatMatrix($store.state.RoadInGame.bigEyeRoad.canvass, 24),
        smallRoad: flatMatrix($store.state.RoadInGame.smallRoad.canvass, 12),
        cockroachRoad: flatMatrix($store.state.RoadInGame.cockroachRoad.canvass, 12)
      }"
      :config="{ bigRoad: { col: 24 }, bigEyeRoad: { col: 24 }, smallRoad: { col: 12 }, cockroachRoad: { col: 12 } }"
    />
  </template>
  </li>
</template>

<script>
import ChannelDrawerComponent from '@/components/video/drawer/ChannelDrawerComponent'
import RoadMapJS from '@/components/road/RoadmapJS'
import RouletteOvalComponent from '@/components/video/drawer/RouletteOvalComponent'
import Container002 from '@/components/video/container/Container002'


export default {
  components: {
    ChannelDrawerComponent,
    RoadMapJS,
    RouletteOvalComponent,
    Container002
  },
  data () {
    return {
      initialSqueeze: false,
      thirdCardB: false,
      isPredictActive: false
    }
  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
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
    flatMatrix: function (matrix = [], columnLength = 0) {
      let finalArray = []

      if (!matrix.length || !columnLength) return []
      // Flatten matrix by column
      for (let col = 0; col < columnLength; col++) {
        finalArray.push(matrix.map(function(value) { return value[col] }))
      }
      return _.flatMap(finalArray);
    }
  },
  watch: {
    _getCurrentTime: function () {
      let _s = this
      if (_s.initialSqueeze && _s._getCurrentTime === 0) {
        _s.initialSqueeze = false
      }
    },
    getStatus: function () {
      let _s = this
      switch (this.$store.state.currentTableInfo.status) {
        case 'squeeze_start' :
          break
        case 'squeeze_end' :
          break
        case 'squeezeb_start' :
        case 'squeezedt_start' :
          _s.thirdCardB = true
          break
        case 'squeezeb_end' :
        case 'squeezedt_end' :
          break
        case 'squeeze_time' :
          _s.thirdCardB = false
          _s.initialSqueeze = true
          break
        case 'squeezeb_time' :
        case 'squeezep_time' :
        case 'squeezedt_time' :
          _s.initialSqueeze = true
          break
      }
    }
  },
  computed: {
    shoeGame: {
      get () {
        return this._table.shoeGame
      }
    },
    isSuperSix: {
      get () { return this._table.isSuperSix },
      set (v) { this._table.isSuperSix = v }
    },
    superSixDisabled: {
      get () { return this._table.superSixDisabled }
    },
    currentTable: {
      get () {
        return this.$store.state.currentTableInfo || {}
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
    currentTableIndex: {
      get () {
        return this.$store.state.currentTableIndex || {}
      }
    },
    table: {
      get () {
        return this.$store.state.currentTableInfo || {}
      }
    },
    getStatus: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
    highestBankerBidder: {
      get () {
        return this._table.highestBankerBidder
      }
    },
    highestPlayerBidder: {
      get () {
        return this._table.highestPlayerBidder
      }
    },
    highestTigerBidder: {
      get () {
        return this._table.highestTigerBidder
      }
    },
    highestDragonBidder: {
      get () {
        return this._table.highestDragonBidder
      }
    },
    _table: {
      get () {
        return this.$store.state.tablelist[this.currentTableIndex]
      }
    },
    _getUserID: {
      get () {
        console.log('AWW: ', this.$store.state.userinfo.id)
        return this.$store.state.userinfo.id
      }
    },
    _getCurrentTime: {
      get () {
        return this.$store.state.currentTableInfo.game.timer
      }
    }
  }
}
</script>

<style lang="scss">
.rouletteoval__container{
  display: flex;
  align-items: center;
  width: 431px;
  height: 216px;
  background:rgba(0, 0, 0,0.5);
  position: relative;
  margin: auto;

  .rouletteoval__right {
    position: relative;
    margin: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 95%;
  }
}

.blink {
  animation: blink .75s linear alternate;
  animation-iteration-count: 4;
}

@keyframes blink {
  0% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}

.prediction {
  display: inline-flex;
  @extend %clearfix;
  cursor: pointer;
  user-select: none;

  > li {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    @include rem((
      font-size: 16px,
      margin: 0 5px
    ));
    color: $base-color-inverted;

    &.--is-banker {
      color: $dark-red
    }

    &.--is-player {
      color: $dark-blue
    }

    span {
      background-size: cover;
      @include box(10px);

      &.blue-slash {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMwMDU3RkU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
      }

      &.red-slash {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNBRDAwMTU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
      }

      &.blue-dot {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjMDA1N0ZFIj4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

        &.--is-outline {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzAwNTdGRSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);
        }
      }

      &.red-dot {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjQUQwMDE1Ij4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

        &.--is-outline {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iI0FEMDAxNSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);
        }
      }
      @include box(10px);

      &.blue-slash {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMwMDU3RkU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
      }

      &.red-slash {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOS41IDkuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS41IDkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNBRDAwMTU7fTwvc3R5bGU+PGc+PGc+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxLjIsOS40IDAsOC4yIDguMiwwIDkuNSwxLjIgIi8+PC9nPjwvZz48L3N2Zz4=);
      }

      &.blue-dot {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjMDA1N0ZFIj4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

        &.--is-outline {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzAwNTdGRSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);
        }
      }

      &.red-dot {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZyBmaWxsPSIjQUQwMDE1Ij4gICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC44ODciLz4gICAgPHBhdGggZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+ICA8L2c+PC9zdmc+);

        &.--is-outline {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iI0FEMDAxNSIgZD0iTTEwIDIuMTE0YzQuMzQ5IDAgNy44ODYgMy41MzggNy44ODYgNy44ODZTMTQuMzQ5IDE3Ljg4NiAxMCAxNy44ODYgMi4xMTQgMTQuMzQ5IDIuMTE0IDEwIDUuNjUxIDIuMTE0IDEwIDIuMTE0bTAtMkM0LjU0LjExNC4xMTQgNC41NC4xMTQgMTBTNC41NCAxOS44ODYgMTAgMTkuODg2IDE5Ljg4NiAxNS40NiAxOS44ODYgMTAgMTUuNDYuMTE0IDEwIC4xMTR6Ii8+PC9zdmc+);
        }
      }
    }

    .list__ui {
      @include rem((
        padding: 5px,
        border-radius: 3px
      ));

      &.--is-banker {
        @include rem(border, 1px solid $dark-red);
      }

      &.--is-player {
        border: rem(1px) solid $dark-blue;
      }

      > li {
        @extend %relative;
        @include box(rem(10px));
        padding: 0;
        @include rem(margin, 0 2.5px);
      }
    }

    @supports (-ms-ime-align:auto) {
      .red-dot,
      .blue-dot {
        height: 100% !important;
        margin-top: 0;
      }
    }
  }
}
</style>
