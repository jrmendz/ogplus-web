<template>
  <div class="streamer__video" >
    <video :id="'stream'"><source type='video/flv'></video>
    <div class="streamer__video__header">
      <div class="streamer__name">
        {{ tt(streamerinfo.nickname || 'No Dealer') | capitalize}}
      </div>
      <!-- <SocialComponent iconSize="16" :followers="[{name: 'player_icon', count: '600'}]" :hearts="[{name: 'heart', count: streamerinfo.likes || 0 }] " /> -->
      <SocialComponent iconSize="16" :hearts="[{name: 'heart', count: streamerinfo.likes || 0 }]" :streamerinfo="streamerinfo.dealerscode"/>
    </div>
    <div class="btn__streamer_play cursor" @click="enterStreamer(tableNumber)" v-if="!isInGame ">
      <div class="svg-holder">
        <svgicon name="baccarat" height="24" color="#ffffff"></svgicon>
      </div>
      <span>{{ tt('PLAY') }}</span>
    </div>
    <ul class="streamer__chat" v-if="!streamerInGame">
      <li v-for="chat in chatThread" :key="chat.id"><span>{{chat.nickname}}:</span>{{chat.message}}</li>
    </ul>
    <ChatComponent v-if="streamerInGame"/>
  </div>
</template>

<script>
  import SocialComponent from '@/components/streamer/SocialComponent'
  import ChatComponent from '@/components/video/ChatComponent'
  import Hls from 'hls.js'

  export default {
    name: "Streamer-Video",
    data () {
      return {
        volume: 10,
        hlsjs: null,
        video: null,
        hlsjsConfig: {
          maxBufferSize: 0
        },
        streamerinfo: {},
        streamerList: []
      }
    },
    props: {
      tableNumber: { type: String, required: true, default: null }
    },
    mounted () {
      let _s = this
      console.log("Props from Streamer-Video Component", _s.$props)
      _s.playVideo(0)
      _s.$root.$on('vDestroy', () => {
        _s.hlsjs.destroy()
      })
      this.joinchat()
    },
    components: {
      SocialComponent,
      ChatComponent
    },
    watch: {
      'streamerTableNumber': function (value) {
        let _s = this
        _s.streamerinfo = _.find(_s.streamerList, x => x.table_location === value)
        _s.joinchat()
      },
      'setstreamerinfo': function (value) {
        let _s = this
        _s.streamerinfo = _.find(value, x => x.table_location === _s.streamerTableNumber)
      },
      'chatThread': function (value) {
        console.log('check chat', value)
      }
    },
    methods: {
      ditchVideo: function () {
        let _s = this
        _s.hlsjs.destroy()
      },
      joinchat: function () {
        this.$store.dispatch('JOIN_CHAT_TABLE', { token: localStorage._token, table_number: this.streamerTableNumber })
      },

      playVideo: function (index) {
        let _s = this
        let videoDOM = theDOM(index)


        _s.$store.dispatch('LOAD_TOP_STREAMER').then((res) => {
        if (res.data.length) {
            _s.streamerList = res.data
            _s.streamerinfo = res.data[0]
          }
        }, (err) => {
          console.log(err)
        })

        function theDOM (i) {
          return document.getElementById('stream')
        }

        try {
          let videoDOM = theDOM(index)
          function theDOM (i) {
            return document.getElementById('stream')
          }
          if (Hls.isSupported()) {
              if (videoDOM) {
                 _s.hlsjs = new Hls(_s.hlsjsConfig)
                 _s.hlsjs.loadSource(_s.$store.state.tablelist[_s.streamerTableNumber].videoUrl.sea[2])
                 _s.hlsjs.attachMedia(videoDOM)
                 videoDOM.play()
                 videoDOM.volume = _s.$store.state.vid_stream
              }
          }
        } catch (err) {
          console.log('No video in data')
        }
      },
      enterStreamer: function () {
        let _s = this
        _s.hlsjs.stopLoad()
        console.log('enterStreamer!')
          _s.$store.dispatch('ENTER_TABLE', {
            data: _s.$store.state.tablelist[_s.$props.tableNumber],
            tableid: _s.$store.state.tablelist[_s.$props.tableNumber].tableNumber,
            isStreamer: true
          }).then((success) => {
            console.log(success)
          }, (error) => {
            console.log(error)
          })
      },
    },
    computed: {
      streamerInGame: {
        get () { return this.$store.state.streamer.isInGame },
        set (v) {  this.$store.state.streamer.isInGame = v  }
      },
      setstreamerinfo: {
        get () {
          return this.$store.state.streamerlist
        }
      },
      streamerTableNumber: {
        get () {
          return this.$store.state.currentStreamerTable
        }
      },
      isInGame: {
        get () { return this.$store.state.streamer.isInGame },
      },
      chatThread: {
        get () {
          let chat = this.$store.state.thread
          let chatLenght = chat.length
          return chat.slice(Math.ceil(chatLenght-5), chatLenght)
        }
      }
    }
  }
