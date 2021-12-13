<!--
 * @Author: Calvin
 * @Date: 2021-12-03 22:15:33
 * @FilePath: /src/views/Home/index.vue
 * @Description: 
-->
<template>
  <div class="home-container">
    <el-button v-permission="'home/button'" type="primary" @click="showDialog">
      按钮
    </el-button>
  </div>
  <rsh-dialog v-model:visible="visible" title="弹框">
    <div v-for="i in 1000" :key="i">测试高度</div>

    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary">Confirm</el-button>
      </span>
    </template>
  </rsh-dialog>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  setup() {
    const visible = ref(false)
    const showDialog = () => {
      visible.value = true
    }
    const close = () => {
      console.log('关闭按钮')
    }
    const handleOpen = () => {
      console.log('开启按钮')
    }
    const beforeClose = () => {
      console.log('关闭前操作')
      // visible.value = false
    }
    return {
      visible,
      showDialog,
      close,
      handleOpen,
      beforeClose
    }
  }
}
</script>

<style lang="scss" scoped></style>
