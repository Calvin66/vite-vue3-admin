export default {
  namespaced: true,
  state: {
    isCollapse: true
  },
  mutations: {
    setCollapse(state, value) {
      state.isCollapse = value
    }
  },
  actions: {},
  getters: {}
}
