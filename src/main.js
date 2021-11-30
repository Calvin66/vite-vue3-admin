import { createApp } from 'vue'
import { elcomponents } from './element.js'
import App from './App.vue'
import router from './router/index'
const app = createApp(App)
app.config.globalProperties.$ELEMENT = {
  // options
}
app.use(router)
for (const component of elcomponents) {
  app.component(component.name, component)
}
app.mount('#app')
