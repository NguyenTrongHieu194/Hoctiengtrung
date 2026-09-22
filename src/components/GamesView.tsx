import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCcw,
  Volume2,
  Timer,
  Heart,
  Zap,
  Flame,
  Award,
  ArrowRight,
  HelpCircle,
  Puzzle,
  ChevronRight,
  Music,
  CheckCircle2,
  XCircle,
  Layers,
  ChevronLeft,
  Gem,
  Eye,
  EyeOff,
  Clock,
  AlertTriangle,
  VolumeX,
  ShieldAlert,
  Settings2,
  Plus,
  BookmarkCheck
} from "lucide-react";
import {
  MEMORY_THEMES,
  SPEED_QUIZ_DATA,
  SPEED_STAGES,
  TONE_CHALLENGE_DATA,
  TONE_STAGES,
  SENTENCE_SCRAMBLE_DATA,
  SENTENCE_STAGES,
  HANZI_PUZZLE_DATA,
  PUZZLE_STAGES,
  GAME_ACHIEVEMENTS,
  MemoryCard,
  GameAchievement,
  GameStage
} from "../data/gameData";
import { UserProgressData } from "../types";
import { getAllDictionaryWords, normalizePinyin } from "../data/dictionaryService";
import {
  getCustomGameWordIds,
  getCustomGameWordItems,
  subscribeCustomGameVocab,
  formatShortGameMeaning
} from "../services/customGameVocabService";
import { CustomGameVocabModal } from "./CustomGameVocabModal";
import {
  playChineseAudio,
  playCardFlipSound,
  playMatchSuccessSound,
  playWrongSound,
  playCorrectSound,
  playComboSound,
  playWinFanfareSound
} from "../services/speechService";
import { pinyin as getPinyinPro } from "pinyin-pro";

export interface ToneSyllableItem {
  char: string;
  pinyin: string;
  base: string;
  toneNumber: 1 | 2 | 3 | 4 | 5;
}

export interface ToneQuestionItem {
  id: string;
  stageId?: string;
  hanzi: string;
  fullPinyin: string;
  syllableBase: string;
  toneNumber: 1 | 2 | 3 | 4 | 5;
  vietnamese: string;
  exampleWord?: string;
  syllables: ToneSyllableItem[];
}

const getToneNumberFromPinyin = (pinyin: string): 1 | 2 | 3 | 4 => {
  if (/[āēīōūǖ]/i.test(pinyin)) return 1;
  if (/[áéíóúǘ]/i.test(pinyin)) return 2;
  if (/[ǎěǐǒǔǚ]/i.test(pinyin)) return 3;
  if (/[àèìòùǜ]/i.test(pinyin)) return 4;
  return 1;
};

const parseToneSyllables = (hanzi: string, fallbackPinyin?: string): ToneSyllableItem[] => {
  const cleanChars = Array.from(hanzi.replace(/[^\u4e00-\u9fa5]/g, ""));
  if (cleanChars.length === 0) {
    const p = fallbackPinyin || hanzi;
    return [{
      char: hanzi,
      pinyin: p,
      base: normalizePinyin(p),
      toneNumber: (getToneNumberFromPinyin(p) as 1 | 2 | 3 | 4 | 5) || 1
    }];
  }

  try {
    const pinyins = getPinyinPro(hanzi, { type: "array" });
    const tones = getPinyinPro(hanzi, { pattern: "num", type: "array" });
    const bases = getPinyinPro(hanzi, { toneType: "none", type: "array" });

    return cleanChars.map((char, i) => {
      const rawNum = parseInt(tones[i] || "1", 10);
      const toneNumber: 1 | 2 | 3 | 4 | 5 = rawNum >= 1 && rawNum <= 4 ? (rawNum as 1 | 2 | 3 | 4) : 5;
      const sylPinyin = pinyins[i] || char;
      const sylBase = bases[i] || normalizePinyin(sylPinyin);
      return {
        char,
        pinyin: sylPinyin,
        base: sylBase,
        toneNumber
      };
    });
  } catch {
    return cleanChars.map((char) => ({
      char,
      pinyin: fallbackPinyin || "",
      base: normalizePinyin(fallbackPinyin || ""),
      toneNumber: 1
    }));
  }
};

interface GamesViewProps {
  userProgress: UserProgressData;
  onRecordXP?: (xp: number) => void;
  onOpenAITutorWithPrompt?: (prompt: string) => void;
}

type GameMode = "lobby" | "memory" | "speed" | "tones" | "sentence" | "puzzle" | "achievements";

