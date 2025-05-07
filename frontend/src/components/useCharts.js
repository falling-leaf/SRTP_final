// useCharts.js
import * as echarts from 'echarts';

/**
 * Composable for initializing and updating an ECharts instance
 * @param {Ref<HTMLElement>} containerRef - ref to the chart container element
 * @param {Function} emit - emit function for events
 */
export default function useCharts(containerRef, emit) {
  let chart = null;

  /** 初始化图表实例并渲染数据 */
  const initChart = (data) => {
    if (!containerRef.value) return;
    // 销毁旧实例
    echarts.dispose(containerRef.value);
    chart = echarts.init(containerRef.value);
    renderChart(data);
    // 监听容器大小变化
    window.addEventListener('resize', () => chart.resize());
    return chart;
  };

  /** 渲染或更新图表 */
  const renderChart = (data, notMerge = true) => {
    if (!chart || !data) return;
    const nodes = data.nodes || [];
    const links = data.links || [];
    const interactions = nodes.map(node => calculateSpreadIndex(node));
    const maxInteraction = Math.max(...interactions, 1);

    // 只保留一个 series，节点类型决定 symbol/color
    const seriesData = nodes.map(node => {
      let symbol = 'circle';
      let typeKey = 'normal';
      if (node.isOrigin) { symbol = 'diamond';  typeKey = 'origin'; }
      else if (node.isExplosive || node.isSmallExplosive) { symbol = 'rect';  typeKey = 'turning'; }
      let color = platformColors[node.platform] || platformColors.default || '#888';
      const interaction = node.is_virtual ? 0 : calculateSpreadIndex(node);
      const symbolSize = calculateNodeSize(interaction, maxInteraction);
      return {
        ...node,
        symbol,
        symbolSize,
        _platform: node.platform,
        _typeKey: typeKey,
        itemStyle: {
          color,
          borderColor: '#fff',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 12,
          color: '#333',
          fontFamily: 'Times New Roman'
        }
      };
    });

    const option = {
      backgroundColor: '#fefefe',
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        textStyle: {
          color: '#333',
          fontFamily: 'Times New Roman',
          fontSize: 13
        },
        formatter: params => {
          if (params.dataType === 'node') {
            return `
              <div style="font-size: 13px">
                <strong>${params.data.name}</strong><br/>
                平台：${params.data.platform}<br/>
                简介：${params.data.content?.substring(0, 30) || ''}...
              </div>
            `;
          } else if (params.dataType === 'edge') {
            return `
              <div style="font-size: 13px">
                传播：${params.data.type}
              </div>
            `;
          }
          return '';
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: { repulsion: 2000, edgeLength: [80, 180] },
          roam: true,
          draggable: true,
          label: { show: true },
          emphasis: { focus: 'adjacency', label: { show: true } },
          data: seriesData,
          links: links.map(link => ({
            ...link,
            label: { show: false },
            lineStyle: { color: '#bbb', width: 1, opacity: 0.6, curveness: 0.2 },
            symbol: ['none', 'arrow'],
            symbolSize: 6
          })),
          z: 2
        }
      ]
    };
    chart.setOption(option, { notMerge });
    chart.off('click');
    chart.on('click', params => {
      if (params.dataType === 'node') {
        emit('node-click', params.data);
      }
    });
  };

  /** 更新图表数据 */
  const updateChart = (data) => {
    renderChart(data, true);
  };

  /** 导出图表为图片 */
  const exportChart = () => {
    if (!chart) return;
    const img = chart.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#fff' });
    const a = document.createElement('a');
    a.href = img;
    a.download = `graph-export.png`;
    a.click();
  };

  return { initChart, updateChart, exportChart };
}

// helper functions
import { calculateSpreadIndex, platformColors, platformNames } from './utils';

function formatNode(node, maxInteraction) {
  const size = calculateNodeSize(calculateSpreadIndex(node), maxInteraction);
  return {
    ...node,
    symbol: node.isOrigin ? 'diamond' : node.isExplosive || node.isSmallExplosive ? 'rect' : 'circle',
    symbolSize: size,
    itemStyle: { color: platformColors[node.platform] || platformColors.default },
    category: platformIndex(node.platform),
    label: { show: true, position: 'right' }
  };
}

function formatLink(link) {
  return { ...link, lineStyle: { curveness: 0.2 } };
}

function platformIndex(platform) {
  const names = Object.values(platformNames);
  const idx = names.indexOf(platformNames[platform] || platform);
  return idx >= 0 ? idx : 0;
}

function calculateNodeSize(interaction, max) {
  const min = 20, maxS = 50;
  return min + (maxS - min) * (interaction / max);
}