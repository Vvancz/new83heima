// 实现整体组件的统一注册
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import coverImg from './publish/cover-img.vue'

import selectImg from './publish/select-image.vue'

export default {
  install (Vue) {
    // 调用install方法 传入了vue对象
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册 头部组件
    Vue.component('bread-crumb', breadCrumb)// 注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('cover-img', coverImg) // 全局注册富文本编辑器
    Vue.component('select-img', selectImg) // 全局注册富文本编辑器
  }

}
// 先注册组件 再实例化
