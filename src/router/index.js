import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import UserList from '@/views/User'
Vue.use(Router)

export default new Router({
  routes: [
    { path:'/login',component:Login }, // 展示到App.Vue 的 router-view
    {
      path:'/',
      component:Layout,
      children: [  // 嵌套路由
        // 展示/home的时候，先展示父路由视图，
        { path:'',component:Home}, //请求父路由路径的时候，默认渲染path为空的子路由
        { path:'/users',component:UserList}
      ]
    },

  ]
})
