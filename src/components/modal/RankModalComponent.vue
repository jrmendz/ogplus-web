<template>
  <v-slide-x-transition origin="center center">
    <div class="noc__modal rank__modal elevation-12" v-if="$store.state.rankModal" :style="{ left: this.$store.state.drawerWidth  + 'px' }">
      <div class="modal__title --is-center">{{ tt('Ranking') }}</div>
      <v-tabs fixed-tabs grow v-model="tab_rank">
        <v-tab href="#tab-1"  v-on:click="clickEff">
          {{ tt('Winning Amount') }}
        </v-tab>
        <v-tab href="#tab-2"  v-on:click="clickEff">
          {{ tt('Winning Streak') }}
        </v-tab>
      </v-tabs>
      <div class="modal__body" v-bar>
        <div>
          <v-tabs-items v-model="tab_rank">
            <v-tab-item value="tab-1">
              <table class="v-table">
                <thead>
                  <tr>
                    <th class="text-xs-center">{{ tt('No.') }}</th>
                    <th class="text-xs-center">{{ tt('Follow') }}</th>
                    <th class="text-xs-center">{{ tt('Name') }}</th>
                    <th class="text-xs-center">{{ tt('On/Offline') }}</th>
                    <th class="text-xs-center">{{ tt('Amount') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i, index) in getWinningAmount" :key="index">
                    <td class="text-xs-center --is-number">{{ index + 1 }}</td>
                    <td v-on:click="AddUserFriends(i.user_id)" class="text-xs-center --has-border-right pa-2 cursor"><v-icon color="blue">{{addcircle(i.user_id, i.nickname)}}</v-icon></td>
                    <td class="text-xs-center">{{i.nickname}}</td>
                    <td class="text-xs-center">{{i.logged === 1 ? tt('Online'): tt('Offline')}}</td>
                    <td class="text-xs-center --is-number">{{i.win_loss | toMoney()}}</td>
                  </tr>
                </tbody>
              </table>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <table class="v-table">
                <thead>
                  <tr>
                    <th class="text-xs-center">{{ tt('No.') }}</th>
                    <th class="text-xs-center">{{ tt('Follow') }}</th>
                    <th class="text-xs-center">{{ tt('Name') }}</th>
                    <th class="text-xs-center">{{ tt('On/Offline') }}</th>
                    <th class="text-xs-center">{{ tt('Wins') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i, index) in getWinningStreak" :key="index">
                    <td class="text-xs-center --is-number">{{ index + 1 }}</td>
                    <td v-on:click="AddUserFriends(i.user_id)" class="text-xs-center --has-border-right pa-2 cursor"><v-icon color="blue">{{addcircle(i.user_id, i.nickname)}}</v-icon></td>
                    <td class="text-xs-center">{{i.nickname}}</td>
                    <td class="text-xs-center">{{i.logged === 1 ? tt('Online'): tt('Offline')}}</td>
                    <td class="text-xs-center --is-number">{{i.win_loss | toMoney()}}</td>
                  </tr>
                </tbody>
              </table>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </v-slide-x-transition>
</template>

<script>
import ModalMixins from '@/library/Modals.js'
export default {
  mixins: [ ModalMixins ]
}
</script>

<style lang="scss">
.rank__modal {
  @include position(absolute, rem(16px), $index: 999);
  @include rem((
    top: 16px,
    width: 600px,
    border-radius: 7px,
  ));
  will-change: transform, opacity;

  .v-tabs__slider-wrapper {
    transition-delay: initial;
    z-index: inherit !important;
  }

  .divider {
    width: 90%;
    height: 2px;
  }

  .lobby__table {
    transform: scale(.8);
    @include rem(bottom, -5px);

    .v-tabs__slider {
      transform: skewX(-$skew) perspective(0);
    }

    .v-tabs__container {
      padding-top: 0;
    }

    .v-tabs__div {

      .tab__holder {
        transform: skewX($skew) perspective(0);
      }

      a,
      .v-tabs__item--disabled {
        transform: skewX(-$skew) perspective(0);
      }

      a:before {
        display: none;
      }
    }
  }

  // .v-tabs__wrapper {
  //   @include rem(margin-left, 34px);
  // }

  $sidebox: 35px;

  .v-tabs__div {

    a {
      @include rem((
        min-width: 150px,
        max-width: 150px,
        font-size: 16px,
        // margin: 0 24px
      ));
      text-transform: capitalize;

      &:not(.v-tabs__item--active) {
        opacity: .5 !important;
      }
    }
  }

  .v-tabs__slider-wrapper {
    @include rem((
      width: 150px !important
    ));
    // transform: translateX(24px);
  }

  .v-tabs__slider {
    @include rem((
      height: 50px
    ));
  }

  .v-table {
    table-layout: fixed;
    background-color: transparent !important;
    border-collapse: collapse;

    thead {

      tr {
        @include rem(height, 40px);
      }
    }

    th,
    td {
      @include rem(padding, 0 10px !important);

      &:first-child {
        @include rem(width, 50px);
      }
    }
  }

  .modal__body {
    @include rem(height, 590px);
    overflow: hidden;
    // @extend %placeholder;

    .v-window-item {
      @include rem(height, 525px !important);
    }

    .paginator {
      @include position(absolute, $bottom: -55px);
      width: 100%
    }

    .v-table__overflow {
      overflow: hidden;
    }
  }
}
</style>

