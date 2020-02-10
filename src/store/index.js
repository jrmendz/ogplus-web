import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import { make } from 'vuex-pathify'
import actions from './_actions'
import state from './_state'

import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [ pathify.plugin ],
  state: state,
  actions: actions,
  getters: Object.assign(make.getters(state), getters),
  mutations: Object.assign(make.mutations(state), mutations),
})

// state: Object.assign({}, currentTable, bettingInfo, userresponse, userStates, sidePanelStates, commonStates, selectedtablobby, loadingStatus, filterStates, modalStates, userState, chips, dealerresponse, winningresponse, roadMaps, winningstreakresponse, countdealerfollower, sidegoodtips, chatStates, islobbymessage),
// actions: Object.assign({}, userActions),
// getters: make.getters(state),
// mutations: make.mutations(state),

