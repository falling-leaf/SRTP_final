<template>
<el-container style="padding: 20px;">
    <el-header style="font-size: 24px; font-weight: bold; margin-bottom: 20px; ">
    使用说明
    </el-header>
    <el-main>
    <el-card shadow="hover">
        <div>
        <p>欢迎使用 SRTP-谣言溯源追踪系统！</p>
        <p>此系统主要用于追踪谣言传播路径、分析舆情数据，并为决策提供依据。</p>
        <p>主要功能包括：</p>
        <ul>
            <li>关系图网展示：通过图形展示各节点间的互动和传播关系；</li>
            <li>节点详情查看：点击图中节点查看详细信息；</li>
            <li>数据导出：支持将当前图像导出为图片；</li>
            <li>多平台数据整合：展示来自不同平台的数据。</li>
        </ul>
        <p>使用说明：</p>
        <ul>
            <li>左侧菜单中选择“关系图网”进入主界面；</li>
            <li>点击右上角的“导出图像”按钮保存当前关系图；</li>
            <li>点击图中节点可查看该节点详情；</li>
            <li>点击节点详情中的“展开/关闭”按钮查看全文内容。</li>
        </ul>
        <p>如有疑问，请联系系统管理员。</p>
        </div>
    </el-card>
    </el-main>
</el-container>
</template>

<script setup>
</script>

<style scoped>
p {
margin: 10px 0;
}
ul {
padding-left: 20px;
list-style-type: disc;
}
</style>