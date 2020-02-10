<template>
  <div>
    <video autoplay id="panda_desk_Video" :class="moneywheel__video"><source type='video/flv'></video>

    <template v-if="show" >
      <video autoplay id="mid_mw"><source type='video/flv'></video>
    </template>
    <template v-if="show1">
      <video autoplay id="res_mw"><source type='video/flv'></video>
    </template>
  </div>
</template>
<script>
// import Video from '@/library/Video.js'

export default {
  data () {
    return {
      show: true,
      show1: true,
    }
  },
  // methods: {
  //   // gettablestatus (val) {
  //   //   let _s = this
  //   //   switch (_s.placebets) {
  //   //     case 'betting' :
  //   //       //
  //   //       break
  //   //     case 'dealing' :
  //   //       return _s.mw_video_mid()
  //   //       break
  //   //     case 'default' :
  //   //       return _s.mw_video_res()
  //   //       break
  //   //   }
  //   //   return val
  //   // },
  //   mw_video_main: function () {
  //     let _s = this
  //     let main_mw = _s.videIn[0].url
  //     try {
  //       let videoDOM = theDOM(main_mw)
  //       function theDOM(i) {
  //         return document.getElementById('panda_desk_Video')
  //       }
  //       if (Hls.isSupported()) {
  //         if (videoDOM) {
  //           _s.$store.state.hlsjs = new Hls(_s.hlsjsConfig)
  //           _s.$store.state.hlsjs.loadSource(main_mw)
  //           _s.$store.state.hlsjs.attachMedia(videoDOM)
  //           videoDOM.play()
  //         }
  //       }
  //     } catch (err) {
  //       console.log('No video in data')
  //     }
  //   },
  //   mw_video_mid: function () {
  //     let _s = this
  //     let mid_mw = _s.videIn[1].url
  //     try {
  //       let videoDOM = theDOM(mid_mw)
  //       function theDOM(i) {
  //         return document.getElementById('mid_mw')
  //       }
  //       if (Hls.isSupported()) {
  //         if (videoDOM) {
  //           _s.$store.state.hlsjs = new Hls(_s.hlsjsConfig)
  //           _s.$store.state.hlsjs.loadSource(mid_mw)
  //           _s.$store.state.hlsjs.attachMedia(videoDOM)
  //           videoDOM.play()
  //         }
  //       }
  //     } catch (err) {
  //       console.log('No video in data')
  //     }
  //   },
  //   mw_video_res: function () {
  //     let _s = this
  //     let res_mw = _s.videIn[2].url
  //     try {
  //       let videoDOM = theDOM(res_mw)
  //       function theDOM(i) {
  //         return document.getElementById('res_mw')
  //       }
  //       if (Hls.isSupported()) {
  //         if (videoDOM) {
  //           _s.$store.state.hlsjs = new Hls(_s.hlsjsConfig)
  //           _s.$store.state.hlsjs.loadSource(res_mw)
  //           _s.$store.state.hlsjs.attachMedia(videoDOM)
  //           videoDOM.play()
  //         }
  //       }
  //     } catch (err) {
  //       console.log('No video in data')
  //     }
  //   },
  // },
  watch: {
    placebets: function (stats) {
      let _s = this
      if (stats === 'dealing') {
        _s.show = true
        _s.show1 = false
      }
      if (stats === 'default') {
        _s.show = false
        _s.show1 = true
      } else {
        _s.show = true
        _s.show1 = true
      }
    }
  },
  computed: {
    placebets: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.moneywheel__video {
  position: absolute;
  width: 100%;
  transform: scale(1);
  transform-origin: left 0;
  top: -45px;
  border: 0;
  transition: 750ms linear all;
  will-change: transform, top;
  filter: drop-shadow(none);
  background: $base-color;

  &.--is-dealing {
    top: 0;
    transform: scale(0.24);
    transform-origin: left 250px;
    border: 5px solid $base-color-inverted;
    filter: drop-shadow(5px 5px 5px rgba($base-color, .5));
  }
}

video#res_mw,
video#mid_mw {
  width: 100%;
  object-fit: cover;
  margin-top: 0;
  background-color: #2D5789;
}
</style>
