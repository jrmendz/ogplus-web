<template>
  <div v-if="!isLobby" class="right-sidebar" :class="[$store.state.goodTipsModal || $store.state.sideBetConfirmBets.length ? 'active' : '', !isLobby ? (_AvatarModal ? 'active' : '') : '']">
    <!-- _AvatarModal -->
    <UserProfileComponent
      hasAvatar
      hasNickname
      hasBalance
      symbol="dollar_icon"
      :image-src="$store.state.userinfo.avatar"
      :username="nickname"
      :amount="balance"
      image-size="44"
    />
    <ul class="list__ui --is-goodtips cursor" @click="goodTipsToggle" style="margin-top: 15px">
    <!--  <li class="--is-icon --is-not-clickable"> -->
      <li>
        <div class="svg-holder">
          <svgicon name="goodtips" height="24" scale="2" color="#fff"></svgicon>
        </div>
      </li>
      <li>
        {{ tt('Good Tips') }}
      </li>
    </ul>
    <div class="filter__content">
      <v-layout column>
        <v-flex>
          <v-card v-for="table in finalTable" :key="table.tableNumber" :class="table.gameName">
            <CardGames v-if="['baccarat', 'dragontiger', 'moneywheel', 'roulette'].indexOf(table.gameName) > -1" :table="tables[table.tableNumber]" :hasGoodTips="table.hasGoodTips"/>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Sidebars from '@/library/Sidebars.js'
import ModalMixins from '@/library/Modals.js'
import UserProfileComponent from '@/components/sidebar/UserProfileComponent'
export default {
  mixins: [ Sidebars, ModalMixins ],
  components: {
    UserProfileComponent
  },
  methods: {
    goodTipsToggle: function () {
      let _s = this
      // _s.$store.state.goodTipsModal = !_s.$store.state.goodTipsModal
      _s.$store.set('goodTipsModal', !_s.$store.get('goodTipsModal'))
      _s.$store.state.avatarModal = false
    }
  },
  computed: {
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    }
  }
}
</script>

<style lang="scss">
$animation-timing: 0.5s;

