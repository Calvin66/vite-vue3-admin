import request from '@/utils/request'

export function login(data) {
  return request(
    {
      url: '/mock/user/login',
      method: 'post',
      data
    },
    { loading: true }
  )
}
export function loginout(data) {
  return request(
    {
      url: '/mock/user/loginout',
      method: 'post',
      data
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
