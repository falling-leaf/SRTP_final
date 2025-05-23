export const platformColors = {
    weibo: '#3E7CB1',          // 保持微博品牌蓝
    '微博': '#3E7CB1',          // 同步中文key
    wechat: '#07C160',          // 微信品牌绿（原色加强）
    douyin: '#FE2D54',          // 抖音官方红（更鲜艳）
    youtube: '#FF0000',         // YouTube官方红（原色偏灰已修正）
    bilibili: '#ff5d90',        
    '央广网': '#CE0001',        // 深红色（保留官方感）
    zhihu: '#0066FF',           // 知乎官方蓝（替代原橙红色）
    'Instagram': '#E1306C',     // 保持INS品牌玫红
    'Twitter': '#1DA1F2',       // 保持推特品牌蓝
    '中国基金报': '#FF8C00',     // 深橙色（区别于其他红色系）
    '新浪财经': '#FF4500',       // 亮珊瑚橙（原色保留）
    'IT之家': '#007FFF',        // 鲜蓝色（Azure蓝）
    default: '#808080'          // 中性灰（提升对比）
};
  
export const platformNames = {
    weibo: '微博',
    wechat: '微信',
    douyin: '抖音',
    youtube: 'YouTube',
    bilibili: '哔哩哔哩',
    '央广网': '央广网',
    zhihu: '知乎',
    'Instagram': 'Instagram',
    'Twitter': 'Twitter',
    '中国基金报': '中国基金报',
    '新浪财经': '新浪财经',
    'IT之家': 'IT之家'
};
  
export const normalizeSpreadIndices = (nodes) => {
    const scores = nodes.map(node => calculateSpreadIndex(node));
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    return scores.map(score => {
      if (max === min) return 100;
      return ((score - min) / (max - min)) * 100;
    });
}

const getRelatedLinkCount = (nodeId, data) => {
    if (!data || !data.links) return 0;
    return data.links.filter(link => link.source === nodeId || link.target === nodeId).length;
  };

const getAllLinks = (data) => {
    if (!data || !data.links) return 0;
    return data.links.length * 2;
  };

  const getAllNodes = (data) => {
    if (!data || !data.links) return 1;
    return data.nodes.length;
  };

// 计算所有节点的转评赞综合分数
const getAllNodesSpreadScores = (data) => {
    if (!data || !data.nodes) return []; // 如果没有节点数据，返回空数组
  
    return data.nodes.map(node => {
      // 计算每个节点的转评赞综合分数
      const repostScore = (node.stats.repost || 0) * 40;
      const commentScore = (node.stats.comment || 0) * 40;
      const likeScore = (node.stats.like || 0) * 20;
  
      const totalScore = repostScore + commentScore + likeScore;
  
      // 返回每个节点的综合分数
      return {
        id: node.id,
        name: node.name,
        score: totalScore // 确保分数在0-100之间
      };
    });
  };
  

export const calculateSpreadIndex = (node, data) => {
    const linkNum = getRelatedLinkCount(node.id, data);
    console.log(linkNum);
    if (!node || !node.stats) return 0;
    
    const repostScore = (node.stats.repost || 0) * 40;
    const commentScore = (node.stats.comment || 0) * 40;
    const likeScore = (node.stats.like || 0) * 20;
    const totalEdges = getAllLinks(data);
    const ScoreNum = repostScore + commentScore + likeScore;
    const totalScore = getAllNodesSpreadScores(data);
    const totalScoreSum = totalScore.reduce((sum, node) => sum + node.score, 0);

    const totalNodes = getAllNodes(data); // 获取所有节点的数量

      // 获取所有节点的总边数（用于度数归一化）
    const normalizedRepostScore = ScoreNum / totalScoreSum; // 转评赞的归一化（已经归一化到0-100）

    // 计算节点度数的归一化得分（根据该节点的相关链接数量）
    const normalizedLinkScore = totalEdges ? (linkNum / totalEdges) : 0; // 归一化到0-100
    // 计算最终的传播指数，60%来自转评赞的得分，40%来自节点度数的得分
    const finalScore = (normalizedRepostScore * 30) + (normalizedLinkScore * 70);
    return Math.min(Math.round(finalScore - Math.round(100 / totalNodes) + 70), 100); // 确保分数在0-100之间
};

  export const customColors = '#FF6F61';  // 根据需要定义你的自定义颜色