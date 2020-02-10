<template>
  <v-slide-x-reverse-transition origin="center center">
    <div class="noc__modal goodtips__modal elevation-12" v-if="$store.state.goodTipsModal" :style="{ right: this.$store.state.drawerWidth  + 170 + 'px' }">
      <div class="modal__title --is-center">{{ tt('Good Tips') }}</div>
      <div class="modal__body">
        <ul class="goodtips__list">
          <li v-for="(item, key, index) in getgoodtipsorig" :key="key">
            <label :for="'radio-' + key" class="checkbox__ui">
              <!--<span>{{ tt('Good Tips ' + (index + 1)) }}</span>-->
              <input type="checkbox" :id="'radio-' + key" @click.stop="toggle(key); clickEff()" checked :class="item ? '--is-selected' : ''">
              <span class="checkmark"></span>
              <span class="label" style="font-size: small;">{{ tt(goodTipName[key]) }}</span>
            </label>
            <GoodTipsTemplate :gt="key" style="height: 92px"></GoodTipsTemplate>
          </li>
        </ul>
      </div>
      <div class="modal__footer">
        <ul class="list__ui">
          <li style="position: relative">
            <label for="radio-all" class="checkbox__ui">
              <input type="checkbox" id="radio-all" @click.stop="toggleAll(); clickEff()" checked :class="toggleAllVar ? '--is-selected' : ''">
              <span class="checkmark"></span>
              <span class="label" style="margin-left: 25px">{{ tt('Select All') }}</span>
            </label>
          </li>
          <li>
            <!-- <v-btn color="success" @click="savegoodtips">{{ tt('Save') }}</v-btn> -->
          </li>
        </ul>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
import GoodTips from '@/library/GoodTips.js'
export default {
  mixins: [ GoodTips ]
}
</script>

<style lang="scss" scoped>
  .checkbox__ui {

    .checkmark {
      left: initial;
      bottom: initial;
      margin-left: 0;
    }

    &.--not-active {

      .--is-selected:checked ~ .checkmark:after {
        -webkit-transform: rotate(45deg) scale(0);
        -moz-transform: rotate(45deg) scale(0);
        transform: rotate(45deg) scale(0);
      }

      .--is-selected:checked ~ .checkmark {
        background-color: transparent;
      }
    }

    &.--is-active {

      .--not-selected ~ .checkmark:after {
        -webkit-transform: rotate(45deg) scale(1.2);
        -moz-transform: rotate(45deg) scale(1.2);
        transform: rotate(45deg) scale(1.2);
      }

      .--not-selected ~ .checkmark {
        background-color: #00cd0a;
      }
    }

    .--is-not-selected ~ .checkmark:after {
      -webkit-transform: rotate(45deg) scale(0);
      -moz-transform: rotate(45deg) scale(0);
      transform: rotate(45deg) scale(0);
    }

    .--is-not-selected ~ .checkmark {
      background-color: transparent;
    }
  }
</style>
