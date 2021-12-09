<!--
 * @Author: Calvin
 * @Date: 2021-12-05 23:52:14
 * @FilePath: /src/layout/components/Sidebar/index.vue
 * @Description: 侧边栏组件
-->
<template>
  <div class="sidebar-menu-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        background-color="#2f3447"
        text-color="#bfcbd9"
        :unique-opened="true"
        active-text-color="#4165d7"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in sidebarMenu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import SidebarItem from './components/SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: { SidebarItem },
  setup() {
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, fullPath } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return fullPath
    })
    const sidebarMenu = computed(() => {
      return store.state.permission.sidebarMenu
    })
    return {
      activeMenu,
      sidebarMenu,
      isCollapse
    }
  }
}
</script>

<style lang="scss">
.sidebar-menu-container {
  .el-menu {
    border: none;
    width: 100% !important;
    height: 100%;

    .is-active > .el-sub-menu__title {
      color: #ffffff !important;
    }
  }
  //el-menu折叠时，导航文字不隐藏问题
  .el-menu--collapse {
    .el-sub-menu {
      & > .el-sub-menu__title {
        padding: 0;

        & > span {
          display: inline-block;
          overflow: hidden;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }
}
</style>
