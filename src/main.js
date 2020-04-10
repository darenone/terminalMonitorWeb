import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import Bus from './bus/index'
import './assets/font/iconfont/iconfont.css'
import $http from './$http'

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.use($http);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
