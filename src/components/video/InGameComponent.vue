<template>
  <div class="streamer__wrap">
    <div :class="streamerInGame ? 'streamer__ingame' : ''">
      <div class="new__timer">
        <NewTimerComponent />
      </div>
      <GiftContainer v-if="getGiftThrown" :animationItem='getGiftThrown' />
      <div class="statistic__container" v-if="getBettingtable === 'roulette'">
        <RouletteStatComponent class="roulettestat__right" />
      </div>
      <div class="statisticBacc__container" v-else-if="getBettingtable === 'baccarat' || getBettingtable === 'dragontiger'">
        <BaccaratDragonStatComponent />
      </div>
      <div class="statisticBacc__container" v-else>
        <MoneywheelTableInfoComponent />
      </div>
      <template v-if="startReset && checkHighestSTATUS(_getUserID)">
        <div class="left-cover">
        </div>
        <!-- <template v-if="getTablebidding() == 'bidding' || 'dealing' || 'betting' || 'default'"> -->
        <template v-if='_table.subcode === "bidding"'>
          <v-fade-transition>
            <!-- <SqueezeComponent class="squeeze__left" :checkHigh="checkHighestSTATUS(_getUserID)" :sqLocation="'L'" :thirdCP ='thirdCardP' :left="true" :class="initialSqueeze && (checkHighest(_getUserID) === true) ? '--is-show' : '--is-show'"/> -->
            <SqueezeBoard class="--is-left-cards" :class="streamerInGame ? '--is-streamer-table' : ''" :position="'L'" :wherebetis='checkHighestSTATUS(_getUserID)'/>

          </v-fade-transition>
          <v-fade-transition>
            <!-- <SqueezeComponent class="squeeze__right" :checkHigh="checkHighestSTATUS(_getUserID)" :sqLocation="'R'" :thirdCB ='thirdCardB' :right="true" :class="initialSqueeze && (checkHighest(_getUserID) === true)  ? '--is-show' : '--is-show'"/> -->
            <SqueezeBoard class="--is-right-cards" :class="streamerInGame ? '--is-streamer-table' : ''" :position="'R'" :wherebetis='checkHighestSTATUS(_getUserID)'/>

          </v-fade-transition>
        </template>
      </template>
      <!-- Video -->
      <NotificationComponent/>
      <VideoComponent/>
        <!-- <video autoplay id="panda_desk_Video" class="video-js vjs-default-skin vjs-fluid"></video> -->
      <!-- <TableInfoComponent v-if="getBettingtable !== 'moneywheel' && getBettingtable !== 'dragontiger'"/> -->
      <template v-if="!streamerInGame">
        <ChatModalComponent :class="getBettingtable == 'baccarat' ? '--is-baccarat' : getBettingtable == 'dragontiger' ? '--is-dragontiger' : ''"/>
      </template>
      <TableInfoComponent />
      <ChannelDrawerComponent />

      <TimerComponent :class="getBettingtable === 'roulette' ? '--is-roulette' : ''" v-for="(table, i) in _tables" :index="i" :key="i + 'tabletimer'" v-if="i === $store.state.currentTableIndex"/>
      <ResultComponent />

      <!-- Drawer -->
      <div class="tableinfo__container" v-if="getBettingtable === 'baccarat' || getBettingtable === 'dragontiger'">
        <NewTableInfoComponent/>
      </div>
      <template v-if="getBettingtable === 'baccarat' ">
        <div class='baccarat-bettingarea'>
          <BettingComponentBaccarat></BettingComponentBaccarat>
        </div>
      </template>
			<template v-if="getBettingtable === 'moneywheel' ">
				<div class='moneywheel-bettingarea'>
					<BettingComponentMoneywheel/>
				</div>
			</template>
			<template v-if="getBettingtable === 'dragontiger'">
				<div class='dragontiger-bettingarea'>
					<BettingComponentDragontiger></BettingComponentDragontiger>
				</div>
			</template>
      <DrawerComponent v-if="!streamerInGame" :class="getBettingtable == 'roulette' ? '--is-roulette' : getBettingtable == 'moneywheel' ? '--is-moneywheel' : ''" />
      <MiniDrawerComponent v-else/>

      <!-- <HighestBidderComponent v-if="isTable() && !$store.state.isSideBarConfirm"/> -->
    </div>
    <StreamerVideoComponent :tableNumber="'E3'" v-if="streamerInGame"/>
  </div>
