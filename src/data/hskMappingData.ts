// Centralized HSK and Garment lookup mapping to guarantee fast and accurate level labeling
// in both SearchModal and DictionaryView regardless of backend state

import { ALL_HSK_VOCABULARY } from "./hskVocab";
import { GARMENT_TERMS } from "./garmentData";
import { LESSON_VOCABULARY_MAP } from "./lessonVocabulary";
import { LESSON_VOCABULARY_EXTENSIONS } from "./lessonVocabExtension";
import { COMMON_THEMES_VOCABULARY } from "./commonThemesVocab";

// In-memory lookup maps
const HSK_LOOKUP_MAP = new Map<string, string>();
const GARMENT_LOOKUP_SET = new Set<string>();

// 1. High-frequency HSK 1 - HSK 6 terms
const ESSENTIAL_HSK_ENTRIES: [string, string][] = [
  // HSK 1 Core & Essential Greetings
  ["你好", "HSK 1"],
  ["您好", "HSK 1"],
  ["早上好", "HSK 1"],
  ["晚上好", "HSK 1"],
  ["明天见", "HSK 1"],
  ["不用谢", "HSK 1"],
  ["不客气", "HSK 1"],
  ["对不起", "HSK 1"],
  ["没关系", "HSK 1"],
  ["谢谢", "HSK 1"],
  ["再见", "HSK 1"],
  ["请问", "HSK 1"],
  ["欢迎", "HSK 1"],
  ["客气", "HSK 1"],
  ["名字", "HSK 1"],
  ["哪个", "HSK 1"],
  ["几点", "HSK 1"],
  ["什么", "HSK 1"],
  ["怎么", "HSK 1"],
  ["怎么样", "HSK 1"],
  ["多少", "HSK 1"],
  ["家里", "HSK 1"],
  ["吃饭", "HSK 1"],
  ["喝水", "HSK 1"],
  ["买东西", "HSK 1"],
  ["看书", "HSK 1"],
  ["说话", "HSK 1"],
  ["看见", "HSK 1"],
  ["听见", "HSK 1"],
  ["回家", "HSK 1"],
  ["上学", "HSK 1"],
  ["我", "HSK 1"],
  ["你", "HSK 1"],
  ["您", "HSK 1"],
  ["他", "HSK 1"],
  ["她", "HSK 1"],
  ["我们", "HSK 1"],
  ["你们", "HSK 1"],
  ["他们", "HSK 1"],
  ["这", "HSK 1"],
  ["这儿", "HSK 1"],
  ["那", "HSK 1"],
  ["那儿", "HSK 1"],
  ["哪", "HSK 1"],
  ["哪儿", "HSK 1"],
  ["谁", "HSK 1"],
  ["几", "HSK 1"],
  ["一", "HSK 1"],
  ["二", "HSK 1"],
  ["三", "HSK 1"],
  ["四", "HSK 1"],
  ["五", "HSK 1"],
  ["六", "HSK 1"],
  ["七", "HSK 1"],
  ["八", "HSK 1"],
  ["九", "HSK 1"],
  ["十", "HSK 1"],
  ["零", "HSK 1"],
  ["个", "HSK 1"],
  ["岁", "HSK 1"],
  ["本", "HSK 1"],
  ["些", "HSK 1"],
  ["块", "HSK 1"],
  ["不", "HSK 1"],
  ["没", "HSK 1"],
  ["很", "HSK 1"],
  ["太", "HSK 1"],
  ["都", "HSK 1"],
  ["的", "HSK 1"],
  ["了", "HSK 1"],
  ["吗", "HSK 1"],
  ["呢", "HSK 1"],
  ["和", "HSK 1"],
  ["在", "HSK 1"],
  ["现在", "HSK 1"],
  ["今天", "HSK 1"],
  ["明天", "HSK 1"],
  ["昨天", "HSK 1"],
  ["上午", "HSK 1"],
  ["中午", "HSK 1"],
  ["下午", "HSK 1"],
  ["年", "HSK 1"],
  ["月", "HSK 1"],
  ["日", "HSK 1"],
  ["号", "HSK 1"],
  ["星期", "HSK 1"],
  ["星期一", "HSK 1"],
  ["星期二", "HSK 1"],
  ["星期三", "HSK 1"],
  ["星期四", "HSK 1"],
  ["星期五", "HSK 1"],
  ["星期六", "HSK 1"],
  ["星期天", "HSK 1"],
  ["星期日", "HSK 1"],
  ["点", "HSK 1"],
  ["分钟", "HSK 1"],
  ["时候", "HSK 1"],
  ["人", "HSK 1"],
  ["爸爸", "HSK 1"],
  ["妈妈", "HSK 1"],
  ["儿子", "HSK 1"],
  ["女儿", "HSK 1"],
  ["老师", "HSK 1"],
  ["学生", "HSK 1"],
  ["同学", "HSK 1"],
  ["朋友", "HSK 1"],
  ["医生", "HSK 1"],
  ["先生", "HSK 1"],
  ["小姐", "HSK 1"],
  ["家", "HSK 1"],
  ["学校", "HSK 1"],
  ["饭馆", "HSK 1"],
  ["商店", "HSK 1"],
  ["医院", "HSK 1"],
  ["火车站", "HSK 1"],
  ["中国", "HSK 1"],
  ["北京", "HSK 1"],
  ["上", "HSK 1"],
  ["下", "HSK 1"],
  ["前面", "HSK 1"],
  ["后面", "HSK 1"],
  ["里", "HSK 1"],
  ["里面", "HSK 1"],
  ["水", "HSK 1"],
  ["茶", "HSK 1"],
  ["米饭", "HSK 1"],
  ["菜", "HSK 1"],
  ["苹果", "HSK 1"],
  ["杯子", "HSK 1"],
  ["衣服", "HSK 1"],
  ["书", "HSK 1"],
  ["钱", "HSK 1"],
  ["飞机", "HSK 1"],
  ["出租车", "HSK 1"],
  ["电视", "HSK 1"],
  ["电脑", "HSK 1"],
  ["电影", "HSK 1"],
  ["天气", "HSK 1"],
  ["猫", "HSK 1"],
  ["狗", "HSK 1"],
  ["东西", "HSK 1"],
  ["是", "HSK 1"],
  ["有", "HSK 1"],
  ["看", "HSK 1"],
  ["听", "HSK 1"],
  ["读", "HSK 1"],
  ["写", "HSK 1"],
  ["叫", "HSK 1"],
  ["来", "HSK 1"],
  ["去", "HSK 1"],
  ["回", "HSK 1"],
  ["吃", "HSK 1"],
  ["喝", "HSK 1"],
  ["睡觉", "HSK 1"],
  ["买", "HSK 1"],
  ["开", "HSK 1"],
  ["坐", "HSK 1"],
  ["住", "HSK 1"],
  ["学习", "HSK 1"],
  ["工作", "HSK 1"],
  ["做", "HSK 1"],
  ["下雨", "HSK 1"],
  ["爱", "HSK 1"],
  ["喜欢", "HSK 1"],
  ["想", "HSK 1"],
  ["认识", "HSK 1"],
  ["会", "HSK 1"],
  ["能", "HSK 1"],
  ["请", "HSK 1"],
  ["好", "HSK 1"],
  ["多", "HSK 1"],
  ["少", "HSK 1"],
  ["大", "HSK 1"],
  ["小", "HSK 1"],
  ["冷", "HSK 1"],
  ["热", "HSK 1"],
  ["高兴", "HSK 1"],
  ["漂亮", "HSK 1"],
  ["喂", "HSK 1"],
  ["汉语", "HSK 1"],
  ["字", "HSK 1"],
  ["汉字", "HSK 1"],

  // HSK 2 Core
  ["上班", "HSK 2"],
  ["下班", "HSK 2"],
  ["休息", "HSK 2"],
  ["运动", "HSK 2"],
  ["旅游", "HSK 2"],
  ["唱歌", "HSK 2"],
  ["跳舞", "HSK 2"],
  ["游泳", "HSK 2"],
  ["跑步", "HSK 2"],
  ["打篮球", "HSK 2"],
  ["生病", "HSK 2"],
  ["感冒", "HSK 2"],
  ["发烧", "HSK 2"],
  ["咳嗽", "HSK 2"],
  ["身体", "HSK 2"],
  ["眼睛", "HSK 2"],
  ["手", "HSK 2"],
  ["头发", "HSK 2"],
  ["羊肉", "HSK 2"],
  ["鸡蛋", "HSK 2"],
  ["西瓜", "HSK 2"],
  ["牛奶", "HSK 2"],
  ["咖啡", "HSK 2"],
  ["药", "HSK 2"],
  ["手表", "HSK 2"],
  ["手机", "HSK 2"],
  ["报纸", "HSK 2"],
  ["自行车", "HSK 2"],
  ["公共汽车", "HSK 2"],
  ["船", "HSK 2"],
  ["新", "HSK 2"],
  ["旧", "HSK 2"],
  ["忙", "HSK 2"],
  ["累", "HSK 2"],
  ["贵", "HSK 2"],
  ["便宜", "HSK 2"],
  ["快", "HSK 2"],
  ["慢", "HSK 2"],
  ["远", "HSK 2"],
  ["近", "HSK 2"],
  ["晴", "HSK 2"],
  ["阴", "HSK 2"],
  ["错", "HSK 2"],
  ["快乐", "HSK 2"],
  ["机场", "HSK 2"],
  ["教室", "HSK 2"],
  ["房间", "HSK 2"],
  ["路", "HSK 2"],
  ["左边", "HSK 2"],
  ["右边", "HSK 2"],
  ["旁边", "HSK 2"],
  ["外面", "HSK 2"],
  ["颜色", "HSK 2"],
  ["红色", "HSK 2"],
  ["白色", "HSK 2"],
  ["黑色", "HSK 2"],
  ["每", "HSK 2"],
  ["为什么", "HSK 2"],
  ["第一", "HSK 2"],
  ["两", "HSK 2"],
  ["百", "HSK 2"],
  ["千", "HSK 2"],
  ["次", "HSK 2"],
  ["件", "HSK 2"],
  ["张", "HSK 2"],
  ["斤", "HSK 2"],
  ["也", "HSK 2"],
  ["还", "HSK 2"],
  ["最", "HSK 2"],
  ["真", "HSK 2"],
  ["正在", "HSK 2"],
  ["已经", "HSK 2"],
  ["一起", "HSK 2"],
  ["再", "HSK 2"],
  ["就", "HSK 2"],
  ["别", "HSK 2"],
  ["非常", "HSK 2"],
  ["因为", "HSK 2"],
  ["所以", "HSK 2"],
  ["但是", "HSK 2"],
  ["虽然", "HSK 2"],
  ["从", "HSK 2"],
  ["比", "HSK 2"],
  ["向", "HSK 2"],
  ["往", "HSK 2"],
  ["离", "HSK 2"],
  ["对", "HSK 2"],
  ["走", "HSK 2"],
  ["跑", "HSK 2"],
  ["进", "HSK 2"],
  ["出", "HSK 2"],
  ["穿", "HSK 2"],
  ["洗", "HSK 2"],
  ["帮", "HSK 2"],
  ["帮助", "HSK 2"],
  ["懂", "HSK 2"],
  ["问", "HSK 2"],
  ["笑", "HSK 2"],
  ["告诉", "HSK 2"],
  ["准备", "HSK 2"],
  ["开始", "HSK 2"],
  ["介绍", "HSK 2"],
  ["玩", "HSK 2"],
  ["送", "HSK 2"],
  ["等", "HSK 2"],
  ["让", "HSK 2"],
  ["给", "HSK 2"],
  ["找", "HSK 2"],
  ["完", "HSK 2"],
  ["到", "HSK 2"],
  ["希望", "HSK 2"],

  // HSK 3 Core
  ["办公室", "HSK 3"],
  ["经理", "HSK 3"],
  ["会议", "HSK 3"],
  ["工资", "HSK 3"],
  ["计划", "HSK 3"],
  ["安排", "HSK 3"],
  ["决定", "HSK 3"],
  ["解决", "HSK 3"],
  ["完成", "HSK 3"],
  ["提高", "HSK 3"],
  ["迟到", "HSK 3"],
  ["请假", "HSK 3"],
  ["努力", "HSK 3"],
  ["认真", "HSK 3"],
  ["满意", "HSK 3"],
  ["机会", "HSK 3"],
  ["同事", "HSK 3"],
  ["检查", "HSK 3"],
  ["质量", "HSK 3"],
  ["要求", "HSK 3"],
  ["超市", "HSK 3"],
  ["宾馆", "HSK 3"],
  ["信用卡", "HSK 3"],
  ["行李箱", "HSK 3"],
  ["护照", "HSK 3"],
  ["照相机", "HSK 3"],
  ["菜单", "HSK 3"],
  ["筷子", "HSK 3"],
  ["饮料", "HSK 3"],
  ["啤酒", "HSK 3"],
  ["新鲜", "HSK 3"],
  ["甜", "HSK 3"],
  ["辣", "HSK 3"],
  ["把", "HSK 3"],
  ["被", "HSK 3"],
  ["相信", "HSK 3"],
  ["担心", "HSK 3"],
  ["放心", "HSK 3"],
  ["照顾", "HSK 3"],
  ["关心", "HSK 3"],
  ["特别", "HSK 3"],
  ["突然", "HSK 3"],
  ["一直", "HSK 3"],
  ["马上", "HSK 3"],
  ["必须", "HSK 3"],
  ["应该", "HSK 3"],
  ["差不多", "HSK 3"],
  ["其实", "HSK 3"],

  // HSK 4 - 6 Highlights
  ["合同", "HSK 4"],
  ["谈判", "HSK 4"],
  ["投资", "HSK 4"],
  ["法律", "HSK 4"],
  ["责任", "HSK 4"],
  ["态度", "HSK 4"],
  ["经验", "HSK 4"],
  ["招聘", "HSK 4"],
  ["简历", "HSK 4"],
  ["竞争", "HSK 4"],
  ["建议", "HSK 4"],
  ["报告", "HSK 4"],
  ["组织", "HSK 4"],
  ["交流", "HSK 4"],
  ["环境", "HSK 4"],
  ["污染", "HSK 4"],
  ["保护", "HSK 4"],
  ["技术", "HSK 4"],
  ["互联网", "HSK 4"],
  ["经济", "HSK 4"],
  ["不可抗力", "HSK 5"],
  ["信用证", "HSK 5"],
  ["提单", "HSK 5"],
  ["清关", "HSK 5"],
  ["违约", "HSK 5"],
  ["索赔", "HSK 5"],
  ["仲裁", "HSK 5"],
  ["汇率", "HSK 5"],
  ["数字孪生", "HSK 6"],
  ["物联网", "HSK 6"],
  ["碳中和", "HSK 6"],
  ["供应链韧性", "HSK 6"],
  ["尽职调查", "HSK 6"],
  ["知识产权", "HSK 6"]
];

