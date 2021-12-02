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
      const { name, role, token } = user
      state.username = name
      state.role = role
      localstorageSet('username', name)
      localstorageSet('role', role)
      state.token = token
      setToken(token)
    }
  },
  actions: {},
  getters: {}
}
