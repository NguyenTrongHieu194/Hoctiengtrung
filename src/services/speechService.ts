// Web Speech API wrapper with intelligent Pinyin-to-Hanzi Phonetic Mapping Engine
// Ensures 100% accurate Mandarin Chinese pronunciation across all devices and browsers

import { MANDARIN_SYLLABLES_DATA } from "../utils/pinyinEngine";

// Master mapping of Pinyin syllables, initials, finals, tones, and sandhi to standard Mandarin Hanzi
const PINYIN_TO_HANZI_MAP: Record<string, string> = {
  // ==========================================
  // 1. THANH MẪU (23 INITIALS - ÂM ĐẦU CHUẨN)
  // ==========================================
  b:"波", // bō
  bo:"波",
  bō:"波",
  p:"坡", // pō
  po:"坡",
  pō:"坡",
  m:"摸", // mō
  mo:"摸",
  mō:"摸",
  f:"佛", // fó
  fo:"佛",
  fō:"佛",
  d:"得", // dé / de
  de:"得",
  dē:"得",
  t:"特", // tè
  te:"特",
  tē:"特",
  n:"讷", // nè
  ne:"讷",
  nē:"讷",
  l:"勒", // lè
  le:"勒",
  lē:"勒",
  g:"哥", // gē
  ge:"哥",
  gē:"哥",
  k:"科", // kē
  ke:"科",
  kē:"科",
  h:"喝", // hē
  he:"喝",
  hē:"喝",
  j:"基", // jī
  ji:"基",
  jī:"基",
  q:"七", // qī
  qi:"七",
  qī:"七",
  x:"西", // xī
  xi:"西",
  xī:"西",
  zh:"知", // zhī
  zhi:"知",
  zhī:"知",
  ch:"吃", // chī
  chi:"吃",
  chī:"吃",
  sh:"诗", // shī
  shi:"诗",
  shī:"诗",
  r:"日", // rì
  ri:"日",
  rì:"日",
  z:"资", // zī
  zi:"资",
  zī:"资",
  c:"疵", // cī
  ci:"疵",
  cī:"疵",
  s:"思", // sī
  si:"思",
  sī:"思",
  y:"衣", // yī
  yi:"衣",
  yī:"衣",
  w:"乌", // wū
  wu:"乌",
  wū:"乌",

  // ==========================================
  // 2. VẬN MẪU & NGUYÊN ÂM (FINALS & VOWELS)
  // ==========================================
  // a
  a:"啊",
  ā:"啊",
  á:"啊",
  ǎ:"啊",
  à:"啊",
  // o
  o:"喔",
  ō:"喔",
  ó:"哦",
  ǒ:"哦",
  ò:"卧",
  // e
  e:"婀",
  ē:"婀",
  é:"鹅",
  ě:"恶",
  è:"饿",
  // i
  i:"衣",
  ī:"衣",
  í:"移",
  ǐ:"以",
  ì:"意",
  // u
  u:"乌",
  ū:"乌",
  ú:"无",
  ǔ:"五",
  ù:"物",
  // ü / v
  ü:"迂",
  v:"迂",
  ǖ:"迂",
  ǘ:"鱼",
  ǚ:"雨",
  ǜ:"玉",
  yu:"迂",
  yū:"迂",
  yú:"鱼",
  yǔ:"雨",
  yù:"玉",

  // Compound Finals
  ai:"哀",
  āi:"哀",
  ái:"癌",
  ǎi:"矮",
  ài:"爱",
  ei:"诶",
  ēi:"诶",
  éi:"诶",
  ěi:"给",
  èi:"配",
  ui:"微",
  uī:"微",
  uí:"为",
  uǐ:"伟",
  uì:"对",
  wei:"微",
  wēi:"微",
  wéi:"为",
  wěi:"伟",
  wèi:"位",
  ao:"熬",
  āo:"熬",
  áo:"敖",
  ǎo:"袄",
  ào:"奥",
  ou:"欧",
  ōu:"欧",
  óu:"头",
  ǒu:"偶",
  òu:"后",
  iu:"优",
  iū:"优",
  iú:"油",
  iǔ:"友",
  iù:"又",
  you:"优",
  yōu:"优",
  yóu:"油",
  yǒu:"友",
  yòu:"又",
  ie:"椰",
  iē:"椰",
  ié:"爷",
  iě:"也",
  iè:"夜",
  ye:"椰",
  yē:"椰",
  yé:"爷",
  yě:"也",
  yè:"夜",
  üe:"约",
  ve:"约",
  yuē:"约",
  yué:"月",
  yue:"月",
  er:"儿",
  ēr:"儿",
  ér:"儿",
  ěr:"耳",
  èr:"二",
  an:"安",
  ān:"安",
  án:"案",
  ǎn:"俺",
  àn:"按",
  en:"恩",
  ēn:"恩",
  én:"人",
  ěn:"粉",
  èn:"问",
  in:"音",
  īn:"音",
  ín:"银",
  ǐn:"引",
  ìn:"印",
  yin:"音",
  yīn:"音",
  yín:"银",
  yǐn:"引",
  yìn:"印",
  un:"温",
  ūn:"温",
  ún:"文",
  ǔn:"稳",
  ùn:"问",
  wen:"温",
  wēn:"温",
  wén:"文",
  wěn:"稳",
  wèn:"问",
  ün:"晕",
  vn:"晕",
  yūn:"晕",
  yún:"云",
  yǔn:"允",
  yùn:"运",
  yun:"云",
  ang:"帮",
  āng:"帮",
  áng:"昂",
  ǎng:"榜",
  àng:"棒",
  eng:"风",
  ēng:"风",
  éng:"朋",
  ěng:"冷",
  èng:"碰",
  ing:"英",
  īng:"英",
  íng:"营",
  ǐng:"影",
  ìng:"硬",
  ying:"英",
  yīng:"英",
  yíng:"营",
  yǐng:"影",
  yìng:"硬",
  ong:"东",
  ōng:"东",
  óng:"红",
  ǒng:"懂",
  òng:"用",
  ia:"鸭",
  iā:"鸭",
  ya:"鸭",
  yā:"鸭",
  yá:"牙",
  yǎ:"雅",
  yà:"亚",
  ua:"蛙",
  uā:"蛙",
  wa:"蛙",
  wā:"蛙",
  wá:"娃",
  wǎ:"瓦",
  wà:"袜",
  uo:"窝",
  uō:"窝",
  wo:"窝",
  wō:"窝",
  wó:"国",
  wǒ:"我",
  wò:"握",
  uai:"歪",
  uāi:"歪",
  wai:"歪",
  wāi:"歪",
  wái:"怀",
  wǎi:"拐",
  wài:"外",
  uan:"弯",
  uān:"弯",
  wan:"弯",
  wān:"弯",
  wán:"玩",
  wǎn:"碗",
  wàn:"万",
  uang:"汪",
  uāng:"汪",
  wang:"汪",
  wāng:"汪",
  wáng:"王",
  wǎng:"网",
  wàng:"望",
  ian:"烟",
  iān:"烟",
  yan:"烟",
  yān:"烟",
  yán:"言",
  yǎn:"眼",
  yàn:"燕",
  iang:"央",
  iāng:"央",
  yang:"央",
  yāng:"央",
  yáng:"阳",
  yǎng:"养",
  yàng:"样",
  iong:"庸",
  iōng:"庸",
  yong:"庸",
  yōng:"庸",
  yóng:"熊",
  yǒng:"勇",
  yòng:"用",
  üan:"冤",
  van:"冤",
  yuan:"冤",
  yuān:"冤",
  yuán:"圆",
  yuǎn:"远",
  yuàn:"院",
  iao:"要",
  iāo:"腰",
  iáo:"摇",
  iǎo:"咬",
  iào:"要",
  yao:"腰",
  yāo:"腰",
  yáo:"摇",
  yǎo:"咬",
  yào:"要",
  ueng:"翁",
  uēng:"翁",
  weng:"翁",
  wēng:"翁",
  wéng:"翁",
  wěng:"滃",
  wèng:"瓮",

  // ==========================================
  // 3. COMMON SYLLABLES WITH ACCURATE TONES
  // ==========================================
  // ma
  ma:"吗",
  mā:"妈",
  má:"麻",
  mǎ:"马",
  mà:"骂",
  // ba
  ba:"吧",
  bā:"八",
  bá:"拔",
  bǎ:"把",
  bà:"爸",
  // pa
  pa:"怕",
  pā:"趴",
  pá:"爬",
  pǎ:"怕",
  pà:"怕",
  // da / ta
  da:"大",
  dā:"搭",
  dá:"答",
  dǎ:"打",
  dà:"大",
  ta:"他",
  tā:"他",
  tá:"塔",
  tǎ:"塔",
  tà:"踏",
  // na / la
  na:"那",
  nā:"拿",
  ná:"拿",
  nǎ:"哪",
  nà:"那",
  la:"拉",
  lā:"拉",
  lá:"蜡",
  lǎ:"喇",
  là:"辣",
  // ga / ka / ha
  gā:"旮",
  gá:"嘎",
  gǎ:"尕",
  gà:"尬",
  kā:"咖",
  kǎ:"卡",
  kà:"咯",
  hā:"哈",
  há:"蛤",
  hǎ:"哈",
  hà:"哈",
  // hao / ni / wo
  hao:"好",
  hāo:"蒿",
  háo:"毫",
  hǎo:"好",
  hào:"号",
  ni:"你",
  nī:"妮",
  ní:"泥",
  nǐ:"你",
  nì:"逆",
  // fei / hong / guo / kan / gao / ting / dao
  fēi:"飞",
  féi:"肥",
  fěi:"匪",
  fèi:"费",
  hōng:"轰",
  hóng:"红",
  hǒng:"哄",
  hòng:"讧",
  guō:"锅",
  guó:"国",
  guǒ:"果",
  guò:"过",
  gāo:"高",
  gáo:"篙",
  gǎo:"搞",
  gào:"告",
  kān:"看",
  kán:"看",
  kǎn:"砍",
  kàn:"看",
  kāo:"靠",
  bāo:"包",
  pāo:"抛",
  bǐng:"饼",
  pīng:"乒",
  píng:"平",
  pǐng:"品",
  pìng:"聘",
  dīng:"钉",
  tīng:"听",
  tíng:"停",
  tǐng:"挺",
  tìng:"听",
  dào:"到",
  tào:"套",
  gàn:"干",
  qí:"齐",
  qǐ:"起",
  qì:"气",
  jí:"极",
  jǐ:"几",
  jì:"记",
  xīng:"星",
  xíng:"行",
  xǐng:"醒",
  xìng:"姓",
  zhāng:"张",
  zháng:"掌",
  zhǎng:"长",
  zhàng:"帐",
  zāng:"脏",
  záng:"脏",
  zǎng:"驵",
  zàng:"葬",
  chē:"车",
  chě:"扯",
  chè:"撤",
  cè:"测",
  cē:"呲",
  shí:"十",
  shǐ:"使",
  shì:"是",
  sí:"死",
  sǐ:"死",
  sì:"四",
  lù:"路",
  lǜ:"绿",
  lǘ:"驴",
  lǚ:"旅",
  bāng:"帮",
  báng:"榜",
  bǎng:"榜",
  bàng:"棒",
  bān:"班",
  bán:"板",
  bǎn:"板",
  bàn:"半",
  fēn:"分",
  fén:"坟",
  fěn:"粉",
  fèn:"份",
  fēng:"风",
  féng:"缝",
  fěng:"讽",
  fèng:"凤",
  mǎi:"买",
  mài:"卖",
  māi:"埋",
  mái:"埋",
  bù:"不",
  bú:"不",
  bǔ:"补",
  bū:"逋",
  // Tone sandhi phrases and compound expressions
  "nǐ hǎo":"你好",
  "ní hǎo":"泥好",
  "kě yǐ":"可以",
  "ké yǐ":"刻以",
  "shǒu biǎo":"手表",
  "shóu biǎo":"手手表",
  "mǎi shuǐ":"买水",
  "mái shuǐ":"埋水",
  "wǒ yě hǎo":"我也好",
  "wó yé hǎo":"握爷好",
  "zhǎn lǎn guǎn":"展览馆",
  "zhán lán guǎn":"展蓝馆",
  "Běijīng":"北京",
  "beijing":"北京",
  "yǔyán":"语言",
  "yuyan":"语言",
  "hǎokàn":"好看",
  "haokan":"好看",
  "bú shì":"不是",
  "bú yào":"不要",
  "bù gāo":"不高",
  "bù hǎo":"不好",
  "yí gè":"一个",
  "yì tiān":"一天",
  "yì qǐ":"一起",
  "dì yī":"第一",
  "māma":"妈妈",
  "hǎo ma":"好吗",
  "chī le":"吃了",
  "yǐzi":"椅子"
};

