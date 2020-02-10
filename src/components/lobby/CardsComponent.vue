<template>
  <!-- :class="isHalted(index) ? '--is-halted --offline' : ''" data-text="Offline" -->
  <div style="margin-bottom: 24px">
    <!-- Bro Louie, for halted/paused table handler -->
    <div class="translucent__card cursor" @click="isHalted ? false : enterGame()" :class="events.length ? '--has-event' : ''">
      <!-- FIGURE 1: if going back to old right image add this class to the backdrop "--is-reverse"  -->
      <img class="backdrop" :src="tableInfo.dealer ? tableInfo.dealer.imagePrestige : $store.state.noImg" @error="imageLoadOnError" ondragstart="return false">
      <!-- <div class="dealer__details">
        <ul v-bar>
          <div>
            <li>
              <span>{{ tt('Name') }}:</span>
              <span>{{ capitalizeName(tableInfo.dealer.name) }}</span>
            </li>
            <li>
              <span>{{ tt('Bday') }}:</span>
              <span>{{ tableInfo.dealer.bday }}</span>
            </li>
            <li>
              <span>{{ tt('Height') }}:</span>
              <span>{{ tableInfo.dealer.height }}</span>
            </li>
            <li>
              <span>{{ tt('Stats') }}:</span>
              <span>{{ tableInfo.dealer.stats }}</span>
            </li>
            <li>
              <span>{{ tt('Hobbies') }}:</span>
              <span>{{ tableInfo.dealer.hobbies }}</span>
            </li>
          </div>
        </ul>
      </div> -->
      <v-card elevation="0">
        <v-card-title>
          <ul class="list__ui">
            <li>
              <span class="--is-number">{{ index }}</span>
              <!-- {{ tableInfo.playerLists.length }} -->
            </li>
            <li>
              <span v-if="tableInfo.name === 'DRAGON TIGER'">{{ tt('BIDDING ' + tableInfo.name) }}</span>
              <span v-if="tableInfo.name === 'DRAGON'">{{ tt('MW-' + tableInfo.name) }}</span>
              <span v-else>{{ tt(getName(tableInfo.name)) | formatTblName }}</span>
            </li>
            <li>
              <span>{{ tt('Shoe No') }}.</span>&nbsp;
              <span class="--is-number">{{ tableInfo.shoeGame }}</span>
            </li>
            <li>
              <span class="--is-number">{{ timer }}</span>
            </li>
          </ul>
        </v-card-title>
        <!-- FIGURE 1: if going back to old right image add this class to the card_body "--is-reverse"  -->
        <div class="card__body">
          <div class="dealer__box">
            <img class="dealer__img" :src="tableInfo.dealer ? tableInfo.dealer.imagePrestige : $store.state.noImg" ondragstart="return false" :alt="tableInfo.dealer ? tableInfo.dealer.name : 'No Name'">
          </div>
          <!--  <div class="card__table" :class="[tableInfo.subcode === 'normal' ? 'cursor' : '', $store.state.blackRoadMapSelected ? '--is-black' : '']" @click="(tableInfo.code === 'moneywheel' || tableInfo.subcode === 'normal') ? enterGame(table, index) : ''"> -->
            <div class="card-wrapper">
              <RoadMapGroup
                v-if="!_.isEmpty(roadMapData)"
                :data="roadMapData"
                :rows="6"
                :cols="12"
                :scale-by="0.53"
                :shuffle="_.get(tableInfo, 'status', '') === 'shuffling'"
                :show-details="false"
                :game-type="_.get(tableInfo, 'code', '')"
                :road-type="
                  _.includes(['baccarat', 'dragontiger'], _.toLower(tableInfo.code)) ? 'big-road' :
                  _.includes(['moneywheel', 'roulette', 'niuniu', 'threecards'], _.toLower(tableInfo.code)) ? 'bead-road' : ''
                "
              />
            </div>

            <div class="card__footer">
              <ul class="list__ui">
                <li class="--is-number" v-if="['baccarat', 'vip', 'emcee', 'dragontiger'].indexOf(tableInfo.code) > -1" v-cloak>
                  <span class="--is-player" :data-text="tt(tableInfo.code !== 'dragontiger' ? 'P' : 'D')">
                    {{ statistic.blue }}
                  </span>
                  <span class="--is-banker" :data-text="tt(tableInfo.code !== 'dragontiger' ? 'B' : 'T')" v-if="['en', 'jp', 'ko', 'vn', 'th', 'id'].indexOf($store.state.locale) > -1"  v-cloak>
                    {{ statistic.red }}
                  </span>
                  <span class="--is-banker" :data-text="tt(tableInfo.code !== 'dragontiger' ? 'B' : 'TG')" v-else-if="$store.state.locale === 'cn'" >
                  <!-- <span class="--is-banker" :data-text="tt(tableInfo.code !== 'dragontiger' ? 'B' : 'TG')"> -->
                    {{ statistic.red }}
                  </span>
                  <span class="--is-tie" :data-text="tt('T')">
                    {{ statistic.green }}
                  </span>
                  <!-- <span data-text="#">
                    {{ tableInfo.code === 'baccarat' ? tableInfo.totalResult.player + tableInfo.totalResult.banker + tableInfo.totalResult.tie : tableInfo.totalResult.dragon + tableInfo.totalResult.tiger + tableInfo.totalResult.tie }}
                  </span> -->
                  <!-- This is only to add spacing at the last side -->
                </li>
              </ul>
            </div>
          </div>

        <ul class="list__ui card__btn">
          <li>
            <!-- TODO -->
            <!-- for the current state no flag available in database so I'm going to comment out this first to change if the flag are already available -->
            <!-- comment by: John Louie Binas -->
             <img :src="tableInfo.dealer ? 'https://static.oriental-game.com/flags/' + (tableInfo.dealer.languages || 'en') + '_normal.png' : $store.state.defaultFlag">
            <!-- by default use this for now -->
