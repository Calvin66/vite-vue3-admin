<!--
 * @Author: Calvin
 * @Date: 2021-12-05 23:52:14
 * @FilePath: /src/layout/index.vue
 * @Description: 侧边栏主视图
-->
<template>
  <div class="layout-container" :class="{ collapse: !isCollapse }">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
export default {
  name: 'Home',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  setup() {
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    return {
      isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    width: 210px !important;
    height: 100%;
    font-size: 0;
    background-color: #2f3447;
    transition: width 0.28s;
  }

  .main-container {
    position: relative;
    margin-left: 210px;
    min-height: 100%;
    transition: margin-left 0.28s;
  }

  &.collapse {
    .sidebar-container {
      width: 54px !important;
    }

    .main-container {
      margin-left: 54px !important;
    }
  }
}
</style>