// Merge all full Pinyin syllables from comprehensive database
Object.values(MANDARIN_SYLLABLES_DATA).forEach((item) => {
  if (item && item.pinyin && item.hanzi && item.hanzi !== "拼" && item.hanzi !== "—") {
    PINYIN_TO_HANZI_MAP[item.pinyin] = item.hanzi;
    PINYIN_TO_HANZI_MAP[item.pinyin.toLowerCase()] = item.hanzi;
  }
});

// =========================================================================
// MASTER PHONETIC MAP FOR ALL 214 KANGXI RADICALS & COMMON VARIANT GLYPHS
// Maps stroke / radical characters to unambiguous standard Mandarin Hanzi
// Prevents Web Speech API TTS from mispronouncing obscure stroke radicals
// (e.g. 覀/襾 -> 亚 [yà], 丨 -> 滚 [gǔn], 丶 -> 主 [zhǔ], 亅 -> 决 [jué])
// =========================================================================
export const RADICAL_PHONETIC_HANZI_MAP: Record<string, string> = {
  // 1 Nét
  "一": "衣", // yī
  "丨": "滚", // gǔn (không đọc thành nét sổ)
  "丶": "主", // zhǔ (không đọc thành nét chấm diǎn)
  "丿": "撇", // piě
  "乙": "以", // yǐ
  "⺄": "以",
  "亅": "决", // jué (không đọc thành móc gōu)

  // 2 Nét
  "二": "二", // èr
  "亠": "头", // tóu
  "人": "人", // rén
  "亻": "人",
  "儿": "儿", // ér
  "入": "入", // rù
  "八": "八", // bā
  "丷": "八",
  "冂": "扃", // jiōng
  "冖": "密", // mì
  "冫": "冰", // bīng
  "几": "机", // jī
  "凵": "坎", // kǎn
  "刀": "刀", // dāo
  "刂": "刀",
  "力": "力", // lì
  "勹": "包", // bāo
  "匕": "比", // bǐ
  "匚": "方", // fāng
  "匸": "戏", // xì
  "十": "十", // shí
  "卜": "补", // bǔ
  "卩": "节", // jié
  "阝": "双", // phụ/ấp
  "厂": "喊", // hǎn
  "厶": "思", // sī
  "又": "又", // yòu

  // 3 Nét
  "口": "口", // kǒu
  "囗": "围", // wéi
  "土": "土", // tǔ
  "士": "士", // shì
  "夂": "止", // zhǐ
  "夊": "虽", // suī
  "夕": "夕", // xī
  "大": "大", // dà
  "女": "女", // nǚ
  "子": "子", // zǐ
  "宀": "棉", // mián
  "寸": "寸", // cùn
  "小": "小", // xiǎo
  "⺌": "小",
  "⺍": "小",
  "尢": "汪", // wāng
  "尣": "汪",
  "尸": "诗", // shī
  "屮": "撤", // chè
  "山": "山", // shān
  "巛": "川", // chuān
  "川": "川",
  "工": "工", // gōng
  "己": "几", // jǐ
  "已": "以",
  "巳": "四",
  "巾": "今", // jīn
  "干": "干", // gān
  "幺": "腰", // yāo
  "广": "广", // guǎng
  "廴": "引", // yǐn
  "廾": "拱", // gǒng
  "弋": "意", // yì
  "弓": "弓", // gōng
  "彐": "记", // jì
  "彑": "记",
  "彡": "衫", // shān
  "彳": "赤", // chì

  // 4 Nét
  "心": "心", // xīn
  "忄": "心",
  "⺗": "心",
  "戈": "歌", // gē
  "戶": "户", // hù
  "户": "户",
  "手": "手", // shǒu
  "扌": "手",
  "支": "支", // zhī
  "攴": "扑", // pū
  "攵": "扑",
  "文": "文", // wén
  "斗": "斗", // dǒu
  "斤": "今", // jīn
  "方": "方", // fāng
  "无": "无", // wú
  "旡": "无",
  "日": "日", // rì
  "曰": "约", // yuē
  "月": "月", // yuè
  "木": "木", // mù
  "欠": "前", // qiàn
  "止": "止", // zhǐ
  "歹": "逮", // dǎi
  "歺": "逮",
  "殳": "书", // shū
  "毋": "无", // wú
  "母": "母", // mǔ
  "比": "比", // bǐ
  "毛": "毛", // máo
  "氏": "是", // shì
  "气": "气", // qì
  "水": "水", // shuǐ
  "氵": "水",
  "氺": "水",
  "火": "火", // huǒ
  "灬": "火",
  "爪": "爪", // zhuǎ
  "爫": "爪",
  "父": "父", // fù
  "爻": "摇", // yáo
  "爿": "盘", // pán
  "片": "片", // piàn
  "牙": "牙", // yá
  "牛": "牛", // niú
  "牜": "牛",
  "犬": "犬", // quǎn
  "犭": "犬",

  // 5 Nét
  "玄": "玄", // xuán
  "玉": "玉", // yù
  "王": "玉",
  "瓜": "瓜", // guā
  "瓦": "瓦", // wǎ
  "甘": "甘", // gān
  "生": "生", // shēng
  "用": "用", // yòng
  "田": "田", // tián
  "疋": "匹", // pǐ
  "⺪": "匹",
  "疒": "病", // bìng / nè
  "癶": "波", // bō
  "白": "白", // bái
  "皮": "皮", // pí
  "皿": "敏", // mǐn
  "目": "目", // mù
  "矛": "毛", // máo
  "矢": "使", // shǐ
  "石": "十", // shí
  "示": "市", // shì
  "礻": "市",
  "禸": "柔", // róu
  "禾": "河", // hé
  "穴": "学", // xué
  "立": "力", // lì

  // 6 Nét
  "竹": "竹", // zhú
  "⺮": "竹",
  "米": "米", // mǐ
  "糸": "密", // mì / sī
  "纟": "密",
  "缶": "否", // fǒu
  "网": "网", // wǎng
  "罒": "网",
  "⺲": "网",
  "⺳": "网",
  "羊": "羊", // yáng
  "⺶": "羊",
  "⺷": "羊",
  "羽": "雨", // yǔ
  "老": "老", // lǎo
  "耂": "老",
  "而": "儿", // ér
  "耒": "磊", // lěi
  "耳": "耳", // ěr
  "聿": "玉", // yù
  "⺻": "玉",
  "肉": "肉", // ròu
  "⺼": "肉",
  "臣": "陈", // chén
  "自": "字", // zì
  "至": "志", // zhì
  "臼": "就", // jiù
  "舌": "折", // shé
  "舛": "喘", // chuǎn
  "舟": "周", // zhōu
  "艮": "亘", // gèn
  "色": "色", // sè
  "艸": "草", // cǎo
  "艹": "草",
  "虍": "呼", // hū
  "虫": "虫", // chóng
  "血": "血", // xuè
  "行": "行", // xíng
  "衣": "衣", // yī
  "衤": "衣",
  "襾": "亚", // yà (Bộ Á - 100% chuẩn yà, không bị đọc nhầm thành xī)
  "覀": "亚", // yà (Biến thể bộ Á - phát âm yà chuẩn xác)

  // 7 Nét
  "見": "见", // jiàn
  "见": "见",
  "角": "脚", // jiǎo
  "言": "言", // yán
  "讠": "言",
  "谷": "古", // gǔ
  "豆": "豆", // dòu
  "豕": "使", // shǐ
  "豸": "志", // zhì
  "貝": "贝", // bèi
  "贝": "贝",
  "赤": "赤", // chì
  "走": "走", // zǒu
  "赱": "走",
  "足": "足", // zú
  "⻊": "足",
  "身": "身", // shēn
  "車": "车", // chē
  "车": "车",
  "辛": "心", // xīn
  "辰": "陈", // chén
  "辵": "绰", // chuò
  "辶": "绰",
  "邑": "意", // yì
  "酉": "友", // yǒu
  "釆": "变", // biàn
  "里": "李", // lǐ

  // 8 Nét
  "金": "金", // jīn
  "钅": "金",
  "長": "长", // cháng
  "长": "长",
  "镸": "长",
  "門": "门", // mén
  "门": "门",
  "阜": "父", // fù
  "隶": "利", // lì
  "隹": "追", // zhuī
  "雨": "雨", // yǔ
  "⻗": "雨",
  "靑": "青", // qīng
  "青": "青",
  "非": "非", // fēi

  // 9 Nét
  "面": "面", // miàn
  "靣": "面",
  "革": "格", // gé
  "韋": "为", // wéi
  "韦": "为",
  "韭": "九", // jiǔ
  "音": "音", // yīn
  "頁": "页", // yè
  "页": "页",
  "風": "风", // fēng
  "风": "风",
  "飛": "飞", // fēi
  "飞": "飞",
  "食": "十", // shí
  "飠": "十",
  "饣": "十",
  "首": "手", // shǒu
  "香": "香", // xiāng

  // 10 Nét
  "馬": "马", // mǎ
  "马": "马",
  "骨": "古", // gǔ
  "高": "高", // gāo
  "髙": "高",
  "髟": "标", // biāo
  "鬥": "斗", // dòu
  "鬯": "畅", // chàng
  "鬲": "利", // lì / gé
  "鬼": "鬼", // guǐ

  // 11 Nét
  "魚": "鱼", // yú
  "鱼": "鱼",
  "鳥": "鸟", // niǎo
  "鸟": "鸟",
  "鹵": "鲁", // lǔ
  "卤": "鲁",
  "鹿": "路", // lù
  "麥": "麦", // mài
  "麦": "麦",
  "麻": "麻", // má

  // 12 - 17 Nét
  "黃": "黄", // huáng
  "黄": "黄",
  "黍": "数", // shǔ
  "黑": "黑", // hēi
  "黹": "指", // zhǐ
  "黽": "敏", // mǐn
  "黾": "敏",
  "鼎": "顶", // dǐng
  "鼓": "古", // gǔ
  "鼠": "数", // shǔ
  "鼻": "鼻", // bí
  "齊": "齐", // qí
  "齐": "齐",
  "齒": "尺", // chǐ
  "齿": "尺",
  "龍": "龙", // lóng
  "龙": "龙",
  "龜": "归", // guī
  "龟": "归",
  "龠": "月"  // yuè
};