export const GamesView: React.FC<GamesViewProps> = ({
  userProgress,
  onRecordXP,
  onOpenAITutorWithPrompt
}) => {
  const [activeMode, setActiveMode] = useState<GameMode>("lobby");

  // Custom game vocab state & subscription
  const [customWordIds, setCustomWordIds] = useState<string[]>(() => getCustomGameWordIds());
  const [isCustomVocabModalOpen, setIsCustomVocabModalOpen] = useState(false);
  const [customVocabModalInitialTab, setCustomVocabModalInitialTab] = useState<"browse" | "selected">("selected");

  useEffect(() => {
    setCustomWordIds(getCustomGameWordIds());
    const unsub = subscribeCustomGameVocab((ids) => {
      setCustomWordIds(ids);
    });
    return unsub;
  }, []);

  const customWordItems = useMemo(() => {
    return getCustomGameWordItems();
  }, [customWordIds]);

  // Local storage for game stats
  const [highScores, setHighScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("chinese_game_high_scores");
      return saved ? JSON.parse(saved) : { memory: 0, speed: 0, tones: 0, sentence: 0, puzzle: 0 };
    } catch {
      return { memory: 0, speed: 0, tones: 0, sentence: 0, puzzle: 0 };
    }
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("chinese_game_achievements");
      return saved ? JSON.parse(saved) : ["ach_memory"];
    } catch {
      return ["ach_memory"];
    }
  });

  const saveScore = (gameKey: string, score: number) => {
    setHighScores((prev) => {
      const current = prev[gameKey] || 0;
      if (score > current) {
        const next = { ...prev, [gameKey]: score };
        localStorage.setItem("chinese_game_high_scores", JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  const unlockAchievement = (achId: string) => {
    if (!unlockedAchievements.includes(achId)) {
      const next = [...unlockedAchievements, achId];
      setUnlockedAchievements(next);
      localStorage.setItem("chinese_game_achievements", JSON.stringify(next));
      const ach = GAME_ACHIEVEMENTS.find((a) => a.id === achId);
      if (ach && onRecordXP) {
        onRecordXP(ach.xpReward);
      }
    }
  };

  const [completedStages, setCompletedStages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("chinese_game_completed_stages");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const markStageCompleted = (stageKey: string) => {
    setCompletedStages((prev) => {
      if (!prev.includes(stageKey)) {
        const next = [...prev, stageKey];
        localStorage.setItem("chinese_game_completed_stages", JSON.stringify(next));
        if (next.length >= 3) {
          unlockAchievement("ach_stage_conqueror");
        }
        if (stageKey.includes("garment") || stageKey === "speed_s2" || stageKey === "mem_garment_qc") {
          unlockAchievement("ach_garment_master");
        }
        return next;
      }
      return prev;
    });
  };

  // =========================================================================
  // 1. GAME: LẬT THẺ TRÍ NHỚ (MEMORY MATCH)
  // =========================================================================
  const [memThemeId, setMemThemeId] = useState<string>("basic");
  const [memPairCount, setMemPairCount] = useState<number>(6); // 6, 8, 10, 12, 16
  const [memCards, setMemCards] = useState<MemoryCard[]>([]);
  const [memFlippedIndices, setMemFlippedIndices] = useState<number[]>([]);
  const [memMoves, setMemMoves] = useState<number>(0);
  const [memMatchedCount, setMemMatchedCount] = useState<number>(0);
  const [memTimer, setMemTimer] = useState<number>(0);
  const [memTimeAttack, setMemTimeAttack] = useState<boolean>(false);
  const [memTimeLimit, setMemTimeLimit] = useState<number>(60);
  const [memIsPlaying, setMemIsPlaying] = useState<boolean>(false);
  const [memIsWon, setMemIsWon] = useState<boolean>(false);
  const [memGameOver, setMemGameOver] = useState<boolean>(false);

  const getMemTimeLimit = (count: number) => {
    if (count <= 6) return 45;
    if (count === 8) return 60;
    if (count === 10) return 75;
    if (count === 12) return 90;
    return 120;
  };

  const startMemoryGame = useCallback((themeId = memThemeId, pairsCount = memPairCount, isTimeAttack = memTimeAttack) => {
    let pool: { hanzi: string; pinyin: string; vietnamese: string; audio: string }[] = [];
    if (themeId === "custom" && customWordItems.length > 0) {
      pool = customWordItems.map((w) => ({
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        vietnamese: formatShortGameMeaning(w.vietnamese),
        audio: w.hanzi
      }));
      // Nếu số từ tự chọn ít hơn pairsCount, tự động lấy thêm từ các chủ đề mặc định để bàn cờ luôn đủ số cặp
      if (pairsCount > pool.length) {
        const defaultPairs = MEMORY_THEMES.flatMap((t) => t.pairs).map((p) => ({
          ...p,
          vietnamese: formatShortGameMeaning(p.vietnamese)
        }));
        const missingCount = pairsCount - pool.length;
        const additional = defaultPairs.filter((dp) => !pool.some((p) => p.hanzi === dp.hanzi)).slice(0, missingCount);
        pool = [...pool, ...additional];
      }
    } else {
      const theme = MEMORY_THEMES.find((t) => t.id === themeId) || MEMORY_THEMES[0];
      pool = theme.pairs.map((p) => ({
        ...p,
        vietnamese: formatShortGameMeaning(p.vietnamese)
      }));
      if (pairsCount > pool.length) {
        const otherPairs = MEMORY_THEMES.filter((t) => t.id !== themeId).flatMap((t) => t.pairs);
        pool = [...pool, ...otherPairs.map((p) => ({
          ...p,
          vietnamese: formatShortGameMeaning(p.vietnamese)
        }))];
      }
    }
    const actualPairCount = Math.min(pairsCount, pool.length);
    const selectedPairs = pool.sort(() => 0.5 - Math.random()).slice(0, actualPairCount);

    const generatedCards: MemoryCard[] = [];
    selectedPairs.forEach((pair, idx) => {
      const pairId = `pair_${idx}`;
      // Card 1: Hanzi
      generatedCards.push({
        id: `h_${idx}`,
        pairId,
        type: "hanzi",
        content: pair.hanzi,
        pinyin: pair.pinyin,
        audioText: pair.audio,
        isFlipped: false,
        isMatched: false
      });
      // Card 2: Meaning
      generatedCards.push({
        id: `m_${idx}`,
        pairId,
        type: "meaning",
        content: formatShortGameMeaning(pair.vietnamese),
        subContent: pair.pinyin,
        audioText: pair.audio,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffled = generatedCards.sort(() => 0.5 - Math.random());
    setMemCards(shuffled);
    setMemFlippedIndices([]);
    setMemMoves(0);
    setMemMatchedCount(0);
    setMemTimer(0);
    setMemTimeLimit(getMemTimeLimit(actualPairCount));
    setMemIsWon(false);
    setMemGameOver(false);
    setMemIsPlaying(true);
  }, [memThemeId, memPairCount, memTimeAttack, customWordItems]);

  // Memory Timer (Normal & Time Attack)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (memIsPlaying && !memIsWon && !memGameOver) {
      interval = setInterval(() => {
        setMemTimer((t) => {
          const next = t + 1;
          if (memTimeAttack && next >= memTimeLimit) {
            setMemGameOver(true);
            playWrongSound();
            return memTimeLimit;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [memIsPlaying, memIsWon, memGameOver, memTimeAttack, memTimeLimit]);

  const handleCardClick = (index: number) => {
    if (!memIsPlaying || memGameOver || memCards[index].isFlipped || memCards[index].isMatched || memFlippedIndices.length >= 2) {
      return;
    }

    playCardFlipSound();
    const card = memCards[index];
    if (card.audioText) {
      playChineseAudio(card.audioText, 1.0);
    }

    const newFlipped = [...memFlippedIndices, index];
    const newCards = [...memCards];
    newCards[index].isFlipped = true;
    setMemCards(newCards);
    setMemFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          playMatchSuccessSound();
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setMemCards([...newCards]);
          setMemFlippedIndices([]);
          const nextMatched = memMatchedCount + 1;
          setMemMatchedCount(nextMatched);

          // Check Win (so sánh với tổng số cặp thực tế trên bàn)
          const totalPairsOnBoard = Math.floor(newCards.length / 2);
          if (nextMatched >= totalPairsOnBoard) {
            setMemIsWon(true);
            playWinFanfareSound();
            saveScore("memory", Math.max(100, 500 - memTimer * 5 - memMoves * 10));
            unlockAchievement("ach_memory");
            markStageCompleted("mem_" + memThemeId);
            if (onRecordXP) onRecordXP(30);
          }
        }, 450);
      } else {
        // NO MATCH -> Snappy flip back
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setMemCards([...newCards]);
          setMemFlippedIndices([]);
        }, 750);
      }
    }
  };

  // =========================================================================
  // 2. GAME: CƠN LỐC BẮT TỪ (SPEED WORD RUSH)
  // =========================================================================
  type SpeedDifficulty = "normal" | "hard" | "extreme";
  const [speedStageId, setSpeedStageId] = useState<string>("speed_s1");
  const [speedDifficulty, setSpeedDifficulty] = useState<SpeedDifficulty>("normal");
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedCombo, setSpeedCombo] = useState(0);
  const [speedMaxCombo, setSpeedMaxCombo] = useState(0);
  const [speedLives, setSpeedLives] = useState(3);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(10);
  const [speedIsActive, setSpeedIsActive] = useState(false);
  const [speedGameOver, setSpeedGameOver] = useState(false);
  const [speedSelectedOption, setSpeedSelectedOption] = useState<string | null>(null);
  const [speedAnswerFeedback, setSpeedAnswerFeedback] = useState<"correct" | "wrong" | null>(null);

  const getSpeedMaxTime = useCallback((diff = speedDifficulty) => {
    if (diff === "extreme") return 4;
    if (diff === "hard") return 6;
    return 10;
  }, [speedDifficulty]);

  const getSpeedInitialLives = useCallback((diff = speedDifficulty) => {
    if (diff === "extreme") return 1;
    if (diff === "hard") return 2;
    return 3;
  }, [speedDifficulty]);

  const activeSpeedQuestions = useMemo(() => {
    if (speedStageId === "custom") {
      if (customWordItems.length === 0) return SPEED_QUIZ_DATA;
      const allDict = getAllDictionaryWords();
      return customWordItems.map((item, idx) => {
        const itemMeaning = formatShortGameMeaning(item.vietnamese);
        const otherWords = allDict
          .filter((w) => w.id !== item.id && w.vietnamese !== item.vietnamese)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((w) => formatShortGameMeaning(w.vietnamese));
        const options = [itemMeaning, ...otherWords].sort(() => 0.5 - Math.random());
        return {
          id: `custom_speed_${idx}_${item.id}`,
          stageId: "custom",
          hanzi: item.hanzi,
          pinyin: item.pinyin,
          correctMeaning: itemMeaning,
          options,
          category: item.hskLevel ? `Từ ${item.hskLevel}` : "Kho tự chọn"
        };
      });
    }
    if (speedStageId === "all") return SPEED_QUIZ_DATA;
    const filtered = SPEED_QUIZ_DATA.filter((q) => q.stageId === speedStageId);
    return filtered.length > 0 ? filtered : SPEED_QUIZ_DATA;
  }, [speedStageId, customWordItems]);

  const currentSpeedQuiz = useMemo(() => {
    return activeSpeedQuestions[speedIndex % activeSpeedQuestions.length];
  }, [speedIndex, activeSpeedQuestions]);

  // SHUFFLED OPTIONS - Guarantees the correct answer is NEVER stuck at position 0!
  const speedShuffledOptions = useMemo(() => {
    if (!currentSpeedQuiz?.options) return [];
    const arr = [...currentSpeedQuiz.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentSpeedQuiz?.id]);

  const startSpeedGame = (stageId = speedStageId, diff = speedDifficulty) => {
    setSpeedStageId(stageId);
    setSpeedDifficulty(diff);
    setSpeedIndex(0);
    setSpeedScore(0);
    setSpeedCombo(0);
    setSpeedMaxCombo(0);
    setSpeedLives(getSpeedInitialLives(diff));
    setSpeedTimeLeft(getSpeedMaxTime(diff));
    setSpeedGameOver(false);
    setSpeedSelectedOption(null);
    setSpeedAnswerFeedback(null);
    setSpeedIsActive(true);
  };

  // Speed timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (speedIsActive && !speedGameOver && speedTimeLeft > 0) {
      timer = setInterval(() => {
        setSpeedTimeLeft((prev) => {
          if (prev <= 1) {
            handleSpeedAnswerTimeout();
            return getSpeedMaxTime(speedDifficulty);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [speedIsActive, speedGameOver, speedTimeLeft, speedDifficulty, getSpeedMaxTime]);

  const handleSpeedAnswerTimeout = () => {
    playWrongSound();
    setSpeedCombo(0);
    setSpeedLives((l) => {
      const nextLives = l - 1;
      if (nextLives <= 0) {
        setSpeedGameOver(true);
        setSpeedIsActive(false);
        saveScore("speed", speedScore);
      }
      return nextLives;
    });
    setSpeedIndex((i) => (i + 1) % activeSpeedQuestions.length);
    setSpeedTimeLeft(getSpeedMaxTime(speedDifficulty));
  };

  const handleSpeedOptionSelect = (option: string) => {
    if (!speedIsActive || speedAnswerFeedback !== null) return;

    setSpeedSelectedOption(option);
    const isCorrect = option === currentSpeedQuiz.correctMeaning;

    if (isCorrect) {
      const newCombo = speedCombo + 1;
      setSpeedCombo(newCombo);
      if (newCombo > speedMaxCombo) setSpeedMaxCombo(newCombo);
      if (newCombo >= 5) unlockAchievement("ach_speed");

      const basePoints = speedDifficulty === "extreme" ? 220 : speedDifficulty === "hard" ? 150 : 100;
      const pointEarned = basePoints + newCombo * (speedDifficulty === "extreme" ? 40 : 20);
      setSpeedScore((s) => s + pointEarned);
      setSpeedAnswerFeedback("correct");
      playComboSound(newCombo);

      setTimeout(() => {
        setSpeedAnswerFeedback(null);
        setSpeedSelectedOption(null);
        setSpeedTimeLeft(getSpeedMaxTime(speedDifficulty));
        if (speedIndex + 1 >= activeSpeedQuestions.length) {
          // Completed all words in batch
          setSpeedGameOver(true);
          setSpeedIsActive(false);
          playWinFanfareSound();
          saveScore("speed", speedScore + pointEarned);
          markStageCompleted(speedStageId);
          if (onRecordXP) onRecordXP(45);
        } else {
          setSpeedIndex((i) => i + 1);
        }
      }, 600);
    } else {
      setSpeedAnswerFeedback("wrong");
      setSpeedCombo(0);
      playWrongSound();
      const nextLives = speedLives - 1;
      setSpeedLives(nextLives);

      if (speedDifficulty === "hard") {
        setSpeedScore((s) => Math.max(0, s - 30));
      } else if (speedDifficulty === "extreme") {
        setSpeedScore((s) => Math.max(0, s - 60));
      }

      setTimeout(() => {
        setSpeedAnswerFeedback(null);
        setSpeedSelectedOption(null);
        setSpeedTimeLeft(getSpeedMaxTime(speedDifficulty));
        if (nextLives <= 0) {
          setSpeedGameOver(true);
          setSpeedIsActive(false);
          saveScore("speed", speedScore);
        } else {
          setSpeedIndex((i) => i + 1);
        }
      }, 800);
    }
  };

  // =========================================================================
  // 3. GAME: BẬC THẦY THANH ĐIỆU (TONE MASTER QUEST)
  // =========================================================================
  const [toneStageId, setToneStageId] = useState<string>("tone_s1");
  const [toneIndex, setToneIndex] = useState(0);
  const [toneSyllableIndex, setToneSyllableIndex] = useState<number>(0);
  const [toneSyllableAnswers, setToneSyllableAnswers] = useState<Record<number, { selectedTone: number; isCorrect: boolean }>>({});
  const [toneScore, setToneScore] = useState(0);
  const [toneStreak, setToneStreak] = useState(0);
  const [toneSelected, setToneSelected] = useState<number | null>(null);
  const [toneFeedback, setToneFeedback] = useState<"correct" | "wrong" | null>(null);
  const [toneCompleted, setToneCompleted] = useState(false);
  const [toneBlindMode, setToneBlindMode] = useState<boolean>(false);
  const [toneTimeLeft, setToneTimeLeft] = useState<number>(8);
  const [toneTimerActive, setToneTimerActive] = useState<boolean>(true);

  const activeToneQuestions: ToneQuestionItem[] = useMemo(() => {
    if (toneStageId === "custom") {
      if (customWordItems.length === 0) {
        return TONE_CHALLENGE_DATA.map((t) => ({
          ...t,
          syllables: parseToneSyllables(t.hanzi, t.fullPinyin)
        }));
      }
      return customWordItems.map((item, idx) => {
        const syllables = parseToneSyllables(item.hanzi, item.pinyin);
        return {
          id: `custom_tone_${idx}_${item.id}`,
          stageId: "custom",
          hanzi: item.hanzi,
          fullPinyin: item.pinyin,
          syllableBase: syllables.map((s) => s.base).join(" "),
          toneNumber: syllables[0]?.toneNumber || 1,
          vietnamese: item.vietnamese,
          syllables
        };
      });
    }
    const filtered = (toneStageId === "all" ? TONE_CHALLENGE_DATA : TONE_CHALLENGE_DATA.filter((t) => t.stageId === toneStageId));
    const pool = filtered.length > 0 ? filtered : TONE_CHALLENGE_DATA;
    return pool.map((t) => ({
      ...t,
      syllables: parseToneSyllables(t.hanzi, t.fullPinyin)
    }));
  }, [toneStageId, customWordItems]);

  const currentToneItem: ToneQuestionItem | undefined = useMemo(() => {
    return activeToneQuestions[toneIndex % activeToneQuestions.length];
  }, [toneIndex, activeToneQuestions]);

  const startToneGame = (stageId = toneStageId) => {
    setToneStageId(stageId);
    setToneIndex(0);
    setToneSyllableIndex(0);
    setToneSyllableAnswers({});
    setToneScore(0);
    setToneStreak(0);
    setToneSelected(null);
    setToneFeedback(null);
    setToneCompleted(false);
    setToneTimeLeft(8);
    const pool = stageId === "custom"
      ? (customWordItems.length > 0
          ? customWordItems.map((item, idx) => {
              const syllables = parseToneSyllables(item.hanzi, item.pinyin);
              return {
                id: `custom_tone_${idx}_${item.id}`,
                stageId: "custom",
                hanzi: item.hanzi,
                fullPinyin: item.pinyin,
                syllableBase: syllables.map((s) => s.base).join(" "),
                toneNumber: syllables[0]?.toneNumber || 1,
                vietnamese: item.vietnamese,
                syllables
              };
            })
          : TONE_CHALLENGE_DATA.map((t) => ({ ...t, syllables: parseToneSyllables(t.hanzi, t.fullPinyin) })))
      : (stageId === "all" ? TONE_CHALLENGE_DATA : TONE_CHALLENGE_DATA.filter((t) => t.stageId === stageId)).map((t) => ({
          ...t,
          syllables: parseToneSyllables(t.hanzi, t.fullPinyin)
        }));
    const firstItem = pool[0];
    if (firstItem) {
      setTimeout(() => {
        playChineseAudio(firstItem.hanzi, 0.9);
      }, 400);
    }
  };

  // Tone countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeMode === "tones" && !toneCompleted && toneFeedback === null && toneTimerActive && toneTimeLeft > 0) {
      timer = setInterval(() => {
        setToneTimeLeft((prev) => {
          if (prev <= 1) {
            handleToneTimeout();
            return 8;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeMode, toneCompleted, toneFeedback, toneTimerActive, toneTimeLeft]);

  const handleToneTimeout = () => {
    playWrongSound();
    setToneFeedback("wrong");
    setToneStreak(0);

    setTimeout(() => {
      if (toneIndex + 1 >= activeToneQuestions.length) {
        setToneCompleted(true);
        saveScore("tones", toneScore);
      } else {
        const nextIdx = toneIndex + 1;
        setToneIndex(nextIdx);
        setToneSyllableIndex(0);
        setToneSyllableAnswers({});
        setToneSelected(null);
        setToneFeedback(null);
        const nextQuestion = activeToneQuestions[nextIdx];
        setToneTimeLeft(nextQuestion?.syllables?.length > 1 ? 12 : 8);
        if (nextQuestion) {
          playChineseAudio(nextQuestion.hanzi, 0.9);
        }
      }
    }, 1200);
  };

  const handleSelectTone = (toneNum: 1 | 2 | 3 | 4 | 5) => {
    if (toneFeedback !== null || !currentToneItem) return;

    const syllables = currentToneItem.syllables || [];
    const currentSyl = syllables[toneSyllableIndex] || syllables[0];
    if (!currentSyl) return;

    setToneSelected(toneNum);
    const isCorrect = toneNum === currentSyl.toneNumber;

    if (isCorrect) {
      playCorrectSound();
      const updatedAnswers = {
        ...toneSyllableAnswers,
        [toneSyllableIndex]: { selectedTone: toneNum, isCorrect: true }
      };
      setToneSyllableAnswers(updatedAnswers);

      const isWordCompleted = toneSyllableIndex + 1 >= syllables.length;

      if (!isWordCompleted) {
        // Chưa hoàn thành hết các âm tiết -> chuyển sang âm tiết tiếp theo trong từ
        setTimeout(() => {
          setToneSelected(null);
          const nextSylIdx = toneSyllableIndex + 1;
          setToneSyllableIndex(nextSylIdx);
          setToneTimeLeft((prev) => Math.max(prev, 8));
          if (syllables[nextSylIdx]) {
            playChineseAudio(syllables[nextSylIdx].char, 0.95);
          }
        }, 350);
      } else {
        // Đã hoàn thành đúng toàn bộ các chữ trong từ!
        setToneFeedback("correct");
        const bonusBlind = toneBlindMode ? 15 : 0;
        const multiBonus = syllables.length > 1 ? (syllables.length - 1) * 10 : 0;
        setToneScore((s) => s + 25 + multiBonus + bonusBlind);
        const nextStreak = toneStreak + 1;
        setToneStreak(nextStreak);
        if (nextStreak >= 4) unlockAchievement("ach_tone");

        setTimeout(() => {
          if (toneIndex + 1 >= activeToneQuestions.length) {
            setToneCompleted(true);
            playWinFanfareSound();
            saveScore("tones", toneScore + 25 + multiBonus + bonusBlind);
            markStageCompleted(toneStageId);
            if (onRecordXP) onRecordXP(35);
          } else {
            const nextIdx = toneIndex + 1;
            setToneIndex(nextIdx);
            setToneSyllableIndex(0);
            setToneSyllableAnswers({});
            setToneSelected(null);
            setToneFeedback(null);
            const nextQuestion = activeToneQuestions[nextIdx];
            setToneTimeLeft(nextQuestion?.syllables?.length > 1 ? 12 : 8);
            if (nextQuestion) {
              playChineseAudio(nextQuestion.hanzi, 0.9);
            }
          }
        }, 950);
      }
    } else {
      // Trả lời sai
      playWrongSound();
      setToneFeedback("wrong");
      setToneSyllableAnswers((prev) => ({
        ...prev,
        [toneSyllableIndex]: { selectedTone: toneNum, isCorrect: false }
      }));
      setToneStreak(0);

      setTimeout(() => {
        if (toneIndex + 1 >= activeToneQuestions.length) {
          setToneCompleted(true);
          saveScore("tones", toneScore);
        } else {
          const nextIdx = toneIndex + 1;
          setToneIndex(nextIdx);
          setToneSyllableIndex(0);
          setToneSyllableAnswers({});
          setToneSelected(null);
          setToneFeedback(null);
          const nextQuestion = activeToneQuestions[nextIdx];
          setToneTimeLeft(nextQuestion?.syllables?.length > 1 ? 12 : 8);
          if (nextQuestion) {
            playChineseAudio(nextQuestion.hanzi, 0.9);
          }
        }
      }, 1400);
    }
  };

  // =========================================================================
  // 4. GAME: XẾP CÂU THẦN TỐC (SENTENCE SCRAMBLE RACER)
  // =========================================================================
  const [scrambleStageId, setScrambleStageId] = useState<string>("ss_s1");
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [scrambleScore, setScrambleScore] = useState(0);
  const [scrambleBuiltWords, setScrambleBuiltWords] = useState<string[]>([]);
  const [scrambleAvailableWords, setScrambleAvailableWords] = useState<string[]>([]);
  const [scrambleResult, setScrambleResult] = useState<"correct" | "wrong" | null>(null);
  const [scrambleCompleted, setScrambleCompleted] = useState(false);
  const [scrambleHardMode, setScrambleHardMode] = useState<boolean>(true);
  const [scrambleTimeLeft, setScrambleTimeLeft] = useState<number>(30);
  const [scrambleIsActive, setScrambleIsActive] = useState<boolean>(true);

  const activeScrambleList = useMemo(() => {
    if (scrambleStageId === "all") return SENTENCE_SCRAMBLE_DATA;
    const filtered = SENTENCE_SCRAMBLE_DATA.filter((s) => s.stageId === scrambleStageId);
    return filtered.length > 0 ? filtered : SENTENCE_SCRAMBLE_DATA;
  }, [scrambleStageId]);

  const currentScramble = useMemo(() => {
    return activeScrambleList[scrambleIndex % activeScrambleList.length];
  }, [scrambleIndex, activeScrambleList]);

  const initScrambleRound = useCallback((index: number, stageId = scrambleStageId, isHard = scrambleHardMode) => {
    const pool = stageId === "all" ? SENTENCE_SCRAMBLE_DATA : SENTENCE_SCRAMBLE_DATA.filter((s) => s.stageId === stageId);
    const list = pool.length > 0 ? pool : SENTENCE_SCRAMBLE_DATA;
    const item = list[index % list.length];

    let words = [...item.words];
    if (isHard) {
      // Inject 1-2 grammatical distractor traps
      const trapBank = ["的", "得", "地", "在", "再", "了", "过", "把", "被", "很", "太", "和", "跟", "会", "能", "去", "来"];
      const availableTraps = trapBank.filter((w) => !item.words.includes(w));
      if (availableTraps.length > 0) {
        const trap1 = availableTraps[Math.floor(Math.random() * availableTraps.length)];
        words.push(trap1);
      }
    }

    const shuffled = words.sort(() => 0.5 - Math.random());
    setScrambleAvailableWords(shuffled);
    setScrambleBuiltWords([]);
    setScrambleResult(null);
    setScrambleTimeLeft(isHard ? 25 : 35);
    setScrambleIsActive(true);
  }, [scrambleStageId, scrambleHardMode]);

  // Scramble timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeMode === "sentence" && !scrambleCompleted && scrambleResult === null && scrambleIsActive && scrambleTimeLeft > 0) {
      timer = setInterval(() => {
        setScrambleTimeLeft((prev) => {
          if (prev <= 1) {
            playWrongSound();
            setScrambleResult("wrong");
            setScrambleIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeMode, scrambleCompleted, scrambleResult, scrambleIsActive, scrambleTimeLeft]);

  const startSentenceGame = (stageId = scrambleStageId) => {
    setScrambleStageId(stageId);
    setScrambleIndex(0);
    setScrambleScore(0);
    setScrambleCompleted(false);
    initScrambleRound(0, stageId, scrambleHardMode);
  };

  const handlePickScrambleWord = (word: string, index: number) => {
    if (scrambleResult !== null) return;
    playCardFlipSound();
    const newAvail = [...scrambleAvailableWords];
    newAvail.splice(index, 1);
    setScrambleAvailableWords(newAvail);
    setScrambleBuiltWords([...scrambleBuiltWords, word]);
  };

  const handleRemoveBuiltWord = (word: string, index: number) => {
    if (scrambleResult !== null) return;
    playCardFlipSound();
    const newBuilt = [...scrambleBuiltWords];
    newBuilt.splice(index, 1);
    setScrambleBuiltWords(newBuilt);
    setScrambleAvailableWords([...scrambleAvailableWords, word]);
  };

  const handleCheckSentence = () => {
    const userSentence = scrambleBuiltWords.join("");
    const targetSentence = currentScramble.correctHanzi.replace(/[。！？,.!?]/g, "");
    const cleanUser = userSentence.replace(/[。！？,.!?]/g, "");

    const isMatch = cleanUser === targetSentence;
    if (isMatch) {
      playCorrectSound();
      setScrambleResult("correct");
      setScrambleIsActive(false);
      const bonusSpeed = scrambleTimeLeft > 15 ? 10 : 0;
      setScrambleScore((s) => s + 25 + bonusSpeed);
      playChineseAudio(currentScramble.correctHanzi, 0.9);
      if (scrambleIndex + 1 >= activeScrambleList.length) {
        unlockAchievement("ach_sentence");
      }
    } else {
      playWrongSound();
      setScrambleResult("wrong");
    }
  };

  const handleNextSentence = () => {
    if (scrambleIndex + 1 >= activeScrambleList.length) {
      setScrambleCompleted(true);
      playWinFanfareSound();
      saveScore("sentence", scrambleScore);
      markStageCompleted(scrambleStageId);
      if (onRecordXP) onRecordXP(50);
    } else {
      const nextIdx = scrambleIndex + 1;
      setScrambleIndex(nextIdx);
      initScrambleRound(nextIdx, scrambleStageId, scrambleHardMode);
    }
  };

  // =========================================================================
  // 5. GAME: ĐỐ VUI CẤU TẠO HÁN TỰ (HANZI PUZZLE)
  // =========================================================================
  const [puzzleStageId, setPuzzleStageId] = useState<string>("puzzle_s1");
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [puzzleSelectedOption, setPuzzleSelectedOption] = useState<string | null>(null);
  const [puzzleResult, setPuzzleResult] = useState<"correct" | "wrong" | null>(null);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [puzzleShowHint, setPuzzleShowHint] = useState<boolean>(false);
  const [puzzleDifficulty, setPuzzleDifficulty] = useState<"standard" | "expert">("expert");
  const [puzzleTimeLeft, setPuzzleTimeLeft] = useState<number>(10);

  const activePuzzleList = useMemo(() => {
    if (puzzleStageId === "all") return HANZI_PUZZLE_DATA;
    const filtered = HANZI_PUZZLE_DATA.filter((p) => p.stageId === puzzleStageId);
    return filtered.length > 0 ? filtered : HANZI_PUZZLE_DATA;
  }, [puzzleStageId]);

  const currentPuzzle = useMemo(() => {
    return activePuzzleList[puzzleIndex % activePuzzleList.length];
  }, [puzzleIndex, activePuzzleList]);

  // SHUFFLED OPTIONS - Guarantees target hanzi is NEVER in a fixed position!
  const puzzleShuffledOptions = useMemo(() => {
    if (!currentPuzzle?.options) return [];
    const arr = [...currentPuzzle.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentPuzzle?.id]);

  // Puzzle timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeMode === "puzzle" && !puzzleCompleted && puzzleResult === null && puzzleTimeLeft > 0) {
      timer = setInterval(() => {
        setPuzzleTimeLeft((prev) => {
          if (prev <= 1) {
            playWrongSound();
            setPuzzleResult("wrong");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeMode, puzzleCompleted, puzzleResult, puzzleTimeLeft]);

  const startPuzzleGame = (stageId = puzzleStageId, diff = puzzleDifficulty) => {
    setPuzzleStageId(stageId);
    setPuzzleDifficulty(diff);
    setPuzzleIndex(0);
    setPuzzleScore(0);
    setPuzzleSelectedOption(null);
    setPuzzleResult(null);
    setPuzzleCompleted(false);
    setPuzzleShowHint(false);
    setPuzzleTimeLeft(diff === "expert" ? 8 : 14);
  };

  const handleSelectPuzzleChoice = (choice: string) => {
    if (puzzleResult !== null) return;
    setPuzzleSelectedOption(choice);
    const isCorrect = choice === currentPuzzle.targetHanzi;

    if (isCorrect) {
      playCorrectSound();
      setPuzzleResult("correct");
      const bonusExpert = puzzleDifficulty === "expert" ? 15 : 0;
      setPuzzleScore((s) => s + 20 + bonusExpert);
      playChineseAudio(currentPuzzle.targetHanzi, 1.0);
    } else {
      playWrongSound();
      setPuzzleResult("wrong");
    }
  };

  const handleNextPuzzle = () => {
    if (puzzleIndex + 1 >= activePuzzleList.length) {
      setPuzzleCompleted(true);
      playWinFanfareSound();
      saveScore("puzzle", puzzleScore);
      unlockAchievement("ach_puzzle");
      markStageCompleted(puzzleStageId);
      if (onRecordXP) onRecordXP(45);
    } else {
      setPuzzleIndex((i) => i + 1);
      setPuzzleSelectedOption(null);
      setPuzzleResult(null);
      setPuzzleShowHint(false);
      setPuzzleTimeLeft(puzzleDifficulty === "expert" ? 8 : 14);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn bg-white text-slate-900 w-full max-w-full overflow-hidden">
      {/* =======================================================================
          TOP GAME HEADER & LIVE METRICS
          ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-orange-500/15">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner shrink-0">
            🎮
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                Vừa Chơi Vừa Học
              </span>
              <span className="text-xs animate-bounce">⭐</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
              <span>Đấu Trường Game Tiếng Trung</span>
            </h2>
          </div>
        </div>

        {/* Dynamic Nav back to lobby if inside a game */}
        {activeMode !== "lobby" ? (
          <button
            onClick={() => setActiveMode("lobby")}
            className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 hover:bg-amber-50 text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Về Sảnh Game</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black bg-black/20 text-white px-3 py-1.5 rounded-2xl border border-white/20 hidden sm:inline-flex items-center gap-1.5">
              <span>🚩 Đã vượt qua:</span>
              <span className="text-amber-200 font-extrabold">{completedStages.length} màn</span>
            </span>
            <button
              onClick={() => setActiveMode("achievements")}
              className="px-3.5 py-2 rounded-2xl bg-white/25 hover:bg-white/35 backdrop-blur-xs text-white text-xs font-black border border-white/30 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-200" />
              <span>Huy Hiệu & Đổi Quà</span>
            </button>
          </div>
        )}
      </div>

      {/* =======================================================================
          MODE 0: SẢNH CHỌN GAME (LOBBY)
          ======================================================================= */}
      {activeMode === "lobby" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Custom Vocab Game Repository Banner & Quick Management */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-xl border border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 text-white flex items-center justify-center text-2xl shadow-inner shrink-0">
                🎮
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500/40 text-indigo-200 px-2.5 py-0.5 rounded-md border border-indigo-400/30">
                    KHO TỪ VỰNG TỰ CHỌN CHO GAME
                  </span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs ${
                    customWordIds.length > 0 ? "bg-emerald-500 text-white" : "bg-amber-500 text-slate-950"
                  }`}>
                    {customWordIds.length > 0 ? `${customWordIds.length} từ đã nạp` : "Chưa nạp từ nào"}
                  </span>
                </div>
                <h3 className="text-base font-black text-white mt-1">
                  {customWordIds.length > 0
                    ? "Đã kích hoạt kho từ cá nhân trong các trò chơi!"
                    : "Tự chọn từ vựng bạn muốn ôn tập để đưa vào Game"}
                </h3>
                <p className="text-xs text-indigo-200/80 font-medium">
                  {customWordIds.length > 0
                    ? "Các trò chơi Lật Thẻ, Bắt Từ & Luyện Thanh Điệu đã sẵn sàng với bộ từ riêng của bạn."
                    : "Chọn từ trong kho 672 từ để cá nhân hóa toàn bộ câu hỏi và thử thách trong game."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  setCustomVocabModalInitialTab(customWordIds.length > 0 ? "selected" : "browse");
                  setIsCustomVocabModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white text-indigo-950 font-black text-xs hover:bg-indigo-50 transition shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Settings2 className="w-4 h-4 text-indigo-600" />
                <span>{customWordIds.length > 0 ? `Quản lý kho từ (${customWordIds.length})` : "Chọn từ vào Game"}</span>
              </button>
            </div>
          </div>

          {/* Daily Challenge Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shadow-indigo-300 shrink-0">
                ⚡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">
                  Nhiệm vụ hôm nay
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Thử thách lật thẻ & Đoán thanh điệu
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Chơi tối thiểu 2 ván game để nhận thêm <strong>+50 XP</strong> và <strong>10 Kim Cương 💎</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveMode("memory");
                startMemoryGame();
              }}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md shadow-indigo-500/25 flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0"
            >
              <span>Chơi Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Main Mini-Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Game 1: Lật Thẻ Trí Nhớ */}
            <div
              onClick={() => {
                setActiveMode("memory");
                startMemoryGame();
              }}
              className="group bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-8 -mt-8 -z-0 opacity-60 group-hover:scale-125 transition-transform" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🎴</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {customWordIds.length > 0 ? (
                      <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span>Kho tự chọn ({customWordIds.length})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Hỗ trợ kho tự chọn
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Kỷ lục: {highScores.memory || 0} đ
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    1. Lật Thẻ Trí Nhớ
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                    Khớp cặp chữ Hán với nghĩa tiếng Việt và Pinyin. Luyện phản xạ mặt chữ siêu nhanh!
                  </p>
                </div>
              </div>
              <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
                <span>Vào Chơi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Game 2: Cơn Lốc Bắt Từ */}
            <div
              onClick={() => {
                setActiveMode("speed");
                startSpeedGame();
              }}
              className="group bg-white rounded-3xl p-5 border-2 border-rose-200 hover:border-rose-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-full -mr-8 -mt-8 -z-0 opacity-60 group-hover:scale-125 transition-transform" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">⚡</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {customWordIds.length > 0 ? (
                      <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-rose-500" />
                        <span>Kho tự chọn ({customWordIds.length})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Hỗ trợ kho tự chọn
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      Kỷ lục: {highScores.speed || 0} đ
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                    2. Cơn Lốc Bắt Từ
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                    Đua thời gian 15s chọn đúng từ vựng. Đạt chuỗi Combo để nhân đôi điểm số!
                  </p>
                </div>
              </div>
              <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-600">
                <span>Vào Chơi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Game 3: Bậc Thầy Thanh Điệu */}
            <div
              onClick={() => {
                setActiveMode("tones");
                startToneGame();
              }}
              className="group bg-white rounded-3xl p-5 border-2 border-sky-200 hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100 rounded-full -mr-8 -mt-8 -z-0 opacity-60 group-hover:scale-125 transition-transform" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🎵</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {customWordIds.length > 0 ? (
                      <span className="text-[10px] font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-sky-500" />
                        <span>Kho tự chọn ({customWordIds.length})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Hỗ trợ kho tự chọn
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      Kỷ lục: {highScores.tones || 0} đ
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                    3. Bậc Thầy Thanh Điệu
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                    Lắng nghe âm thanh chuẩn Bắc Kinh và phân biệt chính xác 4 thanh điệu (1, 2, 3, 4).
                  </p>
                </div>
              </div>
              <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-600">
                <span>Vào Chơi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Game 4: Xếp Câu Thần Tốc */}
            <div
              onClick={() => {
                setActiveMode("sentence");
                startSentenceGame();
              }}
              className="group bg-white rounded-3xl p-5 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-8 -mt-8 -z-0 opacity-60 group-hover:scale-125 transition-transform" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🏎️</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Kỷ lục: {highScores.sentence || 0} đ
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    4. Xếp Câu Thần Tốc
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                    Chạm ghép các khối từ thành câu ngữ pháp chuẩn (câu chữ 把, câu so sánh, bổ ngữ).
                  </p>
                </div>
              </div>
              <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
                <span>Vào Chơi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Game 5: Đố Vui Ghép Hán Tự */}
            <div
              onClick={() => {
                setActiveMode("puzzle");
                startPuzzleGame();
              }}
              className="group bg-white rounded-3xl p-5 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-8 -mt-8 -z-0 opacity-60 group-hover:scale-125 transition-transform" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🧩</span>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    Kỷ lục: {highScores.puzzle || 0} đ
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                    5. Đố Vui Ghép Hán Tự
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                    Ghép các bộ thủ theo câu chuyện chiết tự để đoán ra chữ Hán hoàn chỉnh.
                  </p>
                </div>
              </div>
              <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-600">
                <span>Vào Chơi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Hub: Huy Hiệu & Thành Tựu */}
            <div
              onClick={() => setActiveMode("achievements")}
              className="group bg-gradient-to-tr from-amber-50 to-orange-50 rounded-3xl p-5 border-2 border-amber-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🏆</span>
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full">
                    {unlockedAchievements.length} / {GAME_ACHIEVEMENTS.length} Huy hiệu
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                    Bảng Vinh Danh & Đổi Thưởng
                  </h3>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1">
                    Nhận danh hiệu Thần Đồng Tiếng Trung và nhận thêm Kim Cương 💎 đổi quà!
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-amber-200 flex items-center justify-between text-xs font-black text-orange-600">
                <span>Xem Thành Tựu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODE 1: GAME LẬT THẺ TRÍ NHỚ (MEMORY MATCH)
          ======================================================================= */}
      {activeMode === "memory" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Controls Bar: Theme & Pair Count */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex flex-col gap-3">
            {/* Row 1: Theme selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-slate-500 shrink-0">Chủ đề:</span>
              {customWordItems.length >= 2 && (
                <button
                  onClick={() => {
                    setMemThemeId("custom");
                    startMemoryGame("custom", memPairCount, memTimeAttack);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                    memThemeId === "custom"
                      ? "bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>⭐ Kho tự chọn ({customWordItems.length})</span>
                </button>
              )}
              {MEMORY_THEMES.map((th) => {
                const isDone = completedStages.includes("mem_" + th.id);
                return (
                  <button
                    key={th.id}
                    onClick={() => {
                      setMemThemeId(th.id);
                      startMemoryGame(th.id, memPairCount, memTimeAttack);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                      memThemeId === th.id
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-amber-50"
                    }`}
                  >
                    <span>{th.icon}</span>
                    <span>{th.name}</span>
                    {isDone && (
                      <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${memThemeId === th.id ? "bg-white text-amber-600" : "bg-emerald-100 text-emerald-800"}`}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Row 2: Level selector & Time Attack */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">Độ khó thẻ:</span>
                {[6, 8, 10, 12, 16].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setMemPairCount(count);
                      startMemoryGame(memThemeId, count, memTimeAttack);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      memPairCount === count
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {count} Cặp ({count * 2} Thẻ)
                  </button>
                ))}
              </div>

              {/* Time Attack Challenge toggle */}
              <button
                onClick={() => {
                  const nextVal = !memTimeAttack;
                  setMemTimeAttack(nextVal);
                  startMemoryGame(memThemeId, memPairCount, nextVal);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  memTimeAttack
                    ? "bg-rose-500 text-white shadow-xs animate-pulse"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{memTimeAttack ? "🔥 Áp lực thời gian: BẬT" : "⏱️ Bật đếm ngược (Thử thách)"}</span>
              </button>
            </div>
          </div>

          {/* Custom Vocab Active Indicator */}
          {memThemeId === "custom" && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Đang chơi: <strong>Kho từ vựng tự chọn ({customWordItems.length} từ)</strong></span>
              </div>
              <button
                onClick={() => {
                  setCustomVocabModalInitialTab("selected");
                  setIsCustomVocabModalOpen(true);
                }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer flex items-center gap-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Quản lý kho</span>
              </button>
            </div>
          )}

          {/* Stats Header */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-xs font-black">
              <span className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${
                memTimeAttack
                  ? memTimeLimit - memTimer <= 10
                    ? "bg-rose-100 text-rose-700 border border-rose-300 animate-pulse font-black"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-slate-100 text-slate-600"
              }`}>
                <Timer className="w-4 h-4 text-sky-500" />
                <span>{memTimeAttack ? `${Math.max(0, memTimeLimit - memTimer)}s còn lại` : `${memTimer}s`}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                <span>🎯 Lượt lật:</span>
                <span className="text-amber-600">{memMoves}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                <span>✨ Đã khớp:</span>
                <span className="text-emerald-600">
                  {memMatchedCount} / {Math.floor(memCards.length / 2) || memPairCount}
                </span>
              </span>
            </div>

            <button
              onClick={() => startMemoryGame()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi lại</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div
            className={`grid gap-2 sm:gap-2.5 md:gap-3 ${
              memPairCount <= 6
                ? "grid-cols-3 sm:grid-cols-4"
                : memPairCount === 8
                ? "grid-cols-4 sm:grid-cols-4"
                : memPairCount === 10
                ? "grid-cols-4 sm:grid-cols-5"
                : memPairCount === 12
                ? "grid-cols-4 sm:grid-cols-6"
                : "grid-cols-4 sm:grid-cols-8"
            }`}
          >
            {memCards.map((card, idx) => {
              const isFlipped = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`w-full aspect-[3/4] sm:aspect-[4/5] min-h-[82px] max-h-[118px] sm:min-h-[100px] sm:max-h-[138px] rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 select-none overflow-hidden relative shadow-xs ${
                    card.isMatched
                      ? "bg-emerald-50 border-2 border-emerald-300 opacity-90 scale-95"
                      : isFlipped
                      ? "bg-white border-2 border-amber-400 shadow-md scale-100"
                      : "bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:scale-105 active:scale-95 shadow-sm"
                  }`}
                >
                  {isFlipped ? (
                    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden animate-fadeIn p-0.5">
                      {card.type === "hanzi" ? (
                        <>
                          <span
                            className={`font-black text-slate-900 block max-w-full leading-tight tracking-tight text-center px-0.5 ${
                              card.content.length <= 1
                                ? "text-2xl sm:text-3xl"
                                : card.content.length === 2
                                ? "text-lg sm:text-xl md:text-2xl"
                                : card.content.length === 3
                                ? "text-base sm:text-lg"
                                : "text-xs sm:text-sm"
                            }`}
                          >
                            {card.content}
                          </span>
                          <span className="text-[10px] sm:text-xs font-mono text-sky-600 font-bold block truncate max-w-full mt-0.5">
                            {card.pinyin}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block break-words text-center px-0.5 max-w-full"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                            title={card.content}
                          >
                            {card.content}
                          </span>
                          {card.subContent && (
                            <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block truncate max-w-full mt-0.5">
                              {card.subContent}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl drop-shadow-xs select-none">
                      🐼
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Time Out Game Over */}
          {memGameOver && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50 to-orange-50 border-2 border-rose-300 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">⏰💥</div>
              <h3 className="text-xl font-black text-rose-950">
                Hết Giờ! Thử Thách Thời Gian Thất Bại
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Bạn đã lật được <strong>{memMatchedCount} / {Math.floor(memCards.length / 2) || memPairCount}</strong> cặp trước khi hết giờ.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => startMemoryGame()}
                  className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
                >
                  Thử Thách Lại
                </button>
                <button
                  onClick={() => {
                    setMemTimeAttack(false);
                    startMemoryGame(memThemeId, memPairCount, false);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Chơi Không Giới Hạn Giờ
                </button>
              </div>
            </div>
          )}

          {/* Victory Modal Overlay */}
          {memIsWon && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">🎉🏆🎈</div>
              <h3 className="text-xl font-black text-emerald-950">
                Xuất Sắc! Bạn Đã Thắng Màn Lật Thẻ!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Thời gian: <strong>{memTimer} giây</strong> • Số lượt lật: <strong>{memMoves}</strong>
                {memTimeAttack && <span className="text-rose-600 font-bold ml-1.5">(Vượt ải Thử Thách Thời Gian thành công!)</span>}
              </p>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full">
                <span>Thưởng: +{memTimeAttack ? 50 : 30} XP</span>
                <span>•</span>
                <span>+{memTimeAttack ? 20 : 10} Kim Cương 💎</span>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => startMemoryGame()}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
                >
                  Chơi Tiếp Màn Mới
                </button>
                <button
                  onClick={() => setActiveMode("lobby")}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Về Sảnh Game
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          MODE 2: CƠN LỐC BẮT TỪ (SPEED WORD RUSH)
          ======================================================================= */}
      {activeMode === "speed" && (
        <div className="space-y-5 animate-fadeIn max-w-xl mx-auto">
          {/* Stage Selector */}
          <div className="bg-slate-50 p-3.5 rounded-3xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚩 Chọn màn chơi:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Đã hoàn thành: {SPEED_STAGES.filter((s) => completedStages.includes(s.id)).length} / {SPEED_STAGES.length} màn
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {customWordItems.length >= 4 && (
                <button
                  onClick={() => startSpeedGame("custom")}
                  className={`p-2 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    speedStageId === "custom"
                      ? "bg-gradient-to-r from-rose-600 to-indigo-600 text-white border-rose-700 shadow-md"
                      : "bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${speedStageId === "custom" ? "text-rose-100" : "text-indigo-600"}`}>
                      <span>⭐</span>
                      <span>TỰ CHỌN</span>
                    </span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${speedStageId === "custom" ? "bg-white text-indigo-900" : "bg-indigo-200/60 text-indigo-900"}`}>
                      {customWordItems.length} từ
                    </span>
                  </div>
                  <p className="text-[11px] font-bold line-clamp-1 mt-1">Kho cá nhân</p>
                </button>
              )}
              {SPEED_STAGES.map((stg) => {
                const isSelected = speedStageId === stg.id;
                const isDone = completedStages.includes(stg.id);
                return (
                  <button
                    key={stg.id}
                    onClick={() => startSpeedGame(stg.id)}
                    className={`p-2 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-rose-500 text-white border-rose-600 shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-rose-300 hover:bg-rose-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${isSelected ? "text-rose-100" : "text-rose-600"}`}>
                        <span>{stg.icon}</span>
                        <span>{stg.badge}</span>
                      </span>
                      {isDone && (
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white text-rose-600" : "bg-emerald-100 text-emerald-800"}`}>
                          ✓ Xong
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-bold line-clamp-1 mt-1">{stg.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Vocab Active Indicator */}
          {speedStageId === "custom" && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Đang chơi: <strong>Kho từ vựng tự chọn ({customWordItems.length} từ)</strong></span>
              </div>
              <button
                onClick={() => {
                  setCustomVocabModalInitialTab("selected");
                  setIsCustomVocabModalOpen(true);
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer flex items-center gap-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Quản lý kho</span>
              </button>
            </div>
          )}

          {/* Header info */}
          <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-3xl border border-slate-200">
            {/* Top row: Difficulty selection */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/70">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <span>Cấp độ:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: "normal", label: "🟢 Tiêu Chuẩn (10s)", desc: "3 Mạng" },
                    { id: "hard", label: "🟡 Căng Thẳng (6s)", desc: "2 Mạng • Sai -30đ" },
                    { id: "extreme", label: "🔴 Tử Thần (4s)", desc: "1 Mạng • x2 Điểm" }
                  ] as const
                ).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSpeedDifficulty(d.id);
                      startSpeedGame(speedStageId, d.id);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      speedDifficulty === d.id
                        ? d.id === "extreme"
                          ? "bg-rose-600 text-white shadow-xs font-black"
                          : d.id === "hard"
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-slate-900 text-white"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom row: Lives, score, and reset */}
            <div className="flex items-center justify-between">
              {/* Lives */}
              <div className="flex items-center gap-1">
                {Array.from({ length: getSpeedInitialLives(speedDifficulty) }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < speedLives
                        ? "text-rose-500 fill-rose-500 animate-pulse"
                        : "text-slate-300"
                    }`}
                  />
                ))}
                {speedDifficulty === "extreme" && (
                  <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 uppercase ml-1">
                    Tử thần: 1 Mạng
                  </span>
                )}
              </div>

              {/* Score & Combo */}
              <div className="flex items-center gap-3">
                {speedCombo > 1 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-xs font-black animate-bounce flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>Combo x{speedCombo}!</span>
                  </span>
                )}
                <span className="text-sm font-black text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200">
                  {speedScore} Điểm
                </span>
              </div>

              {/* Reset */}
              <button
                onClick={() => startSpeedGame(speedStageId, speedDifficulty)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer"
                title="Chơi lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!speedGameOver ? (
            <div className="space-y-4">
              {/* Countdown Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500 px-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>Thời gian còn lại:</span>
                  </span>
                  <span className={speedTimeLeft <= (speedDifficulty === "extreme" ? 2 : 3) ? "text-rose-600 font-black animate-pulse" : "text-slate-700 font-black"}>
                    {speedTimeLeft}s
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      speedTimeLeft <= (speedDifficulty === "extreme" ? 2 : 3) ? "bg-rose-500 animate-pulse" : "bg-gradient-to-r from-amber-400 to-rose-500"
                    }`}
                    style={{ width: `${(speedTimeLeft / getSpeedMaxTime(speedDifficulty)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Target Word Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-orange-200 text-center space-y-2 shadow-md relative">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-orange-200">
                  Câu {speedIndex + 1} / {activeSpeedQuestions.length} • {currentSpeedQuiz.category}
                </span>

                <div className="py-2">
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wide">
                    {currentSpeedQuiz.hanzi}
                  </h3>
                  <p className="text-base font-mono text-sky-600 font-bold mt-1">
                    {currentSpeedQuiz.pinyin}
                  </p>
                </div>

                <button
                  onClick={() => playChineseAudio(currentSpeedQuiz.hanzi, 1.0)}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-orange-500" />
                  <span>Nghe phát âm</span>
                </button>
              </div>

              {/* 4 Choices - Completely randomized with speedShuffledOptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {speedShuffledOptions.map((opt, oIdx) => {
                  const isSelected = speedSelectedOption === opt;
                  const isCorrect = opt === currentSpeedQuiz.correctMeaning;

                  let btnStyle = "bg-white text-slate-800 border-slate-200 hover:border-orange-400 hover:bg-orange-50/50";
                  if (speedAnswerFeedback !== null) {
                    if (isSelected) {
                      btnStyle = isCorrect
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/25 font-bold"
                        : "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/25 font-bold";
                    } else if (isCorrect) {
                      btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={speedAnswerFeedback !== null}
                      onClick={() => handleSpeedOptionSelect(opt)}
                      className={`p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Game Over / Victory Screen */
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-300 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">⚡🏆⭐</div>
              <h3 className="text-xl font-black text-slate-900">
                Tổng Kết Cơn Lốc Bắt Từ!
              </h3>
              <p className="text-sm font-black text-orange-600">
                Tổng điểm: {speedScore} Điểm • Combo cao nhất: x{speedMaxCombo}
              </p>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-900 text-xs font-black px-4 py-1.5 rounded-full">
                <span>Thưởng: +40 XP</span>
                <span>•</span>
                <span>+15 Kim Cương 💎</span>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => startSpeedGame(speedStageId)}
                  className="px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
                >
                  Chơi Lại Ván Mới
                </button>
                <button
                  onClick={() => setActiveMode("lobby")}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Về Sảnh Game
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          MODE 3: BẬC THẦY THANH ĐIỆU (TONE MASTER QUEST)
          ======================================================================= */}
      {activeMode === "tones" && (
        <div className="space-y-5 animate-fadeIn max-w-xl mx-auto">
          {/* Tone Stage Selector */}
          <div className="bg-slate-50 p-3.5 rounded-3xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚩 Chọn màn chơi:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Đã hoàn thành: {TONE_STAGES.filter((s) => completedStages.includes(s.id)).length} / {TONE_STAGES.length} màn
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {customWordItems.length >= 2 && (
                <button
                  onClick={() => startToneGame("custom")}
                  className={`p-2 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    toneStageId === "custom"
                      ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white border-sky-700 shadow-md"
                      : "bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${toneStageId === "custom" ? "text-sky-100" : "text-indigo-600"}`}>
                      <span>⭐</span>
                      <span>TỰ CHỌN</span>
                    </span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${toneStageId === "custom" ? "bg-white text-indigo-900" : "bg-indigo-200/60 text-indigo-900"}`}>
                      {customWordItems.length} từ
                    </span>
                  </div>
                  <p className="text-[11px] font-bold line-clamp-1 mt-1">Kho cá nhân</p>
                </button>
              )}
              {TONE_STAGES.map((stg) => {
                const isSelected = toneStageId === stg.id;
                const isDone = completedStages.includes(stg.id);
                return (
                  <button
                    key={stg.id}
                    onClick={() => startToneGame(stg.id)}
                    className={`p-2 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-sky-500 text-white border-sky-600 shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${isSelected ? "text-sky-100" : "text-sky-600"}`}>
                        <span>{stg.icon}</span>
                        <span>{stg.badge}</span>
                      </span>
                      {isDone && (
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white text-sky-600" : "bg-emerald-100 text-emerald-800"}`}>
                          ✓ Xong
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-bold line-clamp-1 mt-1">{stg.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Vocab Active Indicator */}
          {toneStageId === "custom" && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Đang chơi: <strong>Kho từ vựng tự chọn ({customWordItems.length} từ)</strong></span>
              </div>
              <button
                onClick={() => {
                  setCustomVocabModalInitialTab("selected");
                  setIsCustomVocabModalOpen(true);
                }}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 underline cursor-pointer flex items-center gap-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Quản lý kho</span>
              </button>
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col gap-2.5 bg-slate-50 p-4 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                Câu {toneIndex + 1} / {activeToneQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
                  Chuỗi đúng: {toneStreak} 🔥
                </span>
                <span className="text-xs font-black text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200">
                  {toneScore} Điểm
                </span>
              </div>
              <button
                onClick={() => startToneGame(toneStageId)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer"
                title="Chơi lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Extra difficulty mode: Blind Listening */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
              <span className="text-xs font-bold text-slate-500">Chế độ Thử Thách:</span>
              <button
                onClick={() => setToneBlindMode(!toneBlindMode)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  toneBlindMode
                    ? "bg-purple-600 text-white shadow-xs font-black"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {toneBlindMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{toneBlindMode ? "🎧 Nghe Mù (Ẩn mặt chữ & Pinyin)" : "👁️ Hiển thị gợi ý chữ"}</span>
              </button>
            </div>
          </div>

          {!toneCompleted && currentToneItem ? (
            <div className="space-y-4">
              {/* Listening Prompt Card */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-5 sm:p-6 border-2 border-sky-200 text-center space-y-3 shadow-md">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-sky-200">
                    {toneBlindMode ? "🎧 Nghe âm thanh và phán đoán" : "Lắng nghe & Đoán thanh điệu"}
                  </span>
                  {currentToneItem.syllables && currentToneItem.syllables.length > 1 && (
                    <span className="text-xs font-black text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      Đoán chuỗi {currentToneItem.syllables.length} chữ (Chữ {toneSyllableIndex + 1}/{currentToneItem.syllables.length})
                    </span>
                  )}
                </div>

                <div className="py-2">
                  {toneBlindMode && toneFeedback === null ? (
                    <div className="py-3 flex flex-col items-center justify-center gap-1">
                      <span className="text-5xl">🎧❓</span>
                      <span className="text-xs font-bold text-purple-700 mt-2">
                        Đang ở chế độ Nghe Mù — Hãy tập trung nghe cao độ!
                      </span>
                    </div>
                  ) : currentToneItem.syllables && currentToneItem.syllables.length > 1 ? (
                    /* Multi-syllable Interactive Word Display */
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                        {currentToneItem.syllables.map((syl, sIdx) => {
                          const isTarget = sIdx === toneSyllableIndex && toneFeedback === null;
                          const answer = toneSyllableAnswers[sIdx];
                          const isDone = answer?.isCorrect;
                          const isFailed = answer && !answer.isCorrect;

                          let cardBorder = "border-slate-200 bg-white/90 text-slate-700";
                          if (isTarget) {
                            cardBorder = "border-sky-500 bg-sky-50 text-sky-950 ring-4 ring-sky-300 shadow-md scale-105";
                          } else if (isDone) {
                            cardBorder = "border-emerald-500 bg-emerald-50 text-emerald-950 shadow-xs";
                          } else if (isFailed) {
                            cardBorder = "border-rose-400 bg-rose-50 text-rose-950";
                          }

                          return (
                            <div
                              key={sIdx}
                              className={`relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 min-w-[76px] ${cardBorder}`}
                            >
                              <span className="absolute -top-2 -right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-300 shadow-xs">
                                #{sIdx + 1}
                              </span>

                              <div className="flex items-center gap-1">
                                <span className="text-3xl sm:text-4xl font-black">{syl.char}</span>
                                <button
                                  type="button"
                                  title={`Nghe riêng chữ "${syl.char}"`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playChineseAudio(syl.char, 0.9);
                                  }}
                                  className="p-1 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-100 transition cursor-pointer"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="mt-1 text-[11px] font-bold">
                                {isDone ? (
                                  <span className="text-emerald-700 font-black flex items-center gap-0.5">
                                    ✓ {syl.pinyin} (Th.{syl.toneNumber})
                                  </span>
                                ) : isFailed ? (
                                  <span className="text-rose-600 font-bold">
                                    ✗ {syl.pinyin} (Th.{syl.toneNumber})
                                  </span>
                                ) : isTarget ? (
                                  <span className="text-sky-600 font-black animate-pulse">
                                    {syl.base} (?)
                                  </span>
                                ) : (
                                  <span className="text-slate-400 font-medium">
                                    {syl.base}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Current active target hint */}
                      {toneFeedback === null && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-100/90 px-3.5 py-1.5 rounded-xl">
                          <span>👉 Đang đoán thanh điệu cho:</span>
                          <strong className="text-sm font-black text-sky-950">
                            {currentToneItem.syllables[toneSyllableIndex]?.char}
                          </strong>
                          <span className="font-mono text-sky-700 font-bold">
                            (âm cơ sở: {currentToneItem.syllables[toneSyllableIndex]?.base})
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Single Character Display */
                    <>
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 block tracking-wider animate-fadeIn">
                        {currentToneItem.hanzi}
                      </span>
                      <span className="text-xs text-slate-500 font-medium block mt-1">
                        Gợi ý âm cơ sở: <strong className="font-mono text-sky-600">{currentToneItem.syllableBase}</strong>
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                  <button
                    onClick={() => playChineseAudio(currentToneItem.hanzi, 0.9)}
                    className="px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25 text-xs font-black inline-flex items-center gap-2 transition active:scale-95 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Bấm nghe lại toàn bộ từ 🔊</span>
                  </button>
                  {currentToneItem.syllables && currentToneItem.syllables[toneSyllableIndex] && currentToneItem.syllables.length > 1 && (
                    <button
                      onClick={() => playChineseAudio(currentToneItem.syllables[toneSyllableIndex].char, 0.95)}
                      className="px-4 py-2.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 border border-sky-300 text-xs font-bold inline-flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe riêng chữ "{currentToneItem.syllables[toneSyllableIndex].char}"</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tone Selection Grid (4 main tones + 1 neutral tone) */}
              <div className="space-y-2.5 pt-1">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: 1, name: "Thanh 1 (¯)", desc: "Cao, đều phẳng (55)" },
                    { num: 2, name: "Thanh 2 (ˊ)", desc: "Vuốt lên cao (35)" },
                    { num: 3, name: "Thanh 3 (ˇ)", desc: "Trầm sâu rồi lên (214)" },
                    { num: 4, name: "Thanh 4 (ˋ)", desc: "Dứt khoát từ trên xuống (51)" }
                  ].map((tone) => {
                    const currentTargetSyl = currentToneItem.syllables
                      ? currentToneItem.syllables[toneSyllableIndex]
                      : null;
                    const isSelected = toneSelected === tone.num;
                    const isCorrect = currentTargetSyl
                      ? tone.num === currentTargetSyl.toneNumber
                      : tone.num === currentToneItem.toneNumber;

                    let style = "bg-white text-slate-800 border-slate-200 hover:border-sky-400 hover:bg-sky-50/40";
                    if (toneFeedback !== null) {
                      if (isSelected) {
                        style = isCorrect
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                          : "bg-rose-500 text-white border-rose-600 shadow-md";
                      } else if (isCorrect) {
                        style = "bg-emerald-50 text-emerald-900 border-emerald-300 font-black";
                      }
                    }

                    return (
                      <button
                        key={tone.num}
                        disabled={toneFeedback !== null}
                        onClick={() => handleSelectTone(tone.num as 1 | 2 | 3 | 4 | 5)}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${style}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black">{tone.name}</span>
                          {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                          {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                        </div>
                        <p className="text-[11px] opacity-80 mt-1">{tone.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* 5th Tone: Neutral Tone (Khinh thanh / Thanh nhẹ) */}
                {(() => {
                  const currentTargetSyl = currentToneItem.syllables
                    ? currentToneItem.syllables[toneSyllableIndex]
                    : null;
                  const isSelected = toneSelected === 5;
                  const isCorrect = currentTargetSyl
                    ? currentTargetSyl.toneNumber === 5
                    : currentToneItem.toneNumber === 5;

                  let neutralStyle = "bg-white text-slate-800 border-slate-200 hover:border-sky-400 hover:bg-sky-50/40";
                  if (toneFeedback !== null) {
                    if (isSelected) {
                      neutralStyle = isCorrect
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                        : "bg-rose-500 text-white border-rose-600 shadow-md";
                    } else if (isCorrect) {
                      neutralStyle = "bg-emerald-50 text-emerald-900 border-emerald-300 font-black";
                    }
                  }

                  return (
                    <button
                      disabled={toneFeedback !== null}
                      onClick={() => handleSelectTone(5)}
                      className={`w-full p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${neutralStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black">Thanh nhẹ (·)</span>
                        <span className="text-[11px] opacity-80">Ngắn, nhẹ, không dấu (Khinh thanh / 轻声)</span>
                      </div>
                      {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                    </button>
                  );
                })()}
              </div>

              {/* Feedback explanation if answered */}
              {toneFeedback !== null && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs space-y-1.5 animate-fadeIn ${
                    toneFeedback === "correct"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : "bg-rose-50 border-rose-300 text-rose-950"
                  }`}
                >
                  <p className="font-black text-sm">
                    {toneFeedback === "correct" ? "✓ Chính xác tuyệt đối!" : "✗ Chưa chính xác!"}
                  </p>
                  <div className="font-medium text-slate-700">
                    Từ: <strong className="text-sm font-black text-slate-900">{currentToneItem.hanzi}</strong>
                    {" "}• Phát âm chuẩn:{" "}
                    <span className="font-bold text-sky-700 font-mono">
                      {currentToneItem.syllables && currentToneItem.syllables.length > 0
                        ? currentToneItem.syllables.map((s) => `${s.pinyin} (Th.${s.toneNumber})`).join("  ")
                        : `${currentToneItem.fullPinyin} (Thanh ${currentToneItem.toneNumber})`}
                    </span>
                    {" "}• Nghĩa: <span className="italic">{currentToneItem.vietnamese}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-300 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">🎵🎉🏆</div>
              <h3 className="text-xl font-black text-slate-900">
                Chúc Mừng Bậc Thầy Thanh Điệu!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Bạn đã phân biệt chuẩn xác các thanh điệu tiếng Trung!
              </p>
              <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-900 text-xs font-black px-4 py-1.5 rounded-full">
                <span>Thưởng: +35 XP</span>
                <span>•</span>
                <span>+12 Kim Cương 💎</span>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => startToneGame(toneStageId)}
                  className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
                >
                  Luyện Lại Vòng Mới
                </button>
                <button
                  onClick={() => setActiveMode("lobby")}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Về Sảnh Game
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          MODE 4: XẾP CÂU THẦN TỐC (SENTENCE SCRAMBLE RACER)
          ======================================================================= */}
      {activeMode === "sentence" && (
        <div className="space-y-5 animate-fadeIn max-w-xl mx-auto">
          {/* Sentence Stage Selector */}
          <div className="bg-slate-50 p-3.5 rounded-3xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚩 Chọn màn chơi:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Đã hoàn thành: {SENTENCE_STAGES.filter((s) => completedStages.includes(s.id)).length} / {SENTENCE_STAGES.length} màn
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {SENTENCE_STAGES.map((stg) => {
                const isSelected = scrambleStageId === stg.id;
                const isDone = completedStages.includes(stg.id);
                return (
                  <button
                    key={stg.id}
                    onClick={() => startSentenceGame(stg.id)}
                    className={`p-2 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${isSelected ? "text-emerald-100" : "text-emerald-700"}`}>
                        <span>{stg.icon}</span>
                        <span>{stg.badge}</span>
                      </span>
                      {isDone && (
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white text-emerald-700" : "bg-emerald-100 text-emerald-800"}`}>
                          ✓ Xong
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-bold line-clamp-1 mt-1">{stg.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-2.5 bg-slate-50 p-4 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                Câu {scrambleIndex + 1} / {activeScrambleList.length}
              </span>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {scrambleScore} Điểm
              </span>
              <button
                onClick={() => startSentenceGame(scrambleStageId)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer"
                title="Chơi lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Extra difficulty mode: Grammar Traps */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
              <span className="text-xs font-bold text-slate-500">Độ khó thử thách:</span>
              <button
                onClick={() => {
                  const nextVal = !scrambleHardMode;
                  setScrambleHardMode(nextVal);
                  // re-init current sentence round with traps
                  if (activeScrambleList[scrambleIndex]) {
                    const sc = activeScrambleList[scrambleIndex];
                    let pool = [...sc.words];
                    if (nextVal) {
                      const traps = [
                        "的", "了", "在", "不", "很", "是", "被", "把", "给", "和", "跟", "去", "到", "着"
                      ].filter((t) => !sc.words.includes(t));
                      const trap1 = traps[Math.floor(Math.random() * traps.length)];
                      const trap2 = traps[(Math.floor(Math.random() * traps.length) + 1) % traps.length];
                      pool.push(trap1, trap2);
                    }
                    pool.sort(() => Math.random() - 0.5);
                    setScrambleAvailableWords(pool);
                    setScrambleBuiltWords([]);
                    setScrambleResult(null);
                  }
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  scrambleHardMode
                    ? "bg-rose-600 text-white shadow-xs font-black"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{scrambleHardMode ? "⚠️ Chế độ Khó (Cài sẵn bẫy từ ngữ pháp)" : "🟢 Chế độ Thường (Vừa khít từ)"}</span>
              </button>
            </div>
          </div>

          {!scrambleCompleted ? (
            <div className="space-y-4">
              {/* Target Vietnamese Prompt */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-5 border-2 border-emerald-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {currentScramble.category}
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  "{currentScramble.vietnamese}"
                </p>
              </div>

              {/* Built Sentence Tray */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500 px-1">
                  <span>Khung câu đang ghép (Chạm để bỏ từ):</span>
                  <button
                    onClick={() => initScrambleRound(scrambleIndex)}
                    className="text-emerald-600 hover:underline cursor-pointer"
                  >
                    Xếp lại từ đầu
                  </button>
                </div>
                <div className="min-h-[64px] p-3 rounded-2xl bg-white border-2 border-dashed border-emerald-300 flex flex-wrap gap-2 items-center">
                  {scrambleBuiltWords.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Chạm vào các khối từ bên dưới để ghép vào đây...
                    </span>
                  ) : (
                    scrambleBuiltWords.map((word, bIdx) => (
                      <button
                        key={bIdx}
                        onClick={() => handleRemoveBuiltWord(word, bIdx)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xs hover:bg-rose-500 transition active:scale-95 cursor-pointer animate-fadeIn"
                        title="Chạm để gỡ ra"
                      >
                        {word}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Available Word Blocks */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-500 px-1">Các khối từ có sẵn:</span>
                <div className="flex flex-wrap gap-2">
                  {scrambleAvailableWords.map((word, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handlePickScrambleWord(word, aIdx)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition active:scale-95 cursor-pointer"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action: Check or Next */}
              {scrambleResult === null ? (
                <button
                  disabled={scrambleBuiltWords.length === 0}
                  onClick={handleCheckSentence}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  Kiểm Tra Cú Pháp Ngữ Pháp
                </button>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <div
                    className={`p-4 rounded-2xl border-2 text-xs space-y-1.5 ${
                      scrambleResult === "correct"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                        : "bg-rose-50 border-rose-300 text-rose-950"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm flex items-center gap-1.5">
                        {scrambleResult === "correct" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Ghép Chuẩn Xác 100%!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Chưa Đúng Thứ Tự!</span>
                          </>
                        )}
                      </span>
                      <button
                        onClick={() => playChineseAudio(currentScramble.correctHanzi, 0.9)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe câu chuẩn</span>
                      </button>
                    </div>
                    <p className="font-bold text-slate-800 text-xs sm:text-sm">
                      {currentScramble.correctHanzi}
                    </p>
                    <p className="text-sky-700 font-mono text-[11px]">
                      {currentScramble.correctPinyin}
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      💡 {currentScramble.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextSentence}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Câu Tiếp Theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">🏎️🎉🏆</div>
              <h3 className="text-xl font-black text-slate-900">
                Chúc Mừng Tay Đua Ngữ Pháp!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Bạn đã xếp hoàn chỉnh toàn bộ các cấu trúc câu mẫu!
              </p>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 text-xs font-black px-4 py-1.5 rounded-full">
                <span>Thưởng: +50 XP</span>
                <span>•</span>
                <span>+20 Kim Cương 💎</span>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => startSentenceGame(scrambleStageId)}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
                >
                  Chơi Lại Vòng Mới
                </button>
                <button
                  onClick={() => setActiveMode("lobby")}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Về Sảnh Game
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          MODE 5: ĐỐ VUI GHÉP HÁN TỰ (HANZI PUZZLE)
          ======================================================================= */}
      {activeMode === "puzzle" && (
        <div className="space-y-5 animate-fadeIn max-w-xl mx-auto">
          {/* Puzzle Stage Selector */}
          <div className="bg-slate-50 p-3.5 rounded-3xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚩 Chọn màn chơi:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Đã hoàn thành: {PUZZLE_STAGES.filter((s) => completedStages.includes(s.id)).length} / {PUZZLE_STAGES.length} màn
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {PUZZLE_STAGES.map((stg) => {
                const isSelected = puzzleStageId === stg.id;
                const isDone = completedStages.includes(stg.id);
                return (
                  <button
                    key={stg.id}
                    onClick={() => startPuzzleGame(stg.id)}
                    className={`p-2 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-700 shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${isSelected ? "text-purple-100" : "text-purple-700"}`}>
                        <span>{stg.icon}</span>
                        <span>{stg.badge}</span>
                      </span>
                      {isDone && (
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white text-purple-700" : "bg-emerald-100 text-emerald-800"}`}>
                          ✓ Xong
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-bold line-clamp-1 mt-1">{stg.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-2.5 bg-slate-50 p-4 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                Câu đố {puzzleIndex + 1} / {activePuzzleList.length}
              </span>
              <span className="text-xs font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                {puzzleScore} Điểm
              </span>
              <button
                onClick={() => startPuzzleGame(puzzleStageId)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer"
                title="Chơi lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Difficulty mode selector */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
              <span className="text-xs font-bold text-slate-500">Cấp độ thử thách:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPuzzleDifficulty("standard")}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    puzzleDifficulty === "standard"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  🟢 Có Gợi Ý
                </button>
                <button
                  onClick={() => setPuzzleDifficulty("expert")}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    puzzleDifficulty === "expert"
                      ? "bg-purple-600 text-white shadow-xs font-black"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  🔥 Chuyên Gia (Ẩn Mẹo Ý Nghĩa)
                </button>
              </div>
            </div>
          </div>

          {!puzzleCompleted ? (
            <div className="space-y-4">
              {/* Components Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200 text-center space-y-3 shadow-md">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-purple-200">
                  Ghép các bộ thủ này thành chữ gì?
                </span>

                {/* Radicals Formula */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-3">
                  {currentPuzzle.components.map((comp, cIdx) => (
                    <React.Fragment key={cIdx}>
                      <div className="p-3 rounded-2xl bg-white border border-purple-200 shadow-xs text-center min-w-[64px]">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                          {comp.radical}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                          {comp.meaning}
                        </span>
                      </div>
                      {cIdx < currentPuzzle.components.length - 1 && (
                        <span className="text-xl font-black text-purple-600">+</span>
                      )}
                    </React.Fragment>
                  ))}
                  <span className="text-xl font-black text-purple-600">= ?</span>
                </div>

                {puzzleDifficulty === "expert" && puzzleResult === null ? (
                  <p className="text-xs text-purple-700 font-bold bg-purple-100/70 py-1.5 px-3 rounded-xl inline-block">
                    ⚡ Chế độ Chuyên Gia: Tự phán đoán cấu trúc chữ không cần đọc mẹo!
                  </p>
                ) : (
                  <p className="text-xs text-slate-600 font-medium max-w-md mx-auto animate-fadeIn">
                    💡 <em>Gợi ý:</em> {currentPuzzle.story}
                  </p>
                )}
              </div>

              {/* 4 Choices - Completely randomized with puzzleShuffledOptions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {puzzleShuffledOptions.map((choice, chIdx) => {
                  const isSelected = puzzleSelectedOption === choice;
                  const isCorrect = choice === currentPuzzle.targetHanzi;

                  let style = "bg-white text-slate-800 border-slate-200 hover:border-purple-400 hover:bg-purple-50/50";
                  if (puzzleResult !== null) {
                    if (isSelected) {
                      style = isCorrect
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                        : "bg-rose-500 text-white border-rose-600 shadow-md";
                    } else if (isCorrect) {
                      style = "bg-emerald-50 text-emerald-900 border-emerald-300 font-black";
                    }
                  }

                  return (
                    <button
                      key={chIdx}
                      disabled={puzzleResult !== null}
                      onClick={() => handleSelectPuzzleChoice(choice)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer ${style}`}
                    >
                      <span className="text-3xl sm:text-4xl font-black block">{choice}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {puzzleResult !== null && (
                <div className="space-y-3 animate-fadeIn">
                  <div
                    className={`p-4 rounded-2xl border-2 text-xs space-y-1.5 ${
                      puzzleResult === "correct"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                        : "bg-rose-50 border-rose-300 text-rose-950"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm">
                        {puzzleResult === "correct" ? "✓ Đáp Án Chính Xác!" : "✗ Chưa Đúng!"}
                      </span>
                      <button
                        onClick={() => playChineseAudio(currentPuzzle.targetHanzi, 1.0)}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe chữ</span>
                      </button>
                    </div>
                    <p className="font-bold text-sm">
                      Chữ: <strong>{currentPuzzle.targetHanzi}</strong> ({currentPuzzle.pinyin}) • {currentPuzzle.vietnamese}
                    </p>
                    <p className="text-slate-600">{currentPuzzle.story}</p>
                  </div>

                  <button
                    onClick={handleNextPuzzle}
                    className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Câu Đố Tiếp Theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">🧩🎉🏆</div>
              <h3 className="text-xl font-black text-slate-900">
                Chúc Mừng Bậc Thầy Chiết Tự!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Bạn đã giải mã xuất sắc toàn bộ các câu đố cấu tạo chữ Hán!
              </p>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 text-xs font-black px-4 py-1.5 rounded-full">
                <span>Thưởng: +45 XP</span>
                <span>•</span>
                <span>+18 Kim Cương 💎</span>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => startPuzzleGame(puzzleStageId)}
                  className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
                >
                  Chơi Lại Vòng Mới
                </button>
                <button
                  onClick={() => setActiveMode("lobby")}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Về Sảnh Game
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          MODE 6: BẢNG HUY HIỆU & ĐỔI QUÀ (ACHIEVEMENTS)
          ======================================================================= */}
      {activeMode === "achievements" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 text-white text-center space-y-2 shadow-lg">
            <h3 className="text-2xl font-black">🏆 Bảng Vinh Danh & Danh Hiệu Game</h3>
            <p className="text-xs text-amber-100 max-w-md mx-auto">
              Chinh phục các màn chơi để mở khóa toàn bộ huy hiệu danh giá và nhận mưa Kim Cương 💎
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GAME_ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                    isUnlocked
                      ? "bg-white border-amber-300 shadow-md"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                      isUnlocked ? "bg-amber-100 text-amber-900 shadow-sm" : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {ach.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm sm:text-base">
                        {ach.name}
                      </h4>
                      {isUnlocked ? (
                        <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          ✓ Đã Đạt
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">
                          Chưa Mở
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{ach.desc}</p>
                    <div className="flex items-center gap-3 pt-1 text-[11px] font-bold text-amber-600">
                      <span>+{ach.xpReward} XP</span>
                      <span>•</span>
                      <span>+{ach.diamondReward} Kim Cương 💎</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveMode("lobby")}
              className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition cursor-pointer"
            >
              Quay Lại Sảnh Game
            </button>
          </div>
        </div>
      )}

      {/* Custom Game Vocab Selection & Management Modal */}
      <CustomGameVocabModal
        isOpen={isCustomVocabModalOpen}
        initialTab={customVocabModalInitialTab}
        onClose={() => setIsCustomVocabModalOpen(false)}
        onStartGame={(gameType) => {
          setIsCustomVocabModalOpen(false);
          if (gameType === "memory") {
            setActiveMode("memory");
            setMemThemeId("custom");
            startMemoryGame("custom");
          } else if (gameType === "speed") {
            setActiveMode("speed");
            setSpeedStageId("custom");
            startSpeedGame("custom");
          } else if (gameType === "tones") {
            setActiveMode("tones");
            setToneStageId("custom");
            startToneGame("custom");
          }
        }}
      />
    </div>
  );
};
