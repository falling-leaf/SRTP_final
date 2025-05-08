<template>
  <el-scrollbar height="100%" style="width: 100%; height: 100vh;">
    <HeaderControls 
      v-model="currentTheme" 
      :themes="themeList"
      @export="exportChart"
      @import="handleDataImport"
    />
    
    <div class="main-container">
      <ChartView 
        ref="chartView"
        :currentTheme="currentTheme" 
        :data="filteredData" 
        @node-click="handleNodeClick"
      />
      <InfoPanel 
        v-model:detailVisible="detailVisible"
        :currentNode="currentNode"
        :data="filteredData"
        :relatedPosts="relatedPosts"
        @related-click="handleRelatedClick"
      />
      <!-- 自定义交互图例 -->
      <div class="legend-group">
        <div class="legend-title">平台</div>
        <div v-for="plat in platformList" :key="plat.value"
             :class="['legend-item', {active: selectedPlatforms.includes(plat.value)}]"
             @click="togglePlatform(plat.value)"
             @mouseenter="highlightNodesByPlatform(plat.value)"
             @mouseleave="downplayAllNodes()">
          <span :style="{background: plat.color}" class="legend-dot"></span>
          {{ plat.label }}
        </div>
        <div class="legend-title">节点类型</div>
        <div v-for="type in typeList" :key="type.value"
             :class="['legend-item', {active: selectedTypes.includes(type.value)}]"
             @click="toggleType(type.value)"
             @mouseenter="highlightNodesByType(type.value)"
             @mouseleave="downplayAllNodes()">
          <span :class="['legend-shape', type.value]"></span>
          {{ type.label }}
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import ChartView from "./ChartView.vue";
import HeaderControls from "./HeaderControls.vue";
import InfoPanel from "./InfoPanel.vue";
import { mockData } from "../mockData";
import useChart from "../useCharts";
import { platformColors } from "../utils";
import TimelineGraph from './TimelineGraph.vue';
const activeTab = ref('graph');

// Define the mapping object
const themeMapping = {
  "default": "默认主题",
  "315": "315 淀粉肠事件",
  "visionPro":"visionPro 退货潮"
  // Add more mappings as needed
};

// Use the mapping object in the computed property
const themeList = computed(() => {
  const keys = Object.keys(mockData);
  const sortedKeys = [
    'default',
    ...keys.filter(k => k !== 'default')
  ];
  return sortedKeys.map(key => ({
    label: themeMapping[key] || key,
    value: key
  }));
});

const currentTheme = ref("default");
const detailVisible = ref(false);
const currentNode = ref({});
const chartView = ref(null);
const currentSeriesData = ref([]);

// 自动生成 platformList，确保和 mockData 里的 platform 字段一致
const allPlatforms = computed(() => {
  const theme = mockData[currentTheme.value];
  if (!theme || !theme.nodes) return [];
  const set = new Set(theme.nodes.map(n => n.platform));
  return Array.from(set);
});
const platformList = computed(() =>
  allPlatforms.value.map(p => ({
    label: p,
    value: p,
    color: platformColors[p] || '#888'
  }))
);
const selectedPlatforms = ref([]);
watch(
  platformList,
  (list) => {
    selectedPlatforms.value = list.map(p => p.value);
  },
  { immediate: true }
);

const typeList = [
  { label: "起点", value: "origin" },
  { label: "爆点", value: "turning" },
  { label: "普通节点", value: "normal" }
];
const selectedTypes = ref(typeList.map(t => t.value));

function togglePlatform(val) {
  if (selectedPlatforms.value.includes(val)) {
    selectedPlatforms.value = selectedPlatforms.value.filter(v => v !== val);
  } else {
    selectedPlatforms.value.push(val);
  }
}
function toggleType(val) {
  if (selectedTypes.value.includes(val)) {
    selectedTypes.value = selectedTypes.value.filter(v => v !== val);
  } else {
    selectedTypes.value.push(val);
  }
}

const filteredData = computed(() => {
  const nodes = mockData[currentTheme.value].nodes.filter(node => {
    const platOk = selectedPlatforms.value.includes(node.platform);
    let typeKey = 'normal';
    if (node.isOrigin) typeKey = 'origin';
    else if (node.isExplosive || node.isSmallExplosive) typeKey = 'turning';
    const typeOk = selectedTypes.value.includes(typeKey);
    return platOk && typeOk;
  });
  const nodeIds = nodes.map(n => n.id);
  // 检查重复 id
  const uniqueIds = new Set(nodeIds);
  if (uniqueIds.size !== nodeIds.length) {
    console.warn('存在重复 id！', nodeIds);
  }
  // 检查空 id
  if (nodeIds.some(id => !id)) {
    console.warn('存在空 id！', nodeIds);
  }
  // 检查无效 link
  const links = mockData[currentTheme.value].links.filter(l => {
    const valid = nodeIds.includes(l.source) && nodeIds.includes(l.target);
    if (!valid) {
      console.warn('无效 link:', l, 'source 存在:', nodeIds.includes(l.source), 'target 存在:', nodeIds.includes(l.target));
    }
    return valid;
  });
  // 输出最终 nodes 和 links 数量
  console.log('最终 nodes 数量:', nodes.length, '最终 links 数量:', links.length);
  return { nodes, links };
});
console.log('筛选后nodes:', filteredData.value.nodes, '平台:', selectedPlatforms.value, '类型:', selectedTypes.value);

