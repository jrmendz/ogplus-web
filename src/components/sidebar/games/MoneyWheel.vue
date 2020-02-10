<!--<template>-->
  <!--<div class="sidebar__card" :class="table.code">-->
    <!--<div class="mini-tile">-->
      <!--<ul>-->
        <!--<li>-->
          <!--<span>-->
            <!--{{timer(index)}}-->
          <!--</span>-->
        <!--</li>-->
        <!--<li>{{ index }}</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--<div class="inner-wrapper">-->

      <!--<ul class="card__header">-->
        <!--<li class="&#45;&#45;is-number">-->
          <!--{{ index }}-->
        <!--</li>-->
        <!--<li>-->
          <!--<marquee behavior="scroll" direction="left" scrollamount="2">{{ tt(table.name) }}</marquee>-->
        <!--</li>-->
        <!--<li class="&#45;&#45;is-number">-->
          <!--<span>-->
            <!--{{timer(index)}}-->
          <!--</span>-->
        <!--</li>-->
      <!--</ul>-->

      <!--<div class="card__body">-->
        <!--<v-scale-transition origin="center center">-->
          <!--<div class="&#45;&#45;is-shuffling &#45;&#45;mw-win-sidebar" v-if="table.status === 'default'">-->
            <!--<span class="&#45;&#45;mw-has-result" v-if="table.game.result !== 'og'">{{ table.game.result }}</span>-->
            <!--<span class="&#45;&#45;mw-has-og-result" v-else-if="table.game.result === 'og'"></span>-->
            <!--<span class="&#45;&#45;mw-has-multi-result" v-if="multiplier > 1"> x{{ multiplier }}</span>-->
            <!--<span class="&#45;&#45;mw-has-amount"> {{ mwBetResult }}</span>-->
          <!--</div>-->
        <!--</v-scale-transition>-->

        <!--<v-scale-transition origin="center center">-->
          <!--<div class="&#45;&#45;is-shuffling" v-if="table.status === 'dealing'">-->
            <!--<div class="svg-holder-mw">-->
              <!--&lt;!&ndash; <svgicon name="moneywheel" color="#ffffff"></svgicon> &ndash;&gt;-->
            <!--</div>-->
            <!--{{ tt('Spinning Wheel') }}...-->
          <!--</div>-->

          <!--<div class="&#45;&#45;is-side-betting" v-if="table.isSideBetting && !isLobby && table.status === 'betting'">-->
            <!--<div class="&#45;&#45;is-shuffling &#45;&#45;mw-win-multiplier" v-if="!table.game.result && multiplier > 1">-->
              <!--<span class="multiplier-box">x{{ multiplier }}</span>-->
            <!--</div>-->
            <!--<ul class="side__betting__area &#45;&#45;is-money-wheel &#45;&#45;is-dragon" v-if="table.code === 'moneywheel'">-->
              <!--<li v-for="(betSection, sectionIndex) in $store.state.betSectionListMW" @click="addChip(betSection.index)" :key="sectionIndex">-->
                <!--<span v-if="betSection.index !== 'pays_Ogx'" class="&#45;&#45;mw-ratio">{{ tt(betSection.name) }}</span>-->
                <!--<span v-else-if="betSection.index === 'pays_Ogx'" class="&#45;&#45;mw-ratio">{{ tt('Pays 40x') }}</span>-->
                <!--<span v-if="betSection.index !== 'pays_Ogx'" class="red&#45;&#45;text text&#45;&#45;darken-3 &#45;&#45;mw-font-size">{{ betSection.index.split('_')[1].replace('x', '')}} </span>-->
                <!--<span v-else-if="betSection.index === 'pays_Ogx'"> <img height="30" :src="nocLogo"> </span>-->
                <!--<img style="position:absolute" v-for="(stacking_bet, stackIndex) in stackingBets[betSection.index]" :src="'static/chips/betting/'+stacking_bet.chipImage+'.png'" :key="stackIndex">-->
                <!--<span class="&#45;&#45;betting-sidebar" v-if="getTotalBet([betSection.index]) !== 0"> {{getTotalBet([betSection.index]) | minimizeNumber}} </span>-->
              <!--</li>-->
            <!--</ul>-->
            <!--<ul class="btn__group">-->
              <!--<li>-->
                <!--<v-btn @click="execButtons('confirm')" block color="btn__success_gradient" small>{{ tt('Confirm') }}</v-btn>-->
              <!--</li>-->
              <!--<li>-->
                <!--<v-btn block color="btn__error_gradient" small @click="execButtons('cancel')">{{ tt('Cancel') }}</v-btn>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</v-scale-transition>-->
        <!--<div class="table__wrapper" :class="$store.state.blackRoadMapSelected ? '&#45;&#45;is-black' : ''" @click="table.isSideBetting = true; clickEff()">-->
          <!--<TableRoad v-if="!table.isDragon" class="&#45;&#45;is-moneywheel" :rows="4" :columns="4" :table="table" isAnimal="true" />-->
          <!--<TableRoad v-else class="&#45;&#45;is-moneywheel &#45;&#45;is-dragon" :rows="5" :columns="8" :table="table" isDragon="true" />-->
        <!--</div>-->
        <!--<v-btn v-on:click="enterGame(table, index)" block outline color="success" :ripple="false" large>{{ tt('ENTER') }}</v-btn>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import TableRoad from '@/components/road/TableRoad'-->
