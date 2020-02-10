<template>
  <v-app id="og_plus" :class="[$store.state.theme, $store.state.isNightmode ? 'nightmode' : '', $store.state.locale, getBrowser()]" data-msg="Sorry, we're not supported small sizes browser, Please maximize your screen for better gaming. Thank you">
    <scalable>
      <vue-headful
      :title="tt(title)"
      icon="https://static.oriental-game.com/image/icon/favicon-32x32.png"
      />
      <router-view/>
    </scalable>
    <!-- initialized card for squeezing and hide it -->
    <div class="card-hidden">
      <img id="card-finger" :src="'https://static.oriental-game.com/cards/img_finger.png'" />
      <img id="card-back-blue" :src="'https://static.oriental-game.com/cards/squeezeBlue.png'" />
      <img id="card-back-red"  :src="'https://static.oriental-game.com/cards/squeezeRed.png'" />
      <img id="-back-red"  :src="'https://static.oriental-game.com/cards/_red.gif'" />
      <img id="-back-blue"  :src="'https://static.oriental-game.com/cards/_blue.gif'" />
      <template v-for="suit in ['club/c', 'diamond/d', 'heart/h', 'spade/s']">
        <template v-for="num in 13">
          <img :id="`card-table-${ num }${ suit.substr(-1) }`"       :key="`card-table-${ num }${ suit.substr(-1) }`"       :src="`https://static.oriental-game.com/cards/${ suit.slice(0, -2) }/${ num }${ suit.substr(-1) }.png`" />
        </template>
      </template>
    </div>
  </v-app>
</template>


<script>

import $cookie from 'vue-cookie'
import scalable from '@/directives/scalable'
export default {
  name: 'App',
  mount: '#og_plus',
  components: {
    scalable
  },
  data () {
    return {
      title: 'OG Plus',
    }
  },
  created () {
    let _s = this
    _s.$store.commit('SET_SOCKET', this.io)
  },
  mounted () {
    let _s = this
    let userSession = $cookie.get('userSession')
    _s.getBrowser()
    // _s.ProgScreenComponent = 1
    // _s.$store.commit('PROGSRCN', _s.ProgScreenComponent)
    // // progress bar

    console.log('asd', _s.$el)
    // Prevent browser from clicking back button
    history.pushState(null, null, location.href);
    window.onpopstate = function (ev) {
      if (!ev.isTrusted) {
        location.reload()
      }
    };

    document.body.addEventListener('keydown', function (event) {
      if (event.keyCode === 122) {
        document.body.classList.add('fullscreen')
      }
    })

    // // progress bar
    if (_s.load === true) {
      let progressRatio = 0;
      const progress = document.getElementsByClassName("progress")[0];
      const loadingAnim = (time) => {
        if (progressRatio <  50) progressRatio += (0.25   + Math.random() * 0.15);
        else if (progressRatio <  80) progressRatio += (0.25  + Math.random() * 0.075);
        else if (progressRatio < 100) progressRatio += (0.15 + Math.random() * 0.0375);
        progress.style.width = "calc(" + progressRatio + "% - 2px)";
        if (progressRatio < 100) window.requestAnimationFrame(loadingAnim);
      };
      loadingAnim(0);
    }

    // if (userSession) {
    //   console.error("Multiple Login Detected. Cannot continue.")
    //   return location.assign('/#/403')
    // }



  },
  methods: {
    getBrowser () {
      let isSafari = window.safari !== undefined
      let edgeBrowser = window.navigator.userAgent.indexOf('Edge') > -1
      let isFirefox = typeof InstallTrigger !== 'undefined'
      let returnBrowser = ''
      let browseris = this.$browserDetect.meta.ua
      let filterBrowser = browseris.match(/QQBrowser/g)

      try {
        console.log('filterBrowser[0]: ', filterBrowser[0])
        if (filterBrowser[0] === 'QQBrowser') {
          returnBrowser = true
        }
      }
      catch(err) {

      }

      if (isSafari) {
        return '--is-safari'
      } else if (edgeBrowser) {
        return '--is-edge'
      } else if (isFirefox) {
        return '--is-firefox'
      } else if (returnBrowser) {
        console.log('QQ ENABLED')
        return '--is-QQ'
      } else {
        return ''
      }
    }
  }
}

</script>

<style lang="scss">
// http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20
// #     _____ _       _           _    _____  _____ _____    _____             __ _                       _   _
// #    / ____| |     | |         | |  / ____|/ ____/ ____|  / ____|           / _(_)                     | | (_)
// #   | |  __| | ___ | |__   __ _| | | |    | (___| (___   | |     ___  _ __ | |_ _  __ _ _   _ _ __ __ _| |_ _  ___  _ __
// #   | | |_ | |/ _ \| '_ \ / _` | | | |     \___ \\___ \  | |    / _ \| '_ \|  _| |/ _` | | | | '__/ _` | __| |/ _ \| '_ \
// #   | |__| | | (_) | |_) | (_| | | | |____ ____) |___) | | |___| (_) | | | | | | | (_| | |_| | | | (_| | |_| | (_) | | | |
// #    \_____|_|\___/|_.__/ \__,_|_|  \_____|_____/_____/   \_____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__|_|\___/|_| |_|
// #                                                                                  __/ |
// #                                                                                 |___/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
// #    ______            _____           _ _                _____             __ _
// #   |  ____|          / ____|         | (_)              / ____|           / _(_)
// #   | |__ ___  _ __  | (___   ___ __ _| |_ _ __   __ _  | |     ___  _ __ | |_ _  __ _
// #   |  __/ _ \| '__|  \___ \ / __/ _` | | | '_ \ / _` | | |    / _ \| '_ \|  _| |/ _` |
// #   | | | (_) | |     ____) | (_| (_| | | | | | | (_| | | |___| (_) | | | | | | | (_| |
// #   |_|  \___/|_|    |_____/ \___\__,_|_|_|_| |_|\__, |  \_____\___/|_| |_|_| |_|\__, |
// #                                                 __/ |                           __/ |
// #                                                |___/                           |___/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
html,
body {
  overflow: hidden;
  user-select: none;
}