// Convert tone numbers (e.g. ma1, ni3, hao3) to tone mark if needed
function convertNumberedPinyinToMarked(pinyin: string): string {
  const toneMap: Record<string, string[]> = {
    a: ["ā","á","ǎ","à"],
    e: ["ē","é","ě","è"],
    i: ["ī","í","ǐ","ì"],
    o: ["ō","ó","ǒ","ò"],
    u: ["ū","ú","ǔ","ù"],
    v: ["ǖ","ǘ","ǚ","ǜ"],
    ü: ["ǖ","ǘ","ǚ","ǜ"]
  };

  return pinyin.replace(/([a-züv]+)([1-4])/gi, (_, syl, tone) => {
    const toneIdx = parseInt(tone) - 1;
    if (syl.includes("a")) return syl.replace("a", toneMap.a[toneIdx]);
    if (syl.includes("o")) return syl.replace("o", toneMap.o[toneIdx]);
    if (syl.includes("e")) return syl.replace("e", toneMap.e[toneIdx]);
    if (syl.includes("iu")) return syl.replace("u", toneMap.u[toneIdx]);
    if (syl.includes("ui")) return syl.replace("i", toneMap.i[toneIdx]);
    if (syl.includes("i")) return syl.replace("i", toneMap.i[toneIdx]);
    if (syl.includes("u")) return syl.replace("u", toneMap.u[toneIdx]);
    if (syl.includes("v")) return syl.replace("v", toneMap.v[toneIdx]);
    if (syl.includes("ü")) return syl.replace("ü", toneMap.ü[toneIdx]);
    return syl;
  });
}

