import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, signInWithGooglePopup, logOut } from "./firebase";
import { 
  UserProfile, 
  UserProgressData, 
  TabType, 
  Lesson, 
  HSKLevelId,
  MembershipTier
} from "./types";
import { 
  fetchUserProfileWithStatus, 
  fetchUserProgressWithStatus, 
  saveUserProfile, 
  saveUserProgress, 
  recordCompletedLesson, 
  recordPracticedWord, 
  recordPracticedDialogue,
  updateProgress,
  createDefaultUserProfile,
  createDefaultUserProgress,
  purgeLegacyMockStorage
} from "./services/dbService";

import { Navbar } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { LearnView } from "./components/LearnView";
import { GarmentView } from "./components/GarmentView";
import { PracticeView } from "./components/PracticeView";
import { SituationalDialogueView } from "./components/SituationalDialogueView";
import { PinyinPracticeView } from "./components/PinyinPracticeView";
import { RadicalsView } from "./components/RadicalsView";
import { GrammarView } from "./components/GrammarView";
import { GamesView } from "./components/GamesView";
import { DictionaryView } from "./components/DictionaryView";
import { ProfileView } from "./components/ProfileView";
import { SearchModal } from "./components/SearchModal";
import { SavedWordsModal } from "./components/SavedWordsModal";
import { AITutorModal } from "./components/AITutorModal";
import { SubscriptionModal } from "./components/SubscriptionModal";
import { LockedFeatureGateModal, LockedGateData } from "./components/LockedFeatureGateModal";
import { ActivityPointsModal } from "./components/ActivityPointsModal";
import { OnlineRewardToast } from "./components/OnlineRewardToast";
import { checkLessonLock, unlockWithGems } from "./services/subscriptionService";
import { ACTIVITY_CONFIG, getStoredOnlineSeconds, setStoredOnlineSeconds } from "./services/activityPointsService";
import { safeStorage } from "./utils/storage";
import { HSK1_LESSONS } from "./data/hskData";

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    safeStorage.removeItem("theme_mode");
    return false;
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedWordsOpen, setIsSavedWordsOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string>("");
  const [activeLessonModal, setActiveLessonModal] = useState<Lesson | null>(null);
  const [isPlacementTestOpen, setIsPlacementTestOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [lockedGateData, setLockedGateData] = useState<LockedGateData | null>(null);

  // Online timer & Activity Points state
  const [onlineSeconds, setOnlineSeconds] = useState<number>(() => {
    return getStoredOnlineSeconds();
  });
  const [rewardToast, setRewardToast] = useState<{ show: boolean; pointsAdded: number }>({
    show: false,
    pointsAdded: 0
  });

  // User Profile & Progress state (clean default initialization)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    return createDefaultUserProfile("guest_user", "Khách");
  });

  const [userProgress, setUserProgress] = useState<UserProgressData>(() => {
    return createDefaultUserProgress("guest_user");
  });

  // Theme mode effect (Enforce bright white theme)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      safeStorage.setItem("theme_mode", "light");
    }
  }, [darkMode]);

  // Auth State Listener - Handles clean first-time initialization for new Google accounts
  // and loads saved progress for returning Google accounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const uid = user.uid;
        const { profile: cloudProfile, isNewUser: isNewProf } = await fetchUserProfileWithStatus(uid);
        const { progress: cloudProgress, isNewUser: isNewProg } = await fetchUserProgressWithStatus(uid);

        const today = new Date().toISOString().split("T")[0];

        let finalProfile: UserProfile;
        if (isNewProf) {
          // Brand new Google account: start completely fresh!
          finalProfile = createDefaultUserProfile(
            uid,
            user.displayName || "Học Viên",
            user.email || "",
            user.photoURL || null
          );
          finalProfile.lastActiveDate = today;
          finalProfile.streakDays = 1;
        } else {
          // Returning user: calculate streak over time and preserve all personalized preferences
          let streak = cloudProfile.streakDays || 1;
          if (cloudProfile.lastActiveDate && cloudProfile.lastActiveDate !== today) {
            const lastDate = new Date(cloudProfile.lastActiveDate);
            const currDate = new Date(today);
            const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
              streak += 1;
            } else if (diffDays > 1) {
              streak = 1;
            }
          }

          finalProfile = {
            ...cloudProfile,
            uid,
            displayName: user.displayName || cloudProfile.displayName || "Học Viên",
            email: user.email || cloudProfile.email || "",
            photoURL: user.photoURL || cloudProfile.photoURL || null,
            streakDays: streak,
            lastActiveDate: today
          };
        }

        let finalProgress: UserProgressData;
        if (isNewProg) {
          // Brand new user progress starting at 0
          finalProgress = createDefaultUserProgress(uid);
        } else {
          // Returning user progress
          finalProgress = {
            ...createDefaultUserProgress(uid),
            ...cloudProgress,
            uid
          };
        }

        setUserProfile(finalProfile);
        setUserProgress(finalProgress);

        // Persist to user's dedicated Firestore path and local cache
        await saveUserProfile(finalProfile);
        await saveUserProgress(finalProgress);
      } else {
        // Guest user fallback (clean zeroed state)
        setUserProfile(createDefaultUserProfile("guest_user", "Khách"));
        setUserProgress(createDefaultUserProgress("guest_user"));
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync global placement test trigger for window
  useEffect(() => {
    (window as any).triggerPlacementTest = () => {
      setActiveTab("learn");
      setIsPlacementTestOpen(true);
    };
  }, []);

  // Online Time Tracker for Activity Points: 10 minutes (600s) = 2 activity points
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineSeconds((prev) => {
        const next = prev + 1;
        if (next >= ACTIVITY_CONFIG.ONLINE_SECONDS_PER_REWARD) {
          const pointsEarned = ACTIVITY_CONFIG.POINTS_PER_ONLINE_REWARD;
          setUserProfile((curr) => {
            const updatedProfile: UserProfile = {
              ...curr,
              activityPoints: (curr.activityPoints ?? 0) + pointsEarned
            };
            saveUserProfile(updatedProfile);
            return updatedProfile;
          });

          // Show reward notification toast
          setRewardToast({
            show: true,
            pointsAdded: pointsEarned
          });

          setStoredOnlineSeconds(0);
          return 0;
        }

        setStoredOnlineSeconds(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGooglePopup();
      // onAuthStateChanged automatically handles clean account initialization or loading
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      setUserProfile(createDefaultUserProfile("guest_user", "Khách"));
      setUserProgress(createDefaultUserProgress("guest_user"));
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updated };
      saveUserProfile(next);
      return next;
    });
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    const updated = recordCompletedLesson(userProgress, lessonId, score);
    setUserProgress(updated);
  };

  const handleToggleFavorite = (wordId: string) => {
    // Determine if this is a disambiguated cedict key like "cedict_1206_别"
    const disambiguatedMatch = wordId.match(/^cedict_\d+_(.+)$/);
    const hanzi = disambiguatedMatch ? disambiguatedMatch[1] : null;

    const exists = userProgress.favoriteWordIds.includes(wordId);

    let updatedFavs: string[];
    if (exists) {
      updatedFavs = userProgress.favoriteWordIds.filter((id) => {
        if (id === wordId) return false;
        if (hanzi && (id === `cedict_${hanzi}` || id === hanzi)) return false;
        return true;
      });
    } else {
      const filtered = userProgress.favoriteWordIds.filter((id) => {
        if (hanzi && (id === `cedict_${hanzi}` || id === hanzi)) return false;
        return true;
      });
      updatedFavs = [...filtered, wordId];
    }

    const updated = { ...userProgress, favoriteWordIds: updatedFavs };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleToggleDifficult = (wordId: string) => {
    const exists = userProgress.difficultWordIds.includes(wordId);
    const updatedDiff = exists
      ? userProgress.difficultWordIds.filter((id) => id !== wordId)
      : [...userProgress.difficultWordIds, wordId];

    const updated = { ...userProgress, difficultWordIds: updatedDiff };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleMarkMastered = (wordId: string) => {
    const updated = recordPracticedWord(userProgress, wordId, true);
    setUserProgress(updated);
  };

  const handleRecordSpeaking = () => {
    const updated = updateProgress(userProgress, {
      speakingPracticedCount: userProgress.speakingPracticedCount + 1,
      totalXP: userProgress.totalXP + 15
    });
    setUserProgress(updated);
  };

  const handleRecordListening = () => {
    const updated = updateProgress(userProgress, {
      listeningPracticedCount: userProgress.listeningPracticedCount + 1,
      totalXP: userProgress.totalXP + 10
    });
    setUserProgress(updated);
  };

  const handleRecordWriting = () => {
    const updated = updateProgress(userProgress, {
      writingPracticedCount: (userProgress.writingPracticedCount || 0) + 1,
      totalXP: userProgress.totalXP + 12
    });
    setUserProgress(updated);
  };

  const handleRecordGameXP = (xp: number) => {
    const updated = updateProgress(userProgress, {
      totalXP: userProgress.totalXP + xp
    });
    setUserProgress(updated);
  };

  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleOpenLockedGate = (data: LockedGateData) => {
    setLockedGateData(data);
  };

  const handleUpgradePlan = (tier: MembershipTier) => {
    let expiresAt: string | undefined = undefined;
    if (tier === "pro_monthly") {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      expiresAt = d.toISOString();
    } else if (tier === "pro_annual") {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      expiresAt = d.toISOString();
    }

    handleUpdateProfile({
      membershipTier: tier,
      membershipExpiresAt: expiresAt,
      gems: (userProfile.gems || 0) + (tier === "lifetime" ? 1000 : tier === "pro_annual" ? 500 : 100)
    });
  };

  const handleUnlockWithGems = (contentId: string, gemCost: number) => {
    const res = unlockWithGems(contentId, gemCost, userProfile, handleUpdateProfile);
    if (!res.success) {
      alert(res.message);
    }
  };

  const handleOpenLessonModal = (lesson: Lesson) => {
    const lockStatus = checkLessonLock(lesson, userProfile);
    if (lockStatus.isLocked) {
      handleOpenLockedGate({
        type: "lesson",
        id: lesson.id,
        hskLevel: lesson.hskLevel,
        lessonNumber: lesson.lessonNumber,
        title: lesson.title,
        subtitle: lesson.vietnameseTitle,
        gemCost: lockStatus.gemUnlockCost || 150,
        previewSummary: [
          `Chủ đề: ${lesson.title} - ${lesson.description}`,
          `${lesson.grammarPoints?.length || 2} điểm ngữ pháp quan trọng`,
          `Luyện phát âm & bài tập trắc nghiệm củng cố`
        ]
      });
      return;
    }
    setActiveLessonModal(lesson);
    setActiveTab("learn");
  };

  // Reset scroll position of the main view container on tab change
  useEffect(() => {
    const scrollContainer = document.getElementById("app-main-scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeTab]);

  return (
    <>
      {/* Cheerful Navigation Header, Immovable Bottom Bar & Scroll Container */}
      <Navbar
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          setActiveLessonModal(null);
          setIsPlacementTestOpen(false);
        }}
        userProfile={userProfile}
        userProgress={userProgress}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSavedWords={() => setIsSavedWordsOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenSubscription={handleOpenSubscriptionModal}
        onOpenActivityModal={() => setIsActivityModalOpen(true)}
        onGoogleSignIn={handleGoogleSignIn}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      >
        {activeTab === "home" && (
          <HomeView
            userProfile={userProfile}
            userProgress={userProgress}
            onChangeTab={setActiveTab}
            onOpenPlacementTest={() => {
              setActiveTab("learn");
              setIsPlacementTestOpen(true);
            }}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            onOpenLesson={handleOpenLessonModal}
            onOpenSavedWords={() => setIsSavedWordsOpen(true)}
          />
        )}

        {activeTab === "learn" && (
          <LearnView
            userProfile={userProfile}
            userProgress={userProgress}
            onCompleteLesson={handleCompleteLesson}
            activeLessonModal={activeLessonModal}
            onCloseLessonModal={() => setActiveLessonModal(null)}
            onOpenLesson={handleOpenLessonModal}
            onOpenLockedGate={handleOpenLockedGate}
            isPlacementTestOpen={isPlacementTestOpen}
            onClosePlacementTest={() => setIsPlacementTestOpen(false)}
            onSetLevel={(level: HSKLevelId) => {
              handleUpdateProfile({ currentHskLevel: level });
              setIsPlacementTestOpen(false);
            }}
          />
        )}

        {activeTab === "pinyin" && (
          <PinyinPracticeView
            userProgress={userProgress}
            onRecordPractice={(xp) => {
              handleRecordListening();
            }}
          />
        )}

        {activeTab === "radicals" && (
          <RadicalsView />
        )}

        {activeTab === "grammar" && (
          <GrammarView
            userProgress={userProgress}
            onOpenAITutorWithPrompt={(prompt) => {
              setAiTutorPrompt(prompt);
              setIsAITutorOpen(true);
            }}
            onRecordXP={(xp) => {
              handleRecordListening();
            }}
          />
        )}

        {activeTab === "dialogue" && (
          <SituationalDialogueView
            onRecordSpeaking={handleRecordSpeaking}
            onOpenAITutorWithPrompt={(prompt) => {
              setAiTutorPrompt(prompt);
              setIsAITutorOpen(true);
            }}
          />
        )}

        {activeTab === "garment" && (
          <GarmentView
            userProfile={userProfile}
            userProgress={userProgress}
            onToggleFavorite={handleToggleFavorite}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            onOpenLockedGate={handleOpenLockedGate}
          />
        )}

        {activeTab === "practice" && (
          <PracticeView
            userProgress={userProgress}
            onRecordSpeaking={handleRecordSpeaking}
            onRecordListening={handleRecordListening}
            onRecordWriting={handleRecordWriting}
            onOpenAITutorWithPrompt={(prompt) => {
              setAiTutorPrompt(prompt);
              setIsAITutorOpen(true);
            }}
          />
        )}

        {(activeTab === "dictionary" || activeTab === "vocab") && (
          <DictionaryView
            favoriteWordIds={userProgress.favoriteWordIds}
            onToggleFavorite={handleToggleFavorite}
            onOpenSavedWordsModal={() => setIsSavedWordsOpen(true)}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToGame={() => setActiveTab("game")}
          />
        )}

        {activeTab === "game" && (
          <GamesView
            userProgress={userProgress}
            onRecordXP={handleRecordGameXP}
            onOpenAITutorWithPrompt={(prompt) => {
              setAiTutorPrompt(prompt);
              setIsAITutorOpen(true);
            }}
          />
        )}

        {activeTab === "profile" && (
          <ProfileView
            userProfile={userProfile}
            userProgress={userProgress}
            onUpdateProfile={handleUpdateProfile}
            onGoogleSignIn={handleGoogleSignIn}
            onSignOut={handleSignOut}
            onOpenSubscriptionModal={handleOpenSubscriptionModal}
            onOpenSavedWords={() => setIsSavedWordsOpen(true)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        )}
      </Navbar>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        favoriteWordIds={userProgress.favoriteWordIds}
        onToggleFavorite={handleToggleFavorite}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onNavigateToGame={() => {
          setIsSearchOpen(false);
          setActiveTab("game");
        }}
        onSelectWord={(word) => {
          setIsSearchOpen(false);
          setActiveTab("dictionary");
        }}
        onSelectLesson={(lesson) => {
          setIsSearchOpen(false);
          setActiveLessonModal(lesson);
          setActiveTab("learn");
        }}
      />

      {/* Sổ tay từ vựng & bộ thủ đã đánh dấu (Saved Words Notebook & Flashcards Modal) */}
      <SavedWordsModal
        isOpen={isSavedWordsOpen}
        onClose={() => setIsSavedWordsOpen(false)}
        favoriteWordIds={userProgress.favoriteWordIds}
        onToggleFavorite={handleToggleFavorite}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onNavigateToGame={() => {
          setIsSavedWordsOpen(false);
          setActiveTab("game");
        }}
        onNavigateToRadicals={() => {
          setIsSavedWordsOpen(false);
          setActiveTab("radicals");
        }}
        onNavigateToDictionary={() => {
          setIsSavedWordsOpen(false);
          setActiveTab("dictionary");
        }}
      />

      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => {
          setIsAITutorOpen(false);
          setAiTutorPrompt("");
        }}
        userLevel={userProfile.currentHskLevel}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onOpenSubscriptionModal={handleOpenSubscriptionModal}
        initialPrompt={aiTutorPrompt}
      />

      {/* Subscription & Pricing Matrix Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Feature Locked Content Gate Modal */}
      <LockedFeatureGateModal
        isOpen={!!lockedGateData}
        onClose={() => setLockedGateData(null)}
        data={lockedGateData}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onOpenSubscriptionModal={handleOpenSubscriptionModal}
        onSuccessUnlock={() => {
          setLockedGateData(null);
        }}
      />

      {/* Activity Points Modal (Độ sôi nổi & Đổi kim cương) */}
      <ActivityPointsModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        userProfile={userProfile}
        onlineSeconds={onlineSeconds}
        onUpdateProfile={handleUpdateProfile}
        onNavigateToGameVocab={() => {
          setIsActivityModalOpen(false);
          setActiveTab("dictionary");
        }}
      />

      {/* Online 10-Minute Reward Toast */}
      <OnlineRewardToast
        show={rewardToast.show}
        pointsAdded={rewardToast.pointsAdded}
        onClose={() => setRewardToast({ show: false, pointsAdded: 0 })}
        onOpenExchange={() => {
          setRewardToast({ show: false, pointsAdded: 0 });
          setIsActivityModalOpen(true);
        }}
      />
    </>
  );
}
