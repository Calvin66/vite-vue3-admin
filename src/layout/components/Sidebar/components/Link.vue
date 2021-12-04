<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
import { computed, toRefs } from 'vue'

import { isExternal } from '@/utils/validate'
export default {
  name: 'Link',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { to } = toRefs(props)
    const isExternalValid = computed(() => {
      return isExternal(to.value)
    })
    const type = computed(() => {
      if (isExternalValid.value) {
        return 'a'
      }
      return 'router-link'
    })
    const linkProps = (to) => {
      if (isExternalValid.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
    return {
      type,
      linkProps
    }
  }
}
</script>

<style scoped lang="scss"></style>