.scalable__window {

  .v-content,
  .v-content__wrap {
    overflow: hidden;

    @media (min-height: 941px) {
      height: 100vh;
    }

    @media (max-height: 940px) {
      height: 950px;
    }
  }

  .v-content__wrap {
    position: relative;
  }

  .lobby__table__content .v-window__container {

    @media (min-height: 941px) {
      height: calc(100vh - (80px + 120px)) !important;
    }

    @media (max-height: 940px) {
      height: calc(950px - (80px + 120px)) !important;
    }
  }

  .ingame__sidebar {

    .filter__content {
      @media (min-height: 941px) {
        height: calc(100vh - 140px);
      }

      @media (max-height: 940px) {
        height: calc(950px - 140px);
      }
    }
  }

  .filter__content {
    @media (min-height: 941px) {
      height: calc(100vh - (75px + 120px));
    }

    @media (max-height: 940px) {
      height: calc(950px - (75px + 120px));
    }
  }

  // .streamer__video video,
  video#panda_desk_Video {
    @media (min-height: 1080px) {
      height: 100vh;
    }

    @media (max-height: 1010px) {
      height: 1080px;
    }
  }

  .streamer__wrap .streamer__ingame video {
    @media (max-height: 1010px) {
      height: 1000px !important;
    }
  }

  .streamer__wrap,
  .streamer__wrap .streamer__ingame,
  // .streamer__wrap .streamer__ingame video,
  .streamer__wrap .streamer__video {
    @media (min-height: 1080px) {
      height: 100vh;
    }

    // @for $i from 900 through 1050 {
    //   @media (max-height: #{$i}px) {
    //     height: #{$i}px !important;
    //   }
    // }





    @media (max-height: 980px) {
      height: 980px;
    }

    @media (max-height: 970px) {
      height: 970px;
    }

    @media (max-height: 960px) {
      height: 960px;
    }

    @media (max-height: 950px) {
      height: 950px;
    }
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Reset
#    _____                _
#   |  __ \              | |
#   | |__) |___  ___  ___| |_
#   |  _  // _ \/ __|/ _ \ __|
#   | | \ \  __/\__ \  __/ |_
#   |_|  \_\___||___/\___|\__|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.--is-safari .drawer,
.--is-safari .channel__drawer,
.--is-safari .betting__timer.start {
  z-index: 1 !important;
}

.--is-firefox {
  .--is-chip-and-button li .v-tabs__bar .v-tabs__item p {
    @include rem(margin-bottom, 5px !important);
  }
}

.--is-edge {

  #panda_desk_Video {
    @include rem(margin-top, -45px !important);
  }

  .--is-chip-and-button li .v-tabs__bar .v-tabs__item p {
    @include rem(margin-bottom, 5px !important);
  }

  .translucent__card .card__footer .list__ui li {
    @include rem(margin-left, 10px);
  }

  .translucent__card .card__footer .list__ui li span {
    justify-content: space-between;
    @include rem(padding, 0 10px);
  }
}

html {
  -ms-overflow-style: none;
}

.application  {
  cursor: url('https://static.oriental-game.com/image/cursor.png'), auto;
}

