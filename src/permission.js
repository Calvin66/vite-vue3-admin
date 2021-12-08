/*
 * @Author: Calvin
 * @Date: 2021-12-06 16:41:28
 * @Description: 路由权限控制
 */
import router from '@/router/index'
import store from '@/store'
import { getToken } from '@/utils/auth'
const whiteList = ['/login'] // 路由白名单

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (!store.state.permission.permissionList.length) {
      // 踩坑：直接使用store.dispatch回调会报错，导致路由跳转出问题，需要使用await同步请求
      const result = await store.dispatch('permission/getPermissionList')
      if (result) {
        next({ ...to, replace: true })
      } else {
        console.log('获取权限失败')
      }
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})