<!--            <img :src="$store.state.defaultFlag">-->
            {{ tableInfo.dealer ? tableInfo.dealer.name : ''}}
          </li>
          <li>
            <div class="svg-holder">
              <svgicon name="social" height="24" scale="1" color="#fcac09"></svgicon>
            </div>
            {{ playerCount.players ? playerCount.players.length : 0 }}
          </li>
          <li>
            <span>{{ tt((['normal', '', null].indexOf(tableInfo.subcode) > -1  ? 'Enter' : 'Enter')) }}</span>
            <v-icon>navigate_next</v-icon>
          </li>
        </ul>
      </v-card>
    </div>


    <div v-if="events.length">
      <!-- ToDo: Bro Louie, ito condfition nung nasa baba ng cards promotion -->
    </div>

    <!--<div class="&#45;&#45;is-sidebetting" v-if="tableInfo.subcode !== 'normal' && tableInfo.code === 'baccarat' || tableInfo.code === 'dragontiger'">-->
    <!-- <div class="--is-sidebetting"> -->
      <!-- <v-btn color="success" class="--is-custom-btn" @click="sidebetGame(table, index)">{{ tt('Side Bet') }}</v-btn> -->

      <!-- TODO -->
      <!-- As of 01/14/09, seaters and sidebets are remove, the default is seater -->
      <!-- comment by: Alvin Phoebe Artemis Valdez -->
      <!--<template v-if="tableInfo.playerLists.length < 5">-->
      <!-- <template>
        <v-btn color="success" large class="--is-custom-btn"  @click="isHalted(index) ? false : enterGame(table, index)">
          {{ tt((['normal', '', null].indexOf(tableInfo.subcode) > -1  ? 'Normal Entry' : 'Seater Entry')) }}
          <span class="&#45;&#45;is-number">{{tableInfo.playerLists.length}} / 5</span>
        </v-btn>
      </template> -->
      <!--<template v-else>-->
        <!--<v-btn color="success" class="&#45;&#45;is-custom-btn" disabled @click="enterGame(table, index)">-->
          <!--{{ tt('Seater Entry') }}-->
          <!--&lt;!&ndash;<span class="&#45;&#45;is-number">{{tableInfo.playerLists.length}} / 5</span>&ndash;&gt;-->
        <!--</v-btn>-->
      <!--</template>-->
    <!-- </div> -->
    <!-- <div class="card__box" :class="tableInfo.code">
      <v-card>
        <v-card-title>
          <ul class="list__ui">
            <li><span class="--is-number">{{ index }}</span></li>
            <li><span v-if="tableInfo.name === 'DRAGON TIGER'">{{ tt('BIDDING ' + tableInfo.name) }}</span>
            <span v-else>{{ tt(tableInfo.name) }}</span>
            </li>
            <li>
              <span>{{ tt('Shoe No') }}.</span>&nbsp;<span class="--is-number">{{ tableInfo.shoeGame }}</span>
            </li>
            <li>
              <v-fade-transition leave-absolute>
                <span :key="timer(index)" class="--is-number">{{timer(index)}}</span>
              </v-fade-transition>
            </li>
          </ul>
        </v-card-title>
        <v-divider></v-divider>
        <div class="card__body">
          <div class="card__image" ref="cardImage">
            <img :src="tableInfo.dealer.imageGrand ? tableInfo.dealer.imageGrand : $store.state.noImg">
          </div>
          <div class="dealer__details">
            <ul v-bar>
              <div>
                <li>
                  <span>{{ tt('Name') }}:</span>
                  <span>{{ capitalizeName(tableInfo.dealer.name) }}</span>
                </li>
                <li>
                  <span>{{ tt('Bday') }}:</span>
                  <span>{{ tableInfo.dealer.bday }}</span>
                </li>
                <li>
                  <span>{{ tt('Height') }}:</span>
                  <span>{{ tableInfo.dealer.height }}</span>
                </li>
                <li>
                  <span>{{ tt('Stats') }}:</span>
                  <span>{{ tableInfo.dealer.stats }}</span>
                </li>
                <li>
                  <span>{{ tt('Hobbies') }}:</span>
                  <span>{{ tableInfo.dealer.hobbies }}</span>
                </li>
              </div>
            </ul>
          </div>
          <div class="card__table" :class="tableInfo.subcode === 'normal' ? 'cursor' : ''" @click="(tableInfo.code === 'moneywheel' || tableInfo.subcode === 'normal') ? enterGame(table, index) : ''">
            <v-scale-transition origin="center center">
              <div class="--is-shuffling" v-if="tableInfo.isShuffling">
                <div class="svg-holder">
                  <svgicon name="shuffling" height="24" scale="3" color="#ffffff"></svgicon>
                </div>
              {{ tt('Shuffling') }}...
              </div>
            </v-scale-transition>
            <TableRoad :rows="6" :columns="12" :table="table" :index="index" v-if="tableInfo.code === 'vip' || tableInfo.code === 'emcee'"/>
            <template v-if="tableInfo.code === 'moneywheel'">
              <TableRoad v-if="!tableInfo.isDragon" class="--is-moneywheel" :rows="4" :columns="4" :table="table" isAnimal="true" />
              <TableRoad v-else class="--is-moneywheel --is-dragon" :rows="5" :columns="8" :table="table" isDragon="true" />
            </template>
            <template v-if="tableInfo.code === 'baccarat'" >
              <TableRoad :rows="6" :columns="12" :table="table" :index="index" isBigRoad="true" isMiniCard="true" />
            </template>
            <template v-if="tableInfo.code === 'dragontiger'">
              <TableRoad :rows="6" :columns="12" :table="table" :index="index" isBigRoad="true" isMiniCard="true"/>
            </template>
          </div>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <ul class="list__ui">
            <li>
              <img :src="$store.state.defaultFlag">
            </li>
            <li>
              {{ tableInfo.dealer.name }}
            </li>
            <li class="--is-number" v-if="tableInfo.code === 'baccarat' || tableInfo.code === 'vip' || tableInfo.code === 'emcee' || tableInfo.code === 'dragontiger'">
              <span class="--is-player" :data-text="(tableInfo.code !== 'dragontiger') ? tt('P') : tt('D')">
                {{ (tableInfo.code !== 'dragontiger') ? tableInfo.totalResult.player : tableInfo.totalResult.dragon }}
              </span>
              <span v-if="$store.state.locale === 'en' || $store.state.locale === 'jp' || $store.state.locale === 'ko' || $store.state.locale === 'vn' || $store.state.locale === 'th' || $store.state.locale === 'id'"  class="--is-banker" :data-text="(tableInfo.code !== 'dragontiger') ? tt('B') : tt('T')">
                {{ (tableInfo.code !== 'dragontiger') ? tableInfo.totalResult.banker : tableInfo.totalResult.tiger }}
              </span>
              <span v-if="$store.state.locale === 'cn'" class="--is-banker" :data-text="(tableInfo.code !== 'dragontiger') ? tt('B') : tt('TG')">
                {{ (tableInfo.code !== 'dragontiger') ? tableInfo.totalResult.banker : tableInfo.totalResult.tiger }}
              </span>
              <span class="--is-tie" :data-text="tt('T')">
                {{ tableInfo.totalResult.tie }}
              </span>
              <span/>
            </li>
          </ul>
        </v-card-actions>
        <div class="--is-sidebetting" v-if="tableInfo.subcode !== 'normal' && tableInfo.code === 'baccarat' || tableInfo.code === 'dragontiger'">
          <v-btn color="success" class="--is-custom-btn" @click="sidebetGame(table, index)">{{ tt('Side Bet') }}</v-btn>
          <template v-if="tableInfo.playerLists.length < 5">
            <v-btn color="success" class="--is-custom-btn" @click="enterGame(table, index)">
              {{ tt('ENTER') }}
              <span class="--is-number">{{tableInfo.playerLists.length}} / 5</span>
            </v-btn>
          </template>
          <template v-else>
            <v-btn color="success" class="--is-custom-btn" disabled @click="enterGame(table, index)">
              {{ tt('ENTER') }}
              <span class="--is-number">{{tableInfo.playerLists.length}} / 5</span>
            </v-btn>
          </template>
        </div>
      </v-card>
      <v-card v-if="tableInfo.code === 'emcee'" >
        <v-card-title>
          <ul class="list__ui">
            <li><span>{{ tableInfo.tableNo }}</span></li>
            <li><span>{{ tt(tableInfo.tableName) }}</span></li>
            <li>
              <span>{{ tt('Shoe No') }}.</span>&nbsp;<span class="--is-number">{{ tableInfo.shoeNo }}</span>
            </li>
            <li>
              <span class="--is-number">21</span>
            </li>
          </ul>
        </v-card-title>
        <v-divider></v-divider>
        <div class="card__body">
          <v-scale-transition origin="center center">
            <div class="--is-shuffling" v-if="tableInfo.isShuffling">
              <div class="svg-holder">
                <svgicon name="shuffling" height="24" scale="3" color="#ffffff"></svgicon>
              </div>
              {{ tt('Shuffling') }}...
            </div>
          </v-scale-transition>
          <div class="card__image">
            <img :src="tableInfo.dealer.image">
          </div>
          <div class="dealer__details">
            <ul>
              <li>
                <span>{{ tt('Name') }}:</span>
                <span>{{ capitalizeName(tableInfo.dealer.name) }}</span>
              </li>
              <li>
                <span>{{ tt('Bday') }}:</span>
                <span>{{ tableInfo.dealer.birthdate }}</span>
              </li>
              <li>
                <span>{{ tt('Height') }}:</span>
                <span>{{ tableInfo.dealer.height }}</span>
              </li>
              <li>
                <span>{{ tt('Stats') }}:</span>
                <span>{{ tableInfo.dealer.stats }}</span>
              </li>
              <li>
                <span>{{ tt('Hobbies') }}:</span>
                <span>{{ tableInfo.dealer.hobby }}</span>
              </li>
            </ul>
          </div>
          <div class="card__table" @click="playGame(table)">
            <TableRoad :rows="6" :columns="12" :table="table"/>
          </div>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <ul class="list__ui">
            <li>
              <img :src="'static/flags/' + tableInfo.country + '_normal.png'" :alt="tableInfo.country">
            </li>
            <li>
              {{ tableInfo.dealer.name }}
            </li>
            <li v-if="tableInfo.code === 'baccarat' || tableInfo.code === 'vip' || tableInfo.code === 'emcee' || tableInfo.code === 'dragontiger'">
              <span class="--is-player" :data-text="(tableInfo.code !== 'dragontiger') ? tt('P') : tt('D')">
                {{ (tableInfo.code !== 'dragontiger') ? tableInfo.totalResult.player : tableInfo.totalResult.dragon }}
              </span>
              <span class="--is-banker" :data-text="(tableInfo.code !== 'dragontiger') ? tt('B') : tt('T')">
                {{ (tableInfo.code !== 'dragontiger') ? tableInfo.totalResult.banker : tableInfo.totalResult.tiger }}
              </span>
              <span class="--is-tie" :data-text="tt('T')">
                {{ tableInfo.totalResult.tie }}
              </span>
              <span data-text="#">
                {{ tableInfo.totalResult.total }}
              </span>
            </li>
          </ul>
        </v-card-actions>
      </v-card>

    </div> -->
  </div>
