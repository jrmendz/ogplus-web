<template>
  <div>
<!--     <template v-if="$store.state.loadstat">
      <loadingScreen />
    </template> -->

    <v-fade-transition>
      <div class="online_status" v-if="$store.state.isOffline">
        {{ $env === 'development' ? $store.state.OfflineText || 'Connecting...' : 'Connecting...'}}
      </div>
    </v-fade-transition>
    <vue-snotify />
    <v-carousel v-if="isLobby" hide-controls height="120px" delimiter-icon="" style="transform: translateZ(0)">
      <v-carousel-item v-for="(i, index) in ads" :key="i + index" :src="i.url"></v-carousel-item>
    </v-carousel>
    <SidebarComponent/>
    <RightSidebarComponent :class="isLobby ? '' : 'ingame__sidebar'"/>
    <div v-if="isLobby" class="toggleGoodtips" @click="goodTipsToggle">
      <div class="svg-holder">
        <svgicon name="goodtips" height="24" scale="1.5" color="#fff"></svgicon>
      </div>
      <span v-for="(index, i) in arrayLetter[0]" :key="i">{{ index }}</span>
    </div>
    <SettingModalComponent />
    <ReportAndRecordModalComponent :tabIndex="isLobby ? 'tab-2' : 'tab-1'"/>
    <GoodTipsComponent :style="isLobby ? 'right: 16px !important' : ''"/>
    <AvatarModalComponent />
    <RankModalComponent/>
    <SocialModalComponent />
    <!-- <ChatModalComponent v-if="!isLobby && !streamerInGame" /> -->
    <GiftModalComponent v-if="!isLobby"/>
    <StoreModalComponent v-if="!isLobby"/>
    <ChipModalComponent />
    <AudioBGMComponent v-if="isLobby"/>
    <v-fade-transition>
      <div class="overlay__bg" :class="$store.state.avatarModal || $store.state.goodTipsModal ? '--is-active' : ''" v-if="$store.state.rankModal || $store.state.socialModal || $store.state.goodTipsModal || $store.state.rrModal" @click="hideModal()"></div>
    </v-fade-transition>
    <v-fade-transition v-if="!isLobby">
      <div class="overlay__bg" v-if="$store.state.storeModal || $store.state.giftModal" @click="hideModal()"></div>
      <!-- this only to close chipmodal -->
      <div class="overlay__bg" :class="[ $store.state.chipModal ? '--is-chipmodal' : '' ]" v-if="$store.state.chipModal" @click="hideChipModal()"></div>
    </v-fade-transition>
    <v-content :style="isLobby ? 'padding-right: 40px' : 'padding-right: 80px'">
      <NotificationComponent v-if="!$store.state.streamer.isInGame"/>
      <Notif />
      <v-fade-transition>
        <TabsComponent v-if="isLobby"/>
      </v-fade-transition>
      <v-fade-transition >
        <InGameComponent v-if="!isStreamer && !isLobby"/>
      </v-fade-transition>
      <v-fade-transition >
        <Streamer v-if="isStreamer"/>
      </v-fade-transition>
    </v-content>
  </div>
</template>

<script>
import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax} from 'gsap'
import SidebarComponent from '@/components/sidebar/SidebarComponent'
import RightSidebarComponent from '@/components/sidebar/RightSidebarComponent'
import GoodTipsComponent from '@/components/sidebar/GoodTipsComponent'
import LoadingScreen from '@/components/loading/LoadingScreenComponent'
import InGameComponent from '@/components/video/InGameComponent'
import TabsComponent from '@/components/lobby/TabsComponent'
import AudioBGMComponent from '@/components/lobby/AudioBGMComponent'
import SettingModalComponent from '@/components/modal/SettingModalComponent'
import AvatarModalComponent from '@/components/modal/AvatarModalComponent'
import RankModalComponent from '@/components/modal/RankModalComponent'
import SocialModalComponent from '@/components/modal/SocialModalComponent'
import ChipModalComponent from '@/components/modal/ChipModalComponent'
import ReportAndRecordModalComponent from '@/components/modal/ReportAndRecordModalComponent'
import GiftModalComponent from '@/components/modal/GiftModalComponent'
import StoreModalComponent from '@/components/modal/StoreModalComponent'
// import ChatModalComponent from '@/components/modal/ChatModalComponent'
import Notif from '@/components/modal/NotificationComponent'
import NotificationComponent from '@/components/lobby/NotificationComponent'
import Streamer from '@/components/lobby/Streamer'
import Global from '@/library/Global'

