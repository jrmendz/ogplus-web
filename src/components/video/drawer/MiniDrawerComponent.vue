<template>
  <div class="mini__drawer" :class="[gettablestatus(getStatus) !== '--is-betting' ? '--show-result' : '--is-betting', gettablestatus(getStatus) === '--is-shuffling' ? '--is-shuffling' : '']">
    <BettingArea
      class="betting__table"
      :class="tableInfo.code === 'baccarat' ? '--for-dt-bac' : tableInfo.code === 'dragontiger' ? '--for-dt-bac' : ''"
      :style="tableInfo.code === 'moneywheel' ? 'height: 135px' : ''"/>
    <!-- {{ tableInfo.status }} {{ tableInfo.shoeGame }} {{streamTable}} -->
    <!-- Bead Statistics -->
    <div class="road__and__chips">
      <div>
        <div class="status__wrap">
          <Container001 :gameName="tableInfo.code" class="table__score__wrapper"/>
          <Container002 :tableNumber="tableInfo.tableNumber"/>
        </div>
        <RoadMapJS
          :road="['beadRoad', 'bigRoad', 'bigEyeRoad', 'smallRoad', 'cockroachRoad']"
          :game="tableInfo.code"
          :status="tableInfo.status"
          :data="{
            beadRoad: flatMatrix(RoadInGame.beadRoad.canvass, 12),
            bigRoad: flatMatrix(RoadInGame.bigRoad.canvass, 24),
            bigEyeRoad: flatMatrix(RoadInGame.bigEyeRoad.canvass, 24),
            smallRoad: flatMatrix(RoadInGame.smallRoad.canvass, 12),
            cockroachRoad: flatMatrix(RoadInGame.cockroachRoad.canvass, 12)
          }"
          :config="{ beadRoad: { col: 12 }, bigRoad: { col: 24 }, bigEyeRoad: { col: 24 }, smallRoad: { col: 12 }, cockroachRoad: { col: 12 } }"
        />
      </div>
      <CenterChipComponent/>
    </div>
  </div>
</template>

<script>
  import RoadMapJS from '@/components/road/RoadmapJS'
  import BettingArea from '@/components/bettingtable/BettingComponent'
  import CenterChipComponent from '@/components/video/drawer/CenterChipComponent'
  import Container001 from '@/components/video/container/Container001'
  import Container002 from '@/components/video/container/Container002'

  export default {
    name: "MiniDrawer",
    components: {
      RoadMapJS,
      BettingArea,
      CenterChipComponent,
      Container001,
      Container002
    },
    computed: {
      tableInfo: {
        get () { return this.$store.state.tablelist[this.tableNumber]}
      },
      tableNumber: {
        get () { return this.$store.state.currentTableIndex }
      },
      RoadInGame: {
        get () { return this.$store.state.RoadInGame }
      },
      getStatus: {
        get () {
          return this.$store.state.currentTableInfo.status
        }
      }
    },
    methods: {
      flatMatrix: function (matrix = [], columnLength = 0) {
        let finalArray = [];

        if (!matrix.length || !columnLength) return []
        // Flatten matrix by column
        for (let col = 0; col < columnLength; col++) {
          finalArray.push(matrix.map(function(value) { return value[col] }))
        }
        return _.flatMap(finalArray);
      },
      gettablestatus (val) {
        let _s = this
        switch (_s.getStatus) {
          case 'betting' :
            val = '--is-betting'
            break
          case 'shuffling' :
            val = '--is-shuffling'
            break
          case 'dealing' :
            break
        }
        return val
      }
    }
  }
</script>

<style lang="scss">

.mini__drawer {
  @include position(absolute, $bottom: 0);
  width: 100%;

  &.--show-result {

    &:before {
      content: '';
      @include position(absolute,0,0,0,0,2);
    }
  }

  .road__and__chips {
    position: relative;
    display: flex;
    @include rem(margin-top, 10px);
    background-color: darken(#2D5789, 20%);

    .--is-chip-and-button {

      .v-tabs__item {
        @include rem(padding, 0 5px);
      }
    }
  }

  .list__ui {
    border-bottom: 0;

    &.--is-chip-and-button {
      flex-flow: column;
    }
  }

  .status__wrap {
    display: flex;
    position: relative;
    height: 41px;
    border-bottom: 1px solid $border-color;

    .table__score__wrapper,
    .table__setter {
      flex: 1 0 0;
    }

    .table__score,
    .table__setter {
      position: relative;
      z-index: 0;
      transform: translateY(0);
    }
  }
}
</style>
