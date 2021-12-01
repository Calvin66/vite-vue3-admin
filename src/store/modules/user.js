import {
  getToken,
  localstorageGet,
  localstorageSet,
  setToken
} from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    username: localstorageGet('username') || '',
    role: localstorageGet('role') || '',
    token: getToken() || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUer(state, user) {
      const { username, role, token } = user
      state.username = username
      state.role = role
      localstorageSet('username', username)
      localstorageSet('role', role)
      state.token = token
      setToken(token)
    }
  },
  actions: {},
  getters: {}
}
