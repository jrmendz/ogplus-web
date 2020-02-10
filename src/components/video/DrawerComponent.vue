<template>
   <ul class="drawer" :class="[gettablestatus(getStatus) !== '--is-betting' ? '--show-result' : '--is-betting', gettablestatus(getStatus) === '--is-shuffling' ? '--is-shuffling' : '']">
    <LeftDrawerComponent />
    <template v-if="getBettingtable == 'baccarat' || getBettingtable == 'dragontiger'">
      <RightDrawerComponent style="left: 612px"/>
    </template>
    <template v-else>
      <RightDrawerComponent v-if="!getBettingtable == 'moneywheel'"/>
    </template>
    <CenterDrawerComponent
      :class="getBettingtable == 'baccarat' ? 'is-baccarat' : getBettingtable == 'dragontiger' ? 'is-dragontiger' : getBettingtable == 'moneywheel' ? 'is-moneywheel' : ''"
      :betting-area="getBettingtable == 'roulette'"
    />
  </ul>
</template>

<script>
import LeftDrawerComponent from '@/components/video/drawer/LeftDrawerComponent'
import CenterDrawerComponent from '@/components/video/drawer/CenterDrawerComponent'
import RightDrawerComponent from '@/components/video/drawer/RightDrawerComponent'
import ChannelDrawerComponent from '@/components/video/drawer/ChannelDrawerComponent'
export default {
  components: {
    LeftDrawerComponent,
    CenterDrawerComponent,
    ChannelDrawerComponent,
    RightDrawerComponent
  },
  computed: {
    getStatus: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
  },
  methods: {
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
$drawerHeight: 216px;

.is-baccarat,
.is-moneywheel,
.is-dragontiger {
  width: 464px !important;
  height: 256px;
  left: calc(522px * 2) !important;
  transform: translate(0,0) !important;
  background-color: #1b2129 !important;

  .--is-chip-and-button {
    flex-flow: column;
  }
}

.is-moneywheel {
  left: auto !important;
  right: 0;
}

.betting__table {
  position: relative;
  text-align: center;
  @include rem(margin, 0 30px);
  margin: 0 rem(30px);

  &.--for-dt-bac {
    @include rem(width, 736px);
    margin: 0 auto;
  }

  .betting__area {
    @include position(absolute,0,0,0);

    li {
      position: relative;
      float: left;

      .table__bet {
        @include position(absolute, $left: 0, $right: 0, $bottom: rem(70px));
        user-select: none;

        .bet-ratio {
          @include position(absolute, $left: 0, $right: 0, $bottom: rem(-71px));
          text-align: center;
          @include rem(font-size, 10px !important);
          color: rgba($base-color-inverted, .5);
        }

        label {
          @include position(absolute, $bottom: 0);
          @include rem((
            padding: 2px 5px,
            margin-bottom: -65px,
            margin-left: -9px,
            border-radius: 5px
          ));
          background-color: rgba($base-color, .5);
          opacity: 0;

          span {
            color: $base-color-inverted;
          }
        }
      }
    }

    .v-progress-circular {
      @include position(absolute, 28px, 50px);
      background-color: rgba($base-color, .75);
      border-radius: 100%;
    }

    .ut__wrap {
      @include position(absolute, $top: 30px, $right: 0);
      @include rem(width, 90px);
      display: flex;
      flex-flow: column;
      color: $base-color-inverted;
      pointer-events: none;

      .svg-holder {
        height: 0;
      }

      > div {
        display: inline-flex;
        align-items: center;

        span {
          @include rem(font-size, 12px !important);
        }
      }
    }

    .tie {

      .v-progress-circular {
        @include rem(left, 50px);
        color: $dark-green !important;
        caret-color: $dark-green !important;

        .v-progress-circular__underlay {
          stroke: rgba($dark-green, .35);
        }
      }
    }

    .player,
    .banker {
      top: -5px;
      .ut__wrap {
        @include rem(top, 13px);
      }

      .v-progress-circular {
        @include rem((
          top: 10px,
          left: 80px
        ));
      }
    }

    .player {

      .ut__wrap {
        @include rem(margin-right, 20px);
      }

      .v-progress-circular {
        color: $dark-blue !important;
        caret-color: $dark-blue !important;
        @include rem(left, 55px !important);

        .v-progress-circular__underlay {
          stroke: rgba($dark-blue, .35);
        }
      }
    }

    .banker {

      .ut__wrap {
        @include rem(margin-right, 10px);
      }

      .v-progress-circular {
        @include rem(left, 55px !important);
        color: $dark-red !important;
        caret-color: $dark-red !important;

        .v-progress-circular__underlay {
          stroke: rgba($dark-red, .35);
        }
      }
    }

    &.--is-supersix {

      .player {
        top: -5px;
        .v-progress-circular {
          @include rem(left, 38px !important);
        }

        .ut__wrap {
          @include rem(margin-right, -10px !important);
        }
      }

      .banker {
        top: -5px;
        .v-progress-circular {
          @include rem(left, 45px !important);
        }

        .ut__wrap {
          @include rem(margin-right, -20px !important);
        }
      }

      li {
        width: calc(100% / 3) !important;

        &.super_six {
          top: -5px;
          @include rem(height, 80px);
        }
      }
    }

    &.--is-bacarrat {

      li {

        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
          @include box(calc(100% / 3), rem(50px));
        }

        &:nth-child(4),
        &:last-child {
          @include box(calc(100% / 2), rem(80px));
        }
      }
    }

    &.--is-dragontiger {

      .table__bet {
        @include position(absolute, 0,0,0,0);
      }

      label {
        @include rem(top, 45px);
        bottom: initial !important;
        margin-bottom: 0;
      }

      li {

        &.--is-dragon {

          .ut__wrap {
            @include rem(right, -32px);
          }
          .v-progress-circular {
            color: $dark-blue !important;
            caret-color: $dark-blue !important;

            .v-progress-circular__underlay {
              stroke: rgba($dark-blue, .35);
            }
          }
        }

        &.--is-tie {
          color: $base-color-inverted;

          .v-progress-circular {
            color: $dark-green !important;
            caret-color: $dark-green !important;

            .v-progress-circular__underlay {
              stroke: rgba($dark-green, .35);
            }
          }
        }

        &.--is-tiger {

          .v-progress-circular {
            @include rem(left, 16px);
            color: $dark-red !important;
            caret-color: $dark-red !important;

            .v-progress-circular__underlay {
              stroke: rgba($dark-red, .35);
            }
          }
        }

        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
          @include box(calc(100% / 3), rem(130px));
        }

        .bet-ratio {
          bottom: 0;
          color: $base-color-inverted
        }
      }

    }

    &.--is-moneywheel {
      width: rem(740px);
      margin: auto;
      li {
        @include box(calc(100% / 3), rem(65px));
        cursor: pointer;

        .bet__counter {
          @include position(absolute !important, $top: rem(5px));
          width:40%;
          color: $base-color-inverted;
        }

        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
          .bet__counter {
            @include position(relative, $bottom: rem(-2px));
          }
        }

        &:nth-child(4) {
          .bet__counter {
            @include position(relative, $left: rem(18px));
          }
        }

        &:first-child {
          .bet__counter {
            @include position(relative, $left: rem(30px));
          }
        }

        &:nth-child(2),
        &:nth-child(5) {
          .bet__counter {
            @include position(relative, $left: rem(12px));
          }
        }

        &:last-child {
          .bet__counter {
            @include position(relative, $left: rem(8px));
          }
        }

        .table__bet__mw {
          @include position(absolute, $left: 0, $right: 0);
          user-select: none;

          label {
            @include position(absolute, $bottom: 0);
            @include rem((
              padding: 2px 5px,
              margin-bottom: -60px,
              border-radius: 5px
            ));
            color: $base-color-inverted;
            background-color: rgba($base-color, .5);
            opacity: 0;
          }
        }
      }
    }
  }
}

