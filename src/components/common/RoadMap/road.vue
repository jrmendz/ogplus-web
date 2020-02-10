<template>
  <div
    :data-row="_.size(_.get($props.data, `${roadSerializer(road)}`, []))"
    :data-type="game"
    :style="roadMap"
    :class="[
      'roadmap',
      road === 'cockroach' ? 'is-cockroach' :
      road === 'small-road' ? 'is-small-road' :
      road === 'big-eye' ? 'is-big-eye' :
      road === 'big-road' ? 'is-big-road' : 'is-main-road'
    ]">
    <!-- roulette -->
    <template v-if="game === 'roulette'">
      <!-- remove randomClass and randomNumber -->
      <ul class="roulette" v-for="(n, i) in _.takeRight(_.get($props.data, `${roadSerializer(road)}`, []), _.get(this, `[${roadSerializer(road)}].rows`, 6))" :key="i" :style="rouletteHeight">
        <li :data-numbers="n" v-for="list in 4" :key="list"></li>
      </ul>
    </template>
    <!-- moneywheel -->
    <template v-else-if="game === 'moneywheel'">
      <div class="bead-wrap" v-for="(n, i) in _gbl_roadParser({ type: roadSerializer(road), data: _.get($props.data, `${roadSerializer(road)}`, []), rows: _.get(this, `[${roadSerializer(road)}].rows`, 6), columns: _.get(this, `[${roadSerializer(road)}].columns`, 12)})" :key="i" :style="beadWrap">
        <!-- class required "is-red" and "is-jackpot" followed -->
        <!-- remove randomClass and randomNumber-->
        <span v-if="!_.isObject(n)" :class="[n === 40 ? 'is-jackpot' : 'is-red']" :style="roadBead">
          <!-- if get the jackpot display the image inside -->
          <img :src="require('@/assets/logo.png')" alt="">
          {{ n }}
        </span>
      </div>
    </template>
    <template v-else-if="game === 'threecards'">
      <div class="bead-wrap" v-for="(n, i) in _gbl_roadParser({ type: roadSerializer(road), data: _.get($props.data, `${roadSerializer(road)}`, []), rows: _.get(this, `[${roadSerializer(road)}].rows`, 6), columns: _.get(this, `[${roadSerializer(road)}].columns`, 12)})" :key="i" :style="beadWrap">
        <span v-if="!_.isObject(n)" :class="[
            n === 0 ? 'is-blue' :
            n === 1 ? 'is-red' :
            n === 2 ? 'is-green' :
            n === 3 ? 'is-blue is-lucky' : 'is-red is-lucky'
          ]" :style="roadBead"></span>
        <!-- uncomment this to see outline -->
        <!-- <span :class="[randomClass(['is-red is-outline', 'is-blue is-outline', 'is-green is-outline', 'is-blue is-outline is-lucky', 'is-red is-outline is-lucky'])]" :style="roadBead"></span> -->
      </div>
    </template>
    <!-- niuniu -->
    <template v-else-if="game === 'niuniu'">
      <!-- <div class="bead-wrap" v-for="n in (rows * columns)" :key="n" :style="beadWrap">
        class required "is-red" and "is-jackpot" followed
        remove randomClass and randomNumber
          <span :class="[randomClass(['is-red', 'is-blue', 'is-gray'])]" :style="roadBead">
            {{ randomClass(['N','B','1','2','3','4','5','6','7','8','9','10']) }}
          </span>
      </div> -->
      <ul class="niuniu static">
        <li>B</li>
        <li>P1</li>
        <li>P2</li>
        <li>P3</li>
      </ul>
      <ul class="niuniu" v-for="(n, i) in _.takeRight(_.get($props.data, `${roadSerializer(road)}`, []), _.get(this, `[${roadSerializer(road)}].columns`, 6))" :key="i" :style="[niuniuHeight]">
        <li v-for="(list, li) in n" :key="li" :style="[niuniuWidth]">
          <span>{{ list }}</span>
          <span :class="[_.includes(list, 'W') ? 'is-win' : '']"></span>
        </li>
      </ul>
    </template>

    <!-- bacarrat & dragontiger -->
    <template v-else>
      <div class="bead-wrap" v-for="(n, i) in _gbl_roadParser({ type: roadSerializer(road), data: _.get($props.data, `${roadSerializer(road)}`, []), rows: _.get(this, `[${roadSerializer(road)}].rows`, 6), columns: _.get(this, `[${roadSerializer(road)}].columns`, 12)})" :key="i" :style="beadWrap">
        <!-- TODO: @Alvin -->
        <!-- template for cockroach -->
        <template v-if="road === 'cockroach'">
          <div class="big-eye-content" :style="beadWrap">
            <!-- class required "is-blue" "is-red" followed by "is-slash" -->
            <!-- remove randomClass and randomNumber -->
            <span :class="[randomClass(['is-red', 'is-blue']),'is-slash']" :style="slash" v-for="n in 4" :key="n"></span>
          </div>
        </template>

        <!-- template for smallroad -->
        <template v-else-if="road === 'small-road'">
          <div class="big-eye-content" :style="beadWrap">
            <!-- class required "is-blue" "is-red" -->
            <!-- remove randomClass and randomNumber -->
            <span :class="randomClass(['is-red', 'is-blue'])" :style="smallbead" v-for="n in 4" :key="n"></span>
          </div>
        </template>

        <!-- template for big eye -->
        <template v-else-if="road === 'big-eye'">
          <div class="big-eye-content" :style="beadWrap">
            <!-- class required "is-blue" "is-red" followed by "is-outline" -->
            <!-- remove randomClass and randomNumber -->
            <span :class="[randomClass(['is-red', 'is-blue']), 'is-outline']" :style="smallbead" v-for="n in 4" :key="n"></span>
          </div>
        </template>

        <!-- template for big eye -->
        <template v-else-if="road === 'big-road'">
           <!-- class required "is-blue" "is-red" followed by "is-outline" -->
           <!-- remove randomClass and randomNumber -->
          <span v-if= "!_.isEmpty(n)"
            :style="roadBead"
            :class="[
                    n.result === 0 ? 'is-red' : 'is-blue',
                     'is-outline',
                    n.tie ? 'is-tie' : ''
                  ]">

            <!-- end of tie count -->
            <template v-if="game === 'bacarrat'">
              <i :class="[
                _.get(n, 'pair[0]', 0) ? 'is-pp' :
                _.get(n, 'pair[1]', 0) ? 'is-bp' : ''
                ]" :style="isBpPp">{{ n.tie ? n.tie : '' }}</i>
            </template>

            <template v-else>
              <i>{{ n.tie ? n.tie : '' }}</i>
            </template>
          </span>
        </template>

        <!-- template for main road and big road -->
        <template v-else>
          <span v-if= "!_.isEmpty(n)"
                :style="roadBead"
                :class="[
                    'is-outline',
                    n.result === 0 ? 'is-red' : 'is-blue',
                    n.tie ? 'is-tie' : ''
                  ]">

            <!-- end of tie count -->
            <template v-if="game === 'bacarrat'">
              <i :class="[
                _.get(n, 'pair[0]', 0) ? 'is-pp' :
                _.get(n, 'pair[1]', 0) ? 'is-bp' : ''
                ]" :style="isBpPp">{{ n.tie ? n.tie : '' }}</i>
            </template>

            <template v-else>
              <i>{{ n.tie ? n.tie : '' }}</i>
            </template>
          </span>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import Template from "../../road/mixins/ErrorHandler/template";
