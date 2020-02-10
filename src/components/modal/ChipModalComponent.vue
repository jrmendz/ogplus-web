<template>
  <v-slide-y-reverse-transition>
    <div class="noc__modal chip__modal elevation-12" v-if="$store.state.chipModal">
      <div class="modal__title --is-center">
        <template v-if="!editChip">
          {{ tt('Select Chips') }}
        </template>
        <template v-else>
          {{ tt('Edit Chips') }}
        </template>
      </div>
      <div class="modal__body --is-center">
        <!-- sir alfie dito ung notification -->
        <template v-if="editChip">
          <span style="color: #fff">{{ tt(notificationMsg) }}</span>
        </template>
        <ul class="list__ui">
          <li>
            <template v-if="editChip">
              <v-avatar size="50">
                <img :src="getImgUrl">
              </v-avatar>
              <!-- <input type="number" step=".01" class="--is-number" oninput="this.value=this.value.replace(/[^\d]/g,'')" onkeydown="javascript: return event.keyCode == 69 ? false : true" v-model="$store.state.customChipsValue" :max="$store.state.maxChipValue" :min="$store.state.minChipValue" placeholder="000" @click="clickEff"> -->
              <input style="position: relative; top: 3px" type="text" oninput="this.value=this.value.replace(/^0|[^\d]/g,'')" onkeydown="javascript: return event.keyCode == 69 ? false : true" v-model="$store.state.customChipsValue" :max="$store.state.maxChipValue" :min="$store.state.minChipValue" placeholder="000" @click="clickEff">
              <div>
                <v-btn small color="success" @click="setchipModal()">{{ tt('Save') }}</v-btn>
                <v-btn small color="success" @click="[editChip = false] ; setchipModal()">{{ tt('Return') }}</v-btn>
              </div>
            </template>
            <template v-else>
              <v-btn small color="success" @click="[editChip = true]">{{ tt('Edit Chips') }}</v-btn>
            </template>
          </li>
          <li>
            <!-- <v-avatar class="cursor" size="70" v-for="(chip, i) in $store.state.bettingChips" :key="i" @click="activeClick(chip); clickEff()"> -->
            <v-avatar class="cursor" size="50" v-for="(chip, i) in getTableChips" :key="i" @click="activeClick(chip); clickEff()" :class="chip.isActive ? '--is-active' : ''">
              <img :src="'static/chips/' + chip.class + '.png'">
              <span class="--is-number" v-if="$store.state.locale === 'jp'">{{chip.value | minimizeNumberJP}}</span>
              <span class="--is-number" v-if="$store.state.locale === 'ko'">{{chip.value | minimizeNumberKO}}</span>
              <span class="--is-number" v-if="$store.state.locale === 'th'">{{chip.value | minimizeNumberTH}}</span>
              <span class="--is-number" v-if="$store.state.locale === 'en' || $store.state.locale === 'cn' || $store.state.locale === 'vn' || $store.state.locale === 'id'">{{chip.value | minimizeNumber}}</span>


            </v-avatar>
          </li>
        </ul>
      </div>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script>
import ModalMixins from '@/library/Modals.js'

export default {
  mixins: [ ModalMixins ]
}
</script>

<style lang="scss">
.chip__modal {
  @include position(absolute, $translate-center: true, $index: 999);
  @include rem((
    width: 360px,
    margin-top: 100px
  ));
  margin-left: 0;
  background-color: rgba($base-color, .85);
  will-change: transform, opacity;

  .modal__title {
    color: $base-color-inverted
  }

  .modal__body {
    padding: 0 !important;

    .list__ui {
      flex-flow: column-reverse;
      border-bottom: 0;

      > li {
        display: inline-block;
        @include rem(padding, 5px 0);
        text-align: center;

        &:first-child {
          flex: 0;
          flex-flow: column;
          text-align: center;

          input {
            @include box(rem(150px), rem(30px));
            @include rem((
              margin-top: -7px,
              margin-bottom: 5px,
              padding: 3px 5px,
              border: 1px solid rgba($base-color-inverted, .25)
            ));
            color: $base-color-inverted;
          }
        }

        .v-avatar {
          flex-flow: column;
          @include rem(margin, 10px);
          transition: box-shadow .5s cubic-bezier(.56,.24,.18,.85);

          &.--is-active {
            box-shadow: 0 7.5px 10px rgba(0, 252, 252, 0.5);
          }

          img {
            @include rem((
              margin-top: 5px
            ))
          }

          span {
            @include position(absolute, $translate-center: true);
            @include rem((
              margin-top: -2px,
              font-size: 14px
            ));
            color: $base-color;
            letter-spacing: 0;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>


