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
    <el-table-column label="Id" prop="adminId" width="100px"/>
    <el-table-column label="管理员名称" prop="adminName">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.adminName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="真实姓名" prop="realName" />
    <el-table-column label="手机号" prop="phone" />
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
  userData.filter(
    (data) =>
      !search.value ||
      data.adminName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.realName.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};
const userData = [
  {
    createDate: "2016-05-03",
    adminId: 2,
    realName: "章三",
    adminName: "California",
    phone: 1234129385,
    email: "Home@gamil.com",
  },
  {
    createDate: "2016-05-02",
    adminId: 9,
    realName: "莉丝",
    adminName: "California",
    phone: 1234129385,
    email: "Office@gamil.com",
  },
  {
    createDate: "2016-05-04",
    adminId: 3,
    realName: "Tom",
    adminName: "California",
    phone: 1234129385,
    email: "Home@gamil.com",
  },
  {
    createDate: "2016-05-01",
    adminId: 5,
    realName: "Jom",
    adminName: "California",
    phone: 1234129385,
    email: "Office@gamil.com",
  },
];
</script>

<style lang="less" scoped>
.text {
}
</style>
