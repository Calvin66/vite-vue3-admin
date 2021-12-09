/*
 * @Author: Calvin
 * @Date: 2021-12-06 11:04:28
 * @FilePath: /src/router/dynamicRouter/index.js
 * @Description:动态路由(需要根据后端返回用户权限菜单动态匹配)
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

/**
 * tip
 * children => path需要写全，不然Breadcrumb面包屑点击父级菜单不跳转
 * 新增svg图标后需要重新运行项目后才生效
 */
import Redirect from '@/components/Redirect/index.vue'
export const dynamicRoutes = [
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
    name: 'Home',
    meta: { title: '首页', svgIcon: 'icon-home' }
  },
  {
    path: '/systemManage',
    component: () => import('@/views/SystemManage/index.vue'),
    name: 'SystemManage',
    meta: { title: '系统管理', svgIcon: 'icon-system' }
  },
  {
    path: '/permissionManage',
    component: () => import('@/views/PermissionManage/index.vue'),
    name: 'PermissionManage',
    meta: { title: '权限管理', svgIcon: 'icon-permission' }
  },
  {
    path: '/userManage',
    component: () => import('@/views/UserManage/index.vue'),
    name: 'UserManage',
    meta: { title: '用户管理', svgIcon: 'icon-user' }
  },
  {
    path: '/menuManage',
    component: Redirect,
    name: 'MenuManage',
    meta: { title: '菜单管理', svgIcon: 'icon-menu' },
    children: [
      {
        path: '/menuManage/menu1',
        name: 'MenuManageMenu1',
        component: () => import('@/views/MenuManage/Menu1/index.vue'),
        meta: { title: '菜单1-1' }
      },
      {
        path: '/menuManage/menu2',
        component: Redirect,
        meta: { title: '次级菜单' },
        children: [
          {
            path: '/menuManage/menu2/menu1',
            name: 'MenuManageMenu2Menu1',
            component: () => import('@/views/MenuManage/Menu2/Menu1/index.vue'),
            meta: { title: '菜单2-1' }
          }
        ]
      }
    ]
  }
]
