export type HSKLevelId = 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';

export type TabType = 'home' | 'learn' | 'dialogue' | 'pinyin' | 'radicals' | 'grammar' | 'garment' | 'practice' | 'vocab' | 'dictionary' | 'game' | 'profile';

export type GrammarCategory = 
  | 'basic_sentences'    // Câu cơ bản & Trật tự từ (S+V+O, Định ngữ, Trạng ngữ...)
  | 'special_sentences'  // Câu đặc biệt (Câu chữ 把, 被, 比, 有, 是...的, 连...都...)
  | 'complements'        // Các loại Bổ ngữ (Kết quả, Khả năng, Xu hướng, Trạng thái, Thời lượng, Trình độ)
  | 'particles'          // Trợ từ quan trọng (的, 得, 地, 了, 着, 过, 呢, 吧, 吗, 啊)
  | 'conjunctions'       // Cặp liên từ & Câu phức (虽然...但是, 因为...所以, 不但...而且, 如果...就...)
  | 'adverbs_quantifiers'// Phó từ, Lượng từ & Giới từ (刚/刚才, 再/又, 在/给/向/对/跟, Lượng từ bắt buộc)
  | 'garment_factory';   // Ngữ pháp & Mẫu câu Xưởng may chuyên dụng

export interface GrammarExample {
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  highlight?: string;
  analysis?: string;
}

export interface GrammarMistake {
  wrongHanzi: string;
  wrongPinyin: string;
  wrongTranslation?: string;
  correctHanzi: string;
  correctPinyin: string;
  correctTranslation: string;
  explanation: string;
}

export interface GrammarQuiz {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'reorder' | 'error_correction';
  question: string;
  pinyinPrompt?: string;
  options?: string[];
  correctAnswer: string;
  words?: string[]; // for sentence reordering
  explanation: string;
}

export interface DeepGrammarPoint {
  id: string;
  hskLevel: HSKLevelId;
  category: GrammarCategory;
  categoryName: string;
  title: string;
  pinyinTitle?: string;
  shortSummary: string;
  formula: string[];
  explanation: string[];
  goldenRules: string[];
  examples: GrammarExample[];
  commonMistakes: GrammarMistake[];
  quizzes: GrammarQuiz[];
  proTips?: string[];
  relatedGrammarIds?: string[];
}

export type MembershipTier = 'free' | 'pro_monthly' | 'pro_annual' | 'lifetime' | 'garment_addon';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string | null;
  currentHskLevel: HSKLevelId;
  targetHskLevel: HSKLevelId;
  streakDays: number;
  lastActiveDate: string;
  totalWordsLearned?: number;
  totalLessonsCompleted?: number;
  totalStudyMinutes?: number;
  accuracyScore?: number;
  notificationEnabled: boolean;
  dailyReminderTime: string; // e.g."20:00"
  badges?: string[];
  membershipTier?: MembershipTier;
  membershipExpiresAt?: string; // ISO string or 'lifetime'
  gems?: number;
  activityPoints?: number;
  unlockedLessonIds?: string[];
  unlockedGarmentTopicIds?: string[];
  dailyAiUsageCount?: number;
  lastAiUsageDate?: string;
}

export interface WordItem {
  id: string;
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  sinoVietnamese?: string;
  partOfSpeech: string; // danh từ, động từ, tính từ...
  hskLevel: HSKLevelId |'GARMENT';
  topic: string;
  exampleSentence?: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
  };
  audioUrl?: string;
  isSpecialized?: boolean;
  industryCategory?: 'factory' | 'machinery' | 'process' | 'management' | 'fabric_accessory' | 'measure_defect';
  notes?: string;
}

export interface GarmentTerm extends WordItem {
  industryCategory: 'factory' | 'machinery' | 'process' | 'management' | 'fabric_accessory' | 'measure_defect';
  commonUsage: string;
  vietnameseTechnicalTerm?: string;
}

export interface GarmentDialogueLine {
  speaker: string;
  role: string;
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  audioText?: string;
}

export interface GarmentDialogue {
  id: string;
  title: string;
  participants: string;
  situation: string;
  lines: GarmentDialogueLine[];
  keyTerms: string[];
  explanation: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  structure: string;
  explanation: string;
  examples: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
  }[];
}

export interface Lesson {
  id: string;
  hskLevel: HSKLevelId;
  lessonNumber: number;
  title: string;
  vietnameseTitle: string;
  description: string;
  estimatedMinutes: number;
  vocabularyIds?: string[];
  vocabulary?: WordItem[];
  grammarPoints: GrammarPoint[];
  dialogue?: GarmentDialogueLine[];
  readingPassage?: {
    title: string;
    contentHanzi: string;
    contentPinyin: string;
    contentVietnamese: string;
  };
  quizQuestions: QuizQuestion[];
}