export default {
  name: 'road',
  components: {Template},
  props: {
    game: {
      type: String,
      default: "baccarat",
      validator(x) {
        return ["baccarat", "dragontiger", "moneywheel", "roulette", "niuniu", "threecards"].includes(x);
      }
    },
    road: {
      type: String,
      default: "bead-road",
      validator(x) {
        return ["big-road", "big-eye", "small-road", "cockroach", "bead-road"].includes(x);
      }
    },
    data: {
      type: Object
    },
    roulette: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 6
    },
    columns: {
      type: Number,
      default: 12
    },
    scale: {
      type: Number,
      default: 1,
    }
  },
  data () {
    return {
      slash: "",
      roadMap: "",
      roadBead: "",
      beadWrap: "",
      smallbead: "",
      rouletteHeight: "",
      niuniuHeight: "",
      niuniuWidth: "",
      isBpPp: "",
      beadRoad: {
        data: [],
        rows: 6,
        columns: 12
      },
      bigRoad: {
        data: [],
        rows: 6,
        columns: 12
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
  },
  methods: {
    // !NOTE randomNumber & randomClass is for demo purposes only, once there's a data you may remove this function, sincerely yours 'Louie'
    randomNumber(value) {
      return Math.floor(Math.random() * (value - 1 + 1)) + 1;
    },
    randomClass(value) {
      let minVal = 0
      let maxVal = value.length
      let chooseClass = Math.floor(Math.random() * (maxVal - minVal) + minVal )
      return value[chooseClass]
    },
    roadInit() {
      let rows = this.$props.rows,
          scale = this.$props.scale,
          columns = this.$props.columns,
          raw = null,
          size = null,
          bead = null,
          beadSize = null,
          containerHeight = null,
          containerWidth = null

      // store the inital value for rows as our size for bead
      raw = rows * 6
      // compute the raw to the initial rows
      size = raw * 6
      // initiate size and compute the scale for resizing purpose
      bead = size * scale
      // set the size of the bead
      beadSize = bead / rows
      // get the height depends on the visibility count
      containerHeight = bead
      // get the width depends on the visibility count
      containerWidth = (columns / rows) * bead

      // FIGURE1: get the value of 4 rows when niuniu is active
      // 6 / 4 to get the value="1.5" then round it so when we scale the container it will not break apart
      if (this.$props.game === 'niuniu') {
        this.roadMap = {
          width: containerWidth + 'px',
          height: Math.round(containerHeight * 1.5) + 'px'
        }
      } else {
        this.roadMap = {
          width: containerWidth + 'px',
          height: containerHeight + 'px'
        }
      }

      if (this.$props.game === 'niuniu') {
        this.beadWrap = {
          width: beadSize + 'px',
          height: Math.round((beadSize * 1.5)) + 'px'
        }
      } else {
        this.beadWrap = {
          width: beadSize + 'px',
          height: beadSize + 'px'
        }
      }

      this.niuniuWidth = {
        width: (beadSize + .6) + 'px',
      }

      this.niuniuHeight = {
        height: Math.round(containerHeight * 1.5) + 'px',
        'font-size': (Math.round(beadSize) / 3.25) + 'px',
      }

      this.rouletteHeight = {
        height: (Math.round(beadSize) - 1.3) + 'px',
        'font-size': (Math.round(beadSize) / 2.25) + 'px',
      }

      this.roadBead = {
        width: (Math.round(beadSize) - 4) + 'px',
        height: (Math.round(beadSize) - 4) + 'px',
        'border-radius': (Math.round(beadSize) - 4) + 'px',
        'font-size': (Math.round(beadSize) / 2) + 'px',
      }

      this.isBpPp = {
        width: (Math.floor(beadSize) / 4) + 'px',
        height: (Math.floor(beadSize) / 4) + 'px',
        'border-radius': (Math.floor(beadSize) / 4) + 'px'
      }

      this.smallbead = {
        width: ((Math.round(beadSize) - 4) / 2) + 'px',
        height: ((Math.round(beadSize) - 4) / 2) + 'px',
        'border-radius': ((Math.round(beadSize) - 4) / 2) + 'px'
      }

      this.slash = {
        width: ((Math.round(beadSize) - 4) / 5) + 'px',
        height: ((Math.round(beadSize) - 4) / 2) + 'px'
      }
    },

    roadConfigInit() {
      const config = this.$props.data.config;

      console.log('Hello', this.$props.data);
      // Check if the configuration need over-ride
      if (!_.isEmpty(config)) {
        // Loop through configurations
        _.forEach(config, (road, type) => {
          if (!this[type]) return;
          _.assign(this[type], road);
        })
      }
    },

    roadSerializer(road = '') {
      const serials = {
        'bead-road': 'beadRoad',
        'big-road': 'bigRoad',
        'big-eye': 'bigEyeRoad',
        'small-road': 'smallRoad',
        'cockroach': 'roachRoad'
      };

      return _.get(serials, `[${road}]`, road);
    }
  },
  mounted () {
    this.roadInit();
    this.roadConfigInit();
  },

  watch: {
    columns: function(n,o) {
      if (n) {
        this.roadInit()
      }
    },
    rows: function(n,o) {
      if (n) {
        this.roadInit()
      }
    },
    scale: function(n,o) {
      if (n) {
        this.roadInit()
      }
    },
    game: function(n,o) {
      if (n) {
        this.roadInit()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme.scss';
@import './themeOption.scss';
$border-color: #1d2022;
// b stands for 'bacarrat'
// r stands for 'roulette'
// m stands for 'moneywheel'
// n stands for 'niuniu'
$red: linear-gradient(-45deg, rgba(#bb0e00,1) 0%,rgba(#bb0e00,1) 50%, #eb9385 100%);
$blue: linear-gradient(-45deg, rgba(#053cb0,1) 0%,rgba(#053cb0,1) 50%, #6492cd 100%);
$green: linear-gradient(-45deg, rgba(#016737,1) 0%,rgba(#016737,1) 50%, #72c29f 100%);
$r-even: linear-gradient(-45deg, rgba(#000,1) 40%, rgba(#797979,1) 120%,rgba(#797979,1) 100%,rgba(#797979,1) 100%);
$r-odd: linear-gradient(-45deg, rgba(#b90f00,1) 40%, rgba(#797979,1) 120%,rgba(#797979,1) 100%,rgba(#797979,1) 100%);
$m-jackpot: linear-gradient(-45deg, rgba(#fbb03b,1) 0%,rgba(#fbb03b,1) 50%, #fefbc4 100%);
$n-red: linear-gradient(0deg, rgba(#bb0e00,1) 0%,rgba(#bb0e00,1) 50%, #eb9385 100%);
$n-blue: linear-gradient(0deg, rgba(#053cb0,1) 0%,rgba(#053cb0,1) 50%, #6492cd 100%);
$star: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA1MCA1MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNEM0NEMDA7fQ0KPC9zdHlsZT4NCjxnIGlkPSJMYXllcl8yXzI1XyI+DQoJPGcgaWQ9IkxheWVyXzEtMl8yNl8iPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjQuMiwzLjJjMC40LTAuOCwxLjEtMC44LDEuNSwwbDYuMSwxMi4yYzAuNSwwLjksMS40LDEuNSwyLjQsMS43bDEzLjUsMmMwLjksMC4xLDEuMSwwLjgsMC41LDEuNEwzOC40LDMwDQoJCQljLTAuNywwLjgtMSwxLjgtMC45LDIuOWwyLjMsMTMuNGMwLjIsMC45LTAuNCwxLjMtMS4yLDAuOWwtMTIuMS02LjNjLTEtMC40LTIuMS0wLjQtMywwbC0xMi4xLDYuNGMtMC44LDAuNC0xLjQsMC0xLjItMC45DQoJCQlMMTIuNSwzM2MwLjEtMS0wLjItMi4xLTAuOS0yLjlsLTkuOC05LjVjLTAuNy0wLjctMC40LTEuMywwLjUtMS40bDEzLjUtMmMxLTAuMiwxLjktMC44LDIuNC0xLjdMMjQuMiwzLjJ6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';

.roadmap {
  position: relative;
  display: inline-flex;
	flex-flow: column;
  flex-wrap: wrap;
  box-sizing: border-box;

  &.is-main-road,
  &.is-big-road,
  &.is-big-eye,
  &.is-small-road,
  &.is-cockroach {
    box-sizing: content-box
  }

  &.is-big-road {
    border-left: 2px solid $border-color;
    border-bottom: 2px solid $border-color;
  }

  &.is-big-eye {
    border-left: 2px solid $border-color;
    border-bottom: 2px solid $border-color;
  }

  &.is-small-road {
    border-left: 2px solid $border-color;
  }

  &.is-cockroach {
    border-left: 2px solid $border-color;
  }

  .is-shuffling {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &[data-type='threecards'] {

    .bead-wrap {

      .is-green {

        &.is-outline {
          border: 1px solid transparent;
          background-origin: border-box;
          background-clip: content-box, border-box;
        }
      }

      .is-red,
      .is-blue,
      .is-green {

        &:after {
          font-size: inherit !important;
          color: #eedeba;
        }
      }

      .is-red {

        &.is-lucky {

          &:before {
            content: '';
            width: 100%;
            height: 100%;
            margin: 5px;
            background-image: url($star);
            background-repeat: no-repeat;
            background-position: center;
          }

          &:after {
            font-size: 0 !important;
          }
        }

        &:after {
          content: 'p'
        }
      }

      .is-blue {

        &.is-lucky {

          &:before {
            content: '';
            width: 100%;
            height: 100%;
            margin: 5px;
            background-image: url($star);
            background-repeat: no-repeat;
            background-position: center;
          }

          &:after {
            font-size: 0 !important;
          }
        }

        &:after {
          content: 'd'
        }
      }

      .is-green {

        &:after {
          content: 't'
        }
      }
    }
  }

  &[data-type='bacarrat'] {

    .bead-wrap {

      .is-red {

        &:after {
          content: 'b'
        }
      }

      .is-blue {

        &:after {
          content: 'p'
        }
      }

      .is-green {

        &:after {
          content: 't'
        }
      }
    }
  }

  &[data-type='dragontiger'] {

    .bead-wrap {

      .is-red {

        &:after {
          content: 't'
        }
      }

      .is-blue {

        &:after {
          content: 'd'
        }
      }

      .is-green {

        &:after {
          content: 't'
        }
      }
    }
  }

  &[data-row="3"] {

    .bead-wrap {

      // remove the border
      // get the top
      &:nth-child(3n + 1) {
        border-top: 0;
      }

      // get the left
      &:nth-child(-n + 3) {
        border-left: 0;
      }

      &:nth-last-child(-n + 3) {
        border-right: 0;
      }

      // get the bottom
      &:nth-child(3n) {
        border-bottom: 0;
      }
    }
  }

  &[data-row="4"] {

    .bead-wrap {

      // remove the border
      // get the top
      &:nth-child(4n + 1) {
        border-top: 0;
      }

      // get the left
      &:nth-child(-n + 4) {
        border-left: 0;
      }

      // get the right
      &:nth-last-child(-n + 4) {
        border-right: 0;
      }

      // get the bottom
      &:nth-child(4n) {
        border-bottom: 0;
      }
    }
  }

  &[data-row="5"] {

    .bead-wrap {

      // remove the border
      // get the top
      &:nth-child(5n + 1) {
        border-top: 0;
      }

      // get the left
      &:nth-child(-n + 5) {
        border-left: 0;
      }

      // get the right
      &:nth-last-child(-n + 5) {
        border-right: 0;
      }

      // get the bottom
      &:nth-child(5n) {
        border-bottom: 0;
      }
    }
  }

  &[data-row="6"] {

    .bead-wrap {

      // remove the border
      // get the top
      &:nth-child(6n + 1) {
        border-top: 0;
      }

      // get the left
      &:nth-child(-n + 6) {
        border-left: 0;
      }

      // get the right
      &:nth-last-child(-n + 6) {
        border-right: 0;
      }

      // get the bottom
      &:nth-child(6n) {
        border-bottom: 0;
      }
    }
  }

	.bead-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $border-color;
    border-left: 0;
    border-bottom: 0;
    box-sizing: border-box;

    .big-eye-content {
      display: flex;
      flex-flow: column;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: space-around;

      span {
        font-size: 0 !important;
      }
    }

    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      text-shadow: 0 0 5px rgba(#000,.35);
      color: #eedeba;
      text-transform: uppercase;

      &.is-red,
      &.is-blue,
      &.is-green {

        .is-bp,
        .is-pp {
          content: '';
          display: block;
          position: absolute;
        }

        .is-bp {
          top: 0;
          left: 0;
          background: $red;
        }

        .is-pp {
          right: 0;
          bottom: 0;
          background: $blue;
        }

        &.is-outline {
          border: 1px solid transparent;
          background-origin: border-box;
          background-clip: content-box, border-box;

          &:after {
            font-size: 0;
          }

          .is-bp {
            top: -2px;
            left: -2px;
          }

          .is-pp {
            right: -2px;
            bottom: -2px;
          }
        }

        &.is-slash {
          transform: rotate(45deg);
        }
      }
    }

    .is-red {
      background: $red;

      > img {
        display: none;
      }
    }

    .is-blue {
      background: $blue;
    }

    .is-green {
      background: $green;
    }

    .is-gray {
      background-color: #939393;
    }

    .is-jackpot {
      background: $m-jackpot;
      font-size: 0 !important;
      padding: 2px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .niuniu {
    display: flex;
    flex-direction: column;
    border-left: 1px solid $border-color;

    &.static {
      min-height: 100%;
      border-left: 0;
      font-size: 100% !important;

      > li {
        padding: 10px 7px;
        background: $n-blue;

        &:first-child {
          background: $n-red;
        }
      }
    }

    > li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid $border-color;


      &:first-child {


        > span {
          white-space: pre-wrap;
          border-bottom: 0;


          + span {
            display: none;
          }
        }
      }

      &:last-child {
        border-bottom: 0;
      }

      > span {
        display: flex;
        flex: 1;
        justify-content: center;
        flex-direction: column;
        text-transform: uppercase;
        background-color: #252525;
        white-space: pre-wrap;
        border-bottom: 1px solid $border-color;
        font-size: 80%;

        + span {
          background-color: transparent;
          border-bottom: 0;
          font-size: 100%;

          &.is-win {
            background-color: #053cb0;

            &:before {
              content: "WIN"
            }
          }
        }
      }
    }
  }

  .roulette {
    $odds: 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36;
    $evens: 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35;
    $lows: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18;
    $highs: 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36;
    // $series58: 5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36;
    // $orphans: 1, 6, 9, 14, 17, 20, 31, 34;
    // $series023: 2, 4, 7, 18, 19, 21, 22, 25, 28, 29;
    // $zerospiels: 0, 3, 12, 15, 26, 32, 35;

    display: flex;
    border: 1px solid $border-color;
    border-left: 0;
    border-right: 0;
    border-top: 0;

    &:first-child {
      border-top: 0;

      > li {

        &:first-child {
          border-top-left-radius: 8px;
        }
      }
    }

    &:last-child {
      border-bottom: 0;

      > li {

        &:first-child {
          border-bottom-left-radius: 8px;
        }
      }
    }

    > li {
      display: inline-flex;
      flex: 1 0 auto;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-weight: 700;
      color: #eedeba;
      border-left: 1px solid $border-color;

      @each $even in $evens {

        &[data-numbers="#{$even}"]:first-child {
          background: $r-even;

          &:after {
            content: attr(data-numbers);
          }
        }

        &[data-numbers="#{$even}"]:nth-child(2):after {
          content: 'even'
        }

        &[data-numbers="#{$even}"]:last-child:after {
          content: 'black'
        }
      }

      @each $odd in $odds {

        &[data-numbers="#{$odd}"]:first-child {
          background: $r-odd;

          &:after {
            content: attr(data-numbers);
          }
        }

        &[data-numbers="#{$odd}"]:nth-child(2):after {
          content: 'odd'
        }

        &[data-numbers="#{$odd}"]:last-child:after {
          content: 'red'
        }
      }

      @each $low in $lows {
        &[data-numbers="#{$low}"]:nth-child(3):after {
          content: '1 to 18'
        }
      }

      @each $high in $highs {
        &[data-numbers="#{$high}"]:nth-child(3):after {
          content: '19 to 36'
        }
      }

      &:first-child {
        flex: 50px 0 0;
        border: 1px solid rgba(#afafaf,1);
      }

      &:nth-child(2) {
        background-color: #111111;
        flex: 80px 0 0;
      }

      &:nth-child(3) {
        flex: 110px 0 0;
      }
    }
  }
}
</style>