a,
label,
button,
.cursor,
.filter li,
.v-tabs__icon,
.betting__area,
.settings__ui li,
.language__list li,
.language__list .list,
.list__ui .--is-icon,
.channel__drawer ul li,
.setting__road__map img,
.side__betting__area li,
.super__switch .slider,
.emoji__box li,
.card__box.moneywheel .card__table,
.v-input--selection-controls__ripple,
.v-input--selection-controls__input input {
  @extend %cursor;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

div, p, span, li, input, .v-input-group--text-field input {
  @include rem((
    font-size: 12px,
    letter-spacing: 1px
  ));
}

.application {
  background-color: $base-color !important;
  font-family: $default-font !important;
  transition: filter ease-in .3s;

  &.ko {

    .v-navigation-drawer {

      .list__ui {

        > li {
          &:first-child {
            @include rem(font-size, 10px);
          }
        }
      }

      .filter {

        .--is-tile {

          li {
            @include rem((
              font-size: 8px,
              padding: 7.5px
            ));
          }
        }
      }
    }

    .side__betting__area {

      li {

        p {
          @include rem(font-size, 11px !important);
        }
      }
    }

    table.v-table tbody td {
      @include rem(font-size, 11.5px);
    }

    table.v-table thead th {
      @include rem(font-size, 11px);
    }

    .noc__modal.rank__modal .v-table th,
    .noc__modal.rank__modal .v-table td {
      @include rem(width, 100px);
    }
  }

  &.cn {

    .table__score {

      li {
        @include rem(padding, 15px 12px);

        span {
          @include rem(font-size, 11px);
        }
      }
    }

    .side__betting__area {

      li {

        p {
          @include rem(font-size, 11px !important);
        }
      }
    }

    .checkbox__ui {

      > span {
        @include rem(font-size, 10px);
      }
    }

    .betting__area.--is-dragontiger {

      .--is-tiger {

        .ut__wrap {
          @include rem(right, -7px !important);
        }
      }
    }

    .card__box .v-card .v-card__actions .list__ui {

      li.--is-number {

        span {

          &:before {
            @include rem((
              font-size: 11px,
              line-height: 7px,
            ));
          }
        }
      }
    }
  }

  &.jp {

    table.v-table tbody td {
      @include rem(font-size, 11.5px);
    }

    table.v-table thead th {
      @include rem(font-size, 11px);
    }

    .noc__modal.rank__modal .v-table th,
    .noc__modal.rank__modal .v-table td {
      @include rem(width, 120px);
    }

    .side__betting__area {

      li {

        p {
          @include rem((
            bottom: 8px !important,
            font-size: 11px !important,
            width: 50px
          ));
        }
      }
    }
  }

  &.th {

    .side__betting__area {

      li {

        p {
          @include rem((
            font-size: 11px !important,
            width: 55px
          ));
        }
      }
    }
  }

  &.id {

    .filter__content .sidebar__card > div .card__body .v-btn.v-btn--outline .v-btn__content {
      @include rem(font-size, 9px !important);
    }

    .side__betting__area {

      li {

        p {
          @include rem((
            font-size: 11px !important,
            width: 55px
          ));
        }
      }
    }

    .betting__timer {
      @include rem(width, 400px);
    }

    .table__info label {
      @include rem(width, 166px !important);
    }

    .--is-chip-and-button {

      .v-btn__content {
        @include rem(font-size, 8px !important);
      }
    }
  }
}

table.v-table thead th {
  text-transform: uppercase;
  font-weight: 700;
  @include rem((
    padding: 0 16px !important,
    font-size: 14px
  ));
  white-space: normal;
}

.v-window__container {
  will-change: height;
  transition: none;
}

.v-window-item {
  will-change: transform;
}

.v-dialog {
  will-change: transform, opacity;
}

.v-overlay {
  width: 100vw;

  &:before {
    background-color: $base-color;
  }
}

.v-progress-circular__info {
  @include rem(font-size, 8px);
  color: $base-color-inverted;
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Modal
#    __  __           _       _
#   |  \/  |         | |     | |
#   | \  / | ___   __| | __ _| |
#   | |\/| |/ _ \ / _` |/ _` | |
#   | |  | | (_) | (_| | (_| | |
#   |_|  |_|\___/ \__,_|\__,_|_|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.noc__modal {

  .modal__title {
    @include rem((
      padding: 10px 16px,
      font-size: 24px
    ));

    + .modal__body {
      @include rem(padding, 0 16px 0);

      + .modal__footer {
        @include rem(padding, 10px 16px);

        .list__ui {
          border-bottom: 0;

          li {
            padding: 0;
          }
        }
      }
    }
  }

  .divider {
    width: 80%;
    @include rem((
      margin-top: -1px,
      margin-bottom: 5px,
      height: 3px
    ));
    margin-left: auto;
    margin-right: auto;
    border-radius: 100%;
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Overlay
#     ____                 _
#    / __ \               | |
#   | |  | |_   _____ _ __| | __ _ _   _
#   | |  | \ \ / / _ \ '__| |/ _` | | | |
#   | |__| |\ V /  __/ |  | | (_| | |_| |
#    \____/  \_/ \___|_|  |_|\__,_|\__, |
#                                   __/ |
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.overlay__bg {
  @include position(fixed,0,0,0,0,998);
  background-color: rgba($base-color, .5);
  will-change: opacity;

  &.--is-active {
    width: 100%;
    left: inherit;
    // @include rem((
    //   padding-right: 230px
    // ));
    // transform: translateX(-230px);
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Supersix
#     _____                       _____ _
#    / ____|                     / ____(_)
#   | (___  _   _ _ __   ___ _ _| (___  ___  __
#    \___ \| | | | '_ \ / _ \ '__\___ \| \ \/ /
#    ____) | |_| | |_) |  __/ |  ____) | |>  <
#   |_____/ \__,_| .__/ \___|_| |_____/|_/_/\_\
#                | |
#                |_|
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.super__switch {
  position: relative;
  float: left;
  @include box(rem(70px),rem(30px));
  transform: scale(.8);
  margin-bottom: 0;

  input { display:none; }

  .slider {
    @include position(absolute,0,0,0,0);
    background-color: $border-color;
    cursor: pointer;
    transition: all .3s linear;

    &:before {
      content: attr(data-off);
      @include position(absolute,$left: rem(2px), $bottom: rem(2px));
      @include box(rem(26px));
      @include rem((
        font-size: 10px,
        line-height: 28px
      ));
      text-align: center;
      color: lighten($base-color, 25%);
      background-color: $base-color-inverted;
      transition: all .3s linear;
    }

    &:after {
      content: attr(data-text);
      display: flex;
      align-items: center;
      justify-content: center;
      @include position(absolute,$left: rem(30px));
      @include box(rem(38px), rem(30px));
      @include rem(font-size, 10px);
      color: $base-color-inverted;
      word-break: break-word;
      text-align: center;
      transition: left .3s ease-in-out;
      font-family: $default-font;
    }
  }

  .slider.round {
    @include rem(border-radius, 34px)
  }

  .slider.round:before {
    border-radius: 50%;
  }

  input:checked + .slider {
    background-image: linear-gradient(to top, #d8bb8d 0%,#a97f43 100%)
  }

  input:checked + .slider:before {
    transform: translateX(40px);
    content: attr(data-on)
  }

  input:checked + .slider:after {
    content: attr(data-text);
    @include rem(left, 10px);
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Text
#    _______        _
#   |__   __|      | |
#      | | _____  _| |_
#      | |/ _ \ \/ / __|
#      | |  __/>  <| |_
#      |_|\___/_/\_\\__|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.title-header {
  @include rem((
    margin-bottom: 16px,
  ));
  font-weight: 400;
  text-transform: uppercase;
}

// .--is-player,
// .--is-player-pair {
//   color: $dark-blue
// }

// .--is-banker,
// .--is-banker-pair {
//   color: $dark-red
// }

// .--is-tie {
//   color: $dark-green
// }

.--is-center {
  text-align: center;
}

.--is-green {
  color: $dark-green;
}

.--is-blue {
  color: $dark-blue;
}

.--is-red {
  color: $dark-red;
}

.--is-star {
  color: $gold-text;
}

.black,
.red {
  background-color: transparent !important;
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Button
#    ____        _   _
#   |  _ \      | | | |
#   | |_) |_   _| |_| |_ ___  _ __
#   |  _ <| | | | __| __/ _ \| '_ \
#   | |_) | |_| | |_| || (_) | | | |
#   |____/ \__,_|\__|\__\___/|_| |_|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.btn__group {
  display: flex;

  > * {
    flex: 1 1 auto;
    @include rem(padding, 3px);
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* SVG
#     _______      _______
#    / ____\ \    / / ____|
#   | (___  \ \  / / |  __
#    \___ \  \ \/ /| | |_ |
#    ____) |  \  / | |__| |
#   |_____/    \/   \_____|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.svg-holder {
  @extend %relative;
  @include box(rem(22px));

  .svg-icon {
    @include position(absolute, $translate-center: true);
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* List
#    _      _     _
#   | |    (_)   | |
#   | |     _ ___| |_
#   | |    | / __| __|
#   | |____| \__ \ |_
#   |______|_|___/\__|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.list__ui {
  display: flex;
  border-bottom: rem(1px) solid $base-color;
  @extend %clearfix;

  > li {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    max-width: 100%;
    @include rem(padding, 10px);

    &.--is-center {
      justify-content: center;
    }

    &.--is-active {
      box-shadow: inset 0 rem(3px) rem(5px) rgba($base-color, .75);

      > * {
        @include position(relative, rem(2px));
        color: $green-text;
        text-shadow: 0 0 rem(5px) $green-text
      }

      path {
        fill: $green-text !important;
        filter: drop-shadow( 0 0 rem(10px) $green-text );
      }
    }

    &.--is-icon {
      position: relative;
      justify-content: center;
      flex: 0 0 50px;
      user-select: none;
      cursor: pointer;

      &.--is-not-clickable {
        cursor: default;
      }

      .svg-icon {
        @include position(absolute, $translate-center: true);
      }
    }
  }
}

.language__list {
  display: flex;
  @extend %clearfix;
  margin-bottom: 10px;

  &.--is-login {
    float: left;
    align-items: center;
    @include box(80px, 70px);
  }

  &.--flex-wrap {
    flex-wrap: wrap;

    li,
    .list {
      margin-top: 0;
      margin: 10px 21px;
    }
  }

  li,
  .list {
    display: inline-flex;
    align-items: center;
    box-shadow: 0 0 0 2px rgba($base-color, .5);
    //@include box(rem(35px), rem(30px));
    //@include rem(margin, 16px 23px);

    img{
      width: 100%;
      filter: grayscale(1)
    }

    &.--is-selected {
      @include themify($theme-colors) {
        box-shadow: 0 0 0 2px themed('success');
      };
      img {
        filter: grayscale(0)
      }
    }
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Checkbox
#     _____ _               _    _
#    / ____| |             | |  | |
#   | |    | |__   ___  ___| | _| |__   _____  __
#   | |    | '_ \ / _ \/ __| |/ / '_ \ / _ \ \/ /
#   | |____| | | |  __/ (__|   <| |_) | (_) >  <
#    \_____|_| |_|\___|\___|_|\_\_.__/ \___/_/\_\
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.checkbox__ui {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  @include rem((
    height: 32px
  ));
  cursor: pointer;

  .checkmark {
    display: block;
    @include position(absolute, $left: 50%, $bottom: 0, $index: 2);
    @include box(rem(20px));
    @include rem((
      margin-left: -9px,
      border-radius: 20px
    ));
    transition: .3s all linear;

    &:after {
      content: "";
      @include position(absolute,2px,6px, $index: 2);
      @include box(rem(6px),rem(13px));
      border-style: solid;
      @include rem(border-width, 0 2px 2px 0);
      border-color: $base-color-inverted;
      transition: .3s all linear;
      transform: rotate(45deg) scale(0)
    }
  }

  input:checked ~ .checkmark:after {
    transform: rotate(45deg) scale(.8);
  }

  input:checked ~ .checkmark {
    background-color: $green-text;
  }

  input[type='radio'],
  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Button
#    ____        _   _
#   |  _ \      | | | |
#   | |_) |_   _| |_| |_ ___  _ __
#   |  _ <| | | | __| __/ _ \| '_ \
#   | |_) | |_| | |_| || (_) | | | |
#   |____/ \__,_|\__|\__\___/|_| |_|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.--is-btn-radius {
  @include rem(border-radius, 30px);
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Animation
#                   _                 _   _
#       /\         (_)               | | (_)
#      /  \   _ __  _ _ __ ___   __ _| |_ _  ___  _ __
#     / /\ \ | '_ \| | '_ ` _ \ / _` | __| |/ _ \| '_ \
#    / ____ \| | | | | | | | | | (_| | |_| | (_) | | | |
#   /_/    \_\_| |_|_|_| |_| |_|\__,_|\__|_|\___/|_| |_|
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
@include keyframes(rotate) {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Colors
#     _____      _
#    / ____|    | |
#   | |     ___ | | ___  _ __ ___
#   | |    / _ \| |/ _ \| '__/ __|
#   | |___| (_) | | (_) | |  \__ \
#    \_____\___/|_|\___/|_|  |___/
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.blue {
  @include color-switch($blue !important, $text-color: true);
}

.bg-blue {
  @include color-switch($blue !important, $background-color: true);
}

.slider-color {
  @include color-switch($table-box-color !important, $background-color: true, $border-color: true);
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Deck Cards
#    _____            _       _____              _
#   |  __ \          | |     / ____|            | |
#   | |  | | ___  ___| | __ | |     __ _ _ __ __| |___
#   | |  | |/ _ \/ __| |/ / | |    / _` | '__/ _` / __|
#   | |__| |  __/ (__|   <  | |___| (_| | | | (_| \__ \
#   |_____/ \___|\___|_|\_\  \_____\__,_|_|  \__,_|___/
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
$spade-cards: 1s, 2s, 3s, 4s, 5s, 6s, 7s, 8s, 9s, 10s, js, qs, ks;
$club-cards: 1c, 2c, 3c, 4c, 5c, 6c, 7c, 8c, 9c, 10c, jc, qc, kc;
$heart-cards: 1h, 2h, 3h, 4h, 5h, 6h, 7h, 8h, 9h, 10h, jh, qh, kh;
$diamond-cards: 1d, 2d, 3d, 4d, 5d, 6d, 7d, 8d, 9d, 10d, jd, qd, kd;

@each $spade in $spade-cards {
  .card__deck__result .--is-#{$spade} { // 1
    @include cover-image(contain,url('#{$scards}/spade/#{$spade}.png'));
  }

  .betting__result .--is-#{$spade} {
    @include cover-image(contain,url('#{$cards}/spade/#{$spade}.png'));
  }

  .squeeze__card.--is-#{$spade} {
    @include cover-image(contain,url('#{$cards}/spade/#{$spade}.png'));
  }

  .bet__history .--is-#{$spade} {
    @include cover-image(contain,url('#{$cards}/spade/#{$spade}.png'));
  }
}

@each $club in $club-cards {
  .card__deck__result .--is-#{$club} { // 1
    @include cover-image(contain,url('#{$scards}/club/#{$club}.png'));
  }

  .betting__result .--is-#{$club} {
    @include cover-image(contain,url('#{$cards}/club/#{$club}.png'));
  }

  .squeeze__card.--is-#{$club} {
    @include cover-image(contain,url('#{$cards}/club/#{$club}.png'));
  }

  .bet__history .--is-#{$club} {
    @include cover-image(contain,url('#{$cards}/club/#{$club}.png'));
  }
}

@each $heart in $heart-cards {
  .card__deck__result .--is-#{$heart} { // 1
    @include cover-image(contain,url('#{$scards}/heart/#{$heart}.png'));
  }

  .betting__result .--is-#{$heart} {
    @include cover-image(contain,url('#{$cards}/heart/#{$heart}.png'));
  }

  .squeeze__card.--is-#{$heart} {
    @include cover-image(contain,url('#{$cards}/heart/#{$heart}.png'));
  }

  .bet__history .--is-#{$heart} {
    @include cover-image(contain,url('#{$cards}/heart/#{$heart}.png'));
  }
}

@each $diamond in $diamond-cards {
  .card__deck__result .--is-#{$diamond} { // 1
    @include cover-image(contain,url('#{$scards}/diamond/#{$diamond}.png'));
  }

  .betting__result .--is-#{$diamond} {
    @include cover-image(contain,url('#{$cards}/diamond/#{$diamond}.png'));
  }

  .squeeze__card.--is-#{$diamond} {
    @include cover-image(contain,url('#{$cards}/diamond/#{$diamond}.png'));
  }

  .bet__history .--is-#{$diamond} {
    @include cover-image(contain,url('#{$cards}/diamond/#{$diamond}.png'));
  }
}

