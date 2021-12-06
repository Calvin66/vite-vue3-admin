/*
 * @Author: Calvin
 * @Date: 2021-12-03 22:15:33
 * @FilePath: /src/store/index.js
 * @Description:
 */
import { createLogger, createStore } from 'vuex'

import app from './modules/app'
import permission from './modules/permission'
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
    user,
    permission
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
