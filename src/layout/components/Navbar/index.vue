<!--
 * @Author: Calvin
 * @Date: 2021-12-06 19:57:10
 * @FilePath: /src/layout/components/Navbar/index.vue
 * @Description: 
-->
<template>
  <div class="navbar-container">
    <Collapse></Collapse>
    <MenuBar v-if="showFirstMenu"></MenuBar>
    <Breadcrumb v-if="showBreadcrumb"></Breadcrumb>
    <div class="flex1"></div>
    <UserBar></UserBar>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import Breadcrumb from './components/Breadcrumb.vue'
import Collapse from './components/Collapse.vue'
import MenuBar from './components/MenuBar.vue'
import UserBar from './components/UserBar.vue'
export default {
  name: 'Navbar',
  components: {
    Collapse,
    Breadcrumb,
    MenuBar,
    UserBar
  },
  setup() {
    const store = useStore()
    // 是否展示一级菜单
    const showFirstMenu = computed(() => store.state.app.showFirstMenu)
    const showBreadcrumb = computed(() => store.state.app.showBreadcrumb)
    return {
      showFirstMenu,
      showBreadcrumb
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-container {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .flex1 {
    flex: 1;
  }
}
</style>
