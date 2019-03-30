<template>
  <el-container>
    <el-header>
     <AppHeader></AppHeader>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <NavMenu></NavMenu>
        <!-- 导航组件 -->
      </el-aside>
      <el-main>
        <!-- Layout 的 children会显示到这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppHeader from './header.vue'
import NavMenu from './aside.vue'

export default {
  name: "Layout",
  data() {
    return {}
  },
  methods: {},
  components: {
    AppHeader,
    NavMenu
  }
};
</script>
<style scoped>
.app-header {
  /* width: 100%; */
  margin: 0;
  padding: 0;
  background-color: #545c60;
  display: flex;
  align-items: center;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
}
.el-menu {
  height: 100%;
}
</style>
