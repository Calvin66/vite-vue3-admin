import { createApp } from 'vue'
import { elcomponents } from './element.js'
import App from './App.vue'

createApp(App).mount('#app')
app.config.globalProperties.$ELEMENT = {
  // options
}
for (const component of elcomponents) {
  app.component(component.name, component)
}
