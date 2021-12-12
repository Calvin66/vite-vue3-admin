/*
 * @Author: Calvin
 * @Date: 2021-12-06 21:25:11
 * @FilePath: /src/utils/recurseRoutes.js
 * @Description:动态路由处理函数
 */

/**
 * 递归处理路由，找出当前登录用户权限下的路由
 * @param {Array} userRouter 后台返回的用户权限json
 * @param {Array} allRouter 前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recurseRoutes(userRouter = [], allRouter = []) {
  const realRoutes = []
  allRouter.forEach((allRoute) => {
    userRouter.forEach((userRoute) => {
      if (userRoute.path === allRoute.path) {
        if (userRoute.children && userRoute.children.length > 0) {
          allRoute.children = recurseRoutes(
            userRoute.children,
            allRoute.children
          )
        } else {
          allRoute.children = []
        }
        realRoutes.push(allRoute)
      }
    })
  })
  return realRoutes
}

/**
 * 递归为所有子路由的路由设置第一个children.path为默认路由
 * @param {Array} routes 用户过滤后的路由
 */
export function setDefaultRoute(routes = []) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.redirect = { path: route.children[0].path }
      setDefaultRoute(route.children)
    }
  })
}
/**
 * 获取当前路由的第一个路由path
 * @param {Array} route 路由对象
 */
let path = ''
export const recurseFirstMenu = (route) => {
  if (route.children && route.children.length) {
    recurseFirstMenu(route.children[0])
  } else {
    path = route.path
  }
  return path
}
