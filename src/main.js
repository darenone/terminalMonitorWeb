import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import Bus from './bus/index'
import './assets/font/iconfont/iconfont.css'
import $http from './$http'
import vueFilter from './filter/index'

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.use($http)

for (let key in vueFilter){
  Vue.filter(key,vueFilter[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
