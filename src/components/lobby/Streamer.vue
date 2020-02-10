<template>
  <div :class="streamerInGame ? '' : 'streamer__wrapper'">

    <!-- <StreamerInGame v-if="streamerInGame"/>

    <template v-else> -->
      <div class="streamer__content reverse">
        <div class="streamer__timeline">
          <!-- tab for timeline and ranking -->
          <v-tabs v-model="streamer__timeline" centered grow hide-slider>
            <v-tab href="#timeline" ondragstart="return false" :ripple="false">
              <div class="tab__holder">
                <div class="svg-holder">
                  <svgicon name="rocket" height="24" original></svgicon>
                </div>
                {{ tt('Timeline') }}
              </div>
            </v-tab>
            <v-tab href="#ranking" ondragstart="return false" :ripple="false">
              <div class="tab__holder">
                <div class="svg-holder">
                  <svgicon name="star" height="24" original></svgicon>
                </div>
                {{ tt('Ranking') }}
              </div>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="streamer__timeline">
            <!-- timeline content -->
            <v-tab-item value="timeline">
              <div class="scroller">
                <TimelineComponent v-for="(timeline, i) in streamerList" :key="i" :imgSrc="timeline.imagestreamer"/>
              </div>
            </v-tab-item>
            <!-- ranking content -->
            <v-tab-item value="ranking">
              <RankingComponent />
            </v-tab-item>
          </v-tabs-items>
          <!-- this is a content of the recent live streamer -->
          <div class="live__stream__post">
            <p>This is a timeline caption for this post. This is a timeline caption for this post. This is a timeline caption for this post. This is a timeline caption for this post...</p>
            <p>Streamer posted a status <span>5/3/2019, Friday 3:51 PM</span></p>
          </div>
        </div>
        <!-- live streamer video -->
        <StreamerVideo :tableNumber="$store.state.currentStreamerTable" :streamerList="streamerList" ref="StreamerVideo" :class="streamerInGame ? '' : 'lobby__streamer__video'"/>
        <!-- streamer listing -->
        <div class="streamer__list">
          <div class="streamer__nav">
            <!-- streamer setting bar -->
            <ul class="streamer__settings" style="width: 400px; flex: 400px 0 0; margin: 0 auto;">
              <li>
                <div class="svg-holder cursor" @click="stream_refresh()">
                  <svgicon name="video_refresh_2" height="24" color="#fff"></svgicon>
                </div>
              </li>>
              <li style="padding-right: 40px">
                <v-slider
                  v-model="video_volume"
                  color='#fff'
                  prepend-icon="volume_up"
                ></v-slider>
              </li>
            </ul>
          </div>
          <h4>{{ tt('Streamer List') }}</h4>
          <div class="scroller">
            <StreamerListComponent v-for="(streamer, i) in streamerList" :key="i" :data-number="i" :data="streamer" v-on:click.native="clickvideo(i, streamer.table_location)"/>
          </div>
        </div>
      </div>
    <!-- </template> -->

  </div>
</template>

