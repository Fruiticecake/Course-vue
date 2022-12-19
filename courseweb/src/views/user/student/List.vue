<template>
  <el-table
    :data="filterTableData"
    style="width: 100%"
    stripe="true"
    border="true"
  >
    <el-table-column label="创建时间" prop="createDate">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Id" prop="studentId" width="100px" />
    <el-table-column label="用户名称" prop="studentName">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.studentName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="班级" prop="className" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="输入关键词查询" />
      </template>
      <template #default="scope">
        <router-link :to="{ path: 'edit', query: { id: scope.row.id } }" style="margin-right: 20px;">
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
import { ref, computed } from "vue";
const search = ref("");
const filterTableData = computed(() =>
  studentData.filter(
    (data) =>
      !search.value ||
      data.studentName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.className.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};
const studentData = [
  {
    createDate: "2016-05-03",
    studentId: 20202,
    studentName: "章三",
    className: "California2",
    city: "Los Angeles",
    email: "Home@gamil.com",
  },
  {
    createDate: "2016-05-02",
    studentId: 20201,
    studentName: "莉丝",
    className: "California1",
    city: "Los Angeles",
    email: "Office@gamil.com",
  },
  {
    createDate: "2016-05-04",
    studentId: 20203,
    studentName: "Tom",
    className: "California4",
    city: "Los Angeles",
    email: "Home@gamil.com",
  },
  {
    createDate: "2016-05-01",
    studentId: 20205,
    studentName: "Jom",
    className: "California",
    city: "Los Angeles",
    email: "Office@gamil.com",
  },
];
</script>

<style lang="less" scoped>
.text {
}
</style>