<!--import SidebarMixin from '@/components/sidebar/mixins/Sidebar.mixin.js'-->

<!--export default {-->
  <!--mixins: [ SidebarMixin ],-->
  <!--components: {-->
    <!--TableRoad-->
  <!--},-->
  <!--props: {-->
    <!--table: '',-->
    <!--index: ''-->
  <!--},-->
  <!--data () {-->
    <!--return {-->
      <!--nocLogo: 'static/logo.png',-->
      <!--confirmDialog: false,-->
      <!--betPlaced: false,-->
      <!--confirmedBet: false,-->
      <!--betData: 0-->
    <!--}-->
  <!--},-->
  <!--computed: {-->
    <!--isLobby: {-->
      <!--get () {-->
        <!--return this.$store.state.isLobby-->
      <!--},-->

      <!--set (value) {-->
        <!--this.$store.state.isLobby = value-->
      <!--}-->
    <!--},-->
    <!--balance: {-->
      <!--get () {-->
        <!--let _s = this-->
        <!--return _s.$store.state.userinfo.balance-->
      <!--},-->

      <!--set (balance) {-->
        <!--let _s = this-->
        <!--_s.$store.commit('SET_USER_BALANCE', balance)-->
      <!--}-->
    <!--},-->
    <!--status: function () {-->
      <!--return this.table.status-->
    <!--},-->
    <!--moneywheel_betsections () {-->
      <!--return this.$store.state.bet_moneywheel_sections-->
    <!--},-->
    <!--getBettingtable: {-->
      <!--get () {-->
        <!--return this.$store.state.currenttab-->
      <!--}-->
    <!--},-->
    <!--getTotalBet: function () {-->
      <!--return function (arrAgs) {-->
        <!--let _s = this-->
        <!--let total = 0-->
        <!--_s.$store.state.stacking_moneywheel_bets[arrAgs].forEach(function (stackingBet, index) {-->
          <!--let chip = stackingBet.chipValue-->
          <!--total = total + parseFloat(chip)-->
        <!--})-->
        <!--return total-->
      <!--}-->
    <!--},-->
    <!--stackingBets: {-->
      <!--get () {-->
        <!--return this.$store.state.stacking_moneywheel_bets-->
      <!--}-->
    <!--},-->
    <!--mwBetResult: {-->
      <!--get () {-->
        <!--let _s = this-->
        <!--let winningBet = 0-->
        <!--let result = this.table.game.result === 'og' ? 40 : this.table.game.result-->
        <!--let multi = this.multiplier-->
        <!--_.map(_s.$store.state.betting_moneywheel_totals, (v, i) => {-->
          <!--let betPlace = i.split('_')[1].replace('x', '')-->
          <!--betPlace = betPlace === 'Og' ? 40 : betPlace-->
          <!--if (betPlace === result) {-->
            <!--winningBet += v-->
          <!--}-->
          <!--_s.$store.state.betting_moneywheel_totals[i] = 0-->
        <!--})-->
        <!--return (winningBet * (result) * multi) + winningBet-->
      <!--}-->
    <!--},-->
    <!--multiplier: {-->
      <!--get () {-->
        <!--let _s = this-->
        <!--if (!_s.table.game.values) {-->
          <!--return ''-->
        <!--}-->
        <!--let values = _s.table.game.values.split(',').length - 1-->
        <!--let multi = Math.pow(3, values)-->
        <!--return multi-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--watch: {-->
    <!--status: function () {-->
      <!--let _s = this-->
      <!--if (_s.table.status === 'betting') {-->
        <!--this.betPlaced = false-->
        <!--this.confirmedBet = false-->
        <!--_s.clearBets()-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--addChip: function (section) {-->
      <!--let _s = this-->
      <!--_s.betPlaced = true-->
      <!--_s.confirmDialog = false-->
      <!--let selectedChip = _s.$store.state.selectedChip-->
      <!--let chipValue = parseFloat(selectedChip.value)-->
      <!--let maxBet = _s.$store.state.maxChipValue-->
      <!--let balance = _s.$store.state.userinfo.balance-->
      <!--let totalchips = _.sumBy(_s.$store.state.stacking_moneywheel_bets[section], function (o) { return o.chipValue })-->
      <!--let totalchipsBalance = totalchips + chipValue-->
      <!--let allComputation = _s.getTotalSideBet()-->
      <!--let availableBalance = allComputation + chipValue-->
      <!--if (allComputation < balance) {-->
        <!--if (chipValue >= minbet) {-->
          <!--if (totalchipsBalance <= maxBet && availableBalance <= balance) {-->
            <!--_s.$store.state.stacking_moneywheel_bets[section].push({-->
              <!--betSection: section,-->
              <!--chipClass: selectedChip.class,-->
              <!--chipImage: selectedChip.class,-->
              <!--chipValue: chipValue,-->
              <!--isConfirmed: false-->
            <!--})-->
          <!--} else if (totalchipsBalance > maxBet && availableBalance <= balance) {-->
            <!--if (totalchipsBalance > maxBet && totalchips !== maxBet) {-->
              <!--let subChips = maxBet - totalchips-->
              <!--_s.pushEditMoneyWheel(section, subChips)-->
            <!--} else {-->
              <!--_s.$store.state.message = 'Exceed Max/Min bet'-->
            <!--}-->
          <!--} else {-->
            <!--if (totalchips < maxBet) {-->
              <!--let subChips = balance - allComputation-->
              <!--let getcomputation = totalchips + subChips-->
              <!--if (getcomputation < maxBet) {-->
                <!--subChips = (subChips > maxBet) ? maxBet - allComputation : subChips-->
                <!--_s.pushEditMoneyWheel(section, subChips)-->
              <!--} else {-->
                <!--subChips = maxBet - totalchips-->
                <!--_s.pushEditMoneyWheel(section, subChips)-->
              <!--}-->
            <!--} else {-->
              <!--_s.$store.state.message = 'Exceed Max/Min bet'-->
            <!--}-->
          <!--}-->
        <!--} else {-->
          <!--_s.$store.state.message = 'Min bet is ' + minbet-->
        <!--}-->
      <!--} else {-->
        <!--_s.$store.state.message = 'Insufficient  Balance'-->
      <!--}-->
    <!--},-->
    <!--getTotalSideBet: function () {-->
      <!--let total = 0-->
      <!--let subtotal = 0-->
      <!--let totalchips = 0-->
      <!--let _s = this-->
      <!--// compute all bets for moneywheel - alfie-->
      <!--for (let item in _s.$store.state.stacking_moneywheel_bets) {-->
        <!--totalchips += _.sumBy(_s.$store.state.stacking_moneywheel_bets[item], 'chipValue')-->
      <!--}-->
      <!--for (let bettings in _s.$store.state.sidebar_betting) {-->
        <!--for (let item in _s.$store.state.sidebar_betting[bettings]) {-->
          <!--total += _.sumBy(_s.$store.state.sidebar_betting[bettings][item], 'chipValue')-->
        <!--}-->
      <!--}-->
      <!--subtotal = total + totalchips-->
      <!--return subtotal-->
    <!--},-->
    <!--pushEditMoneyWheel: function (section, subChips) {-->
      <!--let _s = this-->
      <!--let selectedChip = _s.$store.state.selectedChip-->
      <!--_s.$store.state.stacking_moneywheel_bets[section].push({-->
        <!--betSection: section,-->
        <!--chipClass: selectedChip.class,-->
        <!--chipImage: selectedChip.class,-->
        <!--chipValue: parseFloat(subChips),-->
        <!--isConfirmed: false-->
      <!--})-->
    <!--},-->
    <!--execButtons: async function (btn) {-->
      <!--let _s = this-->
      <!--let bettings = []-->
      <!--let shoehand = _s.table.shoeGame-->
      <!--let tableid = _s.table.id-->
      <!--_s.$store.state.sideBarNotif = true-->
      <!--_s.clickEff()-->
      <!--switch (btn) {-->
        <!--case 'confirm' :-->
          <!--_s.$store.state.message = ''-->
          <!--bettings = []-->
          <!--// clone bet to store the amount for the bet_moneywheel_sections-->
          <!--_s.$store.state.betSectionListMW.forEach(function (section) {-->
            <!--let total = 0-->
            <!--let betSection = ''-->
            <!--_s.$store.state.stacking_moneywheel_bets[section.index].forEach(function (value, key) {-->
              <!--if (value.isConfirmed === false) {-->
                <!--total += value.chipValue-->
                <!--betSection = value.betSection.split('_')[1].replace('x', '')-->
                <!--value.isConfirmed = true-->
                <!--_s.$store.state.betting_moneywheel_totals[section.index] = total-->
              <!--}-->
            <!--})-->
            <!--if (total !== 0) {-->
              <!--bettings.push({-->
                <!--index: betSection,-->
                <!--chipValue: total-->
              <!--})-->
            <!--}-->
          <!--})-->
          <!--if (bettings[0].chipValue !== 0) {-->
            <!--_s.confirmedBet = true-->
          <!--} else {-->
            <!--_s.confirmedBet = false-->
          <!--}-->
          <!--await _s.$store.dispatch('CONFIRM_BETTINGS', {token: localStorage._token, bettings, shoehand, tableid})-->
          <!--break-->
        <!--case 'cancel' :-->
          <!--if (this.betPlaced) {-->
            <!--_s.clearBets('cancel')-->
          <!--} else {-->
            <!--if (!this.confirmedBet) {-->
              <!--_s.table.isSideBetting = false-->
            <!--}-->
          <!--}-->
          <!--break-->
      <!--}-->
    <!--},-->
    <!--clearBets: function (type = '') {-->
      <!--let _s = this-->
      <!--this.betPlaced = false-->
      <!--_s.$store.state.betSectionListMW.forEach(function (section) {-->
        <!--if (_s.$store.state.stacking_moneywheel_bets[section.index]) {-->
          <!--_s.$store.state.stacking_moneywheel_bets[section.index].forEach(function (stackingBet, index) {-->
            <!--if (type === 'cancel' && stackingBet.isConfirmed) {-->
              <!--return-->
            <!--}-->
            <!--_s.$store.state.stacking_moneywheel_bets[section.index].splice(index)-->
            <!--_s.$store.state.totalBet = 0-->
          <!--})-->
        <!--}-->
      <!--})-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
  <!--.super__switch .slider:after {-->
    <!--font-size: 20px;-->
    <!--margin-top: -1px;-->
    <!--margin-left: 9px;-->
  <!--}-->

  <!--.super__switch input:checked+.slider:after {-->
    <!--margin-left: -10px;-->
  <!--}-->
<!--</style>-->
