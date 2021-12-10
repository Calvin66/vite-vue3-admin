<!--
 * @Author: Calvin
 * @Date: 2021-12-03 22:15:33
 * @FilePath: \src\views\Home\index.vue
 * @Description: 
-->
<template>
  <div class="home-container">
    <el-button v-permission="'home/button'" type="primary" @click="showDialog">
      按钮
    </el-button>
  </div>
  <rsh-dialog v-model:visible="visible"></rsh-dialog>
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
    return {
      visible,
      showDialog
    }
  }
}
</script>

<style lang="scss" scoped></style>
