<!--
 * @Author: Calvin
 * @Date: 2021-12-06 11:07:28
 * @FilePath: \src\components\Redirect\index.vue
 * @Description: 路由重定向模板
-->
<template>
  <div class="redirect-container">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Redirect'
}
</script>
<style lang="scss" scoped>
.redirect-container {
  width: 100%;
  height: 100%;
}
</style>
