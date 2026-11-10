/**
 * Basic in-memory, fixed-window rate limiter.
 *
 * This protects a single server instance. On serverless hosting each instance
 * keeps its own memory, so treat it as a speed bump, not a guarantee.
 * TODO: move to a shared store (e.g. Upstash Redis) if spam becomes a problem.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, now = Date.now()) {
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_KEYS) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      if (hits.size >= MAX_KEYS) hits.clear();
    }
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  entry.count += 1;
  return { ok: entry.count <= MAX_REQUESTS };
}
