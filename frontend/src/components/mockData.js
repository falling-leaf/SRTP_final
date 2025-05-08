import { time } from "echarts";
import { ref } from "vue";

// Define supported platforms
const supportedPlatforms = [
  "微博",
  "Instagram",
  "Twitter",
  "知乎",
  "bilibili",
  "YouTube",
  "中国基金报",
  "新浪财经",
  "IT之家"
];

export const mockData = {
  default: {
    nodes: [
      {
        id: "O57hxrmN8",
        name: "质疑淀粉肠",
        platform: "weibo",
        url: "https://weibo.com/1683472727/O57hxrmN8",
        time: "2024-03-15 14:29",
        content: '【#淀粉肠到底是什么做的#】#淀粉肠至今还没有专门的国标#虽然名叫"淀粉肠"，但排在配料表第一位的是肉。"有肉，肉很少。"河南一淀粉肠生产厂家工作人员向@央广网 记者透露，"都是用的鸡肉和鸡骨泥，用鸭肉更便宜，大部分都是淀粉"。淀粉肠无专门国标，企业标准里的水和脂肪含量却越来越高。#啄木鸟消费者投诉平台##315骗假不留##淀粉肠塌房#（央广网记者 邵蓝洁）http://t.cn/A6YsALBy啄木鸟消费调查|火爆大街小巷的淀粉肠到底是什么做的？',
        sentiment: "消极",
        isOrigin: false,
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
        content: '【#火爆全网的淀粉肠一根成本五六毛钱#】#淀粉肠配料表第一位居然是肉#全国各地的路边摊烤淀粉肠价格普遍在2-3元/根，在批发市场，淀粉肠价格大约0.5-0.6元/根，工厂生产的成本价则更低。虽然名叫"淀粉肠"，但排在配料表第一位的是肉。"有肉，肉很少。"河南一淀粉肠生产厂家工作人员向央广网记者透露，"都是用的鸡肉和鸡骨泥，用鸭肉更便宜，大部分都是淀粉"。记者从电商平台查询发现，目前出售鸡骨泥的多是经营宠物食品的商家，商家表示，"骨泥不建议人吃，烧烤也不行。"#淀粉肠到底是什么做的##啄木鸟消费者投诉平台##315骗假不留##淀粉肠塌房# （央广网记者 邵蓝洁）',
        sentiment: "消极", 
        isOrigin: false,
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
        stats: { repost: 8500, comment: 6800, like: 42000 }
      },
      {
        id: "BV1Du4m1M7L8",
        name: "bilibili辟谣视频",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1Du4m1M7L8",
        time: "2024-03-15 16:00",
        content: '把淀粉肠干"塌房"的鸡骨泥，可能你已经吃一辈子了。淀粉肠真的是狗粮原料做的吗？传闻中让人闻之色变的鸡骨泥又到底是什么？我们今天来聊一聊，淀粉肠到底还能吃吗',
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
      {
        source: "t20240315_526627593",
        target: "BV1qi421R7K7",
        relation: "用户跨平台传播",
        type: "同一用户多平台发布"
      }
    ]
  },
  '315':{
    nodes: [
      // 微博节点
      {
        id: "O57hxrmN8",
        name: "淀粉肠成分质疑帖",
        platform: "weibo",
        url: "https://weibo.com/1683472727/O57hxrmN8",
        time: "2024-03-15 14:29",
        content: '【#淀粉肠到底是什么做的#】#淀粉肠至今还没有专门的国标#虽然名叫"淀粉肠"，但排在配料表第一位的是肉。"有肉，肉很少。"河南一淀粉肠生产厂家工作人员向@央广网 记者透露，"都是用的鸡肉和鸡骨泥，用鸭肉更便宜，大部分都是淀粉"。淀粉肠无专门国标，企业标准里的水和脂肪含量却越来越高。#啄木鸟消费者投诉平台##315骗假不留##淀粉肠塌房#（央广网记者 邵蓝洁）http://t.cn/A6YsALBy啄木鸟消费调查|火爆大街小巷的淀粉肠到底是什么做的？ http://t.cn/A6YsAq4C央广网的微博视频',
        sentiment: "消极",
        isOrigin: false,
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
        content: '【#火爆全网的淀粉肠一根成本五六毛钱#】#淀粉肠配料表第一位居然是肉#全国各地的路边摊烤淀粉肠价格普遍在2-3元/根，在批发市场，淀粉肠价格大约0.5-0.6元/根，工厂生产的成本价则更低。虽然名叫"淀粉肠"，但排在配料表第一位的是肉。"有肉，肉很少。"河南一淀粉肠生产厂家工作人员向央广网记者透露，"都是用的鸡肉和鸡骨泥，用鸭肉更便宜，大部分都是淀粉"。记者从电商平台查询发现，目前出售鸡骨泥的多是经营宠物食品的商家，商家表示，"骨泥不建议人吃，烧烤也不行。"#淀粉肠到底是什么做的##啄木鸟消费者投诉平台##315骗假不留##淀粉肠塌房# （央广网记者 邵蓝洁）',
        sentiment: "消极",
        isOrigin: false,
        isSmallExplosive: false,
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
        content: "离大谱‼️这些报告，根本证明不了淀粉肠没加「骨泥」？真相到底如何？淀粉肠还能不能放心吃？[苦涩]查阅各种方法，联系多家实验室后，我们的实测结果，终于来了！",
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
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: true,
        stats: { repost: 873, comment: 1090, like: 8134 }
      },
      {
        id: "O5ARl2WMb",
        name: "舆情分析长文",
        platform: "weibo",
        url: "https://weibo.com/5044281310/O5ARl2WMb",
        time: "2024-03-18 17:47",
        content: '【#人民网评少数品牌淀粉肠致行业塌房#：希望大家能理性看待】某些淀粉肠在"3·15"期间被曝光是用鸡骨泥制作后，淀粉肠热度居高不下，有商家直播2小时连吃10根淀粉肠，只为了表达一种观点：希望大家能理性看待。明明叫"淀粉肠"，配料表里居然有肉，而且还不是好肉。如此瞒天过海、以次充好，难免令一众网友集体向淀粉肠说"不"。尽管被曝光的只是部分品牌淀粉肠，但整个行业正遭受严重的信任危机。之所以造成这样的局面，一个非常重要的原因就是，在消费者看来，在小商贩的摊点上，淀粉肠只是一个品类，而不是一种品牌。#淀粉肠小王子发声#',
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
        content: '【#商家直播2小时连吃10根淀粉肠#】 #塌房的淀粉肠还有救吗#？据此前媒体报道，一淀粉肠厂家工作人员称，淀粉肠原料使用了鸡肉和鸡骨泥。"淀粉肠塌房"引发大量网友关注。3月17日，一销售淀粉肠的商家在直播中表示，2小时已经吃了10根淀粉肠了，希望大家能理性看待。@西部决策 http://t.cn/A6TP3LO7西部决策的微博视频 ​​​',
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
        content: '【#淀粉肠生产企业董事长直播吃淀粉肠#】近日，"淀粉肠存在用鸡骨泥代替鸡肉"等乱象引发关注。#路边卖淀粉肠阿姨主动出示声明书#3月16日，淀粉肠知名厂家，山东夫宇食品有限公司辟谣自家生产的淀粉肠含有骨泥。17日，该公司再发通知称：如受网络传闻影响，无法销售的客户，请联系当地拿货代理进行退货，费用由公司承担。#鸡骨泥运用于淀粉肠中不算违规#3月18日，该公司宣布将对淀粉肠厂内生产进行直播。下午直播时，厂家展示相关检测报告同时表明"鸡骨泥0添加"，同时公开展示了厂房、相关设备设施并对生产过程进行介绍。随后，该淀粉肠生产厂家的工作人员、主播及董事长等，均应网友要求现场直播吃淀粉肠，当时在线观看人次显示2万人。对此，你怎么看呢？@白鹿视频 http://t.cn/A6ThFgL1白鹿视频的微博视频',
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
        content: "#淀粉肠塌房#淀粉肠竟然也塌房了，很多都是用的鸡肉和鸡骨泥，根本不适合人吃[裂开]到底还有什么可以吃…… ​​​",
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
        content: '',
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
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
        time: "2024-03-19 15:20",
        content: "淀粉肠塌房的来龙去脉：首先，央视315晚会并没有提到淀粉肠，打假名单中也没有。在315这天报道淀粉肠的是央广网。其次，我家附近就有家鸡骨泥馄饨店，用的就是鸡架搅的馅料，吃起来比猪肉更鲜更香，我吃了很多次，店里忙的不可开交（这两天受影响了），所以这次我是全网第一个站出来反对央广网的偏颇报道。",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 1670, comment: 459, like: 8379 }
      },

      // zhihu节点
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
        time: "2024-03-17 18:34",
        content: '3月15日，央广网曝光了淀粉肠用鸡骨泥代替鸡肉、以次充好、脂肪含量越来越高、无专门国标等乱象。17日，#老人出摊卖淀粉肠无人问津#话题冲上热搜。17日，央广网刊发评论指出，淀粉肠被曝掺有鸡脖泥、鸡架泥等各种边角余料，且"不建议人食用"，让不少人直呼"塌房"，再也不敢吃了。就连街边淀粉肠小摊的生意都明显受到影响。可见，以次充好、以假乱真的产品，被消费者抛弃只是瞬息之事。淀粉肠的"翻车"更是一种警示，商家必须保障产品质量，确保安全和卫生。同时相关部门更要加强质量监管，设置明晰的质量标准，从而维护消费者权益，保障行业健康发展。只有诚信经营，方能行稳致远。',
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
        name: "央广网源头报道",
        platform: "央广网",
        url: "https://food.cnr.cn/trends/20240315/t20240315_526627593.shtml",
        time: "2024-03-15 09:49",
        content: '央广网北京3月15日消息（记者 邵蓝洁）追求干净配料表的年轻人，扭头就扎在大街小巷的烤肠摊子旁边，把两三块钱一根的烤淀粉肠吃成了"网红零食"。在若干年前，火腿肠追求的是肉多，加淀粉会被嫌弃，甚至国标也以淀粉含量的多寡来定义产品级别。如今，一些消费者转头追求淀粉肠，甚至有人声称，"但凡有一点肉都不爱吃了"。但也有消费者表示，"淀粉肠这价格，有肉才让人害怕"。',
        sentiment: "消极",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "跨平台传播起点",
        stats: { repost: 8500, comment: 6800, like: 42000 }
      },

      // bilibili节点
      {
        id: "BV1Du4m1M7L8",
        name: "工业流程解析",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1Du4m1M7L8",
        time: "2024-03-17 18:00",
        content: "淀粉肠真的是狗粮原料做的吗？传闻中让人闻之色变的鸡骨泥又到底是什么？我们今天来聊一聊，淀粉肠到底还能吃吗？",
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
        content: "“骨泥淀粉肠”焦虑背后，我们该澄清哪些信息？",
        sentiment: "积极",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        stats: { repost: 6500, comment: 8800, like: 285000 }
      },
      {
        id: "BV1qi421R7K7",
        name: "摊主视角记录",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1qi421R7K7",
        time: "2024-03-19 09:30",
        content: "聊聊淀粉肠塌房，人生第一份生意倒闭了！",
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
        type: "zhihu问题溯源",
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
        type: "zhihu答案引用",
        crossPlatform: true
      }
    ]
  },
  'visionPro': {
    nodes: [
      {
        id: "O0Pc0cztO",
        name: "苹果Vision Pro遭遇退货潮",
        platform: "weibo",
        url: "https://weibo.com/2318910945/O0Pc0cztO",
        content: '#果粉们开始大批退货VisionPro#【被曝退货！苹果Vision Pro"翻车"？槽点来了】据中国基金报，被苹果CEO库克喻为"明日科技"的苹果首款头显Vision Pro，与用户的蜜月期似乎告一段落。#扎克伯格测评苹果VisionPro#2月16日是Vision Pro尝鲜期到期日。近期，不少用户在各类平台上"吐槽"Vision Pro的实际使用感受，更有用户在尝鲜期临近之时选择退货。作为苹果在头显领域的对手之一，Meta CEO扎克伯格甚至发布了一段大约3分30秒长的视频，对Vision Pro作出"测评"，公开将Vision Pro与自家Quest 3作对比。综合来看，Vision Pro的"槽点"主要集中在：佩戴体验不舒适、感到头痛、眼睛疲劳等。亦有用户认为，没有足够的多样化体验和内容来证明其价值。 ',
        imageSummary: "Vison Pro资料图",
        sentiment: "消极",
        audiencePreference: "消极-发展没有那么成熟",
        relatedEvents: "扎克伯格测评苹果VisionPro",
        secondaryEvents: "",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-16 09:05",
        stats: { repost: 226, comment: 727, like: 8813 }
      },
      {
        id: "O0TJzsj1K",
        name: "Vision Pro应用生态不成熟",
        platform: "weibo",
        url: "https://weibo.com/5244183267/O0TJzsj1K",
        content: "#果粉们开始大批退货VisionPro#应用生态不成熟+贵，毕竟只是一个初代产品，谈不上划时代，相关概念在节前别人没崩的时候就一路先崩就是答案 ​​​",
        imageSummary: "微博热点的截图",
        sentiment: "消极",
        audiencePreference: "消极-还需继续努力",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-16 20:39",
        stats: { repost: 6, comment: 9, like: 85 }
      },
      {
        id: "O0LtdcC2B",
        name: "Vision Pro首批用户退货潮",
        platform: "weibo",
        url: "https://weibo.com/5393135816/O0LtdcC2B",
        content: "#果粉们开始大批退货VisionPro#首批苹果Vision Pro用户出现退货潮、主要体现在设备重、对眼睛不好、容易头疼、缺乏必需应用程序以及不方便携带等。舒适度、头痛和眼睛疲劳。 ​​​",
        imageSummary: "Twitter截图，内容为Vision Pro使用后的不适",
        sentiment: "消极",
        audiencePreference: "消极-使用局限性很大",
        isOrigin: true,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-15 23:37",
        stats: { repost: 34, comment: 79, like: 334 }
      },
      {
        id: "O0As0gA7A",
        name: "Vision Pro被批不值3500美元",
        platform: "weibo",
        url: "https://weibo.com/1640337222/O0As0gA7A",
        content: "【#苹果VisionPro遭遇退货潮#：被批设计笨拙、视觉效果差、#苹果VisionPro被批不值3500美元#】备受期待的苹果MR头显Vision Pro上市还不到两周时间，一些买家对这款未来派产品的第一印象似乎变得糟糕了，他们表示将退还这款售价3500美元的设备。还有用户 表示，该头显太重；另一个槽点是视觉质量问题。#扎克伯格狂踩苹果VisionPro#",
        imageSummary: "用户头戴Vision Pro体验",
        sentiment: "消极",
        audiencePreference: "中性-小编集体评测完了",
        relatedEvents: "扎克伯格测评苹果VisionPro",
        secondaryEvents: "",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-14 19:33",
        stats: { repost: 63, comment: 423, like: 3845 }
      },
      {
        id: "O0IDDfQga",
        name: "个人购买意愿",
        platform: "weibo",
        url: "https://weibo.com/2827386331/O0IDDfQga",
        content: "表述个人购买意愿",
        imageSummary: "环球市场播报帖子截图",
        sentiment: "中性",
        audiencePreference: "中性-评测和日常有多脱钩",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-15 17:22",
        stats: { repost: 45, comment: 319, like: 967 }
      },
      {
        id: "O0J1C4eFo",
        name: "Vision Pro初代产品缺点",
        platform: "weibo",
        url: "https://weibo.com/2194868354/O0J1C4eFo",
        content: "#苹果VisionPro遭遇退货潮# 初代产品还是缺点更多些，退货其实也算是给苹果的一次「加油」方式[微笑]，苹果又不是没钱~~ ​​​",
        imageSummary: "环球市场播报帖子的图片和截图",
        sentiment: "积极",
        audiencePreference: "中性-逐步成熟",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-15 17:23",
        stats: { repost: 45, comment: 319, like: 967 }
      },
      {
        id: "O0IDzAhRo",
        name: "Vision Pro退货潮",
        platform: "weibo",
        url: "https://weibo.com/1769228100/O0IDzAhRo",
        content: "#苹果VisionPro遭遇退货潮#，东西一买，视频一拍，流量一赚，产品一退，一毛不花[喵喵]好哇好哇，互联网算是被有些人玩明白了[允悲] ​​​",
        imageSummary: "环球市场播报帖子截图",
        sentiment: "中性",
        audiencePreference: "中性-现在的人消费观念变了很理性",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-15 16:24",
        stats: { repost: 23, comment: 61, like: 163 }
      },
      {
        id: "O0JNYw9Nd",
        name: "外国博主退货",
        platform: "weibo",
        url: "https://weibo.com/3915081484/O0JNYw9Nd",
        content: "看到外国博主退货",
        imageSummary: "Luke Miani推特上退货帖子的截图",
        sentiment: "中性",
        audiencePreference: "消极-使用体验不好",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-2-15 19:22",
        stats: { repost: 14, comment: 122, like: 296 }
      },
      {
        id: "O0QMGynEs",
        name: "Vision Pro大规模退货",
        platform: "weibo",
        url: "https://weibo.com/1959852871/O0QMGynEs",
        content: "【苹果Vision Pro大规模退货】拍完测评聊完骚就退货了呗😏谁都不傻花几万买个半成品🤪#苹果VisionPro遭遇退货潮# ​​​",
        imageSummary: "微博热点和环球市场的截图",
        sentiment: "消极",
        audiencePreference: "中性-需要不断迭代",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: false,
        importance: "引用了多个帖子",
        time:"2024-02-18",
        stats: { repost: 4, comment: 5, like: 8 }
      },
      {
        id: "O0SYh1OWk",
        name: "产品迭代发展脉络",
        platform: "weibo",
        url: "https://weibo.com/5147769836/O0SYh1OWk",
        content: "客观分析产品迭代的发展脉络",
        imageSummary: "自己写的zhihu截图",
        sentiment: "中性",
        audiencePreference: "消极-一时之间很难取得效果",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-18",
        stats: { repost: 2, comment: 30, like: 10 }
      },
      {
        id: "O1auuuyJR",
        name: "Vision Pro未出现大规模退货潮",
        platform: "weibo",
        url: "https://weibo.com/1279746217/O1auuuyJR",
        content: "Vision Pro 展品",
        imageSummary: "Vision Pro展品",
        sentiment: "中性",
        audiencePreference: "消极-使用过程中感到不适",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: true,
        importance: "",
        time:"2024-02-18",
        stats: { repost: 4, comment: 1, like: 2 }
      },
      {
        id: "O1h5fn9bt",
        name: "现象不符合常理",
        platform: "weibo",
        url: "https://weibo.com/6046860545/O1h5fn9bt",
        content: "认为现象不符合常理",
        imageSummary: "引用截图和汽车设计巨幕",
        sentiment: "中性",
        audiencePreference: "中性-需要理性看待",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: true,
        importance: "",
        time:"2024-02-14",
        stats: { repost: 1004, comment: 104, like: 1077 }
      },
      {
        id: "C3TkhmivNzt",
        name: "Vision Pro体验分享",
        platform: "Instagram",
        url: "https://www.instagram.com/p/C3TkhmivNzt/",
        content: "分享Vision Pro的体验并拉踩",
        imageSummary: "个人说明视频",
        sentiment: "消极",
        audiencePreference: "消极-使用体验没有自家产品好",
        relatedEvents: "扎克伯格测评苹果VisionPro",
        secondaryEvents: "",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-14",
        stats: { repost: 9341, comment: 104395, like: 284000 }
      },
      {
        id: "1757908374711406905",
        name: "正在退货",
        platform: "Twitter",
        url: "https://x.com/LukeMiani/status/1757908374711406905",
        content: "我正在退货",
        imageSummary: "Vision Pro包装",
        sentiment: "中性",
        audiencePreference: "中性-还有待改进",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-15 7:23",
        stats: { repost: 89, comment: 101, like: 3010 }
      },
      {
        id: "3397604613",
        name: "数码博主蹭苹果退货",
        platform: "zhihu",
        url: "https://www.zhihu.com/question/644419638/answer/3397604613",
        content: "有人说这是数码博主蹭苹果的 14 天无理由退换货，发完评测退回了。 也许有个别是，但我认为绝大部分还是因为体验问题，毕竟抢首发的，大部分时候是热爱且不差钱的。 从发布到现在陆陆续续看一些评测，目前已经有点解毒了，最大的一个问题是长时间佩戴的问题，这个「长时间」要打引号，是指一两个小时以上。",
        imageSummary: "其他人的测评",
        sentiment: "中性",
        audiencePreference: "消极-并没有那么惊艳",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-16 18:13",
        stats: { repost: 200, comment: 241, like: 1417 }
      },
      {
        id: "3397580649",
        name: "优缺点分析",
        platform: "zhihu",
        url: "https://www.zhihu.com/question/644419638/answer/3397580649",
        content: "优缺点分析",
        imageSummary: "扎克伯格测评苹果VisionPro图片，测试图片",
        sentiment: "中性",
        audiencePreference: "中性-存在优缺点",
        relatedEvents: "扎克伯格测评苹果VisionPro",
        secondaryEvents: "",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-16 10:05",
        stats: { repost: 5, comment: 30, like: 795 }
      },
      {
        id: "3397729754",
        name: "Vision Pro退货潮",
        platform: "zhihu",
        url: "https://www.zhihu.com/question/644419638/answer/3397729754",
        content: "北京时间2月14日，上市不到两周时间，苹果公司的首款头显Vision Pro已经开始陆续接到用户的退货。今年2月2日，当Vision Pro正式在美国发售时，不少果粉天不亮就在当地的苹果零售店外排队，希望抢先买到这款头显。许多看过Vision Pro演示的人表示，该设备的空间计算能力让他们为之惊叹。然而，还不到半个月，这种美好的第一印象已经消失殆尽。一些买家表示，他们将会退货。一些早期使用者反映，Vision Pro设计笨重、视觉效果不佳以及缺乏应用场景，不值得他们花上3500美元(约合2.5万元人民币)。",
        imageSummary: "影视飓风的评测",
        sentiment: "中性",
        audiencePreference: "中性- 感觉惊艳但是需要理性看待",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-19 19:49",
        stats: { repost: 410, comment: 1000, like: 210000 }
      },
      {
        id: "682877840",
        name: "存在的问题",
        platform: "zhihu",
        url: "https://zhuanlan.zhihu.com/p/682877840",
        content: "存在的问题",
        imageSummary: "微博话题截图",
        sentiment: "中性",
        audiencePreference: "中性-可能没有那么好用",
        isOrigin: false,
        isSmallExplosive: false,
        isExplosive: false,
        isTurningPoint: false,
        importance: "引用了微博话题",
        time:"2024-02-19 19:49",
        stats: { repost: 0, comment: 1, like: 1 }
      },
      {
        id: "BV1EJ4m1t7YS",
        name: "Vision Pro持续佩戴体验",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1EJ4m1t7YS/",
        content: "跨越数万公里，持续30小时，持续佩戴Vision Pro体验如何？不要摘挑战最终谁会胜出？欢迎收看本期视频，如果你喜欢的话，请多多支持我们，并将视频分享给朋友们看看！",
        imageSummary: "使用体验",
        sentiment: "中性",
        audiencePreference: "中性-需要理性看待",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-06 22:19:04",
        stats: { repost: 61000, comment: 14137, like: 381000 }
      },
      {
        id: "BV1r4421F7QY",
        name: "Vision Pro现退货潮",
        platform: "bilibili",
        url: "https://www.bilibili.com/video/BV1r4421F7QY/",
        content: '一年前，大家都嘲笑扎克伯格，说他白白花了数十亿建"元宇宙"，现在苹果的VR头盔出来了，结果比预期还糟 😬💸3500美元的价格，功能却有限，简直要被苹果坑惨了 😤📉扎克伯格说得对，未来是开放的，meta可能会成为VR的领头羊 🌟👀普通人其实对头戴式VR并不感兴趣，这让我感到有点悲观 😔🎮',
        imageSummary: "Vision Pro现退货潮，扎克伯格下场拉踩",
        sentiment: "中性",
        audiencePreference: "中性-主要是博主的原因",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-16 11:45:10",
        stats: { repost: 75, comment: 630, like: 576 }
      },
      {
        id: "wSrkmtFKLZc",
        name: "Vision Pro重量负担",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=wSrkmtFKLZc",
        content: 'Vision Pro的重量是一种"显而易见"的负担',
        imageSummary: "",
        sentiment: "消极",
        audiencePreference: "消极-不值得购买",
        isOrigin: true,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-06",
        stats: { repost: 50, comment: 30, like: 133 }
      },
      {
        id: "6dHBs08vdrg",
        name: "Vision Pro缺乏多样化体验",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=6dHBs08vdrg",
        content: "Vision Pro目前还没有足够多的多样化体验和多样化内容",
        imageSummary: "",
        sentiment: "消极",
        audiencePreference: "消极-内容太少",
        isOrigin: true,
        isSmallExplosive: false,
        isExplosive: true,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-05",
        stats: { repost: 50, comment: 117, like: 195 }
      },
      {
        id: "AR2024021600095376780026",
        name: "Vision Pro槽点",
        platform: "中国基金报",
        url: "https://www.chnfund.com/article/AR2024021600095376780026",
        content: 'Vision Pro的"槽点"主要集中在：佩戴体验不舒适、感到头痛、眼睛疲劳等。亦有用户认为，没有足够的多样化体验和内容来证明其价值。',
        imageSummary: "Vision Pro展品",
        sentiment: "消极",
        audiencePreference: "",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024-02-16 00:05",
        stats: { repost: 1000, comment: 0, like: 0 }
      },
      {
        id: "新浪财经",
        name: "Vision Pro遭遇退货潮",
        platform: "新浪财经",
        url: "https://finance.sina.com.cn/stock/usstock/c/2024-02-14/doc-inahziah0790510.shtml?cref=cj",
        content: "Vision Pro遭遇了退货潮。其中的一个主要原因是：它的设计太笨重。",
        imageSummary: "用户头戴Vision Pro体验",
        sentiment: "消极",
        audiencePreference: "",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: false,
        importance: "",
        time:"2024年02月14日 19:34",
        stats: { repost: 1000, comment: 282, like: 4619 }
      },
      {
        id: "IT之家",
        name: "Vision Pro退货率未超出预期",
        platform: "IT之家",
        url: "https://www.ithome.com/0/750/655.htm",
        time: '2024/2/18 9:48:26',
        content: "Vision Pro 的退货率并未超出预期，也没有出现大规模退货潮",
        imageSummary: "",
        sentiment: "中性",
        audiencePreference: "",
        isOrigin: false,
        isSmallExplosive: true,
        isExplosive: false,
        isTurningPoint: true,
        importance: "",
        stats: { repost: 1000, comment: 0, like: 1000 }
      }
    ],
    links: [
      {
        source: "O0TJzsj1K",
        target: "O0Pc0cztO",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0IDDfQga",
        target: "O0As0gA7A",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0J1C4eFo",
        target: "O0As0gA7A",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0IDzAhRo",
        target: "O0As0gA7A",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0JNYw9Nd",
        target: "1757908374711406905",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0QMGynEs",
        target: "O0Pc0cztO",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0QMGynEs",
        target: "O0As0gA7A",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "O0SYh1OWk",
        target: "3060746112",
        relation: "引用截图, 从儿子帖子的文本内容，以及儿子账号名与父亲账号名的对比，能够知道这是：同实体持有账号间发生的跨平台传播",
        type: "传播"
      },
      {
        source: "O1h5fn9bt",
        target: "O1auuuyJR",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "3397580649",
        target: "C3TkhmivNzt",
        relation: "引用截图, 从儿子帖子的文本内容也能够定位出跨平台传播关系",
        type: "传播"
      },
      {
        source: "3397604613",
        target: "BV1EJ4m1t7YS",
        relation: "引用截图, 从儿子帖子的文本内容也能够帮助推测出传播关系",
        type: "传播"
      },
      {
        source: "3397729754",
        target: "BV1EJ4m1t7YS",
        relation: "引用截图",
        type: "传播"
      },
      {
        source: "BV1r4421F7QY",
        target: "C3TkhmivNzt",
        relation: "引用视频",
        type: "传播"
      },
      {
        source: "O0Pc0cztO",
        target: "C3TkhmivNzt",
        relation: "引用截图, 从儿子帖子的文本内容也能够帮助推测出传播关系",
        type: "传播"
      },
      {
        source: "O0Pc0cztO",
        target: "AR2024021600095376780026",
        relation: "引用截图, 儿子直接点明了父亲所在平台，且儿子帖内容和父亲帖内容高度相似",
        type: "传播"
      },
      {
        source: "O0As0gA7A",
        target: "新浪财经",
        relation: "引用截图, 儿子帖子的内容中直接包含了父亲帖子URL，且儿子帖子的文本内容和父亲帖子高度相似",
        type: "传播"
      },
      {
        source: "O1auuuyJR",
        target: "IT之家",
        relation: "引用截图, 儿子直接点明了父亲所在平台，且儿子帖内容和父亲帖内容高度相似",
        type: "传播"
      },
      {
        source: "新浪财经",
        target: "C3TkhmivNzt",
        relation: "儿子直接点明了关键人物",
        type: "传播"
      },
      {
        source: "新浪财经",
        target: "wSrkmtFKLZc",
        relation: "儿子直接点明了父亲所在平台",
        type: "传播"
      },
      {
        source: "新浪财经",
        target: "6dHBs08vdrg",
        relation: "儿子直接点明了父亲所在平台",
        type: "传播"
      }
    ]
  }
};