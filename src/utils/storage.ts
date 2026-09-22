/**
 * Safe local/session storage helper with in-memory fallback.
 * Prevents DOMException / SecurityError in Safari iOS, incognito mode,
 * or cross-origin iframe sandboxes where storage access might be denied.
 */

const memoryStore: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Access denied or SecurityError in private mode / iframe
    }
    return memoryStore[key] ?? null;
  },

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Access denied
    }
    memoryStore[key] = value;
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Access denied
    }
    delete memoryStore[key];
  },

  // Session storage counterpart with fallback
  getSessionItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch {
      // Access denied
    }
    return memoryStore[`session_${key}`] ?? null;
  },

  setSessionItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch {
      // Access denied
    }
    memoryStore[`session_${key}`] = value;
  },

  removeSessionItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      // Access denied
    }
    delete memoryStore[`session_${key}`];
  }
};
