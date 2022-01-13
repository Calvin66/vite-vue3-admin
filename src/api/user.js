import request from '@/utils/request'

export function login(data) {
  return request(
    {
      url: '/user/login',
      method: 'post',
      data
    },
    { loading: true }
  )
}
export function loginout(data) {
  return request(
    {
      url: '/user/loginout',
      method: 'post',
      data
    },
    { loading: true }
  )
}
