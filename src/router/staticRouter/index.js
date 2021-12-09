/*
 * @Author: Calvin
 * @Date: 2021-12-06 11:05:26
 * @FilePath: /src/router/staticRouter/index.js
 * @Description:静态路由(不需要根据后端权限控制的路由)
 */

/**
 *  路由配置
 *hidden: true;                   (默认 false) 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 *
 *name: 'router-name';            设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 *alwaysShow：true:               如果设置为true，将始终显示根菜单
 *meta: {
 * title: 'title';                设置该路由在侧边栏和面包屑中展示的名字
 * svgIcon: 'svg-name';           使用自定义svg图标
 * icon: 'el-svg-name';           使用ele自带svg图标
 * breadcrumb: false              如果设置为false，则不会在breadcrumb面包屑中显示,
 * activeMenu: '/example/list'    如果设置了路径，侧边栏将突出显示您设置的路径
 * }
 */
import Layout from '@/layout/index.vue'
export const staticRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: []
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/ErrorPage/404.vue')
  },

  /**
   * tip:
   * { path: '*', redirect: '/404', hidden: true } 不生效
   * using pathMatch install of "*" in vue-router 4.0
   */
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]
