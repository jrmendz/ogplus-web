<template>
  <v-navigation-drawer v-model="drawer" app permanent floating :width="this.$store.state.drawerWidth">
    <!-- <div class="balance" v-if="isLobby && !isStreamer">
      <div class="svg-holder" style="float: left; width: 0; height: 22px; padding-right: 24px; margin-left: -7px">
        <svgicon name="dollar_icon" height="22" scale="1.3" color="url(#gradient)"></svgicon>
      </div>
      <animated-number class="--is-number" :value="balance" :formatValue="formatToPrice"/>
    </div> -->
    <ul class="list__ui">
      <li class="active"  v-on:click="clickEff()">
        <img class="logo" src="https://static.oriental-game.com/image/logo.png" width="74px" height="40px" ondragstart="return false" >
      </li>
      <li :class="_InLobby ? '--is-lobby' : ''" @click="exit('home'); clickEff()" :title="[ tt('Lobby') ]">
        <div class="svg-holder --is-hover">
          <svgicon name="home_hover" height="36" scale="2.25" color="#fff"></svgicon>
        </div>
        <div class="svg-holder --is-default">
          <svgicon name="home" height="36" scale="2.25" color="#fff"></svgicon>
        </div>
      </li>
      <li v-shortkey.once="['`']" @shortkey="toggleSocialModal(); clickEff()" @click="toggleSocialModal()" :class="_SocialModal ? 'active': ''" :title="[ tt('Follow') ]">
        <div class="svg-holder --is-hover">
          <svgicon name="friends_hover" height="36" scale="2.25" color="#fff"></svgicon>
        </div>
        <div class="svg-holder --is-default">
          <svgicon name="friends" height="36" scale="2.25" color="#fff"></svgicon>
        </div>
      </li>
      <li v-shortkey.once="['tab']" @shortkey="toggleReportModal(); clickEff()" @click="toggleReportModal()" :class="_ReportModal ? 'active' : ''" :title="[ tt('Records and Report') ]">
        <div class="svg-holder --is-hover">
          <svgicon name="record_hover" height="36" scale="2.25" color="#fff"></svgicon>
        </div>
        <div class="svg-holder --is-default">
          <svgicon name="record" height="36" scale="2.25" color="#fff"></svgicon>
        </div>
      </li>
      <li v-shortkey.once="['esc']" @shortkey="toggleSettingModal(); clickEff()" @click="toggleSettingModal()" :class="_SettingModal ? 'active' : ''" :title="[ tt('Settings') ]">
        <div class="svg-holder --is-hover">
          <svgicon name="settings_hover" height="36" scale="2.3" color="#fff"></svgicon>
        </div>
        <div class="svg-holder --is-default">
          <svgicon name="settings" height="36" scale="2.3" color="#fff"></svgicon>
        </div>
      </li>
      <li :title="[ tt('Rules') ]">
        <a href="https://ogplus.oriental-game.com/rules/" target="_blank">
          <div class="svg-holder --is-hover">
            <svgicon name="question_hover" height="36" scale="2" color="#fff"></svgicon>
          </div>
          <div class="svg-holder --is-default">
            <svgicon name="question" height="36" scale="2" color="#fff"></svgicon>
          </div>
        </a>
      </li>
      <!-- Test Button Only for notification : Alvin Phoebe Artemis Valdez -->
      <!--<li>-->
        <!--<div style="color: white">-->
          <!--<button @click="_NotifyUser('success')">GREEN</button>-->
          <!--<button @click="_NotifyUser('info')">BLUE</button>-->
        <!--</div>-->
      <!--</li>-->
      <!-- Test Button Only for notification : Alvin Phoebe Artemis Valdez -->
    </ul>
    <ul class="list__ui">
      <template v-if="!isLobby">
        <!-- :class="$store.state.chatNewMessage ? '--chat-prompt' : ''" -->
        <li v-if="this.$env == 'development'" @click="_StoreModal = !_StoreModal; clickEff()" :class="_StoreModal ? 'active' : ''" :title="[ tt('Gift Store') ]">
          <div class="svg-holder --is-hover">
            <svgicon name="money_bag_hover" height="36" scale="2.3" color="#fff"></svgicon>
          </div>
          <div class="svg-holder --is-default">
            <svgicon name="money_bag" height="36" scale="2.3" color="#fff"></svgicon>
          </div>
        </li>
        <li v-if="this.$env == 'development'" @click="_GiftModal = !_GiftModal; clickEff()" :class="_GiftModal ? 'active' : ''" :title="[ tt('Gift') ]">
          <div class="svg-holder --is-hover">
            <svgicon name="gift_hover" height="36" scale="2.3" color="#fff"></svgicon>
          </div>
          <div class="svg-holder --is-default">
            <svgicon name="gift" height="36" scale="2.3" color="#fff"></svgicon>
          </div>
        </li>
        <li v-if="!isInGame" @click="openChat(); clickEff()" :class="[_ChatModal ? '' : 'active', $store.state.chatNewMessage ? 'active --chat-prompt' : '']" :title="[ tt('Chat') ]">
          <div class="svg-holder --is-hover">
            <svgicon name="chat_hover" height="36" scale="2.3" color="#fff"></svgicon>
          </div>
          <div class="svg-holder --is-default">
            <svgicon name="chat" height="36" scale="2.3" color="#fff"></svgicon>
          </div>
        </li>
      </template>

      <li @click="exit('logout'); clickEff()" :title="[ tt('Log out') ]">
        <div class="svg-holder">
          <svgicon name="exit" height="36" scale="2.25" color="#ff3c3c"></svgicon>
        </div>
      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script>
