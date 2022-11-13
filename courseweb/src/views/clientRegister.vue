<template>
  <div class="register">
    <div class="bgp"></div>
    <div class="register_container">
      <h1>Gorker</h1>
      <el-form
        class="register_form"
        :model="userInfo"
        :rules="rules"
        @keyup.enter="onRegister"
        ref="ref_form"
      >
        <el-form-item prop="userName">
          <el-input placeholder="请输入用户名" v-model.trim="userInfo.userName">
            <template #prepend>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model.trim="userInfo.password"
          >
            <template #prepend>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="register_submit" @click="onRegister"
          >注册</el-button
        >
        <div class="register_register" @click="toLogin">已有账号去登录</div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import router from "../router/index";
import { getRegister } from "../api/index";
const ref_form = ref(null);

const userInfo = reactive({
  userName: "",
  password: "",
});

/**
 * 表单数据校验规则
 */
const rules = {
  userName: [{ required: "true", trigger: "blur", message: "用户名不能为空" }],
  password: [{ required: "true", trigger: "blur", message: "密码不能为空" }],
};

const onRegister = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getRegisterData();
    }
  });
};

/**
 * 注册接口
 */
const getRegisterData = async () => {
  //接口的调用
  const res = await getRegister({
    userName: userInfo.userName,
    password: userInfo.password,
  });
  //console.log(res);
  // 如果注册成功
  if (res?.message) {
    ElMessage({
      message: "注册成功！",
      type: "success",
    });
    router.push("/login");
  }
};

/**
 * to登录页面
 */
const toLogin = () => {
  router.push("/login");
};
</script>

<style lang="less" scoped>
@keyframes load {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.register {
  height: 100%;

  .bgp {
    height: 100%;
    background-image: url("../assets/bg3.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 50% 50%;
  }

  .el-icon {
    height: 30px !important;
  }

  .register_container {
    animation: load 1s ease;
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;

    h1 {
      font-size: 24px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el-card {
      border-radius: 20px;
    }

    .register_form {
      .register_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .register_register {
        width: 6.25rem;
        font-size: 0.875rem;
        margin: 0 auto;
      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>
