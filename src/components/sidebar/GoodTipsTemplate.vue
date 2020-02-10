<template>
  <RoadMapJS
    :road="['bigRoad']"
    :game="'baccarat'"
    :data="{ bigRoad: data }"
    :config="{ bigRoad: { col: 10 } }"
  />
</template>

<script>
  import RoadMapJS from '../road/RoadmapJS'
  export default {
    name: "GoodTipsTemplate",
    components: { RoadMapJS },
    props: {
      gt: String
    },
    data () {
      return {
        data: []
      }
    },
    mounted () {
      this.generateTips()
    },
    methods: {
      generateTips: function () {
        this.data = flatMatrix(plotter(this.staticPattern[this.$props.gt], createMap()), 10)
      }
    },
    computed: {
      staticPattern: {
        get () {
          return this.$store.state.staticPattern
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

  /**
   * Plotter
   * @param directions
   * @param map
   */
  function plotter (directions = [], map = []) {
    let result, foundMatch, plotData, coordinates;

    for (let _res = 0; _res < directions.length; _res++) {
      result = directions[_res];
      foundMatch = false;
      // Final data object to be sent on front-end
      plotData = {
        class: (result.result === 'r' ? 'red-dot --is-red ' : 'blue-dot --is-blue ') + '--is-outline',
        isPredict: false,
        isPredictShow: false,
        ties: 0
      };
      // Row loop
      for (let _r = 0; _r < map.length && !foundMatch; _r++) {
        // Column loop
        for (let _c = 0; _c < map[_r].length && !foundMatch; _c++) {
          // Single Cell value
          coordinates = _.split(map[_r][_c], '-');
          if (_.isEqual(parseInt(coordinates[0]), result.row) && _.isEqual(parseInt(coordinates[1]), result.column)) {
            map[_r][_c] = plotData;
            foundMatch = true
          }
        }
      }
    }
    return map;
  }

  /**
   * Map Creator
   * @param _rows
   * @param _cols
   * @returns {Array}
   */
  function createMap (_rows = 6, _cols = 10) {
    let arr = []
    for( let row = 0; row < _rows; row++) {
      arr[row] = [];
      for (let col = 0; col < _cols; col++) {
        arr[row].push(row + '-' + col)
      }
    }
    return arr;
  }

</script>

<style lang="scss">
.goodtips__modal {
  @include position(absolute, rem(16px), $index: 999);
  @include rem(margin-left, 16px);
  @include rem(border-radius, 7px);
  @include rem(width, 700px);
  will-change: transform, opacity;

  .checkmark {
    @include rem(bottom, 6px !important);
  }

  .list__ui {
    border: 0;
  }

  .goodtips__list {
    @extend %clearfix;

    > li {
      display: inline-flex;
      flex-flow: column;
      justify-content: center;
      width: calc(100% / 4 - 5px);
      @include rem((
        padding: 0 5px 5px,
        margin-right: 5px,
        margin-bottom: 5px,
        border: 1px solid,
        border-radius: 4px
      ));
      overflow: hidden;

      .checkbox__ui {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1 0 auto;
        @include rem((
          height: 50px
        ));

        .label {
          @include rem((
            width: 130px,
            padding: 0 5px
          ));
        }

        .checkmark {
          position: relative;
          left: 0;
          bottom: 0 !important;
        }
      }

      .--only-big__road {
        transform: scale(.833);
        transform-origin: left top;
      }

      ul.big__road {
        border: 1px solid $border-color;
        overflow: hidden;

        &:after,
        &:before {
          display: none;
        }

        > li {

        // right row
          &:nth-last-child(-n + #{$row-count}) {
            border-right: 0
          }

          // bottom row
          &:nth-child(#{$row-count}n) {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>

