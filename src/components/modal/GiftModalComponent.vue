<template>
  <v-slide-x-transition origin="center center">
    <div class="noc__modal gift__modal elevation-12" v-if="_GiftModal">
      <div class="modal__title --is-center">{{ tt('Gift') }}</div>
      <div class="--is-center" style="text-transform: capitalize; color: black;">{{ dealer_name }}</div>
      <div class="modal__body">
        <table class="v-table">
          <thead></thead>
          <tbody>
          <tr v-for="(i, index) in gifts" :key="index">
            <td class="text-xs-center">
              <v-btn v-on:click="sendGift(index)">{{ tt('Send') }}</v-btn>
            </td>
            <td class="text-xs-center"><img :src="i.image"></td>
            <td class="text-xs-center">
              <input v-if="i.isCus" type="text" placeholder="Custom Label" v-model="i.label"/>
              <span v-else>{{ tt(i.label) }}</span>
            </td>
            <td class="text-xs-center" style="color: black">
              <input v-if="i.isCus" type="number" step=".01" placeholder="Custom Amount" v-model="i.value" onkeydown="return event.keyCode!==69 && event.keyCode!==109 && event.keyCode!==189"/>
              <span v-else>{{ i.value }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-slide-x-transition>
</template>

<script>
import ModalMixins from '@/library/Modals.js'
export default {
  mixins: [ ModalMixins ],
  data () {
    return {
      // gifts: [
      //   { isCus: 1, image: '/static/svg/gift/plane.svg', label: null, value: null },
      //   { isCus: 0, image: '/static/svg/gift/heart balloons.svg', label: 'Heart Balloons', value: 10 },
      //   { isCus: 0, image: '/static/svg/gift/chocolate.svg', label: 'Chocolate', value: 20 },
      //   { isCus: 0, image: '/static/svg/gift/birthday cake.svg', label: 'Birthday Cake', value: 50 },
      //   { isCus: 0, image: '/static/svg/gift/red envelope.svg', label: 'Red Envelope', value: 100 },
      //   { isCus: 0, image: '/static/svg/gift/special gift.svg', label: 'Special Gift', value: 500 },
      //   { isCus: 0, image: '/static/svg/gift/casino chip.svg', label: 'Casino Chip', value: 1000 },
      //   { isCus: 0, image: '/static/svg/gift/diamond ring.svg', label: 'Diamond Ring', value: 5000 },
      //   { isCus: 0, image: '/static/svg/gift/sports car.svg', label: 'Sports Car', value: 8000 },
      //   { isCus: 0, image: '/static/svg/gift/yacht.svg', label: 'Yacht', value: 10000 },
      //   { isCus: 0, image: '/static/svg/gift/plane.svg', label: 'Airplane', value: 15000 }
      // ]
    }
  },
  methods: {
    // // Proceed with sending of gift
    // sendGift: function (index) {
    //   let _s = this
    //   let yourGift = _s.gifts[index] || null
    //
    //   // Validator
    //   // Check if label is valid (for custom only)
    //   if (!yourGift.label) {
    //     alert('You cannot send gift with an empty gift label')
    //   // Check if the gift value is greater than balance
    //   } else if (yourGift.value > _s.player_balance) {
    //     alert('You cannot send gift above your balance amount')
    //   // Check if the gift value if valid
    //   } else if (isNaN(yourGift.value) || !yourGift.value || yourGift.value <= 0) {
    //     alert('You cannot send gift with an invalid gift value')
    //   } else {
    //     // Confirm sending
    //     if (confirm('Are you sure to send ' + this.formatPrice(yourGift.value) + ' to ' + _s.dealer_name)) {
    //       // Proceed sending
    //       _s.$store.dispatch('SEND_GIFT_TO_DEALER', {
    //         dealer_id: _s.dealer_id,
    //         table_id: _s.table_id,
    //         gift_name: yourGift.label,
    //         gift_price: yourGift.value
    //       }).then((res) => {
    //         console.log('sendGift', '[SUCCESS]', res)
    //         // Close modal gift
    //         _s.$store.state.giftModal = false
    //         _s.$store.state.message = 'You have sent a gift to ' + this.formatPrice(yourGift.value) + ' to ' + _s.dealer_name
    //       }, (err) => {
    //         console.log('sendGift', '[ERROR]', err)
    //         _s.$store.state.message = 'Send gift failed'
    //       })
    //     }
    //   }
    // },
    // formatPrice: function (value) {
    //   let val = (value / 1).toFixed(2)
    //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // }
  },
  computed: {
    // player_balance: {
    //   get () {
    //     let _s = this
    //     return _s.$store.state.userinfo.balance
    //   }
    // },
    // table_id: {
    //   get () {
    //     return this.$store.state.currentTableInfo.id || ''
    //   }
    // },
    // dealer_name: {
    //   get () {
    //     return this.$store.state.tablelist[this.$store.state.currentTableIndex].dealer.name || ''
    //   }
    // },
    // dealer_id: {
    //   get () {
    //     return this.$store.state.tablelist[this.$store.state.currentTableIndex].dealer.rid || ''
    //   }
    // }
  }
}
</script>

<style lang="scss">
.gift__modal {
  @include position(absolute, rem(16px), $index: 999);
  @include rem((
    width: 600px,
    left: 96px,
    bottom: 16px,
    border-radius: 7px
  ));
  margin-left: 0;
  will-change: transform, opacity;

  > .modal__body {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

.main__gift {
  width: 100%;
  position: absolute;
  @include rem(margin-top, -35px);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.lipskiss_animation {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.dogrun_animation,
.greatwall_animation {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.lipkiss1,
.lipkiss2,
.lipkiss3,
.lipkiss4 {
  position: inherit;
  display: block;
  width: 312px;
  height: 307px;
  opacity: 0;
}

.dogrun {
  position: inherit;
  display: block;
  width: 380px;
  height: 275px;
  opacity: 0;
  background-image: url("https://static.oriental-game.com/gift/giftanimation/dogrun.gif");
}

.lipkiss1{
  background-image: url("https://static.oriental-game.com/gift/giftanimation/kisslips1_anim.png");
}
.lipkiss2 {
  background-image: url("https://static.oriental-game.com/gift/giftanimation/kisslips2_anim.png");
}
.lipkiss3 {
  background-image: url("https://static.oriental-game.com/gift/giftanimation/kisslips1_anim.png");
}
.lipkiss4 {
  background-image: url("https://static.oriental-game.com/gift/giftanimation/kisslips2_anim.png");
}

// FoR EXPLOSIVES
#container_Explosives {
  opacity: 0.5;
  position: absolute;
  height: 100%;
}
// FOR GREAT WALL

.container_greatwall {
  position: inherit;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 1;
  background-image: url("https://static.oriental-game.com/gift/giftanimation/greatwall_content.png");
}

// FOR PEACE
.peace_animation {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.container_bigsmile,
.container_peaceL,
.container_peaceR {
  position: inherit;
  display: block;
  opacity: 1;
  width: 263px;
  height: 309px;
}
.container_peaceL {
  right: 20%;
  background-image: url("https://static.oriental-game.com/gift/giftanimation/Lvsign.png");
}

.container_peaceR {
  left: 20%;
  background-image: url("https://static.oriental-game.com/gift/giftanimation/Rvsign.png");
}

.container_bigsmile {
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-size: contain;
  width: 25%;
  height: 50%;
  background-image: url("https://static.oriental-game.com/gift/giftanimation/bigsmile.png");
}
.flower_container {
  position: relative;
  top: 15%;
}
</style>

