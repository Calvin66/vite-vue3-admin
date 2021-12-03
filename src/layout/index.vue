<template>
  <div class="layout-container">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script>
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
export default {
  name: 'Home',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  setup() {}
}
</script>

<style lang="scss" scoped>
.layout-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    width: 210px !important;
    height: 100%;
    font-size: 0;
    background-color: red;
    transition: width 0.28s;
  }

  .main-container {
    position: relative;
    margin-left: 210px;
    min-height: 100%;
    background: yellow;
    transition: margin-left 0.28s;
  }
}
</style>
