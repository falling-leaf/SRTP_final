<template>
  <div ref="chartContainer" class="chart-container" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import useCharts from '../useCharts';

const props = defineProps({ data: Object });
const emit = defineEmits(['node-click']);

const chartContainer = ref(null);
const { initChart, updateChart, exportChart } = useCharts(chartContainer, emit);
const chartInstance = ref(null);

onMounted(() => {
  chartInstance.value = initChart(props.data);
});
watch(
  () => props.data,
  newData => updateChart(newData),
  { deep: true }
);

defineExpose({ exportChart, chartInstance });
</script>

<style scoped>
.chart-container {
  flex: 1;
  height: 100%;
  padding: 20px;
  background: #fff;
}
</style>