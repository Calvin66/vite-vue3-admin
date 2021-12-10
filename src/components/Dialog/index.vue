<!--
 * @Author: Calvin
 * @Date: 2021-12-10 14:18:35
 * @FilePath: \src\components\Dialog\index.vue
 * @Description: 公共弹窗
-->
<template>
  <el-dialog :model-value="visible" @close="handleClose">
    <template #title>提示</template>
    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'rsh-dialog',
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: '对话框'
    },
    // 高度
    height: String,
    // 宽度
    width: {
      type: String,
      default: '50%'
    },
    // 是否缓存
    keepAlive: Boolean,
    // 是否拖动
    drag: {
      type: Boolean,
      default: true
    },
    // el-dialog 参数
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // el-dialog 事件
    on: {
      type: Object,
      default: () => {
        return {}
      }
    },
    controls: {
      type: Array,
      default: () => ['fullscreen', 'close']
    },
    hiddenControls: {
      type: Boolean,
      default: false
    },
    hiddenHeader: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const dialogVisible = ref(true)
    const handleClose = () => {
      emit('update:visible', false)
    }
    return {
      dialogVisible,
      handleClose
    }
  }
}
</script>
