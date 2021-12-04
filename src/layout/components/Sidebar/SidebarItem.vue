<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <template v-if="onlyOneChild.meta?.icon || item.meta?.icon">
            <svg-icon
              :icon-class="onlyOneChild.meta.icon || item.meta.icon"
              className="nav-icon"
            />
          </template>
          <template #title>{{ onlyOneChild.meta?.title }}</template>
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template v-slot:title>
        <template v-if="onlyOneChild.meta?.icon || item.meta?.icon">
          <svg-icon
            :icon-class="onlyOneChild.meta.icon || item.meta.icon"
            className="nav-icon"
          />
        </template>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script>
//https://blog.csdn.net/qq_32063079/article/details/120769787

import path from 'path-browserify'
import { getCurrentInstance } from 'vue'

import { isExternal } from '@/utils/validate'

import Link from './Link.vue'
export default {
  name: 'SidebarItem',
  components: {
    Link
  },
  props: {
    //每一个router Item
    item: {
      type: Object,
      required: true
    },
    //用于判断是不是子Item,设置响应的样式
    isNest: {
      type: Boolean,
      default: false
    },
    //基础路径，用于拼接
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let { proxy } = getCurrentInstance()
    //显示sidebarItem 的情况
    proxy.onlyOneChild = null
    let hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          proxy.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1 && !parent?.alwaysShow) {
        return true
      }
      if (showingChildren.length === 0) {
        proxy.onlyOneChild = { ...parent, path: '', noChildren: true }
        return true
      }
      return false
    }
    let resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.join(props.basePath, routePath)
    }
    return {
      hasOneShowingChild,
      resolvePath
    }
  }
}
</script>
