import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css'
import './assets/js/directives'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题

Vue.config.productionTip = false
Vue.use(Element, {
  size: 'small'
})
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
