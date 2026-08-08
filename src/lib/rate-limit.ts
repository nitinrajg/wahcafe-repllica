import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let _ratelimit: Ratelimit | null = null;

export function limiter() {
  if (!_ratelimit) {
    _ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      analytics: true,
    });
  }
  return _ratelimit;
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}
