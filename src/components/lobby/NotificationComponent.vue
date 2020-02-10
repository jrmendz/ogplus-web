<template>
  <v-scale-transition origin="center center">
    <div class="notification" v-if="displayMessage" :class="promptClass">
      <span>{{ tt(message) }}</span>
    </div>
  </v-scale-transition>
</template>

<script>
import Notification from '@/library/Notification'
export default {
  mixins: [ Notification ]
}
</script>

<style lang="scss">
.notification {
  @include position(absolute, 280px, $translate-horizontal: true, $index: 100);
  width: calc(100% / 1.5);
  padding: rem(40px) rem(10px);
  color: $base-color-inverted;
  text-align: center;
  overflow: hidden;
  backface-visibility: hidden;
  background-image: linear-gradient(to left, rgba($base-color-inverted,0) 0%,rgba($base-color,1) 50%,rgba($base-color-inverted,0) 100%);
  @extend %border-frame;

  &.--is-player {
    background-image: linear-gradient(to left, rgba($base-color-inverted,0) 0%,rgba($dark-blue,1) 50%,rgba($base-color-inverted,0) 100%)
  }

  &.--is-banker {
    background-image: linear-gradient(to left, rgba($base-color-inverted,0) 0%,rgba($dark-red,1) 50%,rgba($base-color-inverted,0) 100%)
  }

  &.--is-tie {
    background-image: linear-gradient(to left, rgba($base-color-inverted,0) 0%,rgba($dark-green,1) 50%,rgba($base-color-inverted,0) 100%)
  }

  span {
    @include rem((
      font-size: 34px,
      letter-spacing: 2px
    ));
    text-transform: capitalize;
  }
}
</style>