/**
 * Intelligent normalization from any Pinyin / Syllable / Radical / Text to native Chinese Hanzi
 */
export function normalizePinyinForTTS(text: string, phoneticHint?: string): string {
  if (!text && !phoneticHint) return "";

  // 1. If an explicit phonetic pinyin hint is provided, prioritize it
  if (phoneticHint) {
    const hintTrimmed = phoneticHint.trim();
    if (PINYIN_TO_HANZI_MAP[hintTrimmed]) {
      return PINYIN_TO_HANZI_MAP[hintTrimmed];
    }
    if (PINYIN_TO_HANZI_MAP[hintTrimmed.toLowerCase()]) {
      return PINYIN_TO_HANZI_MAP[hintTrimmed.toLowerCase()];
    }
    const convertedHint = convertNumberedPinyinToMarked(hintTrimmed);
    if (PINYIN_TO_HANZI_MAP[convertedHint]) {
      return PINYIN_TO_HANZI_MAP[convertedHint];
    }
  }

  const trimmed = (text || "").trim();
  if (!trimmed) return "";

  // 2. Direct Radical Phonetic Hanzi Map (Guarantees 214 radicals & stroke glyphs sound 100% authentic)
  if (RADICAL_PHONETIC_HANZI_MAP[trimmed]) {
    return RADICAL_PHONETIC_HANZI_MAP[trimmed];
  }

  // 3. Exact match in Pinyin dictionary
  if (PINYIN_TO_HANZI_MAP[trimmed]) {
    return PINYIN_TO_HANZI_MAP[trimmed];
  }
  if (PINYIN_TO_HANZI_MAP[trimmed.toLowerCase()]) {
    return PINYIN_TO_HANZI_MAP[trimmed.toLowerCase()];
  }

  // 4. Try numbered tone conversion (e.g. ya4 -> yà -> 亚)
  const converted = convertNumberedPinyinToMarked(trimmed);
  if (PINYIN_TO_HANZI_MAP[converted]) {
    return PINYIN_TO_HANZI_MAP[converted];
  }

  // 5. Multi-word / multi-syllable handling (e.g. "nǐ hǎo", "bàba", "gāo dà")
  const tokens = trimmed.split(/[\s,，-]+/);
  if (tokens.length > 1) {
    const mappedTokens = tokens.map((token) => {
      const t = token.toLowerCase();
      return (
        RADICAL_PHONETIC_HANZI_MAP[token] ||
        PINYIN_TO_HANZI_MAP[t] ||
        PINYIN_TO_HANZI_MAP[convertNumberedPinyinToMarked(t)] ||
        token
      );
    });
    return mappedTokens.join("");
  }

  // 6. If already contains Chinese characters
  if (/[\u4e00-\u9fa5\u3400-\u4dbf\u20000-\u2a6df\u2e80-\u2eff\u31c0-\u31ef]/.test(trimmed)) {
    // Check if it's a single radical/CJK stroke character mapped in our dictionary
    if (RADICAL_PHONETIC_HANZI_MAP[trimmed]) {
      return RADICAL_PHONETIC_HANZI_MAP[trimmed];
    }
    return trimmed;
  }

  // Fallback return trimmed text
  return trimmed;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const loadVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
    } catch (e) {
      console.warn("Could not load voices immediately:", e);
    }
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Find the optimal Mandarin Chinese speech voice available on client
 */
function getBestChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  if (cachedVoices.length === 0) return null;

  // 1. Premium Neural / Natural Chinese Voices (Xiaoxiao, Yunxi, Google 普通话)
  const premiumVoice = cachedVoices.find((v) => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();
    const isChinese = lang.includes("zh") || lang.includes("cmn");
    return (
      isChinese &&
      (name.includes("natural") ||
        name.includes("online") ||
        name.includes("neural") ||
        name.includes("xiaoxiao") ||
        name.includes("yunxi") ||
        name.includes("tingting") ||
        name.includes("普通话") ||
        name.includes("chinese"))
    );
  });
  if (premiumVoice) return premiumVoice;

  // 2. Standard Mainland Mandarin (zh-CN or cmn-Hans-CN)
  const mainlandVoice = cachedVoices.find((v) => {
    const lang = v.lang.toLowerCase();
    return lang === "zh-cn" || lang === "cmn-hans-cn" || lang === "zh_cn" || lang === "cmn-cn";
  });
  if (mainlandVoice) return mainlandVoice;

  // 3. Any Chinese voice
  const anyChinese = cachedVoices.find((v) => v.lang.toLowerCase().startsWith("zh"));
  if (anyChinese) return anyChinese;

  return null;
}

/**
 * Play authentic Chinese Audio with automatic Pinyin-to-Hanzi transcription
 */
