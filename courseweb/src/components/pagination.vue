<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      @current-change="handleCurrentChange"
     
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const { total, currentChange, handleCurrentChange } = defineProps([
  "total",
  "currentChange",
  "handleCurrentChange",
]);
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 10px;
}
</style>