</template>
<script>
import Video from '@/library/Video.js'
import VideoComponent from '@/components/video/VideoComponent'
import NotificationComponent from '@/components/lobby/NotificationComponent'
import SqueezeBoard from '@/components/video/drawer/SqueezeBoard'
import ChatModalComponent from '@/components/modal/ChatModalComponent'
import BettingComponentMoneywheel from '@/components/bettingtable/table/BettingComponent_moneywheel'
import BettingComponentBaccarat from '@/components/bettingtable/table/BettingComponent_baccarat'
import BettingComponentDragontiger from '@/components/bettingtable/table/BettingComponent_dragontiger'
import NewTableInfoComponent from '@/components/video/NewTableInfoComponent'
import TrayComponent from '@/components/video/tray/TrayComponent'
export default {
  mixins: [ Video ],
  components: {
    VideoComponent,
    NotificationComponent,
    TrayComponent,
    ChatModalComponent,
    SqueezeBoard,
    BettingComponentBaccarat,
    BettingComponentDragontiger,
		BettingComponentMoneywheel,
    NewTableInfoComponent
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
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.streamer__ingame {
  position: relative;
  width: calc(100% - 500px);
}

.--is-baccarat,
.--is-dragontiger {
  right: 0;
  bottom: 0;
}

.streamer__video {
  @include position(absolute, 0, $right: 0, $bottom: 0);
  margin: 0;
  border-radius: 0;
}

.new__timer {
  position: absolute;
  right: 33rem;
  top: -3rem;
}

.streamer__wrap .streamer__ingame {

  .betting__result {
    height: 257px;
  }

  video {
    padding-bottom: 100px;
  }
}

video#panda_desk_Video,
video#res_mw,
video#mid_mw {
  width: 100%;
  object-fit: cover;
  margin-top: 0;
  background-color: #2D5789;
}

.statistic__container {
  @include position(absolute, auto);
  @include rem((
    right: 0px,
    top: 40px,
    width: 300px,
    padding: 30px 20px 0
  ));
  z-index: 1;
  margin-left: 0;
  background-color: rgba($base-color, .5);
  // transform: translateX(100%);
  transition: transform 1s cubic-bezier(.56,.24,.18,.85);
  will-change: transform;

  // &.--is-betting {
  //   transform: translateX(0);
  // }
}
.statisticBacc__container{
  @include position(absolute, auto);
  @include rem((
    right: 0px,
    top: 40px,
    width: 450px,
  ));
  z-index: 1;
  margin-left: 0;
  background-color: rgba($base-color, 0);
  transition: transform 1s cubic-bezier(.56,.24,.18,.85);
  will-change: transform;
}
.tableinfo__container{
  @include position(absolute, auto);
  @include rem((
    right: 80px,
    top: 430px,
    width: 450px,
  ));
  z-index: 1;
  margin-left: 0;
  background-color: rgba($base-color, 0);
  transition: transform 1s cubic-bezier(.56,.24,.18,.85);
  will-change: transform;
}
.left-cover {
  background-color: red
}

ul {
  li {
    &:last-child {
      padding: 0;

      img {
        position: relative;
        top: 3px;
        height: 15px;
      }
    }
  }
}

.--is-left-cards,
.--is-right-cards {
  @include position(absolute, $bottom: 0);
  width: calc(100% / 2);

  &.--is-streamer-table {
    @include rem(bottom, 258px !important);
  }
}

.--is-left-cards{
  left: 0;
}
.--is-right-cards{
  right: 0;
}

.--left-show-sq {
  display: block;
}

.--right-show-sq {
  display: block;
}

.--left-hide-sq {
  display: none;
}

.--right-hide-sq {
  display: none;
}
.dragontiger-bettingarea {
	position: absolute;
  width: 100%;
  bottom: 0;
}
.baccarat-bettingarea {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.moneywheel-bettingarea {
  position: absolute;
  width: 100%;
	bottom: -73px;
	left: -10px;
}

</style>
