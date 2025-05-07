<template>
    <el-drawer
      v-model="visible"
      title="节点详情"
      :size="480"
      direction="rtl"
      :with-header="true"
      class="info-panel"
    >
      <div v-if="currentNode && currentNode.id" class="panel-content">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="帖子ID" label-align="right">
            <el-tag type="info">{{ currentNode.id }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="平台">
            <el-tag :color="platformColors[currentNode.platform]" style="color: #fff;">
              {{ platformNames[currentNode.platform] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="传播指数">
            <el-progress 
              :percentage="calculateSpreadIndex(currentNode)"
              :color="customColors"
              :show-text="false"
            />
            <span class="stat-number">
              {{ calculateSpreadIndex(currentNode) }} / 100
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="发布时间">
            {{ currentNode.time || '未知时间' }}
          </el-descriptions-item>
          <el-descriptions-item label="内容摘要">
            <div class="content-preview">
              <template v-if="!contentExpanded">
                {{ currentNode.content?.substring(0, 120) }}
                <template v-if="currentNode.content && currentNode.content.length > 120">
                  ...<el-button type="text" @click="toggleContent(true)">展开</el-button>
                </template>
              </template>
              <template v-else>
                {{ currentNode.content }}
                <template v-if="currentNode.content && currentNode.content.length > 120">
                  <el-button type="text" @click="toggleContent(false)">关闭</el-button>
                </template>
              </template>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="原文链接" v-if="currentNode.url">
            <a :href="currentNode.url" target="_blank">跳转到原文</a>
          </el-descriptions-item>
        </el-descriptions>
  
        <!-- 互动数据仪表盘 -->
        <div class="metric-container">
          <div class="metric-item">
            <div class="metric-value">{{ currentNode.stats?.repost || 0 }}</div>
            <div class="metric-label">转发</div>
          </div>
          <div class="metric-item">
            <div class="metric-value">{{ currentNode.stats?.comment || 0 }}</div>
            <div class="metric-label">评论</div>
          </div>
          <div class="metric-item">
            <div class="metric-value">{{ currentNode.stats?.like || 0 }}</div>
            <div class="metric-label">点赞</div>
          </div>
        </div>
  
        <!-- 关联帖子 -->
        <div class="related-posts" v-if="relatedPosts.length > 0">
            <h3>关联帖子（{{ relatedPosts.length }}）</h3>
            <div 
              v-for="post in relatedPosts" 
              :key="post.id"
              class="related-item"
              @click="handleRelatedClick(post.id)"
            >
              <div class="platform-tag" :style="{background: platformColors[post.platform]}">
                {{ platformNames[post.platform] }}
              </div>
              <div class="related-content">
                {{ post.content?.substring(0, 60) }}...
              </div>
            </div>
          </div>
      </div>
    </el-drawer>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  import { 
    platformColors, 
    platformNames, 
    calculateSpreadIndex, 
    customColors 
  } from '../utils'  // 假设公共配置和函数另行抽取到 utils 中
  
  const props = defineProps({
  detailVisible: {
    type: Boolean,
    default: false
  },
  currentNode: {
    type: Object,
    default: () => ({})
  },
  relatedPosts: {
    type: Array,
    default: () => []
  }
})
  const emits = defineEmits(['update:modelValue', 'related-click'])
  
  const visible = ref(props.detailVisible)
  watch(() => props.detailVisible, (newVal) => {
    visible.value = newVal
  })
  watch(visible, (val) => {
    emits('update:detailVisible', val)
  })
  
  // 本组件内部维护内容展开状态
  const contentExpanded = ref(false)
  function toggleContent(expand) {
    contentExpanded.value = expand
  }
  
  function handleRelatedClick(id) {
    emits('related-click', id)
  }
  </script>
  
  <style scoped>
  .info-panel {
    --el-drawer-padding-primary: 24px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }
  .info-panel:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
  
  .panel-content {
    padding: 24px;
    background: #f2f2f2ca;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  
  /* 描述列表 */
  .el-descriptions {
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;
  }
  
  .el-descriptions-item {
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .el-descriptions-item:last-child {
    border-bottom: none;
  }
  
  /* 互动数据仪表盘 */
  .metric-container {
    display: flex;
    justify-content: space-around;
    margin: 24px 0;
    padding: 16px;
    background-color: #fafafa;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  .metric-item {
    text-align: center;
  }
  .metric-value {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
  }
  .metric-label {
    margin-top: 4px;
    font-size: 13px;
    color: #7f8c8d;
  }
  
  /* 关联帖子：整个块 & 每一项 */
  .related-posts {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
  }
  .related-posts h3 {
    font-size: 18px;
    font-weight: bold;
    color: #444;
    margin-bottom: 12px;
  }
  .related-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 10px;
    background: #fbfbfb;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    flex-wrap: nowrap; /* 强制所有子项单行显示 */
  }
  .related-item:hover {
    background: #f5f5f5;
    transform: translateX(5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* 关联帖子中的平台标签，仅占一行，多余部分省略 */
  .platform-tag {
    border-radius: 4px;
    white-space: nowrap;
    font-size: 12px;
    padding: 4px 8px;
    margin-right: 12px;
    color: #fff;
    text-transform: uppercase;
    text-overflow: ellipsis;
  }
  
  /* 关联帖子中的内容，同样只占一行 */
  .related-content {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .stat-number {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 8px;
    display: block;
  }
  .info-panel {
  --el-drawer-padding-primary: 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}
.info-panel:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}
.panel-content {
  padding: 24px;
  background: #f7fafd;
  font-family: "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  border-radius: 12px;
}
.el-descriptions-item {
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}
.el-descriptions-item:last-child {
  border-bottom: none;
}
.stat-number {
  font-size: 13px;
  color: #1976d2;
  margin-top: 8px;
  display: block;
  font-weight: bold;
}
.related-posts {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}
.related-posts h3 {
  font-size: 18px;
  font-weight: bold;
  color: #444;
  margin-bottom: 12px;
}
.related-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 10px;
  background: #fbfbfb;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  flex-wrap: nowrap;
}
.related-item:hover {
  background: #f5f5f5;
  transform: translateX(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.platform-tag {
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  padding: 4px 8px;
  margin-right: 12px;
  color: #fff;
  text-transform: uppercase;
  text-overflow: ellipsis;
}
.related-content {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
  </style>