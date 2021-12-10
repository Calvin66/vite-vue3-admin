<!--
 * @Author: Calvin
 * @Date: 2021-12-09 12:33:20
 * @FilePath: \src\layout\components\Navbar\components\Setting.vue
 * @Description: 功能设置抽屉
-->
<template>
  <div>
    <el-drawer
      ref="drawer"
      v-model="drawerVisible"
      title="系统设置"
      direction="rtl"
      custom-class="setting-drawer-container"
      @close="handleClose"
    >
      <div class="drawer-item">
        <span>显示一级菜单</span>
        <el-switch v-model="showFirstMenu" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示路由导航栏</span>
        <el-switch v-model="showBreadcrumb" class="drawer-switch" />
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Setting',
  props: {
    settingVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const store = useStore()
    let drawerVisible = ref(props.settingVisible)
    watch(
      () => props.settingVisible,
      (val) => {
        //查看父组件传过来的值是否变化，从而修改值
        drawerVisible.value = val
      }
    )
    const showFirstMenu = computed({
      get() {
        return Boolean(store.state.app.showFirstMenu)
      },
      set(val) {
        store.commit('app/setFirstMenu', val)
        store.commit('permission/setNormalMenu')
      }
    })
    const showBreadcrumb = computed({
      get() {
        return Boolean(store.state.app.showBreadcrumb)
      },
      set(val) {
        store.commit('app/setBreadcrumb', val)
      }
    })
    const handleClose = () => {
      context.emit('update:settingVisible', false)
    }
    onMounted(() => {
      if (!showFirstMenu.value) {
        store.commit('permission/setNormalMenu')
      }
    })
    return {
      drawerVisible,
      showFirstMenu,
      showBreadcrumb,
      handleClose
    }
  }
}
</script>
<style lang="scss">
.setting-drawer-container {
  width: 300px !important;

  .drawer-item {
    padding: 12px 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }

  .drawer-switch {
    float: right;
  }
}
</style>
