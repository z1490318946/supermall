import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payLoad) {
      // 1.查找之前的数组中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)

      // 2.判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payLoad.count = 1
        payLoad.checked = true
        state.cartList.push(payLoad)
      }
    }
  },
  actions: {},
  modules: {}
})