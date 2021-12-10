/*
 * @Author: Calvin
 * @Date: 2021-12-10 12:38:25
 * @FilePath: \src\directives\index.js
 * @Description:自定义指令集合
 */
import permission from './permission'
export default function (app) {
  app.directive('permission', permission)
}
