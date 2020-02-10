<template>
  <footer>
    <span>博彩执照 001</span>
    <img src="static/pagcor.png" alt="" height="30px">
    <span>{{ tt('Copyright © 2018 Oriental Game. All rights reserved') }}.</span>
  </footer>
</template>

<style lang="scss">
footer {
  @include position(absolute, $right: 0, $bottom: 0);
  display: flex;
  align-items: center;
  @include rem(padding, 5px 10px);
  color: $base-color-inverted;

  span {
    @include rem(margin, 0 10px);
  }
}
</style>
