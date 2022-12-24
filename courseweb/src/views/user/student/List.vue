<template>
  <el-table
    :data="filterTableData"
    style="width: 100%"
    stripe
    border
    :default-sort="{ prop: 'create_time', order: 'descending' }"
  >
    <el-table-column label="创建时间" prop="create_time" sortable width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{
            scope.row.create_time.toString().substring(0, 10)
          }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Id" prop="id" width="100px" />
    <el-table-column label="用户名称" prop="username">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="班级" prop="classname" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="输入关键词查询" />
      </template>
      <template #default="scope">
        <router-link
          :to="{ path: 'edit', query: { id: scope.row.id } }"
          style="margin-right: 20px"
        >
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          ></router-link
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { getStudentInfo } from "@/api/index";
import { onMounted } from "@vue/runtime-core";
const search = ref("");
const filterTableData = computed(() =>
  studentData.total.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase()) ||
      data.classname.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};

const studentData = reactive({
  total: [
    {
      create_time: "",
      id: "",
      username: "",
      classname: "",
      city: "",
      email: "",
    },
  ],
});
const getStudentData = async () => {
  const res = await getStudentInfo();
  //console.log(res.data);
  const data = res.data;

  studentData.total = data.total;
};
onMounted(() => {
  getStudentData();
});
</script>

<style lang="less" scoped></style>
