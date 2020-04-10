import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import area from './module/area'
import saveInSession from './plugin/saveInSession'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations,
  actions,
  modules: {
    area
  },
  plugins: [ saveInSession ]
})