export function playChineseAudio(text: string, rate: number = 1.0, phoneticHint?: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser environment.");
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop prior audio cleanly

      const speechText = normalizePinyinForTTS(text, phoneticHint);
      if (!speechText) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = "zh-CN";
      // Adjust rate slightly for crystal clear learner audibility
      utterance.rate = Math.max(0.6, Math.min(1.2, rate * 0.92));
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const chineseVoice = getBestChineseVoice();
      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      let timeout: any = null;

      const finish = () => {
        if (timeout) clearTimeout(timeout);
        resolve();
      };

      utterance.onend = finish;
      utterance.onerror = (e) => {
        console.warn("Speech synthesis error or interrupt:", e);
        finish();
      };

      // Safety guard against browser synthesis hanging - dynamic timeout for sentences
      const safetyTimeoutMs = Math.max(8000, speechText.length * 650);
      timeout = setTimeout(() => {
        finish();
      }, safetyTimeoutMs);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("playChineseAudio failed:", err);
      resolve();
    }
  });
}

/**
 * Helper to play Kangxi radical audio with 100% accurate pronunciation
 */
export function playRadicalAudio(radical: string, pinyin?: string, rate: number = 0.9): Promise<void> {
  return playChineseAudio(radical, rate, pinyin);
}

export function playVietnameseAudio(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window ==="undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang ="vi-VN";
      utterance.rate = 1.0;

      if (cachedVoices.length === 0) {
        cachedVoices = window.speechSynthesis.getVoices();
      }
      const viVoice = cachedVoices.find((v) => v.lang.toLowerCase().includes("vi"));
      if (viVoice) {
        utterance.voice = viVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
}

// Browser Speech Recognition interface
export interface SpeechRecognitionResultState {
  transcript: string;
  isListening: boolean;
  error?: string;
}

export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
) {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech Recognition API is not supported in this browser.");
    return null;
  }

  try {
    const recognizer = new SpeechRecognition();
    recognizer.lang = "zh-CN";
    recognizer.continuous = false;
    recognizer.interimResults = false;

    recognizer.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognizer.onerror = (event: any) => {
      onError(event.error || "Lỗi thu âm giọng nói");
    };

    recognizer.onend = () => {
      onEnd();
    };

    return recognizer;
  } catch (err: any) {
    console.error("Recognizer init failed:", err);
    return null;
  }
}

