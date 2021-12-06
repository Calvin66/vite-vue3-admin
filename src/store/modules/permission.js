/*
 * @Author: Calvin
 * @Date: 2021-12-06 20:17:20
 * @FilePath: /src/store/modules/permission.js
 * @Description:处理权限路由数据
 */

import { getPermissionMenus } from '@/api/permission'
import router, { dynamicRouters, staticRouters } from '@/router/index'
import store from '@/store'
import { recurseRouter, setDefaultRoute } from '@/utils/recurseRouter'
export default {
  namespaced: true,
  state: {
    permissionList: [],
    sidebarMenu: []
  },
  getters: {},
  mutations: {
    setMenu(state, menu) {
      state.sidebarMenu = menu
    },
    setPermissionList: (state, routes) => {
      state.permissionList = routes
    }
  },
  actions: {
    // 获表
    getPermissionList({ commit }) {
      const role = store.state.user.role
      return new Promise((resolve, reject) => {
        getPermissionMenus(role)
          .then((res) => {
            const permissionList = res.list
            const routes = recurseRouter(permissionList, dynamicRouters)
            const MainContainer = staticRouters.find(
              (item) => item.path === '/'
            )
            // 初始化children路由
            const children = MainContainer.children
            children.push(...routes)
            commit('setMenu', children)
            console.log(children, '打印children')
            setDefaultRoute([MainContainer])
            // Vue Router 4.x已经弃用 addRoutes
            // staticRouters.forEach((route) => {
            //   router.addRoute(route)
            // })
            router.addRoute(...staticRouters)
            commit('setPermissionList', [...staticRouters])
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
