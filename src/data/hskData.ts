import { HSKLevelId, Lesson, QuizQuestion } from"../types";
import { HSK1_LESSONS } from"./lessonsHsk1";
import { HSK2_LESSONS } from"./lessonsHsk2";
import { HSK3_LESSONS } from"./lessonsHsk3";
import { HSK4_LESSONS } from"./lessonsHsk4";
import { HSK5_LESSONS } from"./lessonsHsk5";
import { HSK6_LESSONS } from"./lessonsHsk6";

export { HSK1_LESSONS, HSK2_LESSONS, HSK3_LESSONS, HSK4_LESSONS, HSK5_LESSONS, HSK6_LESSONS };

export const HSK_LESSONS_BY_LEVEL: Record<HSKLevelId, Lesson[]> = {
  HSK1: HSK1_LESSONS,
  HSK2: HSK2_LESSONS,
  HSK3: HSK3_LESSONS,
  HSK4: HSK4_LESSONS,
  HSK5: HSK5_LESSONS,
  HSK6: HSK6_LESSONS
};

export interface HSKLevelInfo {
  id: HSKLevelId;
  name: string;
  hanziName: string;
  totalWords: number;
  grammarPointsCount: number;
  color: string;
  badgeColor: string;
  description: string;
  targetSkill: string;
}

export const HSK_LEVELS: HSKLevelInfo[] = [
  {
    id:"HSK1",
    name:"HSK 1",
    hanziName:"一级 (Yījí)",
    totalWords: 150,
    grammarPointsCount: 15,
    color:"from-blue-500 to-cyan-500",
    badgeColor:"bg-blue-50 text-blue-700 border-blue-200",
    description:"Nhận biết các câu đơn giản, chào hỏi, số đếm, gia đình, mua sắm cơ bản",
    targetSkill:"Giao tiếp cơ bản trong đời sống thường ngày"
  },
  {
    id:"HSK2",
    name:"HSK 2",
    hanziName:"二级 (Èrjí)",
    totalWords: 300,
    grammarPointsCount: 25,
    color:"from-emerald-500 to-teal-500",
    badgeColor:"bg-emerald-50 text-emerald-700 border-emerald-200",
    description:"Trao đổi thông tin đơn giản, chỉ đường, hỏi giá, sở thích và thói quen",
    targetSkill:"Trao đổi trực tiếp các vấn đề quen thuộc hàng ngày"
  },
  {
    id:"HSK3",
    name:"HSK 3",
    hanziName:"三级 (Sānjí)",
    totalWords: 600,
    grammarPointsCount: 40,
    color:"from-amber-500 to-orange-500",
    badgeColor:"bg-amber-50 text-amber-700 border-amber-200",
    description:"Giao tiếp trong học tập, công việc, du lịch và cuộc sống xã hội",
    targetSkill:"Hoàn thành hầu hết các tác vụ giao tiếp khi ở Trung Quốc"
  },
  {
    id:"HSK4",
    name:"HSK 4",
    hanziName:"四级 (Sìjí)",
    totalWords: 1200,
    grammarPointsCount: 65,
    color:"from-violet-500 to-purple-500",
    badgeColor:"bg-violet-50 text-violet-700 border-violet-200",
    description:"Thảo luận về nhiều chủ đề phong phú, đàm thoại trôi chảy với người bản xứ",
    targetSkill:"Đọc báo chí, xem phim và làm việc chuyên nghiệp bằng tiếng Trung"
  },
  {
    id:"HSK5",
    name:"HSK 5",
    hanziName:"五级 (Wǔjí)",
    totalWords: 2500,
    grammarPointsCount: 90,
    color:"from-rose-500 to-pink-500",
    badgeColor:"bg-rose-50 text-rose-700 border-rose-200",
    description:"Đọc báo chí, tiểu thuyết, thưởng thức phim ảnh và phát biểu thuyết trình",
    targetSkill:"Sử dụng tiếng Trung thành thạo như ngôn ngữ làm việc thứ hai"
  },
  {
    id:"HSK6",
    name:"HSK 6",
    hanziName:"六级 (Liùjí)",
    totalWords: 5000,
    grammarPointsCount: 120,
    color:"from-indigo-600 to-slate-800",
    badgeColor:"bg-indigo-50 text-indigo-700 border-indigo-200",
    description:"Hiểu dễ dàng mọi thông tin nghe đọc và diễn đạt tự do như người bản ngữ",
    targetSkill:"Trình độ cao cấp, nghiên cứu học thuật và dịch thuật chuyên sâu"
  }
];

export const PLACEMENT_TEST_QUESTIONS: QuizQuestion[] = [
  {
    id:"pt_1",
    type:"multiple_choice",
    question:"Chọn Pinyin và nghĩa chính xác của từ:'你好'",
    options: ["nǐ hǎo - Xin chào","nǐ hào - Tạm biệt","nín hǎo - Cảm ơn","nǐ hao - Xin lỗi"],
    correctAnswer:"nǐ hǎo - Xin chào",
    explanation:"你好 (nǐ hǎo) là lời chào phổ biến nhất trong tiếng Trung."
  },
  {
    id:"pt_2",
    type:"multiple_choice",
    question:"Điền từ vào chỗ trống: 他是我的_____，我们在同一家工厂上班。",
    options: ["同事 (đồng nghiệp)","苹果 (quả táo)","下雨 (trời mưa)","喝水 (uống nước)"],
    correctAnswer:"同事 (đồng nghiệp)",
    explanation:"Câu hoàn chỉnh: 他是我的同事 (Anh ấy là đồng nghiệp của tôi, chúng tôi làm cùng một nhà máy)."
  },
  {
    id:"pt_3",
    type:"multiple_choice",
    question:"Trong xưởng may, từ'拷边机' (kǎobiānjī) có nghĩa là gì?",
    options: ["Máy vắt sổ","Máy may 1 kim","Máy cắt vải","Bàn ủi hơi nước"],
    correctAnswer:"Máy vắt sổ",
    explanation:"拷边机 / 包缝机 là máy vắt sổ chuyên dụng trong ngành may mặc."
  },
  {
    id:"pt_4",
    type:"sentence_reorder",
    question:"Sắp xếp các từ thành câu hoàn chỉnh:",
    words: ["我","在","车间","工作","每天"],
    correctAnswer:"我每天在车间工作",
    explanation:"Cấu trúc: Chủ ngữ + Thời gian + Ở đâu (在地) + Làm gì (工作): 我每天在车间工作 (Tôi mỗi ngày đều làm việc ở phân xưởng)."
  },
  {
    id:"pt_5",
    type:"multiple_choice",
    question:"Chọn câu dịch đúng của:'Quy cách chất lượng phải đạt chuẩn'",
    options: ["质量标准必须达标","今天天气很好","我要去买衣服","请把门关上"
    ],
    correctAnswer:"质量标准必须达标",
    explanation:"质量 (chất lượng), 标准 (tiêu chuẩn), 必须 (bắt buộc), 达标 (đạt chuẩn)."
  }
];