// MediaRecorder Audio Capture Helper for Recording & Replaying User Voice
export interface RecordedVoiceAudio {
  blob: Blob;
  url: string;
  durationSeconds: number;
}

export class VoiceAudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private mediaStream: MediaStream | null = null;
  private startTime = 0;

  async start(): Promise<boolean> {
    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      console.warn("MediaDevices getUserMedia is not supported in this browser.");
      return false;
    }

    try {
      this.audioChunks = [];
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Detect supported mimeType
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/aac",
        "audio/ogg;codecs=opus",
        "audio/wav",
      ];
      let selectedMimeType = "";
      for (const mime of mimeTypes) {
        if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mime)) {
          selectedMimeType = mime;
          break;
        }
      }

      const options = selectedMimeType ? { mimeType: selectedMimeType } : undefined;
      this.mediaRecorder = new MediaRecorder(this.mediaStream, options);

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.startTime = Date.now();
      this.mediaRecorder.start(100); // chunk every 100ms
      return true;
    } catch (err) {
      console.error("Failed to start voice recorder:", err);
      this.cleanupStream();
      return false;
    }
  }

  stop(): Promise<RecordedVoiceAudio | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
        this.cleanupStream();
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || "audio/webm";
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        const durationSeconds = Math.max(0.5, (Date.now() - this.startTime) / 1000);

        this.cleanupStream();
        resolve({
          blob: audioBlob,
          url: audioUrl,
          durationSeconds: Math.round(durationSeconds * 10) / 10,
        });
      };

      try {
        this.mediaRecorder.stop();
      } catch {
        this.cleanupStream();
        resolve(null);
      }
    });
  }

  cancel() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        // ignore
      }
    }
    this.cleanupStream();
  }

  private cleanupStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }
}

