"use strict";
// 六单元十八课：每课按棋盘容量分组。play 是盘面需要选出的字，word 是完整弹窗词条。
const VOCAB_LESSONS = [
  {
    "unit": 1,
    "lesson": 1,
    "title": "我的新同学",
    "challenges": [
      [
        {
          "word": "惹",
          "pinyin": "rě",
          "cn": "招来、引起（麻烦等）；也可指使人生气。",
          "en": "to cause or invite trouble; to provoke",
          "play": "惹"
        },
        {
          "word": "两肋插刀",
          "pinyin": "liǎng lèi chā dāo",
          "cn": "形容为了朋友愿意冒险、付出很大牺牲。",
          "en": "to make great sacrifices for a friend",
          "play": "两肋插刀"
        },
        {
          "word": "赵",
          "pinyin": "zhào",
          "cn": "常见姓氏之一。",
          "en": "Zhao (a Chinese surname)",
          "play": "赵"
        },
        {
          "word": "科技",
          "pinyin": "kē jì",
          "cn": "科学和技术。",
          "en": "science and technology",
          "play": "科技"
        },
        {
          "word": "小事一桩",
          "pinyin": "xiǎo shì yī zhuāng",
          "cn": "很容易处理的小事。",
          "en": "a piece of cake; no big deal",
          "play": "小事一桩"
        },
        {
          "word": "性格",
          "pinyin": "xìng gé",
          "cn": "一个人经常表现出的脾气、态度和行为特点。",
          "en": "personality; character",
          "play": "性格"
        },
        {
          "word": "得罪",
          "pinyin": "dé zuì",
          "cn": "说话或做事使别人不高兴。",
          "en": "to offend someone",
          "play": "得罪"
        },
        {
          "word": "争辩",
          "pinyin": "zhēng biàn",
          "cn": "为了不同意见互相争论。",
          "en": "to argue; to dispute",
          "play": "争辩"
        },
        {
          "word": "冤枉",
          "pinyin": "yuān wang",
          "cn": "没有根据地责怪别人；也指受到不公平的指责。",
          "en": "to accuse unfairly; to feel wronged",
          "play": "冤枉"
        }
      ],
      [
        {
          "word": "淘气",
          "pinyin": "táo qì",
          "cn": "顽皮、爱捣蛋。",
          "en": "naughty; mischievous",
          "play": "淘气"
        },
        {
          "word": "来者不拒",
          "pinyin": "lái zhě bù jù",
          "cn": "有人来请求帮忙或参与，都不拒绝。",
          "en": "to welcome everyone; turn no one away",
          "play": "来者不拒"
        },
        {
          "word": "口头禅",
          "pinyin": "kǒu tóu chán",
          "cn": "一个人经常挂在嘴边的话。",
          "en": "catchphrase; a frequently used expression",
          "play": "口头禅"
        },
        {
          "word": "人缘",
          "pinyin": "rén yuán",
          "cn": "与别人相处的关系；人缘好指受人欢迎。",
          "en": "how well someone gets along with others; popularity",
          "play": "人缘"
        },
        {
          "word": "直率",
          "pinyin": "zhí shuài",
          "cn": "说话坦白、直接，不拐弯抹角。",
          "en": "frank; straightforward",
          "play": "直率"
        },
        {
          "word": "别扭",
          "pinyin": "biè niu",
          "cn": "感觉不自然、不自在；也指意见不合。",
          "en": "awkward; uncomfortable; at odds",
          "play": "别扭"
        },
        {
          "word": "即使",
          "pinyin": "jí shǐ",
          "cn": "表示假设或让步，相当于“就算”。",
          "en": "even if; even though",
          "play": "即使"
        },
        {
          "word": "推荐",
          "pinyin": "tuī jiàn",
          "cn": "向别人介绍值得选择的人、书或事物。",
          "en": "to recommend",
          "play": "推荐"
        }
      ]
    ]
  },
  {
    "unit": 1,
    "lesson": 2,
    "title": "一个蛋两个蛋三个蛋",
    "challenges": [
      [
        {
          "word": "瞬间",
          "pinyin": "shùn jiān",
          "cn": "非常短的一段时间。",
          "en": "an instant; a split second",
          "play": "瞬间"
        },
        {
          "word": "兴致勃勃",
          "pinyin": "xìng zhì bó bó",
          "cn": "兴趣很浓，显得十分兴奋。",
          "en": "full of enthusiasm; in high spirits",
          "play": "兴致勃勃"
        },
        {
          "word": "狼狈",
          "pinyin": "láng bèi",
          "cn": "处境尴尬，样子难堪。",
          "en": "in an embarrassing mess; in a sorry state",
          "play": "狼狈"
        },
        {
          "word": "赌气",
          "pinyin": "dǔ qì",
          "cn": "因为生气或不服气而任性行事。",
          "en": "to act out of spite; to sulk",
          "play": "赌气"
        },
        {
          "word": "嚷",
          "pinyin": "rǎng",
          "cn": "大声喊叫；也可指吵闹。",
          "en": "to shout; to yell",
          "play": "嚷"
        },
        {
          "word": "拉扯",
          "pinyin": "lā che",
          "cn": "互相拉住、用力拉。",
          "en": "to pull; to tug",
          "play": "拉扯"
        },
        {
          "word": "手足无措",
          "pinyin": "shǒu zú wú cuò",
          "cn": "慌张得不知道该怎么办。",
          "en": "at a loss; not knowing what to do",
          "play": "手足无措"
        }
      ],
      [
        {
          "word": "捣乱",
          "pinyin": "dǎo luàn",
          "cn": "故意制造麻烦，扰乱正常活动。",
          "en": "to make trouble; to disrupt",
          "play": "捣乱"
        },
        {
          "word": "粘",
          "pinyin": "zhān",
          "cn": "黏附在物体上；课文中指蛋液粘在身上。",
          "en": "to stick; to cling",
          "play": "粘"
        },
        {
          "word": "蛋液",
          "pinyin": "dàn yè",
          "cn": "鸡蛋内流动的蛋清和蛋黄。",
          "en": "liquid egg; egg contents",
          "play": "蛋液"
        },
        {
          "word": "讥讽",
          "pinyin": "jī fěng",
          "cn": "用尖刻的话嘲笑别人。",
          "en": "to mock; to ridicule",
          "play": "讥讽"
        },
        {
          "word": "小心翼翼",
          "pinyin": "xiǎo xīn yì yì",
          "cn": "非常小心，生怕出错。",
          "en": "very carefully; cautiously",
          "play": "小心翼翼"
        },
        {
          "word": "荧光笔",
          "pinyin": "yíng guāng bǐ",
          "cn": "用来标记文字、颜色醒目的笔。",
          "en": "highlighter",
          "play": "荧光笔"
        },
        {
          "word": "抵挡",
          "pinyin": "dǐ dǎng",
          "cn": "用力量挡住或反抗。",
          "en": "to resist; to ward off",
          "play": "抵挡"
        }
      ]
    ]
  },
  {
    "unit": 1,
    "lesson": 3,
    "title": "张老师“审案”",
    "challenges": [
      [
        {
          "word": "审案",
          "pinyin": "shěn àn",
          "cn": "审理案件，查清是非。",
          "en": "to hear or try a case",
          "play": "审案"
        },
        {
          "word": "律师",
          "pinyin": "lǜ shī",
          "cn": "为当事人提供法律帮助的人。",
          "en": "lawyer",
          "play": "律师"
        },
        {
          "word": "振振有词",
          "pinyin": "zhèn zhèn yǒu cí",
          "cn": "说话似乎很有道理，不断为自己辩解。",
          "en": "to argue insistently as if one were right",
          "play": "振振有词"
        },
        {
          "word": "心虚",
          "pinyin": "xīn xū",
          "cn": "因为做错事或缺乏把握而不安。",
          "en": "to feel guilty; to lack confidence",
          "play": "心虚"
        },
        {
          "word": "哑口无言",
          "pinyin": "yǎ kǒu wú yán",
          "cn": "被问得说不出话来。",
          "en": "left speechless; unable to answer",
          "play": "哑口无言"
        },
        {
          "word": "判决",
          "pinyin": "pàn jué",
          "cn": "法官对案件作出裁定。",
          "en": "a court judgment; to pass judgment",
          "play": "判决"
        },
        {
          "word": "泄",
          "pinyin": "xiè",
          "cn": "漏出；课文“泄了气”指失去勇气或精神。",
          "en": "to leak; to lose spirit (泄气)",
          "play": "泄"
        }
      ]
    ]
  },
  {
    "unit": 2,
    "lesson": 1,
    "title": "世界各地的新年风俗",
    "challenges": [
      [
        {
          "word": "风俗",
          "pinyin": "fēng sú",
          "cn": "一个地方长期形成的生活习惯。",
          "en": "custom; tradition",
          "play": "风俗"
        },
        {
          "word": "辞旧迎新",
          "pinyin": "cí jiù yíng xīn",
          "cn": "告别过去的一年，迎接新的一年。",
          "en": "to bid farewell to the old and welcome the new",
          "play": "辞旧迎新"
        },
        {
          "word": "厄运",
          "pinyin": "è yùn",
          "cn": "不幸的遭遇或命运。",
          "en": "bad luck; misfortune",
          "play": "厄运"
        },
        {
          "word": "碗碟",
          "pinyin": "wǎn dié",
          "cn": "吃饭时使用的碗和盘子。",
          "en": "bowls and plates",
          "play": "碗碟"
        },
        {
          "word": "兆头",
          "pinyin": "zhào tou",
          "cn": "某件事发生前出现的迹象。",
          "en": "sign; omen",
          "play": "兆头"
        },
        {
          "word": "遥远",
          "pinyin": "yáo yuǎn",
          "cn": "距离很远；也可以形容时间久远。",
          "en": "far away; distant",
          "play": "遥远"
        },
        {
          "word": "万事大吉",
          "pinyin": "wàn shì dà jí",
          "cn": "一切事情都顺利、圆满。",
          "en": "everything goes well; all is well",
          "play": "万事大吉"
        },
        {
          "word": "元旦",
          "pinyin": "yuán dàn",
          "cn": "公历新年的第一天，即一月一日。",
          "en": "New Year's Day (1 January)",
          "play": "元旦"
        }
      ],
      [
        {
          "word": "葡萄",
          "pinyin": "pú tao",
          "cn": "一种成串生长、可食用的水果。",
          "en": "grape",
          "play": "葡萄"
        },
        {
          "word": "象征",
          "pinyin": "xiàng zhēng",
          "cn": "用具体事物表示某种意义；也指这种标志。",
          "en": "to symbolize; a symbol",
          "play": "象征"
        },
        {
          "word": "燃放",
          "pinyin": "rán fàng",
          "cn": "点燃烟花、鞭炮等使其放响。",
          "en": "to set off fireworks or firecrackers",
          "play": "燃放"
        },
        {
          "word": "瓶瓶罐罐",
          "pinyin": "píng píng guàn guàn",
          "cn": "各种瓶子和罐子。",
          "en": "bottles and jars",
          "play": "瓶瓶罐罐"
        },
        {
          "word": "前夕",
          "pinyin": "qián xī",
          "cn": "某个重要日子到来之前；也可指前一天晚上。",
          "en": "the eve of; just before",
          "play": "前夕"
        },
        {
          "word": "预示",
          "pinyin": "yù shì",
          "cn": "事先显示将要发生的事。",
          "en": "to indicate beforehand; to foreshadow",
          "play": "预示"
        },
        {
          "word": "忙碌",
          "pinyin": "máng lù",
          "cn": "事情多，没有空闲。",
          "en": "busy",
          "play": "忙碌"
        },
        {
          "word": "恭敬",
          "pinyin": "gōng jìng",
          "cn": "对长辈或他人尊敬、有礼貌。",
          "en": "respectful",
          "play": "恭敬"
        }
      ]
    ]
  },
  {
    "unit": 2,
    "lesson": 2,
    "title": "团圆饭",
    "challenges": [
      [
        {
          "word": "圣诞",
          "pinyin": "shèng dàn",
          "cn": "圣诞节的简称；庆祝耶稣诞生的节日。",
          "en": "Christmas",
          "play": "圣诞"
        },
        {
          "word": "格格不入",
          "pinyin": "gé gé bù rù",
          "cn": "彼此不协调，不相配。",
          "en": "out of place; incompatible",
          "play": "格格不入"
        },
        {
          "word": "嫁",
          "pinyin": "jià",
          "cn": "女子结婚，成为别人的妻子。",
          "en": "to marry (of a woman)",
          "play": "嫁"
        },
        {
          "word": "视讯",
          "pinyin": "shì xùn",
          "cn": "通过网络进行有画面的通话。",
          "en": "video call",
          "play": "视讯"
        },
        {
          "word": "酷",
          "pinyin": "kù",
          "cn": "样子很有型、很帅；也可指冷峻。",
          "en": "cool; stylish",
          "play": "酷"
        },
        {
          "word": "歉意",
          "pinyin": "qiàn yì",
          "cn": "觉得对不起别人的心情。",
          "en": "regret; apology",
          "play": "歉意"
        },
        {
          "word": "蒸腾",
          "pinyin": "zhēng téng",
          "cn": "水汽或热气不断向上升。",
          "en": "to rise or billow (of steam)",
          "play": "蒸腾"
        },
        {
          "word": "叽叽喳喳",
          "pinyin": "jī jī zhā zhā",
          "cn": "形容许多人不停说话的声音。",
          "en": "to chatter noisily",
          "play": "叽叽喳喳"
        },
        {
          "word": "悦耳",
          "pinyin": "yuè ěr",
          "cn": "声音好听，使人感到舒服。",
          "en": "pleasant to the ear; melodious",
          "play": "悦耳"
        }
      ],
      [
        {
          "word": "贼",
          "pinyin": "zéi",
          "cn": "偷东西的人；课文将时间比作偷走岁月的贼。",
          "en": "thief; something that steals (figurative)",
          "play": "贼"
        },
        {
          "word": "鱼尾纹",
          "pinyin": "yú wěi wén",
          "cn": "眼角像鱼尾形状的细皱纹。",
          "en": "crow's feet; wrinkles around the eyes",
          "play": "鱼尾纹"
        },
        {
          "word": "装饰",
          "pinyin": "zhuāng shì",
          "cn": "用东西点缀使物品或环境更美观；也指装饰品。",
          "en": "to decorate; decoration",
          "play": "装饰"
        },
        {
          "word": "结婚",
          "pinyin": "jié hūn",
          "cn": "依照法律成为夫妻。",
          "en": "to get married",
          "play": "结婚"
        },
        {
          "word": "沉默寡言",
          "pinyin": "chén mò guǎ yán",
          "cn": "不爱说话，话很少。",
          "en": "quiet and reserved; a person of few words",
          "play": "沉默寡言"
        },
        {
          "word": "副",
          "pinyin": "fù",
          "cn": "量词，用于形容表情或样子；课文指爸爸“那副”表情。",
          "en": "measure word for an expression or appearance",
          "play": "副"
        },
        {
          "word": "承诺",
          "pinyin": "chéng nuò",
          "cn": "答应别人会做某件事；也指作出的保证。",
          "en": "to promise; a promise",
          "play": "承诺"
        },
        {
          "word": "围炉",
          "pinyin": "wéi lú",
          "cn": "一家人围坐在一起吃饭；课文中指围着火锅用餐。",
          "en": "to gather around a hotpot for a meal",
          "play": "围炉"
        },
        {
          "word": "缺席",
          "pinyin": "quē xí",
          "cn": "该出现的人没有到场。",
          "en": "to be absent",
          "play": "缺席"
        }
      ]
    ]
  },
  {
    "unit": 2,
    "lesson": 3,
    "title": "幸运饺子",
    "challenges": [
      [
        {
          "word": "红枣",
          "pinyin": "hóng zǎo",
          "cn": "成熟后常呈红色的枣子。",
          "en": "red date; jujube",
          "play": "红枣"
        },
        {
          "word": "儿媳妇",
          "pinyin": "ér xí fu",
          "cn": "儿子的妻子。",
          "en": "daughter-in-law",
          "play": "儿媳妇"
        },
        {
          "word": "莫名其妙",
          "pinyin": "mò míng qí miào",
          "cn": "事情奇怪，让人弄不明白。",
          "en": "baffling; inexplicable",
          "play": "莫名其妙"
        },
        {
          "word": "疑惑",
          "pinyin": "yí huò",
          "cn": "心里不明白，感到困惑；也可表示怀疑。",
          "en": "puzzled; doubtful",
          "play": "疑惑"
        }
      ]
    ]
  },
  {
    "unit": 3,
    "lesson": 1,
    "title": "走街串巷逛狮城",
    "challenges": [
      [
        {
          "word": "巴刹",
          "pinyin": "bā shā",
          "cn": "新加坡等地对市场的称呼。",
          "en": "market; wet market",
          "play": "巴刹"
        },
        {
          "word": "皇宫",
          "pinyin": "huáng gōng",
          "cn": "皇帝居住和处理事务的宫殿。",
          "en": "imperial palace",
          "play": "皇宫"
        },
        {
          "word": "彩绘",
          "pinyin": "cǎi huì",
          "cn": "用颜色画出的图案；也指用彩色绘画。",
          "en": "colourful painting; painted designs",
          "play": "彩绘"
        },
        {
          "word": "流连忘返",
          "pinyin": "liú lián wàng fǎn",
          "cn": "玩得很开心，舍不得离开。",
          "en": "to enjoy a place so much that one forgets to leave",
          "play": "流连忘返"
        },
        {
          "word": "娘惹",
          "pinyin": "niáng rě",
          "cn": "东南亚土生华人文化中对女性的称呼；也常指相关文化。",
          "en": "Nyonya; Peranakan woman or culture",
          "play": "娘惹"
        },
        {
          "word": "繁忙",
          "pinyin": "fán máng",
          "cn": "工作或活动很多，非常忙。",
          "en": "busy; bustling",
          "play": "繁忙"
        }
      ],
      [
        {
          "word": "博物馆",
          "pinyin": "bó wù guǎn",
          "cn": "收藏和展示历史、文化、科学等物品的场所。",
          "en": "museum",
          "play": "博物馆"
        },
        {
          "word": "遗产",
          "pinyin": "yí chǎn",
          "cn": "前人留下的历史文化财富；也可指身后留下的财产。",
          "en": "heritage; inheritance",
          "play": "遗产"
        },
        {
          "word": "融合",
          "pinyin": "róng hé",
          "cn": "不同事物结合在一起。",
          "en": "to blend; fusion",
          "play": "融合"
        },
        {
          "word": "时尚",
          "pinyin": "shí shàng",
          "cn": "当时流行的风格；也形容合乎潮流。",
          "en": "fashion; fashionable",
          "play": "时尚"
        },
        {
          "word": "探索",
          "pinyin": "tàn suǒ",
          "cn": "寻找答案，了解未知的事物。",
          "en": "to explore; to investigate",
          "play": "探索"
        },
        {
          "word": "平均",
          "pinyin": "píng jūn",
          "cn": "把总量按份数均匀计算。",
          "en": "average; on average",
          "play": "平均"
        }
      ],
      [
        {
          "word": "魅力",
          "pinyin": "mèi lì",
          "cn": "能够吸引别人的力量。",
          "en": "charm; appeal",
          "play": "魅力"
        },
        {
          "word": "悠久",
          "pinyin": "yōu jiǔ",
          "cn": "经历很长的年代。",
          "en": "long-standing; with a long history",
          "play": "悠久"
        },
        {
          "word": "同胞",
          "pinyin": "tóng bāo",
          "cn": "同一国家或民族的人；也可指同父母的兄弟姐妹。",
          "en": "fellow countrymen; siblings",
          "play": "同胞"
        },
        {
          "word": "城堡",
          "pinyin": "chéng bǎo",
          "cn": "有高墙或防御设施的大型建筑。",
          "en": "castle",
          "play": "城堡"
        },
        {
          "word": "娱乐",
          "pinyin": "yú lè",
          "cn": "使人快乐、放松的活动。",
          "en": "entertainment; recreation",
          "play": "娱乐"
        },
        {
          "word": "拍摄",
          "pinyin": "pāi shè",
          "cn": "用相机或摄影机记录画面。",
          "en": "to photograph; to film",
          "play": "拍摄"
        },
        {
          "word": "闪耀",
          "pinyin": "shǎn yào",
          "cn": "发出明亮耀眼的光。",
          "en": "to sparkle; to shine brightly",
          "play": "闪耀"
        }
      ]
    ]
  },
  {
    "unit": 3,
    "lesson": 2,
    "title": "魅力四射 星耀樟宜",
    "challenges": [
      [
        {
          "word": "横梁",
          "pinyin": "héng liáng",
          "cn": "横着支撑建筑结构的梁。",
          "en": "horizontal beam",
          "play": "横梁"
        },
        {
          "word": "覆盖",
          "pinyin": "fù gài",
          "cn": "遮住、盖在表面上。",
          "en": "to cover",
          "play": "覆盖"
        },
        {
          "word": "玻璃",
          "pinyin": "bō li",
          "cn": "常见的透明、坚硬材料。",
          "en": "glass",
          "play": "玻璃"
        },
        {
          "word": "瀑布",
          "pinyin": "pù bù",
          "cn": "水从高处陡直流下的景观。",
          "en": "waterfall",
          "play": "瀑布"
        },
        {
          "word": "循环",
          "pinyin": "xún huán",
          "cn": "不断按一定顺序重复运行。",
          "en": "to circulate; to cycle",
          "play": "循环"
        },
        {
          "word": "谷",
          "pinyin": "gǔ",
          "cn": "两山之间低洼的地方；也可指谷类粮食。",
          "en": "valley; grain",
          "play": "谷"
        },
        {
          "word": "株",
          "pinyin": "zhū",
          "cn": "用于计算树木、花草等植物的量词。",
          "en": "measure word for plants or trees",
          "play": "株"
        },
        {
          "word": "设施",
          "pinyin": "shè shī",
          "cn": "为满足某种需要而设置的设备或场所。",
          "en": "facilities",
          "play": "设施"
        },
        {
          "word": "蹦跳",
          "pinyin": "bèng tiào",
          "cn": "向上跳起，跳来跳去。",
          "en": "to jump; to bounce",
          "play": "蹦跳"
        },
        {
          "word": "甚至",
          "pinyin": "shèn zhì",
          "cn": "表示程度更进一步，突出意料之外的情况。",
          "en": "even; so much so that",
          "play": "甚至"
        }
      ]
    ]
  },
  {
    "unit": 3,
    "lesson": 3,
    "title": "国家美术馆探秘",
    "challenges": [
      [
        {
          "word": "投降",
          "pinyin": "tóu xiáng",
          "cn": "停止抵抗，向对方认输。",
          "en": "to surrender",
          "play": "投降"
        },
        {
          "word": "自治",
          "pinyin": "zì zhì",
          "cn": "某个地区或团体自行管理内部事务。",
          "en": "self-government; autonomy",
          "play": "自治"
        },
        {
          "word": "栏",
          "pinyin": "lán",
          "cn": "用于隔开的栏杆；课文指法庭里的被告栏。",
          "en": "railing; enclosure; a dock (in court)",
          "play": "栏"
        },
        {
          "word": "棕色",
          "pinyin": "zōng sè",
          "cn": "像咖啡、树干一样的褐色。",
          "en": "brown",
          "play": "棕色"
        },
        {
          "word": "氧化",
          "pinyin": "yǎng huà",
          "cn": "物质与氧发生反应；如金属表面变色。",
          "en": "oxidation; to oxidise",
          "play": "氧化"
        },
        {
          "word": "陌生",
          "pinyin": "mò shēng",
          "cn": "不熟悉、不认识。",
          "en": "unfamiliar; strange",
          "play": "陌生"
        },
        {
          "word": "宁静",
          "pinyin": "níng jìng",
          "cn": "安静、平和，没有嘈杂。",
          "en": "peaceful; tranquil",
          "play": "宁静"
        },
        {
          "word": "属于",
          "pinyin": "shǔ yú",
          "cn": "归某个人或某一类所有。",
          "en": "to belong to",
          "play": "属于"
        }
      ]
    ]
  },
  {
    "unit": 4,
    "lesson": 1,
    "title": "培养好习惯",
    "challenges": [
      [
        {
          "word": "坚持不懈",
          "pinyin": "jiān chí bù xiè",
          "cn": "一直坚持，不轻易放弃。",
          "en": "to persevere; to keep going",
          "play": "坚持不懈"
        },
        {
          "word": "以礼待人",
          "pinyin": "yǐ lǐ dài rén",
          "cn": "有礼貌地对待别人。",
          "en": "to treat others politely",
          "play": "以礼待人"
        },
        {
          "word": "新颖",
          "pinyin": "xīn yǐng",
          "cn": "新鲜、特别，与众不同。",
          "en": "new and original; novel",
          "play": "新颖"
        },
        {
          "word": "工作坊",
          "pinyin": "gōng zuò fāng",
          "cn": "通过活动和交流学习某种技能的课程。",
          "en": "workshop",
          "play": "工作坊"
        },
        {
          "word": "尴尬",
          "pinyin": "gān gà",
          "cn": "处境难堪、不自在。",
          "en": "awkward; embarrassed",
          "play": "尴尬"
        },
        {
          "word": "友谊",
          "pinyin": "yǒu yì",
          "cn": "朋友之间的感情。",
          "en": "friendship",
          "play": "友谊"
        },
        {
          "word": "策略",
          "pinyin": "cè lüè",
          "cn": "为达到目标而采用的方法或计划。",
          "en": "strategy",
          "play": "策略"
        }
      ],
      [
        {
          "word": "开卷有益",
          "pinyin": "kāi juàn yǒu yì",
          "cn": "阅读书籍总能有所收获。",
          "en": "reading is beneficial",
          "play": "开卷有益"
        },
        {
          "word": "戏剧",
          "pinyin": "xì jù",
          "cn": "由演员扮演角色、表演故事的艺术形式。",
          "en": "drama; theatre",
          "play": "戏剧"
        },
        {
          "word": "维护",
          "pinyin": "wéi hù",
          "cn": "保护并使某种关系或事物不受损害。",
          "en": "to maintain; to protect",
          "play": "维护"
        },
        {
          "word": "一帆风顺",
          "pinyin": "yī fān fēng shùn",
          "cn": "事情进展顺利，没有阻碍。",
          "en": "smooth sailing; everything goes smoothly",
          "play": "一帆风顺"
        },
        {
          "word": "有效",
          "pinyin": "yǒu xiào",
          "cn": "能够产生预期的效果。",
          "en": "effective",
          "play": "有效"
        },
        {
          "word": "嘉宾",
          "pinyin": "jiā bīn",
          "cn": "受邀请参加活动的客人。",
          "en": "guest; invited guest",
          "play": "嘉宾"
        },
        {
          "word": "辅导员",
          "pinyin": "fǔ dǎo yuán",
          "cn": "帮助别人学习、解决问题或适应生活的人。",
          "en": "counsellor; adviser",
          "play": "辅导员"
        }
      ]
    ]
  },
  {
    "unit": 4,
    "lesson": 2,
    "title": "迟到",
    "challenges": [
      [
        {
          "word": "滋味",
          "pinyin": "zī wèi",
          "cn": "某种经历带来的感受；也可指食物的味道。",
          "en": "feeling; taste",
          "play": "滋味"
        },
        {
          "word": "哀求",
          "pinyin": "āi qiú",
          "cn": "带着难过的心情恳求别人。",
          "en": "to plead; to beg",
          "play": "哀求"
        },
        {
          "word": "硬着头皮",
          "pinyin": "yìng zhe tóu pí",
          "cn": "虽然害怕或不情愿，仍勉强去做。",
          "en": "to force oneself to do something difficult",
          "play": "硬着头皮"
        },
        {
          "word": "抡",
          "pinyin": "lūn",
          "cn": "用力挥动或甩动。",
          "en": "to swing forcefully",
          "play": "抡"
        },
        {
          "word": "挨打",
          "pinyin": "ái dǎ",
          "cn": "被人打。",
          "en": "to be beaten; to take a beating",
          "play": "挨打"
        },
        {
          "word": "雨篷",
          "pinyin": "yǔ péng",
          "cn": "遮挡雨水的棚或篷布。",
          "en": "rain canopy; rain cover",
          "play": "雨篷"
        },
        {
          "word": "早晨",
          "pinyin": "zǎo chén",
          "cn": "从天亮到上午较早的一段时间。",
          "en": "morning",
          "play": "早晨"
        },
        {
          "word": "猛",
          "pinyin": "měng",
          "cn": "突然、迅速地；也指力量很大。",
          "en": "suddenly; fiercely",
          "play": "猛"
        }
      ],
      [
        {
          "word": "赖床",
          "pinyin": "lài chuáng",
          "cn": "醒了却不愿起床。",
          "en": "to stay in bed after waking up",
          "play": "赖床"
        },
        {
          "word": "催促",
          "pinyin": "cuī cù",
          "cn": "不断提醒别人快点行动。",
          "en": "to urge; to hurry someone",
          "play": "催促"
        },
        {
          "word": "藤鞭",
          "pinyin": "téng biān",
          "cn": "用藤条制成的鞭子。",
          "en": "rattan cane",
          "play": "藤鞭"
        },
        {
          "word": "女佣",
          "pinyin": "nǚ yōng",
          "cn": "受雇负责家务的女性。",
          "en": "domestic helper",
          "play": "女佣"
        },
        {
          "word": "泪痕",
          "pinyin": "lèi hén",
          "cn": "眼泪流过后留下的痕迹。",
          "en": "tear stains",
          "play": "泪痕"
        },
        {
          "word": "嗓子眼",
          "pinyin": "sǎng zi yǎn",
          "cn": "喉咙口；课文形容紧张得心提到喉咙口。",
          "en": "throat; a lump in one's throat",
          "play": "嗓子眼"
        },
        {
          "word": "允许",
          "pinyin": "yǔn xǔ",
          "cn": "同意别人做某件事。",
          "en": "to allow; to permit",
          "play": "允许"
        }
      ]
    ]
  },
  {
    "unit": 4,
    "lesson": 3,
    "title": "差不多先生",
    "challenges": [
      [
        {
          "word": "相貌",
          "pinyin": "xiàng mào",
          "cn": "一个人的外表，特别是面部样子。",
          "en": "appearance; looks",
          "play": "相貌"
        },
        {
          "word": "讲究",
          "pinyin": "jiǎng jiu",
          "cn": "重视、在意某种要求；课文指对味道不太挑剔。",
          "en": "to pay attention to; to be particular about",
          "play": "讲究"
        },
        {
          "word": "何必",
          "pinyin": "hé bì",
          "cn": "表示没有必要做某件事。",
          "en": "why bother; there is no need",
          "play": "何必"
        },
        {
          "word": "记账",
          "pinyin": "jì zhàng",
          "cn": "把收入、支出等记录下来。",
          "en": "to keep accounts",
          "play": "记账"
        },
        {
          "word": "亏",
          "pinyin": "kuī",
          "cn": "损失了钱；也可指不足或缺少。",
          "en": "to lose money; to be short of",
          "play": "亏"
        },
        {
          "word": "撇",
          "pinyin": "piě",
          "cn": "汉字向左下斜写的一笔；也可指把东西丢开。",
          "en": "left-falling stroke; to cast aside",
          "play": "撇"
        },
        {
          "word": "慢条斯理",
          "pinyin": "màn tiáo sī lǐ",
          "cn": "动作缓慢，不慌不忙。",
          "en": "unhurried; leisurely",
          "play": "慢条斯理"
        },
        {
          "word": "起航",
          "pinyin": "qǐ háng",
          "cn": "船开始航行；也可指飞机开始飞行。",
          "en": "to set sail",
          "play": "起航"
        },
        {
          "word": "焦急",
          "pinyin": "jiāo jí",
          "cn": "心里着急、担心。",
          "en": "anxious; worried",
          "play": "焦急"
        }
      ]
    ]
  },
  {
    "unit": 5,
    "lesson": 1,
    "title": "我是创新王",
    "challenges": [
      [
        {
          "word": "剩",
          "pinyin": "shèng",
          "cn": "用过之后还有留下来。",
          "en": "to be left over; to remain",
          "play": "剩"
        },
        {
          "word": "牙膏",
          "pinyin": "yá gāo",
          "cn": "刷牙用的膏状清洁用品。",
          "en": "toothpaste",
          "play": "牙膏"
        },
        {
          "word": "橡皮擦",
          "pinyin": "xiàng pí cā",
          "cn": "用来擦掉铅笔字迹的文具。（原表写“橡皮檫”，课文为“橡皮擦”，待核对）",
          "en": "eraser",
          "play": "橡皮擦"
        },
        {
          "word": "偶尔",
          "pinyin": "ǒu ěr",
          "cn": "有时候，但不经常。",
          "en": "occasionally; sometimes",
          "play": "偶尔"
        },
        {
          "word": "晋级",
          "pinyin": "jìn jí",
          "cn": "进入比赛或评选的下一阶段。",
          "en": "to advance to the next round",
          "play": "晋级"
        },
        {
          "word": "获得",
          "pinyin": "huò dé",
          "cn": "得到、取得。",
          "en": "to obtain; to receive",
          "play": "获得"
        }
      ],
      [
        {
          "word": "薯条",
          "pinyin": "shǔ tiáo",
          "cn": "把马铃薯切成条后炸成的食品。",
          "en": "French fries",
          "play": "薯条"
        },
        {
          "word": "番茄酱",
          "pinyin": "fān qié jiàng",
          "cn": "用番茄制成的浓稠调味酱。",
          "en": "tomato ketchup; tomato sauce",
          "play": "番茄酱"
        },
        {
          "word": "评委",
          "pinyin": "píng wěi",
          "cn": "负责评选或打分的人。",
          "en": "judge; member of a judging panel",
          "play": "评委"
        },
        {
          "word": "奖励",
          "pinyin": "jiǎng lì",
          "cn": "为了鼓励而给予奖品或表扬。",
          "en": "reward; to reward",
          "play": "奖励"
        },
        {
          "word": "企业",
          "pinyin": "qǐ yè",
          "cn": "从事生产、贸易或服务的公司等组织。",
          "en": "enterprise; company",
          "play": "企业"
        }
      ]
    ]
  },
  {
    "unit": 5,
    "lesson": 2,
    "title": "海底牧场游记",
    "challenges": [
      [
        {
          "word": "潜水",
          "pinyin": "qián shuǐ",
          "cn": "进入水面以下活动。",
          "en": "to dive; diving",
          "play": "潜水"
        },
        {
          "word": "翘",
          "pinyin": "qiào",
          "cn": "一端向上抬起；课文指车尾翘起来。",
          "en": "to tilt or lift upwards",
          "play": "翘"
        },
        {
          "word": "仿佛",
          "pinyin": "fǎng fú",
          "cn": "好像、似乎。",
          "en": "as if; to seem",
          "play": "仿佛"
        },
        {
          "word": "浑身",
          "pinyin": "hún shēn",
          "cn": "整个身体。",
          "en": "all over the body",
          "play": "浑身"
        },
        {
          "word": "一哄而散",
          "pinyin": "yí hòng ér sàn",
          "cn": "聚在一起的人或动物一下子纷纷散开。",
          "en": "to scatter in a rush",
          "play": "一哄而散"
        },
        {
          "word": "手势",
          "pinyin": "shǒu shì",
          "cn": "用手部动作表达意思。",
          "en": "hand gesture; signal",
          "play": "手势"
        },
        {
          "word": "泡沫",
          "pinyin": "pào mò",
          "cn": "聚在一起的许多小气泡。",
          "en": "foam; bubbles",
          "play": "泡沫"
        }
      ],
      [
        {
          "word": "牧场",
          "pinyin": "mù chǎng",
          "cn": "饲养牛羊等动物的地方。",
          "en": "ranch; pasture",
          "play": "牧场"
        },
        {
          "word": "艘",
          "pinyin": "sōu",
          "cn": "计算船只数量的量词。",
          "en": "measure word for ships",
          "play": "艘"
        },
        {
          "word": "屁股",
          "pinyin": "pì gu",
          "cn": "身体背面靠下的部位；课文用来形容车的尾部。",
          "en": "bottom; rear end",
          "play": "屁股"
        },
        {
          "word": "潜水艇",
          "pinyin": "qián shuǐ tǐng",
          "cn": "能在水下航行的船。",
          "en": "submarine",
          "play": "潜水艇"
        },
        {
          "word": "确切",
          "pinyin": "què qiè",
          "cn": "准确、没有含糊；课文“确切地讲”指更准确地说。",
          "en": "exact; precise",
          "play": "确切"
        },
        {
          "word": "基因",
          "pinyin": "jī yīn",
          "cn": "决定并传递生物遗传特征的信息单位。",
          "en": "gene",
          "play": "基因"
        },
        {
          "word": "颁布",
          "pinyin": "bān bù",
          "cn": "正式公布法令、规定等。",
          "en": "to issue; to promulgate",
          "play": "颁布"
        },
        {
          "word": "泛",
          "pinyin": "fàn",
          "cn": "（水面）浮现、冒出；课文指海面泛起泡沫。",
          "en": "to appear or spread on a surface",
          "play": "泛"
        }
      ]
    ]
  },
  {
    "unit": 5,
    "lesson": 3,
    "title": "难忘的建筑之旅",
    "challenges": [
      [
        {
          "word": "伤脑筋",
          "pinyin": "shāng nǎo jīn",
          "cn": "问题难解决，让人很费心思。",
          "en": "to be a headache; to rack one's brains",
          "play": "伤脑筋"
        },
        {
          "word": "拜访",
          "pinyin": "bài fǎng",
          "cn": "带着礼貌或敬意去访问别人。",
          "en": "to pay a visit",
          "play": "拜访"
        },
        {
          "word": "漫步",
          "pinyin": "màn bù",
          "cn": "轻松、缓慢地走。",
          "en": "to stroll",
          "play": "漫步"
        },
        {
          "word": "绞尽脑汁",
          "pinyin": "jiǎo jìn nǎo zhī",
          "cn": "费尽心思去想办法。",
          "en": "to rack one's brains",
          "play": "绞尽脑汁"
        },
        {
          "word": "银行",
          "pinyin": "yín háng",
          "cn": "办理存款、贷款等金融业务的机构。",
          "en": "bank",
          "play": "银行"
        },
        {
          "word": "抨击",
          "pinyin": "pēng jī",
          "cn": "用言语或文章严厉批评。",
          "en": "to criticise sharply; to attack verbally",
          "play": "抨击"
        }
      ],
      [
        {
          "word": "中央",
          "pinyin": "zhōng yāng",
          "cn": "位于中间的；课文指市中心的商业区。",
          "en": "central; centre",
          "play": "中央"
        },
        {
          "word": "华侨",
          "pinyin": "huá qiáo",
          "cn": "长期居住在国外、仍具有中国国籍的中国公民。",
          "en": "overseas Chinese citizen",
          "play": "华侨"
        },
        {
          "word": "由衷",
          "pinyin": "yóu zhōng",
          "cn": "发自内心，真诚的。",
          "en": "heartfelt; sincere",
          "play": "由衷"
        },
        {
          "word": "摩天大楼",
          "pinyin": "mó tiān dà lóu",
          "cn": "非常高的多层建筑。",
          "en": "skyscraper",
          "play": "摩天大楼"
        },
        {
          "word": "薄薄的",
          "pinyin": "báo báo de",
          "cn": "厚度很小、不厚的。",
          "en": "thin",
          "play": "薄薄的"
        },
        {
          "word": "挫折",
          "pinyin": "cuò zhé",
          "cn": "遇到的失败或困难。",
          "en": "setback; frustration",
          "play": "挫折"
        }
      ]
    ]
  },
  {
    "unit": 6,
    "lesson": 1,
    "title": "我们的无名英雄",
    "challenges": [
      [
        {
          "word": "宿舍",
          "pinyin": "sù shè",
          "cn": "提供给学生或员工居住的房间或建筑。",
          "en": "dormitory; hostel",
          "play": "宿舍"
        },
        {
          "word": "订购",
          "pinyin": "dìng gòu",
          "cn": "预先约定购买商品。",
          "en": "to place an order",
          "play": "订购"
        },
        {
          "word": "范围",
          "pinyin": "fàn wéi",
          "cn": "某项工作或活动所包括的部分。",
          "en": "scope; range",
          "play": "范围"
        },
        {
          "word": "警惕",
          "pinyin": "jǐng tì",
          "cn": "对可能的危险保持注意。",
          "en": "to stay alert; vigilant",
          "play": "警惕"
        },
        {
          "word": "不堪设想",
          "pinyin": "bù kān shè xiǎng",
          "cn": "后果可能非常严重，难以想象。",
          "en": "too dreadful to imagine",
          "play": "不堪设想"
        },
        {
          "word": "脂肪",
          "pinyin": "zhī fáng",
          "cn": "人体或食物中的油脂成分。",
          "en": "fat",
          "play": "脂肪"
        }
      ],
      [
        {
          "word": "油漆",
          "pinyin": "yóu qī",
          "cn": "涂在物体表面的涂料；也指涂刷油漆。",
          "en": "paint; to paint",
          "play": "油漆"
        },
        {
          "word": "栏杆",
          "pinyin": "lán gān",
          "cn": "起保护或隔离作用的横栏。",
          "en": "railing",
          "play": "栏杆"
        },
        {
          "word": "凭",
          "pinyin": "píng",
          "cn": "依靠、通过某种条件；课文指靠自己的双手。",
          "en": "by means of; to rely on",
          "play": "凭"
        },
        {
          "word": "欣慰",
          "pinyin": "xīn wèi",
          "cn": "因为事情有好结果而感到高兴、安心。",
          "en": "gratified; pleased and relieved",
          "play": "欣慰"
        },
        {
          "word": "塔台",
          "pinyin": "tǎ tái",
          "cn": "机场指挥飞机起降的控制中心。",
          "en": "control tower",
          "play": "塔台"
        },
        {
          "word": "特殊",
          "pinyin": "tè shū",
          "cn": "与一般情况不同。",
          "en": "special; unusual",
          "play": "特殊"
        },
        {
          "word": "失误",
          "pinyin": "shī wù",
          "cn": "做事时出现的差错。",
          "en": "mistake; error",
          "play": "失误"
        }
      ]
    ]
  },
  {
    "unit": 6,
    "lesson": 2,
    "title": "我为狮城做贡献——走访地铁维修人员",
    "challenges": [
      [
        {
          "word": "幕后",
          "pinyin": "mù hòu",
          "cn": "事情背后、不被大众看见的地方；课文指默默付出的人。",
          "en": "behind the scenes",
          "play": "幕后"
        },
        {
          "word": "明知山有虎，偏向虎山行",
          "pinyin": "míng zhī shān yǒu hǔ piān xiàng hǔ shān xíng",
          "cn": "明明知道有困难或危险，仍勇敢面对。",
          "en": "to face danger or difficulty despite knowing the risks",
          "play": "明知山有虎"
        },
        {
          "word": "轨道",
          "pinyin": "guǐ dào",
          "cn": "供地铁或火车行驶的路线。",
          "en": "railway track",
          "play": "轨道"
        },
        {
          "word": "隧道",
          "pinyin": "suì dào",
          "cn": "在地下或山体里开出的通道。",
          "en": "tunnel",
          "play": "隧道"
        },
        {
          "word": "顺畅",
          "pinyin": "shùn chàng",
          "cn": "顺利、通畅，没有阻碍。",
          "en": "smooth; unobstructed",
          "play": "顺畅"
        },
        {
          "word": "岗位",
          "pinyin": "gǎng wèi",
          "cn": "工作职位或负责的岗位。",
          "en": "post; job position",
          "play": "岗位"
        }
      ],
      [
        {
          "word": "延误",
          "pinyin": "yán wu",
          "cn": "比原定时间晚，造成耽搁。",
          "en": "delay",
          "play": "延误"
        },
        {
          "word": "贡献",
          "pinyin": "gòng xiàn",
          "cn": "为集体或社会付出力量；也指作出的有益成果。",
          "en": "to contribute; contribution",
          "play": "贡献"
        },
        {
          "word": "凌晨",
          "pinyin": "líng chén",
          "cn": "午夜以后、天亮以前的时间。",
          "en": "early hours of the morning",
          "play": "凌晨"
        },
        {
          "word": "扫描",
          "pinyin": "sǎo miáo",
          "cn": "利用仪器逐步检查并记录。",
          "en": "to scan",
          "play": "扫描"
        },
        {
          "word": "全力以赴",
          "pinyin": "quán lì yǐ fù",
          "cn": "把全部力量投入要做的事。",
          "en": "to give one's all; to make every effort",
          "play": "全力以赴"
        },
        {
          "word": "职业",
          "pinyin": "zhí yè",
          "cn": "一个人长期从事的工作。",
          "en": "occupation; profession",
          "play": "职业"
        }
      ],
      [
        {
          "word": "截至",
          "pinyin": "jié zhì",
          "cn": "一直到某个指定时间为止。",
          "en": "as of; up to (a time)",
          "play": "截至"
        },
        {
          "word": "行驶",
          "pinyin": "xíng shǐ",
          "cn": "车辆在路上或轨道上运行。",
          "en": "to travel; to run (of vehicles)",
          "play": "行驶"
        },
        {
          "word": "稳定",
          "pinyin": "wěn dìng",
          "cn": "保持平稳、正常，没有明显变化。",
          "en": "stable; steady",
          "play": "稳定"
        },
        {
          "word": "漏夜",
          "pinyin": "lòu yè",
          "cn": "在深夜里，常指连夜工作。",
          "en": "late into the night; overnight",
          "play": "漏夜"
        },
        {
          "word": "就绪",
          "pinyin": "jiù xù",
          "cn": "准备工作已经完成，可以开始。",
          "en": "ready; in place",
          "play": "就绪"
        },
        {
          "word": "裂痕",
          "pinyin": "liè hén",
          "cn": "物体出现的裂缝痕迹。",
          "en": "crack",
          "play": "裂痕"
        },
        {
          "word": "故障",
          "pinyin": "gù zhàng",
          "cn": "机器、设备或系统出现问题。",
          "en": "breakdown; malfunction",
          "play": "故障"
        }
      ]
    ]
  },
  {
    "unit": 6,
    "lesson": 3,
    "title": "小人物的心声“一人一首新谣”专题系列报道",
    "challenges": [
      [
        {
          "word": "新谣",
          "pinyin": "xīn yáo",
          "cn": "新加坡本地创作、带有地方特色的华语歌曲。",
          "en": "Singapore Chinese-language folk-style songs (Xinyao)",
          "play": "新谣"
        },
        {
          "word": "芝麻",
          "pinyin": "zhī ma",
          "cn": "一种植物及其可食用的小种子。",
          "en": "sesame",
          "play": "芝麻"
        },
        {
          "word": "朗朗上口",
          "pinyin": "lǎng lǎng shàng kǒu",
          "cn": "读起来或唱起来顺畅、容易记住。",
          "en": "easy to recite or sing; catchy",
          "play": "朗朗上口"
        },
        {
          "word": "奉献",
          "pinyin": "fèng xiàn",
          "cn": "拿出自己的时间、能力等为别人或社会服务。",
          "en": "to devote; to dedicate",
          "play": "奉献"
        },
        {
          "word": "繁荣",
          "pinyin": "fán róng",
          "cn": "事业、经济等发展得兴盛。",
          "en": "prosperous; thriving",
          "play": "繁荣"
        },
        {
          "word": "平凡",
          "pinyin": "píng fán",
          "cn": "普通，没有特别突出之处。",
          "en": "ordinary",
          "play": "平凡"
        },
        {
          "word": "光芒",
          "pinyin": "guāng máng",
          "cn": "从物体发出的明亮光线；也可比喻杰出的表现。",
          "en": "rays of light; brilliance",
          "play": "光芒"
        }
      ]
    ]
  }
];
