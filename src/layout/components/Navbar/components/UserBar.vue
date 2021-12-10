<!--
 * @Author: Calvin
 * @Date: 2021-12-08 23:35:46
 * @FilePath: \src\layout\components\Navbar\components\UserBar.vue
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
          <el-dropdown-item command="setting">布局设置</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Setting v-model:settingVisible="settingVisible"></Setting>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { loginout } from '@/api/user'

import Setting from './Setting.vue'
export default {
  name: 'UserBar',
  components: {
    Setting
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const settingVisible = ref(false)
    const username = computed(() => store.state.user.userInfo.username)
    const onCommand = (name) => {
      switch (name) {
        case 'my':
          break
        case 'setting':
          settingVisible.value = true
          break
        case 'exit':
          loginoutAction()
          break
      }
    }
    const loginoutAction = () => {
      loginout({}).then((res) => {
        if (res.isSuccess) {
          store.dispatch('user/loginout').then(() => {
            router.push('/login')
            //此处reload清空路由和重置部分状态
            location.reload()
          })
        }
      })
    }
    return {
      username,
      onCommand,
      settingVisible,
      loginoutAction
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