// 计算相关帖子
const relatedPosts = computed(() => {
  if (!currentNode.value.id) return [];
  return mockData[currentTheme.value].links
    .filter(link => link.source === currentNode.value.id)
    .map(link => mockData[currentTheme.value].nodes.find(n => n.id === link.target))
    .filter(Boolean);
});

// 主题切换
const handleThemeChange = () => {
  detailVisible.value = false;
  currentNode.value = {};
  // 重置 selectedTypes 为全选
  selectedTypes.value = typeList.map(t => t.value);
  updateChartWithSeriesData(mockData[currentTheme.value]);
};

// 处理图表节点点击
const handleNodeClick = (node) => {
  // 兼容 ref 和普通变量
  const themeKey = typeof currentTheme === 'string' ? currentTheme : currentTheme.value;
  const themeNodes = mockData[themeKey]?.nodes || [];
  // 一定要用 find 查找原始对象
  const fullNode = themeNodes.find(n => n.id === node.id);
  if (!fullNode) {
    console.warn('未找到完整节点对象，使用原始 node:', node);
  }
  currentNode.value = fullNode || node;
  detailVisible.value = true;
};

// 处理关联帖子点击
const handleRelatedClick = (post) => {
  currentNode.value = post;
  detailVisible.value = true;
};

// 处理导入数据
const handleDataImport = (data, themeId) => {
  mockData[themeId] = data;
  currentTheme.value = themeId;
  handleThemeChange();
};

// 图表导出
const exportChart = () => chartView.value?.exportChart();

function updateChartWithSeriesData(data) {
  // 生成 seriesData 逻辑需与 useCharts.js 保持一致
  const nodes = data.nodes || [];
  const interactions = nodes.map(node => calculateSpreadIndex(node));
  const maxInteraction = Math.max(...interactions, 1);
  const seriesData = nodes.map(node => {
    let symbol = 'circle';
    let color = '#69f';
    let typeKey = 'normal';
    if (node.isOrigin) { symbol = 'diamond'; color = '#e74c3c'; typeKey = 'origin'; }
    else if (node.isExplosive || node.isSmallExplosive) { symbol = 'rect'; color = '#f69'; typeKey = 'turning'; }
    const interaction = node.is_virtual ? 0 : calculateSpreadIndex(node);
    const symbolSize = calculateNodeSize(interaction, maxInteraction);
    return {
      ...node,
      symbol,
      symbolSize,
      _platform: node.platform,
      _typeKey: typeKey
    };
  });
  currentSeriesData.value = seriesData;
  chartView.value?.updateChart(data);
}

function highlightNodesByPlatform(platform) {
  const chart = chartView.value?.chartInstance;
  if (!chart) return;
  const indices = currentSeriesData.value
    .map((n, idx) => n._platform === platform ? idx : -1)
    .filter(idx => idx !== -1);
  indices.forEach(dataIndex => {
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex
    });
  });
}
function highlightNodesByType(typeKey) {
  const chart = chartView.value?.chartInstance;
  if (!chart) return;
  const indices = currentSeriesData.value
    .map((n, idx) => n._typeKey === typeKey ? idx : -1)
    .filter(idx => idx !== -1);
  indices.forEach(dataIndex => {
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex
    });
  });
}
function downplayAllNodes() {
  const chart = chartView.value?.chartInstance;
  if (!chart) return;
  chart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0
  });
}
</script>

<style scoped>
.main-container {
  display: flex;
  height: calc(100vh - 60px);
  position: relative;
}
.legend-group {
  position: absolute;
  right: 40px;
  top: 80px;
  background: #fff;
  border-radius: 8px;
  padding: 12px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  font-size: 12px;
  color: #666;
  font-family: 'Times New Roman', Arial, sans-serif;
  z-index: 10;
  min-width: 90px;
}
.legend-title {
  font-weight: bold;
  margin: 8px 0 4px 0;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.legend-item.active {
  opacity: 1;
  font-weight: bold;
}
.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
  display: inline-block;
}
.legend-shape.origin {
  width: 14px; height: 14px; background: #e74c3c; transform: rotate(45deg); margin-right: 8px; display: inline-block;
}
.legend-shape.turning {
  width: 14px; height: 14px; background: #f69; margin-right: 8px; display: inline-block;
}
.legend-shape.normal {
  width: 14px; height: 14px; background: #69f; border-radius: 50%; margin-right: 8px; display: inline-block;
}
</style>
