<template>
  <ul class="tray">
    <li>
      <RoadMapJS
        :class="getBettingtable === 'moneywheel' ? '--is-moneywheel' : ''"
        :road="['beadRoad']"
        :game="_table.code"
        :status="_table.status"
        :data="{ beadRoad: flatMatrix(RoadInGame.beadRoad.canvass, 12)}"
        :config="{ beadRoad: { col: 12, class: rouletteConfig.road.class } }"
      />
      <StatisticsComponent mini :data="statsData" />
    </li>
    <li>

    </li>
  </ul>
</template>

<script>
import RoadMapJS from '@/components/road/RoadmapJS'
import StatisticsComponent from '@/components/video/tray/StatisticsComponent'
export default {
  components: {
    RoadMapJS,
    StatisticsComponent
  },
  data () {
    return {
      statsData: [
        {
          className: 'blue',
          code: 'D',
          userCount: 5,
          totalBet: 25000
        },
        {
          className: 'green',
          code: 'T',
          userCount: 3,
          totalBet: 10000
        },
        {
          className: 'red',
          code: 'T',
          userCount: 1,
          totalBet: 3000
        },
        {
          className: 'star',
          code: '★',
          userCount: 1,
          totalBet: 1000
        }
      ]
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
    }
  },
  computed: {
    rouletteConfig: {
      get() { return this.$store.state.roulette }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  $class: '.tray';
  $tray-height: 215px;

  #{$class} {
    display: flex;
    align-items: center;
    @include position(absolute, $bottom: 0);
    @include rem(height, $tray-height);

    li {
      display: flex;
      @include rem((
        width: 990px,
        height: $tray-height
      ));
      background-color: rgba($base-color,.5);

      &:nth-child(2) {
        @include rem((
          width: 440px,
          height: $tray-height
        ))
      }
    }
  }
</style>