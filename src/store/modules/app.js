/*
 * @Author: Calvin
 * @Date: 2021-12-09 09:15:38
 * @FilePath: \src\store\modules\app.js
 * @Description:
 */
export default {
  namespaced: true,
  state: {
    isCollapse: true,
    showFirstMenu: false
  },
  mutations: {
    setCollapse(state, value) {
      state.isCollapse = value
    },
    setFirstMenu(state, value) {
      state.showFirstMenu = value
    }
  },
  actions: {},
  getters: {}
}
