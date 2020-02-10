<template>
  <div>
    <v-container grid-list-md pb-0 pt-0>
      <v-layout>
        <v-flex xs3>
          <span class="default textbold">{{ tt('Start date') }}</span>
          <v-menu
            ref="menu1"
            :close-on-content-click="false"
            v-model="menu1"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
            content-class="date1"
          >
            <v-text-field
              append-icon="event"
              hide-details
              v-model="start_date_picker"
              slot="activator"
              readonly
              width="25px"
              single-line
              color="blue"
               v-on:click="clickEff"
            ></v-text-field>
              <v-date-picker v-model="start_date_picker" v-on:input="onInputLoadHistory()" type="date" :formatted-value.sync="start_date" :locale="$store.state.locale === 'cn' ? 'zh-cn' : 'en-us'" :max="end_date_picker"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
          <span class="default textbold">{{ tt('End date') }}</span>
          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
            content-class="date2"
          >
            <v-text-field
              hide-details
              append-icon="event"
              slot="activator"
              align="center"
              v-model="end_date_picker"
              readonly
              single-line
              color="white"
               v-on:click="clickEff"
            ></v-text-field>
            <v-date-picker v-model="end_date_picker" v-on:input="onInputLoadHistory()" type="date" :formatted-value.sync="end_date" :locale="$store.state.locale === 'cn' ? 'zh-cn' : 'en-us'" :min="start_date_picker" :max="end_date_max"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3 v-on:click="clickEff">
          <span class="default textbold">{{ tt('Table') }}</span>
          <v-select
            :items="tableList"
            v-model="table"
            item-value="id"
            item-text="tableno"
            :label="tt('All Table')"
            v-on:input="onInputLoadHistory()"
            single-line
            color="white"
            :menu-props="{contentClass:'select'}"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs3>
          <!-- <span class="hide">{{ tt('Shoe No.') }}</span> -->
          <span/>
          <br/>
          <v-text-field
            oninput="this.value=this.value.replace(/[^-\d]/g, '')"
            :label="tt('Shoe No')"
            v-model="shoeNumber"
            hide-details
            v-on:click="clickEff"
            v-on:input="onInputLoadHistory()"
            :maxlength="max"
            ></v-text-field>
        </v-flex>
        <!-- <v-flex xs3>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-flex> -->
      </v-layout>

    </v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :total-items="pagination.totalItems"
      :loading="loading"
      hide-actions
      :no-data-text="tt('No history')"
      :no-results-text="tt('No matching records found')"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="(th, i) in headers" :key="th + i">
            {{ tt(th.text) }}
          </th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <td>{{ props.item.bet_code }}</td>
        <td class="text-xs-center">{{ getLocalTime(props.item.bet_date) }}</td>
        <td class="text-xs-center">{{ props.item.tablenumber }}</td>
        <td class="text-xs-center">{{ tt((props.item.gamename==='DRAGON') ? 'MW-DRAGON' : props.item.gamename) }}</td>
        <td class="text-xs-center">{{ props.item.shoehandnumber }}</td>
