import vue from '@vitejs/plugin-vue'
import path from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { svgBuilder } from './src/utils/svgBuilder'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    svgBuilder('./src/assets/icons/svg/') // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
  ],
  server: {
    proxy: {
      '/mock': {
        target:
          'https://mock.mengxuegu.com/mock/61a74227c6b34465f53db943/vite',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, '')
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})
