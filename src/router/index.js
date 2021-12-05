import { createRouter, createWebHashHistory } from 'vue-router'

/**
 *
 *hidden: true;                   (默认 false) 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 *
 *name: 'router-name';            设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 *alwaysShow：true:               如果设置为true，将始终显示根菜单
 *meta: {
 * title: 'title';                设置该路由在侧边栏和面包屑中展示的名字
 * svgIcon: 'svg-name';         使用自定义svg图标
 * icon: 'el-svg-name';           使用ele自带svg图标
 * breadcrumb: false              如果设置为false，则不会在breadcrumb面包屑中显示,
 * activeMenu: '/example/list'    如果设置了路径，侧边栏将突出显示您设置的路径
 * }
 */
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
          meta: { title: '首页', svgIcon: 'icon-activity' }
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
        icon: 'Apple'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/Demo.vue'), // Parent router-view
          name: 'DemoIndex',
          meta: { title: '测试页面', icon: 'Apple' }
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
        icon: 'Calendar'
      },
      children: [
        {
          path: 'menu1',
          component: () => import('@/views/Menu/Menu1/index.vue'), // Parent router-view
          name: 'Menu1',
          meta: { title: 'Menu1', icon: 'Calendar' }
        },
        {
          path: 'menu2',
          component: () => import('@/views/Menu/Menu2/index.vue'), // Parent router-view
          name: 'Menu2',
          meta: { title: 'Menu2', icon: 'Calendar' }
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
