<!--
 * @Descripttion: svg组件
 * @version: 
 * @Author: Calvin
 * @Date: 2021-12-02 20:34:23
 * example:
 <svg-icon
    icon-class="icon-activity"
    class-name="red-icon"
  ></svg-icon>
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return {
      iconName: computed(() => `#icon-${props.iconClass}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`
        }
        return 'svg-icon'
      })
    }
  }
}
</script>

<style scope lang="scss">
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
