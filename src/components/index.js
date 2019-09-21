// 实现整体组件的统一注册
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'

export default {
  install (Vue) {
    // 调用install方法 传入了vue对象
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册 头部组件
    Vue.component('bread-crumb', breadCrumb)// 注册面包屑组件
  }

}
// 先注册组件 再实例化
