<template>
  <div class="roulette_svg" @mousemove="mouseM">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 569.9 181" style="enable-background:new 0 0 569.9 181;" xml:space="preserve">
    <g id="Layer_1" class="st0">
        <image style="display:inline;overflow:visible;" width="760" height="232" xlink:href="47638168.jpg"  transform="matrix(0.7499 0 0 0.7499 0 7)">
      </image>
    </g>
    <g id="cornerssides">
      <!-- <image id="st_12_img" class="_roulette__chips" :href='betTable.contentImage.st_12' x="500" y="0" width="20" height="20"/> -->

      <image v-for="con in content" :key="con.id" :id='con.id+"_img"' class='_roulette__chips' :href='chipHref(con.id)' :x='con.cLoc.xImg' :y='con.cLoc.yImg' width="20" height="20"/>
      <text v-for="con in content" fill="#00000" class="--setColor" :x='con.cLoc.xImg+5' :y='con.cLoc.yImg+11' width="15" height="8" v-if='getStockAmount(con.id) !== 0' font-size="6" font-weight="bold" letter-spacing="-0.5">
        {{ getStockAmount(con.id) | minimizeNumber}}
      </text>

      <!-- <image v-for="(con, i) in content" :id='con.id+"_img"' class='_roulette__chips' :href='betTable.contentImage[con.id]' :x='con.cLoc.x' :y='con.cLoc.y' width="20" height="20"/> -->
      <rect v-for="con in content" :key="con.id + 'rect'" :id='con.id' :class='con.class' @mouseout="ovalOut()" @mouseover="ovalHoverNumbers" @click="bettingClick" :x='con.cLoc.x' :y='con.cLoc.y' :width='con.size.width' :height='con.size.height' :z-index='con.zindex' stroke="none"  stroke-width="none"/>
    </g>
    </svg>
  <div class="--message-rectangle tri-right btm-left-in">
    <p>BET AREA: {{getArea}}, RATIO: {{getRatio}}</p>
  </div>
  </div>

</template>
<script type="text/javascript">
import BettingRoulette from '@/library/BettingRoulette.js'

export default {
  mixins: [ BettingRoulette ]
}
</script>
<style  lang="scss" scoped>
      .--setColor{
        z-index: 1;

      }
      .--message-rectangle {

        p{
          opacity: 1;
          color: white;
        }

        top: 0px;
        left: 0px;
        position: absolute;
        border-radius: 25px;
        background: #000000;
        padding: 2px;
        width: 250px;
        height: 20px;
        text-align: center;
        opacity: 1;


      }

      .tri-right.border.btm-left-in:before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: 30px;
        right: auto;
        top: auto;
        bottom: -40px;
        border: 20px solid;
        border-color: #000000 transparent transparent ;
      }
      .tri-right.btm-left-in:after{
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: 90px;
        right: auto;
        top: auto;
        bottom: -23px;
        border: 12px solid;
        opacity: 1;
        border-color: #000000 transparent transparent transparent;
      }

      // For debugging betting area in roulette set opacity to 0.5
      .st0{display:none;}
      .st1, .st2, .st3, .st4, .st5, .st6, .st7, .st8{
      opacity:0;
      fill:#FFFFFF;
      }



      // .st1{opacity:0;fill:#291BEA;}
      // .st2{opacity:0;fill:#FFFFFF;}
      // .st3{opacity:0;fill:#F200FF;}
      // .st4{opacity:0;fill:#FFFFFF;}
      // .st5{opacity:0;fill:#7FF4AE;}
      // .st6{opacity:0;fill:#FF0019;}
      // .st7{opacity:0;fill:#38F4F4;}
      // .st8{opacity:0;fill:#4A4C1C;}
</style>
