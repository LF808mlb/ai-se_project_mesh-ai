type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cacheStore = new Map<string, CacheEntry<unknown>>();

export const getCacheValue = <T>(key: string): T | null => {
  const entry = cacheStore.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(key);
    return null;
  }

  return entry.value as T;
};

export const setCacheValue = <T>(key: string, value: T, ttlMs: number): void => {
  cacheStore.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
};

export const deleteCacheValue = (key: string): void => {
  cacheStore.delete(key);
};
