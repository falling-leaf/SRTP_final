<template>
    <el-upload :show-file-list="false" action="#" :before-upload="beforeUpload" accept=".csv,.json">
      <el-button type="success">
        <el-icon><Upload /></el-icon>批量导入
      </el-button>
    </el-upload>
  </template>
  
  <script setup>
  import useDataUpload from "../useDataUpload";
  
  const { beforeUpload } = useDataUpload();
  </script>
  