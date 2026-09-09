// Storage abstraction layer allowing hot-swapping between LocalStorage and Cloud Database (e.g. Supabase)

export interface IStorageService {
  getItem<T>(key: string, defaultValue: T): T;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

class LocalStorageAdapter implements IStorageService {
  private prefix = 'navora_v1_';

  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const raw = localStorage.getItem(this.prefix + key);
      if (!raw) return defaultValue;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.warn(`[NAVORA Storage] Error reading ${key}:`, err);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[NAVORA Storage] Error writing ${key}:`, err);
    }
  }

  removeItem(key: string): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.prefix + key);
    } catch (err) {
      console.warn(`[NAVORA Storage] Error removing ${key}:`, err);
    }
  }

  clear(): void {
    try {
      if (typeof window === 'undefined') return;
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(this.prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (err) {
      console.warn('[NAVORA Storage] Error clearing data:', err);
    }
  }
}

export const storageService = new LocalStorageAdapter();
