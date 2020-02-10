<template>
  <div id='holder_cont'></div>
<!-- <canvas id=c></canvas> -->
</template>
<script>
export default {
  mounted: function () {
    require('@/assets/js/ogparticle.js')
  }
}
</script>
<style scoped>
/* local styles */
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
