// 负责对axios进行处理
import axios from 'axios'
import { Message } from 'element-ui'
import jsonBig from 'json-bigint'
import router from '../permission'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data) {
  // 换了一个计算方法 保证id不失真
  return data ? jsonBig.parse(data) : ''
  // obj.data.results.id.tostring
}]
// 请求拦截  在请求到达后台之前拦截
axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  //   config 要发送请求的配置信息
  //   config.headers.Authorization
  let token = window.localStorage.getItem('user-token')// 获取token
  config.headers['Authorization'] = `Bearer ${token}`// 统一注入token

  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 执行成功时执行
  // 对响应数据做处理
  // 存在返回response.data 不存在返回一个空对象
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token 未携带或已经过期'
      break

    case 507:
      message = '服务器数据库异常'
      break

    case 401:
      message = 'token过期或未传'
      window.localStorage.clear() // 清除缓存
      router.push('/login')
      break

    case 404:
      message = '手机号不正确'
      break

    default:
      break
  }
  Message({ message })
  // 希望在异常函数处理中将所有错误都处理完毕 不再进如catch 终止错误
  return new Promise(function () {}) // 终止当前的错误
  // return Promise.reject(error)
})

// export default axios  第一种方法
// 第二种方法
export default {
  install (Vue) {
    Vue.prototype.$axios = axios// 将axios共享给所有实例
  }
}
