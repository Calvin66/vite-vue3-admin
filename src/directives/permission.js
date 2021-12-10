/*
 * @Author: Calvin
 * @Date: 2021-12-10 12:38:11
 * @FilePath: \src\directives\permission.js
 * @Description:按钮权限指令
 * demo:
 * <div v-permission="'admin'"></div>
 *
 */
import store from '@/store'
function checkPermission(el, binding) {
  const btnPermissionList = store.state.permission.btnPermissionList
  const value = binding.value
  const hasPermission = btnPermissionList.some((item) => {
    return item == value
  })
  if (!hasPermission) {
    if (!el.parentNode) {
      el.style.display = 'none'
    } else {
      el.parentNode.removeChild(el)
    }
  }
}
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
