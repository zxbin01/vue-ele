import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'assets/stylus/fonts.styl'
import "assets/stylus/mixins.styl"
import './mock/mockServer'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