.unanimated__red {
  background-image: url('https://static.oriental-game.com/cards/squeezeRed.png');
  background-position: center;
  background-size: contain;
}
.unanimated__blue {
  background-image: url('https://static.oriental-game.com/cards/squeezeBlue.png');
  background-position: center;
  background-size: contain;
}
.red__gif {
  background-image: url('https://static.oriental-game.com/cards/_red.gif');
  background-position: center;
  background-size: contain;
}
.blue__gif {
  background-image: url('https://static.oriental-game.com/cards/_blue.gif');
  background-position: center;
  background-size: contain;
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Chips
#     _____ _     _
#    / ____| |   (_)
#   | |    | |__  _ _ __  ___
#   | |    | '_ \| | '_ \/ __|
#   | |____| | | | | |_) \__ \
#    \_____|_| |_|_| .__/|___/
#                  | |
#                  |_|
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
$chips: bl, blk, br, dbr, dg, g, p, r, v, y, sq;

@each $chip in $chips {
  .#{$chip}-chip { // 1
    @include box(rem(50px));
    // @include rem(margin-bottom, -5px);
    background-color: transparent !important;
    @include cover-image(cover, url('#{$chipPath}#{$chip}-chip.png') !important);
    border-radius: 50%;

    &:before {
      content: '';
      display: block;
      border-radius: 50%;
      @include box(50px, 47px);
      box-shadow: 0 0 0 rgba(0, 252, 252, 0);
      transition: all .5s cubic-bezier(.56,.24,.18,.85);
    }
  }

  .active {

    .#{$chip}-chip { // 1

      &:before {
        // @include rem(margin-bottom, 3px);
        box-shadow: 0 5px 10px rgba(0, 252, 252, 0.5);
      }
    }
  }
}
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* Themes
#    _______ _
#   |__   __| |
#      | |  | |__   ___ _ __ ___   ___  ___
#      | |  | '_ \ / _ \ '_ ` _ \ / _ \/ __|
#      | |  | | | |  __/ | | | | |  __/\__ \
#      |_|  |_| |_|\___|_| |_| |_|\___||___/
#
*/
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
/* =========================================================================================================================== */
.scalable__window {
  @include themify($theme-colors) {
    color: rgba(themed('color'), .87) !important;
  };
}

