import Vue from 'vue'
import App from './App.vue'
import router from './permission'
// 第一种方法
// import axios from '../node_modules/axios/dist/axios'
import axios from './utils/axios.config.js'
import Component from './components/index'
import ElementUI from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css' // 引入插件对象

// 注册组件插件
Vue.use(Component)
// Vue.config.productionTip = false
Vue.use(ElementUI)
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 第二种方法
Vue.use(axios)
// Vue.prototype.$axios = axios// 将axios共享给所有实例

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
