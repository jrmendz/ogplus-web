<!--<template>-->
  <!--<div>-->
    <!--<v-tabs v-model="tabs" grow color="transparent"  hide-slider>-->
      <!--<v-tab v-for="n in 2" :key="n" :href="'#table' + (n + 1)">-->
        <!--<div>-->
          <!--{{ tt('Table') }} {{ n }}-->
        <!--</div>-->
      <!--</v-tab>-->
    <!--</v-tabs>-->
    <!--<v-tabs-items v-model="tabs">-->
      <!--<v-tab-item lazy v-for="n in 2" :key="n" :id="'table' + (n + 1)">-->
        <!--<div class="sidebar__card" :class="table.gameType">-->
          <!--<div>-->
            <!--<ul class="card__header">-->
              <!--<li>{{ tt(table.tableNo) }}</li>-->
              <!--<li>-->
                <!--<marquee behavior="scroll" direction="left" scrollamount="2">{{ tt(table.tableName) }}</marquee>-->
              <!--</li>-->
              <!--<v-slide-x-reverse-transition v-if="table.gameType === 'emcee'">-->
                <!--<li v-if="table.isSideBetting">-->
                  <!--<label :for="(index + 1)" class="super__switch">-->
                    <!--<input type="checkbox" :id="(index + 1)" v-model="table.isSuperSix">-->
                    <!--<div class="slider round" data-text="Super 6"></div>-->
                  <!--</label>-->
                <!--</li>-->
              <!--</v-slide-x-reverse-transition>-->
              <!--<li>0</li>-->
            <!--</ul>-->
            <!--<div class="card__body">-->
              <!--<v-scale-transition origin="center center">-->
                <!--<div class="&#45;&#45;is-shuffling" v-if="table.isShuffling">-->
                  <!--<div class="svg-holder">-->
                    <!--<svgicon name="shuffling" height="24" scale="3" color="#ffffff"></svgicon>-->
                  <!--</div>-->
                  <!--Shuffling...-->
                <!--</div>-->
              <!--</v-scale-transition>-->
              <!--<div class="&#45;&#45;has-result" v-if="table.hasResult">-->
                <!--<ul class="list__ui">-->
                  <!--<li class="&#45;&#45;is-center">-->
                    <!--<span class="blue&#45;&#45;text text&#45;&#45;darken-3">{{ (table.gameType !== 'dragontiger') ? 'P' : 'D' }}</span>-->
                    <!--<span>9</span>-->
                  <!--</li>-->
                  <!--<li class="&#45;&#45;is-center">-->
                    <!--<span class="red&#45;&#45;text text&#45;&#45;darken-3">{{ (table.gameType !== 'dragontiger') ? 'B' : 'T' }}</span>-->
                    <!--<span>9</span>-->
                  <!--</li>-->
                <!--</ul>-->
                <!--<ul class="card__deck__result">-->
                  <!--<li>-->
                    <!--<div class="&#45;&#45;is-h1"></div>-->
                    <!--<div class="&#45;&#45;is-h1" v-if="table.gameType !== 'dragontiger'"></div>-->
                    <!--<div class="&#45;&#45;is-h1 &#45;&#45;is-horizontal" v-if="table.gameType !== 'dragontiger'"></div>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<div class="&#45;&#45;is-h1"></div>-->
                    <!--<div class="&#45;&#45;is-h1" v-if="table.gameType !== 'dragontiger'"></div>-->
                    <!--<div class="&#45;&#45;is-h1 &#45;&#45;is-horizontal" v-if="table.gameType !== 'dragontiger'"></div>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
              <!--<v-scale-transition origin="center center">-->
                <!--<div class="&#45;&#45;is-side-betting" v-if="table.isSideBetting">-->
                  <!--<ul class="side__betting__area" :class="table.isSuperSix ? '&#45;&#45;is-super6' : ''" v-if="table.gameType === 'emcee'">-->
                    <!--<li>-->
                      <!--<span>1:11</span>-->
                      <!--<p class="blue&#45;&#45;text text&#45;&#45;darken-3">{{ tt('pp') }}</p>-->
                    <!--</li>-->
                    <!--<li>-->
                      <!--<span>1:8</span>-->
                      <!--<p class="green&#45;&#45;text text&#45;&#45;darken-1">{{ tt('t') }}</p>-->
                    <!--</li>-->
                    <!--<li>-->
                      <!--<span>1:11</span>-->
                      <!--<p class="red&#45;&#45;text text&#45;&#45;darken-3">{{ tt('bp') }}</p>-->
                    <!--</li>-->
                    <!--<li>-->
                      <!--<span>1:11</span>-->
                      <!--<p class="blue&#45;&#45;text text&#45;&#45;darken-3">{{ tt('b') }}</p>-->
                    <!--</li>-->
                    <!--<li v-if="table.isSuperSix">-->
                      <!--<span>1:12</span>-->
                      <!--<p class="green&#45;&#45;text text&#45;&#45;darken-1">{{ tt('S6') }}</p>-->
                    <!--</li>-->
                    <!--<li>-->
                      <!--<span>1:11</span>-->
                      <!--<p class="red&#45;&#45;text text&#45;&#45;darken-3">{{ tt('p') }}</p>-->
                    <!--</li>-->
                  <!--</ul>-->

                  <!--<ul class="btn__group">-->
                    <!--<li>-->
                      <!--<v-btn block outline color="success" small>{{ tt('Confirm') }}</v-btn>-->
                    <!--</li>-->
                    <!--<li>-->
                      <!--<v-btn block outline color="error" small @click="table.isSideBetting = false">{{ tt('Cancel') }}</v-btn>-->
                    <!--</li>-->
                  <!--</ul>-->
                <!--</div>-->
              <!--</v-scale-transition>-->
              <!--<div class="table__wrapper" @click="table.isSideBetting = true">-->
                <!--<TableRoad :rows="6" :columns="12" :table="table"/>-->
              <!--</div>-->
              <!--<v-btn block outline color="success" :ripple="false" large v-on:click="clickEff">{{ tt('ENTER') }}</v-btn>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</v-tab-item>-->
    <!--</v-tabs-items>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import TableRoad from '@/components/road/TableRoad'-->
<!--import Settings from '@/library/Settings.js'-->

<!--export default {-->
  <!--components: {-->
    <!--TableRoad-->
  <!--},-->
  <!--mixins: [Settings],-->
  <!--props: {-->
    <!--table: '',-->
    <!--index: ''-->
  <!--},-->
  <!--data () {-->
    <!--return {-->
      <!--tabs: null-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
