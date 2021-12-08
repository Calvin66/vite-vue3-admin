<!--
 * @Author: Calvin
 * @Date: 2021-12-06 19:57:10
 * @FilePath: /src/layout/components/Navbar/index.vue
 * @Description: 
-->
<template>
  <div class="navbar-container">
    <Collapse></Collapse>
    <MenuBar></MenuBar>
    <Breadcrumb></Breadcrumb>
    <div class="flex1"></div>
    <UserBar></UserBar>
  </div>
</template>

<script>
import Breadcrumb from './components/Breadcrumb.vue'
import Collapse from './components/Collapse.vue'
import MenuBar from './components/MenuBar.vue'
import UserBar from './components/UserBar.vue'
export default {
  name: 'Navbar',
  components: {
    Collapse,
    Breadcrumb,
    MenuBar,
    UserBar
  },
  setup() {}
}
</script>

<style scoped lang="scss">
.navbar-container {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  &__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .flex1 {
    flex: 1;
  }
}
</style>
