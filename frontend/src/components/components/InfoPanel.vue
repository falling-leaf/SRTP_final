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

          <!--事实澄清-->
          <div style="text-align: center;">
            <el-button 
              type="danger" 
              size="large"
              style="
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 2px;
                padding: 20px 40px;
              "
              @click="showClarificationDialog"
            >
              <span style="text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
                事实澄清
              </span>
            </el-button>
          </div>

            <!-- 新增事实澄清对话框 -->
            <el-dialog
              v-model="clarificationDialogVisible"
              title="事实澄清工作流"
              width="800px"
              class="clarification-dialog"
            >
              <!-- 保持之前的工作流内容 -->
              <el-form  label-width="120px">
                <!-- 核心事实输入 -->
                <div class="core-fact-section">
                  <div class="core-fact-title">核心事实陈述</div>
                  <el-input
                    v-model="clarificationForm.coreFact"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入需要澄清的核心事实"
                    show-word-limit
                    maxlength="150"
                    class="core-fact-input"
                  />
                </div>

                <!-- 三维度选择结构保持 -->
                 <!-- 三维度选择 -->
                <div class="dimension-container">
                  <!-- 语气维度 -->
                  <el-card class="dimension-card">
                    <template #header>
                      <div class="dimension-header">
                        <span class="title-red">1. 语气角度</span>
                        <span class="subtitle">(Tone Perspective)</span>
                      </div>
                    </template>
                    <el-radio-group v-model="clarificationForm.tone">
                      <el-radio label="assertive">
                        <strong>强硬警示型</strong>
                      </el-radio>
                      <el-radio label="neutral">
                        <strong>客观陈述型</strong>
                      </el-radio>
                    </el-radio-group>
                  </el-card>

                  <!-- 内容维度 -->
                  <el-card class="dimension-card">
                    <template #header>
                      <div class="dimension-header">
                        <span class="title-red">2. 内容角度</span>
                        <span class="subtitle">(Content Perspective)</span>
                      </div>
                    </template>
                    <el-radio-group v-model="clarificationForm.content">
                      <el-radio label="detailed">
                        <strong>详尽阐释型</strong>
                      </el-radio>
                      <el-radio label="concise">
                        <strong>精简核心型</strong>
                      </el-radio>
                    </el-radio-group>
                  </el-card>

                  <!-- 策略维度 -->
                  <el-card class="dimension-card">
                    <template #header>
                      <div class="dimension-header">
                        <span class="title-red">3. 策略角度</span>
                        <span class="subtitle">(Strategy Perspective)</span>
                      </div>
                    </template>
                    <el-radio-group v-model="clarificationForm.strategy">
                      <el-radio label="direct">
                        <strong>直接驳斥型</strong>
                      </el-radio>
                      <el-radio label="guided">
                        <strong>引导质疑型</strong>
                      </el-radio>
                    </el-radio-group>
                  </el-card>
                </div>

                <!-- 生成操作 -->
                <div class="action-container">
                  <div style="text-align: center;">
                    <el-button
                      type="danger"
                      :loading="generating"
                      @click="handleGenerate"
                      class="generate-btn"
                    >
                      {{ generating ? '生成中...' : '生成澄清内容' }}
                    </el-button>
                  </div>
                  <!-- 生成结果 -->
                  <div v-if="resultContent" class="result-wrapper">
                    <h3 class="result-title">生成结果</h3>
                    <div class="result-content">
                      <pre>{{ resultContent }}</pre>
                      <el-button
                        type="primary"
                        link
                        icon="DocumentCopy"
                        @click="copyResult"
                        class="copy-btn"
                      />
                    </div>
                  </div>
                </div>
              </el-form>
            </el-dialog>
        </div>
      </div>
    </el-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, reactive } from 'vue'
import { Link } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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

const clarificationDialogVisible = ref(false)
const generating = ref(false)
const resultContent = ref('')
const clarificationForm = reactive({
  coreFact: '',
  tone: '',
  content: '',
  strategy: ''
})
const showClarificationDialog = () => {
  clarificationDialogVisible.value = true
}
const handleGenerate = async () => {
  try {
    // 表单验证
    if (!clarificationForm.coreFact.trim()) {
      ElMessage.error('请填写核心事实陈述')
      return
    }
    if (!clarificationForm.tone || !clarificationForm.content || !clarificationForm.strategy) {
      ElMessage.error('请完成所有维度的选择')
      return
    }

    generating.value = true
    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 1200))
    resultContent.value = generateTemplate()
  } finally {
    generating.value = false
  }
}

