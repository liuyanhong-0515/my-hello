import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import UserList from '@/views/User'
import GoodsList from '@/views/Goods'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login }, // 展示到App.Vue 的 router-view
    {
      path: '/',
      component: Layout,
      children: [  // 嵌套路由
        // 展示/home的时候，先展示父路由视图，
        { path: '', component: Home }, //请求父路由路径的时候，默认渲染path为空的子路由
        { path: '/users', component: UserList },
        { path: '/goods', component: GoodsList },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 1
  window.console.log('1.路由')
  // 我们可以在这里定制路由导航的
  // 如果路由路径是/login，则允许通过
  if (to.path !== '/login') {
    // return next()
    // 否则校验登录状态
    const token = getToken()
    // 如果没有登录，就跳转到登录页
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }

  // 如果有 token ，则校验token的有效性
  // token 是服务器签发生

  // 如果登录成功
  next()
})
export default router
