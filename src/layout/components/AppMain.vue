<!--
 * @Author: Calvin
 * @Date: 2021-12-05 20:09:37
 * @FilePath: /src/layout/components/AppMain.vue
 * @Description: 
-->
<template>
  <div class="app-main-container">
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="fade-transform" mode="out-in"> -->
      <component :is="Component" :key="route.path" />
      <!-- </transition> -->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  setup() {}
}
</script>

<style scoped lang="scss">
.app-main-container {
  position: relative;
  overflow-y: auto;
  padding: 16px;
  width: 100%;
  height: calc(100vh - 50px);
  box-sizing: border-box;
}
</style>