.v-carousel {
  box-shadow: none;
}

.v-carousel__controls {
  background: transparent;
  justify-content: flex-end;

  .v-btn--icon {
    @include rem((
      height: 5px,
      border-radius: 10px,
      margin: 0 5px !important
    ));
    @include themify($theme-colors) {
      background-color: themed('invert-color') !important;
    };
    opacity: .5;
  }

  .v-btn--active {
    opacity: 1;

    &:before {
      background-color: transparent;
    }
  }
}

.version-text {
  @include themify($theme-colors) {
    color: themed('accent');
  };
  text-align: center;
}

.accent__color--text {
  @include themify($theme-colors) {
    color: themed('accent') !important;
    caret-color: themed('accent') !important;
  };

  .v-progress-circular__overlay {
    @include themify($theme-colors) {
      stroke: themed('accent') !important;
    };
  }
}

.channel .v-select__selection--comma,
.channel.theme--light .v-input__icon .v-icon {
  color: $base-color-inverted;
}

// focus and active class
.v-list__tile--active,
.v-input--is-focused .v-text-field__slot,
.v-input--is-focused .v-text-field__slot .v-label,
.v-input--is-focused.v-input:not(.v-input--is-disabled) input,
.v-input--is-focused .v-input__icon .v-icon,
.v-select--is-label-active.v-input--is-focused.v-select .v-select__selections,
.channel.v-select--is-menu-active .v-select__selection--comma,
.v-date-picker-header__value strong:hover,
.v-date-picker-years li.active {
  @include themify($theme-colors) {
    color: themed('accent') !important;
  };
}

