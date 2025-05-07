<template>
<div class="header">
    <el-select v-model="selectedTheme" @change="$emit('update:modelValue', selectedTheme)" style="width: 300px;">
    <el-option v-for="item in themes" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" @click="$emit('export')">导出图像</el-button>
    <DataUploader @import="$emit('import', $event)" />
</div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import DataUploader from "./DataUploader.vue";

defineProps({
modelValue: String,
themes: Array
});
defineEmits(["update:modelValue", "export", "import"]);

const selectedTheme = ref(null);
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px;
    background-color: #f0f2f5;
}
</style>