</template>

<script>
  import Cards from '@/library/Cards'
  // import RoadMapJS from "../road/RoadmapJS";
  import RoadMapGroup from '@/components/common/RoadMap/RoadMapGroup'
  export default {
    // components: { RoadMapJS },
    components: { RoadMapGroup },
    mixins: [ Cards ],
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
.translucent__card {
  position: relative;
  @include rem((
    width: 380px,
    height: 220px,
    border-radius: 10px
  ));
  margin: 0 auto;
  font-family: $default-font;
  background-image: linear-gradient(to bottom, rgba($base-color,0) 0%,rgba($base-color,0) 50%,rgba($base-color,0.75) 100%);
  box-shadow: 0 2px 3px rgba($base-color, .10), 0 3px 5px rgba($base-color, .15), 0 4px 7px rgba($base-color, .25);
  overflow: hidden;
  @extend %shine;

  .backdrop {
    @include position(absolute, $left: -15px);
    height: 175%;
    opacity: .15;

    // See FIGURE 1
    &.--is-reverse {
      left: auto;
      @include rem(right, -15px)
    }
  }

  .dealer__img {
    @include rem((
      width: 135px,
    ));
    // this is for experimental only but it works on all browser
    filter: drop-shadow(-15px 10px 10px rgba($base-color,.70));

    &::shadow span {
      display: none;
    }

    &:after {
      position: relative;
      z-index: 2;
      content: attr(alt);
      display: block;
      @include box(135px, 180px);
      @include cover-image(contain, url('https://static.oriental-game.com/image/no-image.png'));
    }

    &:hover {

      + .dealer__details {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .v-card {
    position: relative;
    z-index: 1;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  .v-card__title {
    @include rem(padding, 0 12px);

    .list__ui {
      flex: 1 0 100%;
      border-bottom: 0;
      @include rem(height, 40px);

      li {
        padding: 0;
        color: $base-color-inverted;

        span {
          @include rem(font-size, 13px);
          @include text-truncate(150px);
        }

        &:first-child {
          flex: auto 0 0;
          @include rem(width, 30px);
          margin: 0 auto;
          color: $gold-text;
        }

        &:nth-child(3) {

          span {

            &:first-child {
              color: $gold-text;
            }
          }
        }

        &:nth-last-child(2) {
          flex: 0 1 auto;
        }

        &:last-child {
          flex: auto 0 0;
          align-items: center;
          justify-content: center;
          @include box(rem(45px), rem(30px));
          margin-top: calc(20px / 4);
          background-color: rgba($base-color, .30);
          @include rem((
            margin-left: 15px,
            margin-right: 4px,
            border-radius: 30px
          ));

          span {
            @include rem(font-size, 16px);
            font-weight: bold;
          }
        }
      }
    }
  }

  .card__body {
    display: flex;
    @include rem((
      padding: 0 12px 0 0
    ));

    &.--is-reverse {
      flex-direction: row-reverse
    }

    .dealer__box {
      font-size: 0;
    }

    .card__wrapper {
      width: 230px;
    }


    .card__table {
      position: relative;
      transform-origin: top left;
      height: 113px;

      .road {
        position: relative;
        @include rem((
          border-radius: 7px,
          margin-left: 12px,
        ));
        border: 1px solid;
        overflow: hidden;

        .--is-shuffling {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          @include rem((
            font-size: 18px,
            border-radius: 7px,
            width: initial,
            height: initial
          ))
        }

        &.--is-dark {
          border-color: darken($border-color, 65%);
        }

        &.--is-light {
          border-color: $border-color;
        }

        .table__road {

          &:after {
            display: none;
          }
        }

        .big__road {

          &:before {
            border-bottom: 0;
          }
        }
      }

      &.--is-roulette {
        @include rem((
          margin-top: 10px,
          margin-left: -10px
        ));
        transform: scale(1.05);

        .table__road li span {
          @include rem(font-size, 10px)
        }
      }

      &.--is-moneywheel {
        transform: scale(.75);

        .road {
          @include rem((
            width: 287px,
            height: 179px
          ))
        }
      }

      &.default {

        .table__road:not(.moneywheel) {

          > li {
            // right row
            &:nth-last-child(-n + #{$row-count}) {
              border-right: 0;
            }

            // bottom row
            &:nth-child(#{$row-count}n) {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }

  .card__footer {

    .list__ui {
      flex: 1 0 100%;
      border-bottom: 0;
      margin: 0;

      li {
        padding-left: 0;
        padding-right: 0;

        span {
          display: flex;
          flex: 1 0 auto;
          justify-content: space-evenly;
          color: $base-color-inverted;

          &.--is-player {

            &:before {
              background-color: $dark-blue
            }
          }

          &.--is-banker {

            &:before {
              background-color: $dark-red
            }
          }

          &.--is-tie {

            &:before {
              background-color: $dark-green
            }
          }

          &[data-text="#"] {

            &:before {
              color: $gold-text;
            }
          }

          &:before {
            content: attr(data-text);
            display: flex;
            align-items: center;
            justify-content: center;
            @include box(rem(15px));
            @include rem(border-radius, 15px);
          }

        }

        &:first-child {

          span {
            @include rem(font-size, 10px);
          }
        }
      }
    }
  }

  .card__btn {
    @include position(absolute, $bottom: 0);
    width: 100%;
    border-bottom: 0;
    background-image: linear-gradient(to right, rgba($base-color,0.4) 0%,rgba($base-color,0.5) 40%,rgba($base-color-inverted,0.25) 85%,rgba($base-color-inverted,0.35) 100%);

    li {
      @include rem((
        padding-top: 5px,
        padding-bottom: 5px,
        font-size: 14px
      ));
      color: $base-color-inverted;

      &:first-child {
        text-transform: capitalize;

        img {
          @include rem((
            height: 20px,
            margin-right: 10px
          ))
        }
      }

      &:last-child {
        text-transform: uppercase;
        justify-content: center;

        span {
          position: relative;
          top: -1px;
          right: 10px;
          font-size: 14px;
        }

        i {
          @include position(absolute, $right: 10px);
          @include rem(font-size, 28px);
          color: $base-color-inverted;
        }
      }
    }
  }
}

.--is-halted {
  filter: grayscale(1);

  &.--offline {

    &:after {
      content: attr(data-text);
      @include position(absolute,0,0,0,0,2);
      display: flex;
      align-items: center;
      justify-content: center;
      @include rem((
        font-size: 70px,
        letter-spacing: 5px
      ));
      color: $base-color-inverted;
      text-transform: uppercase;
      font-weight: 500;
      transform: rotate(-17deg);
      text-shadow: 2px 2px 5px rgba($base-color,1);

    }
  }
}
</style>
