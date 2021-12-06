/*
 * @Author: Calvin
 * @Date: 2021-12-06 09:09:23
 * @FilePath: /src/router/index.js
 * @Description:
 */

import { createRouter, createWebHashHistory } from 'vue-router'

// import Layout from '@/layout/index.vue'
import { dynamicRoutes } from './dynamicRouter/index'
import { staticRoutes } from './staticRouter/index'

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
export const dynamicRouters = dynamicRoutes
export const staticRouters = staticRoutes
export default router
