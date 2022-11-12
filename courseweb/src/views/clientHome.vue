<template>
  <div class="home-common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside :isCollapse="isCollapse"></Aside
      ></el-aside>
      <el-container id="main-container">
        <el-header>
          <Header :handleOpen="handleOpen" :isCollapse="isCollapse"></Header
        ></el-header>
        <el-main><Main></Main></el-main>
        <el-footer><Footer></Footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "../components/clientHeader.vue";
import Aside from "../components/clientAside.vue";
import Main from "../components/clientMain.vue";
import Footer from "../components/clientFooter.vue";
import { ref } from "vue";
const isCollapse = ref(false);
const handleOpen = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
  overflow: hidden;
  //background-image: linear-gradient(#3d2798,#362185,#452da9,#583dd5,#705ae6,#a6a2f4);
  background-color: #5a3fba;
}
.el-main {
  display: flex;
  border-radius: 20px;
  margin-left: 15px;
  background-color: #fff;
  margin-top: 15px;
}

.el-container {
  height: 100vh;
}
#main-container {
  background-color: #f6f9fd;
  margin-left: 10px;
}
.el-header {
  margin-left: 15px;
  background-color: #fff;
}
.el-footer {
  margin-left: 15px;
}
</style>
