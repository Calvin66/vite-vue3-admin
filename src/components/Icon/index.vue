<!--
 * @Author: Calvin
 * @Date: 2021-12-13 14:54:20
-->
<template>
  <!-- ele 自带svg图标 -->
  <el-icon v-if="name" :size="size" :color="color">
    <component :is="ElSvg[name]" />
  </el-icon>
</template>
<script>
import * as ElSvg from '@element-plus/icons'
export default {
  name: 'rsh-icon',
  props: {
    color: String,
    size: String,
    name: String
  },
  setup() {
    return {
      ElSvg
    }
  }
}
</script>
