<template>
  <div class="app-main-container">
    <div v-for="i in 100" :key="i">测试</div>
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
  width: 100%;
  height: calc(100vh - 50px);
  background: blue;
  box-sizing: border-box;
}
</style>