.right-sidebar {
  @include position(fixed, $right: 0, $index: 600);
  height: 100%;
  @include rem(width, 230px);
  transform: translateX(150px);
  transition: transform .3s $cubic-bezier;
  background-color: rgba($base-color, .75);
  box-shadow: -5px 0 10px rgba($base-color, .75);
  will-change: auto;

  &.active,
  &:hover {
    z-index: 999;
    transform: translateX(0);

    .sidebar__card {
      @include rem((
        width: 210px,
        height: 188px,
        margin: 0 5px 25px,
      ));

      &.moneywheel {
        @include rem(height, 215px);
      }

      .inner-wrapper {
        opacity: 1;
      }

      .mini-tile {
        opacity: 0;
      }
    }

    .--is-goodtips {

      &:after {
        width: 100%;
      }

      li {

        &:last-child {
          opacity: 1;
        }
      }
    }
  }

  .--is-goodtips {
    position: relative;
    @include rem((
      margin-left: 10px,
      margin-right: 10px
    ));
    color: $base-color-inverted;

    &:after {
      content: '';
      position: absolute;
      @include box(60px);
      @include rem((
        top: 0,
        left: 0,
        border: 1px solid rgba($base-color-inverted, .5),
        border-radius: 2px
      ));
      transition: width $animation-timing $cubic-bezier;
      will-change: width;
    }

    li {
      padding: 0;

      &:first-child {
        flex: none;
        justify-content: center;
        @include box(60px);
      }

      &:last-child {
        justify-content: center;
        @include rem((
          padding: 10px 0,
          font-size: 18px
        ));
        transition: opacity $animation-timing $cubic-bezier;
        will-change: opacity;
        opacity: 0;
      }
    }
  }

  .sidebar__card {
    position: relative;
    @include rem((
      width: 62px,
      height: 62px,
      margin: 0 5px 15px,
      border: 1px solid transparent,
      border-radius: 2px !important
    ));
    background-image: linear-gradient(to bottom, rgba($base-color,0) 0%,rgba($base-color,0) 50%,rgba($base-color,0.75) 100%);
    transition: all $animation-timing $cubic-bezier;

    will-change: height, width;

    &.--has-goodtips {
      animation: pulse 2s infinite alternate;
    }

    .mini-tile {
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      @include box(60px);
      @include rem((
        border: 1px solid rgba($base-color-inverted, .5),
        border-radius: 2px
      ));
      transition: opacity $animation-timing $cubic-bezier;
      will-change: opacity;

      ul {
        display: flex;
        flex-flow: column;
        align-items: center;

        li {

          &:first-child {
            @include rem((
              width: 30px,
              margin: 0 7px,
              border-radius: 10px
            ));
            text-align: center;
            background-color: rgba(#242424, .50);
            color: $green-text;
          }

          &:last-child {
            @include rem(font-size, 18px);
            font-weight: 500;
            color: $gold-text;
          }
        }
      }
    }

    .inner-wrapper {
      opacity: 0;
      @include position(absolute,0,0);
      width: 100%;
      height: 100%;
      padding-bottom: 1px;
      @include rem(border, 1px solid rgba($base-color-inverted, .5));
      transition: opacity $animation-timing $cubic-bezier;
      overflow: hidden;
      will-change: opacity;
    }

    &:hover {
      box-shadow: 0 0 7px rgba($base-color-inverted, .35);
    }

    .notification {
      width: 100%;
      @include rem(padding, 15px 0);
      @include position(absolute, $left: 0, $translate-vertical: true);
      pointer-events: none;
      user-select: none;

      span {
        @include rem(font-size, 14px);
      }
    }

    &.emcee {
      > div {
        overflow: inherit;

        &:before {
          content: '';
          @include position(absolute,rem(-3px),0,0);
          @include rem(height, 3px);
          background-color: lighten($base-color, 5%);
        }
      }
    }

    &.moneywheel {

      .btn__group {
        @include rem(margin-top, 4px !important);
      }

      .card__body {

        .table__wrapper {

          .road {
            transform: scale(.72);
            transform-origin: top left;
            @include rem((
              width: 285px,
              margin-bottom: -50px,
            ));
          }
        }
      }
    }

    .card__header {
      display: flex;
      align-items: center;
      @include rem(height, 40px);

      li {
        flex: 1 1 auto;

        &.--is-supersix {
          width: auto;
          @include text-truncate(calc(100% / 2.4));
        }

        marquee {
          @include position(relative, rem(2px));
          text-transform: uppercase;
        }

        &:first-child {
          flex: 0 0 30px;
          text-align: center;
          color: $gold-text;
        }

        &.--is-shown {
          flex: 0 1 auto;
        }

        &:last-child {
          flex: 0 0 30px;
          @include rem((
            margin: 0 7px,
            border-radius: 10px
          ));
          text-align: center;
          background-color: rgba(#242424, .50);
          color: $green-text;
        }
      }
    }

    .card__body {
      position: relative;
      height: calc(100% - 40px);

      .road {
        transform: scale(.96);
        transform-origin: top left;
        @include rem(margin-bottom, -2px);

        .--is-shuffling {

          .svg-holder {
            margin-top: 15px;
            padding-bottom: 15px;
            margin-right: 0 !important;
            width: initial;
            height: initial;
          }
        }


        .table__road {

          &:after {
            display: none;
          }
        }

        .big__road {

          &:before {
            border-bottom: 0;
          }
        }
      }

      .v-btn {

        &.v-btn--outline {
          border-color: transparent;

          .v-btn__content  {
            @include rem((
              top: -2px,
              font-size: 16px
            ));
            font-weight: normal;
            color: $green-text;
          }

          &:hover {

            &:before {
              background-color: transparent !important;
            }
          }
        }

        &.v-btn--block {
          margin: 0 !important;
        }
      }
    }

    .--is-shuffling {
      @include position(absolute,0,0,0,0,3);
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      background-color: rgba($base-color, .9);
      color: $base-color-inverted;

      .svg-holder {
        @include rem(margin-bottom, 25px);
        animation: tiktok .25s $cubic-bezier infinite alternate;
      }
      .svg-holder-mw {
        @include rem(margin-bottom, 5px);
        width: rem(40px);
        height: rem(40px);
        background-image: url('https://static.oriental-game.com/image/moneywheel/moneywheel.png');
        background-position: center;
        background-size: contain;
        animation: rotate .25s $cubic-bezier infinite alternate
      }
    }

    .--mw-win-sidebar {
      background-image: url('https://static.oriental-game.com/image/moneywheel/winning-result-bg.png');
      background-size: rem(130px);
      background-position: center;

      .--mw-has-result {
        height: rem(40px);
        font-size: rem(32px);
        @include position(absolute, $top: rem(30px));
      }

      .--mw-has-amount {
        font-size: rem(16px);
        @include position(absolute, $bottom: rem(40px));
      }

      .--mw-has-multi-result {
        font-size: rem(12px);
        @include position(absolute , $bottom: rem(62px));
      }

      .--mw-has-og-result {
        @include position(absolute, $top: rem(40px));
        height: 15%;
        width: 100%;
        background-image: url('/static/svg/BeadOGRoad.svg');
        background-position: center;
      }
    }

    .--mw-win-multiplier {
      background-image: url('https://static.oriental-game.com/image/mw_multiplier_bg.png');
      background-size: 70%;
      background-position: center;

      .winning-card-box {
        @include position(absolute, 5px);
        text-align: center;
      }

      .multiplier-box {
        position: relative;
        @include rem((
          padding: 5px 7px,
          font-size: 18px,
          border-radius: 10px
        ));
        margin: 0 auto;
        text-align: center;
        font-weight: 500;
        background-color: rgba($base-color, 0.7);
      }
    }

    .--has-result {
      @include position(absolute,0,0,0,3px,2);
      background-color: $base-color;

      .list__ui {

        li {
          padding-top: 0;
          padding-bottom: 0;

          span {
            @include rem(font-size, 30px);

            &:first-child {
              @include rem(margin-right, 5px);
            }
          }
        }
      }

      .front,
      .back {
        position: absolute;
        @include box(100%);
        backface-visibility: hidden;
        margin: auto;

      }

      .front {
        background-image: url('https://static.oriental-game.com/image/squeezeCard.png');
        background-size: contain;

        &.--is-redbg {
          background-image: url('https://static.oriental-game.com/image/squeezeCardRed.png');
        }
      }

      .card__deck__result {
        display: flex;
        justify-content: center;

        li {
          flex: 1 1 auto;
          text-align: center;

          &:first-child {

            > div {

              &.--is-horizontal {
                transform: rotate(-90deg);
              }
            }
          }

          > div {
            display: inline-block;
            @include box(rem(36px), rem(54px));
            @include rem(border-radius, 5px);
            overflow: hidden;
            font-size: 0;
            @include rem(margin,1.5px);

            &.--is-horizontal {
              display: block;
              @include rem(margin, -15px auto 0);
              transform: rotate(90deg);
            }
          }
        }
      }
    }

    .--is-side-betting {
      @include position(absolute,0,0,0,3px,100);
      background-color: $base-color;

      .side__betting__area {
        @extend %clearfix;

        &.--is-money-wheel {
          @include rem(height, 128px);
        }

        .--betting-sidebar {
          @include position(absolute, $top: rem(21px));
          width: 100%;
          margin: auto;
          padding: 0;
          left: 0;
          color: $base-color;
        }

        .--mw-ratio {
          @include position(absolute, $top: rem(0px));
        }

        .--sb-ratio {
          opacity: .5;
        }

        .--mw-font-size {
          font-size: 16px
        }

        img {
          @include position(absolute, $top: rem(10px), $translate-horizontal: true);
        }

        &.--is-bacc-sb{

          li {
            &:nth-child(5) {
              display: none;
            }

            // &:nth-child(4),
            // &:last-child {
            //   img {
            //     @include position(absolute, $top: rem(10px),$left: 35%);
            //   }
            // }
          }
        }

        // &.--is-dt-sb{
        //   // img {
        //   //   @include position(absolute, $top: rem(10px),$left: 27%);
        //   // }
        //   li {
        //     &:nth-child(2),
        //     &:last-child {
        //       img {
        //         @include position(absolute, $top: rem(10px),$left: 35%);
        //       }
        //     }
        //   }
        // }

        &.--is-dragontiger {

          li {
            &:first-child {
              float: none;
              display: block;
              margin: 0 auto;
              @include rem(border, 1px solid rgba($border-color, .5));
              border-top: 0;
              border-bottom: 0;
            }

            &:nth-child(2) {
              @include rem((
                border-top: 1px solid rgba($border-color, .5),
                border-right: 1px solid rgba($border-color, .5)
              ));
              border-left: 0;
              border-bottom: 0;
            }

            &:nth-child(2),
            &:last-child {
              width: calc(100% / 2);
            }

            &:last-child {
              @include rem(border-top, 1px solid rgba($border-color, .5));
              border-bottom: 0;
            }
          }
        }

        &.--is-money-wheel {

          li {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: calc(100% / 6) !important;
            @include rem(border-right, 1px solid rgba($border-color, .5));
            border-left: 0 !important;

            @for $i from 1 through 6 {
              &:nth-child(#{$i}) {
                border-bottom: rem(1px) solid rgba($border-color, .5);
              }
            }

            &:nth-child(2) {
              border-top: 0;
            }

            &:nth-child(6),
            &:last-child {
              border-right: 0;
            }
          }

          &.--is-dragon {

            li {
              width: calc(100% / 3) !important;
              border-bottom: 0;
              @include rem(font-size, 20px);

              @for $i from 1 through 3 {
                &:nth-child(#{$i}) {
                  @include rem(border-bottom, 1px solid rgba($border-color, .5));
                }
              }

              &:nth-child(3) {
                border-right: 0;
              }

              &:nth-child(4) {
                @include rem(border-right, 1px solid rgba($border-color, .5));
              }

              &:last-child {
                @include rem(padding, 10px);

                img {
                  max-width: 100%;
                }
              }
            }
          }
        }

        &.--is-super6 {

          li {
            width: calc(100% / 3) !important;
            &:nth-child(4) {
              border-right: 0;
            }
            &:nth-child(5) {
              display: inline;
              @include rem((
                border-left: 1px solid rgba($border-color, .5),
                border-right: 1px solid rgba($border-color, .5)
              ));
            }
          }
        }

        li {
          position: relative;
          float: left;
          @include box(calc(100% / 3), rem(54px));
          text-align: center;
          overflow: hidden;
          cursor: pointer;

          span {
            @include position(relative,rem(4px));
            @include rem(font-size, 10px);
          }

          p {
            @include position(absolute, $translate-horizontal: true, $bottom: rem(15px));
            margin-bottom: 0;
            @include rem(font-size, 16px);
            text-transform: uppercase;
          }

          &:first-child {
            @include rem(border-bottom, 1px solid rgba($border-color, .5));
          }

          &:nth-child(2) {
            @include rem((
              border-left: 1px solid rgba($border-color, .5),
              border-right: 1px solid rgba($border-color, .5),
              border-bottom: 1px solid rgba($border-color, .5)
            ));
          }

          &:nth-child(3) {
            @include rem(border-bottom, 1px solid rgba($border-color, .5));
          }

          &:nth-child(4) {
            @include rem(border-right, 1px solid rgba($border-color, .5));
          }

          &:nth-child(4),
          &:last-child {
            width: 50%;
          }
        }
      }

      .btn__group {
        @include rem((
          margin-top: 2.5px,
          margin-left: 10px,
          margin-right: 10px
        ));
      }

      .v-btn {
        @include rem(margin, 6px 0);

        &.v-btn--outline {
          border-color: currentColor;
        }

        .v-btn__content  {
          @include rem(font-size, 10px);
          color: $base-color-inverted;
        }
      }
    }
  }
}


.filter__content {
  @include rem(padding, 15px 5px 5px);
  // height: calc(980px - 140px);
  @extend %placeholder;
  overflow-y: auto;

  .v-card {
    background-color: transparent !important;
    @include rem(border-radius, 5px);
    box-shadow: none;
  }

  .v-tabs {
    @include position(relative, $index: 2);
    @include rem(margin-bottom, -3px);
  }

  .v-tabs__div {
    position: relative;
    @include rem((
      border: 3px solid $base-color,
      border-top-radius: 3px
    ));
    border-bottom: 0;

    a {
      background-color: #00308c;
      color: $gold-text;

      &:not(.v-tabs__item--active) {
        opacity: 1;
        color: $base-color-inverted;

        > div {
          background-color: lighten($base-color, 9%);
        }
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        @include position(absolute,0,0,0,0);
        @include rem((
          margin: 3px,
          border-top-radius: 2.5px
        ));
        margin-bottom: 0;
        background-color: lighten($base-color, 5%);
      }
    }

    &:first-child {
      @include rem(margin-right, 5px);
    }
  }
}
</style>
