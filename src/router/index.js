/*
 * @Author: Calvin
 * @Date: 2021-12-06 09:09:23
 * @FilePath: \src\router\index.js
 * @Description:注册基础路由
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login/index.vue')
    }
  ]
})
export default router
