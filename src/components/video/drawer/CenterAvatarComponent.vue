<template>
<!-- <ul class="list__ui" :class="getBettingtable === 'moneywheel' ? '--is-moneywheel' : ''" v-if="table.subcode === 'bidding'"> -->
  <ul class="seater__list" :class="getBettingtable === 'moneywheel' ? '--is-moneywheel' : ''">
    <template v-if="tablePlayers.length !== 0" >
      <li v-for="(userList, i) in limitTo(tablePlayers, 5)" :key="i">
        <!-- <div class="bet__card" v-if="getBettingtable !== 'moneywheel'">
          <template v-if="highestBankerBidder.userId === userList.id">
              <img src="static/banker_card.svg" ondragstart="return false">
          </template>
          <template v-if="highestPlayerBidder.userId === userList.id">
              <img src="static/player_card.svg" ondragstart="return false">
          </template>
          <template v-if="highestTigerBidder.userId === userList.id">
              <img src="static/tiger_card.svg" ondragstart="return false">
          </template>
          <template v-if="highestDragonBidder.userId === userList.id">
              <img src="static/dragon_card.svg" ondragstart="return false">
          </template>
        </div> -->
        <UserProfileComponent
          class="seater"
          image-size="40"
          hasAvatar
          hasNickname
          hasBalance
          :image-src="userList.imgname"
          :username="userList.nickname"
          :amount="userList.balance"
        />
      </li>
    </template>
  </ul>
</template>
<script>
import {Expo, TweenLite} from "gsap";
import UserProfileComponent from '@/components/sidebar/UserProfileComponent'
export default {
  components: {
    UserProfileComponent
  },
  watch: {
    // tablePlayers: {
    //   handler: function (value) {
    //     console.log('batang pasaway ', value)
    //   }, deep: true}
  },
  methods: {
      formatToPrice(value) {
        // return value.toFixed(0)
        return this.$options.filters.toMoney(value)
      },
      limitTo: function (array = [], amount = 5) {
        return _.take(array, amount)
      }
  },
  computed: {
      // tablePlayers: {
      //   get() {
      //     let _s = this
      //     let players = _s.table.playerLists
      //     console.log('just checking', players)
      //     if (_s.table.tableNumber.includes('x') && players.length !== 0) {
      //       // The most important piece of the puzzle, must be in array in order for _.union() to work
      //       let you = [_.find(players, x => x.id === _s.$store.state.userinfo.id)]
      //       // other player group
      //       let oth = []
      //       // sorted friend group to be filled after iteration
      //       let frn = []
      //       let friends = _s.$store.state.contentfromuser
      //       _.each(players, (val, ind) => {
      //         _.each(friends, (v, i) => {
      //           // check values if they are your friends
      //           if (val.id === v.follow_user_id) {
      //             // move to friend array
      //             frn.push(val)
      //           } else {
      //             // move to others array
      //             oth.push(val)
      //           }
      //         })
      //       })
      //       // Sort by the richest person
      //       _.orderBy(oth, 'balance', 'desc')
      //       _.orderBy(frn, 'balance', 'desc')
      //       // Combining all arrays
      //       players = _.union(you, _.union(frn, oth))
      //       players = !players[0] ? [] : players
      //     }
      //     console.log('ffssfplayers', players)
      //     return players
      //   }
      // },

      //  balance: {
      //   get () {
      //     let _s = this
      //     return _s.$store.state.userinfo.balance
      //   },       

      //   set (balance) {
      //     let _s = this
      //     _s.$store.commit('SET_USER_BALANCE', balance)
      //   }
      // },

      tablePlayers: {
        get() {
          let _s = this
          let players = _s.table.playerLists
          if (players.length !== 0) {
            let you = [_.find(players, x => x.id === _s.$store.state.userinfo.id)]
            let combineplayer = _.filter(players, (x) => { return x.id !== _s.$store.state.userinfo.id })
            players = _.union(you, _.orderBy(combineplayer, 'balance', 'desc'))
          }
          return players
        }
      },
      currentTableIndex: {
        get() { return this.$store.state.currentTableIndex }
      },
      table: {
        get() {
          // console.log('fdfdfdfd', this.$store.state.tablelist[this.currentTableIndex])
          return this.$store.state.tablelist[this.currentTableIndex]
        }
      },
      getBettingtable: {
        get() {
          return this.$store.state.currenttab
        }
      },
      highestPlayerBidder: {
        get() {
          return this.table.highestPlayerBidder
        }
      },
      highestBankerBidder: {
        get() {
          return this.table.highestBankerBidder
        }
      },
      highestDragonBidder: {
        get() {
          return this.table.highestDragonBidder
        }
      },
      highestTigerBidder: {
        get() {
          return this.table.highestTigerBidder
        }
      },
      userinfonick: {
        get() {
          return this.$store.state.userinfo.nickname
        },
        set(userinfonick) {
          // let _s = this
          // _s.$store.commit('SET_USER_BALANCE', balance)
        //   console.log('userinfo', userinfonick)
        }
      },
      avatar: {
        get() {
          let _s = this
          return _s.$store.state.userinfo.avatar
        }
      }
  }
}
</script>

<style lang="scss">
  .seater__list {
    display: flex;

    > li {
      display: inline-flex;
      align-items: center;
      width: calc(100% / 5);

      .user__avatar {
        padding: 0;
        margin: 0;
        @include rem(margin-right, 3px);

        .v-avatar {
          pointer-events: none;
        }

        li.user__info {
          margin-left: 0;

          p {
            font-size: inherit;
            color: inherit;
          }
        }
      }
    }
  }
</style>
