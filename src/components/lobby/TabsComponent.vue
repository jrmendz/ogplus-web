<template>
  <div>
    <UserProfileComponent
      hasAvatar
      hasNickname
      hasBalance
      symbol="dollar_icon"
      :image-src="$store.state.userinfo.avatar"
      :username="nickname"
      :amount="balance"
      image-size="44"
      class="user__lobby"
      style="position: relative; z-index: 3"
    />
    <div class="online">
      <div class="svg-holder">
        <svgicon name="social" height="24" scale="1.5" color="#f2d6b0"></svgicon>
      </div>
      {{ onlinePlayers || 0 }}&nbsp;{{ tt('Players') }}
    </div>
    <v-tabs v-model="lobbyTable" height="80" class="lobby__table" hide-slider style="padding-left: 200px; padding-right: 30px;" show-arrows>
      <v-tab v-for="(tabs, index) in $store.state.filters.gamelist" :key="index" :href="'#' + tabs.name" ondragstart="return false" :ripple="false" @click="streamno(tabs)" :disabled="tabs.isDisabled" v-if="tabs.isActive === true">
        <div class="tab__holder" :class="tabs.isDisabled === true ? '--is-soon' : ''" :data-soon="tt('Coming Soon')">
          <div class="svg-holder">
            <svgicon :name="tabs.icon" height="24" :scale="tabs.scaleIcon" original></svgicon>
          </div>
          {{ tt(tabs.name) }}
        </div>
      </v-tab>
    </v-tabs>

    <NewsComponent :repeat="2" duration="50s" :messages="headlines" style="top: 71px"/>
    <v-tabs-items v-model="lobbyTable" class="lobby__table__content">
      <template>
        <v-tab-item v-for="tab in filterTabs()" :key="tab.code" :value="tab.name" lazy>
          <v-container fluid grid-list-sm style="padding-top: 15px; margin-left: 0">
            <template v-if="[tab.name !== 'streamer']">
              <v-layout row wrap>
                <!-- :class="table.code === 'emcee' ? 'lg6' : ''" -->
                <helper v-for="(table, t) in filterTables(tab)" :key="table.tableNumber" :data="t">
                  <v-flex lg3 xl3 slot-scope="{ data }">
                    <CardsComponent :table="table" :index="table.tableNumber" />
                  </v-flex>
                </helper>
              </v-layout>
            </template>
          </v-container>
        </v-tab-item>
      </template>
    </v-tabs-items>
    <!-- <CopyRightsComponent class="--is-justify-center" style="left: 0;"/> -->
  </div>
</template>
<script>
import CardsComponent from '@/components/lobby/CardsComponent'
import NewsComponent from '@/components/lobby/NewsComponent'
import Niuniu from '@/components/lobby/Niuniu'
import ThreeCards from '@/components/lobby/3cards'
import UserProfileComponent from '@/components/sidebar/UserProfileComponent'
// import CopyRightsComponent from '@/components/lobby/CopyRightsComponent.vue'
import Global from '@/library/Global.js'
import { constants } from 'crypto';

