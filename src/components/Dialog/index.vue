<!--
 * @Author: Calvin
 * @Date: 2021-12-10 14:18:35
 * @FilePath: /src/components/Dialog/index.vue
 * @Description: 公共弹窗
-->
<template>
  <div class="rsh-dialog-container">
    <el-dialog
      :model-value="visible"
      :width="width"
      :top="top"
      :fullscreen="fullscreen"
      :modal="modal"
      :appendToBody="appendToBody"
      :lockScroll="lockScroll"
      :customClass="customClass"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :showClose="showClose"
      :center="center"
      :destroyOnClose="destroyOnClose"
      @open="handleOpen"
      @opened="handleOpend"
      :beforeClose="handleBeforeClose"
      @close="handelClose"
      @closed="handelClosed"
    >
      <template v-if="!hiddenControls" #title>
        <div class="rsh-dialog__header">
          <span class="rsh-dialog__title">{{ title }}</span>
          <div class="rsh-dialog__controls">
            <rsh-icon
              v-if="hasControls('fullscreen') && !fullscreen"
              @click="changeFullscreen(true)"
              name="FullScreen"
              class="rsh-dialog__controls-icon"
            ></rsh-icon>
            <rsh-icon
              v-if="hasControls('fullscreen') && fullscreen"
              @click="changeFullscreen(false)"
              name="Minus"
              class="rsh-dialog__controls-icon"
            ></rsh-icon>
            <rsh-icon
              v-if="hasControls('close')"
              @click="onClose"
              name="Close"
              class="rsh-dialog__controls-icon"
            ></rsh-icon>
          </div>
        </div>
      </template>
      <template v-else #title>
        {{ title }}
      </template>
      <div class="rsh-dialog__body" :style="styleObject">
        <slot></slot>
      </div>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
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
      default: '40%'
    },
    // margin-top 值
    top: {
      type: String,
      default: '15vh'
    },
    //是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    customClass: String,
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    beforeClose: Function,
    //头部控件
    controls: {
      type: Array,
      default: () => ['fullscreen', 'close']
    },
    //隐藏头部控件
    hiddenControls: {
      type: Boolean,
      default: false
    },
    //关闭时销毁 DOM 内容
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open', 'opened', 'beforeClose', 'update:visible', 'close', 'closed'],
  setup(props, { emit }) {
    const fullscreen = ref(false)
    const maxHeight = computed(() => {
      // 非全屏
      if (!fullscreen.value) {
        return `calc(100vh - ${props.top} - 30vh)`
      }
      return '80vh'
    })

    const styleObject = {
      maxHeight: maxHeight.value,
      overflowY: 'auto',
      padding: '30px 20px'
    }
    const hasControls = (val) => {
      return props.controls.includes(val)
    }
    const changeFullscreen = (type) => {
      fullscreen.value = type
    }

    const handleOpen = () => {
      emit('update:visible', true)
      emit('open')
    }
    const handleOpend = () => {
      emit('opened')
    }
    const handleBeforeClose = () => {
      if (props.beforeClose) {
        props.beforeClose()
      } else {
        onClose()
      }
    }
    const onClose = () => {
      if (props.beforeClose) {
        props.beforeClose()
      } else {
        emit('update:visible', false)
      }
    }
    const handelClose = () => {
      emit('close')
      onClose()
    }
    const handelClosed = () => {
      emit('closed')
    }
    return {
      maxHeight,
      styleObject,
      fullscreen,
      handleOpen,
      handleOpend,
      handleBeforeClose,
      onClose,
      handelClose,
      handelClosed,
      hasControls,
      changeFullscreen
    }
  }
}
</script>
<style lang="scss">
.rsh-dialog-container {
  .el-dialog {
    margin-bottom: 0 !important;
  }

  .rsh-dialog__header {
    position: relative;
    height: 21px;
    line-height: 21px;
  }

  .rsh-dialog__title {
    display: block;
    font-size: 15px;
    letter-spacing: 0.5px;
  }

  .rsh-dialog__controls {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    display: flex;
    justify-content: flex-end;

    .rsh-dialog__controls-icon {
      margin: 0 10px;
      font-size: 16px;
      color: #606266;
      cursor: pointer;

      &:hover {
        color: #4165d7;
      }
    }
  }

  .el-dialog__body {
    padding: 0 !important;
    background-color: #f7f7f7;
  }
  // 暂时处理fullscreen  max-height不改变问题
  .is-fullscreen {
    .el-dialog__body {
      .rsh-dialog__body {
        max-height: 80vh !important;
      }
    }
  }
}
</style>
