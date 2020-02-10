// Note:
// All gift animations are compiled on this area
import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax, Bounce} from 'gsap'
import '@/library/DrawSVGPlugin.js'
import paper from 'paper'


export default {
  component: {Bounce, DrawSVGPlugin, Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax
  },
  data () {
    return {
      vw: null,
      bh: null,
      textures: null,
      main: null,
      frag: null,
      appearMin: null,
      appearMax: null,
      delayMax: null,
      delayMin: null,
      durationMin: null,
      durationMax: null,
      numAnimations: null,
      numStars: null,
      stars: [],
      eases: []
    }
  },
  props: {
    animationItem: ''
  },
  computed: {
    getGiftThrown: {
      get () {
        return this.$store.state.giftModalName
      }
    }
  },
  watch: {
  },
  mounted() {
    // console.log('ON LOAD')
    // console.log('paper: ',paper)
    // let Sample1 = new paper.PaperScope()
  },
  methods: {
    getGiftThrown_func: function () {
      let _s = this
      switch (_s.getGiftThrown) {
        case 'Lips Kiss':
          requestAnimationFrame(function () {
            _s.callAnimation_1()
          })
          break
        case 'Fireworks':
          requestAnimationFrame(function () {
            _s.callAnimation_2()
          })
          break
        case 'Stars':
          requestAnimationFrame(function () {
            _s.callAnimation_3()
          })
          break
        case 'Dog':
          requestAnimationFrame(function () {
            _s.callAnimation_4()
          })
          break
        case 'Great Wall':
          requestAnimationFrame(function () {
            _s.callAnimation_5()
          })
          break
        case 'Peace':
          requestAnimationFrame(function () {
            _s.callAnimation_6()
          })
        case 'Coy':
          requestAnimationFrame(function () {
            _s.callAnimation_7()
          })
          break
        case 'Flower':
          requestAnimationFrame(function () {
            _s.callAnimation_8()
          })
          break
      }
      return this.getGiftThrown
    },
    resetGift: function () {
      let _s = this
      console.log('RESET GIFTS')
      _s.$store.state.giftModalName = ''
    },
    callAnimation_1: function () {
      // setTimeout(function () {
      let _s = this
      let lipsequence = new TimelineMax()
      TweenLite.set('.lipkiss2, .lipkiss1', {scale: 0})
      TweenLite.set('.lipkiss2, .lipkiss1', {opacity: 0})
      TweenLite.set('.lipkiss2', {x: '150px', y: '-120px'})
      TweenLite.set('.lipkiss1', {x: '-310px', y: '-248px'})
      TweenLite.set('.lipkiss3', {x: '280px', y: '100px'})
      TweenLite.set('.lipkiss4', {x: '-200px', y: '120px'})

      lipsequence.staggerFromTo('.lipkiss1', 1, {scale: 0, opacity: 0, ease: Bounce.easeOut}, {scale: 1, opacity: 1, ease: Bounce.easeOut})
        .staggerFromTo('.lipkiss2', 1, {scale: 0, opacity: 0, ease: Bounce.easeOut}, {scale: 1.3, opacity: 1, ease: Bounce.easeOut})
        .staggerFromTo('.lipkiss3', 1, {scale: 0, opacity: 0, ease: Bounce.easeOut}, {scale: 0.8, opacity: 1, ease: Bounce.easeOut})
        .staggerFromTo('.lipkiss4', 0.5, {scale: 0, opacity: 0, ease: Bounce.easeOut}, {scale: 1.8, opacity: 1, ease: Bounce.easeOut, onComplete:this.resetGift})
      // }, 500)
    },
    callAnimation_2: function () {

    },
    callAnimation_3: function () {
      require('@/assets/js/gift_explosives.js')
    },
    callAnimation_4: function () {
      let _s = this
      TweenLite.set('.dogrun', {opacity: 1})
      TweenLite.set('.dogrun', {x: 1200})
      TweenMax.fromTo('.dogrun', 5, {x: 1200}, {x: -1200, onComplete:this.resetGift})
    },
    callAnimation_6: function () {
      let _s = this
      var tl1 = new TimelineLite()
      var tl2 = new TimelineLite()
      var tl3 = new TimelineLite()
      tl1.set('.container_peaceR', {visibility:"visible"})
         .fromTo('.container_peaceR', 0.5, {ease: Power4.easeOut, rotation: 20}, {ease: Power4.easeOut, rotation: -20, repeat: 3, yoyo: true})
         .to('.container_peaceR', 0.5, {ease: Power4.easeOut, scale: 2}, "-=0.25")
         .to('.container_peaceR', 0.5, {ease: Power4.easeOut, scale: 1})

      tl2.set('.container_peaceL', {visibility:"visible"})
         .fromTo('.container_peaceL', 0.5, {ease: Power4.easeOut, rotation: -20}, {ease: Power4.easeOut, rotation: 20, repeat: 3, yoyo: true})
         .to('.container_peaceL', 0.5, {ease: Power4.easeOut, scale: 2}, "-=0.50")
         .to('.container_peaceL', 0.5, {ease: Power4.easeOut, scale: 1, onComplete:this.resetGift})
    },
    callAnimation_7: function () {
      TweenMax.to('#turbwave', 5, {attr: {'baseFrequency': 0.01}, repeat: 1, yoyo: true, onComplete:this.resetGift})
    },
    callAnimation_8: function () {
      var tl = new TimelineMax({
         paused:true,
         repeatDelay:1,
         repeat:3,
         yoyo:true,
         onComplete:this.resetGift
       });

       tl

       // animate the radial gradient
       let i
       for (i = 1; i < 176; i++) {
        tl.staggerTo('#SVGID_'+ i + '_ stop', 0.5, {
          stopColor:'#cc0000',
          cycle:{
            stopColor: ['#ff9999','#ff7777','#ff5555', '#ff3333','#ff1111','#ff8888']
          }
        }, 0.1, 0)
        .progress(1).progress(0)
        .play();
      }
    }
  }
}
