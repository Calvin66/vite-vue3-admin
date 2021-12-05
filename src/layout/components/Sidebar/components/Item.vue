<template>
  <!-- ele 自带svg图标 -->
  <el-icon v-if="meta.icon" class="el-svg-icon nav-icon">
    <component :is="ElSvg[meta.icon]" />
  </el-icon>

  <!-- 自定义svg图标 -->
  <svg-icon
    v-else-if="meta.elSvgIcon"
    :icon-class="meta.elSvgIcon"
    className="nav-icon"
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
          elSvgIcon: ''
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
  position: relative;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -2px;
}

.nav-icon {
  position: relative;
  display: inline-block;
  margin-right: 12px;
  font-size: 15px;
}
</style>