</script>

<style lang="scss">
$width: 500px;

.streamer__video {
  flex: 1 0 $width;
  position: relative;
  @include rem((
    margin: 0 30px,
    border-radius: 10px,
    width: $width,
    max-width: $width
  ));
  background-color: $base-color;
  overflow: hidden;

  video {
    @include position(absolute, $translate-center: true);
    height: 830px;
  }

  &:before {
    content: '';
    @include position(absolute, $bottom: 0);
    width: 100%;
    height: 35%;
    background-image: linear-gradient(to bottom, rgba($base-color, 0) 0%,rgba($base-color, .65) 100%);
  }

  .streamer__video__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include position(absolute, 0, 0, 0, $index: 1);
    @include rem(padding, 5px 10px);
    color: $base-color-inverted;
    background-color: rgba($base-color, .5);

    .streamer__name {
      @include rem(padding-left, 10px);
    }

    .timeline__social__btn {

      li {
        @include rem(margin, 0 10px);
      }
    }
  }

  .btn__streamer_play {
    @include position(absolute,50%,50%,$index: 5);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    @include rem((
      width: 160px,
      padding: 8px 16px,
      font-size: 18px,
      border-radius: 50px,
      letter-spacing: 3px,
      border-width: 1px,
    ));
    border-style: solid;
    border-color: #f3e038;
    color: $base-color-inverted;
    font-weight: 400;
    text-shadow: 0 0 4px rgba($base-color-inverted, .75);
    box-shadow: inset 0 0 18px rgba($base-color-inverted, .75), 0 0 14px rgba(#f3e038, .75), 0 0 16px rgba($base-color-inverted, .50);
    transform: translate3d(-50%, -50%, 0) scale(1.2);

    .svg-holder {
      @include rem(margin-right, 5px);
      filter: drop-shadow(0 0 4px rgba($base-color-inverted, .75));
    }
  }

  .streamer__chat {
    @include position(absolute, $bottom: 0);
    @include rem(padding,20px);
    color: $base-color-inverted;

    li {
      @include rem((
        padding: 7px 10px,
        margin-bottom: 7px,
        border-radius: 20px
      ));
      background-color: rgba($base-color, .5);

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      @include rem(margin-right, 5px);
      font-size: inherit;
    }
  }

  .chat__box {
    @include position(absolute, $bottom: 0);
    width: 100%;

    .chat {
      border-top: 0;
      @include rem((
        height: 250px
      ));

      .list {
        position: relative;
        display: table;
        @include rem((
          padding: 7px 10px,
          border-radius: 50px
        ));
        background-color: rgba($base-color, .5);
      }
    }

    .list__ui {
      border-top: 0;
      background-color: rgba($base-color, .5);

      > li {
        border: 0;
      }
    }
  }
}
</style>
