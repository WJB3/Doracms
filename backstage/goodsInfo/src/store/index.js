import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goodsInfo from './modules/goodsInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goodsInfo,
  },
  getters
})

export default store