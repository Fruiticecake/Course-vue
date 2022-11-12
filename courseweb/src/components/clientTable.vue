<template>
  <div class="table">
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column prop="courseImg" lable="图片">
        <template #default="scope">
          <img :src="scope.row.courseImg" class="courseImg" />
        </template>
      </el-table-column>
      <el-table-column prop="title" lable="标题"> </el-table-column>
      <el-table-column prop="price" lable="价格"> </el-table-column>
      <el-table-column prop="point" lable="评分"> </el-table-column>
      <el-table-column lable="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除该项吗？">
            <template #reference>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const { list } = defineProps(["list"]);

/**
 * 行列样式
 */
const tableRowClassName = ({rowIndex}) => {
  if ((rowIndex) % 2 === 0) {
    return "warning-row";
  } else {
    return "";
  }
};
</script>

<style lang="less" scoped>
.courseImg {
  width: 150px;
  height: 100px;
}
</style>
