/*
 * @Author: Calvin
 * @Date: 2021-12-09 09:15:38
 * @FilePath: \src\store\modules\user.js
 * @Description:
 */
import {
  getToken,
  localstorageGet,
  localstorageRemove,
  localstorageSet,
  removeToken,
  setToken
} from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    userInfo: JSON.parse(localstorageGet('userInfo')) || {
      role: '',
      username: ''
    },
    token: getToken() || ''
  },
  mutations: {
    setUerInfo(state, userInfo) {
      state.userInfo = userInfo
      localstorageSet('userInfo', userInfo)
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    clearUerInfo(state) {
      state.info = {}
      localstorageRemove('userInfo')
    },
    clearToken(state) {
      state.token = ''
      removeToken()
    }
  },
  actions: {
    loginout({ dispatch }) {
      dispatch('userRemove')
    },
    //移除用户信息
    userRemove({ commit }) {
      commit('clearUerInfo')
      commit('clearToken')
    }
  },
  getters: {}
}
