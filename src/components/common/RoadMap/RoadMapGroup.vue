<template >
  <div class="road-wrapper" :style="{'top': gameType === 'niuniu' ? '8px' : ''}">
    <div class="is-shuffling" v-if="shuffle">Shuffling...</div>
    <road :rows="rows" :columns="cols" :data="data"  :scale="scaleBy / .98" :game="gameType" :road="roadType"></road>
    <template v-if="gameType === 'bacarrat' || gameType === 'dragontiger'">
      <template v-if="showDetails">
        <div class="road-group">
          <road :rows="rows" :columns="cols * 2" :scale="scaleBy / 2" :game="gameType" road="big-road"></road>
          <road :rows="rows / 2" :columns="cols * 2" :scale="scaleBy / 2" road="big-eye"></road>
          <div class="road-group">
            <road :rows="rows / 2" :columns="cols" :scale="scaleBy / 2" road="small-road"></road>
            <road :rows="rows / 2" :columns="cols" :scale="scaleBy / 2" road="cockroach"></road>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import road from './road'
export default {
  name: 'road-map-group',
  components: {
    road
  },
  props: {
    rows: {
      type: Number,
    },
    cols: {
      type: Number,
    },
    data: {
      type: Object
    },
    scaleBy: {
      type: Number,
      default: 1
    },
    shuffle: {
      type: Boolean,
      default: false
    },
    showDetails: {
      type: Boolean,
      default: true
    },
    gameType: {
      type: String,
      default: "baccarat",
      validator(x) {
        return ["baccarat", "dragontiger", "moneywheel", "roulette", "niuniu", "threecards"].includes(x);
      }
    },
    roadType: {
      type: String,
      default: "",
      validator(x) {
        return ["bead-road", "big-road", "big-eye", "small-road", "cockroach"].includes(x);
      }
    }
  }
}
</script>

<style lang="scss">
@import './theme.scss';
.road-wrapper {
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #1d2022;
  overflow: hidden;
  border-radius: 10px;

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
    font-size: $font-size * 2;
  }

  > .road-group {
    display: inline-flex;
    flex-wrap: wrap;
    flex-flow: column;

    > .road-group {
      display: inline-flex;
      flex-flow: row;
      margin-bottom: .5px;

      > .roadmap {
        margin-top: 0;

        + .roadmap {
          margin-left: -2px;
        }
      }
    }
  }
}
</style>
