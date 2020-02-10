<template>
  <div class='betting-area'>
      <!-- Betting Area of <b>{{ $props.data }}</b><br>
      {{ '--' + _gbl_isLobby + '--' }}<br>
      {{ '--' + _gbl_translate('Alvin') + '--' }} -->

      <!--
      ███████╗██╗   ██╗ ██████╗     ██████╗ ████████╗███╗   ██╗
      ██╔════╝██║   ██║██╔════╝     ██╔══██╗╚══██╔══╝████╗  ██║
      ███████╗██║   ██║██║  ███╗    ██████╔╝   ██║   ██╔██╗ ██║
      ╚════██║╚██╗ ██╔╝██║   ██║    ██╔══██╗   ██║   ██║╚██╗██║
      ███████║ ╚████╔╝ ╚██████╔╝    ██████╔╝   ██║   ██║ ╚████║
      ╚══════╝  ╚═══╝   ╚═════╝     ╚═════╝    ╚═╝   ╚═╝  ╚═══╝
      -->
			<div id="moneywheel" class="moneywheel">
		  <ul>
		   <li>
		    <span>1</span>
		    <span>5</span>
		    <span>10,000</span>
		    <span>1X</span>
		   </li>
		   <li>
		    <span>2</span>
		    <span>5</span>
		    <span>10,000</span>
		    <span>2X</span>
		   </li>
		   <li>
		    <span>5</span>
		    <span>5</span>
		    <span>10,000</span>
		    <span>5X</span>
		   </li>
		   <li>
		    <span>10</span>
		    <span>5</span>
		    <span>10,000</span>
		    <span>10X</span>
		   </li>
		   <li>
		    <span>20</span>
		    <span>5</span>
		    <span>10,000</span>
		    <span>40X</span>
		   </li>
		   <li>
		    <span>
          <div class="logo_moneywheel">
            <div class="svg_holder">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 248 256" style="enable-background:new 0 0 248 256;" xml:space="preserve">
            <g>
              <g>
                <text transform="matrix(1 0 0 1 90.7194 147.7283)" class="st0 st1">财</text>
                <g>
                  <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="124.0999" y1="169.1319" x2="124.0999" y2="80.0285">
                    <stop  offset="0" style="stop-color:#DE3427"/>
                    <stop  offset="0.6803" style="stop-color:#F58720"/>
                  </linearGradient>
                  <path class="st2" d="M104.7,105.2h6.8V128c0,2.1-0.2,4.1-0.5,6c4.3,4.7,8.4,9.4,12.2,14.1l-6.1,5.7c-2.1-3.1-4.9-7-8.4-11.7
                    c-2.4,5.5-6.4,10.2-12,14.1c-1.3-1.9-2.9-4.1-4.9-6.7c8.6-6,13-13.4,13-22V105.2z M94.4,135.8V95h27.4v40.2h-7.2v-32.7h-12.9
                    v33.3H94.4z M123.6,104.4h17.6v-12h8.6v12h6.7v7.9h-6.7v33.5c0,2.8-0.6,5-1.7,6.6c-1.1,1.6-2.6,2.7-4.3,3
                    c-1.7,0.4-6,0.6-12.8,0.7c-0.6-3.6-1.2-6.6-1.8-8.9c2,0.2,4.5,0.3,7.4,0.3c3,0,4.5-1.7,4.5-5.1v-19.8c-4.2,8.1-9.6,15.3-16,21.7
                    c-1.9-2.1-4.1-4.1-6.7-6.1c8.3-7.1,15-15.8,20.1-26.1h-15V104.4z"/>
                </g>
              </g>
            </g>
            </svg>
            </div>
          </div>
        </span>
		    <span>5</span>
		    <span>10,000</span>
		    <span>1X</span>
		   </li>
		  </ul>
		 </div>


    </div>

</template>

