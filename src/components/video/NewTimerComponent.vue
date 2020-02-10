<template>
  <div class="countdown">
    <div class="countdown-number">{{ _.get(table, 'game.timer', 0) }}</div>
    <svg width="120" height="120" >
      <circle class="timer-bg" r="54" cx="60" cy="60"></circle>
      <circle class="bg" r="44" cx="60" cy="60"></circle>
      <circle class="timer" r="54" cx="60" cy="60"></circle>
    </svg>
  </div>
</template>

<script>
import Timer from '@/library/Timer.js'
import {TweenLite, TimelineLite, TweenMax, gsap} from 'gsap'
export default {
  mixins: [ Timer ],
  data() {
    return {
      firstEntry: false
    }
  },
  components: {
    gsap,
    TweenMax,
    TimelineLite,
    TweenLite
  },
  computed: {
    table: {
      get () {
        return this.$store.state.currentTableInfo
      }
    },
    gameTimer: {
      get () {
        return this.$store.state.currentTableInfo.game.timer
      }
    },
    getStatus: {
      get () {
        return this._TableStatus()
      }
    },
  },
  watch: {
    gameTimer: function (){
      this.timers(this.gameTimer)
    }
  },
  methods: {
    timers(n) {
      let _s = this
      let gameMaxTime
      if (this.getStatus === 'betting') _s.gameMaxTime = this.$store.state.currentTableInfo.maxtime 
      else  _s.gameMaxTime = 15;

      // circle computation
      let pValue = n / _s.gameMaxTime
      let dashOffset =  339 * (1 - pValue)

      // color switching
      if (n >= 5) {
        TweenLite.set('.timer', {stroke:"#40FF00"})
        TweenLite.set('.countdown-number', {color:"#40FF00"})
      } else {
        TweenLite.to('.timer',2,{stroke:"#ff0000"})
        TweenLite.to('.countdown-number', 2,{color:"#ff0000"})
      } 

      //hide show timer and stroke setting
      if (n === 0 || n === undefined) {
        TweenLite.to('.countdown', 2,{opacity:0})
        TweenLite.set('.timer',{strokeDashoffset:339}) 
      } else if (n === _s.gameMaxTime) TweenLite.to('.countdown', 2,{opacity:1})
      else  
        TweenLite.set('.countdown',{opacity:1}) 
        TweenLite.set('.timer',{strokeDashoffset:dashOffset})
    }
  }
}
</script>

<style lang="scss" scoped>
.countdown {
  position: relative;
  margin: auto;
  margin-top: 100px;
  height: 120px;
  width: 120px;
  text-align: center;
  opacity: 0;
}

.countdown-number {
  color: rgb(64, 255, 0);
  display: inline-block;
  line-height: 115px;
  font-size: 62px;
  font-weight: 600;
  // animation: color-array infinite forwards;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

.timer {
  stroke-dasharray: 336px;
  stroke-dashoffset: 336px;
  stroke-linecap: round;
  stroke-width: 10px;
  stroke: rgb(64, 255, 0);
  fill: none;
  animation: color-array infinite forwards;
}

.timer_pause {
  animation-play-state: paused;
}

.timer_play {
  animation-play-state: running;
}

.timer-bg {
  stroke-dasharray: 336px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 8px;
  stroke: rgba(191, 191, 191, 0.3);
  fill: none;
}

.bg {
  fill: rgba(191, 191, 191, 0.3);
}

// @keyframes countdown {
//   from {
//     stroke-dashoffset: 0px;
//   }
//   to {
//     stroke-dashoffset: 340px;
//   }
// }

// @keyframes color-array {
//   0% {
//     color: rgb(64, 255, 0);
//     stroke: rgb(64, 255, 0);
//   }
//   100% {
//     color: red;
//     stroke: red;
//   }
// }


#panda_desk_Video {
  display: none !important;
}
</style>