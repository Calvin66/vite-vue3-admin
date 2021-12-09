/*
 * @Author: Calvin
 * @Date: 2021-12-09 09:15:38
 * @FilePath: /src/store/modules/app.js
 * @Description:
 */
import { localstorageSet, localstorageTypeGet } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    isCollapse: true,
    showFirstMenu: localstorageTypeGet('showFirstMenu', 'boolen') || false,
    showBreadcrumb: localstorageTypeGet('showBreadcrumb', 'boolen') || false
  },
  mutations: {
    setCollapse(state, value) {
      state.isCollapse = value
    },
    setFirstMenu(state, value) {
      state.showFirstMenu = value
      localstorageSet('showFirstMenu', value)
    },
    setBreadcrumb(state, value) {
      state.showBreadcrumb = value
    }
  },
  actions: {},
  getters: {}
}
