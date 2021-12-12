/*
 * @Author: Calvin
 * @Date: 2021-12-05 22:13:51
 * @FilePath: /vite.config.js
 * @Description:
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
import { defineConfig } from 'vite'

import { svgBuilder } from './src/utils/svgBuilder'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus({
      useSource: true
    }),
    svgBuilder('./src/assets/icons/svg/') // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
  ],
  server: {
    proxy: {
      '/mock': {
        target: 'https://mock.mengxuegu.com/mock/61a74227c6b34465f53db943/vite',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, '')
      }
    }
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },

  /**
   * 按需加载，修改主题色
   * 参考:https://element-plus.gitee.io/zh-CN/guide/theming.html
   */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/assets/styles/element-variables.scss" as *;`
      }
    }
  }
})