export type QuizQuestionType = 
  |'multiple_choice' 
  |'fill_blank' 
  |'listen_choose' 
  |'sentence_reorder' 
  |'translate_cn_vi' 
  |'translate_vi_cn'
  |'hanzi_match';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  pinyin?: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  words?: string[]; // for sentence reordering
}

export interface ReadingItem {
  id: string;
  title: string;
  hskLevel: HSKLevelId;
  content: string;
  pinyin: string;
  vietnameseTranslation: string;
  wordAnnotations: { [key: string]: { pinyin: string; vietnamese: string; example?: string } };
  questions: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export interface HanziStrokeDetail {
  step: number;
  strokeChar: string; // e.g. "丶", "一", "丿", "㇁", "丿", "乀"
  strokeName: string; // e.g. "Nét Chấm (点)", "Nét Ngang (横)"
  strokePinyin: string; // "diǎn", "héng", "piě"
  direction: string; // "Từ trên xuống dưới", "Từ trái sang phải"
  part?: string; // Vị trí cấu thành (ví dụ: "1. Bộ Ngôn 讠", "2. Chữ Thân 身")
}

export interface HanziWritingItem {
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  radical: string;
  strokeCount: number;
  strokeSteps: string[];
  strokeOrderGuide: string[];
  strokeDetails?: HanziStrokeDetail[];
  ruleExplanation?: string;
  exampleCompound: string;
}

export interface UserProgressData {
  uid?: string;
  totalXP: number;
  wordsLearned?: number;
  lessonsCompleted?: number;
  completedLessonIds: string[];
  lastLessonId?: string;
  favoriteWordIds: string[];
  difficultWordIds: string[];
  masteredWordIds: string[];
  learningWordIds: string[];
  quizScores?: { [quizId: string]: number };
  speakingPracticedCount: number;
  listeningPracticedCount: number;
  readingPracticedCount?: number;
  writingPracticedCount?: number;
  dialoguesCompletedCount?: number;
  hskAccuracyRates?: { [hsk in HSKLevelId]?: number };
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category:'streak' |'vocabulary' |'lessons' |'garment' |'speaking';
}

export type RadicalCategory = 
  |'nature'          // Thiên nhiên & Vũ trụ (Nhật, Nguyệt, Thủy, Hỏa, Thổ, Phong, Vũ...)
  |'human'           // Con người & Thân thể (Nhân, Nữ, Tử, Khẩu, Thủ, Túc, Mục, Nhĩ, Tâm...)
  |'animal'          // Động vật & Sinh vật (Khuyển, Ngưu, Dương, Mã, Trùng, Điểu, Ngư...)
  |'plant'           // Thực vật & Nông nghiệp (Mộc, Thảo, Trúc, Hòa, Mễ, Qua, Đậu...)
  |'tool'            // Đồ dùng & Binh khí (Đao, Cung, Qua, Y, Cân, Bát, Xa, Chu, Môn, Thực...)
  |'building'        // Nhà cửa & Địa thế (Miên, Quảng, Hộ, Sước, Tẩu, Hành, Phụ, Ấp, Huyệt...)
  |'action_quality'  // Trạng thái, Màu sắc & Hành động (Bạch, Hắc, Xích, Thanh, Hoàng, Lực, Kiến, Ngôn...)
  |'strokes_abstract'; // Nét cơ bản & Ký hiệu trừu tượng (Nhất, Cổn, Điểm, Phiệt, Ất, Thập, Bát...)

export interface RadicalExampleWord {
  hanzi: string;
  pinyin: string;
  sinoVietnamese: string;
  vietnamese: string;
  explanation: string;
  exampleSentence?: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
  };
}

export interface RadicalItem {
  id: number; // 1 to 214
  radical: string; // Chữ Hán của bộ thủ, ví dụ"水"
  variants?: string[]; // Các biến thể, ví dụ ["氵","氺"]
  pinyin: string; // Phiên âm Pinyin kèm thanh điệu, ví dụ"shuǐ"
  sinoVietnamese: string; // Âm Hán Việt, ví dụ"Thủy"
  vietnamese: string; // Ý nghĩa tiếng Việt, ví dụ"Nước, chất lỏng"
  strokeCount: number; // Số nét (1 - 17 nét)
  category: RadicalCategory; // Nhóm phân loại
  categoryName: string; // Tên nhóm tiếng Việt
  mnemonic?: string; // Mẹo nhớ & ý nghĩa tượng hình
  strokeOrderGuide: string[]; // Tên thứ tự các nét: ["Nét chấm","Nét chấm","Nét hất"]
  strokeSvgSteps?: string[]; // Mô tả hoặc hướng dẫn nét
  vocabularyExamples: RadicalExampleWord[]; // 3-4 từ vựng minh họa
}

export interface RadicalLesson {
  id: string;
  title: string;
  vietnameseTitle?: string;
  category: RadicalCategory;
  description: string;
  radicalIds: number[];
  quizQuestions?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

