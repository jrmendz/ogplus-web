<template>
  <!-- <div class="table__info" :style="[ !toggle ? '' : { '-moz-transform': 'translateY(-'+ this.getHeight() +')', '-webkit-transform': 'translateY(-'+ this.getHeight() +')', transform: 'translateY(-'+ this.getHeight() +')' } ]"> -->
  
  <div class="table__info">
    <ul ref="tableInfo">
      <li>
        <span>{{ currentTableIndex }}</span>
        <span>{{ tt((table.name==='DRAGON') ? 'MW-DRAGON' : table.name) | formatTblName }}</span>
      </li>
      <li>
        <span>{{ tt('Shoe No:') }}</span>
        <span>{{ table.shoeGame }}</span>
      </li>

      <!-- <li style="color:white">
        <button @click="$store.state.tablelist['P8'].status = 'betting'">Betting</button>&nbsp;
        <button @click="$store.state.tablelist['P8'].status = 'dealing'">Dealing</button>
      </li> -->
      <li v-for="(info, i) in getBetLimits()" :key="i">
        <span>{{ tt(info.name) }}</span>
        <animated-number class="--is-number" :value="info.value" :formatValue="formatToPrice"/>
      </li>
      <!--<li v-for="(info, k) in getTotalBets()" :key="'total_' + k">-->
        <!--<span>{{ tt(info.name) }}</span>-->
        <!--<animated-number class="&#45;&#45;is-number" :value="info.total_bet" :formatValue="formatToPrice"/>-->
      <!--</li>-->
    </ul>
    <!-- <label @click="toggle = !toggle">
      <template v-if="toggle">
        {{ tt('Show Information') }}
      </template>
      <template v-else>
        {{ tt('Hide Information') }}
      </template>
    </label> -->
    <div class="balance" :style="heightStyle">
      <div class="svg-holder" style="float: left; width: 0; padding-right: 30px; margin-top: 7px; margin-left: -8px">
        <svgicon name="dollar_icon" height="30" scale="1.5" color="url(#gradient)"></svgicon>
      </div>
      <animated-number class="--is-number" :value="balance" :formatValue="formatToPrice"/>
      <!--<animated-number class="&#45;&#45;is-number" :value="$store.state.betTableGlobal.projectedAmount" :formatValue="formatToPrice"/>-->
<!--      <span class="balance__result" :class="table.status === 'default' ? 'win' : 'hide'">-->
<!--        <template v-if="result > 0">-->
<!--          <span>+{{ result | toMoney() }}</span>-->
<!--        </template>-->
<!--      </span>-->
    </div>
  </div>
</template>

<script>
import TableInfo from '@/library/TableInfo'
export default {
  mixins: [ TableInfo ]
}
</script>

<style lang="scss">
.streamer__ingame {

  .table__info ul li span {
    @include rem(font-size, 13px);
  }
}

.table__info {
  @include position(fixed, 0, $index: 200);
  @include rem((
    min-width: 340px,
    padding: 10px,
  ));
  background-image: linear-gradient(to right, rgba($base-color,0.75) 0%,rgba($base-color,0) 75%,rgba($base-color,0) 100%);
  user-select: none;

  .balance {
    position: absolute;
    left: 0;
    @include rem((
      padding: 10px 16px,
    ));
    color: $base-color-inverted;
    //background-image: linear-gradient(to right, rgba($base-color,0.65) 0%,rgba($base-color,0) 50%,rgba($base-color,0) 100%);
    background-color:rgba($base-color, .75);
    transform: translateY(25px);
    border-radius: 9px;
    
    span {
      float: left;
      @include rem((
        font-size: 24px
      ));

      + span {
        font-weight: 500;
      }
    }

    .balance__result {
      @include position(absolute, $right: 0, $index: 100);
      color: $green-text;
      padding-right: 100%;
      box-sizing: content-box;
      will-change: transform, opacity;
      opacity: 0;

      &.win {
        transform: translateX(100%);
        opacity: 1;
      }

      &.hide {
        transition: opacity .2s, transform .3s linear;
        transform: translateX(-100%);
        opacity: 0;
      }
    }
  }

  ul {
    display:none;
    @extend %clearfix;

    li {
      // @include display-flex;
      display: flex;

      &:first-child {
        display:none;
        @include rem((
          margin-top: 10px,
          margin-bottom: 15px
        ));

        span {
          display: inline-block;
          flex: 0;
          @include rem((
            font-size: 18px,
          ));
          font-weight: 500;
        }
      }

      span {
        display: inline-flex;
        flex: 1 0 70%;
        color: $base-color-inverted;
        @include rem((
          padding: 3px 7px,
          font-size: 16px
        ));
        text-shadow: rem(1px) rem(1px) rem(3px) rgba($base-color, .5);

        &:nth-child(odd) {
          color: $gold-text;
        }

        &:nth-child(even) {
          // @include flex(1 0 30%);
          flex: 1 0 30%;
        }
      }
    }
  }
}
</style>