function formatHskLevel(lvl: string): string {
  if (!lvl) return "";
  const upper = lvl.toUpperCase().trim();
  if (upper.startsWith("HSK")) {
    const num = upper.replace("HSK", "").trim();
    return num ? `HSK ${num}` : "HSK";
  }
  return lvl;
}

function registerHsk(hanzi: string, level: string) {
  if (!hanzi || !level) return;
  const clean = hanzi.trim();
  if (!clean) return;
  const fmt = formatHskLevel(level);
  HSK_LOOKUP_MAP.set(clean, fmt);

  const stripped = clean.replace(/\s*\([^)]*\)/g, "").trim();
  if (stripped && stripped !== clean) {
    HSK_LOOKUP_MAP.set(stripped, fmt);
  }
  const match = clean.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    HSK_LOOKUP_MAP.set(match[1].trim(), fmt);
  }
}

// Populate essential
ESSENTIAL_HSK_ENTRIES.forEach(([h, l]) => registerHsk(h, l));

// Populate from curriculum files
ALL_HSK_VOCABULARY.forEach((w) => {
  if (w.hanzi && w.hskLevel) registerHsk(w.hanzi, w.hskLevel);
});

Object.values(LESSON_VOCABULARY_MAP).forEach((list) => {
  list.forEach((w) => {
    if (w.hanzi && w.hskLevel) registerHsk(w.hanzi, w.hskLevel);
  });
});

