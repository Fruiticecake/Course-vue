<template>
  <div class="header">
    <div class="header_icon">
      <el-icon
        size="30px"
        @click="handleOpen"
        :style="{ transform: isCollapse ? '' : 'rotate(180deg)' }"
        ><Fold
      /></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div
      class="user"
      @mouseenter="isShowUserInfo('showUserInfo')"
      @mouseleave="isShowUserInfo('leaveUserInfo')"
    >
      <img :src="userInfo.headImg" alt="" />
      <div class="userInfo" v-show="showUserInfo">
        <div>{{ userInfo.name }}</div>
        <div @click="loginOut">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { ref, defineProps, onMounted } from "vue";
import { getUserInfo } from "../api/index";
import router from "../router/index";
const { handleOpen, isCollapse } = defineProps(["handleOpen", "isCollapse"]);
const showUserInfo = ref(false);
const isShowUserInfo = (type) => {
  type === "showUserInfo"
    ? (showUserInfo.value = true)
    : (showUserInfo.value = false);
};

/**
 * 退出登录
 */

const loginOut = () => {
  router.push("/login");
  localStorage.removeItem("token");
};
/**
 * 用户信息接口调用
 */
const userInfo = reactive({
  name: "",
  headImg: "",
});

const getUserInfoData = async () => {
  const res = await getUserInfo();
  //console.log({userInfo:res.data});
  let data = res.data;
  if (data?.name && data?.headImg) {
    userInfo.name = data.name;
    userInfo.headImg = data.headImg;
  }
};
onMounted(() => {
  getUserInfoData();
});
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header_icon {
    display: flex;
    flex-direction: row;
  }
  .el-breadcrumb {
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.user {
  display: flex;
  justify-content: center;
  width: 80px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}

.userInfo {
  z-index: 22;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: -77px;
  background-color: #fff;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;

  div:hover {
    color: #409eff;
  }
  div {
    padding: 10px;
  }
}
</style>
