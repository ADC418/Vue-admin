import Vue from 'vue'
import VueRouter from 'vue-router'


import banner from "@/router/routers/banner"
import active from "@/router/routers/active"
import topic from "@/router/routers/topic"
import user from "@/router/routers/user"
import console from "@/router/routers/console"
import login from "@/router/routers/login"

import Nprogress from "nprogress"
import { auth } from '../api/login'

Vue.use(VueRouter)

//解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: {
      hidden: true
    }
  },
  console,
  banner,
  active,
  topic,
  user,
  login,
]

const router = new VueRouter({
  routes
})

//导航进度条实现 导航守卫-beforeEach()
router.beforeEach(function (to, from, next) {
  Nprogress.start();
  if (to.path != "/login") {
    //判断token是否存在
    if (localStorage.getItem("token")) {
      //验证token
      auth().then(() => {
        next()
      }).catch(() => {
        localStorage.removeItem("token")
      })
    } else {
      next("/login")
    }

  } else {
    next()
  }

})

router.afterEach((to)=> {
   //console.log(to)
  document.title = to.meta.title + ' - 稻香果农'
  Nprogress.done()
 
})

export default router
