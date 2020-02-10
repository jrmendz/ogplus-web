<template>
<canvas id=c></canvas>
</template>
<script>
export default {
  mounted: function () {
    require('@/assets/js/particle.js')
  }
}
</script>
<style scoped>
/* local styles */
canvas {
  position: absolute;
  top: -100;
  left: 0;
}
</style>