<script>
  // Mixins
  import { TweenLite, gsap } from 'gsap'
  import Template from "../../road/mixins/ErrorHandler/template";
  import Betting from '@/library/Betting.js'

  export default {
    name: "BettingArea",
    mixins: [ Betting ],
    props: {
      data: { type: Object, default: function () { return {}} }
    },
    data: function () {
      return {
        imgFlame: 'https://static.oriental-game.com/image/fire.png',
        imgPathcoin: 'https://static.oriental-game.com/chips/tablechip/table_chip',
        coinTable: ['1','2','3','4','5','6','7','8','9','10'],
        classPlayer: ['p1_','p2_','p3_','p4_','p5_','p6_','p7_',],
        classCoin: [
          {
            name: 'player_class',
            playerCnt: ['1','2','3','4','5','6','7'],
            classCount: ['p_1','p_2','p_3','p_4','p_5']
          },
          {
            name: 'banker_class',
            playerCnt: ['1','2','3','4','5','6','7'],
            classCount: ['b_1','b_2','b_3','b_4','b_5']
          },
          {
            name: 'playerpair_class',
            playerCnt: ['1','2','3','4','5','6','7'],
            classCount: ['pp_1','pp_2','pp_3','pp_4','pp_5']
          },
          {
            name: 'bankerpair_class',
            playerCnt: ['1','2','3','4','5','6','7'],
            classCount: ['bp_1','bp_2','bp_3','bp_4','bp_5']
          },
          {
            name: 'tie_class',
            playerCnt: ['1','2','3','4','5','6','7'],
            classCount: ['tie_1','tie_2','tie_3','tie_4','tie_5']
          },
          {
            name: 'super6_class',
            playerCnt: ['1'],
            classCount: ['super6_1','super6_2','super6_3','super6_4','super6_5']
          }
        ],
        playerCoinAdd: [
          {
            name: '.p_',
            coinStack: ['1','2','3','4','5'],
            playerSeat: ['1','2','3','4','5','6','7'],
            coinC : 0
          },
          {
            name: '.b_',
            coinStack: ['1','2','3','4','5'],
            playerSeat: ['1','2','3','4','5','6','7'],
            coinC : 0
          },
          {
            name: '.pp_',
            coinStack: ['1','2','3','4','5'],
            playerSeat: ['1','2','3','4','5','6','7'],
            coinC : 0
          },
          {
            name: '.bp_',
            coinStack: ['1','2','3','4','5'],
            playerSeat: ['1','2','3','4','5','6','7'],
            coinC : 0
          },
          {
            name: '.tie_',
            coinStack: ['1','2','3','4','5'],
            playerSeat: ['1','2','3','4','5','6','7'],
            coinC : 0
          },
          {
            name: '.super6_',
            coinStack: ['1','2','3','4','5'],
            playerSeat: ['1','2','3','4','5','6','7'],
            coinC : 0
          },
        ]
      }
    },
    components: {
      Template,
      TweenLite,
      gsap
    },
    created() {

    },
    mounted() {
      this.initGsap();
    },
		watch: {
      status: function (n, o) {
        switch (n) {
            case 'default':
            this.clearAll()
            break
        }
      }
    },
    computed: {
      mouseXY: {
        get () {
          return this.$store.state.staticPattern
        }
      },
      selectedChips: {
        get (e) {
          return e.$store.state.selectedChip
        }
      },
      table: {
        get(e) {
          return e.$store.state.tablelist[e.currentTableIndex]
        }
      },
      currentTableIndex: {
        get (e) {
          return e.$store.state.currentTableIndex
        }
      },
      status: function (e) {
        return e.table.status
      },
      betTable: {
        get (e) {
          return e.$store.state.betTable
        }
      }
    },
    methods: {
      initGsap() {
        let flames = ['.f1','.f2','.f3','.f4','.f5','.f6','.f7']
        let ppbb = ['#gp1', '#gp2', '#gp3', '#gp4', '#gp5', '#gp6', '#gp7', '#gb1', '#gb2', '#gb3', '#gb4', '#gb5', '#gb6', '#gb7']
        let btn = ['#pp_btn', '#p_btn', '#tie_btn', '#b_btn', '#super6_btn', '#bp_btn', '#p1_btn', '#p2_btn', '#p3_btn', '#p4_btn', '#p5_btn', '#p6_btn', '#p7_btn']
        let allAr = _.unionBy(flames, ppbb, btn)
        for (let i in allAr) {
          // set opacity to 1 to show flames for testing
           TweenLite.set(allAr[i], {opacity: 0})
           i++
        }
        this.clearAll()
      },

      addCoinIndex () {
				let _s = this
				let result =  _.findIndex(_s.$store.state.bettingChips, function(o) { return o.class == _s.selectedChips.class })
				return _.toString(result + 1)
      },

      clearAll() {
        for(let i = 1; i <= 7; i++) {
          for (let j = 1; j <= 5; j++) {
              let item = '.p_'+j+'_'+i
              let item1 = '.pp_'+j+'_'+i
              let item2 = '.b_'+j+'_'+i
              let item3 = '.bp_'+j+'_'+i
              let item4 = '.tie_'+j+'_'+i
              let item5 = '.super6_'+j+'_'+i
              TweenLite.set(item, {opacity: 0})
              TweenLite.set(item1, {opacity: 0})
              TweenLite.set(item2, {opacity: 0})
              TweenLite.set(item3, {opacity: 0})
              TweenLite.set(item4, {opacity: 0})
              TweenLite.set(item5, {opacity: 0})
            }
        }
      },

      tableClick(e) {
        let _s = this
				if (this.status !== 'betting') return

        let getPlayerseat  = 1
				let btns = ['p_btn', 'b_btn', 'pp_btn', 'bp_btn', 'tie_btn', 'super6_btn']
				let currIndx = btns.findIndex(function(itemsIndx){
					return itemsIndx == e.target.id
				})
				console.log('currIndx: ', currIndx)

				if(this.playerCoinAdd[currIndx].coinC !== 5) {
					let focus = this.playerCoinAdd[currIndx].name+this.playerCoinAdd[currIndx].coinStack[this.playerCoinAdd[currIndx].coinC]+'_'+this.playerCoinAdd[currIndx].playerSeat[getPlayerseat]+"_"
					let focus2 = this.playerCoinAdd[currIndx].name+this.playerCoinAdd[currIndx].coinStack[this.playerCoinAdd[currIndx].coinC]+'_'+this.playerCoinAdd[currIndx].playerSeat[getPlayerseat]
					console.log('focus2: ', focus2)
					console.log('focus: ', focus)
					TweenLite.set(focus2,{opacity:1})
					TweenLite.set(focus,{attr:{src:this.imgPathcoin+this.addCoinIndex()+".png"}})
					this.playerCoinAdd[currIndx].coinC++
				} else {
				}

        switch (e.target.id){
          case 'pp_btn' :
            _s.addChips('player_pair')
						TweenLite.set('#gp'+getPlayerseat, {opacity: 1})
            break
          case 'p_btn' :
            _s.addChips('player')
						TweenLite.set('#gp'+getPlayerseat, {opacity: 1})
            break
          case 'tie_btn' :
            _s.addChips('tie')
            break
          case 'b_btn' :
            _s.addChips('banker')
						TweenLite.set('#gb'+getPlayerseat, {opacity: 1})
            break
          case 'super6_btn' :
            _s.addChips('super_six')
            break
          case 'bp_btn' :
            _s.addChips('banker_pair')
						TweenLite.set('#gb'+getPlayerseat, {opacity: 1})
            break

          case 'p1_btn' :
          case 'p2_btn' :
          case 'p3_btn' :
          case 'p4_btn' :
          case 'p5_btn' :
          case 'p6_btn' :
          case 'p7_btn' :
            break;
        }
      }
    }
  }