<script>
  import UserProfileComponent from '@/components/sidebar/UserProfileComponent'
  import StreamerListComponent from '@/components/streamer/StreamerListComponent'
  import RankingComponent from '@/components/streamer/RankingComponent'
  import TimelineComponent from '@/components/streamer/TimelineComponent'
  import StreamerVideo from '@/components/lobby/Streamer-Video'
  import Hls from 'hls.js'

  export default {
    name: "Streamer",
    components: {
      RankingComponent,
      TimelineComponent,
      UserProfileComponent,
      StreamerListComponent,
      StreamerVideo
    },
    data() {
      return {
        volume: 10,
        hlsjs: null,
        // video: null,
        // hlsjsConfig: {
        //   maxBufferSize: 0,
        // },
        slides: {
          url: ''
        },
        // videIn: [
        //   {
        //     url: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        //   },
        //   {
        //     url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
        //   },
        //   {
        //     url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
        //   }
        // ],
        streamer__timeline: null,
        images: [
          {url: 'https://buzzwav.com/wp-content/uploads/2016/06/445e1e44jw1etpm4b1ruzj21ab1xg19x_cover.jpg'},
          {url: 'https://images6.alphacoders.com/377/377327.jpg'},
          {url: 'https://wallpapercave.com/wp/wp2522073.jpg'},
          {url: 'http://www.kinyu-z.net/data/wallpapers/207/1429002.jpg'},
          {url: 'http://www.model-jobs.net/wp-content/uploads/2016/10/asian-model-wallpaper-25.jpg'},
          {url: 'http://www.kinyu-z.net/data/wallpapers/207/1429002.jpg'}
        ]
      }
    },
    methods: {
      stream_refresh: function () {
        let _s = this
        _s.$refs.StreamerVideo.ditchVideo()
        let playPromise = _s.$refs.StreamerVideo.playVideo()
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });
        }
      },
      clickvideo: function (index, tablenumber) {
        let _s = this

        if (tablenumber === '') return;

        _s.$store.state.currentStreamerTable = tablenumber

        try {
          let videoDOM = theDOM(index)
          function theDOM(i) {
            return document.getElementById('stream')
          }

          if (Hls.isSupported()) {
            if (videoDOM) {
              _s.hlsjs = new Hls(_s.hlsjsConfig)
              console.log('vaoovvaa', _s.$store.state.tablelist[tablenumber].videoUrl.sea[2])
              _s.hlsjs.loadSource(_s.$store.state.tablelist[tablenumber].videoUrl.sea[2])
              _s.hlsjs.attachMedia(videoDOM)
              videoDOM.play()
            }
          }
        } catch (err) {
          console.log('No video in data')
        }
        _s.hlsjs.stopLoad()
      }
    },
    mounted: function () {
      let _s = this
      // _s.playVideo(0)
      // _s.loadStreamer()
      // _s.$root.$on('tabledestroy', () => {
      //   _s.hlsjs.destroy()
      // })
      _s.video_volume = 100
      console.log(_s.$store.state.video_volume, 'video_volume')
      _s.$store.state.streamer.isInGame = false

      _s.$store.dispatch('LOAD_TOP_STREAMER')
    },
    watch: {
      'video_volume': function (to, from) {
        let streamvid = document.getElementById('stream')
        if (streamvid) {
          streamvid.volume = to * 0.01
        }
        this.$store.commit('VID_STREAM', streamvid.volume)
        // this.$store.state.hlsPlayer.volume = streamvid.volume
        // console.log(this.$store.state.hlsPlayer.volume)
      }
    },
    computed: {
      streamerInGame: {
        get() {
          return this.$store.state.streamer.isInGame
        },
        set(v) {
          this.$store.state.streamer.isInGame = v
        }
      },
      streamTable: {
        get() {
          return this.$store.state.streamer.tableNumber
        },
        set(v) {
          this.$store.state.streamer.tableNumber = v
        }
      },
      streamerList: {
        get() {
          return this.$store.state.streamerlist
        }
      },
      video_volume: {
        get(e) {
          return e.$store.state.volumestreamer
        },
        set(value) {
          this.$store.state.volumestreamer = value
        }
      },
      currentTable: {
        get() {
          return this.$store.state.currentTable
        }
      }
    }
  }
</script>

<style lang="scss">
$tab-color: #ece2a8;



.lobby__streamer__video video {
  height: 592px;
}