Object.values(LESSON_VOCABULARY_EXTENSIONS).forEach((list) => {
  list.forEach((w) => {
    if (w.hanzi && w.hskLevel) registerHsk(w.hanzi, w.hskLevel);
  });
});

COMMON_THEMES_VOCABULARY.forEach((w) => {
  if (w.hanzi && w.hskLevel) registerHsk(w.hanzi, w.hskLevel);
});

// Garment terms
GARMENT_TERMS.forEach((g) => {
  if (g.hanzi) {
    const h = g.hanzi.trim();
    GARMENT_LOOKUP_SET.add(h);
    if (h.includes("/")) {
      h.split("/").forEach((p) => GARMENT_LOOKUP_SET.add(p.trim()));
    }
  }
});

// Additional factory / garment specialized terms
const EXTRA_GARMENT_TERMS = [
  "服装", "服装厂", "车间", "产线", "流水线", "组长", "车位工", "缝纫工", "机修工", "机修",
  "质检员", "QC", "IE", "辅料库", "原材料库", "厂长", "车间主管", "平缝机", "平车", "拷边机",
  "包缝机", "锁边机", "绷缝机", "坎车", "冚车", "凤眼机", "钉扣机", "钉钮机", "套结机",
  "打枣机", "裁剪机", "电剪", "压烫机", "烫台", "拉布", "铺布", "裁剪", "合缝", "车缝",
  "上领", "装领", "上袖", "装袖", "剪线头", "后道", "包装", "产量", "效率", "工艺单",
  "技术资料", "次品", "不良品", "跳针", "断线", "起皱", "扭曲", "面料", "布料", "纯棉",
  "全棉", "涤纶", "聚酯纤维", "氨纶", "弹力纤维", "里料", "衬里", "粘合衬", "朴布",
  "辅料", "拉链", "纽扣", "按扣", "缝纫线", "宝塔线", "洗水唛", "主唛", "尺码唛",
  "松紧带", "橡筋", "衣长", "胸围", "肩宽", "袖长", "腰围", "臀围", "色差", "污渍",
  "油污", "破洞", "抽纱", "裁床", "打版", "纸样", "样衣", "缝纫"
];

EXTRA_GARMENT_TERMS.forEach((term) => GARMENT_LOOKUP_SET.add(term));

/**
 * Returns standardized HSK level ("HSK 1", "HSK 2", ... "HSK 6") if known, else undefined
 */
export function getWordHskLevel(hanzi: string): string | undefined {
  if (!hanzi) return undefined;
  const h = hanzi.trim();
  const direct = HSK_LOOKUP_MAP.get(h);
  if (direct) return direct;

  const stripped = h.replace(/\s*\([^)]*\)/g, "").trim();
  if (stripped) {
    const strippedFound = HSK_LOOKUP_MAP.get(stripped);
    if (strippedFound) return strippedFound;
  }

  return undefined;
}

/**
 * Checks if a word is specialized garment / factory vocabulary
 */
export function isWordGarment(hanzi: string): boolean {
  if (!hanzi) return false;
  const h = hanzi.trim();
  if (GARMENT_LOOKUP_SET.has(h)) return true;
  for (const g of GARMENT_LOOKUP_SET) {
    if (h === g || (h.length >= 2 && g.length >= 2 && (h.includes(g) || g.includes(h)))) {
      return true;
    }
  }
  return false;
}
