import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goodsCategory from './modules/goodsCategory'
import contentTemplate from './modules/contentTemplate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goodsCategory,
    contentTemplate
  },
  getters
})

export default store