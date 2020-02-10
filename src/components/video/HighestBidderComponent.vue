<template>
  <ul class="bidder">
    <!--  {{cat.bet_place}} {{cat.user_id}} {{cat.avatar}} {{cat.nickname}} {{cat.bet_amount}}-->
    <li v-for="(cat, i) in $store.state.promptCat" :key="i" :class="[cat.bet_place, tblStatus === 'betting' ? 'animated slideInRight' : '', tblStatus === 'dealing' ? 'animated slideOutRight' : '']">
      <div class="bidder__wrapper">
        <v-avatar size="30">
          <v-img :src="cat.avatar ? cat.avatar : $store.state.errorImg" aspect-ratio="1" contain transition="scale-transition" v-on:click="clickEff">
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="accent__color"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-avatar>
        <div class="bidder__content" v-if="['en', 'jp', 'ko', 'id', 'th','vn'].indexOf($store.state.locale) > -1">
          <span class="username">{{ cat.nickname }}</span>
          <!-- <b>Highest Bidder</b> -->
          <div class="svg-holder" style="display: inline-block; margin-left: 7px; margin-right: 7px">
            <svgicon :name="['dragon','tiger'].indexOf(cat.bet_place) > -1 ? cat.bet_place === 'dragon' ? 'player': 'banker' : (cat.bet_place).replace(/_/g, ' ').toLowerCase()" height="36" scale="1.5" original></svgicon>
          </div>
          <span :class="cat.bet_place"><b>{{ (cat.bet_place).replace(/_/g, ' ').toUpperCase() }}</b></span>
          <div class="svg-holder" style="display: inline-block; margin-left: 5px; margin-right: 5px">
            <svgicon name="moneybag" height="36" scale="1.2" original></svgicon>
          </div>
          <span class="amount">{{ cat.bet_amount | toMoney() }}</span>
        </div>
        <div class="bidder__content" v-else>
          <span class="username">{{ cat.nickname }}</span>是<span :class="cat.bet_place"><b>{{ tt(cat.bet_place).replace(/_/g, ' ').toUpperCase() }}</b></span>最高出价者&nbsp;对于&nbsp;<span class="amount">{{ cat.bet_amount | toMoney() }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import HighestBidder from '@/library/HighestBidder.js'
export default {
  mixins: [ HighestBidder ]
}
</script>

<style lang="scss">
.bidder {
  @include position(absolute, $right: 0, $bottom: 270px);

  li {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: $base-color-inverted;
    animation-duration: .3s;
    @include rem(margin-bottom, 10px);

    &:last-child {
      margin-bottom: 0;
    }

    &.player,
    &.dragon {

      .bidder__wrapper {
        border-color: $dark-blue
      }
    }

    &.banker,
    &.tiger {

      .bidder__wrapper {
        border-color: $dark-red
      }
    }

    &.tie {

      .bidder__wrapper {
        border-color: $green-text
      }
    }

    .bidder__wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @include rem((
        padding: 5px 5px 5px 10px,
        border-left: 5px solid transparent
      ));
    }

    .bidder__content {
      display: flex;
      @include rem((
        margin-left: 10px,
        font-size: 14px
      ));

      span {
        @include rem(font-size, 14px)
      }

      .username {
        font-weight: bold;
      }

      .amount {
        color: $gold-text;
        font-weight: bold;
      }

      .player,
      .dragon {
        color: $dark-blue;
        text-transform: uppercase;
        font-weight: bold;
      }

      .banker,
      .tiger {
        color: $dark-red;
        text-transform: uppercase;
        font-weight: bold;
      }

      .tie {
        color: $green-text;
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }
}
</style>

