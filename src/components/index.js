/*
 * @Author: Calvin
 * @Date: 2021-12-10 16:04:40
 * @FilePath: \src\components\index.js
 * @Description:注册全局组件
 */
import Dialog from './Dialog/index.vue'
import Icon from './Icon/index.vue'
export default function (app) {
  app.component(Dialog.name, Dialog)
  app.component(Icon.name, Icon)
}