const generateTemplate = () => {
  const { tone, content, strategy, coreFact } = clarificationForm
  const templates = {
    assertive_detailed_direct: 
    `【辟谣】针对"淀粉肠究竟由什么做的？如果没有肉，为什么会有肉的香味？"的疑问，我们必须严正指出，这种对淀粉肠成分和风味的猜测存在误导性，甚至可能引发不必要的担忧！
事实真相如下：
    1. 淀粉肠并非"无肉"，但肉类成分高度加工且含量不定，导致难以辨识：
    许多市售淀粉肠中确实会添加肉类，但其含量、种类以及品质因产品而异，且通常用量较少。关键在于其生产工艺：肉类原料首先会被精细搅碎或乳化，随后与大量的淀粉、水、食用油以及多种食品添加剂（如稳定剂、增稠剂、防腐剂等）混合，再经过搅拌、调味、灌装和加热熟化等一系列深度加工。在这一整套复杂的工艺流程下来，肉的原始形态和组织结构已不复存在，其"存在感"变得极低。因此，消费者在食用时，单凭感官极难分辨其中是否含有肉，更遑论判断具体是哪一种肉类或其含量多少。
    2. 浓郁的"肉香味"主要源自食品香精，而非足量的真实肉材：
    淀粉肠特有的、浓郁扑鼻的"肉香味"，其主要贡献者并非产品中可能微量存在的肉类，而是各类肉味香精和香辛料。在淀粉肠的调味环节，食品香精（如猪肉香精、鸡肉香精等）和各种复合调味料的应用是核心技术之一。这些香精能够模拟出逼真的肉香风味，赋予产品诱人的嗅觉和味觉体验，使得即便肉类含量不高，甚至在某些极低成本产品中肉类含量极少或以其他蛋白替代时，依然能呈现出强烈的"肉感"。
总结与警告：
    公众应当清晰、科学地认识到，淀粉肠的"肉香味"很大程度上是现代食品工业调味技术的体现，而非天然肉材的直接反映。其复杂的成分构成和加工方式使得消费者无法轻易判断肉类虚实。因此，切勿被"如果没有肉，为什么会有肉的香味？"这类看似合理的疑问所迷惑，更不要传播此类未经证实或曲解事实的猜测。选择正规厂家、关注产品配料表是更为理性的消费行为。`
    ,
    neutral_concise_guided: `【信息提示】关于淀粉肠的成分和其"肉香味"的来源，我们可以从以下角度思考：当我们品尝淀粉肠时，是否能轻易分辨出其中的肉类呢？通常，由于肉类添加量可能相对较少，且经过了充分的搅碎和混合处理，其原始形态已不易辨认。那么，浓郁的"肉香味"又主要从何而来呢？除了可能含有的肉类，食品香精在现代食品调味中也扮演着重要角色，能够赋予产品特定的风味。`
  }
  return templates[`${tone}_${content}_${strategy}`] || '生成内容示例'
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(resultContent.value)
    ElMessage.success('内容已复制')
  } catch {
    ElMessage.error('复制失败，请手动选择')
  }
}
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

/* 新增澄清对话框样式 */
.clarification-dialog :deep(.el-dialog) {
  background: #fff !important;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  border: 1.5px solid #e0e7ef;
  padding: 0;
  overflow: hidden;
}
.clarification-dialog :deep(.el-dialog__header) {
  border-bottom: 1px solid #ebeef5;
  background: #fff;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding: 24px 32px 16px 32px;
}
.clarification-dialog :deep(.el-dialog__title) {
  color: #303133;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}
.clarification-dialog :deep(.el-dialog__body) {
  background: #f6f7f8;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  padding: 40px 40px 32px 40px;
}
@media (max-width: 900px) {
  .clarification-dialog :deep(.el-dialog__header) {
    padding: 12px 8px 8px 8px;
  }
  .clarification-dialog :deep(.el-dialog__body) {
    padding: 12px 4px 8px 4px;
  }
}

.dimension-container {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.dimension-card {
  flex: 1 1 220px;
  min-width: 220px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 0;
  border: 1.5px solid #e0e7ef;
  transition: box-shadow 0.2s;
}

.dimension-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.dimension-header {
  padding: 12px 16px;
  background: #fff5f5;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title-red {
  color: #f56c6c;
  font-size: 15px;
}

.subtitle {
  color: #999;
  font-size: 12px;
  margin-left: 8px;
}
.option-desc {
  color: #666;
  font-size: 12px;
  margin-top: 4px;
}

.action-container {
  margin-top: 32px;
}

.generate-btn {
  width: 30%;
  height: 36px;
  font-size: 20px;
  font-size: 16px;
  padding: 10px 32px;
  border-radius: 24px;
  background: linear-gradient(90deg, #f56c6c 0%, #f28585 100%);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(245,108,108,0.08);
  transition: background 0.2s;
}

.result-wrapper {
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  position: relative;
}

.result-title {
  color: #f56c6c;
  margin-bottom: 12px;
}

.result-content pre {
  white-space: pre-wrap;
  font-family: inherit;
  margin: 0;
}

.copy-btn {
  position: absolute;
  right: 12px;
  top: 12px;
}

.core-fact-section {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 20px 18px 20px;
  margin-bottom: 24px;
  border: 1.5px solid #e0e7ef;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}
.core-fact-title {
  font-size: 17px;
  font-weight: bold;
  color: #f56c6c;
  margin-bottom: 2px;
  text-align: left;
  width: 100%;
}
.core-fact-desc {
  color: #888;
  font-size: 13px;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
}
.core-fact-input {
  width: 100%;
}
.core-fact-input :deep(.el-textarea__inner) {
  font-size: 15px;
  line-height: 1.7;
  background: #f8fafc;
  border-radius: 8px;
  border: 1.5px solid #e0e7ef;
  box-shadow: none;
  padding: 12px 14px;
  min-height: 80px;
  transition: border 0.2s;
  width: 100%;
  box-sizing: border-box;
}
.core-fact-input :deep(.el-textarea__inner):focus {
  border-color: #f56c6c;
  background: #fff;
}
@media (max-width: 900px) {
  .core-fact-section {
    padding: 12px 6px 8px 6px;
    align-items: stretch;
  }
  .core-fact-title, .core-fact-desc, .core-fact-input {
    width: 100%;
  }
}
</style>