import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import homeimage from './modules/homeimage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    homeimage,
  },
  getters
})

export default store