<!--
 * @Author: Calvin
 * @Date: 2021-12-07 19:06:36
 * @FilePath: /src/layout/components/Navbar/components/Breadcrumb.vue
 * @Description: 面包屑
-->
<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'
import { getCurrentInstance, onBeforeMount, ref, watch } from 'vue'
export default {
  name: 'Breadcrumb',
  setup() {
    let levelList = ref(null)
    let { proxy } = getCurrentInstance()

    const getBreadcrumb = () => {
      let matched = proxy.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }

    const pathCompile = (path) => {
      const { params } = proxy.$route
      const toPath = compile(path)
      return toPath(params)
    }
    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        proxy.$router.push(redirect)
        return
      }
      proxy.$router.push(pathCompile(path))
    }
    watch(
      () => proxy.$route,
      () => {
        getBreadcrumb()
      },
      { immediate: true }
    )
    onBeforeMount(() => {
      getBreadcrumb()
    })
    return {
      getBreadcrumb,
      handleLink,
      levelList
    }
  }
}
</script>
<style lang="scss">
.breadcrumb-container.el-breadcrumb {
  display: inline-block;
  margin-left: 20px;
  font-size: 13px;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
