<!--
 * @Author: Calvin
 * @Date: 2021-12-07 21:38:11
 * @FilePath: /src/layout/components/Navbar/components/MenuBar.vue
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
import { computed } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'MenuBar',
  setup() {
    let activeMenu = ref('0')
    const store = useStore()
    const menuList = computed(() => {
      return store.state.permission.sidebarMenu
    })
    const onSelect = (index) => {
      // store.dispatch('permission/changeSidebarMenu', index)
    }
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
  margin-right: 10px;

  .el-menu {
    overflow: hidden;
    border-bottom: 0;
    height: 50px;
    background: transparent;

    .el-menu-item {
      display: flex;
      align-items: center;
      border-bottom: 0;
      padding: 0 20px;
      height: 50px;
      background: transparent;

      span {
        margin-left: 3px;
        line-height: normal;
      }

      &.is-active {
        color: #4165d7;
      }
    }
  }
}
</style>
