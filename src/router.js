import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index.vue'// 路由级组件
import Home from './views/home/'
import Login from './views/login/index.vue'
import Main from '../src/views/home/main.vue'

// import comment from './views/comment/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '', component: Main },
        // 评论列表路径 1.完整写法/home/comment 2.comment
        // component 按需加载
        { path: 'comment', component: () => import('./views/comment/index.vue') },
        { path: 'material', component: () => import('./views/material/index.vue') },
        { path: 'articles', component: () => import('./views/articles/index.vue') },
        // 修改文章
        { path: 'publish/:articleId', component: () => import('./views/publish/index.vue') },
        // 再写一个路由 发布文章不能匹配动态路由
        { path: 'publish', component: () => import('./views/publish/index.vue') },
        // 账户信息
        { path: 'account', component: () => import('./views/account/index.vue') },
        { path: 'gradata', component: () => import('./views/fans/index.vue') }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
