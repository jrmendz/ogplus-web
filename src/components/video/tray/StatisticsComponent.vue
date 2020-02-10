<template>
  <div class='statistics'>
    <template v-if="mini">
      <div :class='[{"--is-mini": mini}]' v-for="(stats, i) in data" :key="i">
        <div :class="'--is-'+stats.className">{{stats.code}}</div>
        <div>{{calculate(stats.totalBet, stats.userCount)+'%'}}</div>
        <div :class="stats.className+'__stats'">
          <div class="perc" :style="{width: calculate(stats.totalBet, stats.userCount)+'%'}"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(stats, i) in data" :key="i" :class="stats.className+'__stats'">
        <div class="perc" :style="{width: calculate(stats.totalBet, stats.userCount)+'%'}"></div>
        <ul>
          <li>{{stats.code}}</li>
          <li>{{stats.userCount}}</li>
          <li>{{stats.totalBet}}</li>
          <li>{{calculate(stats.totalBet, stats.userCount)+'%'}}</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    mini: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    calculate (totalBet, userCount) {
      let totalVal = (totalBet / 100) / userCount
      return Math.round(totalVal * 10) / 10
    }
  }
}
</script>

<style lang="scss" scoped>
$class: '.statistics';

#{$class} {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: space-around;
  @include rem((
    width: 300px
  ));

  .--is-mini {
    display: flex;
    align-items: center;
    @include rem((
      padding: 0 10px
    ));

    div {

      &:first-child {
        flex: 1 0 30px;
        @include rem(font-size, 16px);
        text-align: center;
        font-weight: 700;
      }

      &:nth-child(2) {
        flex: 1 0 70px;
        text-align: right;
        @include rem(font-size, 16px);
        @include rem(padding-right, 10px);
        color: $base-color-inverted;
      }
    }

    .blue__stats,
    .green__stats,
    .red__stats,
    .star__stats {
      @include rem(height, 10px);
      margin-bottom: 0;
    }
    
    .--is-star {
      @include rem(font-size, 24px !important);
      line-height: 0;
    }
  }
  
  ul {
    position: relative;
    display: flex;
    color: $base-color-inverted;
    
    li {
      display: flex;
      flex: 1 0 0;
      height: 30px;
      justify-content: center;
      align-items: center;
      
      &:first-child {
        flex: 40px 0 0;
      }
      
      &:nth-child(2) {
        flex: 30px 0 0
      }
      
      &:last-child {
        justify-content: flex-end;
        padding-right: 15px;
      }
    }
  }
  
  .blue__stats,
  .green__stats,
  .red__stats,
  .star__stats {
    position: relative;
    width: 100%;
    @include rem((
      height: 30px,
      margin-bottom: 10px,
      border-radius: 30px
    ));
    overflow: hidden;
  }
  
  .blue__stats {
    background-color: rgba($dark-blue, .5);
    
    .perc {
    background-color: $dark-blue;
    }
  }
  
  .green__stats {
    background-color: rgba($dark-green, .5);
    
    .perc {
    background-color: $dark-green;
    }
  }
  
  .red__stats {
    background-color: rgba($dark-red, .5);
    
    .perc {
    background-color: $dark-red;
    }
  }

  .star__stats {
    background-color: rgba($gold-text, .5);
    
    .perc {
    background-color: $gold-text;
    }
  }
  
  .perc {
    position: absolute;
    height: 100%;
    border-radius: 30px;
  }
}
</style>