.--is-chip-and-button {
  display: flex;
  margin-bottom: 0;
  transition: margin-bottom linear .3s;


  // &.--is-sidebet {
  //   @include position(absolute, $bottom: 0);
  // }

  .list__ui {
    display: flex;
    @include rem(margin-top, 12px);
    border-bottom: 0;

    &.--is-moneywheel,
    &.--is-dragontiger {
      li {
        width: calc(100% / 3);
      }
    }

    li {
      float: left;
      width: calc(100% / 4);
      @include rem(padding, 0 2px);

      .v-btn {
        font-weight: bold;
        background-color: $sidebar-bg !important;
      }

      .v-btn--large {

        .v-btn__content {
          padding: 0;
        }
      }
    }
  }

  li {
    flex: 1 0 0;
    justify-content: center;
    @include rem((
      padding: 0 5px,
    ));

    > div {
      position: relative;
      flex-flow: column;
      width: inherit;
      user-select: none;

      span {
        position: absolute;
        color: $base-color-inverted;
        @include rem((
          bottom: -10px,
          padding: 0 5px,
          border-radius: 5px
        ));
        background-color: rgba($base-color,.5);
      }
    }

    .v-avatar {
      transition: box-shadow .5s cubic-bezier(.56,.24,.18,.85);

      &.--is-active {
        box-shadow: 0 5px 10px rgba(0, 252, 252, 0.5);
      }
    }

    .v-tabs__wrapper {
      overflow: hidden;
    }

    .v-tabs__wrapper--show-arrows {
      margin: 0;
    }

    .v-tabs__icon {
      @include rem(top, 28px);
      z-index: 2;
      @include rem(width, 10px);
      color: $gold-text;

      &.v-icon {
        @include rem(font-size, 36px);
      }
    }

    .v-tabs__bar {
      background-color: transparent;

      .v-tabs__item {
        position: relative;
        flex-flow: column;
        @include rem(padding, 0 10px);

        .v-chip {
          margin: 0;
        }

        &:not(.v-tabs__item--active) {
          opacity: 1;
        }

        p {
          @include position(absolute);
          color: $base-color;
          font-weight: normal;
          @include rem((
            margin-top: -4px,
            font-size: 14px
          ));
          pointer-events: none;
          transition: all 0.3s linear;
          letter-spacing: 0;
          font-weight: bold;
        }
      }
    }
  }
}

