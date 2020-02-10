<!-- ResultComponent
*playerTotal - Function to count result from the player
*bankerTotal - Function to count result from the banker
*result - Function to broadcast the winner
-->
<template>
  <ul class="betting__result" 
    :class="[
      _table.status !== 'betting' ? '--show-result' : '', 
      _table.status === 'shuffling' ? '--is-shuffling' : '', 
      _table.code === 'dragontiger' ? '--is-dragontiger' : '', 
      getBettingtable === 'moneywheel' ? '--is-moneywheel' : '', 
      (_getBrowsertype === 'QQBrowser') && (getBettingtable === 'moneywheel') ? '--is-moneywheel --is-qqBrowser' : '', 
      _table.subcode === 'bidding' ? 'is-bidding' : ''
      ]">
    <template v-if="getBettingtable !== 'moneywheel' && getBettingtable !== 'roulette'">
      <li>
        <span class="dots"></span>
        <span class="v-line"></span>
        <h4 class="betting__text" style="text-align: right;">
          {{ (_table.code !== 'dragontiger') ?  tt('Player') : tt('Dragon') }}
          <template v-if="getBettingStatus">
            <span class="--is-number" v-if="getBettingStatus">{{ (_table.code !== 'dragontiger') ?  playerTotal : dragonTotal }}</span>
          </template>
          <template v-if="!getBettingStatus && !checkwasFlipped">
            <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  playerTotalcheckwasnotFlipped : '0' }}</span>
          </template>
          <template v-if="!getBettingStatus && checkwasFlipped">
            <template v-if="_table.code !== 'dragontiger'">
              <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  playerTotalcheckwasFlipped : '0' }}</span>
            </template>
            <template v-if="_table.code === 'dragontiger'">
              <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code === 'dragontiger') ?  playerTotalcheckwasFlipped : '0' }}</span>
            </template>
          </template>
        </h4>
        <div class="card__wrapper">
          <div class="card__deck">
            <template v-if="_table.code === 'dragontiger'">
              <div class="flip__card" :class="getBettingStatus || dVal? '--is-reveal' : ''">
                <div class="flip__result">
                  <div class="front"></div>
                  <div class="back" :class="return_dragoncard(dragoncard)"></div>
                </div>
              </div>
            </template>
            <template v-if="_table.code !== 'dragontiger'">
              <!-- <div class="flip__card --is-horizontal" :class="[getBettingStatus || p3Val? '--is-reveal' : '--is-disable']"> -->
                <div class="flip__card --is-horizontal" :class="[getBettingStatus || p3Val ? '--is-reveal' : '' , return_playerCard3(playerCard3) ? '' : '--is-disable']">
                <div class="flip__result">
                  <div class="front"></div>
                  <div class="back" :class="[return_playerCard3(playerCard3)]"></div>
                </div>
              </div>
              <div class="flip__card" :class="[getBettingStatus || p2Val? '--is-reveal' : '' , (checkwasFlipped && checkif3rdcardiscalled) ? '--is-reveal' : '', checkif3rdcardiscalled ? '--is-reveal' : '', p3Val || b3Val ? '--is-reveal' : '']">
                <div class="flip__result">
                  <div class="front"></div>
                  <div class="back" :class="[return_playerCard2(playerCard2),getBettingStatus]"></div>
                </div>
              </div>
              <div class="flip__card" :class="[getBettingStatus || p1Val? '--is-reveal' : '' , (checkwasFlipped && checkif3rdcardiscalled) ? '--is-reveal' : '', checkif3rdcardiscalled ? '--is-reveal' : '', p3Val || b3Val ? '--is-reveal' : '']">
                <div class="flip__result">
                  <div class="front"></div>
                  <div class="back" :class="[return_playerCard1(playerCard1),getBettingStatus]"></div>
                </div>
              </div>
            </template>
          </div>
          <!-- <div class="result__counter">
            <template v-if="getBettingStatus">
              <span class="--is-number" v-if="getBettingStatus">{{ (_table.code !== 'dragontiger') ?  playerTotal : dragonTotal }}</span>
            </template>
            <template v-if="!getBettingStatus && !checkwasFlipped">
              <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  playerTotalcheckwasnotFlipped : '0' }}</span>
            </template>
            <template v-if="!getBettingStatus && checkwasFlipped">
              <template v-if="_table.code !== 'dragontiger'">
                <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  playerTotalcheckwasFlipped : '0' }}</span>
              </template>
              <template v-if="_table.code === 'dragontiger'">
                <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code === 'dragontiger') ?  playerTotalcheckwasFlipped : '0' }}</span>
              </template>
            </template>
          </div> -->
        </div>
      </li>
      <li>
        <span class="dots"></span>
        <span class="v-line"></span>
        <h4 class="betting__text" style="text-align: left;">
          <template v-if="getBettingStatus">
            <span class="--is-number" v-if="getBettingStatus">{{ (_table.code !== 'dragontiger') ?  bankerTotal : tigerTotal }}</span>
          </template>
          <template v-if="!getBettingStatus && !checkwasFlipped">
            <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  bankerTotalcheckwasnotFlipped : '0' }}</span>
          </template>
          <template v-if="!getBettingStatus && checkwasFlipped">
            <template v-if="_table.code !== 'dragontiger'">
              <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  bankerTotalcheckwasFlipped : '0' }}</span>
            </template>
            <template v-if="_table.code === 'dragontiger'">
              <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code === 'dragontiger') ?  bankerTotalcheckwasFlipped : '0' }}</span>
            </template>
          </template>
          <template v-if="$store.state.locale === 'en' || $store.state.locale === 'jp' || $store.state.locale === 'ko' || $store.state.locale === 'vn' || $store.state.locale === 'th' || $store.state.locale === 'id'">
            {{ (_table.code !== 'dragontiger') ?  tt('Banker') : tt('Tiger') }}
          </template>
          <template v-if="$store.state.locale === 'cn'">
            {{ (_table.code !== 'dragontiger') ?  tt('Banker') : tt('Tiger') }}
          </template>
        </h4>
        <div class="card__wrapper">
          <!-- <div class="result__counter --is-right-card">
            <template v-if="getBettingStatus">
              <span class="--is-number" v-if="getBettingStatus">{{ (_table.code !== 'dragontiger') ?  bankerTotal : tigerTotal }}</span>
            </template>
            <template v-if="!getBettingStatus && !checkwasFlipped">
              <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  bankerTotalcheckwasnotFlipped : '0' }}</span>
            </template>
            <template v-if="!getBettingStatus && checkwasFlipped">
              <template v-if="_table.code !== 'dragontiger'">
                <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code !== 'dragontiger') ?  bankerTotalcheckwasFlipped : '0' }}</span>
              </template>
              <template v-if="_table.code === 'dragontiger'">
                <span class="--is-number" v-if="!getBettingStatus">{{ (_table.code === 'dragontiger') ?  bankerTotalcheckwasFlipped : '0' }}</span>
              </template>
            </template>
          </div> -->
          <div class="card__deck">
            <template v-if="_table.code === 'dragontiger'">
              <div class="flip__card" :class="getBettingStatus || tVal? '--is-reveal' : ''">
                <div class="flip__result">
                  <div class="front --is-redbg"></div>
                  <div class="back" :class="return_tigercard(tigercard)"></div>
                </div>
              </div>
            </template>
            <template v-if="_table.code !== 'dragontiger'">
              <div class="flip__card" :class="[getBettingStatus || b1Val? '--is-reveal' : '' , (checkwasFlipped && checkif3rdcardiscalled) ? '--is-reveal' : '', checkif3rdcardiscalled ? '--is-reveal' : '', p3Val || b3Val ? '--is-reveal' : '']">
                <div class="flip__result">
                  <div class="front --is-redbg"></div>
                  <div class="back" :class="[return_bankerCard1(bankerCard1),getBettingStatus]"></div>
                </div>
              </div>
              <div class="flip__card" :class="[getBettingStatus || b2Val? '--is-reveal' : '' , (checkwasFlipped && checkif3rdcardiscalled) ? '--is-reveal' : '', checkif3rdcardiscalled ? '--is-reveal' : '', p3Val || b3Val ? '--is-reveal' : '']">
                <div class="flip__result">
                  <div class="front --is-redbg"></div>
                  <div class="back" :class="[return_bankerCard2(bankerCard2),getBettingStatus]"></div>
                </div>
              </div>
              <!-- <div class="flip__card --is-horizontal" :class="[getBettingStatus || b3Val? '--is-reveal' : '--is-disable']" style="margin-left: 24px"> -->
              <div class="flip__card --is-horizontal" :class="[getBettingStatus || b3Val ? '--is-reveal' : '' , return_bankerCard3(bankerCard3) ? '' : '--is-disable']" style="margin-left: 24px">
                <div class="flip__result">
                  <div class="front --is-redbg"></div>
                  <div class="back" :class="[return_bankerCard3(bankerCard3)]"></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </li>
    </template>
    <template v-if="getBettingtable === 'moneywheel'">
      <li>
        <h4 class="betting__text">{{ tt(['betting'].indexOf(gameStatus) > -1 ? 'Previous Result' : 'Winning Result') }}</h4>
        <ul class="list__ui" >
          <li>
            <template>
              <span>x{{results.multiplier || 0}}</span>
            </template>
          </li>
          <li>
            <span :class="[results.table, _table.game.result].indexOf('og') === -1 ? 'moneytable-result' : 'og-win'">
              {{results.table !== 'og' ? (results.table || '') : '?'}}
            </span>
            <span class="winning-result">
              {{(results.amount || 0) | toMoney }}
            </span>
          </li>
        </ul>
      </li>
    </template>
  </ul>

