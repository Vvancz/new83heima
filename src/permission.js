// 权限

import router from './router'

import nprogress from 'nprogress' // 引入模块
import 'nprogress/nprogress.css' // 引入CSS
// 全局的前置守卫
router.beforeEach(function (to, from, next) {
  nprogress.start()
  // 必须执行next  不然就死在这了
  // 首先要判断拦截的范围 不拦截login 要拦截home和它的二级路由页面
  if (to.path.startsWith('/home')) {
    // 进入了拦截范围
    // 判断是否登录 如果有token就放行
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 全局的后置守卫
router.afterEach(function () {
  // 关闭进度条
  nprogress.done()
})
// 先导出
export default router
