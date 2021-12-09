<!--
 * @Author: Calvin
 * @Date: 2021-12-07 21:38:11
 * @FilePath: \src\layout\components\Navbar\components\MenuBar.vue
 * @Description: 顶部菜单栏
-->
<template>
  <div class="menu-bar-container">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      background-color="transparent"
      @select="onSelect"
    >
      <el-menu-item
        v-for="(route, index) in menuList"
        :index="`${index}`"
        :key="index"
      >
        <span>{{ route.meta.title || '' }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { compile } from 'path-to-regexp'
import { computed, getCurrentInstance, onMounted } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'

import { recurseFirstMenu } from '@/utils/recurseRoutes'
export default {
  name: 'MenuBar',
  setup() {
    let activeMenu = ref('0')
    const store = useStore()
    let { proxy } = getCurrentInstance()
    const menuList = computed(() => {
      return store.state.permission.defaultMenu
    })
    // 获取当前路由顶级路由
    const getBreadcrumb = () => {
      let matched = proxy.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const list = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
      const path = list[0].path
      menuList.value.forEach((item, key) => {
        if (item.path === path) {
          activeMenu.value = key.toString()
          onSelect(key)
        }
      })
    }
    const pathCompile = (path) => {
      const { params } = proxy.$route
      const toPath = compile(path)
      return toPath(params)
    }
    const onSelect = (index) => {
      store.dispatch('permission/changeSidebarMenu', index)
      // 获取第一个菜单地址
      const list = menuList.value[index]
      const path = recurseFirstMenu(list)
      proxy.$router.push(pathCompile(path))
    }
    onMounted(() => {
      getBreadcrumb()
    })
    return {
      activeMenu,
      menuList,
      onSelect
    }
  }
}
</script>
<style lang="scss">
.menu-bar-container {
  margin: 0 10px;

  .el-menu {
    overflow: hidden;
    border-bottom: 0;
    height: 30px;
    background: transparent;

    .el-menu-item {
      display: flex;
      align-items: center;
      margin: 0 10px;
      border: 1px solid #dcdfe6 !important;
      border-bottom: 0;
      border-radius: 30px;
      padding: 0 10px;
      height: 30px;
      font-size: 13px;
      color: #909399;
      background: transparent;

      &:hover,
      &:focus {
        background-color: transparent !important;
      }

      &:hover {
        border: 1px solid #4165d7;
        color: #4165d7 !important;
      }

      &.is-active {
        border: 1px solid #4165d7 !important;

        &:hover,
        &:focus {
          background-color: transparent !important;
        }
      }

      span {
        margin-left: 3px;
        line-height: normal;
      }
    }
  }
}
</style>
