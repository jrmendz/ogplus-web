<template>
  <v-slide-x-transition origin="center center">
    <div class="noc__modal store__modal elevation-12" v-if="_StoreModal">
      <div class="modal__title --is-center">{{ tt('Store') }}</div>
        <ul class="store__contents">
          <li v-for="(index, i) in storeItems" :key="i">
            <span><img :src="index.image"></span>
          </li>
        </ul>
    </div>
  </v-slide-x-transition>
</template>

<script>
import ModalMixins from '@/library/Modals.js'
export default {
  mixins: [ ModalMixins ]
}
</script>
<style lang="scss">
.store__modal {
  @include position(absolute, auto, $index: 9999);
  @include rem((
    width: 600px,
    left: 96px,
    bottom: 16px
  ));
  margin-left: 0;

  > .modal__body {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

.store__contents {
  li {
    background-color: #FFFFFF;
    width: 100%;
    height: 50px;
    display: table;
    border-collapse: separate;
    border-spacing: 5px;

    span {
      img {
        width: 50px;
        height: 50px;
        display: table-cell;
        text-align: center;
        border: 1px solid #FF0000;
        vertical-align: middle;
      }
    }
  }
}
</style>
