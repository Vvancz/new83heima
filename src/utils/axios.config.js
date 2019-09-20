// 负责对axios进行处理
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  //   config 要发送请求的配置信息
  //   config.headers.Authorization
  let token = window.localStorage.getItem('user-token')// 获取token
  config.headers['Authorization'] = `Bearer${token}`// 统一注入token

  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// export default axios  第一种方法
// 第二种方法
export default {
  install (Vue) {
    Vue.prototype.$axios = axios// 将axios共享给所有实例
  }
}
