<template>
  <v-slide-x-transition origin="center center">
    <div class="noc__modal rank__modal elevation-12" v-if="$store.state.socialModal" :style="{ left: this.$store.state.drawerWidth  + 'px' }">
      <div class="modal__title --is-center">{{ tt('Follow') }}</div>
      <v-tabs v-model="tab" centered height="50" class="lobby__table" slider-color="slider-color-bg">
        <v-tab href="#tab-1" :ripple="false" v-on:click="clickEff">
          <div class="tab__holder">
            {{ tt('Ranking') }}
          </div>
        </v-tab>
        <v-tab href="#tab-2" :ripple="false" v-on:click="clickEff">
          <div class="tab__holder">
            {{ tt('Friends') }}
          </div>
        </v-tab>
        <v-tab href="#tab-3" :ripple="false" v-on:click="clickEff">
          <div class="tab__holder">
            {{ tt('Dealers') }}
          </div>
        </v-tab>
      </v-tabs>
      <div class="divider"></div>
      <div class="modal__body">
        <v-tabs-items v-model="tab">

          <v-tab-item value="tab-1">
              <table class="v-table">
                <template>
                  <v-data-table
                    :headers="tableConfig.ranking.header"
                    :items="tableConfig.ranking.list"
                    :pagination.sync="tableConfig.ranking.pagination"
                    hide-actions
                    :no-data-text="tt('No history')"
                    :no-results-text="tt('No matching records found')"
                  >
                  <template slot="headers" slot-scope="props">
                    <tr>
                      <th v-for="(th, i) in tableConfig.ranking.header" :key="th + i">
                        {{ tt(th.text) }}
                      </th>
                    </tr>
                  </template>
                    <template slot="items" slot-scope="props" >
                      <tr>
                        <td class="text-xs-center">
                          {{ (tableConfig.ranking.pagination.rowsPerPage * (tableConfig.ranking.pagination.page - 1)) + (props.index + 1)  }}
                        </td>

                        <td class="text-xs-center cursor">
                          <v-icon
                            v-if="!props.item.isMe"
                            @click="followUnfollow('ranking', true, (tableConfig.ranking.pagination.rowsPerPage * (tableConfig.ranking.pagination.page - 1)) + props.index)"
                            color="blue">
                            <!-- {{ props.item.isFollowed ? 'remove_circle' : 'add_circle' }} -->
                            {{ props.item.isFollowed ? '' : 'add_circle' }}
                          </v-icon>
                        </td>

                        <td class="text-xs-center">
                          {{props.item.nickname}}
                        </td>

                        <td class="text-xs-center" :class="props.item.logged ? 'green-text' : ''">
                          {{props.item.logged === 1 ? tt('Online'): tt('Offline')}}
                        </td>

                        <td class="text-xs-center --is-number">
                          {{props.item.win_loss | toMoney()}}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>

                  <div class="text-xs-center pt-2 paginator" @click="clickEff()">
                    <v-pagination
                      v-if="tableConfig.ranking.list.length"
                      v-model="tableConfig.ranking.pagination.page"
                      :length="(tableConfig.ranking.list.length / tableConfig.ranking.pagination.rowsPerPage) | ceil"
                      circle
                      total-visible="7"
                    ></v-pagination>
                  </div>
                </template>
              </table>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <table class="v-table">
              <template>
                <v-data-table
                  :headers="tableConfig.friends.header"
                  :items="tableConfig.friends.list"
                  :pagination.sync="tableConfig.friends.pagination"
                  hide-actions
                  :no-data-text="tt('No history')"
                  :no-results-text="tt('No matching records found')"
                >
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th v-for="(th, i) in tableConfig.friends.header" :key="th + i" >
                      {{ tt(th.text) }}
                    </th>
                  </tr>
                </template>
                  <template slot="items" slot-scope="props" >
                    <tr >
                      <td class="text-xs-center">
                        {{ (tableConfig.friends.pagination.rowsPerPage * (tableConfig.friends.pagination.page - 1)) + (props.index + 1) }}
                      </td>
                      <td @click="followUnfollow('friends', true, (tableConfig.friends.pagination.rowsPerPage * (tableConfig.friends.pagination.page - 1)) + props.index)"
                          class="text-xs-center pa-2 cursor">
                        <v-icon color="blue">remove_circle</v-icon>
                      </td>
                      <td class="text-xs-center">
                        {{props.item.nickname}}
                      </td>
                      <td class="text-xs-center" :class="props.item.logged ? 'green-text' : ''">
                        {{ props.item.logged ? tt('Online'): tt('Offline')}}
                      </td>
                      <td @click="directtableNo(props.item.table_location)" class="text-xs-center pa-2 cursor">
                        {{ !props.item.logged ? tt('Lobby'): tt(props.item.table_location) }}
                      </td>
                      <td class="text-xs-center --is-number">
                        {{props.item.followers}}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <div class="text-xs-center pt-2 paginator" @click="clickEff()">
                  <v-pagination
                    v-if="tableConfig.friends.list.length"
                    v-model="tableConfig.friends.pagination.page"
                    :length="(tableConfig.friends.list.length / tableConfig.friends.pagination.rowsPerPage) | ceil"
                    circle
                    total-visible="7"
                  ></v-pagination>
                </div>
              </template>
            </table>
          </v-tab-item>

          <v-tab-item value="tab-3">
            <table class="v-table">
              <template>
                <v-data-table
                :headers="tableConfig.dealers.header"
                  :items="tableConfig.dealers.list"
                  :pagination.sync="tableConfig.dealers.pagination"
                  hide-actions
                  :no-data-text="tt('No history')"
                  :no-results-text="tt('No matching records found')"
                >
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th v-for="(th, i) in tableConfig.dealers.header" :key="th + i" >
                      {{ tt(th.text) }}
                    </th>
                  </tr>
                </template>
                  <template slot="items" slot-scope="props">
                    <tr >
                      <td class="text-xs-center">
                        {{ (tableConfig.dealers.pagination.rowsPerPage * (tableConfig.dealers.pagination.page - 1)) + (props.index + 1) }}
                      </td>
                      <td @click="followUnfollow('dealers', false, (tableConfig.dealers.pagination.rowsPerPage * (tableConfig.dealers.pagination.page - 1)) + props.index)"
                          class="text-xs-center pa-2 cursor">
                        <v-icon color="blue">remove_circle</v-icon>
                      </td>
                      <td class="text-xs-center">
                        {{props.item.nickname | capitalize }}
                      </td>
                      <td @click="directtableNo(props.item.table_location)" class="text-xs-center pa-2 cursor">
                        {{tt(props.item.table_location)}}
                      </td>
                      <td class="text-xs-center --is-number">
                        {{ props.item.followers }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <div class="text-xs-center pt-2 paginator" @click="clickEff()">
                  <v-pagination
                    v-if="tableConfig.dealers.list.length"
                    v-model="tableConfig.dealers.pagination.page"
                    :length="(tableConfig.dealers.list.length / tableConfig.dealers.pagination.rowsPerPage) | ceil"
                    circle
                    total-visible="7"
                  ></v-pagination>
                </div>
              </template>
            </table>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-slide-x-transition>
</template>

<script>
import Global from '@/library/Global'

export default {
  mixins: [ Global ],
  data () {
    return {
      tab: 'tab-1',
      tableConfig: {
        ranking: {
          header: [
            {text: 'No.', align: 'left', sortable: true, value: 'no.'},
            {text: 'FOLLOW', value: 'follow'},
            {text: 'NAME', value: 'name'},
            {text: 'ON/OFFLINE', value: 'on/offline'},
            {text: 'TOTAL EARN', value: 'total earn'}
          ],
          pagination: {
            page: 1,
            rowsPerPage: 10,
            totalItems: 1
          },
          list: []
        },
        friends: {
          header: [
            {text: 'No.', align: 'left', sortable: false, value: 'no.'},
            {text: 'UNFOLLOW', value: 'unfollow', sortable: false},
            {text: 'NAME', value: 'name', sortable: false},
            {text: 'ON/OFFLINE', value: 'on/offline', sortable: false},
            {text: 'TABLE NO.', value: 'Table No.', sortable: false},
            {text: 'FOLLOWERS', value: 'followers', sortable: false}
          ],
          pagination: {
            page: 1,
            rowsPerPage: 10,
            totalItems: 1
          },
          list: []
        },
        dealers: {
          header: [
            {text: 'No.', align: 'left', sortable: false, value: 'no.'},
            {text: 'UNFOLLOW', value: 'unfollow', sortable: false},
            {text: 'NAME', value: 'name', sortable: false},
            {text: 'TABLE NO.', value: 'Table No.', sortable: false},
            {text: 'FOLLOWERS', value: 'followers', sortable: false}
          ],
          pagination: {
            page: 1,
            rowsPerPage: 10,
            totalItems: 1
          },
          list: []
        }
      },
      map : {
        'tab-1': 'ranking',
        'tab-2': 'friends',
        'tab-3': 'dealers'
      }
    }
  },

  computed: {
    socialModal: {
      get () { return this.$store.state.socialModal }
    },
    userUpdate: {
      get () { return this.$store.state.updateFeeds.follower.user }
    },
    dealerUpdate: {
      get () { return this.$store.state.updateFeeds.follower.dealer }
    }
  },

  methods: {
    /**
     *
     * @param table
     * @param isPlayer
     * @param index
     * @returns {boolean}
     * @constructor
     */
    followUnfollow: function (table = '', isPlayer = '', index = -1) {
      let payLoad = {}
      let tableList = this.tableConfig[table]
      let COMMAND, USER

      // Validators
      if (!table || isPlayer === '' || index === -1)
        return false
      if (_.isUndefined(tableList))
        return false
      if (_.isUndefined(tableList.list[index]))
        return false

      // Pre-setting variables/conditions
      COMMAND = 'FOLLOW_UNFOLLOW_' + (isPlayer ? 'PLAYER' : 'DEALER')
      USER = tableList.list[index]

      // Serialize command
      _.assign(payLoad, {
        method: USER.isFollowed ? 'unfollow' : 'follow'
      })

      // Serialize player or dealer follow
      _.assign(payLoad, isPlayer ? { followedUserId: USER.followedUserId} : { dealerscode: USER.dealerscode})

      // Call API
      this.$store.dispatch(COMMAND, payLoad)
        .then((res) => {
          // console.error('*** Follow/Unfollow Data ***', res)
          if (USER.isFollowed) {
            if (table === 'ranking') {
              USER.isFollowed = 0
            } else {
              tableList.list.splice(index, 1)
            }
          } else {
            USER.isFollowed = 1
          }
        },(err) => {
          console.error('*** Follow/Unfollow Error ***', err)
        })
    },

    /**
     * Call and end-point to populate data tables
     * @param obj
     * @param itemsPerPage
     * @param page
     */
    loadData: function (obj = '', itemsPerPage = 1, page = 1) {
      const COMMAND = obj === 'ranking' ? 'RANKING_USER' : obj === 'friends' ? 'FOLLOWED_USER' : 'FOLLOWED_DEALER'
      // Validators
      if (!obj) return false
      // Load items
      this.$store.dispatch(COMMAND, {
        itemsPerPage,
        page
      })
        .then((res) => {
          // console.log('*** Social Data Received ***', res)
          this.tableConfig[obj].list = res.data
        }, (err) => {
          console.error('*** Social Data Error ***', err)
        })
    },

    /**
     * Updates information inside the data tables
     * @param data
     * @returns {boolean}
     */
    updateListInfo: function (data = {}) {
      let _s = this
      let index, tableList
      // Map the tableConfig designated for updated
      tableList = _s.tableConfig[_s.map[_s.tab]]
      // Validator
      if (_.isUndefined(tableList))
        return false
      if (_.isEmpty(tableList))
        return false
      // Locate the index in the array of the affected dealer
      index = _.findIndex(tableList.list, function (o) {
        return _.includes(['tab-3'], _s.tab) ?
          o.dealerscode === data.dealersCode :
          o.followedUserId === data.followedUserId
      });
      // Check if the dealer is found on list
      if (index >= 0) tableList.list[index].followers += (data.method === '+' ? 1 : -1)
    }
  },

  watch: {
    tab: function (n) {
      // Validators
      if (!n) return false
      // Set pagination to page 1
      this.tableConfig[this.map[n]].pagination.page = 1
      // Get data
      this.loadData(this.map[n]);
    },

    socialModal: function (n) {
      if (n) {
        // Set initial tab to be shown
        this.tab = 'tab-1'
        // Load initial data
        this.loadData('ranking');
      }
    },
    // Watcher if user has an update (E.g. Number of followers)
    userUpdate: function (n) {
      if (n) this.updateListInfo(n)
    },
    // Watcher if dealer has an update (E.g. Number of followers)
    dealerUpdate: function (n) {
      if (n) this.updateListInfo(n)
    }
  }
}
</script>

<style lang="scss">
.rank__modal {
  @include position(absolute, rem(16px), $index: 999);
  @include rem((
    top: 16px,
    width: 600px,
    border-radius: 7px,
    margin-left: 16px
  ));
  will-change: transform, opacity;

  .v-tabs__slider-wrapper {
    transition-delay: initial;
    z-index: inherit !important;
  }

  .divider {
    width: 90%;
    height: 2px;
  }

  .lobby__table {
    transform: scale(.8);
    @include rem(bottom, -5px);
  }

  // .v-tabs__wrapper {
  //   @include rem(margin-left, 34px);
  // }

  $sidebox: 35px;

  .v-tabs__div {

    a {
      @include rem((
        min-width: 150px,
        max-width: 150px,
        font-size: 16px,
        // margin: 0 24px
      ));
      text-transform: capitalize;

      &:not(.v-tabs__item--active) {
        opacity: .5 !important;
      }
    }
  }

  .v-tabs__slider-wrapper {
    @include rem((
      width: 150px !important
    ));
    // transform: translateX(24px);
  }

  .v-tabs__slider {
    @include rem((
      height: 50px
    ));
  }

  .v-table {
    table-layout: fixed;
    background-color: transparent !important;
    border-collapse: collapse;

    thead {

      tr {
        @include rem(height, 40px);
      }
    }

    th,
    td {
      @include rem(padding, 0 10px);

      &:first-child {
        @include rem(width, 50px);
      }
    }
  }

  .modal__body {
    @include rem(height, 590px);
    overflow: hidden;
    // @extend %placeholder;

    .v-window-item {
      @include rem(height, 525px !important);
    }

    .paginator {
      @include position(absolute, $bottom: -68px);
      width: 100%
    }

    .v-table__overflow {
      overflow: hidden;
    }
  }
}

.green-text {
  color:green;
}
</style>
