import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
new Vue({
  store, // 会在所有组件中声明一个$store属性
  render: h => h(App),
}).$mount('#app')
