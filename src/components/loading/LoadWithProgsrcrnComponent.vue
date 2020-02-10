<template>
  <div class="loader">
    <ProgScreenComponent v-if="load===true"/>

    <div id='big'>
      <div id="particleholder">
        <CopyRightsComponent class="loader-copyright" />
        <!--<ogparticle class="ogContent"/>-->
      </div>
      <div class="loader-logoblack">
        <img class="loader-logoin0" src="@/assets/img/blackOG.png">
      </div>
      <div class="loader-logo">
        <img class="loader-logoin" src="@/assets/img/Logo400x400.png">
      </div>
    </div>
  </div>
</template>

<script>
// import particleanim from '@/components/animation/loading/particle'
import {Back, Expo, TweenLite, TweenMax, Power1, Power2, TimelineLite, TimelineMax} from 'gsap'
import ogparticle from '@/components/animation/loading/ogparticle'
import CopyRightsComponent from '@/components/lobby/CopyRightsComponent.vue'
import ProgScreenComponent from '@/components/loading/ProgScreenComponent.vue'

export default {
  data () {
    return {
      valueDeterminate: 10,
      load: true,
      ProgScreenComponent: 0
    }
  },
  components: {
    ogparticle,
    Back,
    Expo,
    TweenLite,
    TweenMax,
    Power1,
    Power2,
    TimelineLite,
    TimelineMax,
    CopyRightsComponent,
    ProgScreenComponent
  },
  mounted () {
    let _s = this
    _s.ProgScreenComponent += 1
    _s.$store.commit('PROGSRCN', _s.ProgScreenComponent)
    console.log(_s.$store.state.progscreen, 'progscreen from loadprog')
    let tl = new TimelineLite()
    tl.set('.loader', {backgroundColor: '#000'})
    tl.set('.canvasClass', {zIndex: '9999'})
    tl.set('.canvasClass', {display: 'block'})

    setTimeout(function () {
      tl.set('.loader', {backgroundColor: 'none'})
      TweenMax.set('.loader-logo', {display: 'none'})
      TweenMax.set('.canvasClass', {zIndex: '0'})
      TweenMax.set('.canvasClass', {display: 'none'})
      TweenMax.set('.loader-copyright', {display: 'none'})
      TweenMax.set('.loader-logoblack', {opacity: 1})
      TweenMax.to('.loader-logoin0', 1, {scale: 7, opacity: 0})
      // TweenMax.to('.loader-logoblack', 2, {scale: 7, top: '-350%', left: '-306%', transformOrigin: '50% 50%', onComplete: function () { TweenMax.to('.loader-logoblack', 2, {opacity: 0}) }})
      setTimeout(() => {
        _s.$store.state.loadstat = false
      }, 700)
      _s.load = false
    }, 8000)

  }
}
</script>
<style>
/* global styles */

</style>

<style lang="scss" scoped>

.loader,
.animationcontainer {
  @include position(absolute, $index: 9999);
  display: block;
  @include box(100%);
  background-color: $base-color;
  pointer-events: none;
}

.ogContent {
  opacity: 0;
}
.loader-logoin0, .loader-logoin {
  pointer-events: none;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.loader-logoblack {
    pointer-events: none;
    opacity: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.loader-logo {
    /* opacity: 0; */
    display: block;
    margin-left: auto;
    margin-right: auto;
}
#info {
    color: white;
    font-family: monospace;
}

canvas {
    position: absolute;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
}

img {
    position: absolute;
    cursor: pointer;
}
</style>
