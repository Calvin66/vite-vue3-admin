/*
 * @Author: Calvin
 * @Date: 2021-12-05 22:09:20
 * @FilePath: /src/main.js
 * @Description:
 */

import './permission' // 权限菜单控制
import '@/assets/styles/index.scss'

import { createApp } from 'vue'

import SvgIcon from '@/components/SvgIcon/index.vue'

import App from './App.vue'
import { elcomponents } from './element.js'
import router from './router/index'
import store from './store'
const app = createApp(App)

app.config.globalProperties.$ELEMENT = {
  // options
  size: 'small'
}
for (const component of elcomponents) {
  app.component(component.name, component)
}

app.component('svg-icon', SvgIcon).use(store).use(router).mount('#app')
