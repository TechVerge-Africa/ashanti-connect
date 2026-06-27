export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

/**
 * Highly scalable token-bucket rate limiter built on Deno KV.
 * Fast, stateless for container restarts, and distributed.
 */
export async function rateLimit(
  ip: string,
  limit = 60,
  windowSecs = 60
): Promise<{ allowed: boolean; remaining: number; reset: number }> {
  try {
    // Open the default local/deploy Deno KV database
    const kv = await Deno.openKv();
    const key = ['rate_limit', ip];
    
    const now = Date.now();
    const result = await kv.get<{ tokens: number; lastRefill: number }>(key);
    
    let tokens = limit;
    let lastRefill = now;
    
    if (result.value) {
      const val = result.value;
      const elapsedMs = now - val.lastRefill;
      const refillRate = limit / (windowSecs * 1000);
      tokens = Math.min(limit, val.tokens + elapsedMs * refillRate);
      lastRefill = val.lastRefill;
    }
    
    if (tokens >= 1) {
      tokens -= 1;
      // If new, set lastRefill to now. Otherwise maintain original refill anchor.
      const updatedRefill = result.value ? lastRefill : now;
      await kv.set(key, { tokens, lastRefill: updatedRefill }, { expireIn: windowSecs * 1000 });
      return { allowed: true, remaining: Math.floor(tokens), reset: updatedRefill + (windowSecs * 1000) };
    } else {
      return { allowed: false, remaining: 0, reset: lastRefill + (windowSecs * 1000) };
    }
  } catch (err) {
    console.error('Rate limiter failed, allowing request by default:', err);
    return { allowed: true, remaining: limit, reset: 0 };
  }
}

/**
 * Helper to handle options preflight requests.
 */
export function handlePreflight(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  return null;
}
