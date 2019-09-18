import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from '../node_modules/axios/dist/axios'
import axios from 'axios'

import ElementUI from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
// Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios// 将axios共享给所有实例

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