.btn__streamer_play {
  background-image: linear-gradient(to left, #e7423a 0%,#f3e038 100%);
}

.on_stream {
  padding: 0 !important;

  li {

    &:first-child {
      margin: 7px !important;

      .v-avatar {
        pointer-events: none;
      }
    }

    &.user__info {
      display: flex;
      align-items: center;
      @include rem((
        margin-left: 5px,
      ));

      p {
        @include rem(margin-right, 10px);
        color: $base-color-inverted;
      }

      .--is-number {
        color: $gold-text !important;
      }
    }
  }
}

.scroller {
  @extend %placeholder;
  @include rem(max-height, 455px);
  overflow-y: auto;
}

.live__stream__post {
  @include rem(padding,10px);
  color: $base-color-inverted;

  p {
    margin: 0;

    + p {
      @include rem(margin-top, 7px);
    }

    span {
      font-size: inherit;
      color: darken($base-color-inverted, 35%);
    }
  }
}

.streamer__wrapper {
  @include position(absolute);
  top: 56px + 80px;
  width: 100%;
  height: calc(100% - (80px + 160px));
  @include rem((
    padding: 16px 20px
  ));

  .streamer__nav {
    display: flex;
    @include box(100%, 60px);
    @include rem((
      border-radius: 10px,
      margin-bottom: 24px
    ));
    background-color: rgba($base-color, .75);

    .v-input--slider .v-slider__track {
      background-color: rgba($base-color-inverted, .35);
    }
    .v-input--slider:not(.v-input--is-dirty) .v-slider__thumb {
      background-color: $base-color-inverted !important;
    }

    > .user__avatar,
    > .streamer__settings {
      display: flex;
      flex: 1 0 0;
    }

    .streamer__settings {
      align-items: center;

      > li {
        display: inline-flex;
        flex: 1 0 auto;

        &:first-child {
          justify-content: center;
        }

        &:last-child {
          justify-content: center;
        }

        ul {
          display: flex;
          @include rem((
            padding: 0 10px,
          ));

          li {
            position: relative;
            display: inline-flex;
            align-items: center;
            flex: 1 0 100px;
            color: $base-color-inverted;

            &.active {

              &:before {
                background-color: $green-text;
              }
            }

            &:before {
              content: '';
              @include box(15px);
              @include rem((
                margin: 0 5px,
                border-radius: 15px,
              ));
              background-color: $base-color-inverted;

            }
          }
        }
      }

      .v-input--is-focused .v-input__icon .v-icon,
      .v-input__icon .v-icon {
        color: $base-color-inverted !important;
      }
    }
  }

  .streamer__content {
    position: relative;
    display: flex;
    height: calc(100% - 84px);
    justify-content: space-between;

    &.reverse {
      flex-direction: row-reverse;
    }

    .ads {
      width: 100%;
      @include rem((
        height: 138px,
        margin-bottom: 24px,
        border-radius: 10px
      ));
      background-color: $base-color;
      background-size: contain;
      background-repeat: no-repeat;
    }

    .v-tabs {

      .v-tabs__bar {
        background-color: transparent;

        .v-tabs__div {
          @include rem(margin, 0 20px);

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }

          .v-tabs__item {
            position: relative;
            color: $base-color-inverted;

            &::after {
              content: '';
              @include position(absolute, $bottom: 0);
              width: 100%;
              border-bottom: 2px solid $base-color-inverted;
            }

            .tab__holder {
              display: flex;
              align-items: center;
              @include rem(font-size, 16px);

              .svg-holder {
                @include rem(margin-right, 16px);
                filter: drop-shadow(0 0 3px $base-color-inverted);
              }
            }
          }

          .v-tabs__item:not(.v-tabs__item--active) {

            .tab__holder {

              .svg-holder {

                path {
                  fill: $base-color-inverted;
                }
              }
            }
          }

          .v-tabs__item--active {
            color: $tab-color;

            &:after {
              border-color: $tab-color;
            }
          }
        }
      }
    }

    > div {
      display: inline-flex;
      flex: 1 0 550px;
      flex-direction: column;
      @include rem(max-width, 550px);
    }
  }
}

.streamer__list {

  .scroller {
    height: calc(100% - 46px);
    max-height: calc(100% - 46px);
  }

  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    @include rem((
      padding: 10px 10px,
      font-size: 18px,
      letter-spacing: 2px,
    ));
    font-weight: 500;
    color: $base-color-inverted;
    text-transform: uppercase;
  }
}
</style>
