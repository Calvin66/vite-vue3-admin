/*
 * @Author: Calvin
 * @Date: 2021-12-06 20:34:43
 * @FilePath: \src\api\permission.js
 * @Description:权限相关接口
 */
import request from '@/utils/request'

export function getPermissionMenus() {
  return request(
    {
      url: '/mock/user/permissionMenu',
      method: 'get',
      params: {}
    },
    { loading: true }
  )
}
