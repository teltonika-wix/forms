export type CacheEntry<T> = {
  value: T;
  expiry: number | null;
};

export class BaseMemoryCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private defaultTimeToLive: number | null;

  constructor(defaultTimeToLive: number | null = null) {
    this.defaultTimeToLive = defaultTimeToLive;
  }

  // Set a cache entry with an optional Time-To-Live, falling back to default Time-To-Live if not provided
  set({ key, value, timeToLive }: { key: string; value: T; timeToLive?: number | null }): void {
    const effectiveTimeToLive = timeToLive !== undefined ? timeToLive : this.defaultTimeToLive;
    const expiry = effectiveTimeToLive ? Date.now() + effectiveTimeToLive : null;
    this.cache.set(key, { value, expiry });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (entry.expiry && entry.expiry < Date.now()) {
      this.cache.delete(key);

      return null;
    }

    return entry.value;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}