import ModalMixins from '@/library/Modals'
import UserProfileComponent from '@/components/sidebar/UserProfileComponent'
export default {
  mixins: [ ModalMixins ],
  components: {
    UserProfileComponent
  },
  data () {
    return {
      drawer: true
    }
  },
  methods: {
    toggleSocialModal: function () {
      let _s = this
      _s.clickEff()
      _s._SocialModal = !_s._SocialModal
      _s.$store.state.rankModal = false
      _s.$store.state.giftModal = false
      _s.$store.state.storeModal = false
      _s.$store.state.avatarModal = false
      _s.$store.state.rrModal = false
      _s.$store.state.settingModal = false
    },
    toggleReportModal: function () {
      let _s = this
      _s.clickEff()
      _s._ReportModal = !_s._ReportModal
      _s.$store.state.rankModal = false
      _s.$store.state.giftModal = false
      _s.$store.state.storeModal = false
      _s.$store.state.avatarModal = false
      _s.$store.state.socialModal = false
      _s.$store.state.settingModal = false
      
    },
    toggleSettingModal: function () {
      let _s = this
      _s._SettingModal = !_s._SettingModal
      _s.$store.state.rankModal = false
      _s.$store.state.giftModal = false
      _s.$store.state.storeModal = false
      _s.$store.state.avatarModal = false
      _s.$store.state.rrModal = false
      _s.$store.state.socialModal = false
      
    },
    openChat: function () {
      let _s = this
      _s._ChatModal = !_s._ChatModal
      // Add prompt if chat is disabled and chat modal is closed
      _s.$store.state.chatNewMessage = false
      // if (_s.$store.state.withchat && _s.$store.state.chatModal) {
      //
      // }
    }
  },
  watch: {
    // rrModal: function (re) {
    //   let _s = this
    //   if (re === false) {
    //     return _s.openChat(false)
    //   }
    // },
    // socialModal: function (so) {
    //   let _s = this
    //   if (so === false) {
    //     return _s.openChat(false)
    //   }
    // }    
  },
  computed: {
    isInGame: {
      get () { return this.$store.state.streamer.isInGame }
    },
    socialModal: {
      get () {
        return this.$store.state.socialModal
      }
    },    
    rrModal: {
      get () {
        return this.$store.state.rrModal
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
      get () { return this.$store.state.isStreamer }
    },
    isNiuniu: {
      get () { return this.$store.state.isNiuniu }
    },
    is3Cards: {
      get () { return this.$store.state.is3Cards }
    }
  }
}
</script>

<style lang="scss">
$animation-timing: 0.5s;

.application .v-navigation-drawer,
.v-navigation-drawer {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: inherit;
  background-color: rgba($base-color, .5);

  .balance {
    @include position(absolute, 24px, $left: 96px);
    display: flex;
    align-items: center;
    color: $base-color-inverted;

    span {
      @include rem(font-size, 20px);
    }
  }

  .--chat-prompt {

    &:after {
      content: '';
      display: block;
      position: absolute;
      @include box(10px);
      @include rem((
        margin-left: 20px,
        margin-top: -13px,
        border-radius: 10px
      ));
    }
  }

  .list__ui {
    border-bottom: 0;
    flex-flow: column;

    li {
      position: relative;
      justify-content: center;
      @include rem((
        padding: 25px,
      ));
      opacity: .5;
      @extend %cursor;

      &:nth-child(2) {
        margin-top: 20px;
      }

      .--is-hover {
        display: none;
      }

      .--is-default {
        display: block;
      }

      &.--is-lobby,
      &.active,
      &:hover {
        opacity: 1;
        transition: opacity .3s $cubic-bezier;

        .--is-hover {
          display: block;
        }

        .--is-default {
          display: none;
        }
      }

      &:first-child {
        @include rem(padding, 40px 0 24px);

        &:before {
          display: none;
        }
      }

      &.--is-lobby {
        opacity: 1;

        &:before {
          content: "";
          @include position(absolute, $bottom: 10px);
          @include box(6px);
          @include rem(border-radius, 6px);
        }
      }

      &.active {
        opacity: 1;
      }
    }

    + .list__ui {

      li {

        &:hover {
          opacity: 1;
          transition: opacity .3s $cubic-bezier;
        }

        &:before {
          display: none;
        }

        &:last-child {
          opacity: 1;
        }
      }
    }
  }
}
</style>

