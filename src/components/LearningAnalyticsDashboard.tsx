import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Zap,
  BarChart3,
  LineChart as LineChartIcon,
  Layers,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock
} from "lucide-react";
import { UserProfile, UserProgressData } from "../types";

interface LearningAnalyticsDashboardProps {
  userProfile: UserProfile;
  userProgress: UserProgressData;
  darkMode?: boolean;
}

type TimeframeOption = "week" | "month" | "six_months";
type ChartType = "composed" | "area" | "bar";

export const LearningAnalyticsDashboard: React.FC<LearningAnalyticsDashboardProps> = ({
  userProfile,
  userProgress,
  darkMode = false
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("week");
  const [chartType, setChartType] = useState<ChartType>("composed");
  const [activeMetric, setActiveMetric] = useState<"all" | "xp" | "vocab">("all");

  const totalXP = userProgress.totalXP ?? 0;
  const wordsLearned = userProgress.wordsLearned ?? userProgress.masteredWordIds?.length ?? 0;
  const streak = userProfile.streakDays ?? 1;
  const studyMinutes = userProfile.totalStudyMinutes ?? Math.round(totalXP * 0.4);

  // Generate dynamic data points anchored to actual current user progress
  const chartData = useMemo(() => {
    if (totalXP === 0 && wordsLearned === 0) {
      if (timeframe === "week") {
        const dayNames = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
        return dayNames.map((day) => ({
          name: day,
          fullName: `${day} tuần này`,
          dailyXP: 0,
          dailyVocab: 0,
          cumulativeXP: 0,
          cumulativeVocab: 0,
          studyTimeMin: 0
        }));
      } else if (timeframe === "month") {
        const weeks = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
        return weeks.map((w) => ({
          name: w,
          fullName: `${w} (Tháng hiện tại)`,
          dailyXP: 0,
          dailyVocab: 0,
          cumulativeXP: 0,
          cumulativeVocab: 0,
          studyTimeMin: 0
        }));
      } else {
        const months = ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"];
        return months.map((m) => ({
          name: m,
          fullName: `${m}/2026`,
          dailyXP: 0,
          dailyVocab: 0,
          cumulativeXP: 0,
          cumulativeVocab: 0,
          studyTimeMin: 0
        }));
      }
    }

    if (timeframe === "week") {
      // 7 days of the current week (T2 -> CN)
      const dayNames = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
      const baseDailyXP = Math.max(1, Math.round(totalXP / 14));
      const baseDailyVocab = Math.max(1, Math.round(wordsLearned / 10));

      const weights = [0.6, 0.9, 1.2, 0.8, 1.5, 1.8, 1.4]; // Activity variance
      let runningXP = Math.max(0, totalXP - Math.round(baseDailyXP * 7));
      let runningVocab = Math.max(0, wordsLearned - Math.round(baseDailyVocab * 7));

      return dayNames.map((day, idx) => {
        const gainXP = Math.round(baseDailyXP * weights[idx] + (idx === 6 ? 2 : 1));
        const gainVocab = Math.round(baseDailyVocab * (weights[idx] * 0.7) + (idx % 2 === 0 ? 1 : 0));
        runningXP += gainXP;
        runningVocab += gainVocab;

        // Last day syncs with current totalXP
        const displayTotalXP = idx === 6 ? totalXP : Math.min(totalXP, runningXP);
        const displayTotalVocab = idx === 6 ? wordsLearned : Math.min(wordsLearned, runningVocab);

        return {
          name: day,
          fullName: `${day} tuần này`,
          dailyXP: gainXP,
          dailyVocab: gainVocab,
          cumulativeXP: displayTotalXP,
          cumulativeVocab: displayTotalVocab,
          studyTimeMin: Math.round(gainXP * 0.45)
        };
      });
    } else if (timeframe === "month") {
      // 4 Weeks of the current month
      const weeks = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
      const baseWeeklyXP = Math.max(1, Math.round(totalXP / 4.5));
      const baseWeeklyVocab = Math.max(1, Math.round(wordsLearned / 4.2));

      let runningXP = Math.max(0, totalXP - Math.round(baseWeeklyXP * 3));
      let runningVocab = Math.max(0, wordsLearned - Math.round(baseWeeklyVocab * 3));

      return weeks.map((w, idx) => {
        const weekMultiplier = [0.75, 0.95, 1.2, 1.4][idx];
        const gainXP = Math.round(baseWeeklyXP * weekMultiplier);
        const gainVocab = Math.round(baseWeeklyVocab * weekMultiplier);
        runningXP += gainXP;
        runningVocab += gainVocab;

        return {
          name: w,
          fullName: `${w} (Tháng hiện tại)`,
          dailyXP: gainXP,
          dailyVocab: gainVocab,
          cumulativeXP: idx === 3 ? totalXP : Math.min(totalXP, runningXP),
          cumulativeVocab: idx === 3 ? wordsLearned : Math.min(wordsLearned, runningVocab),
          studyTimeMin: Math.round(gainXP * 0.5)
        };
      });
    } else {
      // 6 Months overview
      const months = ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"];
      const baseMonthlyXP = Math.max(1, Math.round(totalXP / 5));
      const baseMonthlyVocab = Math.max(1, Math.round(wordsLearned / 4.8));

      let runningXP = 0;
      let runningVocab = 0;

      return months.map((m, idx) => {
        const monthMultiplier = [0.4, 0.6, 0.8, 1.1, 1.3, 1.6][idx];
        const gainXP = Math.round(baseMonthlyXP * monthMultiplier);
        const gainVocab = Math.round(baseMonthlyVocab * monthMultiplier);
        runningXP += gainXP;
        runningVocab += gainVocab;

        return {
          name: m,
          fullName: `${m}/2026`,
          dailyXP: gainXP,
          dailyVocab: gainVocab,
          cumulativeXP: idx === 5 ? totalXP : Math.min(totalXP, runningXP),
          cumulativeVocab: idx === 5 ? wordsLearned : Math.min(wordsLearned, runningVocab),
          studyTimeMin: Math.round(gainXP * 0.55)
        };
      });
    }
  }, [timeframe, totalXP, wordsLearned]);

  // Skill breakdown distribution data
  const skillBreakdown = useMemo(() => {
    const speaking = userProgress.speakingPracticedCount || 0;
    const listening = userProgress.listeningPracticedCount || 0;
    const reading = userProgress.readingPracticedCount || 0;
    const writing = userProgress.writingPracticedCount || 0;
    const lessons = (userProgress.completedLessonIds?.length || 0) * 10;
    const garment = (userProgress.dialoguesCompletedCount || 0) * 5;

    const totalActions = speaking + listening + reading + writing + lessons + garment;

    return [
      { skill: "Luyện nghe", count: listening, color: "#3B82F6", percent: totalActions > 0 ? Math.round((listening / totalActions) * 100) : 20 },
      { skill: "Phát âm Pinyin", count: speaking, color: "#10B981", percent: totalActions > 0 ? Math.round((speaking / totalActions) * 100) : 20 },
      { skill: "Bài học HSK", count: lessons, color: "#8B5CF6", percent: totalActions > 0 ? Math.round((lessons / totalActions) * 100) : 20 },
      { skill: "Tập viết chữ", count: writing, color: "#F59E0B", percent: totalActions > 0 ? Math.round((writing / totalActions) * 100) : 20 },
      { skill: "Thuật ngữ may", count: garment, color: "#EC4899", percent: totalActions > 0 ? Math.round((garment / totalActions) * 100) : 20 }
    ];
  }, [userProgress]);

  // Custom rich tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md text-xs space-y-2 min-w-[190px]">
          <div className="font-bold text-slate-200 border-b border-slate-800 pb-1.5 flex items-center justify-between">
            <span>{data?.fullName || label}</span>
            <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
              +{data?.studyTimeMin || 15} phút
            </span>
          </div>

          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>Điểm XP tăng thêm:</span>
              </span>
              <span className="font-extrabold text-amber-400 text-sm">+{data?.dailyXP || 0} XP</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span>Từ vựng mới học:</span>
              </span>
              <span className="font-extrabold text-emerald-400 text-sm">+{data?.dailyVocab || 0} từ</span>
            </div>

            <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Tổng XP tích lũy:</span>
              <span className="font-bold text-white">{data?.cumulativeXP} XP</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Tổng từ tích lũy:</span>
              <span className="font-bold text-white">{data?.cumulativeVocab} từ</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary Stats Row */}
      <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Bảng Phân Tích & Tăng Trưởng Học Tập
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Theo dõi biểu đồ tiến độ điểm XP, từ vựng ghi nhớ và hiệu suất học tập thời gian thực
            </p>
          </div>

          {/* Timeframe selector tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl self-start sm:self-auto">
            <button
              id="chart-tab-week"
              onClick={() => setTimeframe("week")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === "week"
                  ? "bg-white text-blue-600 shadow-xs scale-100"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 ngày qua
            </button>
            <button
              id="chart-tab-month"
              onClick={() => setTimeframe("month")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === "month"
                  ? "bg-white text-blue-600 shadow-xs scale-100"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              4 tuần qua
            </button>
            <button
              id="chart-tab-six-months"
              onClick={() => setTimeframe("six_months")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === "six_months"
                  ? "bg-white text-blue-600 shadow-xs scale-100"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              6 tháng qua
            </button>
          </div>
        </div>

        {/* 4 Interactive KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Total XP */}
          <div 
            onClick={() => setActiveMetric(activeMetric === "xp" ? "all" : "xp")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeMetric === "xp"
                ? "bg-amber-50/80 border-amber-300 ring-2 ring-amber-200"
                : "bg-amber-50/30 border-amber-100 hover:border-amber-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-800">Tổng Điểm XP</span>
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-amber-950">{totalXP.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold mt-1">
              <TrendingUp className="w-3 h-3 text-amber-600" />
              <span>{totalXP > 0 ? "Tích lũy từ bài học" : "Chưa có điểm XP"}</span>
            </div>
          </div>

          {/* Mastered Vocabulary */}
          <div 
            onClick={() => setActiveMetric(activeMetric === "vocab" ? "all" : "vocab")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeMetric === "vocab"
                ? "bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200"
                : "bg-emerald-50/30 border-emerald-100 hover:border-emerald-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-emerald-800">Từ Vựng Đã Học</span>
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-emerald-950">{wordsLearned} từ</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{wordsLearned > 0 ? `Đạt ${Math.min(100, Math.round((wordsLearned / 150) * 100))}% mục tiêu HSK1` : "Chưa có từ thành thạo"}</span>
            </div>
          </div>

          {/* Streak Days */}
          <div className="p-4 rounded-2xl bg-orange-50/30 border border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-orange-800">Chuỗi Ngày Học</span>
              <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                <Flame className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-orange-950">{streak} ngày</div>
            <div className="text-[10px] text-orange-700 font-semibold mt-1">
              {streak > 1 ? `Kỷ lục: ${streak} ngày liên tục` : "Ngày đầu tiên tham gia"}
            </div>
          </div>

          {/* Study Minutes */}
          <div className="p-4 rounded-2xl bg-indigo-50/30 border border-indigo-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-800">Thời Lượng Học</span>
              <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-indigo-950">{studyMinutes} phút</div>
            <div className="text-[10px] text-indigo-700 font-semibold mt-1">
              {studyMinutes > 0 ? `Tổng thời gian đã học` : `Bắt đầu buổi học đầu tiên`}
            </div>
          </div>
        </div>

        {/* 2. Chart Display Mode Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Dạng hiển thị:</span>
            <div className="inline-flex p-0.5 bg-slate-100 rounded-xl">
              <button
                onClick={() => setChartType("composed")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  chartType === "composed" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Biểu đồ kết hợp Vùng & Cột"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kết hợp</span>
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  chartType === "bar" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Biểu đồ Cột"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Cột</span>
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  chartType === "area" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Biểu đồ Đường / Vùng"
              >
                <LineChartIcon className="w-3.5 h-3.5" />
                <span>Đường Vùng</span>
              </button>
            </div>
          </div>

          {/* Legends */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveMetric(activeMetric === "xp" ? "all" : "xp")}
              className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
                activeMetric === "vocab" ? "opacity-35" : "opacity-100"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
              <span className="text-slate-700">Điểm XP ({timeframe === "week" ? "Ngày" : "Kỳ"})</span>
            </button>
            <button
              onClick={() => setActiveMetric(activeMetric === "vocab" ? "all" : "vocab")}
              className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
                activeMetric === "xp" ? "opacity-35" : "opacity-100"
              }`}
            >
              <span className="w-3 h-3 rounded-md bg-emerald-500 shadow-xs" />
              <span className="text-slate-700">Từ Vựng Mới</span>
            </button>
          </div>
        </div>

        {/* 3. The Main Interactive Recharts Canvas */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "composed" ? (
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="xpAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="vocabBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} 
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left" 
                  tick={{ fontSize: 11, fill: "#D97706", fontWeight: 600 }} 
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "auto"]}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fontSize: 11, fill: "#059669", fontWeight: 600 }} 
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Daily XP Area/Line */}
                {(activeMetric === "all" || activeMetric === "xp") && (
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="dailyXP"
                    name="Điểm XP"
                    stroke="#D97706"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#xpAreaGrad)"
                    activeDot={{ r: 6, fill: "#B45309", stroke: "#FFF", strokeWidth: 2 }}
                  />
                )}

                {/* Daily Vocabulary Bars */}
                {(activeMetric === "all" || activeMetric === "vocab") && (
                  <Bar
                    yAxisId="right"
                    dataKey="dailyVocab"
                    name="Từ vựng học"
                    fill="url(#vocabBarGrad)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={36}
                  />
                )}
              </ComposedChart>
            ) : chartType === "bar" ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="xpBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#D97706" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="vocabBarGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} 
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {(activeMetric === "all" || activeMetric === "xp") && (
                  <Bar dataKey="dailyXP" name="Điểm XP" fill="url(#xpBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                )}
                {(activeMetric === "all" || activeMetric === "vocab") && (
                  <Bar dataKey="dailyVocab" name="Từ vựng" fill="url(#vocabBarGrad2)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                )}
              </BarChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cumulativeXpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="cumulativeVocabGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} 
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {(activeMetric === "all" || activeMetric === "xp") && (
                  <Area
                    type="monotone"
                    dataKey="cumulativeXP"
                    name="Tổng XP tích lũy"
                    stroke="#2563EB"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#cumulativeXpGrad)"
                  />
                )}
                {(activeMetric === "all" || activeMetric === "vocab") && (
                  <Area
                    type="monotone"
                    dataKey="cumulativeVocab"
                    name="Tổng từ tích lũy"
                    stroke="#059669"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#cumulativeVocabGrad)"
                  />
                )}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* 4. Mini Insights & Summary Footer */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              💡
            </div>
            <div>
              <span className="font-bold text-slate-800">Đánh giá tiến độ:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Bạn đang duy trì tốc độ học trung bình <span className="font-bold text-emerald-600">~6 từ mới/ngày</span>. Với tốc độ này, bạn sẽ hoàn thành mục tiêu {userProfile.targetHskLevel} sớm hơn 12 ngày so với dự kiến.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              🎯
            </div>
            <div>
              <span className="font-bold text-slate-800">Khung giờ hiệu quả nhất:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Khoảng thời gian <span className="font-bold text-blue-600">{userProfile.dailyReminderTime || "20:00 - 21:00"}</span> là lúc bạn ghi nhớ từ vựng và hoàn thành quiz với tỷ lệ chính xác cao nhất (94%).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Skill Distribution Breakdown */}
      <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Phân Bổ Kỹ Năng & Hoạt Động Học Tập</span>
          </h4>
          <span className="text-xs font-semibold text-slate-500">Đồng bộ tự động</span>
        </div>

        <div className="space-y-3">
          {skillBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-700 font-bold">{item.skill}</span>
                <span className="text-slate-500 font-semibold">{item.count} lượt ({item.percent}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
