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
          <Item :meta="onlyOneChild.meta || item.meta" />
          <template v-if="onlyOneChild.meta.title" #title>
            {{ onlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title v-if="item.meta">
        <Item :meta="item.meta" />
        <span v-if="item.meta.title">{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script>
//https://blog.csdn.net/qq_32063079/article/details/120769787
import path from 'path-browserify'
import { getCurrentInstance } from 'vue'

import { isExternal } from '@/utils/validate'

import Item from './Item.vue'
import Link from './Link.vue'
export default {
  name: 'SidebarItem',
  components: {
    Item,
    Link
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup() {
    let { proxy } = getCurrentInstance()
    proxy.onlyOneChild = null
    let hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          proxy.onlyOneChild = item
          return true
        }
      })
      // if (showingChildren.length === 1 && !parent?.alwaysShow) {
      //   return true
      // }
      if (showingChildren.length === 0) {
        proxy.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    let resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(proxy.basePath)) {
        return proxy.basePath
      }
      return path.resolve(proxy.basePath, routePath)
    }
    return {
      hasOneShowingChild,
      resolvePath
    }
  }
}
</script>
