<template>
  <div class="percentage__stats" v-if="getBettingtable === 'baccarat'">
    <div class="blue__stats">
      <div class="perc" :style="{width: betTable.baccarat.section.player.percentage}"></div>
        <ul>
          <li>{{ tt('P') }}</li>
          <li><div class="svg-holder"><svgicon name="player_icon" height="36" scale=".8" color="#fff"></svgicon></div>{{ betTable.baccarat.section.player.players}}</li>
          <li>{{'$' + betTable.baccarat.section.player.totalBetAmt}}</li>
          <li>{{ betTable.baccarat.section.player.percentage + '%'}}</li>
        </ul>
    </div>
    <div class="green__stats">
      <div class="perc" :style="{width: betTable.baccarat.section.tie.percentage }"></div>
      <ul>
        <li>{{ tt('T') }}</li>
        <li><div class="svg-holder"><svgicon name="player_icon" height="36" scale=".8" color="#fff"></svgicon></div>{{ betTable.baccarat.section.tie.players}}</li>
        <li>{{ '$' + betTable.baccarat.section.tie.totalBetAmt}}</li>
        <li>{{ betTable.baccarat.section.tie.percentage + '%'}}</li>
      </ul>
    </div>
    <div class="red__stats">
      <div class="perc" :style="{width: betTable.baccarat.section.banker.percentage}"></div>
      <ul>
        <li>{{ tt('B') }}</li>
        <li><div class="svg-holder"><svgicon name="player_icon" height="36" scale=".8" color="#fff"></svgicon></div>{{ betTable.baccarat.section.banker.players}}</li>
        <li>{{ '$' + betTable.baccarat.section.banker.totalBetAmt}}</li>
        <li>{{ betTable.baccarat.section.banker.percentage + '%'}}</li>
      </ul>
    </div>
  </div>
  <div class="percentage__stats" v-else-if="getBettingtable === 'dragontiger'">
    <div class="blue__stats">
      <div class="perc" :style="{width: betTable.dragontiger.section.dragon.percentage}"></div>
        <ul>
          <li>{{ tt('D') }}</li>
          <li>
            <div class="svg-holder"><svgicon name="player_icon" height="36" scale=".8" color="#fff"></svgicon></div>
            {{ betTable.dragontiger.section.dragon.players}}
          </li>
          <li>{{ '$' + betTable.dragontiger.section.dragon.totalBetAmt}}</li>
          <li>{{ betTable.dragontiger.section.dragon.percentage + '%'}}</li>
        </ul>
    </div>
    <div class="green__stats">
      <div class="perc" :style="{width: betTable.dragontiger.section.tie.percentage}"></div>
        <ul>
          <li>{{ tt('T') }}</li>
          <li>
            <div class="svg-holder"><svgicon name="player_icon" height="36" scale=".8" color="#fff"></svgicon></div>
            {{ betTable.dragontiger.section.tie.players}}</li>
          <li>{{ '$' + betTable.dragontiger.section.tie.totalBetAmt}}</li>
          <li>{{ betTable.dragontiger.section.tie.percentage + '%'}}</li>
        </ul>
    </div>
    <div class="red__stats">
      <div class="perc" :style="{width: betTable.dragontiger.section.tiger.percentage}"></div>
        <ul>
          <li>{{ tt('T') }}</li>
          <li>
            <div class="svg-holder">
              <svgicon name="player_icon" height="36" scale=".8" color="#fff"></svgicon>
            </div>
            {{ betTable.dragontiger.section.tiger.players}}
          </li>
          <li>{{ '$' + betTable.dragontiger.section.tiger.totalBetAmt}}</li>
          <li>{{ betTable.dragontiger.section.tiger.percentage + '%'}}</li>
        </ul>
    </div>
  </div>
  <div class="percentage__stats" v-else>
  </div>
</template>

<script>
import TweenLite from 'gsap'

export default {

  methods: {
  },
  computed: {
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },

    betTable: {
      get () {
        return this.$store.state.betTable
      }
    }
  }
}
</script>
<style lang="scss">

.percentage__stats {
 width: 390px;
 padding: 20px 35px;

 ul {
  position: relative;
  display: flex;
  color: #fff;

  li {
   display: flex;
   flex: 1 0 0;
   height: 30px;
   justify-content: center;
   align-items: center;

   &:first-child {
    flex: 40px 0 0;
   }

   &:nth-child(2) {
    flex: 30px 0 0
   }

   &:last-child {
    justify-content: flex-end;
    padding-right: 15px;
   }
  }
 }

 .blue__stats,
 .green__stats,
 .red__stats {
  position: relative;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 30px;
  overflow: hidden;
 }

 .blue__stats {
  background-color: rgba(blue, .5);

  .perc {
   background-color: blue;
  }
 }

 .green__stats {
  background-color: rgba(green, .5);

  .perc {
   background-color: green;
  }
 }

 .red__stats {
  background-color: rgba(red, .5);

  .perc {
   background-color: red;
  }
 }

 .perc {
  position: absolute;
  height: 100%;
  border-radius: 30px;
 }
}

</style>
