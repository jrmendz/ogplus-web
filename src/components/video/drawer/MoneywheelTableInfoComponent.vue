<template>
  <div>
    <div class="percentage__tableinfo" >
      <div class="brown__tableinfo">
        <ul>
          <li>{{ currentTableIndex }}</li>
          <li>{{ tt((table.name==='DRAGON') ? 'MW-DRAGON' : table.name) | formatTblName }}</li>
          <li >BET LIMIT : {{ minBet | minimizeNumber }} - {{ maxBet | minimizeNumber }}
            <div class="svg-holder">
              <svgicon name="info_icon" height="36" scale="1" color="#fff"></svgicon>
            </div>
          </li>
        </ul>
      </div>
      <div class="table__Info">
        <ul>
          <li>
            <span>{{ tt('Shoe No:') }}</span>
            <span>{{ table.shoeGame }}</span>
          </li>
          <li v-for="(info, i) in getBetLimits()" :key="i">
            <span>{{ tt(info.name) }}</span>
            <animated-number class="--is-number" :value="info.value" :formatValue="formatToPrice"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TweenLite from 'gsap'
import TableInfo from '@/library/TableInfo'
export default {
  mixins: [ TableInfo ],
  methods: {
  },
  computed: {
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },

    minBet: {
        get (e) {
            return e.$store.state.userinfo.min_bet_limit
        }
    },

    maxBet: {
        get (e) {
            return e.$store.state.userinfo.max_bet_limit
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

.percentage__tableinfo {
 width: 390px;
 padding: 15px 35px;

  .brown__tableinfo{
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
        flex: 90px 0 0;
      }

      &:nth-child(3){
        flex: 200px 0 0;
      }
      // &:last-child {
      //   justify-content: flex-end;
      //   padding-right: 15px;
      //   flex: 5px 0 0;
      //    width:20px;
      //    background-color:pink;
      // }
      }
    }
  }

 .brown__tableinfo {
  position: relative;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
 }

 .brown__tableinfo {
  background-color: rgba(158, 114, 30, .8);
 }
 .table__Info{
   opacity: 0;
   background-color: rgba($base-color, .5);
   width:100%;
   height:100px;
   border-radius: 8px;
   padding: 5px 10px;

   -webkit-transition: all 500ms ease-in-out;
    -moz-transition: all 500ms ease-in-out;
    -ms-transition: all 500ms ease-in-out;
    -o-transition: all 500ms ease-in-out;
    transition: all 500ms ease-in-out;
   ul{
     position:relative;
     width:100%;
     li{
      padding: 5px 0;
      border-bottom:1px solid rgba(128, 128, 128, 0.4);
      &:last-child{
        border-bottom:none;
      }
      span{
        display:inline-block;
        width:50%;
        &:first-child{
          color:#fcac09;
        }
        &:nth-child(2){
          color:#fff;
        }
      }
    }
   }
 }

}
.brown__tableinfo:hover + .table__Info {
  opacity: 1 !important;
}
</style>
