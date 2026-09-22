import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getDocFromServer,
  db, 
  auth 
} from "../firebase";
import { UserProfile, UserProgressData, HSKLevelId } from "../types";
import { safeStorage } from "../utils/storage";

const LOCAL_STORAGE_KEY_PREFIX = "tieng_trung_user_";

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  // In production UI, log clearly but do not crash the React tree
  return errInfo;
}

// Test Firestore connection on boot as recommended by Skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("Firebase client is currently in offline mode.");
    }
  }
}
testConnection();

// Global Cloud Sync Status Listener
type SyncStatusCallback = (status: "idle" | "syncing" | "synced" | "error") => void;
const syncListeners: Set<SyncStatusCallback> = new Set();

export function subscribeSyncStatus(callback: SyncStatusCallback) {
  syncListeners.add(callback);
  return () => {
    syncListeners.delete(callback);
  };
}

function notifySyncStatus(status: "idle" | "syncing" | "synced" | "error") {
  syncListeners.forEach((cb) => cb(status));
}

export function purgeLegacyMockStorage(): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith("hellochina_")) {
          const val = window.localStorage.getItem(key);
          if (val) {
            // Check for legacy mock indicators
            if (
              val.includes("380") ||
              val.includes('"lessonsCompleted":3') ||
              val.includes('"v_hsk1_1"') ||
              val.includes('"gems":250') ||
              val.includes('"activityPoints":20') ||
              val.includes('"wordsLearned":45')
            ) {
              keysToRemove.push(key);
            }
          }
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    }
  } catch (err) {
    console.warn("Storage cleanup warning:", err);
  }
}

// Automatically purge legacy mock data on startup
purgeLegacyMockStorage();

export const createDefaultUserProfile = (
  uid = "guest_user",
  displayName = "Học Viên",
  email = "",
  photoURL: string | null = null
): UserProfile => ({
  uid,
  displayName,
  email,
  photoURL,
  currentHskLevel: "HSK1",
  targetHskLevel: "HSK3",
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  totalWordsLearned: 0,
  totalLessonsCompleted: 0,
  totalStudyMinutes: 0,
  accuracyScore: 100,
  notificationEnabled: true,
  dailyReminderTime: "20:00",
  membershipTier: "free",
  gems: 0,
  activityPoints: 0,
  badges: [],
  unlockedLessonIds: [],
  unlockedGarmentTopicIds: []
});

export const createDefaultUserProgress = (uid = "guest_user"): UserProgressData => ({
  uid,
  totalXP: 0,
  wordsLearned: 0,
  lessonsCompleted: 0,
  completedLessonIds: [],
  lastLessonId: "",
  favoriteWordIds: [],
  difficultWordIds: [],
  masteredWordIds: [],
  learningWordIds: [],
  quizScores: {},
  speakingPracticedCount: 0,
  listeningPracticedCount: 0,
  readingPracticedCount: 0,
  writingPracticedCount: 0,
  dialoguesCompletedCount: 0,
  hskAccuracyRates: {
    HSK1: 0,
    HSK2: 0,
    HSK3: 0,
    HSK4: 0,
    HSK5: 0,
    HSK6: 0
  }
});

export const DEFAULT_USER_PROFILE: UserProfile = createDefaultUserProfile();
export const DEFAULT_USER_PROGRESS: UserProgressData = createDefaultUserProgress();

function sanitizeForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        result[key] = sanitizeForFirestore(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export async function fetchUserProfileWithStatus(
  userId: string
): Promise<{ profile: UserProfile; isNewUser: boolean }> {
  const path = `users/${userId}`;
  try {
    if (userId && userId !== "guest_user") {
      const userRef = doc(db, "users", userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const cloudData = snap.data() as UserProfile;
        safeStorage.setItem(
          `${LOCAL_STORAGE_KEY_PREFIX}profile_${userId}`,
          JSON.stringify(cloudData)
        );
        return { profile: cloudData, isNewUser: false };
      } else {
        // Document doesn't exist in Firestore -> First time user!
        return { profile: createDefaultUserProfile(userId), isNewUser: true };
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }

  // Fallback to local storage for offline / guest
  const local = safeStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}profile_${userId}`);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      return { profile: parsed, isNewUser: false };
    } catch {
      // ignore
    }
  }

  return { profile: createDefaultUserProfile(userId), isNewUser: true };
}

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const result = await fetchUserProfileWithStatus(userId);
  return result.profile;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  // Always update local cache instantly for zero latency
  safeStorage.setItem(
    `${LOCAL_STORAGE_KEY_PREFIX}profile_${profile.uid}`,
    JSON.stringify(profile)
  );

  if (profile.uid && profile.uid !== "guest_user") {
    const path = `users/${profile.uid}`;
    notifySyncStatus("syncing");
    try {
      const userRef = doc(db, "users", profile.uid);
      await setDoc(userRef, sanitizeForFirestore(profile), { merge: true });
      notifySyncStatus("synced");
    } catch (error) {
      notifySyncStatus("error");
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
}

export const syncUserProfile = saveUserProfile;

export async function fetchUserProgressWithStatus(
  userId: string
): Promise<{ progress: UserProgressData; isNewUser: boolean }> {
  const path = `users/${userId}/data/progress`;
  try {
    if (userId && userId !== "guest_user") {
      const progressRef = doc(db, "users", userId, "data", "progress");
      const snap = await getDoc(progressRef);
      if (snap.exists()) {
        const cloudProgress = snap.data() as UserProgressData;
        safeStorage.setItem(
          `${LOCAL_STORAGE_KEY_PREFIX}progress_${userId}`,
          JSON.stringify(cloudProgress)
        );
        return { progress: cloudProgress, isNewUser: false };
      } else {
        // Document doesn't exist in Firestore -> First time progress!
        return { progress: createDefaultUserProgress(userId), isNewUser: true };
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }

  const local = safeStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}progress_${userId}`);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      return { progress: parsed, isNewUser: false };
    } catch {
      // ignore
    }
  }

  return { progress: createDefaultUserProgress(userId), isNewUser: true };
}

export async function fetchUserProgress(userId: string): Promise<UserProgressData> {
  const result = await fetchUserProgressWithStatus(userId);
  return result.progress;
}

export async function saveUserProgress(progress: UserProgressData): Promise<void> {
  const uid = progress.uid || "guest_user";
  safeStorage.setItem(
    `${LOCAL_STORAGE_KEY_PREFIX}progress_${uid}`,
    JSON.stringify(progress)
  );

  if (uid !== "guest_user") {
    const path = `users/${uid}/data/progress`;
    notifySyncStatus("syncing");
    try {
      const progressRef = doc(db, "users", uid, "data", "progress");
      await setDoc(progressRef, sanitizeForFirestore(progress), { merge: true });
      notifySyncStatus("synced");
    } catch (error) {
      notifySyncStatus("error");
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
}

export const syncUserProgress = (userId: string, progress: UserProgressData) => 
  saveUserProgress({ ...progress, uid: userId });

export function recordCompletedLesson(
  current: UserProgressData,
  lessonId: string,
  score: number
): UserProgressData {
  const completed = current.completedLessonIds.includes(lessonId)
    ? current.completedLessonIds
    : [...current.completedLessonIds, lessonId];

  const updated: UserProgressData = {
    ...current,
    completedLessonIds: completed,
    lastLessonId: lessonId,
    lessonsCompleted: completed.length,
    totalXP: current.totalXP + 50,
    quizScores: {
      ...(current.quizScores || {}),
      [lessonId]: score
    }
  };

  saveUserProgress(updated);
  return updated;
}

export function recordPracticedWord(
  current: UserProgressData,
  wordId: string,
  isMastered: boolean
): UserProgressData {
  let mastered = [...current.masteredWordIds];
  let learning = [...current.learningWordIds];

  if (isMastered) {
    if (!mastered.includes(wordId)) mastered.push(wordId);
    learning = learning.filter((id) => id !== wordId);
  } else {
    if (!learning.includes(wordId)) learning.push(wordId);
  }

  const updated: UserProgressData = {
    ...current,
    masteredWordIds: mastered,
    learningWordIds: learning,
    wordsLearned: mastered.length,
    totalXP: current.totalXP + 5
  };

  saveUserProgress(updated);
  return updated;
}

export function recordPracticedDialogue(
  current: UserProgressData,
  dialogueId: string
): UserProgressData {
  const updated: UserProgressData = {
    ...current,
    dialoguesCompletedCount: (current.dialoguesCompletedCount || 0) + 1,
    totalXP: current.totalXP + 20
  };

  saveUserProgress(updated);
  return updated;
}

export function updateProgress(
  current: UserProgressData,
  diff: Partial<UserProgressData>
): UserProgressData {
  const updated: UserProgressData = {
    ...current,
    ...diff
  };
  saveUserProgress(updated);
  return updated;
}
