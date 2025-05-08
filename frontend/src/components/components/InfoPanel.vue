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
        <div class="panel-scroll">
          <div class="panel-header">
            <h2 class="panel-title">{{ currentNode.name }}</h2>
            <div class="panel-meta">
              <el-tag :color="platformColors[currentNode.platform]" class="platform-tag">
                {{ platformNames[currentNode.platform] }}
              </el-tag>
              <span class="time-text">{{ currentNode.time || '未知时间' }}</span>
            </div>
          </div>

          <el-descriptions :column="1" border class="content-descriptions">
            <el-descriptions-item label="传播指数" label-align="right" class="description-item">
              <div class="spread-index">
                <el-progress 
                  :percentage="Math.min(calculateSpreadIndex(currentNode, props.data), 100)"
                  :color="customColors"
                  :show-text="false"
                  class="spread-progress"
                />
                <span class="stat-number">
                  {{ Math.min(calculateSpreadIndex(currentNode, props.data), 100).toFixed(1) }} / 100
                </span>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="内容摘要" label-align="right" class="description-item">
              <div class="content-preview" :class="{ 'expanded': contentExpanded }">
                <template v-if="!contentExpanded">
                  {{ currentNode.content?.substring(0, 100) }}
                  <template v-if="currentNode.content && currentNode.content.length > 100">
                    ...<el-button type="primary" link @click="toggleContent(true)">展开</el-button>
                  </template>
                </template>
                <template v-else>
                  {{ currentNode.content }}
                  <template v-if="currentNode.content && currentNode.content.length > 120">
                    <el-button type="primary" link @click="toggleContent(false)">收起</el-button>
                  </template>
                </template>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="原文链接" label-align="right" class="description-item" v-if="currentNode.url">
              <a :href="currentNode.url" target="_blank" class="original-link">
                <el-icon><Link /></el-icon>
                跳转到原文
              </a>
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
              @click="handleRelatedClick(post)"
            >
              <div class="post-info">
                <div class="post-header">
                  <div class="platform-tag" :style="{background: platformColors[post.platform]}">
                    {{ platformNames[post.platform] }}
                  </div>
                  <span class="post-time">{{ post.time }}</span>
                </div>
                <div class="post-title">{{ post.name }}</div>
                <div class="related-content">
                  {{ post.content?.substring(0, 20) }}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { Link } from '@element-plus/icons-vue'
import { 
  platformColors, 
  platformNames, 
  calculateSpreadIndex, 
  customColors 
} from '../utils'
import { mockData } from '../mockData'
import { dataTool } from 'echarts'

const props = defineProps({
detailVisible: {
  type: Boolean,
  default: false
},
currentNode: {
  type: Object,
  default: () => ({})
},
data: {
  type: Object,
  default: () => ({})
},
relatedPosts: {
  type: Array,
  default: () => []
}
})
const emits = defineEmits(['update:detailVisible', 'related-click'])

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

function handleRelatedClick(post) {
  emits('related-click', post)
}

function openOriginalPost(post) {
  if (post.url) {
    window.open(post.url, '_blank')
  }
}

watch(() => props.currentNode, (val) => {
  console.log('currentNode', val);
}, { immediate: true });
</script>

<style scoped>
.info-panel {
  --el-drawer-padding-primary: 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
  --el-drawer-padding-primary: 0;
  /* 移除原生滚动 */
  :deep(.el-drawer__body) {
    overflow: hidden;
  }
}

.info-panel:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.panel-content {
  flex-direction: column;
}

.panel-scroll {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 10vh;
  border-radius: 16px;
  background-color: rgb(246 247 248);
}

/* 自定义滚动条样式 */
.panel-scroll::-webkit-scrollbar {
  width: 6px;
}

.panel-scroll::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.panel-scroll::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}

.panel-header {
  margin-bottom: 8px;
}

.panel-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.panel-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 描述列表 */
.el-descriptions {
  font-size: 14px;
  color: #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  background: #fff;
}

.content-descriptions {
  flex-direction: column;
  
}

.platform-tag {
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 4px;
  color: #fff;
}

.time-text {
  color: #909399;
  font-size: 14px;
}

.spread-index {
  display: flex;
  align-items: center;
  gap: 12px;
}

.spread-progress {
  flex: 1;
  margin-right: 12px;
}

.stat-number {
  font-size: 14px;
  font-weight: 600;
  color: #409eff;
  min-width: 60px;
  text-align: right;
}

.content-preview {
  line-height: 1.8;
  color: #606266;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  min-height: 60px;
}

.content-preview.expanded {
  min-height: 120px;
}

.content-preview :deep(.el-button) {
  font-weight: 500;
  margin-left: 4px;
}

.content-preview :deep(.el-button--primary.is-link) {
  color: #409eff;
}

.content-preview :deep(.el-button--primary.is-link:hover) {
  color: #66b1ff;
}

.original-link {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.original-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

/* 互动数据仪表盘 */
.metric-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.metric-item {
  text-align: center;
  padding: 0 20px;
  position: relative;
}

.metric-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: #ebeef5;
}

.metric-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 13px;
  color: #909399;
  font-weight: 500;
}

/* 关联帖子 */
.related-posts {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.related-posts h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.related-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 12px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #dcdfe6;
}

.post-info {
  flex: 1;
  min-width: 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.post-title {
  font-weight: 600;
  font-size: 14px;
  color: #303133;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.related-content {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-time {
  font-size: 12px;
  color: #909399;
}
</style>