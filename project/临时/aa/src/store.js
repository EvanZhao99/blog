import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    a: 1,
    b: 11
  },
  mutations: {
    add1(state, payload) {
      state.a += 1
    }
  },
  actions: {
    asyncAdd1(store, payload) {
      setTimeout(() => store.commit('add1'), 3)
    }
  },
  getters: {
    getA(state) {
      return state.a
    }
  },
  modules: {
    module1: {
      mutations: {
        add1() {},
        add2() {}
      }
    }
  }
})