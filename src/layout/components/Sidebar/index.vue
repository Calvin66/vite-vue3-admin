<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
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
import { useRoute, useRouter } from 'vue-router'

import SidebarItem from './SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: { SidebarItem },
  setup() {
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, fullPath } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return fullPath
    })
    const router = useRouter()
    const permissionRoutes = computed(() => {
      return router.options.routes
    })
    return {
      activeMenu,
      permissionRoutes
    }
  }
}
</script>

<style scoped lang="scss"></style>