export default {
  props: {
    tabIndex: ''
  },
  mixins: [Global],
  components: {
    Back,
    Expo,
    TweenLite,
    TweenMax,
    Power2,
    TimelineLite,
    TimelineMax,
    SidebarComponent,
    RightSidebarComponent,
    LoadingScreen,
    TabsComponent,
    InGameComponent,
    SettingModalComponent,
    RankModalComponent,
    SocialModalComponent,
    ChipModalComponent,
    ReportAndRecordModalComponent,
    GoodTipsComponent,
    AvatarModalComponent,
    GiftModalComponent,
    StoreModalComponent,
    AudioBGMComponent,
    Notif,
    NotificationComponent,
    Streamer
  },
  mounted () {
    // if no token found redirect to login
    require('@/assets/js/disableRclick.js')
    if (!localStorage._token) {
      location.href = '#/login'
    }
    this.$root.$emit('vDestroy')
  },
  data () {
    return {
      e1: 'recent',
      enableGift: false,
      ads: [
        { url: "https://static.oriental-game.com/banners/desktop/1.jpg" },
        { url: "https://static.oriental-game.com/banners/desktop/2.jpg" }
      ],
      arrayLetter: [
        'goodtips'
      ]
    }
  },
  methods: {
    goodTipsToggle: function () {
      let _s = this
      // _s.$store.state.goodTipsModal = !_s.$store.state.goodTipsModal
      _s.$store.set('goodTipsModal', !_s.$store.get('goodTipsModal'))
      _s.$store.state.avatarModal = false
    },
    hideModal: function () {
      let _s = this
      _s.$store.state.rankModal = false
      _s.$store.state.socialModal = false
      _s.$store.state.giftModal = false
      _s.$store.state.storeModal = false
      // _s.$store.state.chatModal = false
      _s.$store.state.avatarModal = false
      _s.$store.state.rrModal = false
      _s.$store.state.goodTipsModal = false
      _s.clickEff()
    },
    hideChipModal: function () {
      let _s = this
      _s.$store.state.chipModal = false
      if (_s.$store.state.chipModal === false) {
        // _s.setchipModal()
        _s.setOrigcustomChipsValue()
      }
      _s.clickEff()
    },
    setOrigcustomChipsValue: function () {
      let _s = this
      let options = {}
      _s.$store.state.customChipsValue = _s.$store.state.tempcustomChipsValue
      _s.$store.state.bettingSpecialChip[0].class = _s.$store.state.TempChipClass
      // this is to return the tick chips if not save
      _s.$store.state.tempbettingSpecialChip[0].class = 'sq-chip'
      // _.mapValues(_s.$store.state.TempbettingChips, function (x) { x.isActive = false })
      _.map(_s.$options.computed, (value, key) => {
        if (['musicSlider', 'fxSlider',  'soundFxSwitch',  'musicSwitch', 'videoSwitch', 'locale', 'blackRoadMapSelected', 'chips'].indexOf(key) > -1) {
          options[key] = _s[key]
        }
      })
      _s.$store.dispatch('UPDATE_USER', {
        user_settings: JSON.stringify({ desktop: options, mobile: _s.$store.state.mobile })
      })
    }
    // setchipModal: function () {
    //   let _s = this
    //   if (_s.$store.state.customChipsValue < _s.$store.state.minChipValue && _.filter(this.$store.state.bettingChips, 'isActive').length < 5 && _.filter(this.$store.state.bettingChips, 'isActive').length !== 0) {
    //     _s.$store.commit('SET_PLAYER_ORIGINALCHIPS', _s.$store.state.chipvalues)
    //     _s.$store.state.message = _s.tt('Min Bet is ') + _s.$store.state.minChipValue + ' & select 5 chips'
    //   } else if (_s.$store.state.customChipsValue < _s.$store.state.minChipValue) {
    //     _s.$store.commit('SET_PLAYER_ORIGINALCHIPS', _s.$store.state.chipvalues)
    //     _s.$store.state.message = _s.tt('Min Bet is ') + _s.$store.state.minChipValue
    //   } else if (_s.$store.state.customChipsValue > _s.$store.state.maxChipValue && _.filter(this.$store.state.bettingChips, 'isActive').length < 5 && _.filter(this.$store.state.bettingChips, 'isActive').length !== 0) {
    //     _s.$store.commit('SET_PLAYER_ORIGINALCHIPS', _s.$store.state.chipvalues)
    //     _s.$store.state.message = _s.tt('Max Bet is ') + _s.$store.state.maxChipValue + ' & select 5 chips'
    //   } else if (_s.$store.state.customChipsValue > _s.$store.state.maxChipValue) {
    //     _s.$store.commit('SET_PLAYER_ORIGINALCHIPS', _s.$store.state.chipvalues)
    //     _s.$store.state.message = _s.tt('Max Bet is ') + _s.$store.state.maxChipValue.toLocaleString()
    //   } else if (_.find(_s.$store.state.bettingChips, x => x.value === _s.$store.state.customChipsValue) && _.filter(this.$store.state.bettingChips, 'isActive').length < 5 && _.filter(this.$store.state.bettingChips, 'isActive').length !== 0) {
    //     _s.$store.state.message = this.tt('Chips amount is already existing & select 5 chips')
    //     _s.$store.state.customChipsValue = _s.$store.state.tempcustomChipsValue
    //   } else if (_.find(_s.$store.state.bettingChips, x => x.value === _s.$store.state.customChipsValue)) {
    //     _s.$store.state.message = this.tt('Chips amount is already existing')
    //     _s.$store.state.customChipsValue = _s.$store.state.tempcustomChipsValue
    //   } else if (_.filter(this.$store.state.bettingChips, 'isActive').length < 5 && _.filter(_s.$store.state.bettingChips, 'isActive').length !== 0) {
    //     let chipvalue = _.find(_s.$store.state.bettingChips, x => x.isCustom === true)
    //     if (chipvalue) {
    //       chipvalue.value = _s.$store.state.customChipsValue
    //       _s.$store.state.message = this.tt('Please select 5 chips')
    //     }
    //   } else {
    //     _s.$store.commit('SET_PLAYER_CHIPS', _s.$store.state.customChipsValue)
    //     _s.$store.state.tempcustomChipsValue = _s.$store.state.customChipsValue
    //     let chipvalue = _.find(_s.$store.state.bettingChips, x => x.isCustom === true)
    //     if (chipvalue) {
    //       chipvalue.value = _s.$store.state.customChipsValue
    //     }
    //   }
    // }
  },
  computed: {
    musicSlider: {
      get (e) {
        return e.$store.state.musicSlider
      },
      set (value) {
        this.$store.state.musicSlider = value
      }
    },
    chips: {
      get (e) {
        return e.$store.state.bettingChips
      }
    },
    videoSwitch: {
      get (e) {
        return e.$store.state.videoSwitch
      },
      set (value) {
        this.$store.state.videoSwitch = value
      }
    },
    blackRoadMapSelected: {
      get () {
        return this.$store.state.blackRoadMapSelected
      }
    },
    musicSwitch: {
      get (e) {
        return e.$store.state.musicSwitch
      },
      set (value) {
        this.$store.state.musicSwitch = value
      }
    },
    fxSlider: {
      get (e) {
        return e.$store.state.fxSlider
      },
      set (value) {
        this.$store.state.fxSlider = value
      }
    },
    locale: {
      get (e) {
        return e.$store.state.locale
      },
      set (value) {
        this.$store.state.locale = value
      }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    },
    isStreamer: {
      get () { return this.$store.state.isStreamer },
      set (v) { this.$store.state.isStreamer = v }
    },
    loadstatus: {
      get () {
        return this.$store.state.loadstat
      }
    },
    soundFxSwitch: {
      get (e) {
        return e.$store.state.soundFxSwitch
      },
      set (value) {
        this.$store.state.soundFxSwitch = value
      }
    },
    _tables: {
      get () {
        let _s = this
        return _s.$store.state.tablelist
      }
    },

    chipsLength () {
      return _.filter(this.$store.state.bettingChips, 'isActive').length
    },
    streamerInGame: {
      get () { return this.$store.state.streamer.isInGame }
    },
  },
  watch: {
    isStreamer: function (n, o) {
      if (!n) {
        this.$store.state.lobbyTable = 'Baccarat'
      }
    },
    isNiuniu: function (n, o) {
      if (!n) {
        this.$store.state.lobbyTable = 'Baccarat'
      }
    },
    is3Cards: function (n, o) {
      if (!n) {
        this.$store.state.lobbyTable = 'Baccarat'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~vue-snotify/styles/material";
  .online_status {
    font-size: small;
    text-align: center;
    background: #cacaca;
    color: black;
    position: fixed;
    z-index: 999;
    top:1vh;
    left:45vw;
    right:45vw;
    width: auto;
    padding: 5px;
    border-radius: 10px;
  }

  .toggleGoodtips {
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 240px;
    right: 0;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: linear-gradient(to bottom, #958b6b 0%,#72514f 100%);
    cursor: pointer;

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      top: 1px;
      left: 1px;
      bottom: 1px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: #1a1f21;
    }

    .svg-holder {
      z-index: 1;
      margin-bottom: 5px;
    }

    span {
      position: relative;
      z-index: 1;
      display: flex;
      color: $base-color-inverted;
      text-transform: uppercase;
      font-weight: 700;
      justify-content: center
    }
  }
</style>