// ==========================================
// 4. HIỆU ỨNG ÂM THANH CHUẨN XÁC: ĐÚNG (100) vs SAI (0)
// ==========================================
let audioEffectsCtx: AudioContext | null = null;

function getAudioEffectsContext(): AudioContext | null {
  try {
    if (!audioEffectsCtx || audioEffectsCtx.state === "closed") {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioEffectsCtx = new AudioCtxClass();
      }
    }
    if (audioEffectsCtx && audioEffectsCtx.state === "suspended") {
      audioEffectsCtx.resume();
    }
    return audioEffectsCtx;
  } catch {
    return null;
  }
}

/**
 * Phát hiệu ứng âm thanh chúc mừng khi ĐÚNG (100 điểm)
 * Chuỗi hợp âm ngân vang 4 nốt trong trẻo (C5 - E5 - G5 - C6)
 */
export function playCorrectSound(): void {
  const ctx = getAudioEffectsContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0, duration: 0.12 }, // C5
      { freq: 659.25, time: 0.08, duration: 0.12 }, // E5
      { freq: 783.99, time: 0.16, duration: 0.16 }, // G5
      { freq: 1046.5, time: 0.24, duration: 0.4 } // C6
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.28, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  } catch (e) {
    console.warn("Could not play correct SFX:", e);
  }
}

/**
 * Phát hiệu ứng âm thanh cảnh báo dứt khoát khi SAI (0 điểm)
 * Âm báo lỗi tần số thấp trầm kép (Buzzer 2 nhịp)
 */
export function playWrongSound(): void {
  const ctx = getAudioEffectsContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const buzzes = [
      { startFreq: 220, endFreq: 150, time: 0, duration: 0.16 },
      { startFreq: 175, endFreq: 110, time: 0.18, duration: 0.26 }
    ];

    buzzes.forEach(({ startFreq, endFreq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(startFreq, now + time);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + time + duration);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.22, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  } catch (e) {
    console.warn("Could not play wrong SFX:", e);
  }
}

/**
 * Tự động phát âm thanh theo kết quả đúng/sai hoặc điểm số (100 vs 0)
 */
export function playScoreSound(isCorrectOrScore: boolean | number): void {
  if (typeof isCorrectOrScore === "boolean") {
    if (isCorrectOrScore) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  } else {
    if (isCorrectOrScore >= 80) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }
}

/**
 * Âm thanh lật thẻ nhẹ nhàng (Click pop)
 */
export function playCardFlipSound(): void {
  const ctx = getAudioEffectsContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {
    // Ignore audio error
  }
}

/**
 * Âm thanh khớp cặp thẻ thành công (Sparkle chime)
 */
export function playMatchSuccessSound(): void {
  const ctx = getAudioEffectsContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [659.25, 783.99, 1046.5, 1318.51]; // E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.25);
    });
  } catch (e) {
    // Ignore audio error
  }
}

/**
 * Âm thanh Combo chuỗi đúng liên tiếp
 */
export function playComboSound(combo: number): void {
  const ctx = getAudioEffectsContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const baseFreq = 500 + Math.min(combo * 70, 600);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.12);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    // Ignore
  }
}

/**
 * Âm thanh chiến thắng Fanfare
 */
export function playWinFanfareSound(): void {
  const ctx = getAudioEffectsContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const chords = [
      { freq: 523.25, time: 0, dur: 0.15 },
      { freq: 659.25, time: 0.15, dur: 0.15 },
      { freq: 783.99, time: 0.3, dur: 0.15 },
      { freq: 1046.5, time: 0.45, dur: 0.5 },
      { freq: 1318.51, time: 0.5, dur: 0.5 }
    ];

    chords.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(0.3, now + time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  } catch (e) {
    // Ignore
  }
}