<!--        <td :class="'text-xs-' + (showInfo(props.item) ? 'right' : 'center')">-->
        <td class="text-xs-center">
          {{ tt(props.item.bet_place ? $options.filters.resultAlias(props.item.bet_place.replace('dt-','')) : '')}}
        </td>
        <!-- <td class="text-xs-center">{{ tt((props.item.bet_place==='dt-tie') ? 'tie' : 'tie').toUpperCase() }}</td> -->
        <!-- <td class="text-xs-center" v-if="$store.state.locale === 'cn' && props.item.result === 'T'">{{ tt('tiger') }}</td> -->
        <td class="text-xs-center">
          <div class="td__flex">
            {{ $store.state.locale === 'cn' ? props.item.result && tt((props.item.result==='T') ? 'TIGER' : props.item.result.toUpperCase()) : tt(props.item.result ? $options.filters.resultAlias(props.item.result) : '') }}
            <v-icon v-if="props.item.result" @click="toggleData(props.item.bet_code)">info</v-icon>
          </div>
        </td>

        <td class="text-xs-right">{{ props.item.bet_amount | toMoney() }}</td>
        <td class="text-xs-right" :class="props.item.win_loss > 0 ? 'green-text' : props.item.win_loss < 0 ? 'red-text' : ''">{{ props.item.win_loss | toMoney() }}</td>
        <td class="text-xs-right">{{ props.item.balance | toMoney() }}</td>
        <!-- <td class="text-xs-left">{{ props.item.state }}</td>
        <td class="text-xs-left">{{ props.item.studio }}</td> -->
        <v-fade-transition>
          <div class="bet__info__history" v-if="showData(props.item.bet_code)" @click="toggleData(props.item.bet_code === '')">
            <!-- {{ props.item }} -->
            <template v-if="props.item.gamecode === 'roulette'">
              <div class="bet__history elevation-12">
                <p><span>{{ tt('Bet Code') }}:&nbsp;</span>{{ props.item.bet_code }}</p>
                <p><span>{{ tt('Bet Area') }}:&nbsp;</span>{{ props.item.bet_place | capitalize }}</p>
                <div class="bet__result">
                  {{ props.item.gameValues.value }}
                </div>
              </div>
            </template>
            <template v-if="props.item.gamecode === 'moneywheel'">
              <div class="bet__history elevation-12">
                <p><span>{{ tt('Bet Code') }}:&nbsp;</span>{{ props.item.bet_code }}</p>
                <p><span>{{ tt('Bet Area') }}:&nbsp;</span>{{ props.item.bet_place | resultAlias | capitalize }}</p>
                <div class="bet__result" v-for="i in props.item.gameValues.values.split(',')" :key="i">
                  {{ i === 'Og' ? '财' : i }}
                </div>
              </div>
            </template>
            <template v-if="props.item.gamecode === 'baccarat'">
              <div class="bet__history baccarat elevation-12">
                <p><span>{{ tt('Bet Code') }}:&nbsp;</span>{{ props.item.bet_code }}</p>
                <p><span>{{ tt('Bet Area') }}:&nbsp;</span>{{ props.item.bet_place | capitalize }}</p>
                <ul>
                  <li>Player: {{getTotalCardBaccarat(props.item.gameValues.playerCards.split(',')[0], props.item.gameValues.playerCards.split(',')[1], props.item.gameValues.playerCards.split(',')[2])}}</li>
                  <!-- <li v-for="i in props.item.gameValues.playerCards.split(',')" :key="i" :class="'--is-'+i.toLowerCase()"></li> -->
                  <li v-if="props.item.gameValues.playerCards.split(',')[2]" class="third_card" :class="'--is-'+ props.item.gameValues.playerCards.split(',')[2].toLowerCase().replace('a', '1')" style="margin-right: 18px"></li>
                  <li :class="'--is-'+ props.item.gameValues.playerCards.split(',')[0].toLowerCase().replace('a', '1')"></li>
                  <li :class="'--is-'+ props.item.gameValues.playerCards.split(',')[1].toLowerCase().replace('a', '1')"></li>

                </ul>
                <ul>
                  <li>Banker: {{getTotalCardBaccarat(props.item.gameValues.bankerCards.split(',')[0], props.item.gameValues.bankerCards.split(',')[1], props.item.gameValues.bankerCards.split(',')[2])}}</li>
                  <li :class="'--is-'+ props.item.gameValues.bankerCards.split(',')[0].toLowerCase().replace('a', '1')"></li>
                  <li :class="'--is-'+ props.item.gameValues.bankerCards.split(',')[1].toLowerCase().replace('a', '1')"></li>
                  <li v-if="props.item.gameValues.bankerCards.split(',')[2]" class="third_card" :class="'--is-'+ props.item.gameValues.bankerCards.split(',')[2].toLowerCase().replace('a', '1')"  style="margin-left: 18px"></li>
                </ul>
              </div>
            </template>
            <template v-if="props.item.gamecode === 'dragontiger'">
              <div class="bet__history dragontiger elevation-12">
                <p><span>{{ tt('Bet Code') }}:&nbsp;</span>{{ props.item.bet_code }}</p>
                <p><span>{{ tt('Bet Area') }}:&nbsp;</span>{{ props.item.bet_place | capitalize }}</p>
                <ul>
                  <li>Dragon: {{getTotalCardDT(props.item.gameValues.dragonCards.split(',')[0])}}</li>
                  <li v-for="i in props.item.gameValues.dragonCards.split(',')" :key="i" :class="'--is-'+i.toLowerCase().replace('a', '1')"></li>
                </ul>
                <ul>
                  <li>Tiger: {{getTotalCardDT(props.item.gameValues.tigerCards.split(',')[0])}}</li>
                  <li v-for="i in props.item.gameValues.tigerCards.split(',')" :key="i" :class="'--is-'+i.toLowerCase().replace('a', '1')"></li>
                </ul>
              </div>
            </template>
          </div>
        </v-fade-transition>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2 paginator" v-on:click="clickEff" v-if="pagination.crumbs && items.length">
      <v-pagination v-model="pagination.page" :length="pagination.crumbs" circle total-visible="12" v-on:input="onInputLoadHistory()"></v-pagination>
    </div>
  </div>
