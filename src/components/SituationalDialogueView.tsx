import React, { useState, useRef } from "react";
import { 
  MessageSquare, 
  Volume2, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  RefreshCw, 
  BookOpen, 
  Layers, 
  Compass, 
  Check, 
  ChevronRight, 
  UserCheck, 
  Users, 
  Lightbulb, 
  Filter,
  ArrowRight
} from "lucide-react";
import { 
  SITUATIONAL_CATEGORIES, 
  SITUATIONAL_DIALOGUES, 
  SituationalDialogueItem, 
  SituationalLine 
} from "../data/situationalData";
import { playChineseAudio, createSpeechRecognizer, VoiceAudioRecorder, playScoreSound } from "../services/speechService";
import { ScrollableTabs } from "./ScrollableTabs";

interface SituationalDialogueViewProps {
  onRecordSpeaking?: () => void;
  onOpenAITutorWithPrompt?: (prompt: string) => void;
}

export const SituationalDialogueView: React.FC<SituationalDialogueViewProps> = ({
  onRecordSpeaking,
  onOpenAITutorWithPrompt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>(SITUATIONAL_DIALOGUES[0].id);
  const [playingLineIndex, setPlayingLineIndex] = useState<number | null>(null);
  const [roleplayMode, setRoleplayMode] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Voice Recording & Evaluation for selected line
  const [recordingLineIndex, setRecordingLineIndex] = useState<number | null>(null);
  const [spokenLineTranscript, setSpokenLineTranscript] = useState<{ [lineIdx: number]: string }>({});
  const [evaluatedLineScores, setEvaluatedLineScores] = useState<{ [lineIdx: number]: { score: number; feedback: string } }>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const recognizerRef = useRef<any>(null);
  const voiceRecorderRef = useRef<VoiceAudioRecorder | null>(null);

  // Filtered Dialogues
  const filteredDialogues = SITUATIONAL_DIALOGUES.filter(d => {
    if (selectedCategory === "ALL") return true;
    return d.categoryId === selectedCategory;
  });

  const currentDialogue: SituationalDialogueItem = 
    SITUATIONAL_DIALOGUES.find(d => d.id === selectedDialogueId) || filteredDialogues[0] || SITUATIONAL_DIALOGUES[0];

  // Play audio for a single dialogue line
  const handlePlayLine = async (line: SituationalLine, index: number) => {
    setPlayingLineIndex(index);
    await playChineseAudio(line.hanzi, 1.0);
    setPlayingLineIndex(null);
  };

  // Play entire dialogue sequentially
  const handlePlayAllDialogue = async () => {
    for (let i = 0; i < currentDialogue.lines.length; i++) {
      setPlayingLineIndex(i);
      await playChineseAudio(currentDialogue.lines[i].hanzi, 1.0);
      await new Promise(r => setTimeout(r, 600));
    }
    setPlayingLineIndex(null);
  };

  // Toggle voice recording for a specific line
  const handleToggleRecordLine = async (line: SituationalLine, index: number) => {
    if (isRecording) {
      // Stop recording
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      if (voiceRecorderRef.current) {
        await voiceRecorderRef.current.stop();
      }
      setIsRecording(false);
      setRecordingLineIndex(null);
    } else {
      // Start recording
      setRecordingLineIndex(index);
      setIsRecording(true);
      setSpokenLineTranscript(prev => ({ ...prev, [index]: "" }));

      try {
        const recognizer = createSpeechRecognizer(
          (recognizedText: string) => {
            setSpokenLineTranscript(prev => ({ ...prev, [index]: recognizedText }));
            if (recognizedText) {
              evaluateLineSpeech(line, recognizedText, index);
            }
          },
          (err: string) => {
            console.warn("Speech recognition error:", err);
            setIsRecording(false);
            setRecordingLineIndex(null);
          },
          () => {
            setIsRecording(false);
            setRecordingLineIndex(null);
          }
        );

        recognizerRef.current = recognizer;
        if (recognizer) {
          recognizer.start();
        } else {
          // Fallback if browser doesn't support Web Speech
          const recorder = new VoiceAudioRecorder();
          voiceRecorderRef.current = recorder;
          await recorder.start();
        }
      } catch (err) {
        console.error("Mic error:", err);
        setIsRecording(false);
        setRecordingLineIndex(null);
      }
    }
  };

  const evaluateLineSpeech = async (line: SituationalLine, text: string, index: number) => {
    setIsEvaluating(true);
    try {
      const cleanTarget = line.hanzi.replace(/[.,?!，。？！\s]/g, "");
      const cleanSpoken = (text || "").replace(/[.,?!，。？！\s]/g, "");
      const isExact = cleanSpoken.length > 0 && (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken));
      const score = isExact ? 100 : Math.max(60, Math.round((cleanSpoken.length / Math.max(1, cleanTarget.length)) * 80));
      
      playScoreSound(isExact);
      setEvaluatedLineScores(prev => ({
        ...prev,
        [index]: {
          score,
          feedback: isExact 
            ? "Tuyệt vời! Bạn phát âm rất chuẩn xác và đúng ngữ điệu tự nhiên!"
            : `Đã nhận diện: "${text}". Cần luyện thêm ngữ điệu thanh điệu chuẩn.`
        }
      }));

      if (score >= 80 && onRecordSpeaking) {
        onRecordSpeaking();
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 animate-fadeIn text-slate-900 w-full max-w-full overflow-hidden">
      
      {/* Top Banner - Situational Communication Mastery */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-blue-500/30">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hội Thoại Thực Chiến 100% Tình Huống</span>
            </span>
            <span className="text-xs text-blue-100 font-semibold bg-white/15 px-3 py-1 rounded-full backdrop-blur-xs">
              Nghe giọng chuẩn • Đóng vai • Chấm điểm AI
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Luyện Giao Tiếp Tình Huống Hàng Ngày & Công Sở
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
            Học tiếng Trung qua các bối cảnh đời thực: Chào hỏi kết bạn WeChat, Đi ăn nhà hàng, Mua sắm mặc cả, Bắt taxi chỉ đường, Báo cáo công việc, và Chuyên môn kỹ thuật may mặc xưởng sản xuất.
          </p>
        </div>
      </div>

      {/* Category Pills Selector */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Chọn Chủ Đề Tình Huống</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            {SITUATIONAL_CATEGORIES.length} nhóm chủ đề giao tiếp
          </span>
        </div>

        <ScrollableTabs hintText="Trượt xem các chủ đề giao tiếp thực tế" pillColor="blue">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              selectedCategory === "ALL"
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            🌟 Tất Cả Tình Huống ({SITUATIONAL_DIALOGUES.length})
          </button>

          {SITUATIONAL_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 font-black scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {cat.dialogueCount}
                </span>
              </button>
            );
          })}
        </ScrollableTabs>
      </div>

      {/* Main Grid: Left = Dialogues List, Right = Interactive Active Dialogue Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Dialogues Selector (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Danh sách kịch bản hội thoại ({filteredDialogues.length})
            </span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredDialogues.map(dialogue => {
              const isSelected = dialogue.id === currentDialogue.id;
              return (
                <div
                  key={dialogue.id}
                  onClick={() => {
                    setSelectedDialogueId(dialogue.id);
                    setPlayingLineIndex(null);
                    setRecordingLineIndex(null);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-blue-50/80 border-blue-600 shadow-sm ring-2 ring-blue-100"
                      : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-black text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      {dialogue.categoryName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {dialogue.level}
                    </span>
                  </div>

                  <h4 className={`text-sm font-black leading-snug ${isSelected ? "text-blue-900" : "text-slate-900"}`}>
                    {dialogue.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {dialogue.scenarioDescription}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>{dialogue.lines.length} câu thoại</span>
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 font-bold">
                      <span>Luyện tập</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Interactive Dialogue Player & Roleplay Studio (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-sm space-y-6">
          
          {/* Dialogue Header Card */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-black">
                  {currentDialogue.categoryName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                  {currentDialogue.level}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {currentDialogue.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                📍 {currentDialogue.scenarioDescription}
              </p>
            </div>

            {/* Play All Audio CTA */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePlayAllDialogue}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer active:scale-95 transition"
                title="Nghe toàn bộ đoạn hội thoại liên tục"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Phát toàn bài</span>
              </button>

              <button
                onClick={() => setRoleplayMode(!roleplayMode)}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition cursor-pointer ${
                  roleplayMode
                    ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
                title="Bật chế độ luyện tập đóng vai"
              >
                <Users className="w-4 h-4" />
                <span>{roleplayMode ? "Đang Đóng Vai" : "Chế độ Đóng Vai"}</span>
              </button>
            </div>
          </div>

          {/* Roleplay Selection Banner if enabled */}
          {roleplayMode && (
            <div className="bg-orange-50/80 border border-orange-200 p-4 rounded-2xl text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-orange-900">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Chọn nhân vật bạn muốn đóng vai để luyện nói:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedRole(null)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    selectedRole === null ? "bg-orange-600 text-white" : "bg-white text-slate-700 border border-orange-200"
                  }`}
                >
                  Luyện toàn bộ tất cả nhân vật
                </button>
                {currentDialogue.characters.map((char, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRole(char.name)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      selectedRole === char.name
                        ? "bg-orange-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-orange-200 hover:bg-orange-100/50"
                    }`}
                  >
                    <span>🎭 Đóng vai {char.name}</span>
                    <span className="text-[10px] opacity-80">({char.role})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dialogue Lines Stack */}
          <div className="space-y-4">
            {currentDialogue.lines.map((line, idx) => {
              const isPlaying = playingLineIndex === idx;
              const isRec = recordingLineIndex === idx;
              const evalScore = evaluatedLineScores[idx];
              const isHighlightedForRole = selectedRole ? line.speaker.includes(selectedRole) || selectedRole.includes(line.speaker) : false;

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isPlaying
                      ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-100"
                      : isHighlightedForRole
                      ? "bg-orange-50/60 border-orange-300 ring-2 ring-orange-100"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {/* Speaker Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-xs ${
                        idx % 2 === 0 ? "bg-blue-600 text-white" : "bg-indigo-600 text-white"
                      }`}>
                        {line.speaker.slice(0, 1)}
                      </span>
                      <div>
                        <span className="text-xs font-black text-slate-900">{line.speaker}</span>
                        <span className="text-[10px] text-slate-500 ml-1.5 font-medium">({line.role})</span>
                      </div>
                      {isHighlightedForRole && (
                        <span className="px-2 py-0.5 rounded-md bg-orange-500 text-white text-[10px] font-black animate-pulse">
                          Vai của bạn
                        </span>
                      )}
                    </div>

                    {/* Audio & Mic Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePlayLine(line, idx)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer ${
                          isPlaying
                            ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                            : "bg-slate-50 text-blue-600 border-slate-200 hover:bg-blue-600 hover:text-white"
                        }`}
                        title="Nghe phát âm chuẩn câu này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleRecordLine(line, idx)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer ${
                          isRec
                            ? "bg-red-600 text-white border-red-600 animate-bounce"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                        }`}
                        title="Bấm để thu âm và chấm điểm phát âm câu này"
                      >
                        {isRec ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Hanzi Text */}
                  <p className="text-base sm:text-lg font-black text-slate-900 tracking-wide mt-1">
                    {line.hanzi}
                  </p>

                  {/* Pinyin Text */}
                  <p className="text-xs sm:text-sm font-mono text-orange-600 font-extrabold mt-1">
                    {line.pinyin}
                  </p>

                  {/* Vietnamese Translation */}
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1.5 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/60">
                    👉 {line.vietnamese}
                  </p>

                  {/* Key phrase note if available */}
                  {line.keyPhrase && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-700 font-semibold">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                      <span>Cụm từ then chốt: <span className="font-bold text-blue-900">{line.keyPhrase}</span></span>
                    </div>
                  )}

                  {/* Recognition & AI Evaluation Result */}
                  {evalScore && (
                    <div className={`mt-3 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                      evalScore.score >= 80 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                        : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                      <div className="space-y-0.5">
                        <p className="font-black">
                          Điểm phát âm: {evalScore.score}/100
                        </p>
                        <p className="font-medium text-slate-700">
                          {evalScore.feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Key Vocabulary Table */}
          <div className="border-t border-slate-200 pt-5 space-y-3">
            <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Từ Vựng Quan Trọng Trong Tình Huống</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {currentDialogue.keyVocabulary.map((vocab, i) => (
                <div 
                  key={i} 
                  onClick={() => playChineseAudio(vocab.hanzi, 1.0)}
                  className="bg-slate-50 hover:bg-blue-50/70 p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm">{vocab.hanzi}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <p className="text-[11px] font-mono text-orange-600 font-bold">{vocab.pinyin}</p>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">{vocab.vietnamese}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Tips Box */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-orange-50/40 p-4 sm:p-5 rounded-2xl border border-blue-200/80 space-y-1.5">
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
              <span>💡 Góc Văn Hóa & Bí Quyết Giao Tiếp Thực Tế</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentDialogue.culturalTips}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
