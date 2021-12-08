<!--
 * @Author: Calvin
 * @Date: 2021-12-08 23:35:46
 * @FilePath: /src/layout/components/Navbar/components/UserBar.vue
 * @Description: 用户信息
-->
<template>
  <div class="user-bar-container">
    <el-dropdown trigger="click" :hide-on-click="false" @command="onCommand">
      <span class="el-dropdown-link">
        <span class="name">{{ username }}</span>
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="my">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'UserBar',
  setup() {
    const store = useStore()
    const username = computed(() => store.state.user.username)
    const onCommand = (name) => {}
    return {
      username,
      onCommand
    }
  }
}
</script>
<style lang="scss" scoped>
.user-bar-container {
  cursor: pointer;
  margin-right: 10px;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }

  .name {
    margin-right: 15px;
    white-space: nowrap;
  }
}
</style>
