import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/Home/index.vue'),
          name: 'home',
          meta: { title: '首页', icon: 'icon-activity' }
        }
      ]
    },
    {
      path: '/demo',
      component: Layout,
      redirect: '/demo/index',
      name: 'Demo',
      meta: {
        title: '测试',
        icon: 'icon-activity'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/Demo.vue'), // Parent router-view
          name: 'DemoIndex',
          meta: { title: '测试页面', icon: 'icon-activity' }
        }
      ]
    },
    {
      path: '/menu',
      component: Layout,
      redirect: '/menu/menu1',
      name: 'Menu',
      meta: {
        title: 'Menu',
        icon: 'icon-activity'
      },
      children: [
        {
          path: 'menu1',
          component: () => import('@/views/Menu/Menu1/index.vue'), // Parent router-view
          name: 'Menu1',
          meta: { title: 'Menu1', icon: 'icon-activity' }
        },
        {
          path: 'menu2',
          component: () => import('@/views/Menu/Menu2/index.vue'), // Parent router-view
          name: 'Menu2',
          meta: { title: 'Menu2', icon: 'icon-activity' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login/index.vue')
    }
  ]
})
export default router
