import { createLogger, createStore } from 'vuex'

import app from './modules/app'
import user from './modules/user'
// const modulesFiles = require.context(
//   './modules',
//   true,
//   /\.js$/
// )

// const modules = modulesFiles
//   .keys()
//   .reduce((modules, modulePath) => {
//     const moduleName = modulePath.replace(
//       /^\.\/(.*)\.\w+$/,
//       '$1'
//     )
//     const value = modulesFiles(modulePath)
//     modules[moduleName] = value.default
//     return modules
//   }, {})
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    app,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
