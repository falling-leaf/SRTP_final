export const platformColors = {
    weibo: '#3E7CB1',
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
  
export const calculateSpreadIndex = (node) => {
    const repostScore = Math.max(node.stats?.repost, 1) * 40;
    const commentScore = Math.max(node.stats?.comment, 1) * 40;
    const likeScore = Math.max(node.stats?.like, 1) * 20;
    console.log('repostScore:', Math.round(repostScore + commentScore + likeScore));
    return Math.round(repostScore + commentScore + likeScore);
};

  export const customColors = '#FF6F61';  // 根据需要定义你的自定义颜色