<template>
  <div class="channel__drawer">
    <ul>
        <li :title="[ tt('Refresh') ]">
          <div class="svg-holder">
            <svgicon name="video_refresh" height="26" scale="1.3" color="#fff" v-on:click="video_refresh" ></svgicon>
          </div>
        </li>

        <li class="pointer" :title="[ tt(videoQuality.name) ]" v-for="(videoQuality, index) in videoQualities" :class="videoQuality.is_active ? '--is-active' : ''" v-on:click="selectVideoQuality(index)" :key="index + 'video_quality'">{{ tt(videoQuality.name) }}</li>

        <li class="pointer" :title="[ tt(channel.name) ]" v-for="(channel, index) in videoChannels" :class="channel.is_active ? '--is-active' : ''" v-on:click="selectChannel(index)" :key="index + 'video_channel'">{{tt(channel.name)}}</li>
     </ul>
  </div>
</template>

<script>
import LogsComponent from '@/components/modal/LogsComponent'
import SettingModalComponent from '@/components/modal/SettingModalComponent'

export default {
  components: {
    SettingModalComponent,
    LogsComponent
  },
  data () {
    return {
      videoChannels: [
        {
          id_code: 'china',
          is_active: false,
          name: 'China'
        },
        {
          id_code: 'se_asia',
          is_active: true,
          name: 'SE Asia'
        },
        {
          id_code: 'ne_asia',
          is_active: false,
          name: 'NE Asia'
        }
      ],
      videoQualities: [
        // {
        //   id_code: 'fhd',
        //   is_active: true,
        //   name: 'FHD'
        // },
        {
          id_code: 'hd',
          is_active: null,
          name: 'HD'
        },
        {
          id_code: 'sd',
          is_active: null,
          name: 'SD'
        }
      ]
    }
  },
  computed: {
    videoQuality: {
      get (e) {
        return e.$store.state.videoQuality
      },
      set (value) {
        this.$store.state.videoQuality = value
      }
    },    
  },
  mounted: function () {
    let _s = this
    var video_quality = localStorage.getItem('video_quality')
    if (video_quality === null || video_quality === 'HD') {
      _s.videoQualities[0].is_active = true
      _s.videoQualities[1].is_active = false
    } else {
      _s.videoQualities[0].is_active = false
      _s.videoQualities[1].is_active = true
    }
  },
  methods: {
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    video_refresh: function () {
      let _s = this
      _s.$store.state.hlsjs.destroy()
      _s.$store.dispatch('HLS_PLAY')
      _s.clickEff()
    },
    selectChannel: function (index) {
      var _s = this
      _s.clickEff()
      if (_s.$data.videoChannels[index].name === 'China') {
      }
      if (_s.$data.videoChannels[index].name === 'SE Asia') {
      }
      if (_s.$data.videoChannels[index].name === 'NE Asia') {
      }
      _s.$data.videoChannels.forEach(function (v, i) {
        if (index === i) {
          _s.$data.videoChannels[i].is_active = true
        } else {
          _s.$data.videoChannels[i].is_active = false
        }
      })
    },
    // temporary video URl
    selectVideoQuality: function (index) {
      var _s = this
      _s.clickEff()
      let tableNumber = _s.$store.state.currentTableInfo.tableNumber
      if (_s.$data.videoQualities[index].name === 'SD') {
        _s.$store.state.hlsjs.loadSource(_s.$store.state.tablelist[tableNumber].videoUrl.sea[1])
        _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
        _s.$store.state.hlsPlayer.play()
        // _s.$store.commit('VID_QUALITY', 'sd')
      }
      if (_s.$data.videoQualities[index].name === 'HD') {
        _s.$store.state.hlsjs.loadSource(_s.$store.state.tablelist[tableNumber].videoUrl.sea[0])
        _s.$store.state.hlsjs.attachMedia(_s.$store.state.hlsPlayer)
        _s.$store.state.hlsPlayer.play()
      }
      // _s.$store.commit('VID_QUALITY', _s.$data.videoQualities[index].name)
      localStorage.setItem('video_quality', _s.$data.videoQualities[index].name)

        // let options = {}
        // // Get specific settings to save
        // _.map(_s.$options.computed, (value, key) => {
        //   if (['videoQuality'].indexOf(key) > -1) {
        //     options['videoQuality'] = _s[key]
        //     // options['liveSlider'] = _s[key]
        //   }
        // })
        // console.log(options,'TAE!!!!!!!!!!!!!!!!!!!!!TAE!!!!!!!!!!!!!!!!!')
        // // Execute update user & stringify settings
        // _s.$store.dispatch('UPDATE_USER', {
        //   user_settings: JSON.stringify({ desktop: options,  })
        // })



      _s.$data.videoQualities.forEach(function (v, i) {
        if (index === i) {
          _s.$data.videoQualities[i].is_active = true
        } else {
          _s.$data.videoQualities[i].is_active = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.streamer__ingame {

  .channel__drawer ul {
    @include rem((
      height: 44px
    ));
  }
}

.channel__drawer{
  @include position(absolute, 0, $right: 0);
  @include rem((
    width: 430px,
  ));
  background-color: rgba($base-color, .25);

  ul {
    display: flex;
    align-items: center;
    @include rem(height, 40px);

    li {
      display: flex;
      flex: 1 0 auto;
      justify-content: center;
      @include rem(border, 1px solid transparent);
      @include rem(font-size, 12px);
      color: $base-color-inverted;
      cursor: pointer;

      &.--is-active {
        border-color: $green-text;
        color: $green-text;
        @include rem(border-radius, 5px);
      }
    }
  }
}
</style>
