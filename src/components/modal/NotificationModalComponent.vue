<template>
  <v-card>
    <v-snackbar
      v-model="$store.state.snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      color="--is-error"
      auto-height
    >
      <span>{{ tt($store.state.snackbarnotification) }}</span>
      <v-btn
        flat
        @click="$store.state.snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import ModalMixins from '@/library/Modals.js'
export default {
  mixins: [ ModalMixins ]
}
</script>

// <style lang="scss" module="a" scoped>
//   @import './src/assets/sass/base/_variables.scss';
//   .text {
//     color: $base-color;
//   }
// </style>
