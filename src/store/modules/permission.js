/*
 * @Author: Calvin
 * @Date: 2021-12-06 20:17:20
 * @FilePath: \src\store\modules\permission.js
 * @Description:处理权限路由数据
 */

import { getPermissionMenus } from '@/api/permission'
import { dynamicRoutes } from '@/router/dynamicRouter/index'
import router from '@/router/index'
import { staticRoutes } from '@/router/staticRouter/index'
import { recurseRoutes, setDefaultRoute } from '@/utils/recurseRoutes'
export default {
  namespaced: true,
  state: {
    permissionList: [], //菜单权限
    btnPermissionList: [], //按钮权限
    sidebarMenu: [],
    defaultMenu: []
  },
  getters: {},
  mutations: {
    setMenu(state, menu) {
      state.sidebarMenu = menu
    },
    //保存初始菜单
    setDefaultMenu(state, menu) {
      state.defaultMenu = menu
    },
    setNormalMenu(state) {
      state.sidebarMenu = state.defaultMenu
    },
    setPermissionList: (state, routes) => {
      state.permissionList = routes
    },
    setBtnPermissionList(state, value) {
      state.btnPermissionList = value
    }
  },
  actions: {
    // 获取权限菜单
    getPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        getPermissionMenus()
          .then((res) => {
            const permissionList = res.list
            // 保存权限按钮数据
            const btnPermissionList = res.buttonList || []
            commit('setBtnPermissionList', btnPermissionList)
            /* 根据权限刷选出我们设置好的路由并加入到 path='/' 的children */
            const routes = recurseRoutes(permissionList, dynamicRoutes)

            // 开放本地菜单权限
            // const routes = dynamicRoutes
            const MainContainer = staticRoutes.find((item) => item.path === '/')
            // 初始化children路由
            const children = MainContainer.children
            // 将当前用户的权限路由添加到动态路由中
            children.push(...routes)
            //递归为所有子路由的路由设置第一个children.path为默认路由
            setDefaultRoute([MainContainer])
            // 保存菜单
            commit('setMenu', children)
            commit('setDefaultMenu', children)

            // Vue Router 4.x已经弃用 addRoutes
            staticRoutes.forEach((route) => {
              router.addRoute(route)
            })
            // 保存权限路由
            commit('setPermissionList', [...staticRoutes])
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //修改侧边栏菜单
    changeSidebarMenu({ commit, state }, index) {
      let menu = state.defaultMenu[index]
      commit('setMenu', [menu])
    }
  }
}
