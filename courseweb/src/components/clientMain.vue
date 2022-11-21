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
    <pagination
      :total="courseData.total"
      :handleCurrentChange="handleCurrentChange"
    ></pagination>
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
import {
  getCourse,
  changeCourse,
  deleteCourse,
  getUserInfo,
} from "../api/index";
import { onMounted } from "@vue/runtime-core";
import emitter from "@/utils/eventBus";
const courseData = reactive({
  list: [],
  total: 15,
  page: 1,
  sideCategory: "front",
});
const userInfo = reactive({
  name: "",
  head_img: "",
});

//控制编辑弹窗
const popShow = ref(false);
/**
 * 课程编辑
 */

//编辑的数据
const courseItemState = reactive({
  message: {},
});
//课程修改接口调用
const changeCourseData = async (query) => {
  const { title, price, id } = query;
  const res = await changeCourse(query);
  if (res?.message) {
    ElMessage({
      message: res.message,
      type: "success",
    });
  }
};
const isShowPop = (val) => {
  popShow.value = val;
  //console.log(popShow.value);
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
    changeCourseData({ title: val.title, price: val.price, id: val.id });
    //关闭编辑页面
    isShowPop(false);
  } else {
    ElMessage({
      showClose: true,
      message: "未发现有更改的内容",
      type: "warning",
    });
  }
};

/**
 * 删除逻辑
 */
//删除接口
const deleteCourseData = async (val) => {
  const res = await deleteCourse({ id: val });
  //console.log(res)
  //弹窗提醒
  if (res.code === 0) {
    ElMessage({
      message: res.message,
      type: "success",
    });
  } else {
    ElMessage({
      message: res.message,
      type: "error",
    });
  }

  //当前页面删除清空时跳转第一页
  //console.log({'courseData':courseData.list.length,'page':courseData.page})
  if (courseData.list.length === 0 && courseData.page > 1) {
    console.log("success");
    getCourseData({ category: courseData.sideCategory, page: 1 });
  }
};
const handleDelete = (val) => {
  if (val) {
    courseData.list = courseData.list.filter((item) => {
      return item.id !== val;
    });
    //数据库调用接口修改
    deleteCourseData(val);
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
const handleCurrentChange = (val) => {
  getCourseData({ category: courseData.sideCategory, page: val });
};

/**
 * 切换类别
 */
//课程类别切换
const getCourseData = async (query) => {
  const category = query?.category || courseData.sideCategory;
  const page = query?.page || 1;
  const size = query?.size || 5;
  const res = await getCourse({ category, page, size });
  //console.log(res)
  const data = res.data;
  //获取相应分类
  courseData.list = data?.list.filter((item) => {
    return item.category === category;
  });
  //console.log({ courseData: data });
  courseData.total = data.total[0].total;
};
onMounted(() => {
  getCourseData();
  //类别切换监听
  emitter.on("course", (val) => {
    courseData.sideCategory = val;
    courseData.page = 1;
    getCourseData({ category: val, page: 1 });
  });
});
//个人信息切换
// const getUserData = async (query) => {
//   const res = await getUserInfo();
//   const data = res.data;
//   onMounted(() => {
//     getUserData();
//     emitter.on("user", (val) => {});
//   });
// };
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
