import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    // redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: MyOrder }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
// 定义数组，存储需要登录才能访问的路由
const blackList = ['/pay', '/myorder', '/searchlist']
router.beforeEach((to, from, next) => {
  console.log(to, from)
  const token = store.state.user.userInfo.token
  console.log(token)
  // 判断to.path是否在blackList
  if (blackList.includes(to.path)) {
    // 如果在，则判断是否登录
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果不在，则直接放行
    next()
  }
})

export default router
