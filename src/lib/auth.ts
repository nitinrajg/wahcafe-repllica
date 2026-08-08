import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import { eq, and, gt } from 'drizzle-orm';
import { db } from './db';
import { sessions, adminUsers } from './schema';

const COOKIE_NAME = 'wah_session';
const SESSION_DAYS = 7;

// Hash a password with scrypt
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

// Verify a password against its hash
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, saltHex, hashHex] = stored.split('$');
  if (algo !== 'scrypt') return false;
  const salt = Buffer.from(saltHex, 'hex');
  const hash = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(hash, Buffer.from(hashHex, 'hex'));
}

// Create a session — returns the raw token (sent as cookie)
export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({ userId, tokenHash, expiresAt });

  // Set cookie
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return token;
}

// Delete session (logout)
export async function deleteSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
  }
  store.delete(COOKIE_NAME);
}

// Get current admin user from session cookie, or null
export async function getAdminUser() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const now = new Date();

  const [session] = await db
    .select({
      userId: sessions.userId,
      email: adminUsers.email,
      name: adminUsers.name,
    })
    .from(sessions)
    .innerJoin(adminUsers, eq(sessions.userId, adminUsers.id))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, now)))
    .limit(1);

  return session ?? null;
}
