import 'element-plus/dist/index.css'

import { createApp } from 'vue'

import SvgIcon from '@/components/SvgIcon/index.vue'

import App from './App.vue'
import { elcomponents } from './element.js'
import router from './router/index'
import store from './store'
const app = createApp(App)

app.config.globalProperties.$ELEMENT = {
  // options
}
for (const component of elcomponents) {
  app.component(component.name, component)
}

app.component('svg-icon', SvgIcon).use(store).use(router).mount('#app')
