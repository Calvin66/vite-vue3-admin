import { createStore } from 'vuex'

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
export default createStore({ user })
