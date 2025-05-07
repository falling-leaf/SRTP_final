export const mockData = {
  default: {
    nodes: [
      {
        id: "O57hxrmN8",
        name: "质疑淀粉肠",
        platform: "weibo",
        url: "https://weibo.com/1683472727/O57hxrmN8",
        time: "2024-03-15 14:29",
        content: "质疑淀粉肠",
        sentiment: "消极",
        isOrigin: true,
        isSmallExplosive: true,
        isExplosive: true,
        isTurningPoint: false,
        importance: "三爆点合一（起点、小爆点、爆点）",
        stats: { repost: 8116, comment: 11000, like: 211000 }
      },
      {
        id: "O55El2c5q",
        name: "原料质疑帖",
        platform: "weibo",
        url: "https://weibo.com/1683472727/O55El2c5q",
        time: "2024-03-15 10:20",
        content: "对淀粉肠的原料质疑",
        sentiment: "消极", 
        isOrigin: true,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "最早溯源节点",
        stats: { repost: 109, comment: 244, like: 1321 }
      },
      {
        id: "t20240315_526627593",
        name: "央广网源头报道",
        platform: "央广网",
        url: "https://food.cnr.cn/trends/20240315/t20240315_526627593.shtml",
        time: "2024-03-15 09:49",
        content: "质疑淀粉肠",
        sentiment: "消极",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "跨平台传播起点",
        stats: { repost: 2000, comment: 1500, like: 5000 }
      },
      // 其他节点数据...
      {
        id: "BV1Du4m1M7L8",
        name: "B站辟谣视频",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1Du4m1M7L8",
        time: "2024-03-15 16:00",
        content: "把淀粉肠干“塌房”的鸡骨泥，可能你已经吃一辈子了。淀粉肠真的是狗粮原料做的吗？传闻中让人闻之色变的鸡骨泥又到底是什么？我们今天来聊一聊，淀粉肠到底还能吃吗",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: true,
        stats: { repost: 31000, comment: 9933, like: 128000 }
      }
    ],
    
    links: [
      {
        source: "t20240315_526627593",
        target: "O55El2c5q",
        relation: "跨平台传播",
        type: "新闻报道引用"
      },
      {
        source: "O55El2c5q", 
        target: "O57hxrmN8",
        relation: "二次传播",
        type: "内容衍生"
      },
      {
        source: "O57hxrmN8",
        target: "BV1Du4m1M7L8",
        relation: "反向传播",
        type: "辟谣响应",
        crossPlatform: true
      },
      // 其他关系数据...
      {
        source: "t20240315_526627593",
        target: "BV1qi421R7K7",
        relation: "用户跨平台传播",
        type: "同一用户多平台发布"
      }
    ]
  },
  315:{
    nodes: [
      // 微博节点
      {
        id: "O57hxrmN8",
        name: "淀粉肠成分质疑帖",
        platform: "weibo",
        url: "https://weibo.com/1683472727/O57hxrmN8",
        time: "2024-03-15 14:29",
        content: "质疑淀粉肠原料安全性",
        sentiment: "消极",
        isOrigin: true,
        isSmallExplosive: true,
        isExplosive: true,
        isTurningPoint: false,
        importance: "三爆点合一节点",
        stats: { repost: 8116, comment: 11000, like: 211000 }
      },
      {
        id: "O55El2c5q",
        name: "首张原料质疑图",
        platform: "weibo",
        url: "https://weibo.com/1683472727/O55El2c5q",
        time: "2024-03-15 10:20",
        content: "淀粉肠原料成分分析图",
        sentiment: "消极",
        isOrigin: true,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "首个图文质疑证据",
        stats: { repost: 109, comment: 244, like: 1321 }
      },
      {
        id: "ObmINe8Q7",
        name: "官方检测报告",
        platform: "weibo",
        url: "https://weibo.com/6809058243/ObmINe8Q7",
        time: "2024-03-16 09:15",
        content: "第三方检测机构报告展示",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 1293, comment: 2083, like: 37000 }
      },
      {
        id: "O5AyU423T",
        name: "摊贩实拍呼吁",
        platform: "weibo",
        url: "https://weibo.com/7452068877/O5AyU423T",
        time: "2024-03-16 11:30",
        content: "街头摊贩实拍+理性消费倡议",
        sentiment: "中性",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: true,
        isTurningPoint: true,
        stats: { repost: 873, comment: 1090, like: 8134 }
      },
      {
        id: "O5ARl2WMb",
        name: "舆情分析长文",
        platform: "weibo",
        url: "https://weibo.com/5044281310/O5ARl2WMb",
        time: "2024-03-18 17:47",
        content: "食品安全舆情传播路径分析",
        sentiment: "中性",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: false,
        stats: { repost: 7, comment: 38, like: 43 }
      },
      {
        id: "O5sqy4XOf",
        name: "商家自证直播",
        platform: "weibo",
        url: "https://weibo.com/7467277921/O5sqy4XOf",
        time: "2024-03-16 15:20",
        content: "商家直播试吃淀粉肠全过程",
        sentiment: "中性",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 341, comment: 2183, like: 58000 }
      },
      {
        id: "O5AOx3zVi",
        name: "董事长直播",
        platform: "weibo",
        url: "https://weibo.com/7575030448/O5AOx3zVi",
        time: "2024-03-17 10:00",
        content: "夫宇董事长生产线直播",
        sentiment: "中性",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 581, comment: 2431, like: 60000 }
      },
      {
        id: "O59aN87Zu",
        name: "网友评论汇总",
        platform: "weibo",
        url: "https://weibo.com/3960991746/O59aN87Zu",
        time: "2024-03-17 14:15",
        content: "高赞质疑评论截图合集",
        sentiment: "消极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 3683, comment: 3582, like: 30000 }
      },
      {
        id: "O5qDtsh0d",
        name: "老人摆摊实况",
        platform: "weibo",
        url: "https://weibo.com/1930723113/O5qDtsh0d",
        time: "2024-03-18 09:30",
        content: "淀粉肠摊贩受冲击实拍",
        sentiment: "消极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 98, comment: 89, like: 4584 }
      },
      {
        id: "O5xWd90U9",
        name: "生产流程公开",
        platform: "weibo",
        url: "https://weibo.com/1711530911/O5xWd90U9",
        time: "2024-03-18 11:00",
        content: "夫宇工厂全流程视频",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 637, comment: 1128, like: 29000 }
      },
      {
        id: "O5z8Zz0A5",
        name: "媒体正面评价",
        platform: "weibo",
        url: "https://weibo.com/1733546074/O5z8Zz0A5",
        time: "2024-03-18 14:30",
        content: "引用济南时报报道截图",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        stats: { repost: 1800, comment: 1200, like: 9800 }
      },
      {
        id: "O5yWnf7VT",
        name: "舆论分化观察",
        platform: "weibo",
        url: "https://weibo.com/7072228400/O5yWnf7VT",
        time: "2024-03-19 10:15",
        content: "正反观点比例分析图",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: false,
        stats: { repost: 900, comment: 700, like: 4500 }
      },
      {
        id: "O5zTJ24Hv",
        name: "事件全回顾",
        platform: "weibo",
        url: "https://weibo.com/2036161077/O5zTJ24Hv",
        time: "2024-03-19 15:00",
        content: "时间线梳理+影响分析",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 1670, comment: 459, like: 8379 }
      },

      // 知乎节点
      {
        id: "648738532",
        name: "骨泥安全性讨论",
        platform: "zhihu",
        url: "https://www.zhihu.com/question/648738532",
        time: "2024-03-16 16:30",
        content: "食品工业原料标准解析",
        sentiment: "消极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 76, comment: 3500, like: 197308 }
      },
      {
        id: "648967411",
        name: "摊贩经济影响",
        platform: "zhihu",
        url: "https://www.zhihu.com/question/648967411",
        time: "2024-03-17 12:00",
        content: "小微商户生存现状调研",
        sentiment: "消极",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        stats: { repost: 800, comment: 1180, like: 608191 }
      },

      // 央广网节点
      {
        id: "t20240315_526627593",
        name: "315专题报道",
        platform: "央广网",
        url: "https://food.cnr.cn/trends/20240315/t20240315_526627593.shtml",
        time: "2024-03-15 09:49",
        content: "央广网北京3月15日消息（记者 邵蓝洁）追求干净配料表的年轻人，扭头就扎在大街小巷的烤肠摊子旁边，把两三块钱一根的烤淀粉肠吃成了“网红零食”。在若干年前，火腿肠追求的是肉多，加淀粉会被嫌弃，甚至国标也以淀粉含量的多寡来定义产品级别。如今，一些消费者转头追求淀粉肠，甚至有人声称，“但凡有一点肉都不爱吃了”。但也有消费者表示，“淀粉肠这价格，有肉才让人害怕”。",
        sentiment: "消极",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "跨平台传播源头",
        stats: { repost: 8500, comment: 6800, like: 42000 }
      },

      // B站节点
      {
        id: "BV1Du4m1M7L8",
        name: "工业流程解析",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1Du4m1M7L8",
        time: "2024-03-17 18:00",
        content: "食品生产线实地探访",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: true,
        stats: { repost: 9800, comment: 12500, like: 358000 }
      },
      {
        id: "BV1uJ4m187ud",
        name: "舆情反转分析",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1uJ4m187ud",
        time: "2024-03-18 14:00",
        content: "媒体传播链可视化分析",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: true,
        stats: { repost: 6500, comment: 8800, like: 285000 }
      },
      {
        id: "BV1qi421R7K7",
        name: "摊主视角记录",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1qi421R7K7",
        time: "2024-03-19 09:30",
        content: "日销数据变化实录",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        stats: { repost: 2200, comment: 1800, like: 45000 }
      },

      // YouTube节点
      {
        id: "fYfpqmwLV00",
        name: "国际传播版",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=fYfpqmwLV00",
        time: "2024-03-18 20:00",
        content: "中英双语事件解读",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: false,
        stats: { repost: 800, comment: 23, like: 93 }
      },
      {
        id: "huyhplC9MLE",
        name: "海外摊主采访",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=huyhplC9MLE",
        time: "2024-03-19 16:00",
        content: "海外中餐从业者访谈",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 1200, comment: 300, like: 2100 }
      }
    ],

    links: [
      // 微博内部传播
      {
        source: "O55El2c5q",
        target: "O57hxrmN8",
        relation: "证据链补充",
        type: "图片素材引用"
      },
      {
        source: "O57hxrmN8",
        target: "O59aN87Zu",
        relation: "舆论发酵",
        type: "评论内容衍生"
      },
      {
        source: "O5AyU423T",
        target: "O5ARl2WMb",
        relation: "观点延伸",
        type: "@提及传播"
      },
      {
        source: "O5sqy4XOf",
        target: "O5AOx3zVi",
        relation: "行业响应",
        type: "企业级互动"
      },
      {
        source: "O5xWd90U9",
        target: "O5z8Zz0A5",
        relation: "媒体报道",
        type: "新闻截图引用"
      },
      {
        source: "O5xWd90U9",
        target: "O5yWnf7VT",
        relation: "舆论监测",
        type: "数据分析引用"
      },

      // 跨平台传播
      {
        source: "t20240315_526627593",
        target: "O55El2c5q",
        relation: "信源追溯",
        type: "跨平台引用",
        crossPlatform: true
      },
      {
        source: "t20240315_526627593",
        target: "O57hxrmN8",
        relation: "二次传播",
        type: "多账号分发",
        crossPlatform: true
      },
      {
        source: "t20240315_526627593",
        target: "ObmINe8Q7",
        relation: "官方回应",
        type: "检测报告引用",
        crossPlatform: true
      },
      {
        source: "t20240315_526627593",
        target: "O5zTJ24Hv",
        relation: "事件回顾",
        type: "报道内容截取",
        crossPlatform: true
      },
      {
        source: "O55El2c5q",
        target: "BV1uJ4m187ud",
        relation: "视频化传播",
        type: "热点词条转化",
        crossPlatform: true
      },
      {
        source: "O55El2c5q",
        target: "fYfpqmwLV00",
        relation: "国际传播",
        type: "多语言改编",
        crossPlatform: true
      },
      {
        source: "BV1Du4m1M7L8",
        target: "fYfpqmwLV00",
        relation: "内容同步",
        type: "多平台发布",
        crossPlatform: true
      },
      {
        source: "BV1qi421R7K7",
        target: "huyhplC9MLE",
        relation: "用户迁移",
        type: "同作者跨平台",
        crossPlatform: true
      },
      {
        source: "O5qDtsh0d",
        target: "648967411",
        relation: "案例引用",
        type: "知乎问题溯源",
        crossPlatform: true
      },
      {
        source: "O5xWd90U9",
        target: "BV1Du4m1M7L8",
        relation: "证据补充",
        type: "生产流程可视化",
        crossPlatform: true
      },
      {
        source: "648738532",
        target: "O5zTJ24Hv",
        relation: "专业背书",
        type: "知乎答案引用",
        crossPlatform: true
      }
    ]
  }
};