export default {
  components: {
    UserProfileComponent,
    CardsComponent,
    NewsComponent,
    Niuniu,
    ThreeCards
    // CopyRightsComponent
  },
  mixins: [ Global ],
  data () {
    return {
      lobbyTable: this.$store.state.lobbyTable,
      renderComponent: true,
      headlines: [
        { text: '' }
      ]
    }
  },
  mounted () {
    this.$store.state.message = 'CLOSE_IMMEDIATE'
    this.$store.dispatch('GET_ANNOUNCEMENTBYTABLE', this.$store.state.currentTableIndex)
  },
  watch: {
    lang: function (nv) {
      console.log('lang ->', nv)
      this.forceRerender()
      this.filterNotifByLang(this.announcement)
    },
    'announcement': function (values) {
     let _s = this
     if (values.length > 0) {
       _s.filterNotifByLang(values)
     } else {
       _s.headlines[0].text = _s.$store.state.TempAnnouncementNotif
     }
    }
  },
  computed: {
    isNiuniu: {
      get () { return this.$store.state.isNiuniu },
      set (v) { this.$store.state.isNiuniu = v }
    },
    is3Cards: {
      get () { return this.$store.state.is3Cards },
      set (v) { this.$store.state.is3Cards = v }
    },

    hideTabOnLobby: {
      get () { return this.$store.state.hideTabOnLobby }
    },
    _tables: {
      get () {
        let _s = this
        return _s.$store.state.tablelist
      }
    },
    lang: {
      get () {
        let _s = this
        return _s.$store.state.locale
      }
    },
    announcement: {
      get () {
        return this.$store.state.AnnouncementNotif
      }
    },
    onlinePlayers: {
      get () { return this.$store.state.userinfo.onlinePlayers }
    }
  },

  methods: {
    streamno: function (category) {
      let _s = this
      _s.clickEff()
      if (category.code !== 'streamer') {
        _s.$root.$emit('vDestroy')

      }
      if (category.code === 'streamer') {
        _s.$store.commit('STREAM', true)
        _s.$store.state.isStreamer = true
        _s.$store.state.isNiuniu = false
        _s.$store.state.is3Cards = false
      } else if (category.code ==='niuniu') {
        _s.$store.state.isStreamer = false
        _s.$store.state.isNiuniu = true
        _s.$store.state.is3Cards = false
      } else if (category.code ==='3cards') {
        _s.$store.state.isStreamer = false
        _s.$store.state.isNiuniu = false
        _s.$store.state.is3Cards = true
      } else {
        _s.$store.commit('STREAM', false)
        _s.$store.state.isStreamer = false
        _s.$store.state.isNiuniu = false
        _s.$store.state.is3Cards = false

        // Stop existing video and play new table stream
        if (!_.isUndefined(_s.$store.state.hlsjs)) {
          _s.$store.state.hlsjs.stopLoad()
          _s.$store.state.hlsjs.destroy()
        }
      }

      // Set Default Tab, this will work upon refreshing the page
      localStorage.setItem('_deftab', category.name)
    },
    forceRerender: function () {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      })
    },
    getTableCode: function (value) {
      // return value !== null ? value : ''
      return (value === null || _.isUndefined(value)) ? '' : value
    },
    filterTables: function (category) {
      let _s = this
      return _.filter(_s._tables, function (v) {
        if (v.code === category.code && v.status !== 'disconnected' && _s.$store.state.liveGame.indexOf(v.tableNumber[0]) > -1) { return v }
      })
    },
    filterTabs: function () {
      return _.filter(this.$store.state.filters.gamelist, (o) => { return o.isActive })
    },
    filterNotifByLang: function (values) {
      let _s = this
      let lng = this.$store.state.locale
      if (values.length > 0) {
        switch (lng) {
        case 'en' :
            _s.headlines[0].text = values[0].Announcement_en
            break
        case 'cn' :
            _s.headlines[0].text = values[0].Announcement_cn
            break
        case 'ind' :
            _s.headlines[0].text = values[0].Announcement_ind
            break
        case 'jp' :
            _s.headlines[0].text = values[0].Announcement_jp
            break
        case 'kr' :
            _s.headlines[0].text = values[0].Announcement_kr
            break
        case 'th' :
            _s.headlines[0].text = values[0].Announcement_th
            break
        case 'vt' :
            _s.headlines[0].text = values[0].Announcement_vt
            break
        }
      } else {
        _s.headlines[0].text = _s.$store.state.TempAnnouncementNotif
      }
    }
  }
}
</script>

<style lang="scss">
$width: 200px;
$default-color: #827f7a;

.user__lobby {
  display: inline-flex;
  float: left;
  @include rem((
    padding: 8px 10px
  ))
}

.online {
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  float: right;
  @include rem((
    min-width: 150px,
    height: 80px,
    padding: 0 20px
  ));
  color: #f2d6b0;
  text-transform: uppercase;

  .svg-holder {
    margin-right: 10px
  }
}

.lobby__table {
  z-index: 2;

  .v-tabs__icon {
    @include rem(font-size, 60px);
  }

  .v-tabs__bar {
    background-color: transparent !important;
  }

  .v-tabs__container {
    padding-top: 7px
  }

  .v-tabs__wrapper {
    contain: inherit;
    overflow: hidden;
    // @include rem(padding, 0 31px);
  }

  .v-tabs__icon {
    z-index: 2;

    &.v-tabs__icon--prev {
      left: 0;
    }

    &.v-tabs__icon--next {
      right: 0;
    }
  }

  .v-tabs__slider-wrapper {
    @include rem((
      width: $width !important,
    ));
    transition: .4s cubic-bezier(.56,.24,.18,.85);
    transition-delay: .15s;
    will-change: left, transform;
  }

  .v-tabs__slider {
    @include rem(height, 80px);
    // transform: skewX(-$skew) perspective(0);
  }

  .v-tabs__div {
    max-width: $width;
    // @include rem(margin, 0 1px);

    .tab__holder {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      position: absolute;
      width: 100%;
      height: 100%;
      @include rem((
        font-size: 16px
      ));
      // transform: skewX($skew) perspective(0);
      backface-visibility: hidden;

      &.--is-soon {
        opacity: .75;
        color: $base-color-inverted;

        &:before {
          content: attr(data-soon);
          display: block;
          @include position(absolute, $right: 50px, $bottom: 47px, $index: 2);
          @include rem((
            padding: 2px 5px,
            font-size: 10px,
            border-radius: 10px
          ));
          background-color: $dark-red;
        }
      }
    }

    a,
    .v-tabs__item--disabled {
      position: relative;
      @include rem((
        padding: .5px,
        min-width: $width
      ));
      border-bottom: 0;
      transition: opacity 0.3s linear;
      font-weight: 500;
      // transform: skewX(-$skew) perspective(0);
      backface-visibility: hidden;

      &.v-tabs__item--active {

        .svg-holder {

          .svg-icon {

            path {
              fill: $base-color-inverted !important;
            }
          }
        }
      }

      .svg-holder {
        @include rem(margin-bottom, 10px);
      }
    }
  }
}


.lobby__table__content {
  // background-color: rgba($base-color, .5);
  overflow: auto;
  overflow-x: hidden;
  @extend %placeholder;
}
</style>
