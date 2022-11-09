<template>
  <div>首页</div>
  <el-button type="success" @click="toGo('/login')">跳转登陆</el-button>
  <el-button type="success" @click="toGo('/register')">跳转注册</el-button>
</template>

<script setup>
import router from "../router/index";
const toGo = (val) => {
    router.push(val)
};
</script>

<style lang="less" scoped></style>
