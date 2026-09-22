import { HanziWritingItem, ReadingItem, QuizQuestion } from "../types";

export const HANZI_WRITING_ITEMS: HanziWritingItem[] = [
  // ==========================================
  // HSK 1 & NHẬP MÔN & XÃ GIAO
  // ==========================================
  {
    hanzi: "谢",
    pinyin: "xiè",
    vietnamese: "Cảm ơn, tạ lỗi (trong 谢谢, 感谢)",
    radical: "讠(Ngôn - 2 nét)",
    strokeCount: 12,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Ngôn 讠-> Chữ Thân 身 -> Chữ Thốn 寸). Trên trước dưới sau.",
    strokeSteps: [
      "1. Nét chấm (丶) - Bộ Ngôn",
      "2. Nét ngang gập hất (𠃍) - Bộ Ngôn",
      "3. Nét phẩy ngắn (丿) - Thân",
      "4. Nét sổ (丨) - Thân",
      "5. Nét ngang gập móc (𠃍) - Thân",
      "6. Nét ngang trong 1 (一) - Thân",
      "7. Nét ngang trong 2 (一) - Thân",
      "8. Nét ngang đáy (一) - Thân",
      "9. Nét phẩy dài xiên (丿) - Thân",
      "10. Nét ngang (一) - Thốn",
      "11. Nét sổ móc (亅) - Thốn",
      "12. Nét chấm (丶) - Thốn"
    ],
    strokeOrderGuide: ["丶", "𠃍", "丿", "丨", "𠃍", "一", "一", "一", "丿", "一", "亅", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Nét Chấm (点)", strokePinyin: "diǎn", direction: "Chấm từ trên xuống chếch sang phải (1. Bộ Ngôn 讠)" },
      { step: 2, strokeChar: "𠃍", strokeName: "Nét Ngang gập hất (横折提)", strokePinyin: "héngzhétí", direction: "Ngang sang rồi gập hất nhọn lên (1. Bộ Ngôn 讠)" },
      { step: 3, strokeChar: "丿", strokeName: "Nét Phẩy ngắn (撇)", strokePinyin: "piě", direction: "Phẩy đỉnh trên thân mình (2. Chữ Thân 身)" },
      { step: 4, strokeChar: "丨", strokeName: "Nét Sổ thẳng (竖)", strokePinyin: "shù", direction: "Sổ dọc bên trái thân (2. Chữ Thân 身)" },
      { step: 5, strokeChar: "𠃍", strokeName: "Nét Ngang gập móc (横折钩)", strokePinyin: "héngzhégōu", direction: "Ngang gập bao quanh khung thân (2. Chữ Thân 身)" },
      { step: 6, strokeChar: "一", strokeName: "Nét Ngang trong 1 (横)", strokePinyin: "héng", direction: "Nét ngang giữa thứ nhất (2. Chữ Thân 身)" },
      { step: 7, strokeChar: "一", strokeName: "Nét Ngang trong 2 (横)", strokePinyin: "héng", direction: "Nét ngang giữa thứ hai (2. Chữ Thân 身)" },
      { step: 8, strokeChar: "一", strokeName: "Nét Ngang đáy (横)", strokePinyin: "héng", direction: "Ngang đóng đáy thân (2. Chữ Thân 身)" },
      { step: 9, strokeChar: "丿", strokeName: "Nét Phẩy dài xiên (撇)", strokePinyin: "piě", direction: "Phẩy dài xiên qua thân xuống góc trái (2. Chữ Thân 身)" },
      { step: 10, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Kéo ngang đầu bộ Thốn (3. Bộ Thốn 寸)" },
      { step: 11, strokeChar: "亅", strokeName: "Nét Sổ móc (竖钩)", strokePinyin: "shùgōu", direction: "Sổ thẳng dọc rồi móc lên trái (3. Bộ Thốn 寸)" },
      { step: 12, strokeChar: "丶", strokeName: "Nét Chấm tâm (点)", strokePinyin: "diǎn", direction: "Chấm chắc bên phải hoàn thành chữ 谢 (3. Bộ Thốn 寸)" }
    ],
    exampleCompound: "谢谢 (xièxie - Cảm ơn), 感谢 (gǎnxiè - Cảm tạ)"
  },
  {
    hanzi: "你",
    pinyin: "nǐ",
    vietnamese: "Bạn, anh, chị (ngôi thứ 2)",
    radical: "亻(Nhân đứng)",
    strokeCount: 7,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Nhân đứng trước, chữ Nhĩ sau), Trên trước dưới sau.",
    strokeSteps: [
      "1. Nét phẩy ngắn (丿)",
      "2. Nét sổ đứng (丨)",
      "3. Nét phẩy ngắn (丿)",
      "4. Nét ngang móc (乛)",
      "5. Nét sổ móc (亅)",
      "6. Nét phẩy trái (丿)",
      "7. Nét chấm phải (丶)"
    ],
    strokeOrderGuide: ["丿", "丨", "丿", "乛", "亅", "丿", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Nét Phẩy ngắn (撇)", strokePinyin: "piě", direction: "Từ trên xiên xuống trái (bộ Nhân)" },
      { step: 2, strokeChar: "丨", strokeName: "Nét Sổ đứng (竖)", strokePinyin: "shù", direction: "Kéo thẳng từ trên xuống hoàn thành bộ 亻" },
      { step: 3, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy xiên từ đầu góc trên bên phải" },
      { step: 4, strokeChar: "乛", strokeName: "Nét Ngang móc (横钩)", strokePinyin: "hénggōu", direction: "Kéo ngang rồi móc nhọn xuống" },
      { step: 5, strokeChar: "亅", strokeName: "Nét Sổ móc (竖钩)", strokePinyin: "shùgōu", direction: "Sổ thẳng giữa thân rồi móc lên trái" },
      { step: 6, strokeChar: "丿", strokeName: "Nét Phẩy trong (撇)", strokePinyin: "piě", direction: "Phẩy ngắn bên trái trong lòng" },
      { step: 7, strokeChar: "丶", strokeName: "Nét Chấm phải (点)", strokePinyin: "diǎn", direction: "Chấm chắc bên phải cân đối chữ" }
    ],
    exampleCompound: "你好 (nǐ hǎo - Xin chào), 你们 (nǐmen - Các bạn)"
  },
  {
    hanzi: "好",
    pinyin: "hǎo",
    vietnamese: "Tốt, đẹp, hay, được",
    radical: "女 (Nữ)",
    strokeCount: 6,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Nữ trước, chữ Tử sau).",
    strokeSteps: [
      "1. Nét phẩy chấm (ㄑ)",
      "2. Nét phẩy (丿)",
      "3. Nét ngang hất (一)",
      "4. Nét ngang gập móc (乛)",
      "5. Nét sổ cong móc (亅)",
      "6. Nét ngang (一)"
    ],
    strokeOrderGuide: ["ㄑ", "丿", "一", "乛", "亅", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "ㄑ", strokeName: "Nét Phẩy chấm (撇点)", strokePinyin: "piědiǎn", direction: "Phẩy xiên xuống rồi chấm chếch sang phải" },
      { step: 2, strokeChar: "丿", strokeName: "Nét Phẩy chéo (撇)", strokePinyin: "piě", direction: "Phẩy dài vắt qua nét 1" },
      { step: 3, strokeChar: "一", strokeName: "Nét Ngang hất (横/提)", strokePinyin: "héng", direction: "Gạch ngang hơi chếch lên tạo bộ 女" },
      { step: 4, strokeChar: "乛", strokeName: "Nét Ngang móc (横撇/横钩)", strokePinyin: "hénggōu", direction: "Ngang sang rồi gập xiên sang trái" },
      { step: 5, strokeChar: "亅", strokeName: "Nét Sổ cong móc (弯钩)", strokePinyin: "wāngōu", direction: "Sổ uốn lượn xuống rồi móc nhọn lên" },
      { step: 6, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Kéo ngang qua giữa thân hoàn thành chữ 好" }
    ],
    exampleCompound: "好看 (hǎokàn - Đẹp mắt), 好吃 (hǎochī - Ngon)"
  },
  {
    hanzi: "工",
    pinyin: "gōng",
    vietnamese: "Công (thợ, công nhân, công việc)",
    radical: "工 (Công)",
    strokeCount: 3,
    ruleExplanation: "Quy tắc: Trên trước dưới sau, Ngang trước sổ sau (Ngang trên -> Sổ giữa -> Ngang đáy dài).",
    strokeSteps: [
      "1. Nét ngang trên (一)",
      "2. Nét sổ đứng (丨)",
      "3. Nét ngang đáy (一)"
    ],
    strokeOrderGuide: ["一", "丨", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Nét Ngang ngắn (横)", strokePinyin: "héng", direction: "Kéo ngang nóc" },
      { step: 2, strokeChar: "丨", strokeName: "Nét Sổ giữa (竖)", strokePinyin: "shù", direction: "Sổ thẳng trục giữa" },
      { step: 3, strokeChar: "一", strokeName: "Nét Ngang dài (横)", strokePinyin: "héng", direction: "Ngang dài đỡ đáy hoàn tất chữ 工" }
    ],
    exampleCompound: "工人 (gōngrén - Công nhân), 工作 (gōngzuò - Công việc), 工艺 (gōngyì - Kỹ thuật)"
  },
  {
    hanzi: "厂",
    pinyin: "chǎng",
    vietnamese: "Xưởng, nhà máy",
    radical: "厂 (Hán)",
    strokeCount: 2,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Nét ngang trước, nét phẩy sau).",
    strokeSteps: [
      "1. Nét ngang trên (一)",
      "2. Nét phẩy dài (丿)"
    ],
    strokeOrderGuide: ["一", "丿"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Nét Ngang nóc (横)", strokePinyin: "héng", direction: "Kéo ngang nóc nhà xưởng" },
      { step: 2, strokeChar: "丿", strokeName: "Nét Phẩy dài (撇)", strokePinyin: "piě", direction: "Phẩy dài từ đầu trái xiên xuống dưới" }
    ],
    exampleCompound: "工厂 (gōngchǎng - Nhà máy), 厂长 (chǎngzhǎng - Giám đốc xưởng)"
  },
  {
    hanzi: "衣",
    pinyin: "yī",
    vietnamese: "Áo, y phục",
    radical: "衣 (Y)",
    strokeCount: 6,
    ruleExplanation: "Quy tắc: Trên trước dưới sau, Phẩy trước mác sau.",
    strokeSteps: [
      "1. Nét chấm đỉnh (丶)",
      "2. Nét ngang nóc (一)",
      "3. Nét phẩy trái (丿)",
      "4. Nét cong gập (㇁)",
      "5. Nét phẩy ngắn (丿)",
      "6. Nét mác choãi (乀)"
    ],
    strokeOrderGuide: ["丶", "一", "丿", "㇁", "丿", "乀"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Nét Chấm đỉnh (点)", strokePinyin: "diǎn", direction: "Chấm từ trên xuống ngay trục giữa" },
      { step: 2, strokeChar: "一", strokeName: "Nét Ngang nóc (横)", strokePinyin: "héng", direction: "Kéo ngang cân đối qua dưới nét chấm" },
      { step: 3, strokeChar: "丿", strokeName: "Nét Phẩy trái (撇)", strokePinyin: "piě", direction: "Phẩy từ giữa thân cong xuống bên trái" },
      { step: 4, strokeChar: "㇁", strokeName: "Nét Cong gập (弯钩)", strokePinyin: "wāngōu", direction: "Uốn lượn gập cong ở thân giữa" },
      { step: 5, strokeChar: "丿", strokeName: "Nét Phẩy ngắn (撇)", strokePinyin: "piě", direction: "Phẩy ngắn xiên sang trái bên dưới" },
      { step: 6, strokeChar: "乀", strokeName: "Nét Mác choãi (捺)", strokePinyin: "nà", direction: "Kéo mác dài choãi xuống góc phải dưới" }
    ],
    exampleCompound: "衣服 (yīfu - Quần áo), 上衣 (shàngyī - Áo trên), 大衣 (dàyī - Áo khoác dài)"
  },
  {
    hanzi: "车",
    pinyin: "chē",
    vietnamese: "Xe / Xưởng / May bằng máy",
    radical: "车 (Xa)",
    strokeCount: 4,
    ruleExplanation: "Quy tắc: Trên trước dưới sau, Ngang trước sổ sau (Sổ thẳng cuối cùng xuyên trục giữa).",
    strokeSteps: [
      "1. Nét ngang trên (一)",
      "2. Nét phẩy gập (ㄥ)",
      "3. Nét ngang đáy (一)",
      "4. Nét sổ thẳng (丨)"
    ],
    strokeOrderGuide: ["一", "ㄥ", "一", "丨"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Nét Ngang trên (横)", strokePinyin: "héng", direction: "Kéo ngang nóc xe" },
      { step: 2, strokeChar: "ㄥ", strokeName: "Nét Phẩy gập (撇折)", strokePinyin: "piězhé", direction: "Phẩy xiên rồi bẻ ngang sang phải" },
      { step: 3, strokeChar: "一", strokeName: "Nét Ngang đáy (横)", strokePinyin: "héng", direction: "Kéo ngang dài đỡ toàn bộ thân xe" },
      { step: 4, strokeChar: "丨", strokeName: "Nét Sổ thẳng (竖)", strokePinyin: "shù", direction: "Sổ thẳng đứng xuyên tâm từ trên xuống dưới" }
    ],
    exampleCompound: "车间 (chējiān - Phân xưởng), 车位 (chēwèi - Vị trí máy may), 车工 (chēgōng - Thợ may)"
  },
  {
    hanzi: "线",
    pinyin: "xiàn",
    vietnamese: "Chỉ khâu, sợi tuyến, chuyền may",
    radical: "纟(Mịch)",
    strokeCount: 8,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mịch 纟bên trái viết trước, chữ Qua 戋 bên phải viết sau).",
    strokeSteps: [
      "1. Nét phẩy gập (ㄥ)",
      "2. Nét phẩy gập (ㄥ)",
      "3. Nét hất (㇀)",
      "4. Nét ngang ngắn (一)",
      "5. Nét ngang gập (𠃍)",
      "6. Nét phẩy (丿)",
      "7. Nét nghiêng móc (㇂)",
      "8. Nét chấm (丶)"
    ],
    strokeOrderGuide: ["ㄥ", "ㄥ", "㇀", "一", "𠃍", "丿", "㇂", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "ㄥ", strokeName: "Nét Phẩy gập 1 (撇折)", strokePinyin: "piězhé", direction: "Nét gập trên của bộ Mịch 纟" },
      { step: 2, strokeChar: "ㄥ", strokeName: "Nét Phẩy gập 2 (撇折)", strokePinyin: "piězhé", direction: "Nét gập dưới của bộ Mịch" },
      { step: 3, strokeChar: "㇀", strokeName: "Nét Hất (提)", strokePinyin: "tí", direction: "Hất nhọn từ dưới lên tạo thành bộ 纟" },
      { step: 4, strokeChar: "一", strokeName: "Nét Ngang ngắn (横)", strokePinyin: "héng", direction: "Ngang trên bên phải" },
      { step: 5, strokeChar: "𠃍", strokeName: "Nét Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Ngang gập xiên" },
      { step: 6, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy xiên sang trái" },
      { step: 7, strokeChar: "㇂", strokeName: "Nét Nghiêng móc (斜钩)", strokePinyin: "xiégōu", direction: "Kéo cong dài nghiêng xuống rồi móc lên" },
      { step: 8, strokeChar: "丶", strokeName: "Nét Chấm đỉnh (点)", strokePinyin: "diǎn", direction: "Chấm góc trên bên phải hoàn tất chữ 线" }
    ],
    exampleCompound: "缝纫线 (chỉ may), 产线 (chuyền sản xuất), 底线 (chỉ dưới)"
  },
  {
    hanzi: "布",
    pinyin: "bù",
    vietnamese: "Vải, bố trí, tuyên bố",
    radical: "巾 (Cân)",
    strokeCount: 5,
    ruleExplanation: "Quy tắc: Trên trước dưới sau, Ngoài trước trong sau, Sổ giữa cuối cùng.",
    strokeSteps: [
      "1. Nét ngang dài (一)",
      "2. Nét phẩy dài (丿)",
      "3. Nét sổ ngắn (丨)",
      "4. Nét ngang gập móc (𠃌)",
      "5. Nét sổ giữa (丨)"
    ],
    strokeOrderGuide: ["一", "丿", "丨", "𠃌", "丨"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Nét Ngang dài (横)", strokePinyin: "héng", direction: "Kéo ngang rộng trên đỉnh" },
      { step: 2, strokeChar: "丿", strokeName: "Nét Phẩy dài (撇)", strokePinyin: "piě", direction: "Phẩy từ giữa thân xiên dài xuống góc trái" },
      { step: 3, strokeChar: "丨", strokeName: "Nét Sổ ngắn (竖)", strokePinyin: "shù", direction: "Cạnh trái của bộ Cân 巾" },
      { step: 4, strokeChar: "𠃌", strokeName: "Nét Ngang gập móc (横折钩)", strokePinyin: "héngzhégōu", direction: "Đóng khung phải bộ Cân" },
      { step: 5, strokeChar: "丨", strokeName: "Nét Sổ giữa (竖)", strokePinyin: "shù", direction: "Sổ thẳng đứng qua tâm chữ 布" }
    ],
    exampleCompound: "布料 (bùliào - Vải vóc), 胚布 (pēibù - Vải mộc), 梭织布 (vải dệt thoi)"
  },
  {
    hanzi: "裁",
    pinyin: "cái",
    vietnamese: "Cắt vải, cắt may, phán xét",
    radical: "衣 (Y)",
    strokeCount: 12,
    ruleExplanation: "Quy tắc: Ngoài trước trong sau (Khung chữ Thổ & Qua trước, bộ Y nằm lọt trong lòng).",
    strokeSteps: [
      "1. Nét ngang (一)",
      "2. Nét sổ (丨)",
      "3. Nét ngang (一)",
      "4. Nét ngang dài (一)",
      "5. Nét nghiêng móc (㇂)",
      "6. Nét chấm (丶)",
      "7. Nét chấm (丶)",
      "8. Nét ngang (一)",
      "9. Nét phẩy (丿)",
      "10. Nét cong gập (㇁)",
      "11. Nét phẩy ngắn (丿)",
      "12. Nét mác (乀)"
    ],
    strokeOrderGuide: ["一", "丨", "一", "一", "㇂", "丶", "丶", "一", "丿", "㇁", "丿", "乀"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Bộ Thổ trên trái" },
      { step: 2, strokeChar: "丨", strokeName: "Nét Sổ (竖)", strokePinyin: "shù", direction: "Sổ bộ Thổ" },
      { step: 3, strokeChar: "一", strokeName: "Nét Ngang hất (横/提)", strokePinyin: "héng", direction: "Đáy bộ Thổ" },
      { step: 4, strokeChar: "一", strokeName: "Nét Ngang dài (横)", strokePinyin: "héng", direction: "Ngang trên chữ Qua" },
      { step: 5, strokeChar: "㇂", strokeName: "Nét Nghiêng móc (斜钩)", strokePinyin: "xiégōu", direction: "Nghiêng móc dài bên phải" },
      { step: 6, strokeChar: "丶", strokeName: "Nét Chấm (点)", strokePinyin: "diǎn", direction: "Chấm đỉnh chữ Qua" },
      { step: 7, strokeChar: "丶", strokeName: "Nét Chấm (点)", strokePinyin: "diǎn", direction: "Chấm đỉnh bộ Y trong lòng" },
      { step: 8, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Ngang bộ Y" },
      { step: 9, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy bộ Y" },
      { step: 10, strokeChar: "㇁", strokeName: "Nét Cong gập (弯钩)", strokePinyin: "wāngōu", direction: "Cong móc bộ Y" },
      { step: 11, strokeChar: "丿", strokeName: "Nét Phẩy ngắn (撇)", strokePinyin: "piě", direction: "Phẩy trái bộ Y" },
      { step: 12, strokeChar: "乀", strokeName: "Nét Mác (捺)", strokePinyin: "nà", direction: "Mác phải hoàn thành chữ 裁" }
    ],
    exampleCompound: "裁剪 (cáijiǎn - Cắt may), 裁床 (cáichuáng - Bàn cắt), 裁片 (mảnh bán thành phẩm)"
  },
  {
    hanzi: "针",
    pinyin: "zhēn",
    vietnamese: "Kim may, mũi tiêm, châm cứu",
    radical: "钅(Kim)",
    strokeCount: 7,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Kim 钅trước, chữ Thập 十 sau).",
    strokeSteps: [
      "1. Nét phẩy (丿)",
      "2. Nét ngang (一)",
      "3. Nét ngang (一)",
      "4. Nét hất (㇀)",
      "5. Nét ngang (一)",
      "6. Nét sổ dài (丨)"
    ],
    strokeOrderGuide: ["丿", "一", "一", "㇀", "一", "丨"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy đầu bộ Kim 钅" },
      { step: 2, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Ngang trên bộ Kim" },
      { step: 3, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Ngang giữa bộ Kim" },
      { step: 4, strokeChar: "㇀", strokeName: "Nét Hất (提)", strokePinyin: "tí", direction: "Hất từ dưới chéo lên kết thúc bộ 钅" },
      { step: 5, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Ngang chữ Thập bên phải" },
      { step: 6, strokeChar: "丨", strokeName: "Nét Sổ kim (竖/悬针竖)", strokePinyin: "shù", direction: "Sổ vuốt nhọn như mũi kim hoàn thành chữ 针" }
    ],
    exampleCompound: "缝纫针 (kim may), 跳针 (nhảy mũi chỉ), 检针 (dò kim)"
  },
  {
    hanzi: "尺",
    pinyin: "chǐ",
    vietnamese: "Thước đo, kích cỡ, chiều dài",
    radical: "尸 (Thi)",
    strokeCount: 4,
    ruleExplanation: "Quy tắc: Ngoài trước trong sau, Phẩy trước mác sau.",
    strokeSteps: [
      "1. Nét ngang gập (𠃍)",
      "2. Nét ngang (一)",
      "3. Nét phẩy dài (丿)",
      "4. Nét mác (乀)"
    ],
    strokeOrderGuide: ["𠃍", "一", "丿", "乀"],
    strokeDetails: [
      { step: 1, strokeChar: "𠃍", strokeName: "Nét Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Ngang rồi gập xuống tạo đầu bộ Thi" },
      { step: 2, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Ngang nối bên dưới" },
      { step: 3, strokeChar: "丿", strokeName: "Nét Phẩy dài (撇)", strokePinyin: "piě", direction: "Phẩy dài từ trên xuyên qua thân sang trái" },
      { step: 4, strokeChar: "乀", strokeName: "Nét Mác (捺)", strokePinyin: "nà", direction: "Mác choãi rộng xuống góc phải chữ 尺" }
    ],
    exampleCompound: "尺码 (chǐmǎ - Kích cỡ S/M/L), 皮尺 (píchǐ - Thước dây), 尺寸 (kích thước)"
  },
  {
    hanzi: "领",
    pinyin: "lǐng",
    vietnamese: "Cổ áo, lãnh đạo, dẫn dắt",
    radical: "页 (Hiệt)",
    strokeCount: 11,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Chữ Lệnh 令 trước, bộ Hiệt 页 sau).",
    strokeSteps: [
      "1. Nét phẩy (丿)",
      "2. Nét mác/chấm (丶)",
      "3. Nét ngang gập (𠃍)",
      "4. Nét chấm (丶)",
      "5. Nét ngang (一)",
      "6. Nét phẩy (丿)",
      "7. Nét sổ (丨)",
      "8. Nét ngang gập (𠃍)",
      "9. Nét phẩy (丿)",
      "10. Nét mác (乀)",
      "11. Nét chấm (丶)"
    ],
    strokeOrderGuide: ["丿", "丶", "𠃍", "丶", "一", "丿", "丨", "𠃍", "丿", "乀", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Đầu chữ Lệnh 令 bên trái" },
      { step: 2, strokeChar: "丶", strokeName: "Nét Chấm/Mác (点)", strokePinyin: "diǎn", direction: "Mác/chấm phải chữ Lệnh" },
      { step: 3, strokeChar: "𠃍", strokeName: "Nét Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Ngang gập bên dưới" },
      { step: 4, strokeChar: "丶", strokeName: "Nét Chấm (点)", strokePinyin: "diǎn", direction: "Chấm hoàn thành chữ 令" },
      { step: 5, strokeChar: "一", strokeName: "Nét Ngang (横)", strokePinyin: "héng", direction: "Ngang trên bộ Hiệt 页" },
      { step: 6, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy bộ Hiệt" },
      { step: 7, strokeChar: "丨", strokeName: "Nét Sổ (竖)", strokePinyin: "shù", direction: "Sổ khung bộ Hiệt" },
      { step: 8, strokeChar: "𠃍", strokeName: "Nét Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Gập khung bộ Hiệt" },
      { step: 9, strokeChar: "丿", strokeName: "Nét Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy trong bộ Hiệt" },
      { step: 10, strokeChar: "乀", strokeName: "Nét Mác (捺)", strokePinyin: "nà", direction: "Mác bộ Hiệt" },
      { step: 11, strokeChar: "丶", strokeName: "Nét Chấm (点)", strokePinyin: "diǎn", direction: "Chấm góc phải hoàn tất chữ 领" }
    ],
    exampleCompound: "衣领 (yīlǐng - Cổ áo), 领口 (lǐngkǒu - Vòng cổ), 带领 (dàilǐng - Dẫn dắt)"
  },
  {
    hanzi: "剪",
    pinyin: "jiǎn",
    vietnamese: "Kéo cắt, cắt tỉa",
    radical: "刀 (Đao)",
    strokeCount: 11,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Chữ Tiền 前 ở trên, bộ Đao 刀 ở dưới).",
    strokeSteps: [
      "1. Nét chấm (丶)",
      "2. Nét phẩy (丿)",
      "3. Nét ngang (一)",
      "4. Nét sổ (丨)",
      "5. Nét ngang gập (𠃍)",
      "6. Nét ngang (一)",
      "7. Nét ngang (一)",
      "8. Nét sổ (丨)",
      "9. Nét sổ móc (亅)",
      "10. Nét ngang gập móc (𠃌)",
      "11. Nét phẩy (丿)"
    ],
    strokeOrderGuide: ["丶", "丿", "一", "丨", "𠃍", "一", "一", "丨", "亅", "𠃌", "丿"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Đầu chữ 前" },
      { step: 2, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy chữ 前" },
      { step: 3, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang dài" },
      { step: 4, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Khung Nguyệt" },
      { step: 5, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Khung Nguyệt" },
      { step: 6, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Trong Nguyệt" },
      { step: 7, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Trong Nguyệt" },
      { step: 8, strokeChar: "丨", strokeName: "Sổ đao (竖)", strokePinyin: "shù", direction: "Đao đứng" },
      { step: 9, strokeChar: "亅", strokeName: "Sổ móc (竖钩)", strokePinyin: "shùgōu", direction: "Đao móc" },
      { step: 10, strokeChar: "𠃌", strokeName: "Ngang gập móc (横折钩)", strokePinyin: "héngzhégōu", direction: "Bộ Đao dưới" },
      { step: 11, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy bộ Đao hoàn thành chữ 剪" }
    ],
    exampleCompound: "剪刀 (jiǎndāo - Cái kéo), 剪线头 (cắt chỉ thừa), 剪裁 (jiǎncái - Cắt may)"
  },
  {
    hanzi: "缝",
    pinyin: "féng",
    vietnamese: "May, khâu vá, đường may",
    radical: "纟(Mịch)",
    strokeCount: 11,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mịch 纟trước, chữ Phùng 逢 sau).",
    strokeSteps: [
      "1. Nét phẩy gập (ㄥ)",
      "2. Nét phẩy gập (ㄥ)",
      "3. Nét hất (㇀)",
      "4. Nét phẩy (丿)",
      "5. Nét ngang gập (𠃍)",
      "6. Nét ngang (一)",
      "7. Nét ngang (一)",
      "8. Nét sổ (丨)",
      "9. Nét chấm (丶)",
      "10. Nét ngang gập cong (㇇)",
      "11. Nét mác dài (乀)"
    ],
    strokeOrderGuide: ["ㄥ", "ㄥ", "㇀", "丿", "𠃍", "一", "一", "丨", "丶", "㇇", "乀"],
    strokeDetails: [
      { step: 1, strokeChar: "ㄥ", strokeName: "Phẩy gập 1 (撇折)", strokePinyin: "piězhé", direction: "Bộ Mịch 纟" },
      { step: 2, strokeChar: "ㄥ", strokeName: "Phẩy gập 2 (撇折)", strokePinyin: "piězhé", direction: "Bộ Mịch 纟" },
      { step: 3, strokeChar: "㇀", strokeName: "Hất (提)", strokePinyin: "tí", direction: "Hất nhọn bộ 纟" },
      { step: 4, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Đầu bộ Phùng" },
      { step: 5, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Thân trên" },
      { step: 6, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang giữa" },
      { step: 7, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang dưới" },
      { step: 8, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ giữa" },
      { step: 9, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Bộ Sước 辶" },
      { step: 10, strokeChar: "㇇", strokeName: "Ngang gập cong (横折折撇)", strokePinyin: "héngzhé", direction: "Lượn bộ Sước" },
      { step: 11, strokeChar: "乀", strokeName: "Mác dài (捺)", strokePinyin: "nà", direction: "Đỡ chữ 缝" }
    ],
    exampleCompound: "缝纫 (féngrèn - May vá), 平缝 (may 1 kim), 缝纫机 (máy may)"
  },
  {
    hanzi: "质",
    pinyin: "zhì",
    vietnamese: "Chất (chất lượng, bản chất)",
    radical: "贝 (Bối)",
    strokeCount: 8,
    ruleExplanation: "Quy tắc: Ngoài trước trong sau, Trên trước dưới sau (Nét phẩy, ngang, sổ -> bộ Bối dưới).",
    strokeSteps: [
      "1. Nét phẩy (丿)",
      "2. Nét ngang (一)",
      "3. Nét phẩy (丿)",
      "4. Nét sổ (丨)",
      "5. Nét ngang gập (𠃍)",
      "6. Nét phẩy (丿)",
      "7. Nét chấm (丶)",
      "8. Nét ngang (一)"
    ],
    strokeOrderGuide: ["丿", "一", "丿", "丨", "𠃍", "丿", "丶", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Phẩy đỉnh (撇)", strokePinyin: "piě", direction: "Phẩy trên trái" },
      { step: 2, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang qua" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy dài (撇)", strokePinyin: "piě", direction: "Phẩy bao ngoài" },
      { step: 4, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Bộ Bối 贝" },
      { step: 5, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Bộ Bối" },
      { step: 6, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Chân trái bộ Bối" },
      { step: 7, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chân phải bộ Bối" },
      { step: 8, strokeChar: "一", strokeName: "Ngang đáy (横)", strokePinyin: "héng", direction: "Đóng đáy hoàn thành chữ 质" }
    ],
    exampleCompound: "质量 (zhìliàng - Chất lượng), 品质 (pǐnzhì - Phẩm chất)"
  },
  {
    hanzi: "量",
    pinyin: "liàng",
    vietnamese: "Lượng (số lượng, đo lường)",
    radical: "日 (Nhật)",
    strokeCount: 12,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Bộ Nhật 日 trên, chữ Nhất 一, bộ Lý 里 dưới).",
    strokeSteps: [
      "1. Nét sổ (丨)",
      "2. Nét ngang gập (𠃍)",
      "3. Nét ngang (一)",
      "4. Nét ngang (一)",
      "5. Nét ngang (一)",
      "6. Nét sổ (丨)",
      "7. Nét ngang gập (𠃍)",
      "8. Nét ngang (一)",
      "9. Nét ngang (一)",
      "10. Nét sổ giữa (丨)",
      "11. Nét ngang (一)",
      "12. Nét ngang dài (一)"
    ],
    strokeOrderGuide: ["丨", "𠃍", "一", "一", "一", "丨", "𠃍", "一", "一", "丨", "一", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Bộ Nhật" },
      { step: 2, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Bộ Nhật" },
      { step: 3, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Trong Nhật" },
      { step: 4, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Đáy Nhật" },
      { step: 5, strokeChar: "一", strokeName: "Ngang dài (横)", strokePinyin: "héng", direction: "Ngang phân cách" },
      { step: 6, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Khung Điền" },
      { step: 7, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Khung Điền" },
      { step: 8, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Trong Điền" },
      { step: 9, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Đóng Điền" },
      { step: 10, strokeChar: "丨", strokeName: "Sổ xuyên (竖)", strokePinyin: "shù", direction: "Sổ thẳng trục giữa" },
      { step: 11, strokeChar: "一", strokeName: "Ngang ngắn (横)", strokePinyin: "héng", direction: "Ngang đỡ" },
      { step: 12, strokeChar: "一", strokeName: "Ngang đáy (横)", strokePinyin: "héng", direction: "Đáy chữ 量" }
    ],
    exampleCompound: "产量 (chǎnliàng - Sản lượng), 数量 (shùliàng - Số lượng), 测量 (cèliáng - Đo đạc)"
  },
  {
    hanzi: "色",
    pinyin: "sè",
    vietnamese: "Sắc (màu sắc, ánh màu)",
    radical: "色 (Sắc)",
    strokeCount: 6,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Bộ Đao ⺈trên, bộ Ba 巴 dưới).",
    strokeSteps: [
      "1. Nét phẩy ngắn (丿)",
      "2. Nét ngang gập (𠃍)",
      "3. Nét ngang gập (𠃍)",
      "4. Nét sổ ngắn (丨)",
      "5. Nét ngang (一)",
      "6. Nét sổ cong móc (乚)"
    ],
    strokeOrderGuide: ["丿", "𠃍", "𠃍", "丨", "一", "乚"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Đầu bộ ⺈" },
      { step: 2, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Ngang gập bộ ⺈" },
      { step: 3, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Đầu bộ Ba" },
      { step: 4, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ trái bộ Ba" },
      { step: 5, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang nối" },
      { step: 6, strokeChar: "乚", strokeName: "Sổ cong móc (竖弯钩)", strokePinyin: "shùwāngōu", direction: "Sổ uốn lượn móc lên hoàn tất 色" }
    ],
    exampleCompound: "颜色 (yánsè - Màu sắc), 色差 (sèchā - Lệch màu), 打色 (dǎsè - Lab dip)"
  },
  {
    hanzi: "样",
    pinyin: "yàng",
    vietnamese: "Mẫu, dáng vẻ, hình thức",
    radical: "木 (Mộc)",
    strokeCount: 10,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mộc 木 trước, chữ Dương 羊 sau).",
    strokeSteps: [
      "1. Nét ngang (一)",
      "2. Nét sổ (丨)",
      "3. Nét phẩy (丿)",
      "4. Nét chấm (丶)",
      "5. Nét chấm (丶)",
      "6. Nét phẩy (丿)",
      "7. Nét ngang (一)",
      "8. Nét ngang (一)",
      "9. Nét ngang (一)",
      "10. Nét sổ (丨)"
    ],
    strokeOrderGuide: ["一", "丨", "丿", "丶", "丶", "丿", "一", "一", "一", "丨"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Bộ Mộc" },
      { step: 2, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ bộ Mộc" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy bộ Mộc" },
      { step: 4, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm bộ Mộc" },
      { step: 5, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Sừng chữ 羊" },
      { step: 6, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Sừng trái chữ 羊" },
      { step: 7, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang 1" },
      { step: 8, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang 2" },
      { step: 9, strokeChar: "一", strokeName: "Ngang dài (横)", strokePinyin: "héng", direction: "Ngang 3" },
      { step: 10, strokeChar: "丨", strokeName: "Sổ thẳng (竖)", strokePinyin: "shù", direction: "Sổ giữa hoàn thành chữ 样" }
    ],
    exampleCompound: "样衣 (yàngyī - Áo mẫu), 样品 (yàngpǐn - Hàng mẫu), 抽样 (chōuyàng - Lấy mẫu)"
  },
  {
    hanzi: "单",
    pinyin: "dān",
    vietnamese: "Đơn (đơn hàng, biểu mẫu, đơn chiếc)",
    radical: "十 (Thập)",
    strokeCount: 8,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Chấm phẩy trên -> Khung Giáp giữa -> Chữ Thập đáy).",
    strokeSteps: [
      "1. Nét chấm (丶)",
      "2. Nét phẩy (丿)",
      "3. Nét sổ (丨)",
      "4. Nét ngang gập (𠃍)",
      "5. Nét ngang (一)",
      "6. Nét ngang (一)",
      "7. Nét ngang dài (一)",
      "8. Nét sổ (丨)"
    ],
    strokeOrderGuide: ["丶", "丿", "丨", "𠃍", "一", "一", "一", "丨"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm trái nóc" },
      { step: 2, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy phải nóc" },
      { step: 3, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Khung giữa" },
      { step: 4, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Khung giữa" },
      { step: 5, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang trong" },
      { step: 6, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Đóng khung" },
      { step: 7, strokeChar: "一", strokeName: "Ngang dài (横)", strokePinyin: "héng", direction: "Ngang chữ Thập" },
      { step: 8, strokeChar: "丨", strokeName: "Sổ dài (竖)", strokePinyin: "shù", direction: "Sổ xuyên trục hoàn thành chữ 单" }
    ],
    exampleCompound: "订单 (dìngdān - Đơn đặt hàng), 工艺单 (gōngyìdān - Techpack), 送货单 (phiếu giao hàng)"
  },
  {
    hanzi: "货",
    pinyin: "huò",
    vietnamese: "Hàng (hàng hóa, sản phẩm)",
    radical: "贝 (Bối)",
    strokeCount: 8,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Chữ Hóa 化 trên, bộ Bối 贝 dưới).",
    strokeSteps: [
      "1. Nét phẩy (丿)",
      "2. Nét sổ (丨)",
      "3. Nét phẩy (丿)",
      "4. Nét sổ cong móc (乚)",
      "5. Nét sổ (丨)",
      "6. Nét ngang gập (𠃍)",
      "7. Nét phẩy (丿)",
      "8. Nét chấm (丶)"
    ],
    strokeOrderGuide: ["丿", "丨", "丿", "乚", "丨", "𠃍", "丿", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Bộ Nhân đứng 化" },
      { step: 2, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ bộ Nhân" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy chữ Tỷ 匕" },
      { step: 4, strokeChar: "乚", strokeName: "Sổ cong móc (竖弯钩)", strokePinyin: "shùwāngōu", direction: "Móc chữ 匕" },
      { step: 5, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Khung Bối 贝" },
      { step: 6, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Khung Bối" },
      { step: 7, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Chân trái Bối" },
      { step: 8, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm phải Bối hoàn thành chữ 货" }
    ],
    exampleCompound: "大货 (dàhuò - Hàng đại trà), 验货 (yànhuò - Kiểm hàng QC), 交货 (jiāohuò - Giao hàng)"
  },
  {
    hanzi: "扣",
    pinyin: "kòu",
    vietnamese: "Khuy áo, cúc, cài, khấu trừ",
    radical: "扌(Thủ)",
    strokeCount: 6,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Thủ 扌trước, chữ Khẩu 口 sau).",
    strokeSteps: [
      "1. Nét ngang (一)",
      "2. Nét sổ móc (亅)",
      "3. Nét hất (㇀)",
      "4. Nét sổ (丨)",
      "5. Nét ngang gập (𠃍)",
      "6. Nét ngang (一)"
    ],
    strokeOrderGuide: ["一", "亅", "㇀", "丨", "𠃍", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Bộ Thủ 扌" },
      { step: 2, strokeChar: "亅", strokeName: "Sổ móc (竖钩)", strokePinyin: "shùgōu", direction: "Sổ móc bộ Thủ" },
      { step: 3, strokeChar: "㇀", strokeName: "Hất (提)", strokePinyin: "tí", direction: "Hất chéo lên kết thúc 扌" },
      { step: 4, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Cạnh trái bộ Khẩu 口" },
      { step: 5, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Góc phải bộ Khẩu" },
      { step: 6, strokeChar: "一", strokeName: "Ngang đáy (横)", strokePinyin: "héng", direction: "Đóng đáy chữ 扣" }
    ],
    exampleCompound: "纽扣 (niǔkòu - Cúc áo), 锁眼 (suǒyǎn - Thùa khuy), 扣眼 (lỗ khuy)"
  },
  {
    hanzi: "包",
    pinyin: "bāo",
    vietnamese: "Gói, bọc, túi, bao bì",
    radical: "勹 (Bao)",
    strokeCount: 5,
    ruleExplanation: "Quy tắc: Ngoài trước trong sau (Bộ Bao 勹bao bọc bên ngoài chữ Tỵ 巳 bên trong).",
    strokeSteps: [
      "1. Nét phẩy (丿)",
      "2. Nét ngang gập móc (𠃌)",
      "3. Nét ngang gập (𠃍)",
      "4. Nét ngang (一)",
      "5. Nét sổ cong móc (乚)"
    ],
    strokeOrderGuide: ["丿", "𠃌", "𠃍", "一", "乚"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Phẩy đỉnh (撇)", strokePinyin: "piě", direction: "Nóc bộ Bao" },
      { step: 2, strokeChar: "𠃌", strokeName: "Ngang gập móc (横折钩)", strokePinyin: "héngzhégōu", direction: "Khung ôm bộ Bao" },
      { step: 3, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Đầu bên trong" },
      { step: 4, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang trong" },
      { step: 5, strokeChar: "乚", strokeName: "Sổ cong móc (竖弯钩)", strokePinyin: "shùwāngōu", direction: "Uốn lượn đỡ đáy hoàn thành 包" }
    ],
    exampleCompound: "包装 (bāozhuāng - Đóng gói bao bì), 后道包装 (hoàn tất đóng gói), 钱包 (ví tiền)"
  },
  {
    hanzi: "查",
    pinyin: "chá",
    vietnamese: "Kiểm tra, tra cứu, thanh tra",
    radical: "木 (Mộc)",
    strokeCount: 9,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Bộ Mộc 木 trên, chữ Đán 旦 / Nhật & Nhất dưới).",
    strokeSteps: [
      "1. Nét ngang (一)",
      "2. Nét sổ (丨)",
      "3. Nét phẩy (丿)",
      "4. Nét chấm (丶)",
      "5. Nét sổ (丨)",
      "6. Nét ngang gập (𠃍)",
      "7. Nét ngang (一)",
      "8. Nét ngang (一)",
      "9. Nét ngang dài (一)"
    ],
    strokeOrderGuide: ["一", "丨", "丿", "丶", "丨", "𠃍", "一", "一", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Bộ Mộc 木" },
      { step: 2, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ Mộc" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy Mộc" },
      { step: 4, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm Mộc" },
      { step: 5, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Bộ Nhật 日" },
      { step: 6, strokeChar: "𠃍", strokeName: "Ngang gập (横折)", strokePinyin: "héngzhé", direction: "Gập Nhật" },
      { step: 7, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Trong Nhật" },
      { strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Đóng Nhật", step: 8 },
      { step: 9, strokeChar: "一", strokeName: "Ngang dài (横)", strokePinyin: "héng", direction: "Đáy chữ 查" }
    ],
    exampleCompound: "检查 (jiǎnchá - Kiểm tra), 抽查 (chōuchá - Kiểm tra đột xuất), 查找 (tìm kiếm)"
  },
  {
    hanzi: "机",
    pinyin: "jī",
    vietnamese: "Cơ (máy móc, cơ hội, thời cơ)",
    radical: "木 (Mộc)",
    strokeCount: 6,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mộc 木 trước, chữ Kỷ 几 sau).",
    strokeSteps: [
      "1. Nét ngang (一)",
      "2. Nét sổ (丨)",
      "3. Nét phẩy (丿)",
      "4. Nét chấm (丶)",
      "5. Nét phẩy (丿)",
      "6. Nét ngang gập cong móc (乙/⺄)"
    ],
    strokeOrderGuide: ["一", "丨", "丿", "丶", "丿", "⺄"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Bộ Mộc" },
      { step: 2, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ Mộc" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy Mộc" },
      { step: 4, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm Mộc" },
      { step: 5, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Chữ 几 bên phải" },
      { step: 6, strokeChar: "⺄", strokeName: "Ngang gập cong móc (横折弯钩)", strokePinyin: "héngzhéwāngōu", direction: "Kéo lượn hoàn thành chữ 机" }
    ],
    exampleCompound: "机械 (jīxiè - Máy móc), 机修 (jīxiū - Bảo trì máy), 缝纫机 (máy may)"
  },
  {
    hanzi: "产",
    pinyin: "chǎn",
    vietnamese: "Sản (sản xuất, sản phẩm, tài sản)",
    radical: "亠(Đầu)",
    strokeCount: 6,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Bộ Đầu 亠trên, chữ Lập 立 / Sổ phẩy dưới).",
    strokeSteps: [
      "1. Nét chấm (丶)",
      "2. Nét ngang (一)",
      "3. Nét chấm (丶)",
      "4. Nét phẩy (丿)",
      "5. Nét ngang (一)",
      "6. Nét phẩy dài (丿)"
    ],
    strokeOrderGuide: ["丶", "一", "丶", "丿", "一", "丿"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Chấm đỉnh (点)", strokePinyin: "diǎn", direction: "Chấm trục giữa" },
      { step: 2, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang nóc" },
      { step: 3, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm trong" },
      { step: 4, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy trong" },
      { step: 5, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang đỡ" },
      { step: 6, strokeChar: "丿", strokeName: "Phẩy dài (撇)", strokePinyin: "piě", direction: "Phẩy dài xuống góc trái hoàn thành chữ 产" }
    ],
    exampleCompound: "生产 (shēngchǎn - Sản xuất), 产量 (chǎnliàng - Sản lượng), 产线 (chuyền may)"
  },
  {
    hanzi: "标",
    pinyin: "biāo",
    vietnamese: "Tiêu (tiêu chuẩn, nhãn mác, mục tiêu)",
    radical: "木 (Mộc)",
    strokeCount: 9,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mộc 木 trước, chữ Phiếu 示/票 rút gọn sau).",
    strokeSteps: [
      "1. Nét ngang (一)",
      "2. Nét sổ (丨)",
      "3. Nét phẩy (丿)",
      "4. Nét chấm (丶)",
      "5. Nét ngang (一)",
      "6. Nét ngang (一)",
      "7. Nét sổ móc (亅)",
      "8. Nét phẩy (丿)",
      "9. Nét chấm (丶)"
    ],
    strokeOrderGuide: ["一", "丨", "丿", "丶", "一", "一", "亅", "丿", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Bộ Mộc" },
      { step: 2, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ Mộc" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy Mộc" },
      { step: 4, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm Mộc" },
      { step: 5, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang trên chữ 示" },
      { step: 6, strokeChar: "一", strokeName: "Ngang dài (横)", strokePinyin: "héng", direction: "Ngang 2" },
      { step: 7, strokeChar: "亅", strokeName: "Sổ móc (竖钩)", strokePinyin: "shùgōu", direction: "Sổ móc giữa" },
      { step: 8, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy trái" },
      { step: 9, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Chấm phải hoàn tất 标" }
    ],
    exampleCompound: "标准 (biāozhǔn - Tiêu chuẩn), 水洗标 (nhãn giặt care label), 目标 (mục tiêu)"
  },
  {
    hanzi: "准",
    pinyin: "zhǔn",
    vietnamese: "Chuẩn (tiêu chuẩn, chuẩn bị, chính xác)",
    radical: "冫(Băng)",
    strokeCount: 10,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Băng 冫trước, chữ Chuy 隹 sau).",
    strokeSteps: [
      "1. Nét chấm (丶)",
      "2. Nét hất (㇀)",
      "3. Nét phẩy (丿)",
      "4. Nét sổ (丨)",
      "5. Nét phẩy (丿)",
      "6. Nét ngang (一)",
      "7. Nét ngang (一)",
      "8. Nét ngang (一)",
      "9. Nét sổ (丨)",
      "10. Nét ngang dài (一)"
    ],
    strokeOrderGuide: ["丶", "㇀", "丿", "丨", "丿", "一", "一", "一", "丨", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Chấm (点)", strokePinyin: "diǎn", direction: "Bộ Băng 冫" },
      { step: 2, strokeChar: "㇀", strokeName: "Hất (提)", strokePinyin: "tí", direction: "Hất bộ Băng" },
      { step: 3, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Đầu chữ 隹" },
      { step: 4, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ trái chữ 隹" },
      { step: 5, strokeChar: "丿", strokeName: "Phẩy (撇)", strokePinyin: "piě", direction: "Phẩy trên" },
      { step: 6, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang 1" },
      { step: 7, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang 2" },
      { step: 8, strokeChar: "一", strokeName: "Ngang (横)", strokePinyin: "héng", direction: "Ngang 3" },
      { step: 9, strokeChar: "丨", strokeName: "Sổ (竖)", strokePinyin: "shù", direction: "Sổ giữa" },
      { step: 10, strokeChar: "一", strokeName: "Ngang đáy (横)", strokePinyin: "héng", direction: "Đáy chữ 准" }
    ],
    exampleCompound: "准备 (zhǔnbèi - Chuẩn bị), 准确 (zhǔnquè - Chuẩn xác), 标准 (tiêu chuẩn)"
  },
  {
    hanzi: "纺",
    pinyin: "fǎng",
    vietnamese: "Phỏng (kéo sợi, dệt sợi)",
    radical: "纟(Mịch)",
    strokeCount: 7,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mịch 纟trước, chữ Phương 方 sau).",
    strokeSteps: [
      "1. Nét phẩy gập (ㄥ)",
      "2. Nét phẩy gập (ㄥ)",
      "3. Nét hất (㇀)",
      "4. Nét chấm (丶)",
      "5. Nét ngang (一)",
      "6. Nét ngang gập móc (𠃌)",
      "7. Nét phẩy (丿)"
    ],
    strokeOrderGuide: ["ㄥ", "ㄥ", "㇀", "丶", "一", "𠃌", "丿"],
    strokeDetails: [
      { step: 1, strokeChar: "ㄥ", strokeName: "Phẩy gập 1", strokePinyin: "piězhé", direction: "Bộ Mịch 纟" },
      { step: 2, strokeChar: "ㄥ", strokeName: "Phẩy gập 2", strokePinyin: "piězhé", direction: "Bộ Mịch 纟" },
      { step: 3, strokeChar: "㇀", strokeName: "Hất", strokePinyin: "tí", direction: "Hất bộ 纟" },
      { step: 4, strokeChar: "丶", strokeName: "Chấm", strokePinyin: "diǎn", direction: "Chấm chữ 方" },
      { step: 5, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Ngang chữ 方" },
      { step: 6, strokeChar: "𠃌", strokeName: "Ngang gập móc", strokePinyin: "héngzhégōu", direction: "Móc chữ 方" },
      { step: 7, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Phẩy hoàn tất chữ 纺" }
    ],
    exampleCompound: "纺织 (fǎngzhī - Dệt may), 纺纱 (kéo sợi), 纺织厂 (nhà máy dệt)"
  },
  {
    hanzi: "织",
    pinyin: "zhī",
    vietnamese: "Chức (dệt vải, đan len)",
    radical: "纟(Mịch)",
    strokeCount: 8,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Mịch 纟trước, chữ Chức 只 / Chi sau).",
    strokeSteps: [
      "1. Nét phẩy gập (ㄥ)",
      "2. Nét phẩy gập (ㄥ)",
      "3. Nét hất (㇀)",
      "4. Nét khẩu sổ (丨)",
      "5. Nét khẩu ngang gập (𠃍)",
      "6. Nét khẩu ngang (一)",
      "7. Nét phẩy (丿)",
      "8. Nét chấm (丶)"
    ],
    strokeOrderGuide: ["ㄥ", "ㄥ", "㇀", "丨", "𠃍", "一", "丿", "丶"],
    strokeDetails: [
      { step: 1, strokeChar: "ㄥ", strokeName: "Phẩy gập 1", strokePinyin: "piězhé", direction: "Bộ Mịch 纟" },
      { step: 2, strokeChar: "ㄥ", strokeName: "Phẩy gập 2", strokePinyin: "piězhé", direction: "Bộ Mịch 纟" },
      { step: 3, strokeChar: "㇀", strokeName: "Hất", strokePinyin: "tí", direction: "Hất bộ 纟" },
      { step: 4, strokeChar: "丨", strokeName: "Sổ", strokePinyin: "shù", direction: "Bộ Khẩu" },
      { step: 5, strokeChar: "𠃍", strokeName: "Ngang gập", strokePinyin: "héngzhé", direction: "Bộ Khẩu" },
      { step: 6, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Đóng Khẩu" },
      { step: 7, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Chân trái" },
      { step: 8, strokeChar: "丶", strokeName: "Chấm", strokePinyin: "diǎn", direction: "Chân phải chữ 织" }
    ],
    exampleCompound: "针织 (zhēnzhī - Dệt kim), 梭织 (suōzhī - Dệt thoi), 组织 (tổ chức / dệt)"
  },
  {
    hanzi: "染",
    pinyin: "rǎn",
    vietnamese: "Nhiễm (nhuộm màu, ô nhiễm, lây lan)",
    radical: "木 (Mộc)",
    strokeCount: 9,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Bộ Thủy 氵& Cửu 九 trên, bộ Mộc 木 dưới).",
    strokeSteps: [
      "1. Nét chấm (丶)",
      "2. Nét chấm (丶)",
      "3. Nét hất (㇀)",
      "4. Nét phẩy (丿)",
      "5. Nét ngang gập cong móc (乙)",
      "6. Nét ngang (一)",
      "7. Nét sổ (丨)",
      "8. Nét phẩy (丿)",
      "9. Nét mác (乀)"
    ],
    strokeOrderGuide: ["丶", "丶", "㇀", "丿", "乙", "一", "丨", "丿", "乀"],
    strokeDetails: [
      { step: 1, strokeChar: "丶", strokeName: "Chấm 1", strokePinyin: "diǎn", direction: "Bộ Thủy 氵" },
      { step: 2, strokeChar: "丶", strokeName: "Chấm 2", strokePinyin: "diǎn", direction: "Bộ Thủy 氵" },
      { step: 3, strokeChar: "㇀", strokeName: "Hất", strokePinyin: "tí", direction: "Hất bộ Thủy" },
      { step: 4, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Chữ Cửu 九" },
      { step: 5, strokeChar: "乙", strokeName: "Cong móc", strokePinyin: "wāngōu", direction: "Chữ 九" },
      { step: 6, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Bộ Mộc 木 dưới" },
      { step: 7, strokeChar: "丨", strokeName: "Sổ", strokePinyin: "shù", direction: "Sổ Mộc" },
      { step: 8, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Phẩy Mộc" },
      { step: 9, strokeChar: "乀", strokeName: "Mác", strokePinyin: "nà", direction: "Mác Mộc hoàn tất chữ 染" }
    ],
    exampleCompound: "印染 (yìnrǎn - In nhuộm), 染色 (rǎnsè - Nhuộm màu), 污染 (wūrǎn - Ô nhiễm)"
  },
  {
    hanzi: "智",
    pinyin: "zhì",
    vietnamese: "Trí (trí tuệ, thông minh, AI)",
    radical: "日 (Nhật)",
    strokeCount: 12,
    ruleExplanation: "Quy tắc: Trên trước dưới sau (Chữ Tri 知 ở trên, bộ Nhật 日 ở dưới).",
    strokeSteps: [
      "1. Nét phẩy (丿)",
      "2. Nét ngang (一)",
      "3. Nét ngang (一)",
      "4. Nét phẩy (丿)",
      "5. Nét chấm (丶)",
      "6. Nét sổ (丨)",
      "7. Nét ngang gập (𠃍)",
      "8. Nét ngang (一)",
      "9. Nét sổ (丨)",
      "10. Nét ngang gập (𠃍)",
      "11. Nét ngang (一)",
      "12. Nét ngang (一)"
    ],
    strokeOrderGuide: ["丿", "一", "一", "丿", "丶", "丨", "𠃍", "一", "丨", "𠃍", "一", "一"],
    strokeDetails: [
      { step: 1, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Chữ Thỉ 矢" },
      { step: 2, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Ngang Thỉ" },
      { step: 3, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Ngang 2" },
      { step: 4, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Phẩy dài" },
      { step: 5, strokeChar: "丶", strokeName: "Chấm", strokePinyin: "diǎn", direction: "Chấm Thỉ" },
      { step: 6, strokeChar: "丨", strokeName: "Sổ", strokePinyin: "shù", direction: "Bộ Khẩu" },
      { step: 7, strokeChar: "𠃍", strokeName: "Ngang gập", strokePinyin: "héngzhé", direction: "Khẩu" },
      { step: 8, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Đóng Khẩu" },
      { step: 9, strokeChar: "丨", strokeName: "Sổ", strokePinyin: "shù", direction: "Bộ Nhật dưới" },
      { step: 10, strokeChar: "𠃍", strokeName: "Ngang gập", strokePinyin: "héngzhé", direction: "Gập Nhật" },
      { step: 11, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Trong Nhật" },
      { step: 12, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Đóng Nhật hoàn tất chữ 智" }
    ],
    exampleCompound: "智能 (zhìnéng - Thông minh / AI), 人工智能 (Trí tuệ nhân tạo), 智慧 (zhìhuì - Trí tuệ)"
  },
  {
    hanzi: "能",
    pinyin: "néng",
    vietnamese: "Năng (năng lực, có thể, năng lượng)",
    radical: "月 (Nguyệt)",
    strokeCount: 10,
    ruleExplanation: "Quy tắc: Trái trước phải sau (Bộ Nguyệt 月 & Tư 厶bên trái, hai chữ Tỷ 匕bên phải).",
    strokeSteps: [
      "1. Nét phẩy gập (ㄥ)",
      "2. Nét chấm (丶)",
      "3. Nét sổ (丨)",
      "4. Nét ngang gập (𠃍)",
      "5. Nét ngang (一)",
      "6. Nét ngang (一)",
      "7. Nét phẩy (丿)",
      "8. Nét sổ cong móc (乚)",
      "9. Nét phẩy (丿)",
      "10. Nét sổ cong móc (乚)"
    ],
    strokeOrderGuide: ["ㄥ", "丶", "丨", "𠃍", "一", "一", "丿", "乚", "丿", "乚"],
    strokeDetails: [
      { step: 1, strokeChar: "ㄥ", strokeName: "Phẩy gập", strokePinyin: "piězhé", direction: "Bộ Tư 厶" },
      { step: 2, strokeChar: "丶", strokeName: "Chấm", strokePinyin: "diǎn", direction: "Chấm bộ Tư" },
      { step: 3, strokeChar: "丨", strokeName: "Sổ", strokePinyin: "shù", direction: "Bộ Nguyệt" },
      { step: 4, strokeChar: "𠃍", strokeName: "Ngang gập", strokePinyin: "héngzhé", direction: "Gập Nguyệt" },
      { step: 5, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Trong Nguyệt" },
      { step: 6, strokeChar: "一", strokeName: "Ngang", strokePinyin: "héng", direction: "Trong Nguyệt" },
      { step: 7, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Chữ 匕 trên" },
      { step: 8, strokeChar: "乚", strokeName: "Sổ cong móc", strokePinyin: "shùwāngōu", direction: "Móc chữ 匕 trên" },
      { step: 9, strokeChar: "丿", strokeName: "Phẩy", strokePinyin: "piě", direction: "Chữ 匕 dưới" },
      { step: 10, strokeChar: "乚", strokeName: "Sổ cong móc", strokePinyin: "shùwāngōu", direction: "Móc chữ 匕 dưới hoàn thành chữ 能" }
    ],
    exampleCompound: "能力 (nénglì - Năng lực), 节能 (jiénéng - Tiết kiệm năng lượng), 功能 (gōngnéng - Tính năng)"
  }
];

export const READING_PRACTICE_ITEMS: ReadingItem[] = [
  {
    id: "read_1",
    title: "服装厂的一天 - Một ngày ở xưởng may thời trang",
    hskLevel: "HSK1",
    content: "阮明在一家大型服装厂工作。他是三号产线的缝纫工。每天早上八点，车间主管召开早会。大家准时开机工作。今天阮明负责四线拷边，下摆和袖口做得非常平整。李组长夸奖他技术好、效率高。下午五点半，大家完成了一千件衣服的生产目标，高高兴兴地下班了。",
    pinyin: "Ruǎn Míng zài yì jiā dàxíng fúzhuāng chǎng gōngzuò. Tā shì sān hào chǎnxiàn de fèngrèngōng. Měitiān zǎoshang bā diǎn, chējiān zhǔguǎn zhàokāi zǎohuì. Dàjiā zhǔnshí kāijī gōngzuò. Jīntiān Ruǎn Míng fùzé sì xiàn kǎobiān, xiàbǎi hé xiùkǒu zuò de fēicháng píngzhěng. Lǐ zǔzhǎng kuājiǎng tā jìshù hǎo, xiàolǜ gāo. Xiàwǔ wǔ diǎn bàn, dàjiā wánchéng le yìqiān jiàn yīfu de shēngchǎn mùbiāo, gāogāoxìngxìng de xiàbān le.",
    vietnameseTranslation: "Nguyễn Minh làm việc tại một nhà máy may mặc lớn. Anh ấy là công nhân may tại chuyền số 3. Mỗi sáng 8 giờ, chủ quản phân xưởng tổ chức họp đầu ca. Mọi người bật máy đúng giờ làm việc. Hôm nay Minh phụ trách vắt sổ 4 chỉ, gấu áo và cửa tay làm rất phẳng phiu. Tổ trưởng Lý khen anh ấy tay nghề tốt, năng suất cao. 5 giờ rưỡi chiều, cả tổ đã hoàn thành mục tiêu sản xuất 1.000 sản phẩm và vui vẻ tan ca.",
    wordAnnotations: {
      "服装厂": { pinyin: "fúzhuāng chǎng", vietnamese: "Nhà máy may mặc thời trang", example: "服装厂有很多车间。" },
      "产线": { pinyin: "chǎnxiàn", vietnamese: "Chuyền may, dây chuyền", example: "我们在同一条产线。" },
      "缝纫工": { pinyin: "fèngrèngōng", vietnamese: "Thợ may, công nhân may", example: "熟练缝纫工效率高。" },
      "早会": { pinyin: "zǎohuì", vietnamese: "Họp giao ban đầu giờ sáng", example: "每天早上开早会。" },
      "拷边": { pinyin: "kǎobiān", vietnamese: "Vắt sổ", example: "用四线拷边机拷边。" },
      "平整": { pinyin: "píngzhěng", vietnamese: "Phẳng phiu, êm ái", example: "烫得非常平整。" },
      "效率": { pinyin: "xiàolǜ", vietnamese: "Năng suất, hiệu suất", example: "提高生产效率。" },
      "下班": { pinyin: "xiàbān", vietnamese: "Tan ca, hết giờ làm", example: "下午五点半下班。" }
    },
    questions: [
      {
        question: "阮明在工厂做什么工作？(Minh làm công việc gì ở nhà máy?)",
        options: ["三号产线的缝纫工 (Công nhân may chuyền 3)", "裁剪师傅 (Thợ cắt vải)", "机修工 (Thợ sửa máy)", "仓管员 (Thủ kho)"],
        answerIndex: 0,
        explanation: "Bài đọc nêu rõ: 他是三号产线的缝纫工 (Anh ấy là công nhân may của chuyền số 3)."
      },
      {
        question: "今天产线完成了多少件衣服？(Hôm nay chuyền may đã hoàn thành bao nhiêu chiếc áo?)",
        options: ["一千件 (1.000 chiếc)", "五百件 (500 chiếc)", "八百件 (800 chiếc)", "两千件 (2.000 chiếc)"],
        answerIndex: 0,
        explanation: "Bài đọc có câu: 大家完成了一千件衣服的生产目标 (Mọi người hoàn thành mục tiêu sản xuất 1.000 sản phẩm)."
      }
    ]
  },
  {
    id: "read_2",
    title: "参观现代面辅料展 - Tham quan triển lãm nguyên phụ liệu",
    hskLevel: "HSK2",
    content: "今天我和公司的采购经理一起去参加国际纺织面辅料展览会。展厅里有各种高品质的面料，比如纯棉、亚麻和防水透气功能性布料。我们还看了最新的金属拉链和环保树脂纽扣。经理说，选用好的辅料能够大幅提升服装的档次。",
    pinyin: "Jīntiān wǒ hé gōngsī de cǎigòu jīnglǐ yìqǐ qù cānjiā guójì fǎngzhī miàn fǔliào zhǎnlǎnhuì. Zhǎntīng lǐ yǒu gèzhǒng gāo pǐnzhì de miànliào, bǐrú chúnmián, yàmá hé fángshuǐ tòuqì gōngnéngxìng bùliào. Wǒmen hái kàn le zuìxīn de jīnshǔ lāliàn hé huánbǎo shùzhī niǔkòu. Jīnglǐ shuō, xuǎnyòng hǎo de fǔliào nénggòu dàfú tíshēng fúzhuāng de dàngcì.",
    vietnameseTranslation: "Hôm nay tôi cùng giám đốc thu mua của công ty tham gia hội chợ triển lãm dệt may và nguyên phụ liệu quốc tế. Trong phòng triển lãm có đủ các loại vải chất lượng cao như cotton 100%, đũi gai và vải tính năng chống thấm thoáng khí. Chúng tôi cũng xem các mẫu khóa kéo kim loại và khuy nhựa sinh học mới nhất. Giám đốc nói rằng chọn lựa phụ liệu tốt có thể nâng cao đáng kể đẳng cấp của trang phục.",
    wordAnnotations: {
      "采购": { pinyin: "cǎigòu", vietnamese: "Thu mua vật tư", example: "采购部负责买辅料。" },
      "面料": { pinyin: "miànliào", vietnamese: "Vải chính", example: "纯棉面料很舒服。" },
      "辅料": { pinyin: "fǔliào", vietnamese: "Phụ liệu (khóa, cúc, chun)", example: "检查辅料质量。" }
    },
    questions: [
      {
        question: "展厅里有哪些面料？(Trong triển lãm có những loại vải nào?)",
        options: ["纯棉、亚麻和防水透气面料 (Cotton, đũi và vải chống thấm)", "只有羊毛面料 (Chỉ có vải len)", "化纤塑料布 (Bạt nhựa)", "没有面料 (Không có vải)"],
        answerIndex: 0,
        explanation: "Bài đọc nêu: 各种高品质的面料，比如纯棉、亚麻和防水透气功能性布料。"
      }
    ]
  },
  {
    id: "read_3",
    title: "品质检验与AQL抽样标准 - Kiểm tra chất lượng & Tiêu chuẩn AQL",
    hskLevel: "HSK3",
    content: "在成衣出口检验中，国际通用的AQL（Acceptable Quality Limit）抽样检验标准至关重要。验货员会根据订单总数确定抽样箱数，仔细检查尺寸公差、色差、线头清理以及断针残片。只有当严重缺陷和轻微缺陷数量都在允许范围内时，整批大货才能准予出厂发货。",
    pinyin: "Zài chéngyī chūkǒu jiǎnyàn zhōng, guójì tōngyòng de AQL chōuyàng jiǎnyàn biāozhǔn zhìguān zhòngyào. Yànhuòyuán huì gēnjù dìngdān zǒngshù quèdìng chōuyàng xiāngshù, zǐxì jiǎnchá chǐcun gōngchā, sèchā, xiàntóu qīnglǐ yǐjí duànzhēn cánpiàn. Zhǐyǒu dāng yánzhòng quēxiàn hé qīngwēi quēxiàn shùliàng dōu zài yǔnxǔ fànwéi nèi shí, zhěng pī dàhuò cáinéng zhǔnyǔ chūchǎng fāhuò.",
    vietnameseTranslation: "Trong kiểm tra thành phẩm may mặc xuất khẩu, tiêu chuẩn lấy mẫu kiểm nghiệm AQL quốc tế có ý nghĩa vô cùng quan trọng. Nhân viên QC sẽ dựa vào tổng số lượng đơn hàng để xác định số thùng lấy mẫu ngẫu nhiên, kiểm tra cẩn thận dung sai kích thước, độ lệch màu, vệ sinh chỉ thừa cũng như mảnh kim gãy. Chỉ khi số lượng lỗi nghiêm trọng và lỗi nhẹ đều nằm trong phạm vi cho phép thì toàn bộ lô hàng mới được phép xuất xưởng giao hàng.",
    wordAnnotations: {
      "抽样": { pinyin: "chōuyàng", vietnamese: "Lấy mẫu ngẫu nhiên", example: "按AQL标准抽样。" },
      "公差": { pinyin: "gōngchā", vietnamese: "Dung sai kích thước", example: "尺寸公差在允许范围内。" },
      "断针": { pinyin: "duànzhēn", vietnamese: "Kim gãy (phải dò kim)", example: "过检针机防止断针。" }
    },
    questions: [
      {
        question: "AQL在服装行业代表什么？(AQL trong ngành may biểu thị điều gì?)",
        options: ["Tiêu chuẩn giới hạn chất lượng chấp nhận được (Acceptable Quality Limit)", "Bảng báo giá phụ liệu", "Kế hoạch tăng ca", "Thực đơn nhà ăn"],
        answerIndex: 0,
        explanation: "AQL là tiêu chuẩn nghiệm thu chất lượng quốc tế."
      }
    ]
  },
  {
    id: "read_4",
    title: "服装精益生产与数字看板 - Sản xuất Lean & Bảng điều hành số",
    hskLevel: "HSK4",
    content: "随着智能制造技术的发展，服装厂在各条生产线安装了实时电子看板。看板清晰显示当前产线的每小时产量、节拍时间（Takt Time）以及瓶颈工序。一旦发生断线、缺料或设备故障，系统立即报警，主管与机修人员能在三分钟内赶到现场解决，保障产线平稳高效运转。",
    pinyin: "Suízhe zhìnéng zhìzào jìshù de fāzhǎn, fúzhuāngchǎng zài gè tiáo shēngchǎnxiàn ānzhuāng le shíshí diànzǐ kànbǎn. Kànbǎn qīngxī xiǎnshì dāngqián chǎnxiàn de měi xiǎoshí chǎnliàng, jiépāi shíjiān yǐjí píngjǐng gōngxù. Yídàn fāshēng duànxiàn, quēliào huò shèbèi gùzhàng, xìtǒng lìjí bàojǐng, zhǔguǎn yǔ jīxiū rényuán néng zài sān fēnzhōng nèi gǎndào xiànchǎng jiějué, bǎozhàng chǎnxiàn píngwěn gāoxiào yùnzhuǎn.",
    vietnameseTranslation: "Cùng với sự phát triển của công nghệ sản xuất thông minh, nhà máy may đã lắp đặt bảng điện tử hiển thị thời gian thực trên từng chuyền may. Bảng hiển thị rõ ràng sản lượng mỗi giờ, thời gian nhịp chuyền (Takt Time) và công đoạn nút thắt cổ chai. Một khi xảy ra đứt chỉ, thiếu vật tư hoặc sự cố thiết bị, hệ thống lập tức phát tín hiệu cảnh báo, chủ quản và nhân viên bảo trì có thể có mặt xử lý trong vòng 3 phút, đảm bảo chuyền may vận hành ổn định và năng suất cao.",
    wordAnnotations: {
      "电子看板": { pinyin: "diànzǐ kànbǎn", vietnamese: "Bảng hiển thị điện tử / Bảng Andon", example: "车间安装了电子看板。" },
      "瓶颈工序": { pinyin: "píngjǐng gōngxù", vietnamese: "Công đoạn nút thắt cổ chai", example: "优化瓶颈工序提高产量。" },
      "节拍时间": { pinyin: "jiépāi shíjiān", vietnamese: "Thời gian nhịp (Takt Time)", example: "严格控制节拍时间。" }
    },
    questions: [
      {
        question: "电子看板的作用是什么？(Tác dụng của bảng điện tử trong xưởng là gì?)",
        options: ["Hiển thị sản lượng tức thời, nhịp chuyền và cảnh báo sự cố", "Chỉ dùng để chiếu phim", "Tính tiền điện", "Chấm công thủ công"],
        answerIndex: 0,
        explanation: "Bảng điện tử hiển thị thời gian thực về sản lượng, thời gian nhịp và cảnh báo sự cố kỹ thuật."
      }
    ]
  },
  {
    id: "read_5",
    title: "跨国纺织供应链与ESG可持续发展 - Chuỗi cung ứng dệt may & ESG",
    hskLevel: "HSK5",
    content: "在全球气候变化的大背景下，国际服装品牌对供应链的环保要求愈发严格。纺织企业纷纷引入屋顶光伏、无水染色与再生涤纶（rPET）材料，积极申请全球回收标准（GRS）和Higg Index环境评估认证。践行绿色低碳不仅是履行企业社会责任，更是赢得欧美高端买家长期订单的核心通行证。",
    pinyin: "Zài quánqiú qìhòu biànhuà de dà bèijǐng xià, guójì fúzhuāng pǐnpái duì gōngyìngliàn de huánbǎo yāoqiú yùfā yángé. Fǎngxī qǐyè fēnfēn yǐnrù wūdǐng guāngfú, wúshuǐ rǎnsè yǔ zàishēng dílún (rPET) cáiliào, jījí shēnqǐng Quánqiú Huíshōu Biāozhǔn (GRS) hé Higg Index huánjìng pínggū rènzhèng. Jiànxíng lǜsè dītàn bùjǐn shì lǚxíng qǐyè shèhuì zérèn, gèng shì yíngdé Ōu-Měi gāoduān mǎijiā chángqī dìngdān de héxīn tōngxíngzhèng.",
    vietnameseTranslation: "Trong bối cảnh biến đổi khí hậu toàn cầu, các thương hiệu thời trang quốc tế ngày càng đặt ra những yêu cầu khắt khe hơn về môi trường đối với chuỗi cung ứng. Các doanh nghiệp dệt may liên tục đầu tư hệ thống điện mặt trời mái nhà, công nghệ nhuộm không dùng nước và vật liệu polyester tái chế (rPET), tích cực đăng ký chứng nhận Tiêu chuẩn Tái chế Toàn cầu (GRS) và đánh giá môi trường Higg Index. Thực hành xanh giảm phát thải carbon không chỉ là thực hiện trách nhiệm xã hội doanh nghiệp mà còn là tấm vé thông hành cốt lõi để giành được các đơn hàng dài hạn từ người mua hàng cao cấp Âu Mỹ.",
    wordAnnotations: {
      "再生涤纶": { pinyin: "zàishēng dílún", vietnamese: "Sợi polyester tái chế (rPET)", example: "使用再生涤纶制作环保运动服。" },
      "无水染色": { pinyin: "wúshuǐ rǎnsè", vietnamese: "Nhuộm không dùng nước CO2", example: "无水染色技术实现零污水排放。" },
      "通行证": { pinyin: "tōngxíngzhèng", vietnamese: "Vé thông hành / Giấy phép", example: "环保认证是外贸出口的通行证。" }
    },
    questions: [
      {
        question: "纺织企业践行绿色低碳的核心商业价值是什么？(Giá trị thương mại cốt lõi của doanh nghiệp khi chuyển đổi xanh là gì?)",
        options: ["Đáp ứng tiêu chuẩn ESG để giành đơn hàng dài hạn từ các thương hiệu quốc tế", "Được miễn trừ tất cả các loại thuế", "Không cần trả lương công nhân", "Không cần kiểm tra chất lượng"],
        answerIndex: 0,
        explanation: "Thực hành tiêu chuẩn xanh ESG là yêu cầu bắt buộc của các nhãn hàng quốc tế."
      }
    ]
  },
  {
    id: "read_6",
    title: "AI视觉检测与服装智能工厂 - AI thị giác & Nhà máy may 4.0",
    hskLevel: "HSK6",
    content: "随着深度学习与机器视觉技术的飞跃发展，传统人工验布正被AI智能验布系统全面取代。该系统在每分钟60米的高速布匹运行中，能精准捕捉经向抽纱、纬斜、油渍及色斑等微小瑕疵，检出率达99%以上，并实时自动生成瑕疵分布热力图与电子质量评级报告，极大提升了成衣裁剪前的面料利用率。",
    pinyin: "Suízhe shēndù xuéxí yǔ jīqì shìjué jìshù de fēiyuè fāzhǎn, chuántǒng réngōng yànbù zhèng bèi AI zhìnéng yànbù xìtǒng quánmiàn qǔdài. Gāi xìtǒng zài měi fēnzhōng liùshí mǐ de gāosù bùpǐ yùnxíng zhōng, néng jīngzhǔn bǔzhuō jīngxiàng chōushā, wěixié, yóuzì jí sèbān děng wēixiǎo xiácī, jiǎnchūlǜ dá bǎifēnzhī jiǔshíjiǔ yǐshàng, bìng shíshí zìdòng shēngchéng xiácī fēnbù rèlìtú yǔ diànzǐ zhìliàng píngjí bàogào, jídà tíshēng le chéngyī cáijiǎn qián de miànliào lìyònglǜ.",
    vietnameseTranslation: "Cùng với sự phát triển nhảy vọt của công nghệ học sâu và thị giác máy tính, phương pháp kiểm vải thủ công truyền thống đang được thay thế toàn diện bởi hệ thống kiểm vải thông minh AI. Ở tốc độ chạy vải cao 60m/phút, hệ thống có thể bắt trọn chính xác các khuyết tật nhỏ như rút sợi dọc, méo sợi ngang, vết dầu loang và đốm màu với tỷ lệ phát hiện trên 99%, đồng thời tự động xuất bản đồ nhiệt phân bổ khuyết tật và báo cáo xếp hạng chất lượng điện tử theo thời gian thực, nâng cao đáng kể hiệu suất sử dụng vải trước khi đưa vào cắt may.",
    wordAnnotations: {
      "机器视觉": { pinyin: "jīqì shìjué", vietnamese: "Thị giác máy tính", example: "机器视觉检测精度极高。" },
      "经向抽纱": { pinyin: "jīngxiàng chōushā", vietnamese: "Rút sợi theo chiều dọc", example: "AI验布机能自动识别经向抽纱。" },
      "热力图": { pinyin: "rèlìtú", vietnamese: "Bản đồ nhiệt phân bổ lỗi", example: "生成瑕疵分布热力图。" }
    },
    questions: [
      {
        question: "AI智能验布机的主要优势是什么？(Ưu thế chính của máy kiểm vải thông minh AI là gì?)",
        options: ["Kiểm tra tốc độ cao 60m/phút, tỷ lệ phát hiện lỗi >99% và tự động xuất báo cáo số hóa", "Giá thành cực rẻ như một cây kéo", "Không cần dùng điện", "Tự động may thành áo sơ mi"],
        answerIndex: 0,
        explanation: "AI kiểm vải giải phóng sức lao động, quét lỗi tốc độ cao và số hóa toàn bộ dữ liệu chất lượng cây vải."
      }
    ]
  }
];

import { COMPREHENSIVE_SPEAKING_PROMPTS } from "./speakingData";

export const SPEAKING_PROMPTS = COMPREHENSIVE_SPEAKING_PROMPTS;

export const LISTENING_DRILLS: QuizQuestion[] = [
  // HSK 1 - 2
  {
    id: "list_1",
    type: "listen_choose",
    question: "Nghe phát âm và chọn nghĩa tiếng Việt chính xác của từ vựng:",
    audioText: "拷边机",
    pinyin: "kǎobiānjī",
    options: ["Máy vắt sổ", "Máy may 1 kim", "Máy thùa khuy", "Máy ép mex"],
    correctAnswer: "Máy vắt sổ",
    explanation: "拷边机 (kǎobiānjī) nghĩa là máy vắt sổ (overlock machine)."
  },
  {
    id: "list_2",
    type: "listen_choose",
    question: "Nghe câu thoại sau và chọn câu tiếng Trung nghe được:",
    audioText: "请把这批衣服送到后道包装",
    pinyin: "Qǐng bǎ zhè pī yīfu sòng dào hòudào bāozhuāng",
    options: [
      "请把这批衣服送到后道包装",
      "请把这批布料送到裁剪车间",
      "今天车间主管要来检查产线",
      "大家一起去食堂吃午饭"
    ],
    correctAnswer: "请把这批衣服送到后道包装",
    explanation: "Câu phát âm: Xin hãy chuyển lô quần áo này đến bộ phận hoàn tất đóng gói."
  },
  {
    id: "list_3",
    type: "listen_choose",
    question: "Nghe phát âm từ vựng và chọn Pinyin tương ứng:",
    audioText: "质量",
    pinyin: "zhìliàng",
    options: ["zhìliàng (Chất lượng)", "chǐmǎ (Kích cỡ)", "cáijiǎn (Cắt vải)", "gōngxù (Công đoạn)"],
    correctAnswer: "zhìliàng (Chất lượng)",
    explanation: "质量 (zhìliàng) nghĩa là Chất lượng."
  },
  {
    id: "list_4",
    type: "listen_choose",
    question: "Nghe câu thoại sau và chọn nội dung chính xác:",
    audioText: "我们厂每天早上八点开早会",
    pinyin: "Wǒmen chǎng měitiān zǎoshang bā diǎn kāi zǎohuì",
    options: [
      "Xưởng chúng tôi mỗi sáng 8 giờ họp giao ban",
      "Xưởng chúng tôi 5 giờ chiều tan ca",
      "Hôm nay chuyền may nghỉ làm",
      "Mời mọi người đi ăn trưa"
    ],
    correctAnswer: "Xưởng chúng tôi mỗi sáng 8 giờ họp giao ban",
    explanation: "开早会 nghĩa là họp giao ban đầu giờ sáng."
  },
  {
    id: "list_5",
    type: "listen_choose",
    question: "Nghe thuật ngữ chuyên ngành may và chọn thuật ngữ nghe được:",
    audioText: "工艺单",
    pinyin: "gōngyìdān",
    options: ["工艺单 (Tài liệu kỹ thuật / Techpack)", "出库单 (Phiếu xuất kho)", "送货单 (Phiếu giao hàng)", "请假条 (Đơn xin nghỉ)"],
    correctAnswer: "工艺单 (Tài liệu kỹ thuật / Techpack)",
    explanation: "工艺单 (gōngyìdān) là bảng thông số kỹ thuật may mẫu và sản xuất."
  },
  {
    id: "list_6",
    type: "listen_choose",
    question: "Nghe câu hội thoại và chọn phản hồi phù hợp:",
    audioText: "这批货的交货期能提前三天吗？",
    pinyin: "Zhè pī huò de jiāohuò qī néng tíqián sān tiān ma?",
    options: [
      "Thời hạn giao hàng lô này có thể đẩy sớm 3 ngày không?",
      "Lô hàng này có cần tăng giá 3% không?",
      "Hôm nay có 3 công nhân xin nghỉ phép không?",
      "Nhà xưởng có 3 cái máy may mới về đúng không?"
    ],
    correctAnswer: "Thời hạn giao hàng lô này có thể đẩy sớm 3 ngày không?",
    explanation: "交货期 (jiāohuò qī) là thời hạn giao hàng, 提前三天 là đẩy sớm 3 ngày."
  },
  {
    id: "list_7",
    type: "listen_choose",
    question: "Nghe từ vựng và nhận diện lỗi may chính xác:",
    audioText: "跳针",
    pinyin: "tiàozhēn",
    options: ["Nhảy mũi chỉ / Bỏ mũi may", "Gãy kim may", "Lệch đường may", "Rách vải"],
    correctAnswer: "Nhảy mũi chỉ / Bỏ mũi may",
    explanation: "跳针 (tiàozhēn) là hiện tượng máy may bị nhảy mũi / bỏ mũi chỉ."
  },

  // HSK 3 - 4
  {
    id: "list_8",
    type: "listen_choose",
    question: "Nghe câu kiểm tra chất lượng và chọn nghĩa tiếng Việt chuẩn xác:",
    audioText: "所有的断针残片必须全部找到并粘在记录本上",
    pinyin: "Suǒyǒu de duànzhēn cánpiàn bìxū quánbù zhǎodào bìng zhān zài jìlùběn shàng",
    options: [
      "Tất cả mảnh kim gãy bắt buộc phải tìm đủ và dán vào sổ nhật ký kim",
      "Tất cả kim gãy đều vứt vào thùng rác",
      "Không cần ghi chép khi gãy kim",
      "Thợ may tự mua kim mới thay vào"
    ],
    correctAnswer: "Tất cả mảnh kim gãy bắt buộc phải tìm đủ và dán vào sổ nhật ký kim",
    explanation: "Quy trình quản lý chống gãy kim (Broken Needle Policy) bắt buộc phải tìm đủ mảnh kim dán vào sổ đối chiếu."
  },
  {
    id: "list_9",
    type: "listen_choose",
    question: "Nghe thuật ngữ đo lường vải vóc:",
    audioText: "克重",
    pinyin: "kèzhòng",
    options: ["Định lượng vải (Gram/m² - GSM)", "Độ co giãn của vải", "Độ bền kéo đứt", "Màu sắc vải"],
    correctAnswer: "Định lượng vải (Gram/m² - GSM)",
    explanation: "克重 (kèzhòng) là định lượng trọng lượng vải tính theo gram trên mỗi mét vuông (GSM)."
  },
  {
    id: "list_10",
    type: "listen_choose",
    question: "Nghe câu chỉ đạo sản xuất Lean:",
    audioText: "请IE工程师分析一下这个工位的瓶颈工序",
    pinyin: "Qǐng IE gōngchéngshī fēnxī yíxià zhè ge gōngwèi de píngjǐng gōngxù",
    options: [
      "Xin mời kỹ sư IE phân tích công đoạn nút thắt cổ chai của vị trí này",
      "Kỹ sư IE đi ăn trưa",
      "Dừng toàn bộ chuyền may lại",
      "Đổi màu vải của đơn hàng"
    ],
    correctAnswer: "Xin mời kỹ sư IE phân tích công đoạn nút thắt cổ chai của vị trí này",
    explanation: "IE (Kỹ sư công nghiệp) phụ trách cân bằng chuyền và tối ưu nút thắt cổ chai (瓶颈工序)."
  },

  // HSK 5 - 6
  {
    id: "list_11",
    type: "listen_choose",
    question: "Nghe cụm từ về quy tắc xuất xứ RCEP:",
    audioText: "原产地累积规则",
    pinyin: "yuánchǎndì lěijī guīzé",
    options: [
      "Quy tắc cộng gộp xuất xứ hàng hóa",
      "Quy tắc đóng thuế hải quan",
      "Quy định kiểm tra an toàn lao động",
      "Quy định tính lương làm thêm giờ"
    ],
    correctAnswer: "Quy tắc cộng gộp xuất xứ hàng hóa",
    explanation: "原产地累积规则 (Rules of Origin Accumulation) là quy tắc cộng gộp xuất xứ trong hiệp định thương mại tự do RCEP."
  },
  {
    id: "list_12",
    type: "listen_choose",
    question: "Nghe câu quản trị phát triển bền vững:",
    audioText: "我们要积极推进超临界二氧化碳无水染色技术",
    pinyin: "Wǒmen yào jījí tuījìn chāolínjiè èryǎnghuàtàn wúshuǐ rǎnsè jìshù",
    options: [
      "Chúng ta cần tích cực đẩy mạnh công nghệ nhuộm không dùng nước bằng CO2 siêu tới hạn",
      "Chúng ta cần tăng lượng nước xả thải ra sông",
      "Dừng sử dụng vải dệt kim",
      "Chỉ sản xuất hàng may mặc màu đen"
    ],
    correctAnswer: "Chúng ta cần tích cực đẩy mạnh công nghệ nhuộm không dùng nước bằng CO2 siêu tới hạn",
    explanation: "无水染色 (Waterless Dyeing) là công nghệ nhuộm xanh tiết kiệm nước tiên tiến hàng đầu hiện nay."
  }
];