.v-text-field > .v-input__control > .v-input__slot:before {
  @include themify($theme-colors) {
    border-color: themed('tabColor');
  };
  border-image: none !important;
}

.v-text-field > .v-input__control > .v-input__slot:after {
  @include themify($theme-colors) {
    border-color: themed('accent') !important;
  };
}


// input & form
.v-input--slider .v-slider__track,
.v-input--slider .v-slider__track-fill {
  @include rem(height, 1px);
}

.v-text-field__slot,
.v-text-field__slot .v-label,
.v-input--is-disabled input,
.v-input__icon .v-icon,
.v-select .v-select__selections,
.v-table thead th,
.v-input:not(.v-input--is-disabled) input {
  @include themify($theme-colors) {
    color: rgba(themed('accent'), .75);
  };
}

.v-input--switch__thumb {
  @include themify($theme-colors) {
    color: lighten(themed('accent'), 15%);
  };
}

// Text
.v-picker__title,
.application .v-navigation-drawer .list__ui li.active:before,
.--chat-prompt:after {
  @include themify($theme-colors) {
    background-color: themed('accent') !important;
  };
}

// temporary color
.v-input--is-label-active .v-input--switch__track,
.v-input--is-label-active .v-input--switch__thumb,
.v-input--slider.v-input--is-label-active .v-slider__thumb,
.v-input--slider.v-input--is-label-active .v-slider__track-fill,
.v-navigation-drawer .list__ui li.--is-lobby:before,
.settings__modal .road li.--is-selected:before {
  @include themify($theme-colors) {
    background-color: themed('success') !important;
  };
}

.v-pagination--circle .v-pagination__item--active {
  @include themify($theme-colors) {
    background-color: themed('success') !important;
    border-color: themed('success') !important;
    color: themed('light') !important;
  };
}

