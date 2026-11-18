// Pembatas laju sederhana di memori (per instance). Cukup untuk meredam spam; bukan pengganti WAF.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 10, windowMs = 60_000, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return recent.length > limit;
}
