<template>
  <div class="main">
    <el-form>
      <el-form-item>
        <el-input v-model.trim="inputValue" placaholder="请输入内容"></el-input>
      </el-form-item>
      <el-button type="primary" @click="searchClick">查询</el-button>
    </el-form>
    <clientTable
      :list="courseList"
      :editClick="editClick"
      :handleDelete="handleDelete"
    ></clientTable>
    <pagination :total="courseData.total" :handleCurrentChange="handleCurrentChange"></pagination>
  </div>
  <courseEdit
    :popShow="popShow"
    v-if="popShow"
    :message="courseItemState.message"
    :confirmClick="confirmClick"
  ></courseEdit>
</template>

<script setup>
import clientTable from "./clientTable.vue";
import courseEdit from "./courseEdit.vue";
import pagination from "./pagination.vue";
import { reactive, ref } from "vue";
import { computed } from "@vue/runtime-core";
const courseData = reactive({
  list: [
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2022/77-QD/cover.jpeg",
      del: 0,
      id: 1,
      point: 9.8,
      price: "99",
      title: "22年新版【前端高级工程师】面试专题第一季",
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2022/75-Vue3/cover1.jpeg",
      del: 0,
      id: 2,
      point: 9.5,
      price: "99",
      title: "22年新版-零基础玩转vue3+开发仿美团外卖项目vue视频",
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2022/76-webpack5/cover.jpeg",
      del: 0,
      id: 3,
      point: 9.3,
      price: "59",
      title: "新版webpack5丨带你玩转时下最流行的构建工具",
    },
    {
      category: "front",
      courseImg:
        "https://file.xdclass.net/video/2021/74-git/WechatIMG3026.jpeg",
      del: 0,
      id: 4,
      point: 9.2,
      price: "39",
      title: "22年新版-玩转Git零基础到进阶实战 git视频急速入门",
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2021/73-ES6/cover.jpeg",
      del: 0,
      id: 5,
      point: 9.4,
      price: "49",
      title: "22年新版-玩转ECMAScript6零基础到进阶实战es6视频",
    },
  ],
  total: 15,
});

//控制编辑弹窗
const popShow = ref(false);
//编辑的数据
const courseItemState = reactive({
  message: {},
});

const isShowPop = (val) => {
  popShow.value = val;
  console.log(popShow.value);
};

const editClick = (val) => {
  isShowPop(true);
  courseItemState.message = val;
};
//取消or确认编辑
const confirmClick = (val) => {
  if (val === "cancel") {
    isShowPop(false);
  } else if (
    val.title !== courseItemState.message.title ||
    val.price !== courseItemState.message.price
  ) {
    courseData.list.map((item) => {
      if (item.id === val.id) {
        item.title = val.title;
        item.price = val.price;
      }
    });
    //修改接口调用

    //关闭编辑页面
    isShowPop(false);
    ElMessage({
      message: "更改成功",
      type: "success",
    });
  } else {
    ElMessage({
      showClose: true,
      message: "未发现有更改的内容",
      type: "warning",
    });
  }
};

/**
 * 删除
 */
const handleDelete = (val) => {
  if (val) {
    courseData.list = courseData.list.filter((item) => {
      return item.id !== val;
    });
    //数据库调用接口修改

    //弹窗提醒
    ElMessage({
      message: "删除成功",
      type: "success",
    });
  }
};

/**
 * 搜索框
 */
const inputValue = ref("");
const courseList = computed(() => {
  return courseData.list?.filter((item) => {
    return item.title.indexOf(inputValue.value) >= 0;
  });
});
const searchClick = () => {
  if (inputValue.value) {
    ElMessage({
      message: "查询成功",
      type: "success",
    });
  }
};

/**
 * 分页 
 */

 const handleCurrentChange=(val)=>{
  console.log(val)
 }

</script>

<style lang="less" scoped>
.el-form {
  display: flex;
}

.main {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  position: fixed;
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none;
}
</style>