</script>

<style scoped>
/***
*    ██████╗ ███████╗███████╗██████╗     ███████╗███████╗██╗     ███████╗ ██████╗████████╗ ██████╗ ██████╗
*    ██╔══██╗██╔════╝██╔════╝██╔══██╗    ██╔════╝██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
*    ██║  ██║█████╗  █████╗  ██████╔╝    ███████╗█████╗  ██║     █████╗  ██║        ██║   ██║   ██║██████╔╝
*    ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝     ╚════██║██╔══╝  ██║     ██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
*    ██████╔╝███████╗███████╗██║         ███████║███████╗███████╗███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
*    ╚═════╝ ╚══════╝╚══════╝╚═╝         ╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
Intended for breaking hierarchy rules using ">>>" or "/deep/" see link below,
without changing any custom css in other components
https://vue-loader.vuejs.org/guide/scoped-css.html
*/
.st0{font-family:'MicrosoftYaHeiUI-Bold';}
.st1{font-size:66.6959px;}
.st2{fill:url(#SVGID_1_);}
</style>

<style lang="scss" scoped>
$baseWidth: 1700px;
$baseHeight: 380px;
$elevation: 0px;

@mixin center {
  left: 50%;
  transform: translateX(-50%);
}

.betting-area {
  position: absolute;
  @include center;
  bottom: $elevation;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: $baseWidth;
  height: $baseHeight;
}

.moneywheel {
 display: flex;
 width: 870px;
 height: 300px;
 padding-left: 10px;

 ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 10px;
  margin-left: -10px;
  margin-top: 0;
  margin-bottom: 0;

  li {
   position: relative;
   width: calc(100% / 3 - 10px);
   border: 1px solid #000;
   height: calc(300px / 2 - 20px);
   border-radius: 10px;
   padding: 10px;
   margin-left: 10px;
   margin-top: 10px;
   background-color: rgba(0,0,0,.75);
   color: #fff;
   box-sizing: border-box;

   &:first-child,
   &:nth-child(3n + 1){
    margin-left: 0;
   }

   &:nth-child(-n+3) {
    margin-top: 0;
   }

   > span {
    display: block;

    &:first-child {
     display: block;
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     display: block;
     text-align: center;
     line-height: calc(300px / 2 - 20px);
     font-size: 6em;
     background: linear-gradient(#fdd17a, #da272b);
     -webkit-background-clip: text;
     background-clip: text;
     -webkit-text-fill-color: transparent;
     text-fill-color: transparent;
    }

    &:nth-child(6) {
     position: absolute;
     top: -70px;
    }

    &:last-child {
     position: absolute;
     top: 10px;
     right: 10px;
     font-size: 1.25em;
    }


   }
  }
 }
}


.logo_moneywheel {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svg_holder{
  position: absolute;
  justify-content: center;
  width: 200px;
  height: 200px;
}
// font-size: 72px;
// background: -webkit-linear-gradient(#eee, #333);
// -webkit-background-clip: text;
// -webkit-text-fill-color: transparent;

</style>
