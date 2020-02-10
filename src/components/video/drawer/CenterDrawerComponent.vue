<template>
  <li class="center__drawer" :class="getBettingtable === 'moneywheel' ? '--is-moneywheel' : ''">
    <BettingComponent v-if="bettingArea" ref="BettingComponent" class="betting__table" :class="[ getBettingtable === 'baccarat' ? '--for-dt-bac' : '', getBettingtable === 'dragontiger' ? '--for-dt-bac' : '']" :style="getBettingtable === 'moneywheel' ? 'height: 135px' : ''"/>
    <CenterAvatarComponent v-if="bettingArea"/>
    <CenterChipComponent/>
  </li>
</template>

<script>
  import {Expo, TweenLite} from "gsap";
  import BettingComponent from '@/components/bettingtable/BettingComponent'
  import CenterAvatarComponent from '@/components/video/drawer/CenterAvatarComponent'
  import CenterChipComponent from '@/components/video/drawer/CenterChipComponent'

  export default {
    props: {
      bettingArea: {
        type: Boolean,
        default: false
      }
    },
    components: {
      BettingComponent,
      CenterAvatarComponent,
      CenterChipComponent
    },
    data() {
      return {
        activeItem: 0,
        isSendingBet: false
      }
    },
    computed: {
      getBettingtable: {
        get() {
          return this.$store.state.currenttab
        }
      }      
    }
  }
</script>

<style lang="scss" scoped>
.--is-green {
  color: $green-text
}

.v-btn--outline {

  &.--is-orange {
    @include color-switch($btn-stroke-color !important, $text-color: true, $border-color: true);
  }

  &.--is-green {
    @include color-switch($dark-green !important, $text-color: true, $border-color: true);
  }

  &.--is-gray {
    @include color-switch(lighten($sidebar-bg, 20%) !important, $text-color: true, $border-color: true);
  }

  &.--is-red {
    @include color-switch($dark-red !important, $text-color: true, $border-color: true);
  }
}
</style>

