import React, { useState } from "react";
import { Volume2, BookOpen, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from "lucide-react";
import { HSKLevelId } from "../types";
import { playChineseAudio } from "../services/speechService";

interface GrammarItem {
  id: string;
  title: string;
  pinyinTitle: string;
  structure: string;
  explanation: string;
  rules?: string[];
  examples: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
    highlight?: string;
  }[];
}

const HSK_GRAMMAR_BY_LEVEL: Record<HSKLevelId, GrammarItem[]> = {
  HSK1: [
    {
      id: "hsk1_g1",
      title: "1. Câu chữ 是 (shì) - Câu khẳng định & phán đoán",
      pinyinTitle: "Shì zì jù",
      structure: "Chủ ngữ + 是 + Danh từ / Đại từ",
      explanation: "Chữ 是 tương đương với động từ 'là' trong tiếng Việt, dùng để xác định tính chất, thân phận, nghề nghiệp hoặc định nghĩa của chủ ngữ. Phủ định dùng 不是.",
      examples: [
        { hanzi: "我是越南人。", pinyin: "Wǒ shì Yuènán rén.", vietnamese: "Tôi là người Việt Nam." },
        { hanzi: "他不是老师，他是医生。", pinyin: "Tā bú shì lǎoshī, tā shì yīshēng.", vietnamese: "Anh ấy không phải là giáo viên, anh ấy là bác sĩ." },
        { hanzi: "这是我的书。", pinyin: "Zhè shì wǒ de shū.", vietnamese: "Đây là quyển sách của tôi." }
      ]
    },
    {
      id: "hsk1_g2",
      title: "2. Trợ từ kết cấu 的 (de) - Thể hiện quan hệ sở hữu & định ngữ",
      pinyinTitle: "Jiégòu zhùcí 'de'",
      structure: "Định ngữ (Chủ sở hữu/Tính chất) + 的 + Trung tâm ngữ (Danh từ chính)",
      explanation: "Dùng để biểu thị quan hệ sở hữu ('của') hoặc bổ nghĩa cho danh từ đứng sau. Khi mối quan hệ gia đình thân thiết có thể lược bỏ 的.",
      examples: [
        { hanzi: "我的衣服很漂亮。", pinyin: "Wǒ de yīfu hěn piàoliang.", vietnamese: "Quần áo của tôi rất đẹp." },
        { hanzi: "我爸爸在工厂工作。", pinyin: "Wǒ bàba zài gōngchǎng gōngzuò.", vietnamese: "Bố tôi làm việc ở nhà máy (lược bỏ 的)." }
      ]
    },
    {
      id: "hsk1_g3",
      title: "3. Câu hỏi với trợ từ nghi vấn 吗 (ma)",
      pinyinTitle: "Yíwèn zhùcí 'ma'",
      structure: "Câu trần thuật + 吗？",
      explanation: "Biến câu kể thành câu hỏi Yes/No một cách đơn giản nhất mà không làm thay đổi trật tự từ trong câu.",
      examples: [
        { hanzi: "你是中国人吗？", pinyin: "Nǐ shì Zhōngguó rén ma?", vietnamese: "Bạn là người Trung Quốc phải không?" },
        { hanzi: "这个苹果甜吗？", pinyin: "Zhège píngguǒ tián ma?", vietnamese: "Quả táo này có ngọt không?" }
      ]
    },
    {
      id: "hsk1_g4",
      title: "4. Đại từ nghi vấn: 什么 (gì), 哪儿 (ở đâu), 谁 (ai), 几 (mấy)",
      pinyinTitle: "Yíwèn dàicí",
      structure: "Thay đại từ nghi vấn vào đúng vị trí của thông tin cần hỏi",
      explanation: "Trong tiếng Trung, vị trí của đại từ nghi vấn giữ nguyên vị trí ngữ pháp của từ cần hỏi trong câu trả lời.",
      examples: [
        { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", vietnamese: "Bạn tên là gì?" },
        { hanzi: "你在哪儿？", pinyin: "Nǐ zài nǎr?", vietnamese: "Bạn đang ở đâu?" },
        { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", vietnamese: "Bây giờ là mấy giờ?" }
      ]
    }
  ],
  HSK2: [
    {
      id: "hsk2_g1",
      title: "1. Câu so sánh với chữ 比 (bǐ)",
      pinyinTitle: "Bǐ zì jù",
      structure: "A + 比 + B + Tính từ / (Tính từ + 一点儿 / 得多 / 数量词)",
      explanation: "Dùng để so sánh mức độ giữa hai đối tượng A và B. Thể phủ định dùng 没有 (A 没有 B ...).",
      examples: [
        { hanzi: "今天比昨天冷。", pinyin: "Jīntiān bǐ zuótiān lěng.", vietnamese: "Hôm nay lạnh hơn hôm qua." },
        { hanzi: "哥哥比我大三岁。", pinyin: "Gēge bǐ wǒ dà sān suì.", vietnamese: "Anh trai lớn hơn tôi 3 tuổi." }
      ]
    },
    {
      id: "hsk2_g2",
      title: "2. Trợ từ động thái 过 (guò) - Trải nghiệm từng trải",
      pinyinTitle: "Dòngtài zhùcí 'guò'",
      structure: "Chủ ngữ + Động từ + 过 + Tân ngữ",
      explanation: "Nhấn mạnh chủ ngữ đã từng có trải nghiệm làm một hành động nào đó trong quá khứ.",
      examples: [
        { hanzi: "我去过中国两次。", pinyin: "Wǒ qù guo Zhōngguó liǎng cì.", vietnamese: "Tôi từng đi Trung Quốc hai lần." },
        { hanzi: "我没吃过北京烤鸭。", pinyin: "Wǒ méi chī guo Běijīng kǎoyā.", vietnamese: "Tôi chưa từng ăn vịt quay Bắc Kinh." }
      ]
    },
    {
      id: "hsk2_g3",
      title: "3. Cặp liên từ nguyên nhân kết quả: 因为……所以……",
      pinyinTitle: "Yīnwèi... suǒyǐ...",
      structure: "因为 + Nguyên nhân, 所以 + Kết quả",
      explanation: "Diễn tả quan hệ nhân quả một cách rõ ràng và mạch lạc trong câu phức.",
      examples: [
        { hanzi: "因为今天下雨，所以我没去跑步。", pinyin: "Yīnwèi jīntiān xiàyǔ, suǒyǐ wǒ méi qù pǎobù.", vietnamese: "Bởi vì hôm nay trời mưa, cho nên tôi không đi chạy bộ." }
      ]
    }
  ],
  HSK3: [
    {
      id: "hsk3_g1",
      title: "1. Câu chữ 把 (bǎ) - Nhấn mạnh sự xử lý tác động",
      pinyinTitle: "Bǎ zì jù",
      structure: "Chủ ngữ + 把 + Đối tượng tác động + Động từ + Thành phần khác (Kết quả/Nơi chốn/Xu hướng)",
      explanation: "Dùng khi người nói muốn nhấn mạnh hành động làm biến đổi trạng thái hoặc chuyển dời vị trí của tân ngữ.",
      examples: [
        { hanzi: "请把门关上。", pinyin: "Qǐng bǎ mén guānshang.", vietnamese: "Làm ơn đóng cửa lại giúp." },
        { hanzi: "我已经把作业做完了。", pinyin: "Wǒ yǐjīng bǎ zuòyè zuò wán le.", vietnamese: "Tôi đã làm xong bài tập rồi." }
      ]
    },
    {
      id: "hsk3_g2",
      title: "2. Câu bị động với chữ 被 (bèi)",
      pinyinTitle: "Bèi zì jù",
      structure: "Đối tượng chịu tác động + 被 + (Chủ thể gây ra) + Động từ + Thành phần khác",
      explanation: "Biểu thị sự việc bị hoặc được thực hiện bởi một chủ thể khác, thường mang sắc thái không mong muốn hoặc khách quan.",
      examples: [
        { hanzi: "我的自行车被偷了。", pinyin: "Wǒ de zìxíngchē bèi tōu le.", vietnamese: "Xe đạp của tôi bị trộm mất rồi." },
        { hanzi: "苹果被弟弟吃完了。", pinyin: "Píngguǒ bèi dìdi chī wán le.", vietnamese: "Táo bị em trai ăn hết rồi." }
      ]
    }
  ],
  HSK4: [
    {
      id: "hsk4_g1",
      title: "1. Liên từ logic kết quả: 从而 (cóng'ér)",
      pinyinTitle: "Liáncí 'cóng'ér'",
      structure: "Phương pháp / Hành động vế 1, 从而 + Kết quả / Mục tiêu đạt được vế 2",
      explanation: "Liên kết hai phân câu, chỉ ra rằng sự việc ở vế trước là phương tiện trực tiếp dẫn đến kết quả ở vế sau.",
      examples: [
        { hanzi: "优化生产工艺，从而提高了产品合格率。", pinyin: "Yōuhuà shēngchǎn gōngyì, cóng'ér tígāo le chǎnpǐn hégélǜ.", vietnamese: "Tối ưu hóa quy trình sản xuất, nhờ vậy nâng cao tỷ lệ hàng đạt chuẩn." }
      ]
    },
    {
      id: "hsk4_g2",
      title: "2. Cặp liên từ nhượng bộ: 哪怕……也……",
      pinyinTitle: "Nǎpà... yě...",
      structure: "哪怕 + Tình huống khó khăn nhất, Chủ ngữ + 也 + Vẫn thực hiện",
      explanation: "Biểu thị dù cho giả định ở mức độ khắc nghiệt nhất xảy ra thì kết luận ở vế sau vẫn không thay đổi.",
      examples: [
        { hanzi: "哪怕只有一点点希望，我们也要全力以赴。", pinyin: "Nǎpà zhǐyǒu yìdiǎndiǎn xīwàng, wǒmen yě yào quánlì yǐ fù.", vietnamese: "Cho dù chỉ còn một chút hy vọng, chúng ta cũng phải dốc toàn lực." }
      ]
    }
  ],
  HSK5: [
    {
      id: "hsk5_g1",
      title: "1. Cấu trúc văn bản hợp đồng: 基于……原则 (Căn cứ trên nguyên tắc...)",
      pinyinTitle: "Jīyú... yuánzé",
      structure: "双方基于 + Tôn chỉ / Nguyên tắc + Động từ ký kết / hợp tác",
      explanation: "Dùng phổ biến trong văn phong pháp lý, thương mại và thư tín ngoại giao.",
      examples: [
        { hanzi: "双方基于平等互利的原则签署本协议。", pinyin: "Shuāngfāng jīyú píngděng hùlì de yuánzé qiānshǔ běn xiéyì.", vietnamese: "Hai bên ký kết thỏa thuận này trên nguyên tắc bình đẳng cùng có lợi." }
      ]
    }
  ],
  HSK6: [
    {
      id: "hsk6_g1",
      title: "1. Cấu trúc diễn ngôn học thuật & Báo cáo vĩ mô: 鉴于……特此……",
      pinyinTitle: "Jiànyú... tècǐ...",
      structure: "鉴于 + Hoàn cảnh / Lý do khách quan, 特此 + Tuyên bố / Quyết định chính thức",
      explanation: "Cấu trúc văn ngôn cao cấp dùng trong công văn nghị định, thông báo quyết định của tập đoàn hoặc tuyên bố pháp luật.",
      examples: [
        { hanzi: "鉴于上述客观事实，特此发布本公告。", pinyin: "Jiànyú shàngshù kèguān shìshí, tècǐ fābù běn gōnggào.", vietnamese: "Xét các sự thật khách quan nêu trên, nay trân trọng thông báo quyết nghị này." }
      ]
    }
  ]
};

interface HskLevelGrammarViewProps {
  level: HSKLevelId;
}

export const HskLevelGrammarView: React.FC<HskLevelGrammarViewProps> = ({ level }) => {
  const grammarList = HSK_GRAMMAR_BY_LEVEL[level] || HSK_GRAMMAR_BY_LEVEL.HSK1;
  const [expandedId, setExpandedId] = useState<string | null>(grammarList[0]?.id || null);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Cẩm nang ngữ pháp trọng tâm {level}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng hợp công thức, phân tích lỗi sai và ví dụ ứng dụng thực tế
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
          {grammarList.length} điểm ngữ pháp
        </span>
      </div>

      <div className="space-y-3">
        {grammarList.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-2xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-100 shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-400">
                      {item.pinyinTitle}
                    </p>
                  </div>
                </div>

                <div className="p-1 rounded-xl bg-slate-100 text-slate-500">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-100 space-y-4 animate-fadeIn">
                  {/* Formula Box */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs space-y-1 mt-4">
                    <span className="font-bold text-blue-700 uppercase tracking-wider text-[10px]">
                      Công thức chuẩn:
                    </span>
                    <p className="font-mono font-bold text-slate-800 text-sm">
                      {item.structure}
                    </p>
                    <p className="text-slate-600 mt-1.5 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Ví dụ minh họa:
                    </span>
                    <div className="space-y-2">
                      {item.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2"
                        >
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-800 text-sm">
                              {ex.hanzi}
                            </p>
                            <p className="font-mono text-xs text-blue-600">
                              {ex.pinyin}
                            </p>
                            <p className="text-xs text-slate-600 font-medium">
                              {ex.vietnamese}
                            </p>
                          </div>

                          <button
                            onClick={() => playChineseAudio(ex.hanzi, 0.95)}
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                            title="Phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
