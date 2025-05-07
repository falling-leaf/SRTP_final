<template>
    <div ref="timelineChart" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import * as echarts from 'echarts'
  import { platformColors } from '../utils'
  
  const props = defineProps({
    nodes: Array,
    links: Array
  })
  
  const timelineChart = ref(null)
  let chart = null
  
  function getOption(nodes, links) {
    // 按时间排序
    const sorted = [...(nodes || [])].sort((a, b) => new Date(a.time) - new Date(b.time))
    // 横坐标为时间
    const categories = sorted.map(n => n.time)
    // 生成 ECharts option
    return {
      tooltip: { trigger: 'item' },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { rotate: 45 }
      },
      yAxis: { show: false },
      series: [
        {
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          symbolSize: 30,
          data: sorted.map((n, i) => ({
            id: n.id,
            name: n.name,
            value: [i, 0],
            symbol: n.isOrigin ? 'diamond' : n.isExplosive || n.isSmallExplosive ? 'rect' : 'circle',
            itemStyle: { color: platformColors[n.platform] || '#888' }
          })),
          links: (links || []).map(l => ({
            source: l.source,
            target: l.target,
            lineStyle: { color: '#bbb', width: 2, curveness: 0.2 }
          })),
          label: { show: true, position: 'top', fontSize: 12 }
        }
      ]
    }
  }
  
  onMounted(() => {
    chart = echarts.init(timelineChart.value)
    chart.setOption(getOption(props.nodes, props.links))
  })
  
  watch(() => [props.nodes, props.links], ([nodes, links]) => {
    if (chart) chart.setOption(getOption(nodes, links), { notMerge: true })
  })
  </script>
  