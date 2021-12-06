/*
 * @Author: Calvin
 * @Date: 2021-12-06 16:41:28
 * @FilePath: /src/permission.js
 * @Description: 路由权限控制
 */
import router from '@/router/index'
import store from '@/store'
import { getToken } from '@/utils/auth'
const whiteList = ['/login'] // 路由白名单

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断是否获取权限菜单列表
      if (!store.state.permission.permissionList.length) {
        store
          .dispatch('permission/getPermissionList')
          .then(() => {
            next({ ...to, replace: true })
          })
          .catch(() => {
            console.log('获取权限失败')
          })
      } else {
        if (to.path !== '/login') {
          next()
        } else {
          next(from.fullPath)
        }
      }
    }
  } else {
    // 路由白名单
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
  // if (!hasToken) {
  //   if (
  //     to.matched.length > 0 &&
  //     !to.matched.some((record) => record.meta && record.meta.required)
  //   ) {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // } else {
  //   // 这里是为了防止重复获取权限列表
  //   if (!store.state.permission.permissionList.length) {
  //     store
  //       .dispatch('permission/getPermissionList')
  //       .then(() => {
  //         console.log('获取菜单成功了')
  //         console.log(to)
  //         next({ ...to, replace: true })
  //       })
  //       .catch(() => {
  //         console.log('获取权限失败')
  //       })
  //   } else {
  //     if (to.path !== '/login') {
  //       next()
  //     } else {
  //       next(from.fullPath)
  //     }
  //   }
  // }
})
