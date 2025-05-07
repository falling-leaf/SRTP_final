export const platformColors = {
    weibo: '#3E7CB1',
    '微博': '#3E7CB1',
    wechat: '#20d86e',
    douyin: '#FF6F61',
    youtube: '#2A3132',
    bilibili: '#ff5d90',
    '央广网': 'red',
    zhihu: '#FF6F61',
    default: '#A9A9A9'
};
  
export const platformNames = {
    weibo: '微博',
    wechat: '微信',
    douyin: '抖音',
    youtube: 'YouTube',
    bilibili: '哔哩哔哩',
    '央广网': '央广网',
    zhihu: '知乎'
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

export const calculateSpreadIndex = (node) => {
    if (!node || !node.stats) return 0;
    
    const repostScore = (node.stats.repost || 0) * 40;
    const commentScore = (node.stats.comment || 0) * 40;
    const likeScore = (node.stats.like || 0) * 20;
    
    const totalScore = repostScore + commentScore + likeScore;
    return Math.min(Math.round(totalScore / 100), 100);
};

  export const customColors = '#FF6F61';  // 根据需要定义你的自定义颜色