.modal__title,
.title-header {
  @include themify($theme-colors) {
    color: rgba(themed('accent'), 1);
  };
}

span.default,
.settings__modal .list__ui > li {
  @include themify($theme-colors) {
    color: rgba(themed('accent'), .75);
  };
}

// Button & pagination
.v-pagination__item {
  @include themify($theme-colors) {
    background-color: rgba( themed('accent'), .10) !important;
    border-color: themed('accent');
    color: rgba(themed('accent'), .5);
  }
}

.v-pagination--circle .v-pagination__navigation,
.v-date-picker-table .v-btn.v-btn--active {
  @include themify($theme-colors) {
    background-color: themed('accent') !important;
    border-color: themed('accent') !important;
    color: themed('$base-color-inverted') !important;
  };
}

.v-date-picker-table .v-btn.v-btn--outline {
  @include themify($theme-colors) {
    background-color: transparent !important;
    border-color: themed('accent') !important;
    color: themed('accent') !important;
  };
}

// sidebar
.sidebar__card .--is-side-betting .side__betting__area .--mw-ratio,
.sidebar__card .--is-side-betting .side__betting__area .--sb-ratio,
.sidebar__card .--has-result .list__ui li span,
.sidebar__card .card__header li marquee {
  @include themify($theme-colors) {
    color: themed('invert-color');
  };
}

.sidebar__card.--has-betting {
  @include themify($theme-colors) {
    box-shadow: 0 0 10px themed('accent');
  }
}

.sidebar__card.--has-goodtips {
  @include themify($theme-colors) {
    box-shadow: 0 0 10px $gold-text;
  }
}

// Table

.right__drawer .table__setter,
.left__drawer .table__score {
  @include themify($theme-colors) {
    background-color: themed('light') !important;
  };
}

.left__drawer .table__score li.--is-active {
  @include themify($theme-colors) {
    background-color: themed('accent');
  };
}

.right__drawer .table__setter.--is-black,
.left__drawer .table__score.--is-black {
  @include themify($theme-colors) {
    background-color: themed('dark') !important;
  };
}

.road {

  &.--is-light {
    @include themify($theme-colors) {
      background-color: themed('light') !important;
      border-color: themed('border') !important;
    };

    .--is-shuffling {
      @include themify($theme-colors) {
        background-color: themed('light');
        color: themed('color');

        .svg-icon {

          path {
            fill: themed('color');
          }
        }
      };
    }

    .table__road.big__road,
    .table__road > li {
      @include themify($theme-colors) {
        border-color: themed('border') !important;
      };
    }

    .table__road.big__road:before,
    .table__road.big__eye:before,
    .table__road.small__eye:before {
      @include themify($theme-colors) {
        border-color: themed('border') !important;
      };
    }
  }

  &.--is-dark {
    @include themify($theme-colors) {
      background-color: themed('dark') !important;
      border-color: darken(themed('border'), 50%) !important;
    };

    .--is-shuffling {
      @include themify($theme-colors) {
        background-color: themed('dark');
        color: themed('light');

        .svg-icon {

          path {
            fill: themed('light');
          }
        }
      };
    }

    .table__road.big__road,
    .table__road > li {
      @include themify($theme-colors) {
        border-color: darken(themed('border'), 50%) !important;
      };
    }

    .table__road.big__road:before,
    .table__road.big__eye:before,
    .table__road.small__eye:before {
      @include themify($theme-colors) {
        border-color: darken(themed('border'), 50%) !important;
      };
    }
  }
}

.v-table {
  @include themify($theme-colors) {
    color: themed('bgcolor');
  };

  thead {

    th {
      @include themify($theme-colors) {
        color: themed('accent');
      };
    }

    tr {

      &:first-child {
        @include themify($theme-colors) {
          border-bottom-color: rgba(themed('bgcolor'), .15);
        };
      }
    }
  }

  tbody {

    tr {

      td {
        @include themify($theme-colors) {
          color: themed('color');
        };
      }

      &:not(:last-child) {
        border-color: transparent !important;
      }

      &:hover:not(.v-datatable__expand-row) {
        @include themify($theme-colors) {
          background-color: rgba(themed('accent'), .25) !important;
        };

        td {
          @include themify($theme-colors) {
            color: rgba(themed('accent'), .75);
          };
        }
      }
    }
  }
}

.lobby__table {

  .v-tabs__icon {
    @include themify($theme-colors) {
      color: themed('accent');
    };
  }

  .slider-color-bg {
    @include themify($theme-colors) {
      background-color: rgba(invert(themed('bgcolor')), .5);
    }
  }

  .v-tabs__div {

    a {
      @include themify($theme-colors) {
        color: themed('accent');
      };
      background-color: transparent;

      &.v-tabs__item--active {

        &:before {
          content: '';
          @include position(absolute, $bottom: 10px);
          widtH: 55%;
          @include rem((
            height: 1px
          ));
          @include themify($theme-colors) {
            background-color: themed('invert-color');
          };
        }
      }

      &:not(.v-tabs__item--active) {
        color: #827f7a !important;
        opacity: 1;
        // @include themify($theme-colors) {
        //   background-color: rgba( invert(themed('bgcolor')), .10)
        // };
        .svg-holder {

          .svg-icon {

            path {
              fill: #827f7a !important;
            }
          }
        }
      }
    }
  }
}

