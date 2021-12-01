import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-loading.css'

import { createApp } from 'vue'

import App from './App.vue'
import { elcomponents } from './element.js'
import router from './router/index'
import store from './store'
const app = createApp(App)
app.config.globalProperties.$ELEMENT = {
  // options
}
app.use(router)
app.use(store)
for (const component of elcomponents) {
  app.component(component.name, component)
}
app.mount('#app')