</template>
<script>
import Result from '@/library/Result'
export default {
  mixins: [ Result ]
}
</script>

<style lang="scss">
.betting__result {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 320px;

  &.--is-shuffling {

    > li {

      &:first-child {
        transform: translateX(-440px);
      }

      &:last-child {
        transform: translateX(440px);
      }
    }
  }

  &.is-bidding {
    bottom: 320px;

    > li {
      width: 440px;

      .betting__text {

        span {
          padding: 0 .5em;
        }
      }

      .card__wrapper .card__deck {
        transform: scale(1.3);
        margin-top: 0;
      }
    }
  }

  &.--is-moneywheel {

    > li {

      .betting__text {
        font-size: 3em;
      }
    }
  }

  > li {
    @include position(absolute, 0, $bottom: 0, $index: 100);
    width: calc(99% / 2);
    transition: transform 1s cubic-bezier(.56,.24,.18,.85), opacity 1s linear;
    opacity: 0;
    will-change: transform, opacity;
    @extend %border-frame;

    &:after,
    &:before {
      top: 0;
      bottom: 0;
      border-radius: 0;
      height: 2px;
    }

    &:after {
      top: auto;
      bottom: 0;
    }

    .dots {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: -7.5px;
      right: -7.5px;
      width: 15px;
      height: 15px;
      border-radius: 15px;
      background-color: #00ffff;
      border: 1px solid rgba(#fff,.5);

      &:before {
        content: '';
        display: flex;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        margin-left: 1px;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(#fff, 1),
        0 0 4px rgba(#fff, .95),
        0 0 6px rgba(#fff, .90),
        0 0 8px rgba(#fff, .85),
        0 0 10px rgba(#fff, .80),
        0 0 12px rgba(#fff, .75),
        0 0 14px rgba(#fff, .70),
        0 0 16px rgba(#fff, .65),
        0 0 18px rgba(#fff, .60),
        0 0 20px rgba(#fff, .55),
        0 0 22px rgba(#fff, .50),
        0 0 50px rgba(#fff, .50);
      }
    }

    .v-line {
      display: block;
      position: absolute;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,255,255,1) 50%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%);
    }

    .betting__text {
      text-align: center;
      color: $base-color-inverted;
      font-weight: black;
      font-size: 5.5em;
      text-transform: uppercase;
      text-shadow: 0 2px 15px rgba($base-color, .55);

      span {
        font-size: inherit;
        padding: 0 1.2em;
      }
    }

    &:first-child {
      left: 0;
      // background-color: rgba($dark-blue, 1);
      // @include rem((
      // border-top-right-radius: 10px
      // ));
      background: linear-gradient(45deg, rgba($base-color,0.6) 0%,rgba($base-color,0.5) 55%,rgba(0,255,255,0.35) 100%);
      transform: translateX(-100%);
      transition-duration: 1s;
      transition-delay: .1s;

      &:after,
      &:before {
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,255,255,1) 50%,rgba(0,0,0,0) 100%);
      }

      &:after {
        background: linear-gradient(to right, rgba(#c0ffff,1) 0%,rgba(0,255,255,1) 50%,rgba(0,0,0,0) 100%);
      }

      .betting__text {
        color: #00ffff;

        span {
          color: #fff;
        }
      }

      .card__wrapper .card__deck {
        justify-content: flex-end;
        padding-right: 4em;
        transform-origin: top right;
      }
    }

    &:last-child {
      right: 0;
      background: linear-gradient(-45deg, rgba($base-color,0.6) 0%,rgba($base-color,0.5) 55%,rgba(#ed1c24,0.35) 100%);
      // background-color: rgba($dark-red, 1);
      // @include rem((
      //   border-top-left-radius: 10px
      // ));
      transform: translateX(100%);
      transition-duration: 1s;
      transition-delay: .1s;

      &:after,
      &:before {
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(#ed1c24,1) 50%,rgba(0,0,0,0) 100%);
      }

      &:after {
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(#ed1c24,1) 50%,rgba(#ee7c15,1) 100%);
      }

      .dots {
        left: -7.5px;
        right: auto;
        background-color: #ed1c24;
      }

      .v-line {
        left: 0;
        right: auto;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(#ed1c24,1) 50%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%);
      }

      .betting__text {
        color: #ed1c24;

        span {
          color: #fff;
        }
      }

      .card__wrapper .card__deck {
        justify-content: flex-start;
        padding-left: 4em;
        transform-origin: top left;
      }
    }
  }

  &.--show-result {

    > li {
      opacity: 1;
      transform: translateX(0) !important;
      transition-duration: 1.5s;
      transition-delay: initial;

      .card__wrapper {
        opacity: 1;
        transition-delay: 1.5s;
      }
    }
  }

  &.--is-dragontiger {

    > li {

      &:first-child {

        .flip__card {
          @include rem((
            margin-left: 100px
          ));
        }
      }

      &:last-child {

        .flip__card {
          @include rem((
            margin-right: 100px
          ))
        }
      }
    }
  }

  &.--is-moneywheel {

    &.--show-result {

      > li {
        transform: translateX(0) !important;
        transition-duration: 1.5s;
        transition-delay: initial;
      }

      // &.--is-qqBrowser {
      //   @media (max-width: 1920px) {
      //     > li {
      //       transform: translateX(-440px);
      //       transition: .5s;
      //     }
      //   }
      //   @media (max-width: 1879px) {
      //     > li {
      //       transform: translateX(-399px);
      //       transition: .5s;
      //     }
      //   }
      // }
    }



    > li {
      left: auto;
      right: 0;
      width: 464px;
      background-color: rgba($base-color, .25);
      opacity: 1;
      transform: translateX(464px);
      transition: transform 2s cubic-bezier(.56,.24,.18,.85);
      border-top-left-radius: 0;
      color: $base-color-inverted;

      .list__ui {
        @include position(absolute,50px,0,0,0);
        @include rem((
          margin: 10px 0
        ));
        border-bottom: 0;

        li {
          justify-content: center;
          flex: 1 0 0;
          padding: 0;

          &:first-child {
            position: relative;
            @include cover-image(contain, url('https://static.oriental-game.com/image/mw_multiplier_bg.png'));
            @include rem((
              border-right: 1px solid rgba($base-color-inverted, .15)
            ));

            span {
              @include rem((
                min-width: 65px,
                padding: 7px 16px,
                margin-left: 5px,
                font-size: 18px,
                border-radius: 5px
              ));
              text-align: center;
              font-weight: 500;
              color: $base-color;
              background-color: $base-color-inverted;
              box-shadow: inset 0 0 5px;
            }
          }

          &:last-child {
            @include cover-image(contain, url('https://static.oriental-game.com/image/moneywheel/winning-result-bg.png'));

            span {
              display: block;
            }

            .moneytable-result {
              position: absolute;
              @include rem((
                top: 40px,
                font-size: 24px
              ));
            }

            .og-win {
              @include position(absolute, 30px);
              @include box(30px);
              @include cover-image(cover, url('/static/svg/BeadOGRoad.svg'));
            }

            .winning-result {
              position: relative;
              @include rem((
                top: 40px,
                font-size: 16px
              ));

              &.hide {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  .card__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 1s cubic-bezier(.56,.24,.18,.85);
    transition-delay: initial;
    opacity: 0;
    will-change: opacity;

    .card__deck {
      margin-top: -30px;
      display: inline-flex;
      justify-content: center;
      flex: 1 0 50%;
      transform: scale(1.8);
    }

    .result__counter {
      display: inline-flex;
      flex: 1 0 0;
      text-shadow: 0 2px 10px rgba($base-color,.35);

      &.--is-right-card {
        justify-content: flex-end
      }

      span {
        @include rem((
          font-size: 76px
        ));
        color: $base-color-inverted;
      }
    }
  }

  .card__deck {
    @include rem((
      padding-top: 20px,
    ));
    text-align: center
  }

  .flip__card {
    position: relative;
    display: inline-block;
    @include box(69px, 103px);
    @include rem(margin-left, 7px);
    font-size: 0;
    opacity: 1;
    overflow: hidden;
    // perspective: 500px;

    &.--is-horizontal {
      @include rem((
        bottom: -17px,
        margin-left: 17px,
        margin-right: 17px
      ));
      transform: rotate(-90deg);
    }

    &.--is-reveal {

      .flip__result {
        transform: rotateY(180deg);
      }
    }

    &.--is-disable {
      opacity: 0;
    }

    .flip__result {
      position: absolute;
      @include box(69px, 103px);
      @include rem(border-radius, 5px);
      transition: transform .3s $cubic-bezier;
      transform-style: preserve-3d;
      will-change: transform;

      .front,
      .back {
        position: absolute;
        @include box(100%);
        backface-visibility: hidden
      }

      .front {
        background-image: url('https://static.oriental-game.com/image/squeezeCard.png');
        background-size: contain;

        &.--is-redbg {
          background-image: url('https://static.oriental-game.com/image/squeezeCardRed.png');
        }
      }

      .back {
        transform: rotateY(180deg);
      }
    }
  }
}

.streamer__ingame {

  .betting__result {

    > li {
      width: 50%;

      .betting__text {
        @include rem(font-size, 40px);
      }

      &:first-child {
        transform: translateX(-100%);
      }

      &:last-child {
        transform: translateX(100%);
      }
    }
  }
}
</style>