.bet__history {
  @include themify($theme-colors) {
    color: themed('color');
  };
}

.record__modal .slider-color-bg,
.rank__modal .slider-color-bg {
  @include themify($theme-colors) {
    background-color: themed('success') !important;
  };
}

.record__modal .v-tabs__div a.v-tabs__item--active,
.rank__modal .v-tabs__div a.v-tabs__item--active {
  @include themify($theme-colors) {
    color: themed('invert-color') !important
  };
}

.og .lobby__table .v-tabs__div a {
  color: $base-color-inverted;
}

.light .lobby__table .v-tabs__div a {
  color: $base-color-inverted;

  &:not(.v-tabs__item--active) {
    color: rgba($base-color-inverted, .5) !important;
  }
}

.manbetx .lobby__table .slider-color-bg {
  position: relative;
  background-color: transparent;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background-color: #00edff;
    box-shadow: 0 0 10px #00edff
  }
}

// card
.translucent__card .v-card__title .list__ui li:first-child,
.translucent__card .v-card__title .list__ui li:nth-child(3) span:first-child,
.right-sidebar .sidebar__card .card__header li:first-child,
.right-sidebar .sidebar__card .mini-tile ul li:last-child,
.table__info ul li:first-child span:nth-child(odd),
.chat__box .chat .list div:first-child {
  @include themify($theme-colors) {
    color: themed('text-accent')
  }
}

.table__info ul li span:nth-child(odd) {
  @include themify($theme-colors) {
    color: lighten(themed('text-accent'),35%);
  }
}

.sidebar__card.baccarat.--has-goodtips {
  @include themify($theme-colors) {
    box-shadow: 0 0 10px themed('text-accent') !important;
  }
}

.translucent__card .v-card__title .list__ui li:last-child {
  @include themify($theme-colors) {
    color: themed('success')
  }
}

// modal
.bidder li .bidder__wrapper {
  @include themify($theme-colors) {
    background-color: rgba(themed('bgcolor'), .75);
  };
}

.avatar__modal,
.settings__modal,
.goodtips__modal,
.rrmodal,
.rank__modal,
.gift__modal,
.store__modal,
.chat__modal,
.snotifyToast {
  @include themify($theme-colors) {
    background-image: linear-gradient(to bottom,themed('bgcolor') 0% , darken(themed('bgcolor'), 10%) 100%);
  };
}

.goodtips__modal {

  .goodtips__list > li {
    @include themify($theme-colors) {
      border-color: themed('border');
    };
  }

  .checkmark {
    @include themify($theme-colors) {
      border: 1px solid themed('accent');
    };
  }
}

.noc__modal {

  .divider,
  .slider-color-bg {
    @include themify($theme-colors) {
      background-color: rgba(themed('tabColor'), .5);
    };
  }

  .v-tabs__div {

    a {
      @include themify($theme-colors) {
        color: themed('accent');
      };

      &:not(.v-tabs__item--active) {
        @include themify($theme-colors) {
          color: rgba(themed('accent'), .5) !important;
          background-color: transparent
        };
      }
    }
  }
}

.chat__modal {

  .modal__body {

    .chat__box {

      .chat,
      .list__ui {
        @include themify($theme-colors) {
          border-top-color: rgba(themed('bgcolor'), .15);
        }
      }
    }
  }
}

.store__modal {

  .modal__body {

    .store__box {

      .chat,
      .list__ui {
        @include themify($theme-colors) {
          border-top-color: rgba(themed('bgcolor'), .15);
        }
      }
    }
  }
}

.gift__modal {

  .modal__body {

    .gift__box {

      .chat,
      .list__ui {
        @include themify($theme-colors) {
          border-top-color: rgba(themed('bgcolor'), .15);
        }
      }
    }
  }
}

// @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
//   .application .theme--dark.v-navigation-drawer,
//   .theme--dark .v-navigation-drawer,
//   .rank__modal,
//   .avatar__modal,
//   .settings__modal,
//   .goodtips__modal,
//   .rrmodal,
//   .snotifyToast {
//     -webkit-backdrop-filter: blur(10px);
//     backdrop-filter: blur(10px);
//     background-color: rgba($base-color-inverted, 0.5);
//   }

//   .right-sidebar,
//   .bidder li .bidder__wrapper {
//     -webkit-backdrop-filter: blur(50px);
//     backdrop-filter: blur(50px);
//     background-color: rgba($base-color, 0.5);
//   }
// }

// @supports not (backdrop-filter: none) {
//   .application .theme--dark.v-navigation-drawer,
//   .theme--dark .v-navigation-drawer,
//   .rank__modal,
//   .avatar__modal,
//   .settings__modal,
//   .goodtips__modal,
//   .rrmodal,
//   .snotifyToast {
//     @include themify($theme-colors) {
//       background-image: linear-gradient(to bottom,themed('bgcolor') 0% , darken(themed('bgcolor'), 10%) 100%);
//     };
//   }

//   .right-sidebar,
//   .bidder li .bidder__wrapper {
//     background-color: rgba($base-color, .75);
//   }
// }

// accent color
.chat__modal {

  .dealer__img {
    @include themify($theme-colors) {
      background-color: themed('accent')
    };
  }
}

.card-hidden{
  display: none;
}
</style>
