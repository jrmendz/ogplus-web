<!-- TimerComponent
*timer - Function to have timer in betting
-->
<template>
  <div>
    <div class="betting__timer" :class="timer(index) !== 0 ? 'start' : ''">
      <span>{{prompt()}}</span>
      <span>{{timer(index)}}</span>
    </div>
    <!-- <v-fade-transition>
      <div class="timer__wrapper" v-if="timer(index) !== 0" >
        <div class="timer">
          <v-fade-transition leave-absolute>
            <span class="--is-number" :key="timer(index)">
              {{timer(index)}}
            </span>
          </v-fade-transition>
        </div>
      </div>
    </v-fade-transition> -->
    <!-- remove "&& isSideBet" in case michael change his mind again -->
    <template v-if="(timer(index) <= 10 && timer(index) !== 0) && extendenable && getStatus === 'betting' && !isSideBet && isSideBet && getTableExtendable">
      <div v-if="getTableSubCode === 'bidding'" class="extend__wrapper cursor" @click="extend_fired(index)">
      </div>
    </template>
  </div>
</template>

<script>
import Timer from '@/library/Timer.js'
export default {
  mixins: [ Timer ]
}
</script>

<style lang="scss" scoped>
.--is-roulette {
  .betting__timer.start {
    transform: translateX(-50%) translateY(-335px);
  }
}

.streamer__ingame {

  .betting__timer.start {
    transform: translateX(-50%) translateY(-335px);
  }
}

.betting__timer {
  @include position(absolute, $bottom: 80px, $left: 50%);
  @include rem((
    width: 330px,
    padding: 10px,
    border-radius: 30px
  ));
  transform: translateX(-50%) translateY(500px);
  color: $base-color-inverted;
  text-align: center;
  background-color: rgba($base-color, .65);
  transition: transform .5s cubic-bezier(.56,.24,.18,.85), opacity .5s cubic-bezier(.56,.24,.18,.85);
  will-change: transform, opacity;
  opacity: 0;

  &.start {
    transform: translateX(-50%) translateY(-200px);
    opacity: 1;
  }

  span {
    display: inline-block;
    @include rem((
      font-size: 24px,
      letter-spacing: 2px
    ));
    text-transform: uppercase;

    + span {
      float: right;
      @include rem((
        min-width: 50px,
        height: 40px,
        margin-right: 10px
      ));
    }
  }
}

.extend__wrapper {
  background-image: url('/static/bacc_extendBtn.svg');
  width: 100px;
  height: 100px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: -260px;
  cursor: pointer;
}
</style>
