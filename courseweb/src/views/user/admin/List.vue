<template>
  <el-table :data="filterTableData" style="width: 100%" stripe border>
    <el-table-column label="创建时间" prop="create_time">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Id" prop="id" width="100px" />
    <el-table-column label="管理员名称" prop="username">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="真实姓名" prop="realname" />
    <el-table-column label="手机号" prop="phone" />
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
import { getAdminInfo } from "@/api/index";
import { onMounted } from "@vue/runtime-core";
const search = ref("");
const filterTableData = computed(() =>
  userData.total.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase()) ||
      data.realname.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};
const userData = reactive({
  total: [
    {
      id: "",
      username: "",
      realname: "",
      phone: "",
      email: "",
      create_time: "",
    },
  ],
});
const getUserData = async () => {
  const res = await getAdminInfo();
  let data = res.data;
  userData.total = data.total;
};
onMounted(() => {
  getUserData();
});
</script>

<style lang="less" scoped>

</style>
