<template>
  <ul class="user__avatar">
    <li v-if="hasAvatar">
      <v-avatar :size="imageSize" @click.stop="avatarToggle" class="pa-2 cursor" >
        <v-img :src="imageSrc ? imageSrc : $store.state.errorImg" aspect-ratio="1" contain transition="scale-transition" v-on:click="clickEff">
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="accent__color"></v-progress-circular>
          </v-layout>
        </v-img>
      </v-avatar>
    </li>
    <li class="user__info">
      <template v-if="hasNickname">
        <p>{{ username }}</p>
      </template>
      <template v-if="hasLevel">
        <span class="level__badge">Lv. 13</span>
      </template>
      <template v-if="hasBalance">
        <div class="balance__holder">
          <div class="svg-holder" v-if="symbol ? symbol : ''">
            <svgicon :name="symbol" height="24" scale=".8" color="url(#gradient)"></svgicon>
          </div>
          <animated-number class="--is-number" :value="centeramount" :formatValue="formatToPrice"/>
        </div>
      </template>
    </li>
  </ul>
</template>
<script>
import ModalMixins from '@/library/Modals.js'

export default {
  mixins: [ ModalMixins ],
  props: {
    hasAvatar: Boolean,
    hasBalance: Boolean,
    hasNickname: Boolean,
    hasLevel: Boolean,
    symbol: String,
    amount: [String, Number],
    imageSize: String,
    imageSrc: [String, Boolean],
    username: String
  },
  data () {
    return {
      centeramount: this.$props.amount
    }
  },
  watch: {
    balance: {
      // update balance in the center avatar
      handler: function (value) {
      let _s = this
        // Validator
        if (_s.table) {
          let result = _.find(_s.table.playerLists, x => x.id === _s.$store.state.userinfo.id)
          if (_s.$props.username === result.nickname) {
              _s.centeramount = value
          }
        }
      }, deep: true}
  },
  methods: {
    avatarToggle: function () {
      let _s = this
      _s.$store.state.avatarModal = !_s.$store.state.avatarModal
      _s.$store.state.goodTipsModal = false
    }
  },
  computed: {
    balance: {
      get () {
        return this.$store.state.userinfo.balance
      }
    },
    table: {
      get() {
        return this.$store.state.tablelist[this.currentTableIndex]
      }
    }
  }
}
</script>

<style lang="scss">
  .level__badge {
    @include rem((
      padding: 3px 7px,
      margin-right: 25px,
      font-size: 10px,
      border-radius: 5px,
    ));
    background-image: linear-gradient(to left, #e812ef 0%,#2103fc 100%);
    box-shadow: 0 0 7px lighten(#e812ef, 10%), 0 0 2.5px $base-color-inverted, inset 0 0 3px $base-color-inverted;
  }

  .user__avatar {
    display: flex;
    align-items: center;
    color: $base-color-inverted;
    @include rem((
      padding: 10px,
    ));
    transform: translateZ(0);

    img {
      cursor: pointer;
    }

    li {

      &:first-child {
        @include rem((
          margin: 10px 7px
        ))
      }

      &.user__info {
        @include rem(margin-left, 17px);

        p {
          margin-bottom: 0;
          color: $gold-text;
          @include rem(font-size, $font-base + 6);
          @include text-truncate(140px);
        }

        .--is-number {
          @include rem(font-size, $font-base + 2);
        }

        .svg-holder {
          float: left;
          width: 0;
          @include rem((
            height: 22px,
            padding-right: 13px,
            margin-left: -2px,
            margin-top: 2px
          ))
        }
      }
    }
  }
</style>
