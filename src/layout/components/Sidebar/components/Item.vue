<template>
  <!-- ele 自带svg图标 -->
  <el-icon v-if="meta.icon" class="el-svg-icon">
    <component :is="ElSvg[meta.icon]" />
  </el-icon>

  <!-- 自定义svg图标 -->
  <svg-icon
    v-else-if="meta.svgIcon"
    :icon-class="meta.svgIcon"
    className="el-svg-icon nav-icon"
  />
</template>
<script>
import * as ElSvg from '@element-plus/icons'
export default {
  name: 'Item',
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          icon: '',
          svgIcon: ''
        }
      }
    }
  },
  setup() {
    return {
      ElSvg
    }
  }
}
</script>
<style scoped lang="scss">
.el-svg-icon {
  margin-left: -2px; //el-svg-icon has some margin
  width: 1em;
  height: 1em;
  font-size: 20px !important;
  text-align: left !important;
}

.nav-icon {
  margin-right: 5px;
  vertical-align: middle;
}
</style>
