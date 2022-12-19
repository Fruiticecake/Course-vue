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
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <transition :name="animation">
                <component :is="Component" />
              </transition>
            </keep-alive> </router-view
        ></el-main>
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
import { onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
const isCollapse = ref(false);
const handleOpen = () => {
  isCollapse.value = !isCollapse.value;
};

const animation = ref("slide");
onBeforeRouteUpdate((to, form) => {
  if (to.meta.index > form.meta.index) {
    animation.value = "slide-left";
  } else {
    animation.value = "slide-right";
  }
});
</script>

<style lang="less" scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 300ms cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(3%, 0, 0);
}
.slide-left-enter-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-3%, 0, 0);
}
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