.drawer {
  @include position(absolute, $left: 0, $right: 0, $bottom: 0);
  @include rem(height, $drawerHeight);
  transform: scale(.9);
  transform-origin: left bottom;

  &.--is-roulette.--show-result {

    > li.center__drawer {

      .--is-chip-and-button {
        margin-bottom: -70px;
      }
    }
  }

  &.--is-moneywheel {
    transform: scale(1);
    transform-origin: 0 0;
  }

  &.--is-roulette {
    transform: scale(1);
    transform-origin: 0 0;

    .left__drawer {
      width: 432px;

      .road__table {

        .table__road {
          width: 432px !important;
          overflow: hidden;
        }
      }
    }
  }

  > li {

    &.center__drawer {

      > .list__ui {
        border-bottom: 0;

        &.--is-moneywheel {
          @include position(relative, -11px);

          > li {
            @include rem(padding, 3px 10px);
          }
        }
      }
    }
  }

  &.--show-result {

    .left__drawer {

      // .table__score {
      //   opacity: 0;
      //   transform: translateY(40px);
      //   transition-duration: .5s;
      // }

      .road {
        // @include rem(border-top-left-radius, 10px);
        // border-top: 0;
      }
    }

    .right__drawer {
      @include rem(border-top-right-radius, 10px);

      // .table__setter {
      //   opacity: 0;
      //   transform: translateY(40px);
      //   transition-duration: .5s;
      // }

      .road {
        // @include rem(border-top-right-radius, 10px);
        // border-top: 0;
        overflow: hidden;
      }

      .rouletteoval__container:before {
        content: '';
        @include position(absolute, $bottom: 0, $index: 2);
        width: 100%;
        height: 100%;
      }
    }

    .center__drawer {

      &:before {
        content: '';
        @include position(absolute, $bottom: 0, $index: 2);
        width: 100%;
        height: 100%;
      }
    }
  }

  &.--is-shuffling {
    .center__drawer {

      &:before {
        content: '';
        @include position(absolute, $bottom: 0, $index: 2);
        width: 100%;
        height: 100%;
      }
    }
  }

  &.--is-shuffling,
  &.--is-betting {

    .left__drawer,
    .right__drawer {
      transform: translateX(0);
      transition-duration: 2s
    }


    .center__drawer {
      transform: translate(-50%, 0);
      transition: transform 2s cubic-bezier(.56,.24,.18,.85);
    }
  }
}

.left__drawer,
.center__drawer,
.right__drawer {
  position: absolute !important;
  bottom: 0;
  will-change: transform;
}

.center__drawer {
  bottom: 0;
  @include rem((
    width: 880px,
    padding-top: 5px
  ));
  transition: transform .5s cubic-bezier(.56,.24,.91,.51);
  @extend %clearfix;
}


.left__drawer,
.right__drawer{
  z-index: 200;
  width: 432px;
  height: $drawerHeight;

  .--is-black {

    .table__ui {
        td {
        background-color: $base-color !important;
      }
    }
  }
}

.left__drawer {
  width: 612px;
}

.right__drawer {
  right: 0;
  transition: transform .5s cubic-bezier(.56,.24,.18,.85);

  .road {
    @include rem(border-top, 1px solid $border-color);
  }
}

.left__drawer {
  left: 0;
  transition: transform .5s cubic-bezier(.56,.24,.18,.85);

  .road {
    @include rem(border-top, 1px solid $border-color);
  }

  &.--is-moneywheel {
    width: 432px;
    @include rem(border-top-left-radius, 10px);
    overflow: hidden;
  }
}

.center__drawer {
  left: 50%;
  transform: translate(-50%, 0);
}

.table__score,
.table__setter {
  z-index: -1;
}

.road__table {
  position: relative;
  display: flex;
  flex: 1 0 auto;
  flex-flow: column;
  @extend %clearfix;
  height: $drawerHeight
}

.snotify-leftCenter {
  @include rem(left, 92px !important);

  .snotifyToast__inner {
    @include rem(padding, 10px !important);
    min-height: auto;
  }
}

.snotify-rightTop {
  @include rem((
    top: 50px !important,
    right: 96px !important
  ));

  .snotifyToast__inner {
    @include rem((
      padding: 16px !important,
    ));
    min-height: auto;
  }
}

.bet__amount {
  color: $gold-text;
  font-weight: 500;
}

.bet__section {
  text-transform: uppercase;
  font-weight: 500;

  &.player,
  &.dragon,
  &.player_pair {
    color: $dark-blue;
  }

  &.banker,
  &.tiger,
  &.banker_pair {
    color: $dark-red;
  }

  &.tie {
    color: $green-text;
  }
}
</style>
