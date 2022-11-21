<template>
  <el-menu
    class="el-menu-vertical-demo"
    text-color="#ffffff"
    active-text-color="#ffd04b"
    background-color="#5a3fba"
    :collapse="isCollapse"
  >
    <div class="gk_icon" v-show="!isCollapse">
      <img src="../assets/logo.png" alt="" />
      <span>Gorker课程管理系统</span>
    </div>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Collection /></el-icon>
        <span>课程管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="courseHandle('front')">前端课程</el-menu-item>
        <el-menu-item index="1-2" @click="courseHandle('back')">后端课程</el-menu-item>
        <el-menu-item index="1-3" @click="courseHandle('all')">全栈课程</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="userHandle('buycar')">购物车</el-menu-item>
        <el-menu-item index="2-2" @click="userHandle('userInfo')">个人信息</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { defineProps } from "vue";
import emitter from '../utils/eventBus'
const { isCollapse } = defineProps(["isCollapse"]);

/**
 * 类别切换
 */
//课程类别切换
const courseHandle=(type)=>{
  emitter.emit('course',type)
}
//用户个人信息管理切换
// const userHandle=(type)=>{
//   emitter.emit('user',type);
// }



</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  background-color: #5a3fba;
}
.el-radio-button__inner {
  padding: 0;
}
.el-menu--collapse {
  border: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  height: auto;
  border: none;
}
.gk_icon {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  height: 150px;
  width: 200px;
  color: white;
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
  }
}
</style>
