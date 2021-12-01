import request from '@/utils/request'

export function login(username, password) {
  return request(
    {
      url: '/mock/login.json',
      method: 'get',
      data: {}
    },
    { loading: true }
  )
}
export function getPermissionList() {
  return request({
    url: '/mock/permission.json',
    method: 'get',
    data: {}
  })
}
