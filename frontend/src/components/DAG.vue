<template>
    <el-scrollbar height="100%" style="width: 100%; height: 100vh;">
        <!-- 标题和搜索框 -->
        <div style="margin-top: 20px; margin-left: 40px; font-size: 2em; font-weight: bold;">传播关系图网</div>

        <!-- ECharts 容器 -->
        <div ref="relationChart" style="width: 100%; height: 100vh;"></div>

        <!-- 其他内容 -->
    </el-scrollbar>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";

export default {
  setup() {
    const relationChart = ref(null);

    const initChart = () => {
      nextTick(() => {
        if (!relationChart.value) {
          console.error("relationChart 未找到");
          return;
        }

        const container = relationChart.value;
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) {
          console.error("[ECharts] 容器尺寸异常", width, height);
          return;
        }

        const chart = echarts.init(container);
        // 这里对基本的关系图特征进行编写
        chart.setOption({
        //   title: { text: "基础关系图" },
          tooltip: { trigger: "item" },
          series: [
            {
              type: "graph",
              layout: "force",
              draggable: true,
              nodes: [
                { id: "A", name: "节点A", symbolSize: 50, tooltip: { formatter: "{这是节点A的注释}" } },
                { id: "B", name: "节点B", symbolSize: 50, tooltip: { formatter: "{这是节点B的注释}" } },
                { id: "C", name: "节点C", symbolSize: 50, tooltip: { formatter: "{这是节点C的注释}" } },
              ],
              links: [
                { source: "A", target: "B", label: "关系1", value: 10 },
                { source: "B", target: "C", label: "关系2", value: 5 },
              ],
              force: { repulsion: 1000, edgeLength: 100 },
              edgeLabel: { show: true, formatter: "{c}" },
              label: { show: true, position: "inside" },
            },
          ],
        });

        // 这里对节点点击后的事件进行监听
        chart.on("click", (params) => {
          console.log("点击了节点", params);
          alert(`点击了节点: ${params.data.name}`);
        });

        window.addEventListener("resize", () => chart.resize());
      });
    };

    onMounted(() => {
      nextTick(initChart);
    });

    return { relationChart };
  },
};
</script>