</template>

<script>
import RecordsNReports from '@/library/RecordsNReports'

export default {
  mixins: [ RecordsNReports ]
}
</script>
<style lang="scss" scoped>
.lobby__table__content {

  table.v-table tr td {
    @include rem((
      padding: 0 16px !important
    ));
  }
}

.td__flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bet__info__history {
  @include position(fixed,0,0,0,0,500);
  display: flex;
  align-items: center;
  justify-content: center;

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    .bet__history {
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      background-color: rgba($base-color-inverted, 0.5);
    }
  }

  .bet__history {
    @include rem((
      min-width: 600px,
      min-height: 200px,
      padding: 16px 10px,
      margin: 10px,
      border-radius: 10px
    ));
    width: auto;
    text-align: center;
    background-color: rgba($base-color-inverted, .95);

    &.baccarat,
    &.dragontiger {

      ul:last-child {
        border-left: 1px solid lighten($base-color, 80%);
      }

      ul {
        @include rem((
          margin: 10px 0 0,
          padding: 15px
        ));

        li {
          $size: 100px;
          @include box($size / 1.5, $size);
          @include rem((
            margin: 0 3px,
            font-size: 16px
          ));
          filter: drop-shadow(0 0 1px rgba($base-color, 0.7));

          &.third_card {
            transform: rotate(90deg);
            @include rem(margin-bottom, -15px);
            filter: drop-shadow(0 0 1px rgba($base-color, 0.5));
          }

          &:first-child {
            display: block;
            margin: 10px auto;
            width: initial;
            height: initial;
            text-transform: uppercase;
            font-weight: 600;
          }
        }
      }
    }

    ul {
      display: inline-block;
      width: 50%;

      li {
        display: inline-block;
      }
    }

    p {
      @include rem((
        margin-bottom: 5px,
        font-size: 16px
      ));
    }

    span {
      @include rem((
        font-size: 16px
      ));
      font-weight: 600;
    }

    .bet__result {
      $box-size: 70px;

      display: flex;
      align-items: center;
      justify-content: center;
      @include box($box-size);
      @include rem((
        border-radius: 70px,
        font-size: $box-size / 2.5
      ));
      margin: 30px auto 0;
      background: linear-gradient(135deg, #da9d20 0%,#da4a23 100%);
      color: $base-color-inverted;
      text-shadow: 2px 2px 3px rgba($base-color, .5);
    }
  }
}

.v-dialog__content {
  transition: all ease 1s;
}

.paginator {
  padding: 15px 10px;
}

.v-pagination > li {
  margin: 0 5px;
}

.red-text {
  color: red !important;
}
.green-text {
  color: green !important;
}

* {
  outline: none;
}

.textbold {
  font-weight: bold;
}

</style>
